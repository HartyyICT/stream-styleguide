"use client";

import { Box, type BoxProps } from "@mui/material";
import { borderWidths, radius } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

interface TokenCodeProps extends BoxProps {
  children: string;
}

export default function TokenCode({ children, sx, ...props }: TokenCodeProps) {
  const { borders, subtleBackground, accent } = useSemanticColors();

  return (
    <Box
      component="code"
      {...props}
      sx={{
        width: "fit-content",
        maxWidth: "100%",
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
        overflow: "hidden",
        textOverflow: "ellipsis",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
