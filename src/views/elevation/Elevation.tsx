"use client";

import { Box, Divider, Typography } from "@mui/material";
import { Layers3, MousePointerClick, PanelTop, Rows3 } from "lucide-react";
import DocumentationLayout from "@/app/components/DocumentationLayout";
import OnThisPage from "@/app/components/OnThisPage";
import { colors, radius, shadows, spacing } from "@/app/theme/tokens";
import { useColorMode } from "@/app/theme/themeProvider";

const elevationSections = [
  { label: "Overview", href: "#elevation" },
  { label: "Elevation scale", href: "#elevation-scale" },
  { label: "Token usage", href: "#token-usage" },
  { label: "Usage levels", href: "#usage-levels" },
  { label: "Layering example", href: "#layering-example" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const elevationScale = [
  {
    token: "level0",
    value: shadows.level0,
    usage: "Flat layouts, page backgrounds and bordered sections",
  },
  {
    token: "level1",
    value: shadows.level1,
    usage: "Resting cards and subtle content separation",
  },
  {
    token: "level2",
    value: shadows.level2,
    usage: "Raised cards, dropdowns and interactive surfaces",
  },
  {
    token: "level3",
    value: shadows.level3,
    usage: "Floating panels, popovers and temporary navigation",
  },
  {
    token: "level4",
    value: shadows.level4,
    usage: "Dialogs and content placed above the full interface",
  },
] as const;

const usageLevels = [
  {
    title: "Resting surface",
    token: "shadows.level1",
    description:
      "Use a subtle shadow for cards that need separation without appearing interactive or temporary.",
    icon: Rows3,
  },
  {
    title: "Interactive surface",
    token: "shadows.level2",
    description:
      "Use for raised or opened components such as interactive cards and dropdown menus.",
    icon: MousePointerClick,
  },
  {
    title: "Floating surface",
    token: "shadows.level3",
    description:
      "Use for temporary content that floats above the current workflow, such as popovers.",
    icon: Layers3,
  },
  {
    title: "Modal surface",
    token: "shadows.level4",
    description:
      "Reserve the strongest shadow for dialogs and surfaces at the highest interface layer.",
    icon: PanelTop,
  },
] as const;

const guidelines = [
  "Use only the elevation tokens defined in the shared Design Foundations.",
  "Choose elevation based on a component's layer and behaviour, not for decoration.",
  "Increase elevation when a surface moves closer to the user or temporarily covers other content.",
  "Keep components at the same hierarchy level visually consistent.",
  "Do not combine multiple shadow tokens or create arbitrary shadow values.",
  "Use borders or background contrast for flat separation when elevation is unnecessary.",
] as const;

export default function ElevationPage() {
  const { mode } = useColorMode();
  const isDarkMode = mode === "dark";

  const surface = isDarkMode ? colors.neutral[800] : colors.semantic.surface;
  const pageBackground = isDarkMode
    ? colors.neutral[900]
    : colors.semantic.background;
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
        <Box component="article" id="elevation" sx={{ maxWidth: 920 }}>
          <Typography
            variant="overline"
            sx={{ color: accent, fontWeight: 700, letterSpacing: "0.08em" }}
          >
            Design foundations
          </Typography>

          <Typography variant="h1" sx={{ mt: 1, mb: 2 }}>
            Elevation &amp; Shadows
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
            Elevation communicates how surfaces are layered within Stream
            Software interfaces. The shadow scale helps users distinguish
            resting content, interactive surfaces and temporary overlays.
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
              Elevation represents interface hierarchy. Stronger shadows are
              reserved for surfaces that appear closer to the user.
            </Typography>
          </Box>

          <Box
            component="section"
            id="elevation-scale"
            sx={{ scrollMarginTop: 96 }}
          >
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Elevation scale
            </Typography>
            <Typography sx={{ mb: 4, color: secondaryText, lineHeight: 1.7 }}>
              Stream uses five levels, starting with a flat surface and ending
              with the strongest modal elevation.
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                },
                gap: 3,
              }}
            >
              {elevationScale.map((item) => (
                <Box
                  key={item.token}
                  sx={{
                    p: 3,
                    minHeight: 180,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: radius.large,
                    backgroundColor: surface,
                    boxShadow: item.value,
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      display: "grid",
                      placeItems: "center",
                      color: accent,
                      borderRadius: radius.medium,
                      backgroundColor: selectedBackground,
                    }}
                  >
                    <Layers3 size={21} aria-hidden="true" />
                  </Box>

                  <Box sx={{ mt: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 2,
                        mb: 1,
                      }}
                    >
                      <Typography variant="h4">{item.token}</Typography>
                      <Typography
                        component="code"
                        sx={{
                          color: accent,
                          fontFamily: "var(--font-space-mono), monospace",
                          fontSize: "0.8125rem",
                        }}
                      >
                        shadows.{item.token}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: secondaryText, lineHeight: 1.6 }}
                    >
                      {item.usage}
                    </Typography>
                  </Box>
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
              Import the shared shadows object and reference the required level
              directly.
            </Typography>

            <Box component="pre" sx={codeBlockSx}>
              <code>{`import { shadows } from "@/app/theme/tokens";

<Box
  sx={{
    boxShadow: shadows.level2,
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
              Select the level that matches the surface&apos;s position and
              behaviour.
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

                return (
                  <Box
                    key={item.title}
                    sx={{
                      p: 2.5,
                      borderRadius: radius.large,
                      backgroundColor: surface,
                      boxShadow: elevationScale[index + 1].value,
                    }}
                  >
                    <Icon
                      size={22}
                      color={accent}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                    <Typography variant="h4" sx={{ mt: 2, mb: 0.75 }}>
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
            id="layering-example"
            sx={{ scrollMarginTop: 96 }}
          >
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Layering example
            </Typography>
            <Typography sx={{ mb: 3, color: secondaryText, lineHeight: 1.7 }}>
              Elevation should make the relationship between surfaces easier to
              understand at a glance.
            </Typography>

            <Box
              sx={{
                minHeight: 360,
                p: { xs: 2, sm: 4 },
                position: "relative",
                overflow: "hidden",
                border: 1,
                borderColor: border,
                borderRadius: radius.large,
                backgroundColor: pageBackground,
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", sm: "72%" },
                  p: 3,
                  borderRadius: radius.large,
                  backgroundColor: surface,
                  boxShadow: shadows.level1,
                }}
              >
                <Typography variant="h4" sx={{ mb: 1 }}>
                  Resting content
                </Typography>
                <Typography variant="body2" sx={{ color: secondaryText }}>
                  The base card uses level1.
                </Typography>
              </Box>

              <Box
                sx={{
                  width: { xs: "82%", sm: "46%" },
                  p: 2.5,
                  position: "absolute",
                  top: { xs: 148, sm: 126 },
                  right: { xs: 18, sm: 48 },
                  borderRadius: radius.large,
                  backgroundColor: surface,
                  boxShadow: shadows.level3,
                }}
              >
                <Typography variant="h4" sx={{ mb: 1 }}>
                  Floating panel
                </Typography>
                <Typography variant="body2" sx={{ color: secondaryText }}>
                  The popover uses level3 because it temporarily sits above the
                  card.
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    px: spacing.md,
                    py: spacing.sm,
                    width: "fit-content",
                    color: colors.semantic.surface,
                    borderRadius: radius.medium,
                    backgroundColor: colors.primary[500],
                    fontWeight: 600,
                  }}
                >
                  Continue
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
              A restrained elevation system keeps hierarchy predictable and
              prevents the interface from becoming visually noisy.
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
              Shadows support hierarchy, but they must not be the only way a
              surface or interaction is distinguished.
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
                Preserve visible boundaries
              </Typography>
              <Typography sx={{ color: secondaryText, lineHeight: 1.7 }}>
                Maintain sufficient background contrast and use borders where
                needed, especially in dark mode or high-contrast settings.
                Focus indicators, labels and modal backdrops must remain clear
                without relying on the shadow itself.
              </Typography>
            </Box>
          </Box>
        </Box>

        <OnThisPage items={[...elevationSections]} />
      </Box>
    </DocumentationLayout>
  );
}
