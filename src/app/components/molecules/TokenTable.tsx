"use client";

import { Box, Typography, type BoxProps } from "@mui/material";
import { borderWidths, radius, spacing } from "@/app/theme/tokens";
import TokenRow, { type TokenRowColumn } from "@/app/components/molecules/TokenRow";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

export type TokenTableRow = {
  token: string;
  columns: readonly TokenRowColumn[];
};

interface TokenTableProps extends BoxProps {
  headers: readonly string[];
  rows: readonly TokenTableRow[];
  columnsTemplate?: string;
}

export default function TokenTable({
  headers,
  rows,
  columnsTemplate,
  sx,
  ...props
}: TokenTableProps) {
  const { borders, subtleBackground, secondaryText } = useDocumentationStyles();

  return (
    <Box
      {...props}
      sx={{
        display: "grid",
        gap: spacing.sm,
        ...sx,
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "grid" },
          gridTemplateColumns:
            columnsTemplate ?? `1.1fr repeat(${headers.length - 1}, minmax(0, 1fr))`,
          gap: spacing.md,
          px: spacing.md,
          py: spacing.sm,
          border: `${borderWidths.default} solid ${borders.subtle}`,
          borderRadius: radius.medium,
          backgroundColor: subtleBackground,
        }}
      >
        {headers.map((header) => (
          <Typography
            key={header}
            variant="caption"
            sx={{ color: secondaryText, fontWeight: 700 }}
          >
            {header}
          </Typography>
        ))}
      </Box>

      {rows.map((row) => (
        <TokenRow
          key={row.token}
          token={row.token}
          columns={row.columns.map((column, index) => ({
            ...column,
            label: column.label ?? headers[index + 1],
          }))}
          columnsTemplate={columnsTemplate}
        />
      ))}
    </Box>
  );
}
