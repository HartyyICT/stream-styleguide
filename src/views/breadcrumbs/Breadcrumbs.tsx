"use client";

import { Typography } from "@mui/material";
import type { ComponentProps } from "react";
import { Breadcrumbs } from "@ssw/ui-library";
import { Card } from "@ssw/ui-library";
import { CodeBlock } from "@ssw/ui-library";
import CodeExample from "@/app/components/patterns/CodeExample";
import { GuidelineList } from "@ssw/ui-library";
import { Intro } from "@ssw/ui-library";
import Page from "@/app/components/layout/Page";
import { Section } from "@ssw/ui-library";
import { useSemanticColors } from "@ssw/ui-library";
import { spacing } from "@ssw/ui-library";

const sections = [
  { label: "Overview", href: "#breadcrumbs" },
  { label: "Anatomy", href: "#anatomy" },
  { label: "Examples", href: "#examples" },
  { label: "Token usage", href: "#token-usage" },
  { label: "Code examples", href: "#code-examples" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const guidelines = [
  "Use breadcrumbs to show where a page sits within a hierarchy, not as the primary way to navigate.",
  "Keep labels short and match the exact page titles they link to.",
  "The last item represents the current page: it is not a link and uses stronger text weight.",
  "Do not use breadcrumbs for single-level pages that sit directly under the sidebar navigation.",
  "Place breadcrumbs directly above the page title, not inside the sidebar or navbar.",
] as const;

const basicExample = [
  { label: "Customers", href: "/customers" },
  { label: "Van Dijk Logistics", href: "/customers/van-dijk-logistics" },
  { label: "Invoices" },
] as const;

const shortExample = [
  { label: "Settings", href: "/settings" },
  { label: "Profile" },
] as const;

function PreviewLink({ href, onClick, ...props }: ComponentProps<"a">) {
  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);
      }}
    />
  );
}

export default function BreadcrumbsPage() {
  const { secondaryText } = useSemanticColors();

  return (
    <Page pageId="breadcrumbs" sections={sections}>
      <Intro
        title="Breadcrumbs"
        description="Breadcrumbs show a user's location within a hierarchy of pages, such as a customer record nested inside a list of customers. They let users jump back to any parent level in one click."
        note="Breadcrumbs describe hierarchy, not history. Use them for pages that live inside a parent record or category, not as a substitute for the sidebar or the browser back button."
      />

      <Section
        id="anatomy"
        title="Anatomy"
        description="A breadcrumb trail is a list of labels separated by chevrons. Every item links to a parent page except the last one, which represents the current page."
        divider={false}
      >
        <Card>
          <Breadcrumbs items={basicExample} linkComponent={PreviewLink} />
        </Card>
      </Section>

      <Section
        id="examples"
        title="Examples"
        description="Breadcrumb length adapts to how deep a page sits in the hierarchy."
      >
        <Card sx={{ display: "grid", gap: spacing.md }}>
          <Typography variant="h3" sx={{ mb: 0.5 }}>
            Two levels
          </Typography>
          <Breadcrumbs items={shortExample} linkComponent={PreviewLink} />
        </Card>
      </Section>

      <Section
        id="token-usage"
        title="Token usage"
        description="Breadcrumbs use the same secondary text, primary text and interaction tokens as the rest of the interface."
      >
        <CodeBlock>{`import { useSemanticColors } from "@ssw/ui-library";

const { secondaryText, primaryText, interaction } = useSemanticColors();

// Links use secondaryText, the current page uses primaryText,
// and hovered links switch to interaction.hoverContent.`}</CodeBlock>
      </Section>

      <Section
        id="code-examples"
        title="Code examples"
        description="Pass an ordered list of items. Omit href on the last item to mark it as the current page."
      >
        <CodeExample
          title="Customer invoice breadcrumb"
          preview={<Breadcrumbs items={basicExample} linkComponent={PreviewLink} />}
          code={`import Link from "next/link";
import { Breadcrumbs } from "@ssw/ui-library";

export function InvoicePage() {
  return (
    <Breadcrumbs
      linkComponent={Link}
      items={[
        { label: "Customers", href: "/customers" },
        { label: "Van Dijk Logistics", href: "/customers/van-dijk-logistics" },
        { label: "Invoices" },
      ]}
    />
  );
}`}
        />
      </Section>

      <Section
        id="guidelines"
        title="Guidelines"
        description="These rules keep breadcrumb trails predictable across Stream interfaces."
      >
        <GuidelineList items={guidelines} />
      </Section>

      <Section
        id="accessibility"
        title="Accessibility"
        description="Breadcrumbs must be usable with a screen reader and keyboard navigation."
        last
      >
        <Card>
          <Typography variant="h3" sx={{ mb: 1.5 }}>
            Announce structure and location
          </Typography>
          <Typography sx={{ color: secondaryText, lineHeight: 1.7 }}>
            The trail is wrapped in a nav element labelled &ldquo;Breadcrumb&rdquo; and
            rendered as an ordered list, so assistive technology can announce
            it as a landmark. The current page uses aria-current=&ldquo;page&rdquo;
            instead of relying on color alone.
          </Typography>
        </Card>
      </Section>
    </Page>
  );
}
