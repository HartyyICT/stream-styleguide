"use client";

import { Box, Typography } from "@mui/material";
import { spacing } from "@ssw/design-system";

export function StreamLogo() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
      <Box
        component="img"
        src="/brand/mark.svg"
        alt=""
        sx={{ width: 44, height: 44 }}
      />
      <Typography variant="h3">Stream Software</Typography>
    </Box>
  );
}

export function MicrosoftMark() {
  const squares = ["#F25022", "#7FBA00", "#00A4EF", "#FFB900"];

  return (
    <Box
      aria-hidden="true"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 6px)",
        gap: "2px",
      }}
    >
      {squares.map((backgroundColor) => (
        <Box key={backgroundColor} sx={{ width: 6, height: 6, backgroundColor }} />
      ))}
    </Box>
  );
}
