"use client";

import { Box, Chip, Typography } from "@mui/material";
import { BookOpen, Moon, Search } from "lucide-react";
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
  colors,
  radius,
  shadows,
} from "@/app/theme/tokens";

const sections = [
  { label: "Overview", href: "#navbar" },
  { label: "Anatomy", href: "#anatomy" },
  { label: "Behaviour", href: "#behaviour" },
  { label: "States", href: "#states" },
  { label: "Usage example", href: "#usage-example" },
  { label: "Token usage", href: "#token-usage" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const anatomy = [
  "Brand area with icon, product name and styleguide context.",
  "Version indicator for the current design system release.",
  "Search entry point for finding pages and component documentation.",
  "Theme mode toggle for switching between light and dark mode.",
] as const;

const guidelines = [
  "Keep the navbar persistent at the top of documentation and application shells.",
  "Use the brand area for product identity, not page-specific titles.",
  "Keep global actions grouped on the right side.",
  "Avoid placing too many actions in the navbar; move secondary navigation into the sidebar or page content.",
  "Preserve enough spacing between search, theme toggle and future global actions.",
  "Keep height, border, icon size and typography consistent across products.",
] as const;

export default function NavbarPage() {
  const {
    borders,
    surface,
    primaryText,
    secondaryText,
    accent,
    selectedBackground,
  } = useDocumentationStyles();

  return (
    <Page pageId="navbar" sections={sections}>
      <Intro
        title="Navbar"
        description="The navbar provides persistent product identity and access to global documentation actions. It helps users understand where they are and gives quick access to search and theme controls."
        note="Use the navbar for stable global actions. Page-specific navigation belongs in the sidebar, on-this-page navigation or page content."
      />

      <Section
        id="anatomy"
        title="Anatomy"
        description="The Stream navbar is built from a small set of predictable regions."
        divider={false}
      >
        <Card sx={{ p: 0, overflow: "hidden" }}>
          <Box
            sx={{
              height: 64,
              px: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              borderBottom: `${borderWidths.subtle} solid ${borders.subtle}`,
              backgroundColor: surface,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  display: "grid",
                  placeItems: "center",
                  color: colors.semantic.surface,
                  backgroundColor: colors.primary[500],
                  borderRadius: radius.medium,
                }}
              >
                <BookOpen size={20} />
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ color: primaryText }}>
                  Stream Design System
                </Typography>
                <Typography variant="caption" sx={{ color: secondaryText }}>
                  Styleguide
                </Typography>
              </Box>
              <Chip
                label="v0.1"
                size="small"
                sx={{
                  color: accent,
                  backgroundColor: selectedBackground,
                  fontWeight: 700,
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 240,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1.5,
                  color: secondaryText,
                  border: `${borderWidths.subtle} solid ${borders.subtle}`,
                  borderRadius: radius.medium,
                  boxShadow: shadows.level1,
                }}
              >
                <Search size={18} />
                <Typography variant="body2">Search documentation...</Typography>
              </Box>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  display: "grid",
                  placeItems: "center",
                  color: secondaryText,
                  border: `${borderWidths.subtle} solid ${borders.subtle}`,
                  borderRadius: radius.medium,
                }}
              >
                <Moon size={19} />
              </Box>
            </Box>
          </Box>
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
              <Typography variant="body2" sx={{ color: secondaryText, lineHeight: 1.7 }}>
                {item}
              </Typography>
            </Card>
          ))}
        </Box>
      </Section>

      <Section
        id="behaviour"
        title="Behaviour"
        description="The navbar remains fixed at the top of the interface and keeps global controls available while users scroll through documentation."
      >
        <Card>
          <Typography variant="h3" sx={{ mb: 1 }}>
            Persistent global shell
          </Typography>
          <Typography sx={{ color: secondaryText, lineHeight: 1.7 }}>
            The navbar should not change per page. Its job is to provide
            consistent access to identity, search, version context and global
            preferences such as dark mode.
          </Typography>
        </Card>
      </Section>

      <Section
        id="states"
        title="States"
        description="Navbar controls should clearly show resting, hover and active feedback without changing layout."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
            gap: 2,
          }}
        >
          <Card>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Default
            </Typography>
            <Box
              sx={{
                width: 44,
                height: 44,
                display: "grid",
                placeItems: "center",
                color: secondaryText,
                border: `${borderWidths.default} solid ${borders.default}`,
                borderRadius: radius.medium,
                backgroundColor: surface,
              }}
            >
              <Moon size={19} />
            </Box>
          </Card>

          <Card>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Hover
            </Typography>
            <Box
              sx={{
                width: 44,
                height: 44,
                display: "grid",
                placeItems: "center",
                color: accent,
                border: `${borderWidths.default} solid ${borders.interactive}`,
                borderRadius: radius.medium,
                backgroundColor: selectedBackground,
              }}
            >
              <Moon size={19} />
            </Box>
          </Card>

          <Card>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Active
            </Typography>
            <Box
              sx={{
                height: 44,
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                color: accent,
                border: `${borderWidths.default} solid ${borders.active}`,
                borderRadius: radius.medium,
                backgroundColor: selectedBackground,
              }}
            >
              <Search size={18} />
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Search focused
              </Typography>
            </Box>
          </Card>
        </Box>
      </Section>

      <Section
        id="usage-example"
        title="Usage example"
        description="The styleguide currently uses the navbar as part of its documentation layout."
      >
        <CodeExample
          title="Documentation navbar"
          preview={
            <Box
              sx={{
                width: "100%",
                maxWidth: 540,
                height: 52,
                px: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.5,
                border: `${borderWidths.default} solid ${borders.default}`,
                borderRadius: radius.medium,
                backgroundColor: surface,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <BookOpen size={20} color={accent} />
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Stream Design System
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Search size={17} color={secondaryText} />
                <Moon size={17} color={secondaryText} />
              </Box>
            </Box>
          }
          code={`import Navbar from "@/app/components/Navbar";

export default function DocumentationLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}`}
        />
      </Section>

      <Section
        id="token-usage"
        title="Token usage"
        description="Navbar styling should use the same foundation tokens as the rest of the interface."
      >
        <CodeBlock>{`import { borderWidths, colors, radius, shadows } from "@/app/theme/tokens";

const navbar = {
  height: 64,
  backgroundColor: colors.semantic.surface,
  borderBottom: \`\${borderWidths.subtle} solid token.border.subtle\`,
  boxShadow: shadows.level0,
  borderRadius: radius.medium,
};`}</CodeBlock>
      </Section>

      <Section
        id="guidelines"
        title="Guidelines"
        description="These rules keep global navigation calm and predictable."
      >
        <GuidelineList items={guidelines} />
      </Section>

      <Section
        id="accessibility"
        title="Accessibility"
        description="Global navigation must remain understandable and keyboard accessible."
        last
      >
        <Card>
          <Typography variant="h3" sx={{ mb: 1.5 }}>
            Label global controls
          </Typography>
          <Typography sx={{ color: secondaryText, lineHeight: 1.7 }}>
            Icon-only controls such as the theme toggle require an accessible
            label. Search should clearly communicate its purpose and support a
            keyboard shortcut without requiring pointer interaction.
          </Typography>
        </Card>
      </Section>
    </Page>
  );
}
