"use client";

import { Box, type BoxProps } from "@mui/material";
import { forwardRef } from "react";
import { spacing } from "../../theme/tokens";

export interface GridBoxProps extends BoxProps {
  fullHeight?: boolean;
  fullWidth?: boolean;
  templateColumns?: string;
  templateRows?: string;
  autoRows?: string;
  autoColumns?: string;
  gap?: number | string;
  padding?: number | string;
  minWidth?: number | string;
}

const GridBox = forwardRef<HTMLDivElement, GridBoxProps>(
  (
    {
      fullHeight = false,
      fullWidth = false,
      templateColumns = "1fr",
      templateRows = "auto",
      autoRows,
      autoColumns,
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
        display: "grid",
        gridTemplateColumns: templateColumns,
        gridTemplateRows: templateRows,
        gridAutoRows: autoRows,
        gridAutoColumns: autoColumns,
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

GridBox.displayName = "GridBox";

export default GridBox;
