"use client";

import { Box, Typography } from "@mui/material";
import {
  Badge,
  Card,
  CodeBlock,
  DataGrid,
  GuidelineList,
  InfoBanner,
  Intro,
  useSemanticColors,
  type DataGridColumn,
  type DataGridFilter,
} from "@ssw/ui-library";
import CodeExample from "@/app/components/patterns/CodeExample";
import Page from "@/app/components/layout/Page";
import { Section } from "@ssw/ui-library";
import { pageLayoutTokens, spacing } from "@ssw/ui-library";

const sections = [
  { label: "Overview", href: "#data-grid" },
  { label: "Columns & sorting", href: "#columns-sorting" },
  { label: "Filters", href: "#filters" },
  { label: "Example", href: "#example" },
  { label: "Code examples", href: "#code-examples" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

type CustomerStatus = "active" | "trial" | "churned";
type CustomerPlan = "starter" | "pro" | "enterprise";

interface CustomerRow {
  id: string;
  name: string;
  status: CustomerStatus;
  plan: CustomerPlan;
  mrr: number;
}

const customers: CustomerRow[] = [
  { id: "1", name: "Van Dijk Logistics", status: "active", plan: "enterprise", mrr: 4200 },
  { id: "2", name: "Nova Retail", status: "trial", plan: "pro", mrr: 890 },
  { id: "3", name: "Stream Support", status: "active", plan: "pro", mrr: 1260 },
  { id: "4", name: "Northwind Energy", status: "churned", plan: "starter", mrr: 0 },
  { id: "5", name: "Polder Data", status: "active", plan: "starter", mrr: 320 },
  { id: "6", name: "Harbor Transport", status: "trial", plan: "enterprise", mrr: 0 },
  { id: "7", name: "Rhine Valley Group", status: "active", plan: "pro", mrr: 1580 },
  { id: "8", name: "Green Delta", status: "churned", plan: "pro", mrr: 0 },
];

const statusLabel: Record<CustomerStatus, string> = {
  active: "Active",
  trial: "Trial",
  churned: "Churned",
};

const statusTone: Record<CustomerStatus, "success" | "warning" | "error"> = {
  active: "success",
  trial: "warning",
  churned: "error",
};

const planLabel: Record<CustomerPlan, string> = {
  starter: "Starter",
  pro: "Pro",
  enterprise: "Enterprise",
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const customerColumns: DataGridColumn<CustomerRow>[] = [
  {
    key: "name",
    header: "Customer",
    sortable: true,
    render: (row) => row.name,
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <Badge tone={statusTone[row.status]}>{statusLabel[row.status]}</Badge>,
  },
  {
    key: "plan",
    header: "Plan",
    render: (row) => planLabel[row.plan],
  },
  {
    key: "mrr",
    header: "MRR",
    align: "right",
    sortable: true,
    render: (row) => currencyFormatter.format(row.mrr),
  },
];

const customerFilters: DataGridFilter<CustomerRow>[] = [
  {
    key: "status",
    label: "Status",
    options: [
      { label: "Active", value: "active" },
      { label: "Trial", value: "trial" },
      { label: "Churned", value: "churned" },
    ],
    predicate: (row, value) => row.status === value,
  },
  {
    key: "plan",
    label: "Plan",
    options: [
      { label: "Starter", value: "starter" },
      { label: "Pro", value: "pro" },
      { label: "Enterprise", value: "enterprise" },
    ],
    predicate: (row, value) => row.plan === value,
  },
];

const columnCode = `const columns: DataGridColumn<CustomerRow>[] = [
  { key: "name", header: "Customer", sortable: true, render: (row) => row.name },
  { key: "status", header: "Status", render: (row) => <Badge tone={...}>{row.status}</Badge> },
  { key: "mrr", header: "MRR", align: "right", sortable: true, render: (row) => format(row.mrr) },
];`;

const filterCode = `const filters: DataGridFilter<CustomerRow>[] = [
  {
    key: "status",
    label: "Status",
    options: [
      { label: "Active", value: "active" },
      { label: "Trial", value: "trial" },
      { label: "Churned", value: "churned" },
    ],
    predicate: (row, value) => row.status === value,
  },
];`;

const usageCode = `import { DataGrid } from "@ssw/ui-library";

<DataGrid
  columns={columns}
  filters={filters}
  rows={customers}
  getRowKey={(row) => row.id}
  defaultSort={{ key: "mrr", direction: "desc" }}
/>`;

const guidelines = [
  "Keep the number of fixed filters small — pick only the fields users actually want to narrow down by.",
  "Only mark a column as sortable when its order carries real meaning.",
  "Right-align numeric columns and left-align text columns.",
  "Always show a clear empty state when a filter combination returns no results.",
  "Use short, scannable column headers instead of full sentences.",
] as const;

const accessibilityGuidelines = [
  "The grid uses native table/thead/tbody elements, so screen readers recognize the structure automatically.",
  "Sortable column headers are keyboard-operable and announce the current sort direction.",
  "Filters are plain Select elements — fully keyboard- and screen-reader-accessible without extra work.",
  "Give every filter a clear, unique label so its purpose stays obvious with screen-reader navigation.",
] as const;

export default function DataGridPage() {
  const { secondaryText } = useSemanticColors();

  return (
    <Page pageId="data-grid" sections={sections} maxWidth={pageLayoutTokens.dataContentMaxWidth}>
      <Intro
        title="DataGrid"
        description="DataGrid displays datasets with fixed, developer-defined columns and filters. End users can sort columns and use the fixed filters to narrow down rows — the set of columns and filters itself stays fixed."
        note="DataGrid is built on the standard MUI table primitives and fully styled through the shared theme, just like Button, Input and Select."
      />

      <Section
        id="columns-sorting"
        title="Columns & sorting"
        description="Columns are fixed via the columns prop. Each column decides how its cell renders and whether it's sortable."
        divider={false}
      >
        <CodeBlock>{columnCode}</CodeBlock>
      </Section>

      <Section
        id="filters"
        title="Filters"
        description="Filters are fixed as well: each filter has a label, a fixed list of options and a predicate function that decides which rows stay visible."
      >
        <CodeBlock>{filterCode}</CodeBlock>
      </Section>

      <Section
        id="example"
        title="Example"
        description="Click a sortable column header to toggle its direction, or use the filters to narrow down the list."
      >
        <DataGrid
          columns={customerColumns}
          filters={customerFilters}
          rows={customers}
          getRowKey={(row) => row.id}
          defaultSort={{ key: "mrr", direction: "desc" }}
        />
      </Section>

      <Section
        id="code-examples"
        title="Code examples"
        description="Use DataGrid by passing columns, filters and rows."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: 2,
          }}
        >
          <CodeExample
            title="Sortable, filterable grid"
            code={usageCode}
            preview={
              <DataGrid
                columns={customerColumns}
                filters={customerFilters}
                rows={customers.slice(0, 4)}
                getRowKey={(row) => row.id}
                defaultSort={{ key: "name", direction: "asc" }}
              />
            }
            previewMinHeight={260}
          />
        </Box>
      </Section>

      <Section
        id="guidelines"
        title="Guidelines"
        description="These guidelines keep fixed filters and columns predictable in data-heavy screens."
      >
        <GuidelineList items={guidelines} />
      </Section>

      <Section
        id="accessibility"
        title="Accessibility"
        description="DataGrid stays usable with keyboard and screen readers without extra configuration."
        last
      >
        <Card>
          <Typography variant="h3" sx={{ mb: 1.5 }}>
            Semantic table structure
          </Typography>
          <Typography sx={{ color: secondaryText, lineHeight: 1.7, mb: 2.5 }}>
            Because DataGrid builds on the standard MUI table primitives, every grid gets the
            right ARIA roles and keyboard support automatically.
          </Typography>
          <GuidelineList items={accessibilityGuidelines} />
        </Card>

        <InfoBanner title="Empty state" sx={{ mt: spacing.md }}>
          Always show a recognizable message when a filter combination returns no rows, instead
          of rendering an empty table with no explanation.
        </InfoBanner>
      </Section>
    </Page>
  );
}
