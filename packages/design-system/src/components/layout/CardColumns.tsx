"use client";

import { Box, type BoxProps } from "@mui/material";
import { Children, type ReactNode } from "react";
import { spacing } from "../../theme/tokens";

export interface CardColumnsProps extends Omit<BoxProps, "children"> {
  children: ReactNode;
  columns?: number;
  gap?: number | string;
}

export default function CardColumns({
  children,
  columns = 2,
  gap = spacing.md,
  sx,
  ...props
}: CardColumnsProps) {
  const cards = Children.toArray(children);
  const tracks = Array.from({ length: columns }, (_, track) =>
    cards.filter((_card, index) => index % columns === track),
  );

  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        width: "100%",
        gap,
        ...sx,
      }}
    >
      {tracks.map((track, index) => (
        <Box
          key={index}
          sx={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap,
          }}
        >
          {track}
        </Box>
      ))}
    </Box>
  );
}
