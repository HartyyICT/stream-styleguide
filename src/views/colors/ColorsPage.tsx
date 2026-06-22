"use client";

import { Box, Divider, Typography } from "@mui/material";
import DocumentationLayout from "@/app/components/DocumentationLayout";
import ColorSwatch from "@/app/components/ColorSwatch";
import OnThisPage from "@/app/components/OnThisPage";
import { colors } from "@/app/theme/tokens";
import { useColorMode } from "@/app/theme/themeProvider";

const primaryColors = Object.entries(colors.primary);
const neutralColors = Object.entries(colors.neutral);
const colorSections = [
  { label: "Overview", href: "#colors" },
  { label: "Primary colors", href: "#primary-colors" },
  { label: "Neutral colors", href: "#neutral-colors" },
  { label: "Semantic colors", href: "#semantic-colors" },
] as const;

export default function ColorsPage() {
  const { mode } = useColorMode();
  const isDarkMode = mode === "dark";
  const primaryText = isDarkMode ? colors.neutral[50] : colors.neutral[900];
  const secondaryText = isDarkMode
    ? colors.neutral[300]
    : colors.neutral[600];
  const accent = isDarkMode ? colors.primary[300] : colors.primary[500];
  const subtleBackground = isDarkMode
    ? colors.neutral[700]
    : colors.neutral[100];
  const semanticVariant = isDarkMode ? "Dark" : "Light";
  const semanticColors = [
    {
      name: `Success ${semanticVariant}`,
      color: isDarkMode
        ? colors.semantic.success.dark
        : colors.semantic.success.light,
      description: "Completed actions and positive states",
    },
    {
      name: `Warning ${semanticVariant}`,
      color: isDarkMode
        ? colors.semantic.warning.dark
        : colors.semantic.warning.light,
      description: "Important attention and caution states",
    },
    {
      name: `Error ${semanticVariant}`,
      color: isDarkMode
        ? colors.semantic.error.dark
        : colors.semantic.error.light,
      description: "Errors, destructive actions and failures",
    },
    {
      name: `Info ${semanticVariant}`,
      color: isDarkMode
        ? colors.semantic.info.dark
        : colors.semantic.info.light,
      description: "Informative messages and system guidance",
    },
  ];

  return (
    <DocumentationLayout>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", xl: "minmax(0, 1fr) 220px" },
          gap: { xs: 4, xl: 8 },
          alignItems: "start",
        }}
      >
        <Box component="article" id="colors" sx={{ maxWidth: 920 }}>
          <Typography
            variant="overline"
            sx={{
              color: accent,
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            Design foundations
          </Typography>

          <Typography variant="h1" sx={{ mt: 1, mb: 2 }}>
            Colors
          </Typography>

          <Typography
            variant="body1"
            sx={{
              maxWidth: 720,
              mb: 3,
              color: secondaryText,
              fontSize: "1.0625rem",
              lineHeight: 1.75,
            }}
          >
            Color tokens create a consistent visual language across Stream
            Software applications. They support brand recognition, visual
            hierarchy, system feedback and accessible interfaces.
          </Typography>

          <Box
            sx={{
              p: 2.5,
              mb: 6,
              borderLeft: 4,
              borderColor: isDarkMode
                ? colors.semantic.info.dark
                : colors.semantic.info.light,
              backgroundColor: subtleBackground,
            }}
          >
            <Typography variant="body2" sx={{ color: primaryText }}>
              All color combinations must meet WCAG 2.1 AA: at least 4.5:1
              for regular text and 3:1 for large text and interactive
              elements.
            </Typography>
          </Box>

          <Box component="section" id="primary-colors" sx={{ scrollMarginTop: 96 }}>
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Primary colors
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: secondaryText, mb: 3, lineHeight: 1.7 }}
            >
              The primary scale represents Stream Software and is used for
              primary actions, selected navigation and key interactive states.
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, minmax(0, 1fr))",
                  sm: "repeat(3, minmax(0, 1fr))",
                  lg: "repeat(5, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              {primaryColors.map(([shade, color]) => (
                <ColorSwatch
                  key={shade}
                  name={`Primary ${shade}`}
                  color={color}
                />
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 6 }} />

          <Box component="section" id="neutral-colors" sx={{ scrollMarginTop: 96 }}>
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Neutral colors
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: secondaryText, mb: 3, lineHeight: 1.7 }}
            >
              Neutral tokens provide structure for text, borders, backgrounds
              and surfaces without competing with the interface content.
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, minmax(0, 1fr))",
                  sm: "repeat(3, minmax(0, 1fr))",
                  lg: "repeat(5, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              {neutralColors.map(([shade, color]) => (
                <ColorSwatch
                  key={shade}
                  name={`Neutral ${shade}`}
                  color={color}
                />
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 6 }} />

          <Box component="section" id="semantic-colors" sx={{ scrollMarginTop: 96 }}>
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Semantic colors
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: secondaryText, mb: 3, lineHeight: 1.7 }}
            >
              Semantic colors communicate a consistent meaning. Always combine
              color with a label, icon or message so meaning never depends on
              color alone.
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                  lg: "repeat(4, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              {semanticColors.map((token) => (
                <ColorSwatch key={token.name} {...token} />
              ))}
            </Box>
          </Box>
        </Box>

        <OnThisPage items={[...colorSections]} />
      </Box>
    </DocumentationLayout>
  );
}
