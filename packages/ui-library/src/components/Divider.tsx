"use client";

import { Box, type BoxProps } from "@mui/material";
import { borderWidths } from "../theme/tokens";
import { useSemanticColors } from "../theme/useSemanticColors";

export default function Divider({ sx, ...props }: BoxProps) {
  const { borders } = useSemanticColors();

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
