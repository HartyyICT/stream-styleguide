"use client";

import { Box } from "@mui/material";
import type { ReactNode } from "react";
import { borderWidths, radius, spacing, tablePreviewTokens } from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";
import Surface from "@/app/components/atoms/Surface";

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
  subtle?: boolean;
};

export default function DataTable<Row>({
  columns,
  rows,
  getRowKey,
  rowHeight,
  cellPadding,
  minWidth = 560,
  columnsTemplate = tablePreviewTokens.columns,
  subtle = true,
}: DataTableProps<Row>) {
  const { borders, surface, subtleBackground, secondaryText } =
    useDocumentationStyles();

  return (
    <Surface
      subtle={subtle}
      sx={{
        width: "100%",
        overflowX: "auto",
        p: spacing.md,
        border: 0,
      }}
    >
      <Box
        role="table"
        sx={{
          width: "100%",
          minWidth,
          overflow: "hidden",
          border: `${borderWidths.default} solid ${borders.default}`,
          borderRadius: radius.medium,
          backgroundColor: surface,
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
    </Surface>
  );
}
