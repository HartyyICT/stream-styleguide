"use client";

import { Box } from "@mui/material";
import { FileSearch, Inbox } from "lucide-react";
import { useState } from "react";
import {
  Alert,
  Button,
  EmptyState,
  Loading,
  ResultState,
  StatusChip,
  Surface,
  spacing,
} from "@ssw/ui-library";

export function AlertExamples() {
  return (
    <Box sx={{ width: "100%", display: "grid", gap: spacing.md }}>
      <Alert severity="info" title="Information" text="The declaration will be checked after saving." />
      <Alert severity="success" title="Saved" text="The latest changes are available to your team." />
      <Alert severity="warning" title="Attention required" text="Three fields still need supporting documents." />
      <Alert severity="error" title="Submission failed" text="Resolve the validation errors and submit again." />
    </Box>
  );
}

export function DismissibleAlertExample() {
  const [instance, setInstance] = useState(0);

  return (
    <Box sx={{ width: "100%", display: "grid", gap: spacing.md }}>
      <Alert
        key={instance}
        severity="info"
        title="New customs response"
        text="A newer response is available for this declaration."
        dismissible
      />
      <Button size="sm" variant="secondary" onClick={() => setInstance((value) => value + 1)} sx={{ justifySelf: "start" }}>
        Show again
      </Button>
    </Box>
  );
}

export function StatusChipExamples() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: spacing.sm }}>
      <StatusChip status="Pending" color="info" />
      <StatusChip status="Active" color="info" />
      <StatusChip status="Ready to submit" color="primary" />
      <StatusChip status="Completed" color="success" />
      <StatusChip status="Needs attention" color="warning" />
      <StatusChip status="Rejected" color="error" />
    </Box>
  );
}

export function LoadingExamples() {
  return (
    <Box sx={{ width: "100%", display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, gap: spacing.md }}>
      <Surface sx={{ minHeight: 180, display: "flex", alignItems: "center" }}>
        <Loading />
      </Surface>
      <Surface sx={{ minHeight: 180, display: "flex", alignItems: "center" }}>
        <Loading size={32} label="Loading declarations" />
      </Surface>
    </Box>
  );
}

export function EmptyStateExamples() {
  return (
    <Box sx={{ width: "100%", display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, gap: spacing.md }}>
      <EmptyState
        icon={Inbox}
        title="No declarations yet"
        message="Create the first declaration for this business unit."
        actionLabel="New declaration"
        onAction={() => undefined}
        minHeight={280}
      />
      <EmptyState
        icon={FileSearch}
        title="No matching results"
        message="Adjust the search query or remove one or more filters."
        actionLabel="Reset filters"
        onAction={() => undefined}
        minHeight={280}
      />
    </Box>
  );
}

type ResultExample = "forbidden" | "not-found" | "error" | "success";

export function ResultStateExample() {
  const [example, setExample] = useState<ResultExample>("forbidden");
  const result = {
    forbidden: {
      code: 403,
      tone: "warning" as const,
      title: "Access denied",
      message: "You do not have permission to view this page.",
    },
    "not-found": {
      code: 404,
      tone: "neutral" as const,
      title: "Page not found",
      message: "The requested page does not exist or has been moved.",
    },
    error: {
      code: 500,
      tone: "error" as const,
      title: "Something went wrong",
      message: "The page could not be loaded. Try again later.",
    },
    success: {
      tone: "success" as const,
      title: "Declaration submitted",
      message: "The declaration was successfully sent for processing.",
    },
  }[example];

  return (
    <Box sx={{ width: "100%", display: "grid", gap: spacing.md }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: spacing.sm }}>
        <Button size="sm" variant="secondary" onClick={() => setExample("forbidden")}>403</Button>
        <Button size="sm" variant="secondary" onClick={() => setExample("not-found")}>404</Button>
        <Button size="sm" variant="secondary" onClick={() => setExample("error")}>500</Button>
        <Button size="sm" variant="secondary" onClick={() => setExample("success")}>Success</Button>
      </Box>
      <Surface sx={{ p: 0 }}>
        <ResultState
          {...result}
          minHeight={360}
          primaryAction={{ label: example === "error" ? "Try again" : "Back to dashboard" }}
        />
      </Surface>
    </Box>
  );
}
