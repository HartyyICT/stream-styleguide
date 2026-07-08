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
import { useMemo, useState, type ReactNode } from "react";
import { borderWidths, spacing, tableTokens } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";
import Surface from "../layout/Surface";
import Text from "../typography/Text";
import Label from "../forms/Label";
import Select from "../forms/Select";

export interface DataGridColumn<Row> {
  key: string;
  header: string;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  sortValue?: (row: Row) => string | number;
  render: (row: Row) => ReactNode;
  minWidth?: string | number;
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

export type DataGridDensity = keyof typeof tableTokens.density;

export interface DataGridProps<Row> {
  columns: DataGridColumn<Row>[];
  rows: Row[];
  getRowKey: (row: Row) => string | number;
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
  filters,
  density = "comfortable",
  defaultSort,
  emptyState,
}: DataGridProps<Row>) {
  const { borders } = useSemanticColors();
  const [sort, setSort] = useState(defaultSort ?? null);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const densityTokens = tableTokens.density[density];

  const filteredRows = useMemo(() => {
    if (!filters || filters.length === 0) {
      return rows;
    }

    return rows.filter((row) =>
      filters.every((filter) => {
        const value = filterValues[filter.key];
        return !value || filter.predicate(row, value);
      }),
    );
  }, [rows, filters, filterValues]);

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

  return (
    <Surface subtle sx={{ width: "100%", p: 0, border: 0, overflow: "hidden" }}>
      {filters && filters.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: spacing.md,
            p: spacing.md,
            borderBottom: `${borderWidths.default} solid ${borders.subtle}`,
          }}
        >
          {filters.map((filter) => (
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
                <option value="">Alle</option>
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
      <TableContainer sx={{ border: 0, borderRadius: 0 }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  align={column.align}
                  sx={{ minWidth: column.minWidth, height: densityTokens.rowHeight, padding: densityTokens.cellPadding }}
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
                <TableCell colSpan={columns.length} align="center" sx={{ py: spacing.xl }}>
                  {emptyState ?? <Text tone="secondary">Geen resultaten.</Text>}
                </TableCell>
              </TableRow>
            ) : (
              sortedRows.map((row) => (
                <TableRow key={getRowKey(row)}>
                  {columns.map((column) => (
                    <TableCell key={column.key} align={column.align} sx={{ padding: densityTokens.cellPadding }}>
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
  );
}
