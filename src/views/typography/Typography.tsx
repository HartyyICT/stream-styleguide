"use client";

import { Box, Divider, Typography, useTheme } from "@mui/material";
import DocumentationLayout from "@/app/components/DocumentationLayout";
import OnThisPage from "@/app/components/OnThisPage";
import { colors, radius, shadows } from "@/app/theme/tokens";
import { useColorMode } from "@/app/theme/themeProvider";

const typographySections = [
  { label: "Overview", href: "#typography" },
  { label: "Font families", href: "#font-families" },
  { label: "Font setup", href: "#font-setup" },
  { label: "Typography scale", href: "#typography-scale" },
  { label: "Component", href: "#component" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const fontFamilies = [
  {
    name: "Poppins",
    role: "Heading font",
    usage:
      "Used for page titles, section headings, buttons and interactive elements.",
    sample: "Headings & actions",
    fontFamily: "var(--font-poppins), Arial, sans-serif",
  },
  {
    name: "Open Sans",
    role: "Body font",
    usage:
      "Used for paragraphs, descriptions, form text and longer readable content.",
    sample: "Readable body text",
    fontFamily: "var(--font-open-sans), Arial, sans-serif",
  },
  {
    name: "Space Mono",
    role: "Monospace font",
    usage: "Used for numerical values, table data and technical values.",
    sample: "123456.789",
    fontFamily: "var(--font-space-mono), monospace",
  },
];

const typographyScale = [
  {
    token: "H1",
    font: "Poppins",
    fontFamily: "var(--font-poppins), Arial, sans-serif",
    weight: 600,
    size: "32px / 2rem",
    fontSize: "2rem",
    lineHeight: 1.2,
    usage: "Page titles",
    example: "h1. Page title",
  },
  {
    token: "H2",
    font: "Poppins",
    fontFamily: "var(--font-poppins), Arial, sans-serif",
    weight: 600,
    size: "24px / 1.5rem",
    fontSize: "1.5rem",
    lineHeight: 1.25,
    usage: "Main sections",
    example: "h2. Main section",
  },
  {
    token: "H3",
    font: "Poppins",
    fontFamily: "var(--font-poppins), Arial, sans-serif",
    weight: 600,
    size: "20px / 1.25rem",
    fontSize: "1.25rem",
    lineHeight: 1.3,
    usage: "Subsections",
    example: "h3. Subsection",
  },
  {
    token: "H4",
    font: "Poppins",
    fontFamily: "var(--font-poppins), Arial, sans-serif",
    weight: 500,
    size: "18px / 1.125rem",
    fontSize: "1.125rem",
    lineHeight: 1.35,
    usage: "Card titles / modal titles",
    example: "h4. Card title",
  },
  {
    token: "H5",
    font: "Poppins",
    fontFamily: "var(--font-poppins), Arial, sans-serif",
    weight: 500,
    size: "16px / 1rem",
    fontSize: "1rem",
    lineHeight: 1.4,
    usage: "Small section titles",
    example: "h5. Small section title",
  },
  {
    token: "H6",
    font: "Poppins",
    fontFamily: "var(--font-poppins), Arial, sans-serif",
    weight: 500,
    size: "14px / 0.875rem",
    fontSize: "0.875rem",
    lineHeight: 1.45,
    usage: "Table headers / labels",
    example: "h6. Table header",
  },
  {
    token: "Body 1",
    font: "Open Sans",
    fontFamily: "var(--font-open-sans), Arial, sans-serif",
    weight: 400,
    size: "16px / 1rem",
    fontSize: "1rem",
    lineHeight: 1.5,
    usage: "General text",
    example: "body1. General text for readable interface content.",
  },
  {
    token: "Body 2",
    font: "Open Sans",
    fontFamily: "var(--font-open-sans), Arial, sans-serif",
    weight: 400,
    size: "14px / 0.875rem",
    fontSize: "0.875rem",
    lineHeight: 1.45,
    usage: "Supporting text",
    example: "body2. Supporting text, hints and metadata.",
  },
  {
    token: "Subtitle 1",
    font: "Open Sans",
    fontFamily: "var(--font-open-sans), Arial, sans-serif",
    weight: 500,
    size: "16px / 1rem",
    fontSize: "1rem",
    lineHeight: 1.4,
    usage: "Subtitles",
    example: "subtitle1. Important supporting title",
  },
  {
    token: "Subtitle 2",
    font: "Open Sans",
    fontFamily: "var(--font-open-sans), Arial, sans-serif",
    weight: 500,
    size: "14px / 0.875rem",
    fontSize: "0.875rem",
    lineHeight: 1.35,
    usage: "Small subtitles",
    example: "subtitle2. Compact supporting title",
  },
  {
    token: "Caption",
    font: "Open Sans",
    fontFamily: "var(--font-open-sans), Arial, sans-serif",
    weight: 400,
    size: "12px / 0.75rem",
    fontSize: "0.75rem",
    lineHeight: 1.3,
    usage: "Metadata / helper text",
    example: "caption. Metadata or helper text",
  },
  {
    token: "Button",
    font: "Poppins",
    fontFamily: "var(--font-poppins), Arial, sans-serif",
    weight: 500,
    size: "14px / 0.875rem",
    fontSize: "0.875rem",
    lineHeight: 1.4,
    usage: "Buttons",
    example: "Button text",
  },
  {
    token: "Table Numeric",
    font: "Space Mono",
    fontFamily: "var(--font-space-mono), monospace",
    weight: 400,
    size: "14px / 0.875rem",
    fontSize: "0.875rem",
    lineHeight: 1.4,
    usage: "Numerical values",
    example: "123456.789",
  },
];

const guidelines = [
  "Use consistent font families within similar components.",
  "Create a clear hierarchy between headings, body text and supporting information.",
  "Use sufficient line-height to improve readability.",
  "Limit the use of fully uppercase text.",
  "Use Open Sans for longer text blocks.",
  "Use Space Mono for numerical data in tables and data-driven components.",
];

export default function TypographyPage() {
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
        <Box component="article" id="typography" sx={{ maxWidth: 920 }}>
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
            Typography
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
            Typography supports readability, scanability and visual hierarchy
            within complex enterprise interfaces. The Stream typography system
            defines consistent text styles for headings, body text, supporting
            information, buttons and numerical data.
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
              Typography choices are defined by the Stream Design Foundations
              and implemented through shared theme tokens. Avoid one-off font
              sizes, weights or font families outside the defined typography
              scale.
            </Typography>
          </Box>

          <Box
            component="section"
            id="font-families"
            sx={{ scrollMarginTop: 96 }}
          >
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Font families
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: secondaryText, mb: 3, lineHeight: 1.7 }}
            >
              The typography system uses three font families. Each font family
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
              }}
            >
              {fontFamilies.map((font) => (
                <Box
                  key={font.name}
                  sx={{
                    p: 3,
                    backgroundColor: surface,
                    border: 1,
                    borderColor: border,
                    borderRadius: radius.medium,
                    boxShadow: shadows.level1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 1,
                      color: accent,
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    {font.role}
                  </Typography>

                  <Typography
                    sx={{
                      mb: 1.5,
                      color: primaryText,
                      fontFamily: font.fontFamily,
                      fontSize: "1.5rem",
                      fontWeight: 600,
                      lineHeight: 1.25,
                    }}
                  >
                    {font.name}
                  </Typography>

                  <Typography
                    sx={{
                      mb: 2,
                      color: primaryText,
                      fontFamily: font.fontFamily,
                      fontSize: "1rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {font.sample}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: secondaryText, lineHeight: 1.7 }}
                  >
                    {font.usage}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 6 }} />

          <Box
            component="section"
            id="font-setup"
            sx={{ scrollMarginTop: 96 }}
          >
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Font setup
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: secondaryText, mb: 3, lineHeight: 1.7 }}
            >
              The Stream typography system is loaded at application level.
              Fonts are exposed through CSS variables and mapped inside the
              shared theme. Developers should use the shared ThemeProvider and
              typography scale instead of importing or defining fonts manually
              inside individual components.
            </Typography>

            <Box
              sx={{
                p: 3,
                mb: 3,
                backgroundColor: surface,
                border: 1,
                borderColor: border,
                borderRadius: radius.medium,
                boxShadow: shadows.level1,
              }}
            >
              <Typography variant="h3" sx={{ mb: 1 }}>
                Recommended usage
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: secondaryText, mb: 2, lineHeight: 1.7 }}
              >
                Developers should use the defined typography styles through the
                shared theme. This keeps headings, body text, buttons and
                numerical values consistent across applications.
              </Typography>

              <Box
                component="pre"
                sx={{
                  m: 0,
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
{`<Typography variant="h1">Page title</Typography>
<Typography variant="body1">Readable body text</Typography>
<Typography variant="button">Button text</Typography>`}
              </Box>
            </Box>

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
                Numerical values
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: secondaryText, mb: 2, lineHeight: 1.7 }}
              >
                Use the monospace font for numerical values, table data,
                technical values and token examples. This improves alignment
                and readability in data-heavy interfaces.
              </Typography>

              <Box
                component="pre"
                sx={{
                  m: 0,
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
{`<Typography sx={{ fontFamily: theme.typography.fontFamilyMonospace }}>
  123456.789
</Typography>`}
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 6 }} />

          <Box
            component="section"
            id="typography-scale"
            sx={{ scrollMarginTop: 96 }}
          >
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Typography scale
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: secondaryText, mb: 3, lineHeight: 1.7 }}
            >
              The typography scale defines the available text styles, including
              font family, weight, size, line-height and intended use.
            </Typography>

            <Box
              sx={{
                overflowX: "auto",
                backgroundColor: surface,
                border: 1,
                borderColor: border,
                borderRadius: radius.medium,
                boxShadow: shadows.level1,
              }}
            >
              <Box sx={{ minWidth: 860 }}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 0.8fr 1.2fr 1fr 1.5fr",
                    gap: 2,
                    p: 2,
                    backgroundColor: subtleBackground,
                    borderBottom: 1,
                    borderColor: border,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    Token
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    Font
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    Weight
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    Size
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    Line-height
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    Use
                  </Typography>
                </Box>

                {typographyScale.map((item) => (
                  <Box
                    key={item.token}
                    sx={{
                      display: "grid",
                      gridTemplateColumns:
                        "1fr 1fr 0.8fr 1.2fr 1fr 1.5fr",
                      gap: 2,
                      p: 2,
                      borderBottom: 1,
                      borderColor: border,
                      "&:last-child": {
                        borderBottom: 0,
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        color: primaryText,
                        fontFamily: item.fontFamily,
                        fontSize: item.fontSize,
                        fontWeight: item.weight,
                        lineHeight: item.lineHeight,
                      }}
                    >
                      {item.token}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: secondaryText, lineHeight: 1.7 }}
                    >
                      {item.font}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: secondaryText, lineHeight: 1.7 }}
                    >
                      {item.weight}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: secondaryText, lineHeight: 1.7 }}
                    >
                      {item.size}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: secondaryText, lineHeight: 1.7 }}
                    >
                      {item.lineHeight}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: secondaryText, lineHeight: 1.7 }}
                    >
                      {item.usage}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 6 }} />

          <Box component="section" id="component" sx={{ scrollMarginTop: 96 }}>
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Component
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: secondaryText, mb: 3, lineHeight: 1.7 }}
            >
              The Stream typography scale is implemented through the shared
              theme. This keeps text styles consistent across pages, layouts
              and reusable components.
            </Typography>

            <Box
              sx={{
                p: { xs: 3, md: 5 },
                backgroundColor: surface,
                border: 1,
                borderColor: border,
                borderRadius: radius.medium,
                boxShadow: shadows.level1,
              }}
            >
              {typographyScale.map((item) => (
                <Box key={item.token} sx={{ mb: 2.5 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 0.75,
                      color: secondaryText,
                      fontFamily: theme.typography.fontFamilyMonospace,
                      fontSize: "0.8125rem",
                    }}
                  >
                    {item.token} · {item.size} · {item.usage}
                  </Typography>

                  <Typography
                    sx={{
                      color: primaryText,
                      fontFamily: item.fontFamily,
                      fontSize: item.fontSize,
                      fontWeight: item.weight,
                      lineHeight: item.lineHeight,
                    }}
                  >
                    {item.example}
                  </Typography>
                </Box>
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
              The following guidelines ensure consistent, readable and
              accessible typography across Stream Software applications.
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
              Typography must remain readable for different users, devices and
              zoom levels. Text styles should support WCAG 2.1 AA contrast
              requirements and should not depend on color alone.
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
                Accessibility rules
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: secondaryText, lineHeight: 1.7 }}
              >
                Use readable font sizes, maintain sufficient line-height, keep a
                clear heading order and ensure that text has enough contrast in
                both light and dark mode.
              </Typography>
            </Box>
          </Box>
        </Box>

        <OnThisPage items={[...typographySections]} />
      </Box>
    </DocumentationLayout>
  );
}
