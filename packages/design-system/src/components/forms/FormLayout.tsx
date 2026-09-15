"use client";

import { Box, type BoxProps } from "@mui/material";
import { formTokens } from "../../theme/tokens";

export default function FormLayout({ sx, ...props }: BoxProps<"form">) {
  return (
    <Box
      component="form"
      {...props}
      sx={{
        display: "grid",
        gap: formTokens.layout.sectionGap,
        ...sx,
      }}
    />
  );
}
