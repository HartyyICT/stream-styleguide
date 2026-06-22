import { Box, Chip, InputBase, Typography } from "@mui/material";
import { BookOpen, Search } from "lucide-react";
import Sidebar from "./Sidebar";
import { colors, radius } from "../theme/tokens";

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: colors.semantic.background }}>
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
          backgroundColor: colors.semantic.surface,
          borderBottom: `1px solid ${colors.neutral[200]}`,
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
                color: colors.neutral[900],
                fontFamily: "var(--font-poppins), sans-serif",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              Stream Design System
            </Typography>
            <Typography variant="caption" sx={{ color: colors.neutral[500] }}>
              Styleguide
            </Typography>
          </Box>
          <Chip
            label="v0.1"
            size="small"
            sx={{
              display: { xs: "none", sm: "inline-flex" },
              backgroundColor: colors.primary[50],
              color: colors.primary[700],
              fontWeight: 700,
            }}
          />
        </Box>

        <Box
          sx={{
            width: 280,
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 0.5,
            border: `1px solid ${colors.neutral[200]}`,
            borderRadius: radius.medium,
            backgroundColor: colors.neutral[50],
          }}
        >
          <Search size={17} color={colors.neutral[500]} />
          <InputBase
            placeholder="Search documentation..."
            inputProps={{ "aria-label": "Search documentation" }}
            sx={{ flex: 1, fontSize: 14 }}
          />
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
