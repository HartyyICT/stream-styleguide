"use client";

import { Box, type BoxProps } from "@mui/material";
import { type ReactNode } from "react";
import { radius } from "@/app/theme/tokens";
import { useDocumentationStyles } from "./useDocumentationStyles";

interface IconBoxProps extends BoxProps {
  children: ReactNode;
}

export default function IconBox({ children, sx, ...props }: IconBoxProps) {
  const { interaction, accent } = useDocumentationStyles();

  return (
    <Box
      {...props}
      sx={{
        width: 42,
        height: 42,
        display: "grid",
        placeItems: "center",
        color: accent,
        borderRadius: radius.medium,
        backgroundColor: interaction.activeBackground,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
