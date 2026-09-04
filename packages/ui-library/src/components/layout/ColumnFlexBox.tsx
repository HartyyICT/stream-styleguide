"use client";

import { Box, type BoxProps } from "@mui/material";
import { forwardRef } from "react";
import { spacing } from "../../theme/tokens";

export interface ColumnFlexBoxProps extends BoxProps {
  centerX?: boolean;
  centerY?: boolean;
  fullHeight?: boolean;
  fullWidth?: boolean;
  gap?: number | string;
  padding?: number | string;
  minWidth?: number | string;
}

const ColumnFlexBox = forwardRef<HTMLDivElement, ColumnFlexBoxProps>(
  (
    {
      centerX = false,
      centerY = false,
      fullHeight = false,
      fullWidth = false,
      gap = spacing.lg,
      padding = 0,
      minWidth = 0,
      sx,
      ...props
    },
    ref,
  ) => (
    <Box
      ref={ref}
      {...props}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: centerX ? "center" : "flex-start",
        justifyContent: centerY ? "center" : "flex-start",
        width: fullWidth ? "100%" : undefined,
        height: fullHeight ? "100%" : undefined,
        gap,
        p: padding,
        minWidth,
        ...sx,
      }}
    />
  ),
);

ColumnFlexBox.displayName = "ColumnFlexBox";

export default ColumnFlexBox;
