"use client";

import { Box } from "@mui/material";
import { radius } from "@/app/theme/tokens";
import { useDocumentationStyles } from "./useDocumentationStyles";

interface CodeBlockProps {
  children: string;
}

export default function CodeBlock({ children }: CodeBlockProps) {
  const { primaryText, subtleBackground } = useDocumentationStyles();

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
