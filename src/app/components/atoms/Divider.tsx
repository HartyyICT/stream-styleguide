"use client";

import { Box, type BoxProps } from "@mui/material";
import { borderWidths } from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

export default function Divider({ sx, ...props }: BoxProps) {
  const { borders } = useDocumentationStyles();

  return (
    <Box
      role="separator"
      {...props}
      sx={{
        width: "100%",
        height: 0,
        borderTop: `${borderWidths.default} solid ${borders.subtle}`,
        ...sx,
      }}
    />
  );
}
