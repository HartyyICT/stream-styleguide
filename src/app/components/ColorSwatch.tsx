import { Box, Typography } from "@mui/material";
import { colors, radius, shadows } from "../theme/tokens";

interface ColorSwatchProps {
  name: string;
  color: string;
  description?: string;
}

export default function ColorSwatch({
  name,
  color,
  description,
}: ColorSwatchProps) {
  return (
    <Box
      sx={{
        overflow: "hidden",
        backgroundColor: colors.semantic.surface,
        border: `1px solid ${colors.neutral[200]}`,
        borderRadius: radius.medium,
        boxShadow: shadows.level1,
      }}
    >
      <Box
        sx={{
          height: 96,
          backgroundColor: color,
        }}
      />

      <Box sx={{ p: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
          {name}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            color: colors.neutral[500],
            fontFamily: "var(--font-space-mono), monospace",
          }}
        >
          {color}
        </Typography>
        {description && (
          <Typography
            variant="caption"
            sx={{ display: "block", color: colors.neutral[600], mt: 1 }}
          >
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
