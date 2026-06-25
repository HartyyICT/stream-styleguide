"use client";

import { Box, Typography } from "@mui/material";
import {
  Ear,
  Eye,
  Keyboard,
  MousePointer2,
  ScanSearch,
  ShieldCheck,
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
  iconSizes,
  radius,
} from "@/app/theme/tokens";

const sections = [
  { label: "Overview", href: "#accessibility" },
  { label: "Core principles", href: "#core-principles" },
  { label: "Forms", href: "#forms" },
  { label: "Focus states", href: "#focus-states" },
  { label: "Implementation", href: "#implementation" },
  { label: "Testing", href: "#testing" },
  { label: "Code examples", href: "#code-examples" },
  { label: "Guidelines", href: "#guidelines" },
] as const;

const principles = [
  {
    title: "Perceivable",
    description:
      "Information and interface elements must remain perceivable through contrast, readable text and alternatives to color.",
    icon: Eye,
    examples: "Contrast · 200% zoom · text alternatives",
  },
  {
    title: "Operable",
    description:
      "Every function must work with a keyboard and provide visible focus and sufficient interaction space.",
    icon: Keyboard,
    examples: "Keyboard · focus · target size",
  },
  {
    title: "Understandable",
    description:
      "Labels, navigation, validation and feedback must use consistent and understandable language.",
    icon: Ear,
    examples: "Labels · consistency · clear errors",
  },
  {
    title: "Robust",
    description:
      "Semantic HTML and appropriate ARIA ensure compatibility with browsers and assistive technologies.",
    icon: ShieldCheck,
    examples: "HTML semantics · ARIA · screen readers",
  },
] as const;

const formGuidelines = [
  "Every input has a visible and programmatically associated label.",
  "Required fields are clearly identified before submission.",
  "Error messages explain the problem and how to resolve it.",
  "Validation feedback appears close to the corresponding field.",
  "Status and validation are not communicated through color alone.",
] as const;

const guidelines = [
  "Meet WCAG 2.1 AA as the minimum accessibility standard.",
  "Support complete keyboard navigation for all functionality.",
  "Maintain sufficient text, icon and component contrast.",
  "Provide clear feedback after user actions.",
  "Use semantic HTML before adding ARIA attributes.",
  "Test components before adding them to the shared UI library.",
] as const;

