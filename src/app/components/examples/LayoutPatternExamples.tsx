"use client";

import { Box, Typography } from "@mui/material";
import { useState } from "react";
import {
  Badge,
  BusinessUnitBanner,
  Button,
  Card,
  CardColumns,
  MinimumWidthNotice,
  PageLayout,
  PageStateWrapper,
  Surface,
  borderWidths,
  radius,
  spacing,
  useSemanticColors,
  type BusinessUnitOption,
} from "@ssw/design-system";

const businessUnits: BusinessUnitOption[] = [
  { id: "nl", name: "Stream Netherlands", code: "NL01" },
  { id: "de", name: "Stream Germany", code: "DE01" },
  { id: "be", name: "Stream Belgium", code: "BE01" },
];

export function BusinessUnitBannerExample() {
  const { borders, surface } = useSemanticColors();
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState<BusinessUnitOption | null>(
    businessUnits[0],
  );

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: surface,
        border: `${borderWidths.default} solid ${borders.default}`,
        borderRadius: radius.large,
      }}
    >
      {selectedBusinessUnit ? (
        <BusinessUnitBanner
          businessUnit={selectedBusinessUnit}
          availableBusinessUnits={businessUnits}
          onSelect={setSelectedBusinessUnit}
          onClear={() => setSelectedBusinessUnit(null)}
        />
      ) : (
        <Box sx={{ px: spacing.xl, py: spacing.sm }}>
          <Button size="sm" variant="secondary" onClick={() => setSelectedBusinessUnit(businessUnits[0])}>
            Select business unit
          </Button>
        </Box>
      )}
      <Box sx={{ p: spacing.xl }}>
        <Typography variant="body2">
          The current workspace remains visible without becoming part of the page title.
        </Typography>
      </Box>
    </Box>
  );
}

export function ProductPageLayoutExample() {
  return (
    <PageLayout
      title="Declarations"
      titleComponent="h3"
      contentComponent="div"
      description="Review, filter and manage customs declarations."
      breadcrumbs={[
        { label: "Home", href: "#page-layout" },
        { label: "Declarations" },
      ]}
      titleAdornment={<Badge tone="success">Live</Badge>}
      actions={<Button size="sm">New declaration</Button>}
      contextBanner={
        <BusinessUnitBanner businessUnit={businessUnits[0]} availableBusinessUnits={businessUnits} />
      }
      sx={{ minHeight: 380 }}
    >
      <CardColumns>
        <Card title="Open declarations">
          <Typography variant="h4">24</Typography>
        </Card>
        <Card title="Awaiting review">
          <Typography variant="h4">7</Typography>
        </Card>
        <Card title="Completed today">
          <Typography variant="h4">18</Typography>
        </Card>
        <Card title="Requires attention" severity="warning">
          <Typography variant="body2">Three declarations are missing documents.</Typography>
        </Card>
      </CardColumns>
    </PageLayout>
  );
}

export function CardColumnsExample() {
  return (
    <CardColumns>
      <Card title="Shipment">
        <Typography variant="body2">Reference, route and transport details.</Typography>
      </Card>
      <Card title="Customs status">
        <Typography variant="body2">
          Current procedure, declaration state and the most recent customs response.
        </Typography>
      </Card>
      <Card title="Parties">
        <Typography variant="body2">
          Declarant, importer, exporter, representative and their identifiers.
        </Typography>
      </Card>
      <Card title="Documents">
        <Typography variant="body2">Attached certificates and supporting files.</Typography>
      </Card>
    </CardColumns>
  );
}

type DemoState = "content" | "loading" | "error" | "forbidden";

export function PageStateWrapperExample() {
  const [demoState, setDemoState] = useState<DemoState>("content");
  const [instance, setInstance] = useState(0);

  function showInitialState(state: DemoState) {
    setDemoState(state);
    setInstance((value) => value + 1);
  }

  return (
    <Box sx={{ width: "100%", display: "grid", gap: spacing.md }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: spacing.sm }}>
        <Button size="sm" variant="secondary" onClick={() => showInitialState("content")}>
          Content
        </Button>
        <Button size="sm" variant="secondary" onClick={() => showInitialState("loading")}>
          Initial loading
        </Button>
        <Button size="sm" variant="secondary" onClick={() => showInitialState("error")}>
          Initial error
        </Button>
        <Button size="sm" variant="secondary" onClick={() => showInitialState("forbidden")}>
          Forbidden
        </Button>
        <Button size="sm" variant="tertiary" onClick={() => setDemoState("loading")}>
          Refetch
        </Button>
      </Box>
      <Surface sx={{ minHeight: 280, p: 0, overflow: "hidden" }}>
        <PageStateWrapper
          key={instance}
          isLoading={demoState === "loading"}
          isError={demoState === "error"}
          isForbidden={demoState === "forbidden"}
        >
          <Box sx={{ p: spacing.lg, display: "grid", gap: spacing.sm }}>
            <Typography variant="h4">Declaration overview</Typography>
            <Typography variant="body2">
              Once this content has rendered, a refetch keeps it mounted so local filters, tabs
              and expanded rows retain their state.
            </Typography>
          </Box>
        </PageStateWrapper>
      </Surface>
    </Box>
  );
}

export function MinimumWidthNoticeExample() {
  return (
    <MinimumWidthNotice
      inline
      minimumWidth={1024}
      title="This workspace needs a wider screen"
      description="Open the application on a laptop or desktop, or widen the browser window."
      sx={{ width: "100%", borderRadius: radius.medium }}
    />
  );
}
