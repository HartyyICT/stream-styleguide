"use client";

import { Box, Chip, Typography } from "@mui/material";
import { BookOpen } from "lucide-react";
import SearchDialog from "@/app/components/molecules/SearchDialog";
import UserProfileMenu from "@/app/components/molecules/UserProfileMenu";
import Card from "@/app/components/atoms/Card";
import CodeBlock from "@/app/components/atoms/CodeBlock";
import CodeExample from "@/app/components/patterns/CodeExample";
import GuidelineList from "@/app/components/patterns/GuidelineList";
import Intro from "@/app/components/layout/Intro";
import Page from "@/app/components/layout/Page";
import Section from "@/app/components/layout/Section";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";
import { borderWidths, colors, radius, shadows } from "@/app/theme/tokens";

const sections = [
  { label: "Overview", href: "#navbar" },
  { label: "Anatomy", href: "#anatomy" },
  { label: "Behaviour", href: "#behaviour" },
  { label: "States", href: "#states" },
  { label: "Token usage", href: "#token-usage" },
  { label: "Code examples", href: "#code-examples" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const anatomy = [
  "Brand area with icon, product name and version context.",
  "Version indicator for the current design system release.",
  "Search entry point for finding pages and component documentation.",
  "User profile menu with account details, theme switching and logout actions.",
] as const;

const guidelines = [
  "Keep the navbar persistent at the top of documentation and application shells.",
  "Use the brand area for product identity, not page-specific titles.",
  "Keep search and account actions grouped on the right side.",
  "Do not add page navigation or hamburger menus to the navbar; navigation belongs in the sidebar.",
  "Preserve enough spacing between search, user profile and future global actions.",
  "Keep height, border, icon size and typography consistent across products.",
] as const;

function StyleguideNavbarPreview({
  state = "default",
}: {
  state?: "default" | "search" | "profile";
}) {
  const {
    borders,
    surface,
    primaryText,
    accent,
    selectedBackground,
  } = useDocumentationStyles();

  return (
    <Box sx={{ width: "100%", display: "grid", gap: 1.5 }}>
      <Box
        sx={{
          height: 64,
          px: { xs: 2, md: 3 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
          backgroundColor: surface,
          border: `${borderWidths.subtle} solid ${borders.subtle}`,
          borderRadius: radius.medium,
          boxShadow: shadows.level1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              display: "grid",
              placeItems: "center",
              borderRadius: radius.medium,
              color: colors.semantic.surface,
              backgroundColor: colors.primary[500],
            }}
          >
            <BookOpen size={20} aria-hidden="true" />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: primaryText,
                fontFamily: "var(--font-poppins), sans-serif",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              Stream Design System
            </Typography>

            <Chip
              label="v0.1"
              size="small"
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                backgroundColor: selectedBackground,
                color: accent,
                fontWeight: 700,
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SearchDialog />
          <UserProfileMenu />
        </Box>
      </Box>

      {state === "search" && (
        <Box
          sx={{
            p: 1.5,
            border: `${borderWidths.default} solid ${borders.default}`,
            borderRadius: radius.medium,
            backgroundColor: selectedBackground,
          }}
        >
          <Typography variant="caption" sx={{ color: accent, fontWeight: 700 }}>
            Search modal opens from this exact searchbar pattern.
          </Typography>
        </Box>
      )}
      {state === "profile" && (
        <Box
          sx={{
            p: 1.5,
            border: `${borderWidths.default} solid ${borders.default}`,
            borderRadius: radius.medium,
            backgroundColor: selectedBackground,
          }}
        >
          <Typography variant="caption" sx={{ color: accent, fontWeight: 700 }}>
            The user menu groups profile details, theme switching and logout actions.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

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
        description="The navbar provides persistent product identity and access to global documentation actions. It helps users understand where they are and gives quick access to search and account controls."
        note="This page documents the actual Stream styleguide navbar: brand on the left, searchbar and user profile menu on the right."
      />

      <Section
        id="anatomy"
        title="Anatomy"
        description="The Stream navbar is built from the exact regions used in the current styleguide shell."
        divider={false}
      >
        <Card sx={{ p: 0, overflow: "hidden" }}>
          <Box
            sx={{
              height: 64,
              px: { xs: 2, md: 3 },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1.5,
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
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Typography variant="subtitle1" sx={{ color: primaryText }}>
                  Stream Design System
                </Typography>
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
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <SearchDialog />
              <UserProfileMenu />
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
            account actions such as theme switching and logout.
          </Typography>
        </Card>
      </Section>

      <Section
        id="states"
        title="States"
        description="Navbar controls use the same interaction tokens as the real searchbar and user profile menu."
      >
        <Box sx={{ display: "grid", gap: 2 }}>
          <Card>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Default
            </Typography>
            <StyleguideNavbarPreview />
          </Card>

          <Card>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Search active
            </Typography>
            <StyleguideNavbarPreview state="search" />
          </Card>

          <Card>
            <Typography variant="h3" sx={{ mb: 2 }}>
              User profile menu
            </Typography>
            <StyleguideNavbarPreview state="profile" />
          </Card>
        </Box>
      </Section>

      <Section
        id="token-usage"
        title="Token usage"
        description="Navbar styling should use the same foundation tokens as the rest of the interface."
      >
        <CodeBlock>{`import {
  borderColors,
  borderWidths,
  colors,
  interactionStates,
  navbarTokens,
  radius,
  shadows,
} from "@/app/theme/tokens";

const navbar = {
  height: 64,
  actionSize: navbarTokens.actionSize,
  actionSlotSize: navbarTokens.actionSlotSize,
  actionEdgeInset: navbarTokens.actionEdgeInset,
  actionGap: navbarTokens.actionGap,
  searchWidth: navbarTokens.searchWidth,
  searchTextMaxWidth: navbarTokens.searchTextMaxWidth,
  shortcutPaddingX: navbarTokens.shortcutPaddingX,
  profileAvatarSize: navbarTokens.profileAvatarSize,
  profileChevronSlotSize: navbarTokens.profileChevronSlotSize,
  backgroundColor: colors.semantic.surface,
  borderBottom: borderColors.light.subtle,
  borderWidth: borderWidths.subtle,
  borderRadius: radius.medium,
  boxShadow: shadows.level1,
};

const searchbarHover = {
  color: interactionStates.light.hoverContent,
  borderColor: interactionStates.light.hoverBorder,
  backgroundColor: interactionStates.light.hoverBackground,
};`}</CodeBlock>
      </Section>

      <Section
        id="code-examples"
        title="Code examples"
        description="Use the real Stream navbar components. These examples intentionally match the current styleguide shell instead of showing generic app bars."
      >
        <Box sx={{ display: "grid", gap: 2 }}>
          <CodeExample
            title="Current styleguide navbar"
            preview={<StyleguideNavbarPreview />}
            renderPreview={() => <StyleguideNavbarPreview />}
            previewMinHeight={172}
            code={`import { useState } from "react";
import Navbar from "@/app/components/organisms/Navbar";

export default function DocumentationLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // The navbar is shared by the full styleguide shell.
  // Change brand, version, search or account actions centrally in Navbar.
  return (
    <>
      <Navbar
        onMenuClick={() => undefined}
        sidebarCollapsed={sidebarCollapsed}
        onSidebarToggle={() => setSidebarCollapsed((value) => !value)}
      />
      {children}
    </>
  );
}`}
          />

          <CodeExample
            title="Navbar searchbar"
            preview={<StyleguideNavbarPreview state="search" />}
            renderPreview={() => <StyleguideNavbarPreview state="search" />}
            previewMinHeight={196}
            code={`import SearchDialog from "@/app/components/molecules/SearchDialog";

export function NavbarSearchArea() {
  // SearchDialog renders the exact styleguide searchbar.
  // It also handles the Ctrl K shortcut and opens the search modal.
  return <SearchDialog />;
}`}
          />

          <CodeExample
            title="User profile menu"
            preview={<StyleguideNavbarPreview state="profile" />}
            renderPreview={() => <StyleguideNavbarPreview state="profile" />}
            previewMinHeight={172}
            code={`import UserProfileMenu from "@/app/components/molecules/UserProfileMenu";

export function NavbarAccountArea() {
  // UserProfileMenu combines account identity with common account actions.
  // Theme switching lives inside the menu so the navbar stays compact.
  return (
    <UserProfileMenu
      name="Hartiessan Asep"
      email="hartiessan.asep@streamsoftware.nl"
      role="Design system"
    />
  );
}`}
          />
        </Box>
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
            Icon-only controls and compact profile buttons require accessible
            labels. Search should clearly communicate its purpose, while the user
            menu should expose account actions with readable menu item text.
          </Typography>
        </Card>
      </Section>
    </Page>
  );
}
