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
import {
  CodeExample,
  GuidelineList,
  Intro,
  PageLayoutRegion,
  Section,
  TokenCode,
  TokenTable,
} from "@/app/components/documentation";
import {
  BusinessUnitBannerExample,
  CardColumnsExample,
  FixedPageLayout,
  MinimumWidthNoticeExample,
  PageStateWrapperExample,
  ProductPageLayoutExample,
} from "@/app/components/examples";
import Page from "@/app/components/layout/Page";
import { useSemanticColors } from "@ssw/ui-library";
import {
  appLayoutTokens,
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
  { label: "Product page", href: "#product-page" },
  { label: "Business unit", href: "#business-unit" },
  { label: "Card columns", href: "#card-columns" },
  { label: "Page states", href: "#page-states" },
  { label: "Minimum width", href: "#minimum-width" },
  { label: "Documentation page", href: "#documentation-page" },
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
    token: "appLayoutTokens.minimumSupportedWidth",
    columns: [
      { value: `${appLayoutTokens.minimumSupportedWidth}px`, code: true },
      { value: "Default lower viewport boundary for desktop applications." },
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
  "Use PageLayout from the package for product screens and the local Page component for styleguide documentation.",
  "Start every page with Intro so title, description and note spacing stay consistent.",
  "Use Section for each scroll target that appears in On this page.",
  "Keep one main content column and one optional in-page navigation column.",
  "Use the default content width for text-heavy pages and the wide width only when examples need it.",
  "Never hardcode shell padding, section gaps or scroll margins inside individual pages.",
  "Pass business-unit data and callbacks into the package instead of coupling the component to application context.",
  "Keep rendered page content mounted during refetches so local filter, tab and expansion state survives.",
  "Use a minimum-width notice only when the complete workflow genuinely cannot be made responsive.",
] as const;

const accessibilityGuidelines = [
  "Use one h1 per page and keep section headings in logical order.",
  "Give every section an id that matches the On this page link.",
  "Preserve scroll margins so anchor links do not hide content underneath the navbar.",
  "Keep the right-side table of contents supplementary; the page must still work without it.",
  "Avoid horizontal page scrolling on mobile and tablet widths.",
] as const;

const pageCode = `import { Intro, Section } from "@/app/components/documentation";
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

const productPageCode = `import {
  BusinessUnitBanner,
  Button,
  PageLayout,
} from "@ssw/ui-library";

<PageLayout
  title="Declarations"
  description="Review, filter and manage customs declarations."
  breadcrumbs={[{ label: "Home", href: "/" }, { label: "Declarations" }]}
  actions={<Button>New declaration</Button>}
  contextBanner={
    <BusinessUnitBanner
      businessUnit={selectedBusinessUnit}
      availableBusinessUnits={availableBusinessUnits}
      onSelect={selectBusinessUnit}
      onClear={clearBusinessUnit}
    />
  }
>
  {children}
</PageLayout>`;

const businessUnitCode = `const [businessUnit, setBusinessUnit] = useState<BusinessUnitOption | null>(
  businessUnits[0],
);

<BusinessUnitBanner
  businessUnit={businessUnit}
  availableBusinessUnits={businessUnits}
  onSelect={setBusinessUnit}
  onClear={() => setBusinessUnit(null)}
/>`;

const cardColumnsCode = `<CardColumns columns={2}>
  <Card title="Shipment">...</Card>
  <Card title="Customs status">...</Card>
  <Card title="Parties">...</Card>
  <Card title="Documents">...</Card>
</CardColumns>`;

const pageStateCode = `<PageStateWrapper
  isLoading={query.isLoading}
  isError={query.isError}
  isForbidden={query.error?.status === 403}
  error={query.error}
>
  <DeclarationsGrid rows={query.data} />
</PageStateWrapper>`;

const minimumWidthCode = `<MinimumWidthNotice
  minimumWidth={appLayoutTokens.minimumSupportedWidth}
  title="This workspace needs a wider screen"
/>`;

function renderPageLayoutPreview() {
  return <FixedPageLayout sx={{ width: "100%" }} />;
}

export default function PageLayoutPage() {
  const { accent } = useSemanticColors();

  return (
    <Page pageId="page-layout" sections={sections}>
      <Intro
        title="Page layout"
        description="Page layout covers both product screens and styleguide documentation: page headers, context banners, stable card columns, loading and error states, and the minimum supported viewport."
        note="Product layouts come from the UI package. Documentation layout helpers stay local to the styleguide, while both continue to use the same theme and tokens."
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
            token="contentGridColumns"
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
        id="product-page"
        title="Product page"
        description="PageLayout combines breadcrumbs, page identity, actions, an optional context banner and the content surface. Application data remains outside the component and is passed through props."
      >
        <CodeExample
          title="Application page shell"
          code={productPageCode}
          preview={<ProductPageLayoutExample />}
          previewMinHeight={420}
        />
      </Section>

      <Section
        id="business-unit"
        title="Business unit banner"
        description="Keep the active business unit visible when it changes the scope of every action on the page. The application owns workspace state; the package renders the current selection and switching interaction."
      >
        <CodeExample
          title="Selectable business unit"
          code={businessUnitCode}
          preview={<BusinessUnitBannerExample />}
          previewMinHeight={220}
        />
      </Section>

      <Section
        id="card-columns"
        title="Card columns"
        description="CardColumns assigns cards to stable tracks by their original index. Expanding one card only moves the cards underneath it in the same track, which prevents unrelated content from jumping between columns."
      >
        <CodeExample
          title="Stable two-column details"
          code={cardColumnsCode}
          preview={<CardColumnsExample />}
          previewMinHeight={360}
        />
      </Section>

      <Section
        id="page-states"
        title="Page states"
        description="PageStateWrapper replaces content during the initial load or initial failure. After content has rendered, refetches keep it mounted so search text, selected tabs, expanded rows and DataGrid state are preserved."
      >
        <CodeExample
          title="Initial and retained page state"
          code={pageStateCode}
          preview={<PageStateWrapperExample />}
          previewMinHeight={380}
        />
      </Section>

      <Section
        id="minimum-width"
        title="Minimum width"
        description="MinimumWidthNotice provides an explicit fallback for desktop-only workflows below the supported viewport. The default boundary comes from the shared layout tokens and the text remains configurable per application."
      >
        <CodeExample
          title="Unsupported viewport notice"
          code={minimumWidthCode}
          preview={<MinimumWidthNoticeExample />}
          previewMinHeight={300}
        />
      </Section>

      <Section
        id="documentation-page"
        title="Documentation page"
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
