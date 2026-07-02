"use client";

import { Box, Typography } from "@mui/material";
import {
  ArrowUpDown,
  CheckCircle2,
  Columns3,
  ListFilter,
  MoreHorizontal,
  Table2,
} from "lucide-react";
import { Badge } from "@ssw/ui-library";
import { Button } from "@ssw/ui-library";
import { Divider } from "@ssw/ui-library";
import { Kbd } from "@ssw/ui-library";
import { Surface } from "@ssw/ui-library";
import { Text } from "@ssw/ui-library";
import { TokenCode } from "@ssw/ui-library";
import { Card } from "@ssw/ui-library";
import { CardTitle } from "@ssw/ui-library";
import { IconBox } from "@ssw/ui-library";
import AnatomyItem from "@/app/components/molecules/AnatomyItem";
import ButtonGroupExample from "@/app/components/molecules/ButtonGroupExample";
import ExampleCard from "@/app/components/molecules/ExampleCard";
import StateCard from "@/app/components/molecules/StateCard";
import TokenTable from "@/app/components/molecules/TokenTable";
import DataTable, { type DataTableColumn } from "@/app/components/organisms/DataTable";
import CodeExample from "@/app/components/patterns/CodeExample";
import GuidelineList from "@/app/components/patterns/GuidelineList";
import Intro from "@/app/components/layout/Intro";
import Page from "@/app/components/layout/Page";
import Section from "@/app/components/layout/Section";
import { useSemanticColors } from "@ssw/ui-library";
import {
  iconSizes,
  pageLayoutTokens,
  responsiveGrids,
  spacing,
  tableTokens,
} from "@ssw/ui-library";

