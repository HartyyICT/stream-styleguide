"use client";

import { Box, Typography } from "@mui/material";
import { Clock, Search, X } from "lucide-react";
import Button from "@/app/components/documentation/Button";
import Card from "@/app/components/documentation/Card";
import CodeBlock from "@/app/components/documentation/CodeBlock";
import CodeExample from "@/app/components/documentation/CodeExample";
import GuidelineList from "@/app/components/documentation/GuidelineList";
import Intro from "@/app/components/documentation/Intro";
import Page from "@/app/components/documentation/Page";
import Section from "@/app/components/documentation/Section";
import { useDocumentationStyles } from "@/app/components/documentation/useDocumentationStyles";
import { borderWidths, radius, shadows, spacing } from "@/app/theme/tokens";

const sections = [
  { label: "Overview", href: "#searchbar" },
  { label: "Anatomy", href: "#anatomy" },
  { label: "States", href: "#states" },
  { label: "Search dialog", href: "#search-dialog" },
  { label: "Code examples", href: "#code-examples" },
  { label: "Token usage", href: "#token-usage" },
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

export default function SearchbarPage() {
  const {
    borders,
    surface,
    primaryText,
    secondaryText,
    accent,
    subtleBackground,
  } = useDocumentationStyles();

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
        description="The searchbar combines an icon, placeholder, shortcut hint and a connected search dialog."
        divider={false}
      >
        <Card sx={{ maxWidth: 560 }}>
          <Box
            sx={{
              height: 40,
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1.5,
              color: secondaryText,
              border: `${borderWidths.subtle} solid ${borders.subtle}`,
              borderRadius: radius.medium,
              boxShadow: shadows.level1,
              backgroundColor: surface,
            }}
          >
            <Search size={18} />
            <Typography variant="body2" sx={{ flex: 1 }}>
              Search documentation...
            </Typography>
            <Typography
              variant="caption"
              sx={{
                px: 0.75,
                py: 0.25,
                border: `${borderWidths.subtle} solid ${borders.subtle}`,
                borderRadius: radius.small,
              }}
            >
              Ctrl K
            </Typography>
          </Box>
        </Card>
      </Section>

      <Section
        id="states"
        title="States"
        description="Search should provide clear hover, focus and recent-search feedback."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
            gap: 2,
          }}
        >
          {[ 
            {
              title: "Default",
              description: "Resting search entry point.",
              borderColor: borders.default,
              background: surface,
              content: secondaryText,
              trailing: "Ctrl K",
            },
            {
              title: "Hover",
              description: "Border and background respond using interaction tokens.",
              borderColor: borders.interactive,
              background: subtleBackground,
              content: accent,
              trailing: "Ctrl K",
            },
            {
              title: "Recent",
              description: "Previous searches can be reopened or removed.",
              borderColor: borders.default,
              background: surface,
              content: accent,
              trailing: <X size={15} />,
            },
          ].map((state) => (
            <Card key={state.title}>
              <Typography variant="h3" sx={{ mb: 1 }}>
                {state.title}
              </Typography>
              <Typography variant="body2" sx={{ color: secondaryText, lineHeight: 1.7, mb: 2 }}>
                {state.description}
              </Typography>
              <Box
                sx={{
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1.5,
                  color: state.content,
                  border: `${borderWidths.default} solid ${state.borderColor}`,
                  borderRadius: radius.medium,
                  backgroundColor: state.background,
                }}
              >
                <Search size={17} />
                <Typography variant="body2" sx={{ flex: 1, fontWeight: state.title === "Recent" ? 700 : 400 }}>
                  {state.title === "Recent" ? "Buttons" : "Search documentation..."}
                </Typography>
                <Box
                  component="span"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    color: state.content,
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.75rem",
                  }}
                >
                  {state.trailing}
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      </Section>

      <Section
        id="search-dialog"
        title="Search dialog"
        description="Opening search displays a focused dialog with results, recent searches and foundation suggestions."
      >
        <Card sx={{ p: 0, overflow: "hidden" }}>
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              borderBottom: `${borderWidths.subtle} solid ${borders.subtle}`,
            }}
          >
            <Search size={20} color={secondaryText} />
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
                <Box
                  key={item}
                  sx={{
                    minHeight: 44,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 1.5,
                    color: accent,
                    border: `${borderWidths.subtle} solid ${borders.subtle}`,
                    borderRadius: radius.medium,
                    backgroundColor: surface,
                  }}
                >
                  <Clock size={16} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Card>
      </Section>

      <Section
        id="code-examples"
        title="Code examples"
        description="Use the shared search components in the documentation shell instead of rebuilding the pattern per page."
      >
        <CodeExample
          title="Search trigger"
          preview={
            <Box
              sx={{
                width: "100%",
                maxWidth: 380,
                height: 40,
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                color: secondaryText,
                border: `${borderWidths.default} solid ${borders.default}`,
                borderRadius: radius.medium,
                backgroundColor: surface,
              }}
            >
              <Search size={18} />
              <Typography variant="body2" sx={{ flex: 1 }}>
                Search documentation...
              </Typography>
              <Typography variant="caption" sx={{ fontFamily: "var(--font-space-mono), monospace" }}>
                Ctrl K
              </Typography>
            </Box>
          }
          code={`import SearchModal from "@/app/components/SearchModal";

export default function NavbarSearch() {
  return <SearchModal />;
}`}
        />
      </Section>

      <Section
        id="token-usage"
        title="Token usage"
        description="Searchbar styling should reuse surface, border, shadow and interaction tokens."
      >
        <CodeBlock>{`import { borderWidths, radius, shadows } from "@/app/theme/tokens";

const searchbar = {
  height: 40,
  border: \`\${borderWidths.subtle} solid token.border.subtle\`,
  borderRadius: radius.medium,
  boxShadow: shadows.level1,
};`}</CodeBlock>
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
