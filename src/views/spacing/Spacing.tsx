"use client";

import { Box, Divider, Typography } from "@mui/material";
import { Braces, Grid3X3, LayoutPanelTop, Rows3 } from "lucide-react";
import Card from "@/app/components/documentation/Card";
import CardTitle from "@/app/components/documentation/CardTitle";
import CodeBlock from "@/app/components/documentation/CodeBlock";
import Intro from "@/app/components/documentation/Intro";
import Page from "@/app/components/documentation/Page";
import { useDocumentationStyles } from "@/app/components/documentation/useDocumentationStyles";
import { radius, shadows, spacing } from "@/app/theme/tokens";

const spacingSections = [
  { label: "Overview", href: "#spacing" },
  { label: "Spacing scale", href: "#spacing-scale" },
  { label: "Token usage", href: "#token-usage" },
  { label: "Usage levels", href: "#usage-levels" },
  { label: "Layout examples", href: "#layout-examples" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const spacingScale = [
  {
    token: "xs",
    value: spacing.xs,
    pixels: "4px",
    previewWidth: 4,
    usage: "Tight icon and compact control spacing",
  },
  {
    token: "sm",
    value: spacing.sm,
    pixels: "8px",
    previewWidth: 8,
    usage: "Related labels, icons and compact content",
  },
  {
    token: "md",
    value: spacing.md,
    pixels: "16px",
    previewWidth: 16,
    usage: "Default component padding and content gaps",
  },
  {
    token: "lg",
    value: spacing.lg,
    pixels: "24px",
    previewWidth: 24,
    usage: "Cards, form groups and component sections",
  },
  {
    token: "xl",
    value: spacing.xl,
    pixels: "32px",
    previewWidth: 32,
    usage: "Large content groups and page regions",
  },
  {
    token: "xxl",
    value: spacing.xxl,
    pixels: "48px",
    previewWidth: 48,
    usage: "Major page sections and layout separation",
  },
];

const usageLevels = [
  {
    title: "Component spacing",
    tokenRange: "xs - md",
    description:
      "Use smaller tokens inside buttons, inputs, status labels and other compact components.",
    icon: Rows3,
  },
  {
    title: "Content spacing",
    tokenRange: "md - lg",
    description:
      "Use medium tokens between related fields, card content and grouped interface elements.",
    icon: Grid3X3,
  },
  {
    title: "Layout spacing",
    tokenRange: "xl - xxl",
    description:
      "Use larger tokens between page sections, major content regions and independent workflows.",
    icon: LayoutPanelTop,
  },
];

const guidelines = [
  "Use only the spacing tokens defined in the shared Design Foundations.",
  "Choose spacing based on the relationship between elements, not simply on available space.",
  "Use smaller values inside compact components and larger values between independent sections.",
  "Keep spacing consistent between repeated cards, form fields, tables and navigation items.",
  "Avoid arbitrary pixel values when an existing spacing token provides the intended hierarchy.",
  "Preserve sufficient whitespace around complex data and workflows to improve scanability.",
];

export default function SpacingPage() {
  const {
    borders,
    surface,
    primaryText,
    secondaryText,
    accent,
    subtleBackground,
    selectedBackground,
  } = useDocumentationStyles();
  const border = borders.default;

  return (
    <Page pageId="spacing" sections={spacingSections}>
          <Intro
            title="Spacing"
            description="Spacing creates structure, hierarchy and breathing room within Stream Software interfaces. A fixed token scale keeps margins, padding and gaps consistent across components and applications."
            note="Stream uses named spacing tokens instead of arbitrary values. Select the token that best represents the relationship between elements and use it consistently in similar contexts."
          />

          <Box
            component="section"
            id="spacing-scale"
            sx={{ scrollMarginTop: 96 }}
          >
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Spacing scale
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: secondaryText, mb: 3, lineHeight: 1.7 }}
            >
              The scale ranges from 4px for compact relationships to 48px for
              major page separation. Every value is available as a named token
              in the shared foundation.
            </Typography>

            <Box
              sx={{
                overflow: "hidden",
                backgroundColor: surface,
                border: 1,
                borderColor: border,
                borderRadius: radius.medium,
                boxShadow: shadows.level1,
              }}
            >
              {spacingScale.map((item) => (
                <Box
                  key={item.token}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "72px 1fr",
                      sm: "88px 100px minmax(160px, 1fr) 2fr",
                    },
                    gap: 2,
                    alignItems: "center",
                    p: 2,
                    borderBottom: 1,
                    borderColor: border,
                    "&:last-child": { borderBottom: 0 },
                  }}
                >
                  <Typography
                    component="code"
                    sx={{
                      color: accent,
                      fontFamily: "var(--font-space-mono), monospace",
                      fontSize: "0.875rem",
                      fontWeight: 700,
                    }}
                  >
                    {item.token}
                  </Typography>

                  <Typography
                    component="code"
                    sx={{
                      display: { xs: "none", sm: "block" },
                      color: primaryText,
                      fontFamily: "var(--font-space-mono), monospace",
                      fontSize: "0.8125rem",
                    }}
                  >
                    {item.value}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Box
                      aria-hidden="true"
                      sx={{
                        width: item.previewWidth,
                        minWidth: item.previewWidth,
                        height: 24,
                        backgroundColor: accent,
                        borderRadius: radius.small,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: secondaryText,
                        fontFamily: "var(--font-space-mono), monospace",
                      }}
                    >
                      {item.pixels}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      gridColumn: { xs: "1 / -1", sm: "auto" },
                      color: secondaryText,
                      lineHeight: 1.7,
                    }}
                  >
                    {item.usage}
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
              Import spacing values from the shared tokens file. This makes the
              intended scale visible in code and prevents isolated layout
              values from spreading across applications.
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                gap: 2,
              }}
            >
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
                  Import tokens
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: secondaryText, mb: 2, lineHeight: 1.7 }}
                >
                  Use the central spacing object as the single source of truth.
                </Typography>
                <CodeBlock>{`import { spacing } from "@/app/theme/tokens";`}</CodeBlock>
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
                  Apply tokens
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: secondaryText, mb: 2, lineHeight: 1.7 }}
                >
                  Tokens can be used directly in MUI&apos;s sx prop.
                </Typography>
                <CodeBlock>{`<Box
  sx={{
    p: spacing.md,
    gap: spacing.sm,
    mb: spacing.xl,
  }}
/>`}</CodeBlock>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 6 }} />

          <Box
            component="section"
            id="usage-levels"
            sx={{ scrollMarginTop: 96 }}
          >
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Usage levels
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: secondaryText, mb: 3, lineHeight: 1.7 }}
            >
              Larger spacing communicates a weaker relationship between
              elements. Use the scale deliberately to show which information
              belongs together.
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
              {usageLevels.map(({ title, tokenRange, description, icon: Icon }) => (
                <Box
                  key={title}
                  sx={{
                    p: 3,
                    backgroundColor: surface,
                    border: 1,
                    borderColor: border,
                    borderRadius: radius.medium,
                    boxShadow: shadows.level1,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      display: "grid",
                      placeItems: "center",
                      mb: 2,
                      color: accent,
                      backgroundColor: selectedBackground,
                      borderRadius: radius.medium,
                    }}
                  >
                    <Icon size={21} />
                  </Box>
                  <Typography variant="h3" sx={{ mb: 0.75 }}>
                    {title}
                  </Typography>
                  <Typography
                    component="code"
                    sx={{
                      display: "block",
                      mb: 1.5,
                      color: accent,
                      fontFamily: "var(--font-space-mono), monospace",
                      fontSize: "0.8125rem",
                    }}
                  >
                    {tokenRange}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: secondaryText, lineHeight: 1.7 }}
                  >
                    {description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 6 }} />

          <Box
            component="section"
            id="layout-examples"
            sx={{ scrollMarginTop: 96 }}
          >
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Layout examples
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: secondaryText, mb: 3, lineHeight: 1.7 }}
            >
              The same tokens should create a recognizable rhythm in cards,
              forms and page sections.
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                gap: 2,
              }}
            >
              <Box
                sx={{
                  p: spacing.lg,
                  backgroundColor: surface,
                  border: 1,
                  borderColor: border,
                  borderRadius: radius.medium,
                  boxShadow: shadows.level1,
                }}
              >
                <Typography variant="h3" sx={{ mb: spacing.sm }}>
                  Card spacing
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mb: spacing.md, color: secondaryText, lineHeight: 1.7 }}
                >
                  Cards use lg padding, sm title spacing and md separation
                  before actions or secondary content.
                </Typography>
                <Box
                  sx={{
                    height: 40,
                    backgroundColor: selectedBackground,
                    border: 1,
                    borderColor: accent,
                    borderRadius: radius.small,
                  }}
                />
              </Box>

              <Box
                sx={{
                  p: spacing.lg,
                  backgroundColor: surface,
                  border: 1,
                  borderColor: border,
                  borderRadius: radius.medium,
                  boxShadow: shadows.level1,
                }}
              >
                <Typography variant="h3" sx={{ mb: spacing.md }}>
                  Form spacing
                </Typography>
                <Box sx={{ display: "grid", gap: spacing.md }}>
                  {[1, 2, 3].map((field) => (
                    <Box key={field}>
                      <Box
                        sx={{
                          width: 80,
                          height: 8,
                          mb: spacing.sm,
                          backgroundColor: selectedBackground,
                          borderRadius: radius.small,
                        }}
                      />
                      <Box
                        sx={{
                          height: 40,
                          border: 1,
                          borderColor: border,
                          borderRadius: radius.small,
                          backgroundColor: subtleBackground,
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                mt: 2,
                p: 3,
                backgroundColor: surface,
                border: 1,
                borderColor: border,
                borderRadius: radius.medium,
                boxShadow: shadows.level1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                <Braces size={20} color={accent} />
                <Box>
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    Responsive spacing
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: secondaryText, mb: 2, lineHeight: 1.7 }}
                  >
                    Use responsive token values when a layout needs more
                    breathing room on larger screens while remaining compact on
                    tablets.
                  </Typography>
                  <CodeBlock>{`sx={{
  px: { xs: spacing.md, lg: spacing.xl },
  py: { xs: spacing.lg, lg: spacing.xxl },
}}`}</CodeBlock>
                </Box>
              </Box>
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
              These rules keep spacing predictable and maintainable across
              Stream Software applications.
            </Typography>

            <Box
              component="ul"
              sx={{ m: 0, pl: 3, color: secondaryText, lineHeight: 1.8 }}
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
              Whitespace supports readability and reduces cognitive load,
              especially in data-heavy workflows. Spacing must improve
              grouping without making controls difficult to reach or content
              unnecessarily fragmented.
            </Typography>

            <Card elevated>
              <CardTitle sx={{ mb: 1 }}>
                Preserve usable interaction areas
              </CardTitle>
              <Typography
                variant="body2"
                sx={{ color: secondaryText, lineHeight: 1.7 }}
              >
                Do not reduce padding so far that buttons, inputs or other
                interactive elements become difficult to select. Spacing should
                support clear focus states, readable labels and comfortable
                keyboard and pointer interaction.
              </Typography>
            </Card>
          </Box>
    </Page>
  );
}
