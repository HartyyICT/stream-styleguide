"use client";

import { Box, Typography } from "@mui/material";
import { ExternalLink, MousePointer2, Search } from "lucide-react";
import Card from "@/app/components/documentation/Card";
import CodeBlock from "@/app/components/documentation/CodeBlock";
import GuidelineList from "@/app/components/documentation/GuidelineList";
import Intro from "@/app/components/documentation/Intro";
import Page from "@/app/components/documentation/Page";
import Section from "@/app/components/documentation/Section";
import { useDocumentationStyles } from "@/app/components/documentation/useDocumentationStyles";
import {
  borderWidths,
  radius,
} from "@/app/theme/tokens";

const sections = [
  { label: "Overview", href: "#hover-states" },
  { label: "State scale", href: "#state-scale" },
  { label: "Token usage", href: "#token-usage" },
  { label: "Interactive examples", href: "#interactive-examples" },
  { label: "State hierarchy", href: "#state-hierarchy" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const guidelines = [
  "Use hover states only for interactive elements.",
  "Keep feedback subtle and consistent across comparable components.",
  "Use the same hover treatment for elements with the same role.",
  "Keep hover, active and focus states visually distinct.",
  "Never reveal essential information exclusively on hover.",
  "Combine hover feedback with visible focus states for keyboard users.",
] as const;

export default function HoverStatesPage() {
  const {
    isDarkMode,
    interaction,
    borders,
    surface,
    primaryText,
    secondaryText,
    accent,
  } = useDocumentationStyles();

  const stateScale = [
    {
      state: "Default",
      token: "interaction.default",
      value: interaction.default,
      use: "Resting state",
    },
    {
      state: "Hover background",
      token: "interaction.hoverBackground",
      value: interaction.hoverBackground,
      use: "Subtle hover feedback",
    },
    {
      state: "Hover border",
      token: "interaction.hoverBorder",
      value: interaction.hoverBorder,
      use: "Interactive outlines",
    },
    {
      state: "Hover text / icon",
      token: "interaction.hoverContent",
      value: interaction.hoverContent,
      use: "Links and icon controls",
    },
    {
      state: "Active background",
      token: "interaction.activeBackground",
      value: interaction.activeBackground,
      use: "Selected items",
    },
    {
      state: "Active indicator",
      token: "interaction.activeIndicator",
      value: interaction.activeIndicator,
      use: "Current location",
    },
    {
      state: "Focus ring",
      token: "interaction.focusRing",
      value: interaction.focusRing,
      use: "Keyboard focus",
    },
  ];

  return (
    <Page pageId="hover-states" sections={sections}>
      <Intro
        title="Hover States"
        description="Hover states provide temporary visual feedback when users move a pointer over an interactive element. Consistent feedback makes actions easier to recognise and reduces uncertainty while navigating Stream Software interfaces."
        note="A hover state is temporary. Active states communicate the current location, while focus states ensure the same interaction remains visible during keyboard navigation."
      />

      <Section
        id="state-scale"
        title="State scale"
        description={`The ${isDarkMode ? "dark" : "light"} mode values below are derived entirely from the shared primary and neutral color scales.`}
        divider={false}
      >
        <Box sx={{ display: "grid", gap: 1.5 }}>
          {stateScale.map((item) => (
            <Card
              key={item.state}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1.2fr 1.5fr 0.7fr 1fr",
                },
                alignItems: "center",
                gap: 2,
                boxShadow: "none",
              }}
            >
              <Typography component="h3" variant="h5">
                {item.state}
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
                    border: borderWidths.subtle,
                    borderColor: borders.subtle,
                    borderRadius: radius.small,
                    backgroundColor: item.value,
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: "var(--font-space-mono), monospace",
                    color: secondaryText,
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: secondaryText }}>
                {item.use}
              </Typography>
            </Card>
          ))}
        </Box>
      </Section>

      <Section
        id="token-usage"
        title="Token usage"
        description="Select the light or dark interaction set once and reuse its semantic state names throughout components."
      >
        <CodeBlock>{`import { interactionStates } from "@/app/theme/tokens";

const interaction =
  mode === "dark"
    ? interactionStates.dark
    : interactionStates.light;

const interactiveSx = {
  "&:hover": {
    color: interaction.hoverContent,
    borderColor: interaction.hoverBorder,
    backgroundColor: interaction.hoverBackground,
  },
};`}</CodeBlock>
      </Section>

      <Section
        id="interactive-examples"
        title="Interactive examples"
        description="Hover feedback can combine background, border and content changes without changing the layout or moving nearby content."
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
          <Card
            component="button"
            interactive
            type="button"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              color: secondaryText,
              font: "inherit",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            <MousePointer2 size={20} />
            <Box>
              <Typography component="h3" variant="h5">
                Interactive card
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                Background, border and content respond together.
              </Typography>
            </Box>
          </Card>

          <Card
            component="button"
            interactive
            type="button"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              color: secondaryText,
              font: "inherit",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            <Search size={20} />
            <Box>
              <Typography component="h3" variant="h5">
                Icon control
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                The border follows the icon color on hover.
              </Typography>
            </Box>
          </Card>

          <Card
            component="a"
            interactive
            href="#guidelines"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              color: secondaryText,
              textDecoration: "none",
            }}
          >
            <ExternalLink size={20} />
            <Box>
              <Typography component="h3" variant="h5">
                Linked surface
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                Hover confirms that the full surface is clickable.
              </Typography>
            </Box>
          </Card>
        </Box>
      </Section>

      <Section
        id="state-hierarchy"
        title="State hierarchy"
        description="Hover, active and focus each answer a different user question and should remain recognisable."
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
          {[
            {
              label: "Hover",
              description: "Can I interact with this?",
              background: interaction.hoverBackground,
              border: interaction.hoverBorder,
              color: interaction.hoverContent,
              width: borderWidths.interactive,
            },
            {
              label: "Active",
              description: "Where am I now?",
              background: interaction.activeBackground,
              border: interaction.activeIndicator,
              color: interaction.activeIndicator,
              width: borderWidths.active,
            },
            {
              label: "Focus",
              description: "What will keyboard input affect?",
              background: surface,
              border: interaction.focusRing,
              color: primaryText,
              width: borderWidths.focus,
            },
          ].map((state) => (
            <Box
              key={state.label}
              sx={{
                p: 2.5,
                color: state.color,
                border: state.width,
                borderColor: state.border,
                borderRadius: radius.medium,
                backgroundColor: state.background,
              }}
            >
              <Typography component="h3" variant="h4" sx={{ mb: 1 }}>
                {state.label}
              </Typography>
              <Typography variant="body2">{state.description}</Typography>
            </Box>
          ))}
        </Box>
      </Section>

      <Section
        id="guidelines"
        title="Guidelines"
        description="Predictable state feedback keeps interactive interfaces calm and understandable."
      >
        <GuidelineList items={guidelines} />
      </Section>

      <Section
        id="accessibility"
        title="Accessibility"
        description="Hover cannot be the only way to access information or understand an action."
        last
      >
        <Card>
          <Typography variant="h3" sx={{ mb: 1.5 }}>
            Support every input method
          </Typography>
          <Typography sx={{ color: secondaryText, lineHeight: 1.7 }}>
            Pair hover with a visible keyboard focus state and preserve clear
            labels or tooltips. Touch users do not have a persistent hover
            state, so essential actions must remain visible without it.
          </Typography>
        </Card>
      </Section>
    </Page>
  );
}
