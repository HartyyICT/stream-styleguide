"use client";

import { Box, Typography } from "@mui/material";
import {
  Bell,
  Calendar,
  Check,
  CircleAlert,
  Download,
  Eye,
  Filter,
  Home,
  Mail,
  Search,
  Settings,
  User,
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
  iconSizes,
  radius,
} from "@/app/theme/tokens";

const sections = [
  { label: "Overview", href: "#iconography" },
  { label: "Icon library", href: "#icon-library" },
  { label: "Icon sizes", href: "#icon-sizes" },
  { label: "Token usage", href: "#token-usage" },
  { label: "Usage examples", href: "#usage-examples" },
  { label: "Code examples", href: "#code-examples" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const iconExamples = [
  { name: "Home", icon: Home },
  { name: "Search", icon: Search },
  { name: "Settings", icon: Settings },
  { name: "User", icon: User },
  { name: "Calendar", icon: Calendar },
  { name: "Mail", icon: Mail },
  { name: "Bell", icon: Bell },
  { name: "Download", icon: Download },
  { name: "Filter", icon: Filter },
  { name: "View", icon: Eye },
  { name: "Success", icon: Check },
  { name: "Warning", icon: CircleAlert },
] as const;

const sizeScale = [
  {
    token: "small",
    size: iconSizes.small,
    rem: "1rem",
    use: "Compact components",
  },
  {
    token: "medium",
    size: iconSizes.medium,
    rem: "1.25rem",
    use: "Forms and tables",
  },
  {
    token: "large",
    size: iconSizes.large,
    rem: "1.5rem",
    use: "Navigation and actions",
  },
  {
    token: "extraLarge",
    size: iconSizes.extraLarge,
    rem: "2rem",
    use: "Dashboard highlights",
  },
] as const;

const guidelines = [
  "Use icons exclusively from the central Lucide icon library.",
  "Use icons to support text, navigation and functionality.",
  "Avoid icons without a clear meaning or context.",
  "Use consistent sizes within comparable components.",
  "Maintain sufficient contrast between icons and their background.",
  "Provide labels or tooltips when an icon's meaning is not immediately clear.",
  "Do not mix multiple icon libraries within the same application.",
] as const;

export default function IconographyPage() {
  const {
    borders,
    interaction,
    surface,
    secondaryText,
    accent,
  } = useDocumentationStyles();

  return (
    <Page pageId="iconography" sections={sections}>
      <Intro
        title="Iconography"
        description="Icons support users in recognising actions, functionality and navigation. Stream Software uses Lucide to provide one lightweight, scalable and visually consistent icon language across applications."
        note="Icons support meaning; they do not replace it. Important information and unfamiliar actions always require visible text, an accessible label or a tooltip."
      />

      <Section
        id="icon-library"
        title="Icon library"
        description="Lucide provides a consistent SVG-based visual style, React support, tree-shaking and a broad collection of common interface symbols."
        divider={false}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(3, minmax(0, 1fr))",
              sm: "repeat(4, minmax(0, 1fr))",
              md: "repeat(6, minmax(0, 1fr))",
            },
            gap: 1.5,
          }}
        >
          {iconExamples.map(({ name, icon: Icon }) => (
            <Card
              key={name}
              sx={{
                p: 2,
                minHeight: 104,
                display: "grid",
                placeItems: "center",
                textAlign: "center",
              }}
            >
              <Icon size={iconSizes.large} strokeWidth={1.8} color={accent} />
              <Typography
                variant="caption"
                sx={{ mt: 1.25, color: secondaryText }}
              >
                {name}
              </Typography>
            </Card>
          ))}
        </Box>
      </Section>

      <Section
        id="icon-sizes"
        title="Icon sizes"
        description="Four sizes cover compact controls, forms, navigation and larger dashboard highlights."
      >
        <Box sx={{ display: "grid", gap: 1.5 }}>
          {sizeScale.map((item) => (
            <Card
              key={item.token}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr 1.4fr 64px",
                },
                gap: 2,
                alignItems: "center",
              }}
            >
              <CardTitle>{item.token}</CardTitle>
              <Typography
                component="code"
                sx={{
                  color: accent,
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: "0.8125rem",
                }}
              >
                {item.size}px / {item.rem}
              </Typography>
              <Typography variant="body2" sx={{ color: secondaryText }}>
                {item.use}
              </Typography>
              <Box
                sx={{
                  width: 56,
                  height: 48,
                  display: "grid",
                  placeItems: "center",
                  border: `${borderWidths.default} solid ${borders.default}`,
                  borderRadius: radius.medium,
                  backgroundColor: interaction.activeBackground,
                }}
              >
                <Eye size={item.size} color={accent} strokeWidth={1.8} />
              </Box>
            </Card>
          ))}
        </Box>
      </Section>

      <Section
        id="token-usage"
        title="Token usage"
        description="Import icons directly from Lucide and select a shared size token."
      >
        <CodeBlock>{`import { Search } from "lucide-react";
import { iconSizes } from "@/app/theme/tokens";

<Search
  size={iconSizes.medium}
  strokeWidth={1.8}
  aria-hidden="true"
/>`}</CodeBlock>
      </Section>

      <Section
        id="usage-examples"
        title="Usage examples"
        description="Match the treatment to whether an icon is decorative, labelled or the only visible control."
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
          <Card>
            <IconBox>
              <Download size={iconSizes.medium} />
            </IconBox>
            <CardTitle sx={{ mt: 1.5 }}>Download report</CardTitle>
            <Typography
              variant="body2"
              sx={{ mt: 0.75, color: secondaryText }}
            >
              A familiar icon reinforces a visible action label.
            </Typography>
          </Card>

          <Card>
            <IconBox
              sx={{
                border: `${borderWidths.default} solid ${borders.default}`,
                backgroundColor: surface,
              }}
            >
              <Settings size={iconSizes.medium} />
            </IconBox>
            <CardTitle sx={{ mt: 1.5 }}>
              Icon-only control
            </CardTitle>
            <Typography
              variant="body2"
              sx={{ mt: 0.75, color: secondaryText }}
            >
              Requires an accessible label and tooltip.
            </Typography>
          </Card>

          <Card>
            <IconBox>
              <CircleAlert size={iconSizes.medium} />
            </IconBox>
            <CardTitle sx={{ mt: 1.5 }}>
              Status support
            </CardTitle>
            <Typography
              variant="body2"
              sx={{ mt: 0.75, color: secondaryText }}
            >
              Pair status icons with text; never communicate state by icon or
              color alone.
            </Typography>
          </Card>
        </Box>
      </Section>

      

      <Section
        id="code-examples"
        title="Code examples"
        description="Import icons from Lucide and pair icon-only controls with an accessible label."
      >
        <CodeExample
          title="Icon-only button"
          preview={
            <Box
              sx={{
                width: 42,
                height: 42,
                display: "grid",
                placeItems: "center",
                color: accent,
                border: `${borderWidths.default} solid ${borders.default}`,
                borderRadius: radius.medium,
                backgroundColor: surface,
              }}
            >
              <Search size={iconSizes.medium} />
            </Box>
          }
          code={`import Button from "@/app/components/atoms/Button";
import { Search } from "lucide-react";

export function IconButtonExample() {
  // Change aria-label and the icon based on the action.
  // Examples: Search, Settings, Download, Filter from lucide-react.
  return (
    <Button variant="icon" iconOnly aria-label="Search">
      <Search />
    </Button>
  );
}`}
        />
      </Section>

<Section
        id="guidelines"
        title="Guidelines"
        description="A restrained icon language improves scanability without adding ambiguity."
      >
        <GuidelineList items={guidelines} />
      </Section>

      <Section
        id="accessibility"
        title="Accessibility"
        description="Icons must remain understandable to keyboard and assistive-technology users."
        last
      >
        <Card>
          <CardTitle sx={{ mb: 1.5 }}>
            Label meaning, hide decoration
          </CardTitle>
          <Typography sx={{ color: secondaryText, lineHeight: 1.7 }}>
            Decorative icons use <code>aria-hidden=&quot;true&quot;</code>.
            Icon-only buttons need an accessible name and visible focus state.
            When an icon communicates status, pair it with readable text.
          </Typography>
        </Card>
      </Section>
    </Page>
  );
}
