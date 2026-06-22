"use client";

import { Box, Divider, Typography, useTheme } from "@mui/material";
import DocumentationLayout from "@/app/components/DocumentationLayout";
import ColorSwatch from "@/app/components/ColorSwatch";
import OnThisPage from "@/app/components/OnThisPage";
import { colors, radius, shadows } from "@/app/theme/tokens";
import { useColorMode } from "@/app/theme/themeProvider";

const primaryColors = Object.entries(colors.primary);
const neutralColors = Object.entries(colors.neutral);

const colorSections = [
  { label: "Overview", href: "#colors" },
  { label: "Color categories", href: "#color-categories" },
  { label: "Token usage", href: "#token-usage" },
  { label: "Primary colors", href: "#primary-colors" },
  { label: "Neutral colors", href: "#neutral-colors" },
  { label: "Semantic colors", href: "#semantic-colors" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const colorCategories = [
  {
    title: "Primary scale",
    description:
      "Used for brand recognition, primary actions, selected navigation states and key interactive elements.",
    example: "colors.primary[500]",
  },
  {
    title: "Neutral scale",
    description:
      "Used for text, borders, dividers, backgrounds, surfaces and general interface structure.",
    example: "colors.neutral[900]",
  },
  {
    title: "Semantic colors",
    description:
      "Used for system feedback such as success, warning, error and information states.",
    example: "colors.semantic.error.main",
  },
];

const tokenExamples = [
  {
    title: "Primary action",
    description: "Use primary tokens for important actions and active states.",
    code: `backgroundColor: colors.primary[500]`,
  },
  {
    title: "Text color",
    description: "Use neutral tokens for readable text hierarchy.",
    code: `color: colors.neutral[900]`,
  },
  {
    title: "Surface",
    description: "Use semantic surface tokens for cards, dialogs and panels.",
    code: `backgroundColor: colors.semantic.surface`,
  },
  {
    title: "System feedback",
    description:
      "Use semantic tokens for status messages and feedback states.",
    code: `color: colors.semantic.success.main`,
  },
];

const guidelines = [
  "Use color tokens from the shared design system instead of custom hex values.",
  "Use the primary scale for brand elements, primary actions and selected navigation states.",
  "Use neutral tokens for text, borders, backgrounds and layout structure.",
  "Use semantic colors only when a specific status or message needs to be communicated.",
  "Do not communicate meaning through color alone. Combine color with text, icons or labels.",
  "Always check contrast when placing text or icons on colored backgrounds.",
];

export default function ColorsPage() {
  const theme = useTheme();
  const { mode } = useColorMode();

  const isDarkMode = mode === "dark";

  const surface = isDarkMode ? colors.neutral[800] : colors.semantic.surface;
  const border = isDarkMode ? colors.neutral[700] : colors.neutral[200];
  const primaryText = isDarkMode ? colors.neutral[50] : colors.neutral[900];
  const secondaryText = isDarkMode
    ? colors.neutral[300]
    : colors.neutral[600];
  const accent = isDarkMode ? colors.primary[300] : colors.primary[500];
  const subtleBackground = isDarkMode
    ? colors.neutral[700]
    : colors.neutral[100];
  const selectedBackground = isDarkMode
    ? colors.neutral[700]
    : colors.primary[50];

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
              borderColor: accent,
              backgroundColor: subtleBackground,
            }}
          >
            <Typography variant="body2" sx={{ color: primaryText }}>
              Color choices are defined by the Stream Design Foundations and
              implemented through shared design tokens. Avoid custom hex values
              inside individual components unless a new token has been
              approved.
            </Typography>
          </Box>

          <Box
            component="section"
            id="color-categories"
            sx={{ scrollMarginTop: 96 }}
          >
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Color categories
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: secondaryText, mb: 3, lineHeight: 1.7 }}
            >
              The color system is divided into three categories. Each category
              has a specific role within the interface.
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(3, minmax(0, 1fr))",
                },
                gap: 2,
                gridAutoRows: "1fr",
              }}
            >
              {colorCategories.map((category) => (
                <Box
                  key={category.title}
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: surface,
                    border: 1,
                    borderColor: border,
                    borderRadius: radius.medium,
                    boxShadow: shadows.level1,
                  }}
                >
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    {category.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: secondaryText, mb: 2, lineHeight: 1.7 }}
                  >
                    {category.description}
                  </Typography>

                  <Typography
                    component="code"
                    sx={{
                      display: "inline-block",
                      mt: "auto",
                      width: "fit-content",
                      px: 1,
                      py: 0.5,
                      color: primaryText,
                      backgroundColor: selectedBackground,
                      borderRadius: radius.small,
                      fontFamily: theme.typography.fontFamilyMonospace,
                      fontSize: "0.8125rem",
                    }}
                  >
                    {category.example}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 6 }} />

          <Box
            component="section"
            id="token-usage"
            sx={{ scrollMarginTop: 96 }}
          >
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Token usage
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: secondaryText, mb: 3, lineHeight: 1.7 }}
            >
              Developers should use the shared color tokens instead of
              hardcoded color values. This keeps applications consistent and
              makes future design changes easier to maintain.
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(2, minmax(0, 1fr))",
                },
                gap: 2,
                gridAutoRows: "1fr",
              }}
            >
              {tokenExamples.map((example) => (
                <Box
                  key={example.title}
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: surface,
                    border: 1,
                    borderColor: border,
                    borderRadius: radius.medium,
                    boxShadow: shadows.level1,
                  }}
                >
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    {example.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: secondaryText, mb: 2, lineHeight: 1.7 }}
                  >
                    {example.description}
                  </Typography>

                  <Box
                    component="pre"
                    sx={{
                      m: 0,
                      mt: "auto",
                      p: 2,
                      overflowX: "auto",
                      color: primaryText,
                      backgroundColor: subtleBackground,
                      borderRadius: radius.small,
                      fontFamily: theme.typography.fontFamilyMonospace,
                      fontSize: "0.875rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {example.code}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 6 }} />

          <Box
            component="section"
            id="primary-colors"
            sx={{ scrollMarginTop: 96 }}
          >
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

          <Box
            component="section"
            id="neutral-colors"
            sx={{ scrollMarginTop: 96 }}
          >
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

          <Box
            component="section"
            id="semantic-colors"
            sx={{ scrollMarginTop: 96 }}
          >
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

          <Divider sx={{ my: 6 }} />

          <Box component="section" id="guidelines" sx={{ scrollMarginTop: 96 }}>
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Guidelines
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: secondaryText, mb: 3, lineHeight: 1.7 }}
            >
              The following guidelines keep color usage consistent, meaningful
              and maintainable across Stream Software applications.
            </Typography>

            <Box
              component="ul"
              sx={{
                m: 0,
                pl: 3,
                color: secondaryText,
                lineHeight: 1.8,
              }}
            >
              {guidelines.map((guideline) => (
                <Typography
                  key={guideline}
                  component="li"
                  variant="body1"
                  sx={{ mb: 1 }}
                >
                  {guideline}
                </Typography>
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 6 }} />

          <Box
            component="section"
            id="accessibility"
            sx={{ scrollMarginTop: 96 }}
          >
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Accessibility
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: secondaryText, mb: 3, lineHeight: 1.7 }}
            >
              All color combinations must support readable and accessible
              interfaces. Text, icons and interactive elements must meet the
              required contrast ratio for their context.
            </Typography>

            <Box
              sx={{
                p: 3,
                backgroundColor: surface,
                border: 1,
                borderColor: border,
                borderRadius: radius.medium,
                boxShadow: shadows.level1,
              }}
            >
              <Typography variant="h3" sx={{ mb: 1 }}>
                Contrast requirements
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: secondaryText, lineHeight: 1.7 }}
              >
                Follow WCAG 2.1 AA: at least 4.5:1 for regular text and 3:1
                for large text and interactive elements. Do not rely on color
                alone to communicate status, priority or meaning.
              </Typography>
            </Box>
          </Box>
        </Box>

        <OnThisPage items={[...colorSections]} />
      </Box>
    </DocumentationLayout>
  );
}