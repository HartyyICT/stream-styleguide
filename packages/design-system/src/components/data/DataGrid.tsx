"use client";

import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  borderWidths,
  formTokens,
  radius,
  spacing,
  tableTokens,
} from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";
import Checkbox from "../forms/Checkbox";
import Label from "../forms/Label";
import SearchField from "../forms/SearchField";
import Select from "../forms/Select";
import Surface from "../layout/Surface";
import Text from "../typography/Text";
import FilterSummary, { FilterChip } from "./FilterSummary";

export type DataGridRowKey = string | number;

export interface DataGridColumn<Row> {
  key: string;
  header: string;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  sortValue?: (row: Row) => string | number;
  render: (row: Row) => ReactNode;
  minWidth?: string | number;
  hideBelow?: number;
}

export interface DataGridFilterOption {
  label: string;
  value: string;
}

export interface DataGridFilter<Row> {
  key: string;
  label: string;
  options: DataGridFilterOption[];
  predicate: (row: Row, value: string) => boolean;
}

export interface DataGridSearch<Row> {
  label?: string;
  placeholder?: string;
  debounceMs?: number;
  predicate: (row: Row, query: string) => boolean;
}

export interface DataGridSort {
  key: string;
  direction: "asc" | "desc";
}

export interface DataGridQuery {
  search: string;
  filters: Record<string, string>;
  sort: DataGridSort | null;
}

export interface DataGridPagination {
  page: number;
  pageSize: number;
  rowCount?: number;
  pageSizeOptions?: readonly number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export interface DataGridRowSelection<Row> {
  selectedRowKeys: readonly DataGridRowKey[];
  onSelectedRowKeysChange: (keys: DataGridRowKey[]) => void;
  isRowSelectable?: (row: Row) => boolean;
  getRowLabel?: (row: Row) => string;
}

export type DataGridDensity = keyof typeof tableTokens.density;
export type DataGridProcessingMode = "client" | "server";

export interface DataGridProps<Row> {
  columns: DataGridColumn<Row>[];
  rows: Row[];
  getRowKey: (row: Row) => DataGridRowKey;
  columnOrder?: readonly string[];
  search?: DataGridSearch<Row>;
  filters?: DataGridFilter<Row>[];
  density?: DataGridDensity;
  defaultSort?: DataGridSort;
  query?: DataGridQuery;
  onQueryChange?: (query: DataGridQuery) => void;
  processingMode?: DataGridProcessingMode;
  pagination?: DataGridPagination;
  rowSelection?: DataGridRowSelection<Row>;
  loading?: boolean;
  loadingLabel?: string;
  emptyState?: ReactNode;
}

function getSortValue<Row>(column: DataGridColumn<Row>, row: Row): string | number {
  if (column.sortValue) {
    return column.sortValue(row);
  }

  const raw = (row as Record<string, unknown>)[column.key];
  return typeof raw === "number" ? raw : String(raw ?? "");
}

export default function DataGrid<Row>({
  columns,
  rows,
  getRowKey,
  columnOrder,
  search,
  filters,
  density = "comfortable",
  defaultSort,
  query,
  onQueryChange,
  processingMode = "client",
  pagination,
  rowSelection,
  loading = false,
  loadingLabel = "Loading rows",
  emptyState,
}: DataGridProps<Row>) {
  const { borders, subtleBackground, formStates } = useSemanticColors();
  const [internalQuery, setInternalQuery] = useState<DataGridQuery>({
    search: "",
    filters: {},
    sort: defaultSort ?? null,
  });
  const activeQuery = query ?? internalQuery;
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridWidth, setGridWidth] = useState<number>();
  const densityTokens = tableTokens.density[density];

