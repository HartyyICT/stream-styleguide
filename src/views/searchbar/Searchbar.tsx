"use client";

import { Box, Typography } from "@mui/material";
import { Search, X } from "lucide-react";
import RecentSearchItem from "@/app/components/RecentSearchItem";
import SearchDialog from "@/app/components/SearchDialog";
import Button from "@/app/components/documentation/Button";
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
  shadows,
  spacing,
} from "@/app/theme/tokens";

const sections = [
  { label: "Overview", href: "#searchbar" },
  { label: "Anatomy", href: "#anatomy" },
  { label: "States", href: "#states" },
  { label: "Search dialog", href: "#search-dialog" },
  { label: "Token usage", href: "#token-usage" },
  { label: "Code examples", href: "#code-examples" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const guidelines = [
  "Use the searchbar for global documentation search, not page-local filtering.",
  "Keep placeholder text clear and action-oriented.",
  "Show the keyboard shortcut when search is globally available.",
  "Limit empty-state suggestions to the most useful destinations.",
  "Allow users to remove recent searches.",
  "Close the search dialog after a result is selected.",
  "Do not make search results visually compete with page content.",
] as const;

const anatomy = [
  "Search icon communicates that the control opens documentation search.",
  "Placeholder text explains what users can search for.",
  "Keyboard shortcut gives faster access for power users.",
  "The trigger opens a focused search dialog with results and recent searches.",
] as const;

function SearchStatePreview({
  state,
}: {
  state: "default" | "hover" | "active" | "recent";
}) {
  const { borders, surface, secondaryText, interaction } =
    useDocumentationStyles();

  if (state === "recent") {
    return (
      <Box sx={{ width: { xs: "100%", sm: 280 }, maxWidth: 280 }}>
        <RecentSearchItem label="Buttons" />
      </Box>
    );
  }

  const stateStyles = {
    default: {
      color: secondaryText,
      backgroundColor: surface,
      borderColor: borders.subtle,
      label: "Search documentation...",
      trailing: "Ctrl K",
    },
    hover: {
      color: interaction.hoverContent,
      backgroundColor: interaction.hoverBackground,
      borderColor: interaction.hoverBorder,
      label: "Search documentation...",
      trailing: "Ctrl K",
    },
    active: {
      color: interaction.hoverContent,
      backgroundColor: interaction.activeBackground,
      borderColor: interaction.hoverBorder,
      label: "Search documentation...",
      trailing: "Ctrl K",
    },
  }[state];

  return (
    <Box
      sx={{
        height: 40,
        width: { xs: "100%", sm: 280 },
        maxWidth: 280,
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 1.5,
        color: stateStyles.color,
        backgroundColor: stateStyles.backgroundColor,
        border: `${borderWidths.subtle} solid ${stateStyles.borderColor}`,
        borderRadius: radius.medium,
        boxShadow: shadows.level1,
      }}
    >
      <Search size={18} aria-hidden="true" />

      <Typography
        variant="body2"
        sx={{
          flex: 1,
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          color: "inherit",
          fontWeight: 400,
        }}
      >
        {stateStyles.label}
      </Typography>

      <Box
        component="span"
        sx={{
          minWidth: "auto",
          height: "auto",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          px: 0.75,
          py: 0.25,
          color: "inherit",
          border: `${borderWidths.subtle} solid ${borders.subtle}`,
          borderRadius: radius.small,
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: "0.75rem",
        }}
      >
        {stateStyles.trailing}
      </Box>
    </Box>
  );
}

function SearchDialogPreview() {
  const {
    borders,
    surface,
    primaryText,
    secondaryText,
    subtleBackground,
  } = useDocumentationStyles();

  return (
    <Card sx={{ p: 0, overflow: "hidden" }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          borderBottom: `${borderWidths.subtle} solid ${borders.subtle}`,
          backgroundColor: surface,
        }}
      >
        <Search size={20} color={secondaryText} aria-hidden="true" />
        <Typography sx={{ flex: 1, color: primaryText }}>
          What are you looking for?
        </Typography>
        <Button variant="icon" iconOnly aria-label="Close search">
          <X />
        </Button>
      </Box>

      <Box sx={{ p: 2, backgroundColor: subtleBackground }}>
        <Typography variant="overline" sx={{ color: secondaryText }}>
          Recent
        </Typography>

        <Box sx={{ mt: 1, display: "grid", gap: 1 }}>
          {["Buttons", "Typography", "Spacing"].map((item) => (
            <RecentSearchItem
              key={item}
              label={item}
            />
          ))}
        </Box>
      </Box>
    </Card>
  );
}

export default function SearchbarPage() {
  const { secondaryText } = useDocumentationStyles();

  return (
    <Page pageId="searchbar" sections={sections}>
      <Intro
        title="Searchbar"
        description="The searchbar gives users a fast way to find design foundations, component pages and guidelines without scanning the full navigation structure."
        note="Search is a global navigation pattern. It should help users move through the guide quickly while keeping recent searches easy to manage."
      />

      <Section
        id="anatomy"
        title="Anatomy"
        description="The searchbar uses the exact same trigger as the current styleguide navbar."
        divider={false}
      >
        <Card>
          <SearchDialog />
        </Card>

        <Box
          sx={{
            mt: 2,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
            gap: 2,
          }}
        >
          {anatomy.map((item) => (
            <Card key={item}>
              <Typography
                variant="body2"
                sx={{ color: secondaryText, lineHeight: 1.7 }}
              >
                {item}
              </Typography>
            </Card>
          ))}
        </Box>
      </Section>

      <Section
        id="states"
        title="States"
        description="Searchbar states are based on the same interaction tokens as the real navbar searchbar."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: 2,
          }}
        >
          {[
            {
              title: "Default",
              description: "Resting search entry point.",
              state: "default" as const,
            },
            {
              title: "Hover",
              description: "Uses interaction.hoverBackground, hoverBorder and hoverContent.",
              state: "hover" as const,
            },
            {
              title: "Pressed",
              description: "Uses interaction.activeBackground and activeIndicator.",
              state: "active" as const,
            },
            {
              title: "Recent search",
              description: "Recent searches can be reopened or removed.",
              state: "recent" as const,
            },
          ].map((item) => (
            <Card key={item.title}>
              <Typography variant="h3" sx={{ mb: 1 }}>
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: secondaryText, lineHeight: 1.7 }}
              >
                {item.description}
              </Typography>
              <SearchStatePreview state={item.state} />
            </Card>
          ))}
        </Box>
      </Section>

      <Section
        id="search-dialog"
        title="Search dialog"
        description="Opening search displays a focused dialog with results, recent searches and foundation suggestions."
      >
        <SearchDialogPreview />
      </Section>

      <Section
        id="token-usage"
        title="Token usage"
        description="Searchbar styling should reuse surface, border, shadow and interaction tokens."
      >
        <CodeBlock>{`import {
  borderColors,
  borderWidths,
  colors,
  interactionStates,
  radius,
  shadows,
} from "@/app/theme/tokens";

const searchbar = {
  height: 40,
  backgroundColor: colors.semantic.surface,
  border: \`\${borderWidths.subtle} solid \${borderColors.light.subtle}\`,
  borderRadius: radius.medium,
  boxShadow: shadows.level1,
};

const searchbarHover = {
  color: interactionStates.light.hoverContent,
  borderColor: interactionStates.light.hoverBorder,
  backgroundColor: interactionStates.light.hoverBackground,
};

const searchbarPressed = {
  backgroundColor: interactionStates.light.activeBackground,
};`}</CodeBlock>
      </Section>

      <Section
        id="code-examples"
        title="Code examples"
        description="Use the shared search components instead of rebuilding the searchbar per page."
      >
        <Box sx={{ display: "grid", gap: 2 }}>
          <CodeExample
            title="Navbar searchbar trigger"
            preview={<SearchDialog />}
            renderPreview={() => <SearchDialog />}
            previewMinHeight={132}
            code={`import SearchDialog from "@/app/components/SearchDialog";

export function NavbarSearchArea() {
  // SearchDialog renders the exact styleguide searchbar.
  // It uses the project tokens for surface, borders, hover and pressed states.
  return <SearchDialog />;
}`}
          />

          <CodeExample
            title="Search dialog usage"
            preview={<SearchDialogPreview />}
            renderPreview={() => <SearchDialogPreview />}
            previewMinHeight={340}
            code={`import SearchModal from "@/app/components/SearchModal";

export function SearchExample({ open, onClose }) {
  // Pass open=true to show the dialog.
  // Use onClose to close search after selecting a result or pressing Escape.
  return <SearchModal open={open} onClose={onClose} />;
}`}
          />
        </Box>
      </Section>

      <Section
        id="guidelines"
        title="Guidelines"
        description="A focused search pattern keeps large documentation sets easy to navigate."
      >
        <GuidelineList items={guidelines} />
      </Section>

      <Section
        id="accessibility"
        title="Accessibility"
        description="Search must work for keyboard, screen reader and pointer users."
        last
      >
        <Card>
          <Typography variant="h3" sx={{ mb: spacing.sm }}>
            Provide labels and keyboard access
          </Typography>
          <Typography sx={{ color: secondaryText, lineHeight: 1.7 }}>
            The search trigger needs an accessible label, the dialog input
            should receive focus when opened, and users must be able to close
            the dialog without using a mouse.
          </Typography>
        </Card>
      </Section>
    </Page>
  );
}
