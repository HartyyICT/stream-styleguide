"use client";

import { Box, Typography } from "@mui/material";
import { Card, pageLayoutTokens, spacing, useSemanticColors } from "@ssw/ui-library";
import {
  CodeExample,
  GuidelineList,
  Intro,
  Section,
} from "@/app/components/documentation";
import {
  AlertExamples,
  DismissibleAlertExample,
  EmptyStateExamples,
  LoadingExamples,
  ResultStateExample,
  StatusChipExamples,
} from "@/app/components/examples";
import Page from "@/app/components/layout/Page";

const sections = [
  { label: "Overview", href: "#feedback" },
  { label: "Alerts", href: "#alerts" },
  { label: "Status chips", href: "#status-chips" },
  { label: "Loading", href: "#loading" },
  { label: "Empty states", href: "#empty-states" },
  { label: "Result states", href: "#result-states" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const alertCode = `import { Alert } from "@ssw/ui-library";

<Alert
  severity="warning"
  title="Attention required"
  text="Three fields still need supporting documents."
/>`;

const dismissibleAlertCode = `<Alert
  severity="info"
  title="New customs response"
  text="A newer response is available for this declaration."
  dismissible
  onClose={handleClose}
/>`;

const statusCode = `<StatusChip status="Pending" color="info" />
<StatusChip status="Active" color="info" />
<StatusChip status="Ready to submit" color="primary" />
<StatusChip status="Completed" color="success" />
<StatusChip status="Needs attention" color="warning" />
<StatusChip status="Rejected" color="error" />`;

const loadingCode = `<Loading />
<Loading size={32} label="Loading declarations" />`;

const emptyStateCode = `<EmptyState
  icon={FileSearch}
  title="No matching results"
  message="Adjust the search query or remove one or more filters."
  actionLabel="Reset filters"
  onAction={resetFilters}
/>`;

const resultStateCode = `<ResultState
  code={403}
  tone="warning"
  title="Access denied"
  message="You do not have permission to view this page."
  primaryAction={{ label: "Back to dashboard", href: "/" }}
/>`;

const guidelines = [
  "Use Alert for feedback that belongs to the current task or content area.",
  "Use StatusChip for compact persistent state, not for a temporary notification.",
  "Use info or primary during normal processing and reserve success, warning and error for completed or exceptional outcomes.",
  "Show Loading during the first request; retain existing content during background refetches.",
  "Choose a specific empty-state message that explains why nothing is shown and what the user can do next.",
  "Use ResultState when the entire page or workflow cannot continue.",
  "Keep application telemetry, retry logic and navigation outside the visual feedback component.",
] as const;

const accessibilityGuidelines = [
  "Alerts expose role alert and should contain concise, actionable language.",
  "Loading indicators announce their label through a polite live region.",
  "Never communicate a status through colour alone; pair colour with text and an icon or marker.",
  "Dismiss controls need an accessible name and must remain keyboard-operable.",
  "Move focus only when a result state replaces the complete workflow and immediate attention is required.",
] as const;

export default function FeedbackPage() {
  const { secondaryText } = useSemanticColors();

  return (
    <Page pageId="feedback" sections={sections} maxWidth={pageLayoutTokens.dataContentMaxWidth}>
      <Intro
        title="Feedback & states"
        description="Feedback components explain what happened, what is currently happening and what users can do next. They cover contextual alerts, compact statuses, loading, empty content and complete-page results."
        note="Choose feedback by scope: use a StatusChip for persistent record state, an Alert for contextual feedback and a ResultState when the complete workflow cannot continue."
      />

      <Section
        id="alerts"
        title="Alerts"
        description="Use severity to communicate information, success, warning or failure. Alerts can be dense, dismissible or automatically dismissed when the message is temporary."
        divider={false}
      >
        <Box sx={{ display: "grid", gap: spacing.lg }}>
          <CodeExample title="Severity variants" code={alertCode} preview={<AlertExamples />} previewMinHeight={380} />
          <CodeExample title="Dismissible alert" code={dismissibleAlertCode} preview={<DismissibleAlertExample />} previewMinHeight={190} />
        </Box>
      </Section>

      <Section
        id="status-chips"
        title="Status chips"
        description="StatusChip represents state beside a record, title or table value. Stream uses info and primary for normal progression and reserves semantic colors for meaningful outcomes."
      >
        <CodeExample title="Operational statuses" code={statusCode} preview={<StatusChipExamples />} previewMinHeight={160} />
      </Section>

      <Section
        id="loading"
        title="Loading"
        description="Use the compact spinner when the surrounding context already explains what is loading. Add a label when loading occupies a larger region."
      >
        <CodeExample title="Compact and labelled loading" code={loadingCode} preview={<LoadingExamples />} previewMinHeight={250} />
      </Section>

      <Section
        id="empty-states"
        title="Empty states"
        description="Differentiate a genuinely empty dataset from a search or filter with no matches. Give users one relevant next action when recovery is possible."
      >
        <CodeExample title="First-use and no-results states" code={emptyStateCode} preview={<EmptyStateExamples />} previewMinHeight={360} />
      </Section>

      <Section
        id="result-states"
        title="Result states"
        description="ResultState provides a consistent full-page outcome for forbidden, not-found, unexpected-error and successful completion screens. Applications supply their own actions and routing."
      >
        <CodeExample title="Page-level results" code={resultStateCode} preview={<ResultStateExample />} previewMinHeight={500} />
      </Section>

      <Section
        id="guidelines"
        title="Guidelines"
        description="Match the feedback level to the scope of the event so users are informed without being interrupted unnecessarily."
      >
        <GuidelineList items={guidelines} />
      </Section>

      <Section
        id="accessibility"
        title="Accessibility"
        description="Feedback must be understandable without relying on colour, motion or pointer interaction."
        last
      >
        <Card>
          <Typography variant="h3" sx={{ mb: spacing.sm }}>
            Announce changes at the right priority
          </Typography>
          <Typography variant="body2" sx={{ mb: spacing.lg, color: secondaryText, lineHeight: 1.7 }}>
            Reserve assertive alerts for failures that require attention. Progress and routine updates should use polite announcements so they do not repeatedly interrupt assistive-technology users.
          </Typography>
          <GuidelineList items={accessibilityGuidelines} />
        </Card>
      </Section>
    </Page>
  );
}