  useEffect(() => {
    const element = gridRef.current;

    if (!element || typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        setGridWidth(entry.contentRect.width);
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const orderedColumns = useMemo(() => {
    if (!columnOrder || columnOrder.length === 0) {
      return columns;
    }

    const columnsByKey = new Map(columns.map((column) => [column.key, column]));
    const configuredKeys = new Set(columnOrder);
    const configuredColumns = [...configuredKeys].flatMap((key) => {
      const column = columnsByKey.get(key);
      return column ? [column] : [];
    });
    const remainingColumns = columns.filter((column) => !configuredKeys.has(column.key));

    return [...configuredColumns, ...remainingColumns];
  }, [columns, columnOrder]);

  const visibleColumns = useMemo(() => {
    const responsiveColumns = orderedColumns.filter(
      (column) =>
        gridWidth === undefined ||
        column.hideBelow === undefined ||
        gridWidth >= column.hideBelow,
    );

    return responsiveColumns.length > 0 ? responsiveColumns : orderedColumns.slice(0, 1);
  }, [gridWidth, orderedColumns]);

  const filteredRows = useMemo(() => {
    if (processingMode === "server") {
      return rows;
    }

    const normalizedQuery = activeQuery.search.trim();
    const searchedRows =
      search && normalizedQuery
        ? rows.filter((row) => search.predicate(row, normalizedQuery))
        : rows;

    if (!filters || filters.length === 0) {
      return searchedRows;
    }

    return searchedRows.filter((row) =>
      filters.every((filter) => {
        const value = activeQuery.filters[filter.key];
        return !value || filter.predicate(row, value);
      }),
    );
  }, [rows, search, filters, activeQuery.search, activeQuery.filters, processingMode]);

  const sortedRows = useMemo(() => {
    if (processingMode === "server" || !activeQuery.sort) {
      return filteredRows;
    }

    const column = columns.find((candidate) => candidate.key === activeQuery.sort?.key);

    if (!column) {
      return filteredRows;
    }

    const sorted = [...filteredRows].sort((a, b) => {
      const valueA = getSortValue(column, a);
      const valueB = getSortValue(column, b);

      if (typeof valueA === "number" && typeof valueB === "number") {
        return valueA - valueB;
      }

      return String(valueA).localeCompare(String(valueB));
    });

    return activeQuery.sort.direction === "desc" ? sorted.reverse() : sorted;
  }, [filteredRows, activeQuery.sort, columns, processingMode]);

  const displayedRows = useMemo(() => {
    if (!pagination || processingMode === "server") {
      return sortedRows;
    }

    const start = pagination.page * pagination.pageSize;
    return sortedRows.slice(start, start + pagination.pageSize);
  }, [sortedRows, pagination, processingMode]);

  useEffect(() => {
    if (!pagination || processingMode === "server") {
      return;
    }

    const lastPage = Math.max(Math.ceil(sortedRows.length / pagination.pageSize) - 1, 0);
    if (pagination.page > lastPage) {
      pagination.onPageChange(lastPage);
    }
  }, [pagination, processingMode, sortedRows.length]);

  function updateQuery(nextQuery: DataGridQuery, resetPage = false) {
    if (!query) {
      setInternalQuery(nextQuery);
    }
    onQueryChange?.(nextQuery);

    if (resetPage && pagination && pagination.page !== 0) {
      pagination.onPageChange(0);
    }
  }

  function handleSort(key: string) {
    const nextSort: DataGridSort =
      activeQuery.sort?.key === key
        ? {
            key,
            direction: activeQuery.sort.direction === "asc" ? "desc" : "asc",
          }
        : { key, direction: "asc" };

    updateQuery({ ...activeQuery, sort: nextSort }, true);
  }

  const activeFilters = [
    ...(activeQuery.search.trim()
      ? [
          {
            key: "data-grid-search",
            label: search?.label ?? "Search",
            value: activeQuery.search.trim(),
            clear: () => updateQuery({ ...activeQuery, search: "" }, true),
          },
        ]
      : []),
    ...(filters ?? []).flatMap((filter) => {
      const value = activeQuery.filters[filter.key];
      const option = filter.options.find((candidate) => candidate.value === value);

      return value && option
        ? [
            {
              key: `data-grid-filter-${filter.key}`,
              label: filter.label,
              value: option.label,
              clear: () =>
                updateQuery(
                  {
                    ...activeQuery,
                    filters: { ...activeQuery.filters, [filter.key]: "" },
                  },
                  true,
                ),
            },
          ]
        : [];
    }),
  ];

  function resetFilters() {
    updateQuery({ ...activeQuery, search: "", filters: {} }, true);
  }

  const selectedKeys = new Set(rowSelection?.selectedRowKeys ?? []);
  const selectableRows = rowSelection
    ? displayedRows.filter((row) => rowSelection.isRowSelectable?.(row) ?? true)
    : [];
  const selectableKeys = selectableRows.map(getRowKey);
  const selectedVisibleCount = selectableKeys.filter((key) => selectedKeys.has(key)).length;
  const allVisibleSelected = selectableKeys.length > 0 && selectedVisibleCount === selectableKeys.length;

  function setSelectedKeys(keys: Set<DataGridRowKey>) {
    rowSelection?.onSelectedRowKeysChange([...keys]);
  }

  function toggleVisibleRows() {
    const next = new Set(selectedKeys);

    if (allVisibleSelected) {
      selectableKeys.forEach((key) => next.delete(key));
    } else {
      selectableKeys.forEach((key) => next.add(key));
    }

    setSelectedKeys(next);
  }

  function toggleRow(row: Row) {
    const key = getRowKey(row);
    const next = new Set(selectedKeys);

    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }

    setSelectedKeys(next);
  }

  const columnCount = visibleColumns.length + (rowSelection ? 1 : 0);
  const rowCount =
    pagination && processingMode === "server"
      ? pagination.rowCount ?? rows.length
      : sortedRows.length;

  return (
    <Box ref={gridRef} sx={{ width: "100%", minWidth: 0 }}>
      <Surface subtle sx={{ width: "100%", p: 0, border: 0, overflow: "hidden" }}>
        {(search || (filters && filters.length > 0)) && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: spacing.md,
              p: spacing.md,
              borderBottom: `${borderWidths.default} solid ${borders.subtle}`,
            }}
          >
            {search && (
              <Box
                sx={{
                  display: "grid",
                  gap: 0.5,
                  flex: "1 1 18rem",
                  minWidth: 0,
                  maxWidth: 400,
                }}
              >
                <Label component="span">{search.label ?? "Search"}</Label>
                <SearchField
                  value={activeQuery.search}
                  onSearch={(searchValue) =>
                    updateQuery({ ...activeQuery, search: searchValue }, true)
                  }
                  placeholder={search.placeholder}
                  label={search.label}
                  debounceMs={search.debounceMs}
                />
              </Box>
            )}
            {filters?.map((filter) => (
              <Box key={filter.key} sx={{ display: "grid", gap: 0.5, minWidth: 160 }}>
                <Label component="span">{filter.label}</Label>
                <Select
                  value={activeQuery.filters[filter.key] ?? ""}
                  onChange={(event) =>
                    updateQuery(
                      {
                        ...activeQuery,
                        filters: {
                          ...activeQuery.filters,
                          [filter.key]: event.target.value,
                        },
                      },
                      true,
                    )
                  }
                  aria-label={filter.label}
                >
                  <option value="">All</option>
                  {filter.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </Box>
            ))}
          </Box>
        )}
        {activeFilters.length > 0 && (
          <Box
            sx={{
              px: spacing.md,
              py: spacing.sm,
              borderBottom: `${borderWidths.default} solid ${borders.subtle}`,
              backgroundColor: subtleBackground,
            }}
          >
            <FilterSummary count={activeFilters.length} onReset={resetFilters}>
              {activeFilters.map((filter) => (
                <FilterChip
                  key={filter.key}
                  label={filter.label}
                  value={filter.value}
                  onDelete={filter.clear}
                />
              ))}
            </FilterSummary>
          </Box>
        )}
        <TableContainer sx={{ border: 0, borderRadius: 0 }} aria-busy={loading}>
          <Table>
            <TableHead>
              <TableRow>
                {rowSelection && (
                  <TableCell
                    padding="none"
                    sx={{
                      width: `calc(${spacing.md} + ${spacing.sm} + ${formTokens.choice.size}px)`,
                      height: densityTokens.rowHeight,
                      pl: spacing.md,
                      pr: spacing.sm,
                    }}
                  >
                    <Checkbox
                      checked={allVisibleSelected}
                      indeterminate={selectedVisibleCount > 0 && !allVisibleSelected}
                      disabled={selectableKeys.length === 0}
                      onChange={toggleVisibleRows}
                      slotProps={{ input: { "aria-label": "Select all visible rows" } }}
                    />
                  </TableCell>
                )}
                {visibleColumns.map((column) => (
                  <TableCell
                    key={column.key}
                    align={column.align}
                    sx={{
                      minWidth: column.minWidth,
                      height: densityTokens.rowHeight,
                      padding: densityTokens.cellPadding,
                    }}
                  >
                    {column.sortable ? (
                      <TableSortLabel
                        active={activeQuery.sort?.key === column.key}
                        direction={
                          activeQuery.sort?.key === column.key
                            ? activeQuery.sort.direction
                            : "asc"
                        }
                        onClick={() => handleSort(column.key)}
                      >
                        {column.header}
                      </TableSortLabel>
                    ) : (
                      column.header
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={Math.max(columnCount, 1)} align="center" sx={{ py: spacing.xl }}>
                    <Box sx={{ display: "inline-flex", alignItems: "center", gap: spacing.sm }}>
                      <CircularProgress size={20} />
                      <Text tone="secondary">{loadingLabel}</Text>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : displayedRows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={Math.max(columnCount, 1)}
                    align="center"
                    sx={{ py: spacing.xl }}
                  >
                    {emptyState ?? <Text tone="secondary">No results.</Text>}
                  </TableCell>
                </TableRow>
              ) : (
                displayedRows.map((row) => {
                  const rowKey = getRowKey(row);
                  const selected = selectedKeys.has(rowKey);
                  const selectable = rowSelection?.isRowSelectable?.(row) ?? true;

                  return (
                    <TableRow key={rowKey} selected={selected}>
                      {rowSelection && (
                        <TableCell
                          padding="none"
                          sx={{
                            width: `calc(${spacing.md} + ${spacing.sm} + ${formTokens.choice.size}px)`,
                            pl: spacing.md,
                            pr: spacing.sm,
                          }}
                        >
                          <Checkbox
                            checked={selected}
                            disabled={!selectable}
                            onChange={() => toggleRow(row)}
                            slotProps={{
                              input: {
                                "aria-label": `Select ${rowSelection.getRowLabel?.(row) ?? rowKey}`,
                              },
                            }}
                          />
                        </TableCell>
                      )}
                      {visibleColumns.map((column) => (
                        <TableCell
                          key={column.key}
                          align={column.align}
                          sx={{ padding: densityTokens.cellPadding }}
                        >
                          {column.render(row)}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {pagination && (
          <TablePagination
            component="div"
            count={rowCount}
            page={pagination.page}
            rowsPerPage={pagination.pageSize}
            rowsPerPageOptions={[
              ...(pagination.pageSizeOptions ?? [10, 25, 50]),
            ]}
            onPageChange={(_event, page) => pagination.onPageChange(page)}
            onRowsPerPageChange={(event) => {
              pagination.onPageSizeChange?.(Number(event.target.value));
              pagination.onPageChange(0);
            }}
            sx={{
              borderTop: `${borderWidths.default} solid ${borders.subtle}`,
              "& .MuiTablePagination-toolbar": {
                minHeight: 56,
                px: spacing.md,
                gap: spacing.sm,
                flexWrap: "wrap",
                justifyContent: "flex-end",
              },
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                m: 0,
              },
              "& .MuiTablePagination-input": {
                width: "4.5rem",
                minWidth: "4.5rem",
                height: "2.25rem",
                m: 0,
                color: formStates.default.content,
                backgroundColor: formStates.default.background,
                border: `${borderWidths.default} solid ${formStates.default.border}`,
                borderRadius: radius.medium,
              },
              "& .MuiTablePagination-select": {
                height: "100%",
                minHeight: 0,
                py: 0,
                pl: spacing.sm,
                pr: "2.25rem !important",
                display: "flex",
                alignItems: "center",
                textAlign: "left",
                textAlignLast: "left",
              },
              "& .MuiTablePagination-selectIcon": {
                top: "50%",
                right: spacing.sm,
                transform: "translateY(-50%)",
              },
              "& .MuiTablePagination-actions": {
                ml: spacing.sm,
                display: "flex",
                gap: spacing.xs,
              },
            }}
          />
        )}
      </Surface>
    </Box>
  );
}
