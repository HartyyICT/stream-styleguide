"use client";

import { Box, Typography } from "@mui/material";
import Card from "@/app/components/documentation/Card";
import CodeBlock from "@/app/components/documentation/CodeBlock";
import GuidelineList from "@/app/components/documentation/GuidelineList";
import Intro from "@/app/components/documentation/Intro";
import Page from "@/app/components/documentation/Page";
import Section from "@/app/components/documentation/Section";
import { useDocumentationStyles } from "@/app/components/documentation/useDocumentationStyles";
import { borderWidths, radius } from "@/app/theme/tokens";

const sections = [
  { label: "Overview", href: "#borders" },
  { label: "Border colors", href: "#border-colors" },
  { label: "Border radius", href: "#border-radius" },
  { label: "Token usage", href: "#token-usage" },
  { label: "Component examples", href: "#component-examples" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const radiusScale = [
  {
    token: "small",
    value: radius.small,
    pixels: "4px",
    usage: "Compact controls and badges",
  },
  {
    token: "medium",
    value: radius.medium,
    pixels: "8px",
    usage: "Buttons, inputs and standard controls",
  },
  {
    token: "large",
    value: radius.large,
    pixels: "12px",
    usage: "Cards and panels",
  },
  {
    token: "extraLarge",
    value: radius.extraLarge,
    pixels: "16px",
    usage: "Dialogs and prominent surfaces",
  },
] as const;

const guidelines = [
  "Use border color, width and radius tokens instead of arbitrary values.",
  "Use neutral borders for structure and primary borders for interaction, selection and focus.",
  "Keep border roles and radius values consistent across comparable components.",
  "Use smaller radii for compact controls and larger radii for cards and dialogs.",
  "Keep nested radii visually related; inner elements should usually not exceed their container.",
  "Combine borders with sufficient spacing so boundaries remain calm and readable.",
  "Do not rely on border color or corner shape alone to communicate meaning.",
] as const;

export default function BordersPage() {
  const {
    borders,
    interaction,
    surface,
    primaryText,
    secondaryText,
    accent,
  } = useDocumentationStyles();

  const borderScale = [
    {
      name: "Subtle",
      token: "borders.subtle",
      color: borders.subtle,
      width: borderWidths.subtle,
      use: "Dividers and subtle separation",
    },
    {
      name: "Default",
      token: "borders.default",
      color: borders.default,
      width: borderWidths.default,
      use: "Cards, inputs and panels",
    },
    {
      name: "Interactive",
      token: "borders.interactive",
      color: borders.interactive,
      width: borderWidths.interactive,
      use: "Hover and interactive outlines",
    },
    {
      name: "Active",
      token: "borders.active",
      color: borders.active,
      width: borderWidths.active,
      use: "Active navigation indicators",
    },
    {
      name: "Focus",
      token: "borders.focus",
      color: borders.focus,
      width: borderWidths.focus,
      use: "Keyboard focus rings",
    },
    {
      name: "Accent",
      token: "borders.accent",
      color: borders.accent,
      width: borderWidths.accent,
      use: "Callouts and highlighted information",
    },
  ];

  return (
    <Page pageId="borders" sections={sections}>
      <Intro
        title="Borders"
        description="Borders define boundaries, interaction states and corner shapes across Stream Software interfaces. Color and width clarify structure, while radius creates a consistent visual character for controls, cards, panels and dialogs."
        note="Treat border color, width and radius as one system. Select each token according to the component's role instead of styling these properties independently."
      />

      <Section
        id="border-colors"
        title="Border colors & widths"
        description="The scale progresses from quiet structural separation to stronger interactive, active and focus indicators."
        divider={false}
      >
        <Box sx={{ display: "grid", gap: 1.5 }}>
          {borderScale.map((item) => (
            <Card
              key={item.name}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "0.8fr 1.2fr 0.8fr 0.45fr 1.4fr",
                },
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography component="h3" variant="h5">
                {item.name}
              </Typography>
              <Typography
                component="code"
                sx={{
                  color: accent,
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: "0.8125rem",
                }}
              >
                {item.token}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    flexShrink: 0,
                    borderRadius: radius.small,
                    backgroundColor: item.color,
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: secondaryText,
                    fontFamily: "var(--font-space-mono), monospace",
                  }}
                >
                  {item.color}
                </Typography>
              </Box>
              <Typography
                component="code"
                sx={{
                  color: primaryText,
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: "0.8125rem",
                }}
              >
                {item.width}
              </Typography>
              <Typography variant="body2" sx={{ color: secondaryText }}>
                {item.use}
              </Typography>
            </Card>
          ))}
        </Box>

        <Card sx={{ mt: 3, p: 3 }}>
          <Typography component="h3" variant="h4" sx={{ mb: 0.75 }}>
            Visual examples
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 2.5, color: secondaryText, lineHeight: 1.6 }}
          >
            Compare the color and visual weight of every border role.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
              },
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                p: 2,
                minHeight: 108,
                borderRadius: radius.medium,
                backgroundColor: interaction.hoverBackground,
              }}
            >
              <Typography component="h4" variant="h5" sx={{ mb: 2 }}>
                Subtle divider
              </Typography>
              <Box
                sx={{
                  mb: 1.5,
                  borderTop: `${borderWidths.subtle} solid ${borders.subtle}`,
                }}
              />
              <Typography variant="caption" sx={{ color: secondaryText }}>
                Separates related content
              </Typography>
            </Box>

            <Box
              sx={{
                p: 2,
                minHeight: 108,
                borderRadius: radius.medium,
                backgroundColor: interaction.hoverBackground,
              }}
            >
              <Typography component="h4" variant="h5" sx={{ mb: 1.5 }}>
                Default input
              </Typography>
              <Box
                sx={{
                  px: 1.5,
                  py: 1,
                  color: secondaryText,
                  border: `${borderWidths.default} solid ${borders.default}`,
                  borderRadius: radius.medium,
                  backgroundColor: surface,
                  fontSize: "0.875rem",
                }}
              >
                Search documentation...
              </Box>
            </Box>

            <Box
              sx={{
                p: 2,
                minHeight: 108,
                color: interaction.hoverContent,
                border: `${borderWidths.interactive} solid ${borders.interactive}`,
                borderRadius: radius.medium,
                backgroundColor: interaction.hoverBackground,
              }}
            >
              <Typography component="h4" variant="h5" sx={{ mb: 1 }}>
                Interactive card
              </Typography>
              <Typography variant="caption">
                Hover and clickable outline
              </Typography>
            </Box>

            <Box
              sx={{
                p: 2,
                minHeight: 108,
                color: interaction.activeIndicator,
                borderLeft: `${borderWidths.active} solid ${borders.active}`,
                borderRadius: radius.medium,
                backgroundColor: interaction.activeBackground,
              }}
            >
              <Typography component="h4" variant="h5" sx={{ mb: 1 }}>
                Active navigation
              </Typography>
              <Typography variant="caption">Current location</Typography>
            </Box>

            <Box
              sx={{
                p: 2,
                minHeight: 108,
                border: `${borderWidths.focus} solid ${borders.focus}`,
                borderRadius: radius.medium,
                outline: `${borderWidths.focus} solid ${borders.focus}`,
                outlineOffset: 2,
                backgroundColor: surface,
              }}
            >
              <Typography component="h4" variant="h5" sx={{ mb: 1 }}>
                Keyboard focus
              </Typography>
              <Typography variant="caption" sx={{ color: secondaryText }}>
                Visible focus ring
              </Typography>
            </Box>

            <Box
              sx={{
                p: 2,
                minHeight: 108,
                borderLeft: `${borderWidths.accent} solid ${borders.accent}`,
                backgroundColor: interaction.hoverBackground,
              }}
            >
              <Typography component="h4" variant="h5" sx={{ mb: 1 }}>
                Accent callout
              </Typography>
              <Typography variant="caption" sx={{ color: secondaryText }}>
                Highlighted information
              </Typography>
            </Box>
          </Box>
        </Card>
      </Section>

      <Section
        id="border-radius"
        title="Border radius"
        description="The radius scale moves from precise compact controls to softer prominent surfaces."
      >
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
            <Card key={item.token}>
              <Box
                sx={{
                  height: 92,
                  mb: 2,
                  border: `${borderWidths.interactive} solid ${borders.interactive}`,
                  borderRadius: item.value,
                  backgroundColor: interaction.activeBackground,
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                  mb: 1,
                }}
              >
                <Typography component="h3" variant="h5">
                  {item.token}
                </Typography>
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
              <Typography variant="body2" sx={{ color: secondaryText }}>
                {item.pixels} · {item.usage}
              </Typography>
            </Card>
          ))}
        </Box>
      </Section>

      <Section
        id="token-usage"
        title="Token usage"
        description="Combine semantic border roles with the shared radius scale."
      >
        <CodeBlock>{`import {
  borderColors,
  borderWidths,
  radius,
} from "@/app/theme/tokens";

const cardSx = {
  border: \`\${borderWidths.default} solid \${borders.default}\`,
  borderRadius: radius.large,
};`}</CodeBlock>
      </Section>

      <Section
        id="component-examples"
        title="Component examples"
        description="Color, width and radius work together to communicate hierarchy and interaction."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(3, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          <Box
            sx={{
              p: 2.5,
              border: `${borderWidths.default} solid ${borders.default}`,
              borderRadius: radius.large,
              backgroundColor: surface,
            }}
          >
            <Typography component="h3" variant="h4" sx={{ mb: 1 }}>
              Default card
            </Typography>
            <Typography variant="body2" sx={{ color: secondaryText }}>
              Neutral boundary with a container radius.
            </Typography>
          </Box>

          <Box
            sx={{
              p: 2.5,
              color: interaction.hoverContent,
              border: `${borderWidths.interactive} solid ${borders.interactive}`,
              borderRadius: radius.medium,
              backgroundColor: interaction.hoverBackground,
            }}
          >
            <Typography component="h3" variant="h4" sx={{ mb: 1 }}>
              Interactive control
            </Typography>
            <Typography variant="body2">
              Hover border with a standard control radius.
            </Typography>
          </Box>

          <Box
            sx={{
              p: 2.5,
              borderLeft: `${borderWidths.accent} solid ${borders.accent}`,
              borderRadius: radius.small,
              backgroundColor: interaction.hoverBackground,
            }}
          >
            <Typography component="h3" variant="h4" sx={{ mb: 1 }}>
              Accent callout
            </Typography>
            <Typography variant="body2" sx={{ color: secondaryText }}>
              Strong edge with a subtle corner treatment.
            </Typography>
          </Box>
        </Box>
      </Section>

      <Section
        id="guidelines"
        title="Guidelines"
        description="Consistent borders make complex enterprise interfaces easier to scan."
      >
        <GuidelineList items={guidelines} />
      </Section>

      <Section
        id="accessibility"
        title="Accessibility"
        description="Borders support perception, but must not be the only signal for state or meaning."
        last
      >
        <Card>
          <Typography variant="h3" sx={{ mb: 1.5 }}>
            Preserve visible boundaries
          </Typography>
          <Typography sx={{ color: secondaryText, lineHeight: 1.7 }}>
            Focus indicators require their dedicated color and width. Maintain
            sufficient contrast in both modes and pair active or error borders
            with labels, icons or text so information is not communicated
            through color alone.
          </Typography>
        </Card>
      </Section>
    </Page>
  );
}
