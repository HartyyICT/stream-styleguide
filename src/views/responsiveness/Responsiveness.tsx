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
import Card from "@/app/components/atoms/Card";
import CardTitle from "@/app/components/atoms/CardTitle";
import CodeBlock from "@/app/components/atoms/CodeBlock";
import CodeExample from "@/app/components/patterns/CodeExample";
import GuidelineList from "@/app/components/patterns/GuidelineList";
import Intro from "@/app/components/layout/Intro";
import IconBox from "@/app/components/atoms/IconBox";
import Page from "@/app/components/layout/Page";
import Section from "@/app/components/layout/Section";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";
import {
  borderWidths,
  breakpoints,
  iconSizes,
  radius,
  responsiveGrids,
  spacing,
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
    range: "600px - 899px",
    start: breakpoints.tablet,
    use: "Tablets",
    icon: Tablet,
  },
  {
    token: "laptop",
    range: "900px - 1199px",
    start: breakpoints.laptop,
    use: "Small desktop screens",
    icon: Laptop,
  },
  {
    token: "desktop",
    range: ">= 1200px",
    start: breakpoints.desktop,
    use: "Standard work environment",
    icon: Monitor,
  },
] as const;

const responsivePatterns = [
  {
    title: "Card grids",
    desktop: "3 columns",
    compact: "1 column",
    description: "Dashboard cards keep their content readable by stacking before they become too narrow.",
    icon: Columns3,
  },
  {
    title: "Forms",
    desktop: "2 columns",
    compact: "Stacked fields",
    description: "Form fields move underneath each other so labels, inputs and validation remain readable.",
    icon: FormInput,
  },
  {
    title: "Navigation",
    desktop: "Full labels",
    compact: "Icon menu",
    description: "Navigation reduces density when space is limited while keeping destinations available.",
    icon: Menu,
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
              xs: responsiveGrids.oneToThree.mobile,
              sm: responsiveGrids.oneToThree.tablet,
              lg: responsiveGrids.oneToThree.desktop,
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
        description="Responsive behaviour should make the same content easier to use at different widths, not just make everything smaller."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: responsiveGrids.oneToThree.mobile,
              sm: responsiveGrids.oneToThree.tablet,
              lg: responsiveGrids.oneToThree.desktop,
            },
            gap: 2,
          }}
        >
          {responsivePatterns.map(({ title, desktop, compact, description, icon: Icon }) => (
            <Card key={title}>
              <IconBox sx={{ mb: 2 }}>
                <Icon size={iconSizes.medium} aria-hidden="true" />
              </IconBox>
              <CardTitle sx={{ mb: 1 }}>{title}</CardTitle>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto 1fr",
                  alignItems: "center",
                  gap: 1,
                  mb: 1.5,
                }}
              >
                <Typography
                  component="code"
                  sx={{
                    color: accent,
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.8125rem",
                  }}
                >
                  {desktop}
                </Typography>
                <Typography variant="caption" sx={{ color: secondaryText }}>
                  to
                </Typography>
                <Typography
                  component="code"
                  sx={{
                    color: accent,
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.8125rem",
                  }}
                >
                  {compact}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: secondaryText, lineHeight: 1.7 }}>
                {description}
              </Typography>
            </Card>
          ))}
        </Box>

        <Card sx={{ mt: 2 }}>
          <CardTitle sx={{ mb: 2 }}>
            What should change visually?
          </CardTitle>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h3" sx={{ mb: 1 }}>
                Wide layout
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: 1,
                }}
              >
                {["Metric", "Status", "Action"].map((label) => (
                  <Box
                    key={label}
                    sx={{
                      p: 1.5,
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
            </Box>

            <Box>
              <Typography variant="h3" sx={{ mb: 1 }}>
                Compact layout
              </Typography>
              <Box sx={{ display: "grid", gap: 1 }}>
                {["Metric", "Status", "Action"].map((label) => (
                  <Box
                    key={label}
                    sx={{
                      p: 1.5,
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
            </Box>
          </Box>
        </Card>
      </Section>

      <Section
        id="implementation"
        title="Implementation"
        description="Use the shared responsive tokens so pages, documentation examples and application layouts react at the same widths."
      >
        <CodeBlock>{`import { pageLayoutTokens, responsiveGrids, spacing } from "@/app/theme/tokens";

<Box
  sx={{
    display: "grid",
    maxWidth: pageLayoutTokens.contentMaxWidth,
    gridTemplateColumns: {
      xs: responsiveGrids.oneToThree.mobile,
      sm: responsiveGrids.oneToThree.tablet,
      lg: responsiveGrids.oneToThree.desktop,
    },
    gap: spacing.md,
  }}
/>`}</CodeBlock>
      </Section>

      

      <Section
        id="code-examples"
        title="Code examples"
        description="This example shows a real responsive grid: the layout starts stacked and adds columns when more width is available."
      >
        <CodeExample
          title="Responsive card grid"
          preview={
            <Box
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: {
                  xs: responsiveGrids.oneToThree.mobile,
                  sm: responsiveGrids.oneToThree.tablet,
                  lg: responsiveGrids.oneToThree.desktop,
                },
                gap: spacing.sm,
              }}
            >
              {["Customer", "Status", "Next action"].map((label) => (
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
import { responsiveGrids, spacing } from "@/app/theme/tokens";

export function ResponsiveGridExample() {
  return (
    <Box
      sx={{
        display: "grid",
        // Change the columns per breakpoint to test responsive behavior.
        // Examples: responsiveGrids.oneToTwo.mobile, responsiveGrids.oneToThree.desktop.
        gridTemplateColumns: {
          xs: responsiveGrids.oneToThree.mobile,
          sm: responsiveGrids.oneToThree.tablet,
          lg: responsiveGrids.oneToThree.desktop,
        },
        // Change gap with your spacing tokens.
        // Examples: spacing.sm, spacing.md, spacing.lg.
        gap: spacing.md,
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
