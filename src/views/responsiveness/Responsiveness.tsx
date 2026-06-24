"use client";

import { Box, Typography } from "@mui/material";
import {
  Columns3,
  FormInput,
  Laptop,
  Menu,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import Card from "@/app/components/documentation/Card";
import CardTitle from "@/app/components/documentation/CardTitle";
import CodeBlock from "@/app/components/documentation/CodeBlock";
import CodeExample from "@/app/components/documentation/CodeExample";
import GuidelineList from "@/app/components/documentation/GuidelineList";
import Intro from "@/app/components/documentation/Intro";
import IconBox from "@/app/components/documentation/IconBox";
import Page from "@/app/components/documentation/Page";
import Section from "@/app/components/documentation/Section";
import { useDocumentationStyles } from "@/app/components/documentation/useDocumentationStyles";
import {
  borderWidths,
  breakpoints,
  iconSizes,
  radius,
} from "@/app/theme/tokens";

const sections = [
  { label: "Overview", href: "#responsiveness" },
  { label: "Strategy", href: "#strategy" },
  { label: "Breakpoints", href: "#breakpoints" },
  { label: "Component behaviour", href: "#component-behaviour" },
  { label: "Implementation", href: "#implementation" },
  { label: "Code examples", href: "#code-examples" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const breakpointScale = [
  {
    token: "mobile",
    range: "< 600px",
    start: breakpoints.mobile,
    use: "Smartphones",
    icon: Smartphone,
  },
  {
    token: "tablet",
    range: "600px – 899px",
    start: breakpoints.tablet,
    use: "Tablets",
    icon: Tablet,
  },
  {
    token: "laptop",
    range: "900px – 1199px",
    start: breakpoints.laptop,
    use: "Small desktop screens",
    icon: Laptop,
  },
  {
    token: "desktop",
    range: "≥ 1200px",
    start: breakpoints.desktop,
    use: "Standard work environment",
    icon: Monitor,
  },
] as const;

const behaviours = [
  {
    title: "Cards",
    description: "Stack vertically when horizontal space becomes limited.",
    icon: Columns3,
  },
  {
    title: "Tables",
    description: "Remain readable and scroll horizontally only when necessary.",
    icon: Columns3,
  },
  {
    title: "Forms",
    description: "Place fields underneath each other on smaller screens.",
    icon: FormInput,
  },
  {
    title: "Navigation",
    description: "Collapse into a compact menu when the full structure no longer fits.",
    icon: Menu,
  },
  {
    title: "Dialogs",
    description: "Adapt their maximum width and margins to the viewport.",
    icon: Monitor,
  },
] as const;

const guidelines = [
  "Use flexible layouts wherever possible.",
  "Prevent horizontal page scrolling.",
  "Maintain sufficient whitespace between components.",
  "Keep forms usable on smaller screens.",
  "Keep navigation understandable when space is limited.",
  "Use the shared breakpoint scale consistently across applications.",
] as const;

export default function ResponsivenessPage() {
  const {
    borders,
    surface,
    secondaryText,
    accent,
  } = useDocumentationStyles();

  return (
    <Page pageId="responsiveness" sections={sections}>
      <Intro
        title="Responsiveness"
        description="Responsive design keeps Stream Software interfaces usable across desktop, laptop and tablet environments. Components adapt predictably to available space while preserving hierarchy, readability and interaction."
        note="The design system follows a desktop-first strategy. Desktop and laptop are primary; tablet is supported and mobile is facilitated where practical rather than treated as the main product context."
      />

      <Section
        id="strategy"
        title="Strategy"
        description="Design for the primary enterprise workspace first, then progressively adapt layouts and components for smaller screens."
        divider={false}
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
            ["Primary", "Desktop and laptop workflows", Monitor],
            ["Supported", "Tablet layouts and interactions", Tablet],
            ["Facilitated", "Mobile where component context allows", Smartphone],
          ].map(([title, text, Icon]) => {
            const StrategyIcon = Icon as typeof Monitor;
            return (
              <Card key={title as string}>
                <StrategyIcon
                  size={iconSizes.large}
                  color={accent}
                  aria-hidden="true"
                />
                <CardTitle sx={{ mt: 1.5, mb: 0.75 }}>
                  {title as string}
                </CardTitle>
                <Typography variant="body2" sx={{ color: secondaryText }}>
                  {text as string}
                </Typography>
              </Card>
            );
          })}
        </Box>
      </Section>

      <Section
        id="breakpoints"
        title="Breakpoints"
        description="The shared breakpoint scale gives layouts and components one predictable set of transition points."
      >
        <Box sx={{ display: "grid", gap: 1.5 }}>
          {breakpointScale.map(({ token, range, start, use, icon: Icon }) => (
            <Card
              key={token}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "48px 0.8fr 1fr 1.3fr",
                },
                alignItems: "center",
                gap: 2,
              }}
            >
              <IconBox>
                <Icon size={iconSizes.medium} aria-hidden="true" />
              </IconBox>
              <CardTitle>{token}</CardTitle>
              <Typography
                component="code"
                sx={{
                  color: accent,
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: "0.8125rem",
                }}
              >
                {range} · starts at {start}px
              </Typography>
              <Typography variant="body2" sx={{ color: secondaryText }}>
                {use}
              </Typography>
            </Card>
          ))}
        </Box>
      </Section>

      <Section
        id="component-behaviour"
        title="Component behaviour"
        description="Components respond according to their content and task rather than merely shrinking everything."
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
          {behaviours.map(({ title, description, icon: Icon }) => (
            <Card key={title}>
              <Icon size={iconSizes.large} color={accent} aria-hidden="true" />
              <CardTitle sx={{ mt: 1.5, mb: 0.75 }}>
                {title}
              </CardTitle>
              <Typography variant="body2" sx={{ color: secondaryText }}>
                {description}
              </Typography>
            </Card>
          ))}
        </Box>

        <Card sx={{ mt: 2 }}>
          <CardTitle sx={{ mb: 2 }}>
            Responsive layout example
          </CardTitle>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(3, minmax(0, 1fr))",
              },
              gap: 1.5,
            }}
          >
            {[1, 2, 3].map((item) => (
              <Box
                key={item}
                sx={{
                  minHeight: 92,
                  p: 2,
                  border: `${borderWidths.default} solid ${borders.default}`,
                  borderRadius: radius.medium,
                  backgroundColor: surface,
                }}
              >
                <CardTitle>Card {item}</CardTitle>
                <Typography
                  variant="caption"
                  sx={{ display: "block", mt: 1, color: secondaryText }}
                >
                  Stacks below the laptop breakpoint.
                </Typography>
              </Box>
            ))}
          </Box>
        </Card>
      </Section>

      <Section
        id="implementation"
        title="Implementation"
        description="Use responsive MUI values and the shared breakpoint names instead of isolated media queries."
      >
        <CodeBlock>{`<Box
  sx={{
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      md: "repeat(2, minmax(0, 1fr))",
      lg: "repeat(3, minmax(0, 1fr))",
    },
    gap: spacing.md,
  }}
/>`}</CodeBlock>
      </Section>

      <Section
        id="code-examples"
        title="Code examples"
        description="Use responsive grid values for documentation and application layouts."
      >
        <CodeExample
          title="Responsive card grid"
          preview={
            <Box
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(3, minmax(0, 1fr))",
                },
                gap: 1,
              }}
            >
              {["Mobile", "Tablet", "Desktop"].map((label) => (
                <Box
                  key={label}
                  sx={{
                    p: 1.5,
                    textAlign: "center",
                    border: `${borderWidths.default} solid ${borders.default}`,
                    borderRadius: radius.medium,
                    backgroundColor: surface,
                  }}
                >
                  <Typography variant="caption" sx={{ color: secondaryText }}>
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>
          }
          code={`import { Box } from "@mui/material";

export function ResponsiveGridExample() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          lg: "repeat(3, minmax(0, 1fr))",
        },
        gap: 2,
      }}
    />
  );
}`}
        />
      </Section>

      <Section
        id="guidelines"
        title="Guidelines"
        description="Responsive behaviour should preserve task completion and information hierarchy."
      >
        <GuidelineList items={guidelines} />
      </Section>

      <Section
        id="accessibility"
        title="Accessibility"
        description="Responsive layouts must reflow without hiding functionality or requiring two-dimensional page scrolling."
        last
      >
        <Card>
          <CardTitle sx={{ mb: 1.5 }}>
            Preserve content and interaction
          </CardTitle>
          <Typography sx={{ color: secondaryText, lineHeight: 1.7 }}>
            Text remains readable at 200% zoom, focus order follows the visual
            layout and controls retain sufficient target size. Reflow content
            vertically before introducing horizontal scrolling.
          </Typography>
        </Card>
      </Section>
    </Page>
  );
}
