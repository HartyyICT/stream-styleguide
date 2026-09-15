"use client";

import { Box } from "@mui/material";
import type { ReactNode } from "react";
import { borderWidths, radius, tablePreviewTokens } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

export type DataTableColumn<Row> = {
  key: string;
  header: string;
  align?: "left" | "right" | "center";
  render: (row: Row) => ReactNode;
};

type DataTableProps<Row> = {
  columns: DataTableColumn<Row>[];
  rows: Row[];
  getRowKey: (row: Row) => string;
  rowHeight: string;
  cellPadding: string;
  minWidth?: number;
  columnsTemplate?: string;
  /** Set to false when the table is already placed inside another bordered
   * container (e.g. a Card) so the two don't stack into nested borders. */
  bordered?: boolean;
};

export default function DataTable<Row>({
  columns,
  rows,
  getRowKey,
  rowHeight,
  cellPadding,
  minWidth = 560,
  columnsTemplate = tablePreviewTokens.columns,
  bordered = true,
}: DataTableProps<Row>) {
  const { borders, surface, subtleBackground, secondaryText } =
    useSemanticColors();

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Box
        role="table"
        sx={{
          width: "100%",
          minWidth,
          overflow: "hidden",
          ...(bordered && {
            border: `${borderWidths.default} solid ${borders.default}`,
            borderRadius: radius.medium,
            backgroundColor: surface,
          }),
        }}
      >
        <Box role="rowgroup" sx={{ backgroundColor: subtleBackground }}>
          <Box
            role="row"
            sx={{
              display: "grid",
              gridTemplateColumns: columnsTemplate,
              alignItems: "center",
            }}
          >
            {columns.map((column) => (
              <Box
                key={column.key}
                role="columnheader"
                sx={{
                  minWidth: 0,
                  p: cellPadding,
                  color: secondaryText,
                  fontFamily: "var(--font-poppins), sans-serif",
                  fontSize: tablePreviewTokens.headerFontSize,
                  textAlign: column.align ?? "left",
                  borderBottom: `${borderWidths.default} solid ${borders.default}`,
                }}
              >
                {column.header}
              </Box>
            ))}
          </Box>
        </Box>
        <Box role="rowgroup">
          {rows.map((row) => (
            <Box
              key={getRowKey(row)}
              role="row"
              sx={{
                minHeight: rowHeight,
                display: "grid",
                gridTemplateColumns: columnsTemplate,
                alignItems: "center",
                borderBottom: `${borderWidths.default} solid ${borders.subtle}`,
                "&:last-child": {
                  borderBottom: 0,
                },
              }}
            >
              {columns.map((column) => (
                <Box
                  key={column.key}
                  role="cell"
                  sx={{
                    minWidth: 0,
                    p: cellPadding,
                    textAlign: column.align ?? "left",
                  }}
                >
                  {column.render(row)}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
