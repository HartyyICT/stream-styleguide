"use client";

import { Box, Divider, Typography } from "@mui/material";
import { Braces, CreditCard, MousePointerClick, PanelTop } from "lucide-react";
import DocumentationLayout from "@/app/components/DocumentationLayout";
import OnThisPage from "@/app/components/OnThisPage";
import { colors, radius, shadows, spacing } from "@/app/theme/tokens";
import { useColorMode } from "@/app/theme/themeProvider";

const borderRadiusSections = [
  { label: "Overview", href: "#border-radius" },
  { label: "Radius scale", href: "#radius-scale" },
  { label: "Token usage", href: "#token-usage" },
  { label: "Usage levels", href: "#usage-levels" },
  { label: "Component examples", href: "#component-examples" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const radiusScale = [
  {
    token: "small",
    value: radius.small,
    pixels: "4px",
    usage: "Compact controls, badges and small interface elements",
  },
  {
    token: "medium",
    value: radius.medium,
    pixels: "8px",
    usage: "Buttons, inputs and standard interactive components",
  },
  {
    token: "large",
    value: radius.large,
    pixels: "12px",
    usage: "Cards, panels and grouped content",
  },
  {
    token: "extraLarge",
    value: radius.extraLarge,
    pixels: "16px",
    usage: "Dialogs, prominent containers and large surfaces",
  },
] as const;

const usageLevels = [
  {
    title: "Compact",
    token: "radius.small",
    description:
      "Use for small controls and dense elements where a subtle corner treatment keeps the interface precise.",
    icon: MousePointerClick,
  },
  {
    title: "Standard",
    token: "radius.medium",
    description:
      "Use as the default for buttons, inputs and other everyday interactive components.",
    icon: Braces,
  },
  {
    title: "Container",
    token: "radius.large",
    description:
      "Use for cards and panels to separate grouped content from the surrounding layout.",
    icon: CreditCard,
  },
  {
    title: "Prominent",
    token: "radius.extraLarge",
    description:
      "Use for larger surfaces such as dialogs and highlighted content areas that need extra emphasis.",
    icon: PanelTop,
  },
] as const;

const guidelines = [
  "Use only the radius tokens defined in the shared Design Foundations.",
  "Use the same radius for components with the same role and interaction pattern.",
  "Prefer smaller radii for compact controls and larger radii for cards, panels and dialogs.",
  "Avoid arbitrary values when an existing token communicates the intended hierarchy.",
  "Keep nested elements visually related: an inner radius should usually not exceed its container radius.",
  "Do not use border radius alone to communicate whether an element is interactive.",
] as const;

export default function BorderRadiusPage() {
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

  const codeBlockSx = {
    m: 0,
    p: 2,
    overflowX: "auto",
    color: primaryText,
    backgroundColor: subtleBackground,
    borderRadius: radius.small,
    fontFamily: "var(--font-space-mono), monospace",
    fontSize: "0.875rem",
    lineHeight: 1.7,
  } as const;

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
        <Box component="article" id="border-radius" sx={{ maxWidth: 920 }}>
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
            Border Radius
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
            Border radius defines the corner shape of Stream Software
            components. A small, fixed token scale creates a consistent visual
            language across controls, cards, panels and dialogs.
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
              Stream uses four named radius tokens. Choose a token based on the
              component&apos;s size and role instead of introducing a custom
              corner value.
            </Typography>
          </Box>

          <Box component="section" id="radius-scale" sx={{ scrollMarginTop: 96 }}>
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Radius scale
            </Typography>
            <Typography sx={{ mb: 3, color: secondaryText, lineHeight: 1.7 }}>
              The scale ranges from subtle corners for compact components to
              softer corners for prominent surfaces.
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              {radiusScale.map((item) => (
                <Box
                  key={item.token}
                  sx={{
                    p: 2.5,
                    border: 1,
                    borderColor: border,
                    borderRadius: radius.medium,
                    backgroundColor: surface,
                    boxShadow: shadows.level1,
                  }}
                >
                  <Box
                    sx={{
                      height: 104,
                      mb: 2.5,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: radius.small,
                      backgroundColor: subtleBackground,
                    }}
                  >
                    <Box
                      aria-label={`${item.token} radius preview`}
                      sx={{
                        width: 128,
                        height: 72,
                        border: 2,
                        borderColor: accent,
                        borderRadius: item.value,
                        backgroundColor: selectedBackground,
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 2,
                      mb: 1,
                    }}
                  >
                    <Typography variant="h5">{item.token}</Typography>
                    <Typography
                      component="code"
                      sx={{
                        color: accent,
                        fontFamily: "var(--font-space-mono), monospace",
                        fontSize: "0.8125rem",
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, color: secondaryText }}
                  >
                    {item.pixels}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: secondaryText, lineHeight: 1.6 }}
                  >
                    {item.usage}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 6 }} />

          <Box component="section" id="token-usage" sx={{ scrollMarginTop: 96 }}>
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Token usage
            </Typography>
            <Typography sx={{ mb: 3, color: secondaryText, lineHeight: 1.7 }}>
              Import the shared token object and reference the named value
              directly. This keeps the implementation aligned with the design
              foundation.
            </Typography>

            <Box component="pre" sx={codeBlockSx}>
              <code>{`import { radius } from "@/app/theme/tokens";

<Box
  sx={{
    borderRadius: radius.medium,
  }}
/>`}</code>
            </Box>
          </Box>

          <Divider sx={{ my: 6 }} />

          <Box component="section" id="usage-levels" sx={{ scrollMarginTop: 96 }}>
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Usage levels
            </Typography>
            <Typography sx={{ mb: 3, color: secondaryText, lineHeight: 1.7 }}>
              Match the corner treatment to the scale and purpose of the
              component.
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              {usageLevels.map((item, index) => {
                const Icon = item.icon;
                const token = radiusScale[index];

                return (
                  <Box
                    key={item.title}
                    sx={{
                      p: 2.5,
                      border: 1,
                      borderColor: border,
                      borderRadius: token.value,
                      backgroundColor: surface,
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        mb: 2,
                        display: "grid",
                        placeItems: "center",
                        color: accent,
                        borderRadius: radius.small,
                        backgroundColor: selectedBackground,
                      }}
                    >
                      <Icon size={20} aria-hidden="true" />
                    </Box>
                    <Typography variant="h4" sx={{ mb: 0.75 }}>
                      {item.title}
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
                      {item.token}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: secondaryText, lineHeight: 1.7 }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Divider sx={{ my: 6 }} />

          <Box
            component="section"
            id="component-examples"
            sx={{ scrollMarginTop: 96 }}
          >
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Component examples
            </Typography>
            <Typography sx={{ mb: 3, color: secondaryText, lineHeight: 1.7 }}>
              The radius changes with the component&apos;s visual weight while
              the spacing and color foundations remain consistent.
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "0.8fr 1.2fr" },
                gap: 2,
              }}
            >
              <Box
                sx={{
                  p: 3,
                  display: "grid",
                  alignContent: "center",
                  gap: 2,
                  border: 1,
                  borderColor: border,
                  borderRadius: radius.large,
                  backgroundColor: surface,
                }}
              >
                <Box
                  sx={{
                    px: spacing.md,
                    py: spacing.sm,
                    width: "fit-content",
                    color: colors.semantic.surface,
                    borderRadius: radius.medium,
                    backgroundColor: colors.primary[500],
                    fontFamily: "var(--font-poppins), Arial, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  Primary action
                </Box>

                <Box
                  sx={{
                    px: spacing.md,
                    py: spacing.sm,
                    color: secondaryText,
                    border: 1,
                    borderColor: border,
                    borderRadius: radius.medium,
                    backgroundColor: subtleBackground,
                  }}
                >
                  Search documentation...
                </Box>

                <Typography variant="caption" sx={{ color: secondaryText }}>
                  Buttons and inputs use radius.medium
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 3,
                  border: 1,
                  borderColor: border,
                  borderRadius: radius.extraLarge,
                  backgroundColor: surface,
                  boxShadow: shadows.level2,
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    mb: 2,
                    display: "grid",
                    placeItems: "center",
                    color: accent,
                    borderRadius: radius.large,
                    backgroundColor: selectedBackground,
                  }}
                >
                  <PanelTop size={22} aria-hidden="true" />
                </Box>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  Prominent surface
                </Typography>
                <Typography sx={{ mb: 3, color: secondaryText, lineHeight: 1.7 }}>
                  Dialogs and prominent containers can use the largest radius,
                  while their nested controls retain their own component token.
                </Typography>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: radius.large,
                    backgroundColor: subtleBackground,
                  }}
                >
                  <Typography variant="body2" sx={{ color: secondaryText }}>
                    Nested content uses radius.large
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 6 }} />

          <Box component="section" id="guidelines" sx={{ scrollMarginTop: 96 }}>
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Guidelines
            </Typography>
            <Typography sx={{ mb: 3, color: secondaryText, lineHeight: 1.7 }}>
              Consistent corners help repeated patterns feel related across
              Stream Software products.
            </Typography>

            <Box
              component="ul"
              sx={{
                m: 0,
                pl: 3,
                display: "grid",
                gap: 1.5,
                color: secondaryText,
              }}
            >
              {guidelines.map((guideline) => (
                <Typography
                  key={guideline}
                  component="li"
                  sx={{ color: secondaryText, lineHeight: 1.7 }}
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
            sx={{ scrollMarginTop: 96, pb: 4 }}
          >
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Accessibility
            </Typography>
            <Typography sx={{ mb: 3, color: secondaryText, lineHeight: 1.7 }}>
              Border radius is decorative and should never be the only signal
              for meaning, state or interactivity.
            </Typography>

            <Box
              sx={{
                p: 3,
                border: 1,
                borderColor: border,
                borderRadius: radius.large,
                backgroundColor: surface,
              }}
            >
              <Typography variant="h3" sx={{ mb: 1.5 }}>
                Keep focus and interaction visible
              </Typography>
              <Typography sx={{ color: secondaryText, lineHeight: 1.7 }}>
                Interactive components still need clear labels, sufficient
                contrast and a visible focus indicator that follows their
                shape. Rounded corners must not reduce the component&apos;s
                target size, content padding or readability.
              </Typography>
            </Box>
          </Box>
        </Box>

        <OnThisPage items={[...borderRadiusSections]} />
      </Box>
    </DocumentationLayout>
  );
}
