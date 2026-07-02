"use client";

import { Box, Typography } from "@mui/material";
import { useSemanticColors } from "@ssw/ui-library";

interface GuidelineListProps {
  items: readonly string[];
}

export default function GuidelineList({ items }: GuidelineListProps) {
  const { secondaryText } = useSemanticColors();

  return (
    <Box
      component="ul"
      sx={{ m: 0, pl: 3, display: "grid", gap: 1.5, color: secondaryText }}
    >
      {items.map((item) => (
        <Typography
          key={item}
          component="li"
          sx={{ color: secondaryText, lineHeight: 1.7 }}
        >
          {item}
        </Typography>
      ))}
    </Box>
  );
}
