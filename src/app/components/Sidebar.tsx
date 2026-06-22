import { Box, Divider, Typography } from "@mui/material";
import {
  Accessibility,
  Blend,
  Circle,
  Grid3X3,
  Palette,
  ScanText,
  Smartphone,
  Sparkles,
  Type,
} from "lucide-react";
import { colors, radius } from "../theme/tokens";

const foundationItems = [
  { label: "Colors", icon: Palette, active: true },
  { label: "Typography", icon: Type },
  { label: "Spacing", icon: Grid3X3 },
  { label: "Border Radius", icon: Circle },
  { label: "Elevation & Shadows", icon: Blend },
  { label: "Iconography", icon: Sparkles },
  { label: "Accessibility", icon: Accessibility },
  { label: "Responsiveness", icon: Smartphone },
];

export default function Sidebar() {
  return (
    <Box
      component="aside"
      sx={{
        width: 280,
        height: "calc(100vh - 64px)",
        position: "fixed",
        top: 64,
        left: 0,
        overflowY: "auto",
        borderRight: `1px solid ${colors.neutral[200]}`,
        backgroundColor: colors.semantic.surface,
        px: 2,
        py: 3,
        display: { xs: "none", md: "block" },
      }}
    >
      <Typography
        variant="overline"
        sx={{
          display: "block",
          px: 1.5,
          mb: 1,
          color: colors.neutral[500],
          fontWeight: 700,
          letterSpacing: "0.08em",
        }}
      >
        Getting started
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          px: 1.5,
          py: 1,
          color: colors.neutral[700],
          borderRadius: radius.medium,
        }}
      >
        <ScanText size={18} />
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Overview
        </Typography>
      </Box>

      <Divider sx={{ my: 2.5 }} />

      <Typography
        variant="overline"
        sx={{
          display: "block",
          px: 1.5,
          mb: 1,
          color: colors.neutral[500],
          fontWeight: 700,
          letterSpacing: "0.08em",
        }}
      >
        Foundations
      </Typography>

      <Box component="nav" aria-label="Design foundations">
        {foundationItems.map(({ label, icon: Icon, active }) => (
          <Box
            component="a"
            href={active ? "#colors" : "#"}
            key={label}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              px: 1.5,
              py: 1,
              mb: 0.5,
              borderRadius: radius.medium,
              color: active ? colors.primary[700] : colors.neutral[600],
              backgroundColor: active ? colors.primary[50] : "transparent",
              borderLeft: active
                ? `3px solid ${colors.primary[500]}`
                : "3px solid transparent",
              "&:hover": {
                backgroundColor: active
                  ? colors.primary[50]
                  : colors.neutral[50],
                color: colors.primary[700],
              },
            }}
          >
            <Icon size={18} strokeWidth={1.8} />
            <Typography variant="body2" sx={{ fontWeight: active ? 700 : 500 }}>
              {label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
