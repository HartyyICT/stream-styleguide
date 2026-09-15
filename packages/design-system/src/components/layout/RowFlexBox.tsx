"use client";

import { Box, type BoxProps } from "@mui/material";
import { forwardRef } from "react";
import { spacing } from "../../theme/tokens";

export interface RowFlexBoxProps extends BoxProps {
  centerX?: boolean;
  centerY?: boolean;
  fullHeight?: boolean;
  fullWidth?: boolean;
  gap?: number | string;
  padding?: number | string;
  minWidth?: number | string;
}

const RowFlexBox = forwardRef<HTMLDivElement, RowFlexBoxProps>(
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
        alignItems: centerY ? "center" : "flex-start",
        justifyContent: centerX ? "center" : "flex-start",
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

RowFlexBox.displayName = "RowFlexBox";

export default RowFlexBox;
