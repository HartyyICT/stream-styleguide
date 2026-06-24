"use client";

import { Box, Typography } from "@mui/material";
import {
  Check,
  ChevronRight,
  Filter,
  Pencil,
  Search,
  Settings,
  Trash2,
} from "lucide-react";
import Card from "@/app/components/documentation/Card";
import Button from "@/app/components/documentation/Button";
import CodeBlock from "@/app/components/documentation/CodeBlock";
import CodeExample from "@/app/components/documentation/CodeExample";
import GuidelineList from "@/app/components/documentation/GuidelineList";
import Intro from "@/app/components/documentation/Intro";
import Page from "@/app/components/documentation/Page";
import Section from "@/app/components/documentation/Section";
import { useDocumentationStyles } from "@/app/components/documentation/useDocumentationStyles";
import { borderWidths, radius, spacing } from "@/app/theme/tokens";

const sections = [
  { label: "Overview", href: "#buttons" },
  { label: "Button types", href: "#button-types" },
  { label: "Button scale", href: "#button-scale" },
  { label: "Size scale", href: "#size-scale" },
  { label: "Usage examples", href: "#usage-examples" },
  { label: "Code examples", href: "#code-examples" },
  { label: "Token usage", href: "#token-usage" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const buttonTypes = [
  {
    title: "Primary button",
    token: "button.primary",
    description:
      "Used for the most important action on a page, form or component.",
    examples: ["Save", "Confirm", "Continue", "Create task"],
    preview: <Button>Save</Button>,
  },
  {
    title: "Secondary button",
    token: "button.secondary",
    description:
      "Supports the main action without competing with the primary button.",
    examples: ["Cancel", "Back", "Open filters", "View options"],
    preview: <Button variant="secondary">Cancel</Button>,
  },
  {
    title: "Tertiary button",
    token: "button.tertiary",
    description:
      "Used for subtle actions with low visual emphasis, often close to text.",
    examples: ["More information", "View details", "Secondary navigation"],
    preview: <Button variant="tertiary">View details</Button>,
  },
  {
    title: "Icon button",
    token: "button.icon",
    description:
      "Compact action button for tables, toolbars, cards and navigation.",
    examples: ["Edit", "Search", "Settings", "Open menu"],
    preview: (
      <Button variant="icon" iconOnly aria-label="Settings">
        <Settings />
      </Button>
    ),
  },
  {
    title: "Destructive button",
    token: "button.destructive",
    description:
      "Reserved for actions with negative or permanent impact on data or processes.",
    examples: ["Delete", "Reset", "Cancel process", "Remove permanently"],
    preview: <Button variant="destructive">Delete</Button>,
  },
] as const;

const buttonScale = [
  {
    token: "button.primary",
    background: "Primary 500 / #154F96",
    content: "Surface / #FFFFFF",
    border: "None",
    use: "Main actions",
    example: <Button size="sm">Test</Button>,
  },
  {
    token: "button.secondary",
    background: "Surface / #FFFFFF",
    content: "Primary 500 / #154F96",
    border: "1px Primary 500 / #154F96",
    use: "Secondary actions",
    example: (
      <Button size="sm" variant="secondary">
        Test
      </Button>
    ),
  },
  {
    token: "button.tertiary",
    background: "Transparent",
    content: "Primary 500 / #154F96",
    border: "None",
    use: "Subtle actions",
    example: (
      <Button size="sm" variant="tertiary">
        Test
      </Button>
    ),
  },
  {
    token: "button.icon",
    background: "Surface / Transparent",
    content: "Neutral 700 / #334155",
    border: "1px Neutral 200 / #E2E8F0",
    use: "Compact actions",
    example: (
      <Button size="sm" variant="icon">
        Test
      </Button>
    ),
  },
  {
    token: "button.destructive",
    background: "Error main / #C32222",
    content: "Surface / #FFFFFF",
    border: "None",
    use: "Dangerous actions",
    example: (
      <Button size="sm" variant="destructive">
        Test
      </Button>
    ),
  },
  {
    token: "button.disabled",
    background: "Neutral 100 / #F1F5F9",
    content: "Neutral 400 / #94A3B8",
    border: "1px Neutral 200 / #E2E8F0",
    use: "Unavailable action",
    example: (
      <Button size="sm" variant="disabled">
        Test
      </Button>
    ),
  },
] as const;

const sizeScale = [
  {
    token: "button.size.sm",
    height: "32px / 2rem",
    width: "Hug content, min 64px / 4rem",
    padding: "6px 12px / 0.375rem 0.75rem",
    fontSize: "14px / 0.875rem",
    iconSize: "14px / 0.875rem",
    example: <Button size="sm">Small</Button>,
  },
  {
    token: "button.size.md",
    height: "40px / 2.5rem",
    width: "Hug content, min 80px / 5rem",
    padding: "8px 16px / 0.5rem 1rem",
    fontSize: "14px / 0.875rem",
    iconSize: "14px / 0.875rem",
    example: <Button size="md">Medium</Button>,
  },
  {
    token: "button.size.lg",
    height: "48px / 3rem",
    width: "Hug content, min 96px / 6rem",
    padding: "12px 20px / 0.75rem 1.25rem",
    fontSize: "16px / 1rem",
    iconSize: "16px / 1rem",
    example: <Button size="lg">Large</Button>,
  },
] as const;

const guidelines = [
  "Use one primary button per section or form.",
  "Use primary buttons only for the most important action.",
  "Use secondary buttons for supporting actions that should remain visible.",
  "Use tertiary buttons for low-emphasis actions and link-like behaviour.",
  "Use destructive buttons only for negative or permanent actions.",
  "Keep labels short, clear and action-oriented; start with a verb where possible.",
  "Use icon buttons only when the meaning is clear or supported by a tooltip.",
  "Keep spacing, radius and typography consistent across all buttons.",
  "Make focus states clearly visible for keyboard users.",
] as const;

const accessibilityGuidelines = [
  "Buttons must have enough contrast between text, icon and background.",
  "Every button needs a visible focus state.",
  "Clickable areas must be large enough for comfortable interaction.",
  "Labels should clearly describe the result of the action.",
  "Icon-only buttons need an accessible name and often benefit from a tooltip.",
  "Disabled buttons should be visually recognizable, but availability should not be communicated only through disabled styling.",
  "Important or destructive actions should not rely on color alone.",
] as const;

const primaryButtonCode = `import Button from "@/app/components/documentation/Button";
import { Check } from "lucide-react";

<Button startIcon={<Check />}>
  Save changes
</Button>`;

const secondaryButtonCode = `import Button from "@/app/components/documentation/Button";

<Button variant="secondary">
  Cancel
</Button>`;

const iconButtonCode = `import Button from "@/app/components/documentation/Button";
import { Search } from "lucide-react";

<Button variant="icon" iconOnly aria-label="Search">
  <Search />
</Button>`;

const destructiveButtonCode = `import Button from "@/app/components/documentation/Button";
import { Trash2 } from "lucide-react";

<Button variant="destructive" startIcon={<Trash2 />}>
  Delete
</Button>`;

function getButtonLabel(code: string, fallback: string) {
  const labelMatch = code.match(/>\s*([^<>]+?)\s*<\/Button>/);
  const text = (labelMatch?.[1] ?? "")
    .replace(/[{}>]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text || fallback;
}

function renderEditableButtonPreview(code: string) {
  const variant = code.match(/variant=["']([^"']+)["']/)?.[1] as
    | "primary"
    | "secondary"
    | "tertiary"
    | "icon"
    | "destructive"
    | "disabled"
    | undefined;
  const size = code.match(/size=["']([^"']+)["']/)?.[1] as
    | "sm"
    | "md"
    | "lg"
    | undefined;
  const iconOnly = /\siconOnly(\s|>)/.test(code);

  if (iconOnly) {
    const Icon = code.includes("<Settings")
      ? Settings
      : code.includes("<Filter")
        ? Filter
        : code.includes("<Pencil")
          ? Pencil
          : Search;

    return (
      <Button
        variant="icon"
        size={size}
        iconOnly
        aria-label={code.match(/aria-label=["']([^"']+)["']/)?.[1] ?? "Icon action"}
      >
        <Icon />
      </Button>
    );
  }

  const StartIcon = code.includes("startIcon={<Trash2")
    ? Trash2
    : code.includes("startIcon={<Check")
      ? Check
      : undefined;
  const EndIcon = code.includes("endIcon={<ChevronRight")
    ? ChevronRight
    : undefined;

  return (
    <Button
      variant={variant}
      size={size}
      startIcon={StartIcon ? <StartIcon /> : undefined}
      endIcon={EndIcon ? <EndIcon /> : undefined}
    >
      {getButtonLabel(code, "Button")}
    </Button>
  );
}

export default function ButtonsPage() {
  const {
    borders,
    interaction,
    surface,
    primaryText,
    secondaryText,
    accent,
    subtleBackground,
    selectedBackground,
  } = useDocumentationStyles();

  return (
    <Page pageId="buttons" sections={sections} maxWidth={980}>
      <Intro
        title="Buttons"
        description="Buttons make user actions clear and recognizable across Stream Software interfaces. They help users save, cancel, confirm, search and move through enterprise workflows with confidence."
        note="Use button emphasis deliberately. Users should quickly understand which action is primary, which action is secondary and which action may affect data or processes."
      />

      <Section
        id="button-types"
        title="Button types"
        description="Each button type has its own level of visual emphasis and a specific role in the interface."
        divider={false}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: 2,
          }}
        >
          {buttonTypes.map((item) => (
            <Card key={item.token}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 2,
                  mb: 2,
                }}
              >
                <Box>
                  <Typography component="h3" variant="h4" sx={{ mb: 0.75 }}>
                    {item.title}
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
                </Box>
                <Box sx={{ flexShrink: 0 }}>{item.preview}</Box>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: secondaryText, lineHeight: 1.7, mb: 2 }}
              >
                {item.description}
              </Typography>
              <Box
                component="ul"
                sx={{
                  m: 0,
                  pl: 2.5,
                  color: secondaryText,
                  lineHeight: 1.7,
                }}
              >
                {item.examples.map((example) => (
                  <Typography key={example} component="li" variant="body2">
                    {example}
                  </Typography>
                ))}
              </Box>
            </Card>
          ))}
        </Box>
      </Section>

      <Section
        id="button-scale"
        title="Button scale"
        description="The button scale defines the visual role, token name and expected use for each button type."
      >
        <Box
          sx={{
            overflow: "hidden",
            border: `${borderWidths.default} solid ${borders.default}`,
            borderRadius: radius.medium,
            backgroundColor: surface,
          }}
        >
          <Box
            sx={{
              display: { xs: "none", lg: "grid" },
              gridTemplateColumns: "1.1fr 1.3fr 1.3fr 1.6fr 1.2fr 92px",
              gap: 2,
              px: 2,
              py: 1.5,
              borderBottom: `${borderWidths.subtle} solid ${borders.subtle}`,
              backgroundColor: subtleBackground,
            }}
          >
            {["Token", "Background", "Text/Icon", "Border", "Use", "Example"].map(
              (heading) => (
                <Typography
                  key={heading}
                  variant="overline"
                  sx={{
                    color: secondaryText,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                  }}
                >
                  {heading}
                </Typography>
              ),
            )}
          </Box>

          {buttonScale.map((item) => (
            <Box
              key={item.token}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  lg: "1.1fr 1.3fr 1.3fr 1.6fr 1.2fr 92px",
                },
                alignItems: "center",
                gap: 2,
                p: 2,
                borderBottom: `${borderWidths.subtle} solid ${borders.subtle}`,
                "&:last-child": { borderBottom: 0 },
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  display: { xs: "block", lg: "none" },
                  color: secondaryText,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                Token
              </Typography>
              <Typography
                component="code"
                sx={{
                  color: accent,
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                }}
              >
                {item.token}
              </Typography>
              <Typography
                variant="overline"
                sx={{
                  display: { xs: "block", lg: "none" },
                  color: secondaryText,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                Background
              </Typography>
              <Typography variant="body2" sx={{ color: secondaryText }}>
                {item.background}
              </Typography>
              <Typography
                variant="overline"
                sx={{
                  display: { xs: "block", lg: "none" },
                  color: secondaryText,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                Text/Icon
              </Typography>
              <Typography variant="body2" sx={{ color: secondaryText }}>
                {item.content}
              </Typography>
              <Typography
                variant="overline"
                sx={{
                  display: { xs: "block", lg: "none" },
                  color: secondaryText,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                Border
              </Typography>
              <Typography variant="body2" sx={{ color: secondaryText }}>
                {item.border}
              </Typography>
              <Typography
                variant="overline"
                sx={{
                  display: { xs: "block", lg: "none" },
                  color: secondaryText,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                Use
              </Typography>
              <Typography variant="body2" sx={{ color: secondaryText }}>
                {item.use}
              </Typography>
              <Typography
                variant="overline"
                sx={{
                  display: { xs: "block", lg: "none" },
                  color: secondaryText,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                Example
              </Typography>
              <Box>{item.example}</Box>
            </Box>
          ))}
        </Box>
      </Section>

      <Section
        id="size-scale"
        title="Size scale"
        description="Buttons use three sizes. The medium size is the default for most enterprise workflows."
      >
        <Box
          sx={{
            overflow: "hidden",
            border: `${borderWidths.default} solid ${borders.default}`,
            borderRadius: radius.medium,
            backgroundColor: surface,
          }}
        >
          <Box
            sx={{
              display: { xs: "none", lg: "grid" },
              gridTemplateColumns: "1.1fr 0.9fr 1.5fr 1.8fr 1fr 1fr 108px",
              gap: 2,
              px: 2,
              py: 1.5,
              borderBottom: `${borderWidths.subtle} solid ${borders.subtle}`,
              backgroundColor: subtleBackground,
            }}
          >
            {[
              "Token",
              "Height",
              "Width",
              "Padding",
              "Font size",
              "Icon size",
              "Example",
            ].map((heading) => (
              <Typography
                key={heading}
                variant="overline"
                sx={{
                  color: secondaryText,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                {heading}
              </Typography>
            ))}
          </Box>

          {sizeScale.map((item) => (
            <Box
              key={item.token}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  lg: "1.1fr 0.9fr 1.5fr 1.8fr 1fr 1fr 108px",
                },
                alignItems: "center",
                gap: 2,
                p: 2,
                borderBottom: `${borderWidths.subtle} solid ${borders.subtle}`,
                "&:last-child": { borderBottom: 0 },
              }}
            >
              {[item.token, item.height, item.width, item.padding, item.fontSize, item.iconSize].map(
                (value, index) => (
                  <Box key={`${item.token}-${index}-${value}`}>
                    <Typography
                      variant="overline"
                      sx={{
                        display: { xs: "block", lg: "none" },
                        color: secondaryText,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                      }}
                    >
                      {
                        [
                          "Token",
                          "Height",
                          "Width",
                          "Padding",
                          "Font size",
                          "Icon size",
                        ][index]
                      }
                    </Typography>
                    <Typography
                      component={index === 0 ? "code" : "p"}
                      variant="body2"
                      sx={{
                        m: 0,
                        color: index === 0 ? accent : secondaryText,
                        fontFamily:
                          index === 0
                            ? "var(--font-space-mono), monospace"
                            : undefined,
                        fontSize: index === 0 ? "0.8125rem" : undefined,
                        fontWeight: index === 0 ? 700 : undefined,
                      }}
                    >
                      {value}
                    </Typography>
                  </Box>
                ),
              )}
              <Typography
                variant="overline"
                sx={{
                  display: { xs: "block", lg: "none" },
                  color: secondaryText,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                Example
              </Typography>
              <Box>{item.example}</Box>
            </Box>
          ))}
        </Box>
      </Section>

      <Section
        id="usage-examples"
        title="Usage examples"
        description="Use button combinations to make the primary path clear without hiding supporting actions."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: 2,
          }}
        >
          <Card>
            <Typography component="h3" variant="h4" sx={{ mb: 1 }}>
              Form actions
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: secondaryText, lineHeight: 1.7, mb: 2.5 }}
            >
              Pair one primary action with a quieter secondary action.
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: spacing.sm }}>
              <Button startIcon={<Check />}>Save changes</Button>
              <Button variant="secondary">Cancel</Button>
            </Box>
          </Card>

          <Card>
            <Typography component="h3" variant="h4" sx={{ mb: 1 }}>
              Navigation action
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: secondaryText, lineHeight: 1.7, mb: 2.5 }}
            >
              Use directional icons when they support the label.
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: spacing.sm }}>
              <Button endIcon={<ChevronRight />}>Continue</Button>
              <Button variant="tertiary">View details</Button>
            </Box>
          </Card>

          <Card>
            <Typography component="h3" variant="h4" sx={{ mb: 1 }}>
              Toolbar actions
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: secondaryText, lineHeight: 1.7, mb: 2.5 }}
            >
              Icon buttons work well for compact repeated actions.
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: spacing.sm }}>
              <Button variant="icon" iconOnly aria-label="Search">
                <Search />
              </Button>
              <Button variant="icon" iconOnly aria-label="Filter">
                <Filter />
              </Button>
              <Button variant="icon" iconOnly aria-label="Edit">
                <Pencil />
              </Button>
              <Button variant="icon" iconOnly aria-label="Settings">
                <Settings />
              </Button>
            </Box>
          </Card>

          <Card>
            <Typography component="h3" variant="h4" sx={{ mb: 1 }}>
              Destructive action
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: secondaryText, lineHeight: 1.7, mb: 2.5 }}
            >
              Reserve destructive styling for actions with real impact.
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: spacing.sm }}>
              <Button variant="destructive" startIcon={<Trash2 />}>
                Delete
              </Button>
              <Button variant="secondary">Keep item</Button>
            </Box>
          </Card>
        </Box>
      </Section>

      <Section
        id="code-examples"
        title="Code examples"
        description="Copy or edit the example code while keeping the visual preview in the same Stream documentation style."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: 2,
          }}
        >
          <CodeExample
            title="Primary button"
            code={primaryButtonCode}
            preview={
              <Button startIcon={<Check />}>Save changes</Button>
            }
            renderPreview={renderEditableButtonPreview}
          />

          <CodeExample
            title="Secondary button"
            code={secondaryButtonCode}
            preview={<Button variant="secondary">Cancel</Button>}
            renderPreview={renderEditableButtonPreview}
          />

          <CodeExample
            title="Icon button"
            code={iconButtonCode}
            preview={
              <Button variant="icon" iconOnly aria-label="Search">
                <Search />
              </Button>
            }
            renderPreview={renderEditableButtonPreview}
          />

          <CodeExample
            title="Destructive button"
            code={destructiveButtonCode}
            preview={
              <Button variant="destructive" startIcon={<Trash2 />}>
                Delete
              </Button>
            }
            renderPreview={renderEditableButtonPreview}
          />
        </Box>
      </Section>

      <Section
        id="token-usage"
        title="Token usage"
        description="Button styling is built from the shared design foundations: color, spacing, radius, border width and typography."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: 2,
          }}
        >
          <Card>
            <Typography component="h3" variant="h4" sx={{ mb: 1 }}>
              Primary action
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: secondaryText, lineHeight: 1.7, mb: 2 }}
            >
              Use primary tokens for the main call to action.
            </Typography>
            <CodeBlock>{`import { colors, radius } from "@/app/theme/tokens";

const primaryButton = {
  backgroundColor: colors.primary[500],
  color: colors.semantic.surface,
  borderRadius: radius.medium,
};`}</CodeBlock>
          </Card>

          <Card>
            <Typography component="h3" variant="h4" sx={{ mb: 1 }}>
              Consistent sizing
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: secondaryText, lineHeight: 1.7, mb: 2 }}
            >
              Keep dimensions and padding predictable across products.
            </Typography>
            <CodeBlock>{`import { buttonTokens } from "@/app/theme/tokens";

const mediumButton = {
  minHeight: "2.5rem",
  minWidth: "5rem",
  padding: "0.5rem 1rem",
};`}</CodeBlock>
          </Card>
        </Box>
      </Section>

      <Section
        id="guidelines"
        title="Guidelines"
        description="These rules keep button usage predictable in data-heavy enterprise screens."
      >
        <GuidelineList items={guidelines} />
      </Section>

      <Section
        id="accessibility"
        title="Accessibility"
        description="Buttons must remain recognizable and usable for keyboard users and assistive technology."
        last
      >
        <Card>
          <Typography variant="h3" sx={{ mb: 1.5 }}>
            Make every action understandable
          </Typography>
          <Typography sx={{ color: secondaryText, lineHeight: 1.7, mb: 2.5 }}>
            Buttons need a clear label, a visible focus state and enough
            contrast. Icon-only controls must expose an accessible name because
            the icon itself is not enough for every user.
          </Typography>
          <GuidelineList items={accessibilityGuidelines} />
        </Card>

        <Box
          sx={{
            mt: 2,
            p: 2.5,
            borderLeft: `${borderWidths.accent} solid ${interaction.activeIndicator}`,
            borderRadius: radius.medium,
            backgroundColor: selectedBackground,
          }}
        >
          <Typography variant="h3" sx={{ mb: 1, color: accent }}>
            Minimum interactive area
          </Typography>
          <Typography variant="body2" sx={{ color: primaryText, lineHeight: 1.7 }}>
            Use the small button size only for compact areas. Forms, dialogs and
            primary workflows should generally use medium or large buttons so
            the clickable area remains comfortable.
          </Typography>
        </Box>

        <Box
          aria-hidden="true"
          sx={{
            mt: 2,
            height: 1,
            backgroundColor: subtleBackground,
          }}
        />
      </Section>
    </Page>
  );
}
