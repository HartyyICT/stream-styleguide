"use client";

import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import { colors } from "../theme/tokens";
import { useColorMode } from "../theme/themeProvider";
import Navbar from "./Navbar";

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

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: pageBackground }}>
      <Navbar />
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