export default function AccessibilityPage() {
  const {
    borders,
    surface,
    secondaryText,
    accent,
  } = useDocumentationStyles();

  return (
    <Page pageId="accessibility" sections={sections}>
      <Intro
        title="Accessibility"
        description="Accessibility ensures Stream Software interfaces remain usable for people with visual, motor, auditory or cognitive disabilities. Applying these requirements centrally improves usability for every user and prevents important functionality from becoming inaccessible."
        note="Stream Software components must meet WCAG 2.1 AA at minimum. Accessibility is part of design and implementation, not a final check after a component is finished."
      />

      <Section
        id="core-principles"
        title="Core principles"
        description="The foundation follows the four WCAG principles: perceivable, operable, understandable and robust."
        divider={false}
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
          {principles.map(({ title, description, icon: Icon, examples }) => (
            <Card key={title}>
              <IconBox sx={{ mb: 2 }}>
                <Icon size={iconSizes.medium} aria-hidden="true" />
              </IconBox>
              <CardTitle sx={{ mb: 1 }}>
                {title}
              </CardTitle>
              <Typography sx={{ color: secondaryText, lineHeight: 1.7 }}>
                {description}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: 2,
                  color: accent,
                  fontFamily: "var(--font-space-mono), monospace",
                }}
              >
                {examples}
              </Typography>
            </Card>
          ))}
        </Box>
      </Section>

      <Section
        id="forms"
        title="Forms"
        description="Forms require clear labels, predictable validation and feedback that remains understandable without color."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
          }}
        >
          <Card>
            <Box
              component="label"
              sx={{
                display: "block",
                mb: 1,
                fontFamily: "var(--font-poppins), Arial, sans-serif",
                fontWeight: 600,
              }}
            >
              Email address
            </Box>
            <Box
              sx={{
                px: 1.5,
                py: 1.25,
                border: `${borderWidths.default} solid ${borders.default}`,
                borderRadius: radius.medium,
                backgroundColor: surface,
              }}
            >
              <Typography variant="body2" sx={{ color: secondaryText }}>
                name@streamsoftware.eu
              </Typography>
            </Box>
            <Typography
              variant="caption"
              sx={{ display: "block", mt: 1, color: secondaryText }}
            >
              A visible label and helpful input guidance remain available.
            </Typography>
          </Card>

          <Card>
            <CardTitle sx={{ mb: 1.5 }}>
              Form requirements
            </CardTitle>
            <GuidelineList items={formGuidelines} />
          </Card>
        </Box>
      </Section>

      <Section
        id="focus-states"
        title="Focus states"
        description="Keyboard focus must be clearly visible and cannot rely on a subtle color change alone."
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
              title: "Keyboard navigation",
              text: "All controls follow a logical tab order.",
              icon: Keyboard,
            },
            {
              title: "Visible indicator",
              text: "A dedicated 2px focus ring surrounds the target.",
              icon: ScanSearch,
            },
            {
              title: "Usable target",
              text: "Spacing preserves comfortable pointer and touch areas.",
              icon: MousePointer2,
            },
          ].map(({ title, text, icon: Icon }) => (
            <Card key={title}>
              <Icon size={iconSizes.large} color={accent} aria-hidden="true" />
              <CardTitle sx={{ mt: 1.5, mb: 0.75 }}>
                {title}
              </CardTitle>
              <Typography variant="body2" sx={{ color: secondaryText }}>
                {text}
              </Typography>
            </Card>
          ))}
        </Box>
      </Section>

      <Section
        id="implementation"
        title="Implementation"
        description="Prefer native HTML behaviour and add ARIA only when semantics cannot express the interaction."
      >
        <CodeBlock>{`<button
  type="button"
  aria-label="Open settings"
>
  <Settings aria-hidden="true" />
</button>

<label htmlFor="email">Email address</label>
<input id="email" type="email" required />`}</CodeBlock>
      </Section>

      

      <Section
        id="testing"
        title="Testing"
        description="Accessibility requires automated checks and deliberate manual verification."
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
            ["Keyboard", "Navigate, operate and dismiss every control."],
            ["Screen reader", "Verify names, roles, states and reading order."],
            ["Visual", "Check contrast, zoom, focus and responsive reflow."],
          ].map(([title, text]) => (
            <Card key={title}>
              <CardTitle sx={{ mb: 1 }}>
                {title}
              </CardTitle>
              <Typography variant="body2" sx={{ color: secondaryText }}>
                {text}
              </Typography>
            </Card>
          ))}
        </Box>
      </Section>

      <Section
        id="code-examples"
        title="Code examples"
        description="Show labels, focus and icon-only names in the actual implementation."
      >
        <CodeExample
          title="Accessible icon action"
          preview={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 1,
                color: accent,
                border: `${borderWidths.focus} solid ${borders.focus}`,
                borderRadius: radius.medium,
                backgroundColor: surface,
              }}
            >
              <Keyboard size={iconSizes.medium} />
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Keyboard reachable
              </Typography>
            </Box>
          }
          code={`import Button from "@/app/components/documentation/Button";
import { Settings } from "lucide-react";

export function AccessibleIconAction() {
  // Change aria-label so screen readers understand the action.
  // Note: aria-label normally does not change anything visually.
  // In a real UI, test this with a screen reader or accessibility inspector.
  // Examples: "Open settings", "Search documentation", "Close dialog".
  return (
    <Button variant="icon" iconOnly aria-label="Open settings">
      <Settings aria-hidden="true" />
    </Button>
  );
}`}
        />
      </Section>

<Section
        id="guidelines"
        title="Guidelines"
        description="These requirements apply to every shared component and application."
        last
      >
        <GuidelineList items={guidelines} />
      </Section>
    </Page>
  );
}
