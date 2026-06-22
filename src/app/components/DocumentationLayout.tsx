"use client";

import { Box, Chip, InputBase, Typography } from "@mui/material";
import { BookOpen, Search } from "lucide-react";
import Sidebar from "./Sidebar";
import { colors, radius } from "../theme/tokens";
import ThemeModeToggle from "./ThemeModeToggle";
import { useColorMode } from "../theme/themeProvider";

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode } = useColorMode();
  const isDarkMode = mode === "dark";
  const pageBackground = isDarkMode
    ? colors.neutral[900]
    : colors.semantic.background;
  const surface = isDarkMode
    ? colors.neutral[800]
    : colors.semantic.surface;
  const border = isDarkMode ? colors.neutral[700] : colors.neutral[200];
  const primaryText = isDarkMode ? colors.neutral[50] : colors.neutral[900];
  const secondaryText = isDarkMode
    ? colors.neutral[300]
    : colors.neutral[600];
  const subtleBackground = isDarkMode
    ? colors.neutral[700]
    : colors.neutral[100];
  const selectedBackground = isDarkMode
    ? colors.neutral[700]
    : colors.primary[50];
  const accent = isDarkMode ? colors.primary[300] : colors.primary[500];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: pageBackground }}>
      <Box
        component="header"
        sx={{
          height: 64,
          position: "fixed",
          inset: "0 0 auto 0",
          zIndex: 1200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, md: 3 },
          backgroundColor: surface,
          borderBottom: 1,
          borderColor: border,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              display: "grid",
              placeItems: "center",
              borderRadius: radius.medium,
              color: colors.semantic.surface,
              backgroundColor: colors.primary[500],
            }}
          >
            <BookOpen size={20} />
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                color: primaryText,
                fontFamily: "var(--font-poppins), sans-serif",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              Stream Design System
            </Typography>
            <Typography variant="caption" sx={{ color: secondaryText }}>
              Styleguide
            </Typography>
          </Box>
          <Chip
            label="v0.1"
            size="small"
            sx={{
              display: { xs: "none", sm: "inline-flex" },
              backgroundColor: selectedBackground,
              color: accent,
              fontWeight: 700,
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 280,
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 1,
              px: 1.5,
              py: 0.5,
              border: 1,
              borderColor: border,
              borderRadius: radius.medium,
              backgroundColor: subtleBackground,
              color: secondaryText,
            }}
          >
            <Search size={17} />
            <InputBase
              placeholder="Search documentation..."
              inputProps={{ "aria-label": "Search documentation" }}
              sx={{ flex: 1, fontSize: 14, color: primaryText }}
            />
          </Box>
          <ThemeModeToggle />
        </Box>
      </Box>

      <Sidebar />

      <Box
        component="main"
        sx={{
          ml: { xs: 0, md: "280px" },
          pt: "64px",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1440,
            mx: "auto",
            px: { xs: 2.5, sm: 4, lg: 6 },
            py: { xs: 4, lg: 6 },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
