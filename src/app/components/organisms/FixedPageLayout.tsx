"use client";

import { Box, type BoxProps } from "@mui/material";
import PageRegion from "@/app/components/atoms/PageRegion";
import { borderWidths, pageLayoutTokens, radius, spacing } from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

export default function FixedPageLayout({ sx, ...props }: BoxProps) {
  const { borders, surface, pageBackground } = useDocumentationStyles();

  return (
    <Box
      {...props}
      sx={{
        display: "grid",
        gap: spacing.md,
        p: spacing.md,
        border: `${borderWidths.default} solid ${borders.default}`,
        borderRadius: radius.large,
        backgroundColor: pageBackground,
        ...sx,
      }}
    >
      <PageRegion label="Navbar / global actions" sx={{ minHeight: pageLayoutTokens.navbarHeight }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "9rem minmax(0, 1fr)",
          },
          gap: spacing.md,
        }}
      >
        <PageRegion label="Sidebar navigation" muted sx={{ minHeight: 360 }} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: pageLayoutTokens.contentGridColumns.desktop,
            },
            gap: spacing.md,
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gap: spacing.md,
              p: spacing.md,
              border: `${borderWidths.default} solid ${borders.subtle}`,
              borderRadius: radius.large,
              backgroundColor: surface,
            }}
          >
            <PageRegion label="Page intro" />
            <PageRegion label="Section" muted sx={{ minHeight: 84 }} />
            <PageRegion label="Section" muted sx={{ minHeight: 84 }} />
            <PageRegion label="Section" muted sx={{ minHeight: 84 }} />
          </Box>

          <PageRegion label="On this page" muted sx={{ minHeight: 220, alignSelf: "start" }} />
        </Box>
      </Box>
    </Box>
  );
}
