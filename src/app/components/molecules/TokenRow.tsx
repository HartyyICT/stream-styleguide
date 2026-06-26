"use client";

import { Box, Typography, type BoxProps } from "@mui/material";
import { borderWidths, radius, spacing } from "@/app/theme/tokens";
import TokenCode from "@/app/components/atoms/TokenCode";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

export type TokenRowColumn = {
  label?: string;
  value: string;
  code?: boolean;
};

interface TokenRowProps extends BoxProps {
  token: string;
  columns: readonly TokenRowColumn[];
  columnsTemplate?: string;
}

export default function TokenRow({
  token,
  columns,
  columnsTemplate,
  sx,
  ...props
}: TokenRowProps) {
  const { borders, surface, secondaryText } = useDocumentationStyles();

  return (
    <Box
      {...props}
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: columnsTemplate ?? `1.1fr repeat(${columns.length}, minmax(0, 1fr))`,
        },
        gap: { xs: spacing.sm, md: spacing.md },
        alignItems: "center",
        p: spacing.md,
        border: `${borderWidths.default} solid ${borders.subtle}`,
        borderRadius: radius.medium,
        backgroundColor: surface,
        ...sx,
      }}
    >
      <TokenCode>{token}</TokenCode>
      {columns.map((column, index) => (
        <Box key={`${token}-${column.value}-${index}`}>
          {column.label && (
            <Typography
              variant="caption"
              sx={{
                display: { xs: "block", md: "none" },
                mb: 0.25,
                color: secondaryText,
                fontWeight: 700,
              }}
            >
              {column.label}
            </Typography>
          )}
          {column.code ? (
            <TokenCode>{column.value}</TokenCode>
          ) : (
            <Typography variant="body2" sx={{ color: secondaryText }}>
              {column.value}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}
