"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { borderWidths, spacing, tableTokens } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";
import Surface from "../layout/Surface";
import Text from "../typography/Text";
import Label from "../forms/Label";
import SearchField from "../forms/SearchField";
import Select from "../forms/Select";
import FilterSummary, { FilterChip } from "./FilterSummary";

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

export type DataGridDensity = keyof typeof tableTokens.density;

export interface DataGridProps<Row> {
  columns: DataGridColumn<Row>[];
  rows: Row[];
  getRowKey: (row: Row) => string | number;
  columnOrder?: readonly string[];
  search?: DataGridSearch<Row>;
  filters?: DataGridFilter<Row>[];
  density?: DataGridDensity;
  defaultSort?: { key: string; direction: "asc" | "desc" };
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
  emptyState,
}: DataGridProps<Row>) {
  const { borders, subtleBackground } = useSemanticColors();
  const [sort, setSort] = useState(defaultSort ?? null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
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
    const normalizedQuery = searchQuery.trim();
    const searchedRows =
      search && normalizedQuery
        ? rows.filter((row) => search.predicate(row, normalizedQuery))
        : rows;

    if (!filters || filters.length === 0) {
      return searchedRows;
    }

    return searchedRows.filter((row) =>
      filters.every((filter) => {
        const value = filterValues[filter.key];
        return !value || filter.predicate(row, value);
      }),
    );
  }, [rows, search, searchQuery, filters, filterValues]);

  const sortedRows = useMemo(() => {
    if (!sort) {
      return filteredRows;
    }

    const column = columns.find((candidate) => candidate.key === sort.key);

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

    return sort.direction === "desc" ? sorted.reverse() : sorted;
  }, [filteredRows, sort, columns]);

  function handleSort(key: string) {
    setSort((current) =>
      current?.key === key
        ? { key, direction: current.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" },
    );
  }

  const activeFilters = [
    ...(searchQuery.trim()
      ? [
          {
            key: "data-grid-search",
            label: search?.label ?? "Search",
            value: searchQuery.trim(),
            clear: () => setSearchQuery(""),
          },
        ]
      : []),
    ...(filters ?? []).flatMap((filter) => {
      const value = filterValues[filter.key];
      const option = filter.options.find((candidate) => candidate.value === value);

      return value && option
        ? [
            {
              key: `data-grid-filter-${filter.key}`,
              label: filter.label,
              value: option.label,
              clear: () =>
                setFilterValues((current) => ({ ...current, [filter.key]: "" })),
            },
          ]
        : [];
    }),
  ];

  function resetFilters() {
    setSearchQuery("");
    setFilterValues({});
  }

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
                  value={searchQuery}
                  onSearch={setSearchQuery}
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
                  value={filterValues[filter.key] ?? ""}
                  onChange={(event) =>
                    setFilterValues((current) => ({
                      ...current,
                      [filter.key]: event.target.value,
                    }))
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
        <TableContainer sx={{ border: 0, borderRadius: 0 }}>
          <Table>
            <TableHead>
              <TableRow>
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
                        active={sort?.key === column.key}
                        direction={sort?.key === column.key ? sort.direction : "asc"}
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
              {sortedRows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={Math.max(visibleColumns.length, 1)}
                    align="center"
                    sx={{ py: spacing.xl }}
                  >
                    {emptyState ?? <Text tone="secondary">No results.</Text>}
                  </TableCell>
                </TableRow>
              ) : (
                sortedRows.map((row) => (
                  <TableRow key={getRowKey(row)}>
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
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Surface>
    </Box>
  );
}
