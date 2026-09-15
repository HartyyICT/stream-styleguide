"use client";

import { Box } from "@mui/material";
import { radius, useSemanticColors } from "@ssw/design-system";

interface CodeBlockProps {
  children: string;
}

export default function CodeBlock({ children }: CodeBlockProps) {
  const { primaryText, subtleBackground } = useSemanticColors();

  return (
    <Box
      component="pre"
      sx={{
        m: 0,
        p: 2,
        overflowX: "auto",
        color: primaryText,
        backgroundColor: subtleBackground,
        borderRadius: radius.small,
        fontFamily: "var(--font-space-mono), monospace",
        fontSize: "0.875rem",
        lineHeight: 1.7,
      }}
    >
      <code>{children}</code>
    </Box>
  );
}