const sections = [
  { label: "Overview", href: "#tables" },
  { label: "Anatomy", href: "#anatomy" },
  { label: "Density", href: "#density" },
  { label: "Columns", href: "#columns" },
  { label: "States", href: "#states" },
  { label: "Examples", href: "#examples" },
  { label: "Code examples", href: "#code-examples" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const densityRows = Object.entries(tableTokens.density).map(([token, value]) => ({
  token: `table.density.${token}`,
  columns: [
    { value: value.rowHeight, code: true },
    { value: value.cellPadding, code: true },
    { value: value.use },
  ],
}));

const columnRows = Object.entries(tableTokens.columns).map(([token, value]) => ({
  token: `table.columns.${token}`,
  columns: [
    { value: value.minWidth, code: true },
    { value: value.alignment },
  ],
}));

const guidelines = [
  "Use tables for structured data that benefits from scanning, sorting or comparing values.",
  "Keep column labels short and descriptive.",
  "Align values by column role and keep header and cell alignment consistent.",
  "Use comfortable density as the default for enterprise workflows.",
  "Avoid hiding important actions behind icon-only controls without labels or tooltips.",
  "Use horizontal scrolling inside the table container when columns cannot safely collapse.",
] as const;

const tableExampleCode = `import { Button } from "@ssw/ui-library";
import { Badge } from "@ssw/ui-library";
import { tableTokens } from "@ssw/ui-library";
import { MoreHorizontal } from "lucide-react";

export function CustomerTable() {
  const density = tableTokens.density.comfortable;
  const rows = [
    { customer: "Van Dijk Logistics", status: "Active", amount: "EUR 2.450" },
    { customer: "Nova Retail", status: "Review", amount: "EUR 980" },
    { customer: "Stream Support", status: "Active", amount: "EUR 1.260" },
  ];
  // Change the density token to test row spacing.
  // Examples: tableTokens.density.compact, tableTokens.density.comfortable, tableTokens.density.spacious.
  // Change customer, status or amount values to update the preview.

  return (
    <table>
      <thead>
        <tr>
          <th>Customer</th>
          <th>Status</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.customer} style={{ height: density.rowHeight }}>
            <td style={{ padding: density.cellPadding }}>{row.customer}</td>
            <td style={{ padding: density.cellPadding, textAlign: "left" }}>
              <Badge tone={row.status === "Active" ? "accent" : "neutral"}>
                {row.status}
              </Badge>
            </td>
            <td style={{ padding: density.cellPadding, textAlign: "left" }}>
              {row.amount}
            </td>
            <td style={{ padding: density.cellPadding, textAlign: "right" }}>
              <Button variant="icon" iconOnly aria-label="Open row actions">
                <MoreHorizontal />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}`;

function getDensityFromCode(code: string) {
  const densityMatch = code.match(/tableTokens\.density\.(compact|comfortable|spacious)/);
  return densityMatch?.[1] as keyof typeof tableTokens.density | undefined;
}

type TablePreviewRow = {
  customer: string;
  status: string;
  amount: string;
};

const defaultPreviewRows: TablePreviewRow[] = [
  { customer: "Van Dijk Logistics", status: "Active", amount: "EUR 2.450" },
  { customer: "Nova Retail", status: "Review", amount: "EUR 980" },
  { customer: "Stream Support", status: "Active", amount: "EUR 1.260" },
];

function getTableRowsFromCode(code: string): TablePreviewRow[] {
  const rowMatches = [
    ...code.matchAll(
      /\{\s*customer:\s*["']([^"']+)["'],\s*status:\s*["']([^"']+)["'],\s*amount:\s*["']([^"']+)["']\s*\}/g,
    ),
  ];

  if (rowMatches.length === 0) {
    return defaultPreviewRows;
  }

  return rowMatches.map((match) => ({
    customer: match[1],
    status: match[2],
    amount: match[3],
  }));
}

function TablePreview({ code }: { code: string }) {
  const density = getDensityFromCode(code) ?? "comfortable";
  const densityToken = tableTokens.density[density];
  const rows = getTableRowsFromCode(code);
  const columns: DataTableColumn<TablePreviewRow>[] = [
    {
      key: "customer",
      header: "Customer",
      render: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {row.customer}
        </Typography>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Badge tone={row.status === "Active" ? "accent" : "neutral"} sx={{ mx: 0 }}>
          {row.status}
        </Badge>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (row) => row.amount,
    },
    {
      key: "action",
      header: "Action",
      align: "right",
      render: () => (
        <Button variant="icon" iconOnly size="sm" aria-label="Open row actions">
          <MoreHorizontal />
        </Button>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        rows={rows}
        getRowKey={(row) => `${row.customer}-${row.status}-${row.amount}`}
        rowHeight={densityToken.rowHeight}
        cellPadding={densityToken.cellPadding}
      />
      <Text tone="accent" variant="caption" sx={{ display: "block", mt: spacing.sm }}>
        Current density: tableTokens.density.{density}
      </Text>
    </>
  );
}

export default function TablesPage() {
  const { subtleBackground, accent } = useSemanticColors();

  return (
    <Page pageId="tables" sections={sections} maxWidth={pageLayoutTokens.wideContentMaxWidth}>
      <Intro
        title="Tables"
        description="Tables organise structured information so users can compare rows, scan values and take action without losing context."
        note="Use tables for data-heavy enterprise workflows. If the content is mostly visual or descriptive, use cards instead."
      />

      <Section
        id="anatomy"
        title="Anatomy"
        description="A table consists of headers, rows, cells, density, optional status indicators and row-level actions."
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
          <AnatomyItem
            label="Header"
            description="Explains the meaning of each column and supports scanning."
            token="table.header"
            icon={<Columns3 size={iconSizes.medium} color={accent} />}
          />
          <AnatomyItem
            label="Rows"
            description="Represent one item, record or object per horizontal line."
            token="table.row"
            icon={<Table2 size={iconSizes.medium} color={accent} />}
          />
          <AnatomyItem
            label="Actions"
            description="Place row actions at the end so users can act after reading the data."
            token="table.action"
            icon={<MoreHorizontal size={iconSizes.medium} color={accent} />}
          />
        </Box>
      </Section>

      <Section
        id="density"
        title="Density"
        description="Density controls row height and cell padding. Comfortable is the default for Stream Software."
      >
        <TokenTable
          headers={["Token", "Row height", "Cell padding", "Use"]}
          rows={densityRows}
          columnsTemplate="1.2fr 0.8fr 1.1fr 1.6fr"
        />
      </Section>

      <Section
        id="columns"
        title="Columns"
        description="Column roles keep alignment and minimum widths predictable across data tables."
      >
        <TokenTable
          headers={["Token", "Minimum width", "Alignment"]}
          rows={columnRows}
          columnsTemplate="1.2fr 1fr 1fr"
        />
      </Section>

      <Section
        id="states"
        title="States"
        description="Tables use the same interaction language as the rest of the design system."
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
          <StateCard
            title="Default"
            description="Rows rest on a clean surface with subtle separators."
          />
          <StateCard
            title="Hover"
            description="Hover confirms the row or action is interactive."
            state="hover"
          />
          <StateCard
            title="Focus"
            description="Keyboard focus must be visible on controls and rows."
            state="focus"
          />
        </Box>
      </Section>

      <Section
        id="examples"
        title="Examples"
        description="Use table patterns that match the task: scanning, filtering, comparing or taking row actions."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: spacing.md,
          }}
        >
          <ExampleCard
            title="Sortable table"
            description="Sort icons should support the label instead of replacing it."
          >
            <ButtonGroupExample>
              <Button variant="secondary" startIcon={<ArrowUpDown />}>Sort by date</Button>
              <Kbd>Shift</Kbd>
            </ButtonGroupExample>
          </ExampleCard>
          <ExampleCard
            title="Filterable table"
            description="Filters belong near the table and should be easy to clear."
          >
            <ButtonGroupExample>
              <Button variant="secondary" startIcon={<ListFilter />}>Filter</Button>
              <Badge tone="accent">3 active</Badge>
            </ButtonGroupExample>
          </ExampleCard>
        </Box>

        <Card sx={{ mt: spacing.md, p: 0, overflow: "hidden" }}>
          <Box sx={{ p: spacing.md, backgroundColor: subtleBackground }}>
            <CardTitle>Customer table preview</CardTitle>
            <Text tone="secondary" variant="body2">
              A compact preview using Stream table density, badges and row actions.
            </Text>
          </Box>
          <Divider />
          <TablePreview code="tableTokens.density.comfortable" />
        </Card>
      </Section>

      <Section
        id="code-examples"
        title="Code examples"
        description="Change the density token in the code to see the table preview update."
      >
        <CodeExample
          title="Data table density"
          preview={<TablePreview code={tableExampleCode} />}
          renderPreview={(code) => <TablePreview code={code} />}
          code={tableExampleCode}
        />
      </Section>

      <Section
        id="guidelines"
        title="Guidelines"
        description="Tables should make data easier to compare, not harder to parse."
      >
        <GuidelineList items={guidelines} />
      </Section>

      <Section
        id="accessibility"
        title="Accessibility"
        description="Tables need meaningful headers, visible focus states and predictable keyboard access."
        last
      >
        <Surface elevated>
          <Box sx={{ display: "flex", gap: spacing.md, alignItems: "flex-start" }}>
            <IconBox>
              <CheckCircle2 size={iconSizes.medium} aria-hidden="true" />
            </IconBox>
            <Box>
              <CardTitle sx={{ mb: spacing.xs }}>Keep table structure semantic</CardTitle>
              <Text tone="secondary" variant="body2">
                Use real table elements for data tables, keep headers connected to cells and
                ensure icon-only actions have accessible labels.
              </Text>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: spacing.sm, mt: spacing.md }}>
                <TokenCode>{"<table>"}</TokenCode>
                <TokenCode>{"<th>"}</TokenCode>
                <TokenCode>{"aria-label"}</TokenCode>
              </Box>
            </Box>
          </Box>
        </Surface>
      </Section>
    </Page>
  );
}
