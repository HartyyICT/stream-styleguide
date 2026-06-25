"use client";

import { Box, IconButton, Typography } from "@mui/material";
import {
  Accessibility,
  Grid3X3,
  PanelLeftClose,
  PanelLeftOpen,
  Palette,
  Type,
} from "lucide-react";
import { useState } from "react";
import SidebarNavItem from "@/app/components/SidebarNavItem";
import {
  sidebarMotion,
  sidebarTransition,
} from "@/app/components/sidebarMotion";
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
  iconSizes,
  radius,
  spacing,
} from "@/app/theme/tokens";

const sections = [
  { label: "Overview", href: "#sidebar" },
  { label: "Anatomy", href: "#anatomy" },
  { label: "States", href: "#states" },
  { label: "Navigation groups", href: "#navigation-groups" },
  { label: "Token usage", href: "#token-usage" },
  { label: "Code examples", href: "#code-examples" },
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

function SidebarPreview({
  collapsed = false,
  interactive = false,
}: {
  collapsed?: boolean;
  interactive?: boolean;
}) {
  const { borders, surface, secondaryText } = useDocumentationStyles();
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const previewCollapsed = interactive ? isCollapsed : collapsed;

  return (
    <Box
      sx={{
        width: previewCollapsed
          ? sidebarMotion.collapsedWidth
          : sidebarMotion.expandedWidth,
        maxWidth: "100%",
        minHeight: 300,
        px: previewCollapsed ? 1.25 : 2,
        py: 3,
        display: "flex",
        flexDirection: "column",
        backgroundColor: surface,
        border: `${borderWidths.subtle} solid ${borders.subtle}`,
        borderRadius: radius.medium,
        overflow: "hidden",
        transition: `width ${sidebarTransition}, padding ${sidebarTransition}`,
      }}
    >
      <Box
        sx={{
          height: 34,
          position: "relative",
          display: "block",
          alignItems: "center",
          px: 1.5,
          mb: 1,
        }}
      >
        <Typography
          variant="overline"
          sx={{
            minWidth: 0,
            width: previewCollapsed ? 0 : "100%",
            opacity: previewCollapsed ? 0 : 1,
            overflow: "hidden",
            whiteSpace: "nowrap",
            pointerEvents: previewCollapsed ? "none" : "auto",
            color: secondaryText,
            fontWeight: 700,
            transition: `width ${sidebarTransition}, opacity ${sidebarTransition}`,
          }}
        >
          Foundations
        </Typography>

        <IconButton
          size="small"
          aria-label={previewCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={
            interactive
              ? () => setIsCollapsed((value) => !value)
              : undefined
          }
          sx={{
            width: 38,
            height: 38,
            position: "absolute",
            top: 1,
            right: previewCollapsed ? "calc(50% - 19px)" : 12,
            flexShrink: 0,
            color: secondaryText,
            boxSizing: "border-box",
            border: `${borderWidths.subtle} solid ${borders.subtle}`,
            borderRadius: radius.medium,
            backgroundColor: surface,
            cursor: interactive ? "pointer" : "default",
            transition:
              `right ${sidebarTransition}, background-color 160ms ease, color 160ms ease, border-color 160ms ease`,
          }}
        >
          {previewCollapsed ? (
            <PanelLeftOpen size={iconSizes.control} />
          ) : (
            <PanelLeftClose size={iconSizes.control} />
          )}
        </IconButton>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "grid",
          gap: 0.5,
          alignContent: "start",
        }}
      >
        {exampleItems.map(({ label, icon: Icon, active }) => (
          <SidebarNavItem
            key={label}
            label={label}
            icon={Icon}
            active={active}
            collapsed={previewCollapsed}
          />
        ))}
      </Box>
    </Box>
  );
}

export default function SidebarPage() {
  const {
    secondaryText,
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
        <SidebarPreview />
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
          <Card sx={{ minHeight: 360 }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Expanded
            </Typography>
            <Box sx={{ display: "grid", gap: 0.75 }}>
              {exampleItems.slice(0, 3).map(({ label, icon: Icon, active }) => (
                <SidebarNavItem
                  key={label}
                  label={label}
                  icon={Icon}
                  active={active}
                />
              ))}
            </Box>
          </Card>

          <Card sx={{ minHeight: 360 }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Collapsed
            </Typography>
            <SidebarPreview collapsed />
          </Card>

          <Card sx={{ minHeight: 148 }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Hover
            </Typography>
            <SidebarNavItem
              label="Hover item"
              icon={PanelLeftClose}
              state="hover"
            />
          </Card>

          <Card sx={{ minHeight: 148 }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Active
            </Typography>
            <SidebarNavItem
              label="Current page"
              icon={Palette}
              active
            />
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
        id="code-examples"
        title="Code examples"
        description="Use the shared sidebar in the documentation layout so navigation behaviour stays consistent."
      >
        <CodeExample
          title="Documentation sidebar"
          preview={<SidebarPreview interactive />}
          renderPreview={(code) => (
            <SidebarPreview
              collapsed={/collapsed=\{true\}|collapsed={true}/.test(code)}
              interactive
            />
          )}
          previewMinHeight={300}
code={`"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";

export default function DocumentationLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  // Change collapsed to true to preview the compact vertical sidebar.
  // Examples: collapsed={false}, collapsed={true}.
  return (
    <div>
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((value) => !value)}
      />
      <main>{children}</main>
    </div>
  );
}`}
        />
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
