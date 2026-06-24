"use client";

import { Box, Typography } from "@mui/material";
import {
  Accessibility,
  Grid3X3,
  PanelLeftClose,
  PanelLeftOpen,
  Palette,
  Type,
} from "lucide-react";
import Card from "@/app/components/documentation/Card";
import CodeBlock from "@/app/components/documentation/CodeBlock";
import CodeExample from "@/app/components/documentation/CodeExample";
import GuidelineList from "@/app/components/documentation/GuidelineList";
import Intro from "@/app/components/documentation/Intro";
import Page from "@/app/components/documentation/Page";
import Section from "@/app/components/documentation/Section";
import { useDocumentationStyles } from "@/app/components/documentation/useDocumentationStyles";
import {
  borderWidths,
  radius,
  spacing,
} from "@/app/theme/tokens";

const sections = [
  { label: "Overview", href: "#sidebar" },
  { label: "Anatomy", href: "#anatomy" },
  { label: "States", href: "#states" },
  { label: "Navigation groups", href: "#navigation-groups" },
  { label: "Code examples", href: "#code-examples" },
  { label: "Token usage", href: "#token-usage" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const guidelines = [
  "Use the sidebar for primary documentation or application sections.",
  "Group navigation items by purpose, such as Getting started, Foundations and Components.",
  "Keep labels short and scannable.",
  "Show the active location with a background and left active indicator.",
  "Support a collapsed state when horizontal space is limited.",
  "Keep hover, active and focus states consistent with the interaction tokens.",
  "Do not hide essential navigation behind icons unless labels are available through tooltips.",
] as const;

const exampleItems = [
  { label: "Colors", icon: Palette, active: true },
  { label: "Typography", icon: Type, active: false },
  { label: "Spacing", icon: Grid3X3, active: false },
  { label: "Accessibility", icon: Accessibility, active: false },
] as const;

export default function SidebarPage() {
  const {
    borders,
    surface,
    secondaryText,
    accent,
    selectedBackground,
  } = useDocumentationStyles();

  return (
    <Page pageId="sidebar" sections={sections}>
      <Intro
        title="Sidebar"
        description="The sidebar provides persistent section navigation for the styleguide and future Stream Software interfaces. It helps users move between foundations, components and documentation areas."
        note="Use the sidebar for stable navigation groups. Page-specific anchors belong in the on-this-page navigation."
      />

      <Section
        id="anatomy"
        title="Anatomy"
        description="A sidebar consists of grouped navigation, active indicators, icons, labels and a collapse control."
        divider={false}
      >
        <Card sx={{ width: 280, maxWidth: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography
              variant="overline"
              sx={{ color: secondaryText, fontWeight: 700 }}
            >
              Foundations
            </Typography>
            <Box
              sx={{
                width: 32,
                height: 32,
                display: "grid",
                placeItems: "center",
                color: secondaryText,
                border: `${borderWidths.subtle} solid ${borders.subtle}`,
                borderRadius: radius.medium,
              }}
            >
              <PanelLeftClose size={17} />
            </Box>
          </Box>

          <Box sx={{ display: "grid", gap: 0.5 }}>
            {exampleItems.map(({ label, icon: Icon, active }) => (
              <Box
                key={label}
                sx={{
                  minHeight: 40,
                  display: "grid",
                  gridTemplateColumns: "18px 1fr",
                  alignItems: "center",
                  gap: 1.25,
                  px: 1.5,
                  color: active ? accent : secondaryText,
                  border: `${borderWidths.interactive} solid ${
                    active ? selectedBackground : surface
                  }`,
                  borderRadius: radius.medium,
                  backgroundColor: active ? selectedBackground : surface,
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: "0 auto 0 0",
                    width: borderWidths.active,
                    borderRadius: `${radius.medium} 0 0 ${radius.medium}`,
                    backgroundColor: active ? accent : "transparent",
                  },
                }}
              >
                <Icon size={18} />
                <Typography variant="body2" sx={{ fontWeight: active ? 700 : 500 }}>
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Card>
      </Section>

      <Section
        id="states"
        title="States"
        description="The sidebar supports expanded, collapsed, hover and active states."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: 2,
          }}
        >
          <Card>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Expanded
            </Typography>
            <Box sx={{ display: "grid", gap: 0.75 }}>
              {exampleItems.slice(0, 3).map(({ label, icon: Icon, active }) => (
                <Box
                  key={label}
                  sx={{
                    minHeight: 40,
                    display: "grid",
                    gridTemplateColumns: "18px 1fr",
                    alignItems: "center",
                    gap: 1.25,
                    px: 1.5,
                    color: active ? accent : secondaryText,
                    border: `${borderWidths.interactive} solid ${
                      active ? selectedBackground : surface
                    }`,
                    borderRadius: radius.medium,
                    backgroundColor: active ? selectedBackground : surface,
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: "0 auto 0 0",
                      width: borderWidths.active,
                      borderRadius: `${radius.medium} 0 0 ${radius.medium}`,
                      backgroundColor: active ? accent : "transparent",
                    },
                  }}
                >
                  <Icon size={18} />
                  <Typography variant="body2" sx={{ fontWeight: active ? 700 : 500 }}>
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Card>

          <Card>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Collapsed
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {[Palette, Type, Grid3X3, Accessibility].map((Icon, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 40,
                    height: 40,
                    display: "grid",
                    placeItems: "center",
                    color: index === 0 ? accent : secondaryText,
                    border: `${borderWidths.interactive} solid ${
                      index === 0 ? selectedBackground : surface
                    }`,
                    borderRadius: radius.medium,
                    backgroundColor: index === 0 ? selectedBackground : surface,
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: "0 auto 0 0",
                      width: borderWidths.active,
                      borderRadius: `${radius.medium} 0 0 ${radius.medium}`,
                      backgroundColor: index === 0 ? accent : "transparent",
                    },
                  }}
                >
                  <Icon size={18} />
                </Box>
              ))}
            </Box>
          </Card>

          <Card>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Hover
            </Typography>
            <Box
              sx={{
                minHeight: 40,
                display: "grid",
                gridTemplateColumns: "18px 1fr",
                alignItems: "center",
                gap: 1.25,
                px: 1.5,
                color: accent,
                border: `${borderWidths.interactive} solid ${borders.interactive}`,
                borderRadius: radius.medium,
                backgroundColor: selectedBackground,
              }}
            >
              <PanelLeftOpen size={18} />
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Hover item
              </Typography>
            </Box>
          </Card>

          <Card>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Active
            </Typography>
            <Box
              sx={{
                minHeight: 40,
                display: "grid",
                gridTemplateColumns: "18px 1fr",
                alignItems: "center",
                gap: 1.25,
                px: 1.5,
                color: accent,
                border: `${borderWidths.interactive} solid ${selectedBackground}`,
                borderRadius: radius.medium,
                backgroundColor: selectedBackground,
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: "0 auto 0 0",
                  width: borderWidths.active,
                  borderRadius: `${radius.medium} 0 0 ${radius.medium}`,
                  backgroundColor: accent,
                },
              }}
            >
              <Palette size={18} />
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Current page
              </Typography>
            </Box>
          </Card>
        </Box>
      </Section>

      <Section
        id="navigation-groups"
        title="Navigation groups"
        description="Navigation should be grouped by user intent."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
            gap: 2,
          }}
        >
          {["Getting started", "Foundations", "Components"].map((group) => (
            <Card key={group}>
              <Typography variant="h3" sx={{ mb: 1 }}>
                {group}
              </Typography>
              <Typography variant="body2" sx={{ color: secondaryText, lineHeight: 1.7 }}>
                Groups related destinations so users can scan navigation
                without reading every item.
              </Typography>
            </Card>
          ))}
        </Box>
      </Section>

      <Section
        id="code-examples"
        title="Code examples"
        description="Use the shared sidebar in the documentation layout so navigation behaviour stays consistent."
      >
        <CodeExample
          title="Documentation sidebar"
          preview={
            <Box
              sx={{
                width: 220,
                display: "grid",
                gap: 0.75,
              }}
            >
              {exampleItems.slice(0, 3).map(({ label, icon: Icon, active }) => (
                <Box
                  key={label}
                  sx={{
                    minHeight: 38,
                    display: "grid",
                    gridTemplateColumns: "18px 1fr",
                    alignItems: "center",
                    gap: 1,
                    px: 1.25,
                    color: active ? accent : secondaryText,
                    borderRadius: radius.medium,
                    backgroundColor: active ? selectedBackground : surface,
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: "0 auto 0 0",
                      width: borderWidths.active,
                      borderRadius: `${radius.medium} 0 0 ${radius.medium}`,
                      backgroundColor: active ? accent : "transparent",
                    },
                  }}
                >
                  <Icon size={17} />
                  <Typography variant="body2" sx={{ fontWeight: active ? 700 : 500 }}>
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>
          }
          code={`import Sidebar from "@/app/components/Sidebar";

export default function DocumentationLayout({ children }) {
  return (
    <div>
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}`}
        />
      </Section>

      <Section
        id="token-usage"
        title="Token usage"
        description="Sidebar navigation uses border, radius, spacing and interaction tokens."
      >
        <CodeBlock>{`import { borderWidths, interactionStates, radius } from "@/app/theme/tokens";

const activeItem = {
  border: \`\${borderWidths.interactive} solid transparent\`,
  borderRadius: radius.medium,
  backgroundColor: interactionStates.light.activeBackground,
  color: interactionStates.light.activeIndicator,
};`}</CodeBlock>
      </Section>

      <Section
        id="guidelines"
        title="Guidelines"
        description="These rules keep navigation predictable across Stream interfaces."
      >
        <GuidelineList items={guidelines} />
      </Section>

      <Section
        id="accessibility"
        title="Accessibility"
        description="Sidebar navigation must remain usable with keyboard and assistive technology."
        last
      >
        <Card>
          <Typography variant="h3" sx={{ mb: spacing.sm }}>
            Preserve meaning when collapsed
          </Typography>
          <Typography sx={{ color: secondaryText, lineHeight: 1.7 }}>
            Icon-only navigation items need accessible labels and visible
            tooltips. The current page should be communicated with
            aria-current where possible and with more than color alone.
          </Typography>
        </Card>
      </Section>
    </Page>
  );
}
