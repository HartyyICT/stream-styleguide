"use client";

import { Box, type BoxProps } from "@mui/material";
import { borderWidths, radius } from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

interface TokenCodeProps extends BoxProps {
  children: string;
}

export default function TokenCode({ children, sx, ...props }: TokenCodeProps) {
  const { borders, subtleBackground, accent } = useDocumentationStyles();

  return (
    <Box
      component="code"
      {...props}
      sx={{
        width: "fit-content",
        px: 0.75,
        py: 0.25,
        display: "inline-flex",
        alignItems: "center",
        color: accent,
        border: `${borderWidths.default} solid ${borders.subtle}`,
        borderRadius: radius.small,
        backgroundColor: subtleBackground,
        fontFamily: "var(--font-space-mono), monospace",
        fontSize: "0.8125rem",
        lineHeight: 1.4,
        whiteSpace: "nowrap",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
