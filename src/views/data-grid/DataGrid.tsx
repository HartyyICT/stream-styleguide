"use client";

import { Box, Typography } from "@mui/material";
import {
  Card,
  DataGrid,
  InfoBanner,
  pageLayoutTokens,
  spacing,
  StatusChip,
  useSemanticColors,
  type DataGridColumn,
  type DataGridFilter,
  type DataGridSearch,
} from "@ssw/ui-library";
import {
  CodeBlock,
  CodeExample,
  GuidelineList,
  Intro,
  Section,
} from "@/app/components/documentation";
import Page from "@/app/components/layout/Page";

const sections = [
  { label: "Overview", href: "#data-grid" },
  { label: "Responsiveness", href: "#responsiveness" },
  { label: "Column order", href: "#column-order" },
  { label: "Simple filters", href: "#simple-filters" },
  { label: "Complex filters", href: "#complex-filters" },
  { label: "Combined example", href: "#combined-example" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

type CustomerStatus = "active" | "trial" | "churned";
type CustomerPlan = "starter" | "pro" | "enterprise";
type CustomerRegion = "Benelux" | "DACH" | "Nordics";

interface CustomerRow {
  id: string;
  name: string;
  status: CustomerStatus;
  plan: CustomerPlan;
  region: CustomerRegion;
  mrr: number;
}

const customers: CustomerRow[] = [
  {
    id: "1",
    name: "Van Dijk Logistics",
    status: "active",
    plan: "enterprise",
    region: "Benelux",
    mrr: 4200,
  },
  {
    id: "2",
    name: "Nova Retail",
    status: "trial",
    plan: "pro",
    region: "DACH",
    mrr: 890,
  },
  {
    id: "3",
    name: "Stream Support",
    status: "active",
    plan: "pro",
    region: "Benelux",
    mrr: 1260,
  },
  {
    id: "4",
    name: "Northwind Energy",
    status: "churned",
    plan: "starter",
    region: "Nordics",
    mrr: 0,
  },
  {
    id: "5",
    name: "Polder Data",
    status: "active",
    plan: "starter",
    region: "Benelux",
    mrr: 320,
  },
  {
    id: "6",
    name: "Harbor Transport",
    status: "trial",
    plan: "enterprise",
    region: "DACH",
    mrr: 0,
  },
  {
    id: "7",
    name: "Rhine Valley Group",
    status: "active",
    plan: "pro",
    region: "DACH",
    mrr: 1580,
  },
  {
    id: "8",
    name: "Green Delta",
    status: "churned",
    plan: "pro",
    region: "Nordics",
    mrr: 0,
  },
];

const statusLabel: Record<CustomerStatus, string> = {
  active: "Active",
  trial: "Trial",
  churned: "Churned",
};

const statusColor: Record<CustomerStatus, "info" | "primary" | "inherit"> = {
  active: "info",
  trial: "primary",
  churned: "inherit",
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
    minWidth: 220,
    render: (row) => row.name,
  },
  {
    key: "status",
    header: "Status",
    minWidth: 120,
    render: (row) => (
      <StatusChip
        status={statusLabel[row.status]}
        color={statusColor[row.status]}
      />
    ),
  },
  {
    key: "plan",
    header: "Plan",
    minWidth: 120,
    hideBelow: 620,
    render: (row) => planLabel[row.plan],
  },
  {
    key: "region",
    header: "Region",
    minWidth: 120,
    hideBelow: 760,
    render: (row) => row.region,
  },
  {
    key: "mrr",
    header: "MRR",
    align: "right",
    sortable: true,
    minWidth: 100,
    hideBelow: 480,
    render: (row) => currencyFormatter.format(row.mrr),
  },
];

const customerColumnOrder = ["status", "name", "plan", "mrr", "region"] as const;

const statusFilter: DataGridFilter<CustomerRow> = {
  key: "status",
  label: "Status",
  options: [
    { label: "Active", value: "active" },
    { label: "Trial", value: "trial" },
    { label: "Churned", value: "churned" },
  ],
  predicate: (row, value) => row.status === value,
};

const customerFilters: DataGridFilter<CustomerRow>[] = [
  statusFilter,
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
  {
    key: "region",
    label: "Region",
    options: [
      { label: "Benelux", value: "Benelux" },
      { label: "DACH", value: "DACH" },
      { label: "Nordics", value: "Nordics" },
    ],
    predicate: (row, value) => row.region === value,
  },
];

const customerSearch: DataGridSearch<CustomerRow> = {
  label: "Customer search",
  placeholder: "Search customer or region",
  predicate: (row, query) =>
    `${row.name} ${row.region}`.toLowerCase().includes(query.toLowerCase()),
};

const responsiveCode = `const columns: DataGridColumn<Customer>[] = [
  { key: "name", header: "Customer", minWidth: 220, render: (row) => row.name },
  { key: "status", header: "Status", minWidth: 120, render: renderStatus },
  { key: "plan", header: "Plan", minWidth: 120, hideBelow: 620, render: renderPlan },
  { key: "region", header: "Region", minWidth: 120, hideBelow: 760, render: renderRegion },
];`;

const columnOrderCode = `const columnOrder = ["status", "name", "plan", "mrr", "region"];

<DataGrid
  columns={columns}
  columnOrder={columnOrder}
  rows={customers}
  getRowKey={(row) => row.id}
/>`;

const simpleFilterCode = `const filters: DataGridFilter<Customer>[] = [
  {
    key: "status",
    label: "Status",
    options: statusOptions,
    predicate: (row, value) => row.status === value,
  },
];

<DataGrid columns={columns} filters={filters} rows={customers} getRowKey={getRowKey} />`;

const complexFilterCode = `const search: DataGridSearch<Customer> = {
  label: "Customer search",
  placeholder: "Search customer or region",
  predicate: (row, query) =>
    \`\${row.name} \${row.region}\`.toLowerCase().includes(query.toLowerCase()),
};

const filters = [statusFilter, planFilter, regionFilter];

<DataGrid
  columns={columns}
  search={search}
  filters={filters}
  rows={customers}
  getRowKey={(row) => row.id}
/>`;

const combinedUsageCode = `import { DataGrid } from "@ssw/ui-library";

<DataGrid
  columns={customerColumns}
  columnOrder={["status", "name", "plan", "mrr", "region"]}
  search={customerSearch}
  filters={customerFilters}
  rows={customers}
  getRowKey={(row) => row.id}
  defaultSort={{ key: "mrr", direction: "desc" }}
/>`;

const guidelines = [
  "Measure the grid container, not the viewport. Side navigation and detail panels can reduce the available width without changing the viewport breakpoint.",
  "Keep the primary identifier and essential status visible; give optional columns a hideBelow threshold and remove the least useful information first.",
  "Configure column order around the user's task. Put the fields used to identify and decide before supporting metadata.",
  "Use a simple filter for one common question. Use complex filters only when users regularly combine several criteria.",
  "Keep applied complex filters visible as removable chips, even when the filter controls are elsewhere or collapsed.",
  "For server-paginated datasets, apply search and filters in the API query and reuse the same visible filter-summary pattern.",
] as const;

const accessibilityGuidelines = [
  "The grid uses native table, thead and tbody elements, so assistive technology receives the correct structure.",
  "Sortable headers remain keyboard-operable and expose the active sort direction.",
  "Search and select controls have visible or programmatic labels, and active filter chips can be removed with the keyboard.",
  "Do not hide the only path to important data. Responsive columns should contain supporting information that is also available in a row detail view.",
] as const;

export default function DataGridPage() {
  const { secondaryText } = useSemanticColors();

  return (
    <Page pageId="data-grid" sections={sections} maxWidth={pageLayoutTokens.dataContentMaxWidth}>
      <Intro
        title="DataGrid"
        description="DataGrid presents operational datasets with responsive columns, deliberate column ordering, sorting, and simple or combined filters. The configuration stays close to the column and filter definitions so every screen can prioritize the information its users need."
        note="Configure column priority, ordering and filters around the task users need to complete. Keep server queries and persisted user preferences in the application while the DataGrid owns their consistent presentation and interaction."
      />

      <Section
        id="responsiveness"
        title="Responsiveness"
        description="Use hideBelow for supporting columns that should disappear when the DataGrid itself becomes too narrow. Columns without hideBelow remain visible; horizontal scrolling is the final fallback."
        divider={false}
      >
        <CodeBlock>{responsiveCode}</CodeBlock>
      </Section>

      <Section
        id="column-order"
        title="Column order"
        description="The columns array is the default order. Pass columnOrder when a screen needs a different task-focused order without duplicating its render definitions. Unknown keys are ignored and unlisted columns stay in their original order at the end."
      >
        <CodeBlock>{columnOrderCode}</CodeBlock>
      </Section>

      <Section
        id="simple-filters"
        title="Simple filters"
        description="A simple filter answers one frequent question, such as showing customers by status. Keep the control immediately understandable and avoid opening a separate advanced panel for a single criterion."
      >
        <Box sx={{ display: "grid", gap: spacing.lg }}>
          <CodeBlock>{simpleFilterCode}</CodeBlock>
          <DataGrid
            columns={customerColumns}
            filters={[statusFilter]}
            rows={customers.slice(0, 5)}
            getRowKey={(row) => row.id}
          />
        </Box>
      </Section>

      <Section
        id="complex-filters"
        title="Complex filters"
        description="Combine search with multiple fixed criteria when users need to narrow data from several directions. Criteria use AND logic, and every applied value remains visible in the summary with an individual remove action and one Reset all action."
      >
        <CodeBlock>{complexFilterCode}</CodeBlock>
      </Section>

      <Section
        id="combined-example"
        title="Combined example"
        description="This example combines responsive priority, configured column order, search, fixed filters and sorting. Resize the page to see Region, Plan and MRR leave in priority order."
      >
        <CodeExample
          title="Responsive, ordered and filterable grid"
          code={combinedUsageCode}
          preview={
            <DataGrid
              columns={customerColumns}
              columnOrder={customerColumnOrder}
              search={customerSearch}
              filters={customerFilters}
              rows={customers}
              getRowKey={(row) => row.id}
              defaultSort={{ key: "mrr", direction: "desc" }}
            />
          }
        />
      </Section>

      <Section
        id="guidelines"
        title="Guidelines"
        description="These rules keep data-heavy screens predictable as their available space and filter complexity change."
      >
        <GuidelineList items={guidelines} />
      </Section>

      <Section
        id="accessibility"
        title="Accessibility"
        description="Responsive behavior and richer filtering should preserve the table's meaning and keep every active state understandable."
        last
      >
        <Card>
          <Typography variant="h3" sx={{ mb: 1.5 }}>
            Preserve meaning at every width
          </Typography>
          <Typography sx={{ color: secondaryText, lineHeight: 1.7, mb: 2.5 }}>
            Hiding a supporting column is safe only when the essential row context remains visible
            and the complete record can still be opened elsewhere.
          </Typography>
          <GuidelineList items={accessibilityGuidelines} />
        </Card>

        <InfoBanner title="Client-side scope" sx={{ mt: spacing.md }}>
          This component filters the rows passed to it. Large or server-paginated datasets should
          keep filter state in the screen, request filtered data from the API, and retain the same
          applied-filter summary.
        </InfoBanner>
      </Section>
    </Page>
  );
}
