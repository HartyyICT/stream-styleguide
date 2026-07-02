"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import Sidebar from "@/app/components/organisms/Sidebar";
import { colors, pageLayoutTokens } from "../../theme/tokens";
import { useColorMode } from "../../theme/themeProvider";
import Navbar from "@/app/components/organisms/Navbar";
import { sidebarMotion, sidebarTransition } from "@/app/components/organisms/sidebarMotion";

let persistedSidebarCollapsed = false;

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    persistedSidebarCollapsed,
  );
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const { mode } = useColorMode();
  const isDarkMode = mode === "dark";
  const pageBackground = isDarkMode
    ? colors.neutral[900]
    : colors.semantic.background;

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: pageBackground }}>
      <Navbar
        onMenuClick={() => setMobileNavigationOpen(true)}
        sidebarCollapsed={sidebarCollapsed}
        onSidebarToggle={() =>
          setSidebarCollapsed((collapsed) => {
            const next = !collapsed;
            persistedSidebarCollapsed = next;
            return next;
          })
        }
      />
      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileNavigationOpen}
        onMobileClose={() => setMobileNavigationOpen(false)}
      />

      <Box
        component="main"
        sx={{
          pt: pageLayoutTokens.navbarHeight,
          minHeight: "100vh",
          ml: {
            xs: 0,
            md: sidebarCollapsed
              ? `${sidebarMotion.collapsedWidth}px`
              : `${sidebarMotion.expandedWidth}px`,
          },
          transition: `margin-left ${sidebarTransition}`,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: pageLayoutTokens.shellMaxWidth,
            mx: "auto",
            px: {
              xs: pageLayoutTokens.shellPaddingX.mobile,
              sm: pageLayoutTokens.shellPaddingX.tablet,
              lg: pageLayoutTokens.shellPaddingX.desktop,
            },
            py: {
              xs: pageLayoutTokens.shellPaddingY.mobile,
              lg: pageLayoutTokens.shellPaddingY.desktop,
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
