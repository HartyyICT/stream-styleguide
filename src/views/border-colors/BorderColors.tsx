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
  { label: "Overview", href: "#border-colors" },
  { label: "Border scale", href: "#border-scale" },
  { label: "Token usage", href: "#token-usage" },
  { label: "Component examples", href: "#component-examples" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const guidelines = [
  "Use borders to clarify structure, grouping and interaction.",
  "Use neutral colors for default and subtle boundaries.",
  "Reserve primary border colors for interactive, active and focus states.",
  "Avoid borders that are unnecessarily dark or visually dominant.",
  "Keep border roles consistent across comparable components.",
  "Combine borders with sufficient spacing to preserve a calm interface.",
  "Use a visible focus border for keyboard-operable elements.",
] as const;

export default function BorderColorsPage() {
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
      name: "Border subtle",
      token: "borders.subtle",
      color: borders.subtle,
      width: borderWidths.subtle,
      use: "Dividers and subtle separation",
    },
    {
      name: "Border default",
      token: "borders.default",
      color: borders.default,
      width: borderWidths.default,
      use: "Cards, inputs and panels",
    },
    {
      name: "Border interactive",
      token: "borders.interactive",
      color: borders.interactive,
      width: borderWidths.interactive,
      use: "Hover and interactive outlines",
    },
    {
      name: "Border active",
      token: "borders.active",
      color: borders.active,
      width: borderWidths.active,
      use: "Active navigation indicators",
    },
    {
      name: "Border focus",
      token: "borders.focus",
      color: borders.focus,
      width: borderWidths.focus,
      use: "Keyboard focus rings",
    },
    {
      name: "Border accent",
      token: "borders.accent",
      color: borders.accent,
      width: borderWidths.accent,
      use: "Callouts and highlighted information",
    },
  ];

  return (
    <Page pageId="border-colors" sections={sections}>
      <Intro
        title="Border Colors"
        description="Borders separate interface elements and make screen structure easier to understand. Neutral boundaries support everyday layout, while primary borders communicate interaction, selection and keyboard focus."
        note="A border has both a color role and a width role. Use the complete token combination so the visual hierarchy remains consistent."
      />

      <Section
        id="border-scale"
        title="Border scale"
        description="The scale progresses from subtle structural separation to strong active and accent indicators."
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
                  sm: "1.15fr 1.25fr 0.7fr 0.55fr 1.3fr",
                },
                alignItems: "center",
                gap: 2,
                boxShadow: "none",
              }}
            >
              <Typography variant="h5">{item.name}</Typography>
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
                    fontFamily: "var(--font-space-mono), monospace",
                    color: secondaryText,
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
              <Box
                sx={{
                  p: 1.5,
                  border: item.width,
                  borderColor: item.color,
                  borderRadius: radius.medium,
                  backgroundColor: surface,
                }}
              >
                <Typography variant="body2" sx={{ color: secondaryText }}>
                  {item.use}
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>
      </Section>

      <Section
        id="token-usage"
        title="Token usage"
        description="Resolve the current mode once, then combine the semantic border color with its matching width token."
      >
        <CodeBlock>{`import {
  borderColors,
  borderWidths,
} from "@/app/theme/tokens";

const borders =
  mode === "dark"
    ? borderColors.dark
    : borderColors.light;

const cardSx = {
  border: borderWidths.default,
  borderColor: borders.default,
};`}</CodeBlock>
      </Section>

      <Section
        id="component-examples"
        title="Component examples"
        description="Different border roles communicate structure and state without relying on heavy visual decoration."
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
          <Box
            sx={{
              p: 3,
              border: borderWidths.default,
              borderColor: borders.default,
              borderRadius: radius.medium,
              backgroundColor: surface,
            }}
          >
            <Typography variant="h4" sx={{ mb: 1 }}>
              Default card
            </Typography>
            <Typography variant="body2" sx={{ color: secondaryText }}>
              Uses the default neutral border for clear, quiet separation.
            </Typography>
          </Box>

          <Box
            sx={{
              p: 3,
              border: borderWidths.interactive,
              borderColor: borders.interactive,
              borderRadius: radius.medium,
              color: interaction.hoverContent,
              backgroundColor: interaction.hoverBackground,
            }}
          >
            <Typography variant="h4" sx={{ mb: 1 }}>
              Interactive state
            </Typography>
            <Typography variant="body2">
              Uses the interactive border together with hover feedback.
            </Typography>
          </Box>

          <Box
            sx={{
              p: 3,
              borderLeft: borderWidths.active,
              borderColor: borders.active,
              borderRadius: radius.medium,
              color: interaction.activeIndicator,
              backgroundColor: interaction.activeBackground,
            }}
          >
            <Typography variant="h4" sx={{ mb: 1 }}>
              Active navigation
            </Typography>
            <Typography variant="body2">
              A stronger left indicator marks the current location.
            </Typography>
          </Box>

          <Box
            sx={{
              p: 3,
              borderLeft: borderWidths.accent,
              borderColor: borders.accent,
              backgroundColor: interaction.hoverBackground,
            }}
          >
            <Typography variant="h4" sx={{ mb: 1 }}>
              Accent callout
            </Typography>
            <Typography variant="body2" sx={{ color: secondaryText }}>
              The accent border highlights supporting information.
            </Typography>
          </Box>
        </Box>
      </Section>

      <Section
        id="guidelines"
        title="Guidelines"
        description="Borders should support hierarchy without competing with the content itself."
      >
        <GuidelineList items={guidelines} />
      </Section>

      <Section
        id="accessibility"
        title="Accessibility"
        description="Interactive boundaries and focus indicators must remain perceivable in every color mode."
        last
      >
        <Card>
          <Typography variant="h3" sx={{ mb: 1.5 }}>
            Keep focus unmistakable
          </Typography>
          <Typography sx={{ color: secondaryText, lineHeight: 1.7 }}>
            Use the dedicated focus color and width for keyboard navigation.
            Do not communicate focus through color alone: the stronger outline
            and its placement must remain visible against adjacent surfaces.
          </Typography>
        </Card>
      </Section>
    </Page>
  );
}
