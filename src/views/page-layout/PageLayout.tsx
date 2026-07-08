"use client";

import { Box } from "@mui/material";
import {
  Columns3,
  FileText,
  LayoutTemplate,
  PanelLeft,
  PanelRight,
  Rows3,
} from "lucide-react";
import { Card } from "@ssw/ui-library";
import { CardTitle } from "@ssw/ui-library";
import { Surface } from "@ssw/ui-library";
import { Text } from "@ssw/ui-library";
import { TokenCode } from "@ssw/ui-library";
import { PageLayoutRegion } from "@ssw/ui-library";
import { TokenTable } from "@ssw/ui-library";
import FixedPageLayout from "@/app/components/organisms/FixedPageLayout";
import CodeExample from "@/app/components/patterns/CodeExample";
import { GuidelineList } from "@ssw/ui-library";
import { Intro } from "@ssw/ui-library";
import Page from "@/app/components/layout/Page";
import { Section } from "@ssw/ui-library";
import { useSemanticColors } from "@ssw/ui-library";
import {
  iconSizes,
  pageLayoutTokens,
  responsiveGrids,
  spacing,
} from "@ssw/ui-library";

const sections = [
  { label: "Overview", href: "#page-layout" },
  { label: "Anatomy", href: "#anatomy" },
  { label: "Layout tokens", href: "#layout-tokens" },
  { label: "Fixed structure", href: "#fixed-structure" },
  { label: "Code examples", href: "#code-examples" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const layoutTokenRows = [
  {
    token: "pageLayoutTokens.navbarHeight",
    columns: [
      { value: pageLayoutTokens.navbarHeight, code: true },
      { value: "Reserved height for the persistent navbar." },
    ],
  },
  {
    token: "pageLayoutTokens.shellMaxWidth",
    columns: [
      { value: `${pageLayoutTokens.shellMaxWidth}px`, code: true },
      { value: "Maximum width for the full documentation shell." },
    ],
  },
  {
    token: "pageLayoutTokens.contentMaxWidth",
    columns: [
      { value: `${pageLayoutTokens.contentMaxWidth}px`, code: true },
      { value: "Default maximum width for readable content pages." },
    ],
  },
  {
    token: "pageLayoutTokens.wideContentMaxWidth",
    columns: [
      { value: `${pageLayoutTokens.wideContentMaxWidth}px`, code: true },
      { value: "Use for pages with forms, tables or wider examples." },
    ],
  },
  {
    token: "pageLayoutTokens.onThisPageWidth",
    columns: [
      { value: `${pageLayoutTokens.onThisPageWidth}px`, code: true },
      { value: "Right-side in-page navigation width on desktop." },
    ],
  },
  {
    token: "pageLayoutTokens.sectionDividerMarginY",
    columns: [
      { value: pageLayoutTokens.sectionDividerMarginY, code: true },
      { value: "Vertical separation between major content sections." },
    ],
  },
] as const;

const guidelines = [
  "Use the shared Page component for every documentation page.",
  "Start every page with Intro so title, description and note spacing stay consistent.",
  "Use Section for each scroll target that appears in On this page.",
  "Keep one main content column and one optional in-page navigation column.",
  "Use the default content width for text-heavy pages and the wide width only when examples need it.",
  "Never hardcode shell padding, section gaps or scroll margins inside individual pages.",
  "Place code examples before guidelines so users can see implementation before rules.",
] as const;

const accessibilityGuidelines = [
  "Use one h1 per page and keep section headings in logical order.",
  "Give every section an id that matches the On this page link.",
  "Preserve scroll margins so anchor links do not hide content underneath the navbar.",
  "Keep the right-side table of contents supplementary; the page must still work without it.",
  "Avoid horizontal page scrolling on mobile and tablet widths.",
] as const;

const pageCode = `import { Intro, Section } from "@ssw/ui-library";
import Page from "@/app/components/layout/Page";

const sections = [
  { label: "Overview", href: "#example-page" },
  { label: "Usage", href: "#usage" },
  { label: "Guidelines", href: "#guidelines" },
] as const;

export default function ExamplePage() {
  return (
    <Page pageId="example-page" sections={sections}>
      <Intro
        title="Example page"
        description="Use the fixed page layout for predictable documentation pages."
      />

      <Section id="usage" title="Usage">
        Page content goes here.
      </Section>

      <Section id="guidelines" title="Guidelines" last>
        Keep layout decisions centralized in pageLayoutTokens.
      </Section>
    </Page>
  );
}`;

function renderPageLayoutPreview() {
  return <FixedPageLayout sx={{ width: "100%" }} />;
}

export default function PageLayoutPage() {
  const { accent } = useSemanticColors();

  return (
    <Page pageId="page-layout" sections={sections}>
      <Intro
        title="Page layout"
        description="The fixed page layout defines how every Stream documentation page is structured: navbar, sidebar, main content, page intro, sections and in-page navigation."
        note="Use this foundation whenever a new page is added. It keeps spacing, scroll behaviour and responsive structure predictable across the full styleguide."
      />

      <Section
        id="anatomy"
        title="Anatomy"
        description="A page is built from stable regions. Each region has one responsibility and should not be recreated per page."
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
            gap: spacing.md,
          }}
        >
          <PageLayoutRegion
            title="Shell"
            description="Wraps the navbar, sidebar and main content area."
            token="DocumentationLayout"
            icon={<LayoutTemplate size={iconSizes.medium} color={accent} />}
          />
          <PageLayoutRegion
            title="Main content"
            description="Contains the article, sections and page-specific examples."
            token="Page"
            icon={<FileText size={iconSizes.medium} color={accent} />}
          />
          <PageLayoutRegion
            title="Sections"
            description="Creates stable anchors, headings and vertical rhythm."
            token="Section"
            icon={<Rows3 size={iconSizes.medium} color={accent} />}
          />
          <PageLayoutRegion
            title="Sidebar"
            description="Provides global navigation and remains outside individual page content."
            token="Sidebar"
            icon={<PanelLeft size={iconSizes.medium} color={accent} />}
          />
          <PageLayoutRegion
            title="On this page"
            description="Shows section anchors and highlights the current scroll position."
            token="OnThisPage"
            icon={<PanelRight size={iconSizes.medium} color={accent} />}
          />
          <PageLayoutRegion
            title="Grid"
            description="Switches from one column on small screens to content plus aside on desktop."
            token="pageLayoutTokens.contentGridColumns"
            icon={<Columns3 size={iconSizes.medium} color={accent} />}
          />
        </Box>
      </Section>

      <Section
        id="layout-tokens"
        title="Layout tokens"
        description="These tokens control page width, shell spacing and scroll behaviour for every documentation page."
      >
        <TokenTable
          headers={["Token", "Value", "Use"]}
          rows={layoutTokenRows}
          columnsTemplate="1.6fr 1fr 2fr"
        />
      </Section>

      <Section
        id="fixed-structure"
        title="Fixed structure"
        description="The page structure is fixed so users always know where navigation, content and local anchors live."
      >
        <FixedPageLayout />
      </Section>

      <Section
        id="code-examples"
        title="Code examples"
        description="New pages should use the shared page layout components instead of rebuilding spacing and anchors manually."
      >
        <CodeExample
          title="Documentation page"
          code={pageCode}
          preview={renderPageLayoutPreview()}
          renderPreview={renderPageLayoutPreview}
          previewMinHeight={420}
        />
      </Section>

      <Section
        id="guidelines"
        title="Guidelines"
        description="Follow these rules so every page in the design system behaves the same way."
      >
        <GuidelineList items={guidelines} />

        <Box
          sx={{
            mt: spacing.md,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: spacing.md,
          }}
        >
          <Card>
            <CardTitle sx={{ mb: spacing.sm }}>Default content page</CardTitle>
            <Text tone="secondary" variant="body2" sx={{ mb: spacing.md }}>
              Use this for most documentation pages with text, token tables and small examples.
            </Text>
            <TokenCode>pageLayoutTokens.contentMaxWidth</TokenCode>
          </Card>
          <Card>
            <CardTitle sx={{ mb: spacing.sm }}>Wide example page</CardTitle>
            <Text tone="secondary" variant="body2" sx={{ mb: spacing.md }}>
              Use this when forms, tables or complex previews need more horizontal room.
            </Text>
            <TokenCode>pageLayoutTokens.wideContentMaxWidth</TokenCode>
          </Card>
        </Box>
      </Section>

      <Section
        id="accessibility"
        title="Accessibility"
        description="A predictable page layout improves keyboard navigation, anchor links and reading order."
        last
      >
        <Surface elevated>
          <GuidelineList items={accessibilityGuidelines} />
        </Surface>
      </Section>
    </Page>
  );
}
