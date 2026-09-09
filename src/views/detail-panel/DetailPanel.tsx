"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  Calendar,
  ChevronsUp,
  ExternalLink,
  FileText,
  Link2,
  Route,
  User,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  DetailPanel,
  DetailRow,
  DetailSection,
  StatusChip,
  Surface,
  borderWidths,
  radius,
  spacing,
  useSemanticColors,
} from "@ssw/ui-library";
import {
  CodeExample,
  CopyAction,
  GuidelineList,
  Intro,
  Section,
} from "@/app/components/documentation";
import Page from "@/app/components/layout/Page";

const sections = [
  { label: "Overview", href: "#detail-panel" },
  { label: "Anatomy", href: "#anatomy" },
  { label: "Code examples", href: "#code-examples" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const guidelines = [
  "Use a detail panel to show or edit a single record without leaving the current list.",
  "Keep the header title short and specific, such as \"Task details\" instead of \"Details\".",
  "Group related fields with a DetailSection divider instead of one long, unbroken list.",
  "Keep the lower-priority action outlined and place the single filled navigation action last.",
  "Always provide a visible close control in addition to the escape key and backdrop click.",
  "Do not stack detail panels on top of each other; close the current one before opening the next.",
] as const;

function CopyValue({ value }: { value: string }) {
  return (
    <Surface
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: spacing.sm,
        minHeight: 52,
        px: spacing.md,
        py: spacing.sm,
      }}
    >
      <Typography variant="body2" sx={{ minWidth: 0, overflowWrap: "anywhere" }}>
        {value}
      </Typography>
      <CopyAction value={value} iconOnly />
    </Surface>
  );
}

function TaskDetailsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { accent, borders, secondaryText } = useSemanticColors();

  return (
    <DetailPanel
      open={open}
      onClose={onClose}
      title="Task details"
      footer={
        <>
          <Button variant="secondary" startIcon={<UserPlus size={16} />} onClick={onClose}>
            Assign task to me
          </Button>
          <Button startIcon={<ExternalLink size={16} />} onClick={onClose}>
            Open transport details
          </Button>
        </>
      }
    >
      <DetailRow icon={FileText as LucideIcon} label="Description">
        <Typography variant="h5" sx={{ fontWeight: 500, lineHeight: 1.35 }}>
          Correct the parcel data — it fails customs validation rules
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: spacing.sm }}>
          <Badge tone="neutral" sx={{ borderRadius: radius.small, textTransform: "uppercase" }}>
            Transport
          </Badge>
          <StatusChip status="needs attention" color="warning" />
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: spacing.xs, color: accent }}>
            <ChevronsUp size={16} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Medium
            </Typography>
          </Box>
        </Box>
      </DetailRow>

      <DetailRow icon={User as LucideIcon} label="Assigned to">
        <Box sx={{ display: "flex", alignItems: "center", gap: spacing.sm, color: secondaryText }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              display: "grid",
              placeItems: "center",
              border: `${borderWidths.default} dashed ${borders.default}`,
              borderRadius: radius.circle,
            }}
          >
            <User size={16} />
          </Box>
          <Typography variant="body2">Unassigned</Typography>
        </Box>
      </DetailRow>

      <DetailRow icon={Calendar as LucideIcon} label="Created on">
        <Typography variant="body2">09-09-2026 12:28 (16 min. ago)</Typography>
      </DetailRow>

      <DetailSection title="Parcel details">
        <DetailRow icon={Link2 as LucideIcon} label="Reference">
          <CopyValue value="UCR-00003-BTO:Scenario1" />
        </DetailRow>
        <DetailRow icon={Route as LucideIcon} label="Transport">
          <CopyValue value="MVG-Marten-TST" />
        </DetailRow>
      </DetailSection>
    </DetailPanel>
  );
}

function AnatomyExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open task details</Button>
      <TaskDetailsPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}

const usageCode = `import { useState } from "react";
import {
  Button,
  DetailPanel,
  DetailRow,
} from "@ssw/ui-library";
import { Calendar, ExternalLink, FileText, UserPlus } from "lucide-react";

export function TaskDetailsAction() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open task details</Button>
      <DetailPanel
        open={open}
        onClose={() => setOpen(false)}
        title="Task details"
        footer={
          <>
            <Button variant="secondary" startIcon={<UserPlus size={16} />}>
              Assign task to me
            </Button>
            <Button startIcon={<ExternalLink size={16} />}>
              Open transport details
            </Button>
          </>
        }
      >
        <DetailRow icon={FileText} label="Description">
          Correct the parcel data — it fails customs validation rules
        </DetailRow>
        <DetailRow icon={Calendar} label="Created on">
          09-09-2026 12:28 (16 min. ago)
        </DetailRow>
      </DetailPanel>
    </>
  );
}`;

export default function DetailPanelPage() {
  const { secondaryText } = useSemanticColors();

  return (
    <Page pageId="detail-panel" sections={sections}>
      <Intro
        title="Detail Panel"
        description="The detail panel is the standard right-side slide-over used across Stream applications to show or edit a single record — a task, a consignment, a customer — without leaving the list behind it."
        note="A detail panel is a Drawer, not a Dialog: it keeps a sense of place relative to the list it came from, while a Dialog interrupts the whole screen for a single decision."
      />

      <Section
        id="anatomy"
        title="Anatomy"
        description="A compact header with a title and close control, a scrollable body of labeled fields grouped into sections, and pinned actions with one clear primary destination."
        divider={false}
      >
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 160,
            py: spacing.xl,
          }}
        >
          <AnatomyExample />
        </Card>
      </Section>

      <Section
        id="code-examples"
        title="Code examples"
        description="Control the open state from the parent component, group fields with DetailRow, and keep secondary and primary footer actions visually distinct."
      >
        <CodeExample
          title="Task details panel"
          preview={<AnatomyExample />}
          renderPreview={() => <AnatomyExample />}
          code={usageCode}
        />
      </Section>

      <Section
        id="guidelines"
        title="Guidelines"
        description="These rules keep detail panels predictable across Stream applications."
      >
        <GuidelineList items={guidelines} />
      </Section>

      <Section
        id="accessibility"
        title="Accessibility"
        description="A detail panel must remain fully operable with a keyboard and stay clearly announced to assistive technology."
        last
      >
        <Card>
          <Typography variant="h3" sx={{ mb: 1.5 }}>
            Focus stays inside the panel
          </Typography>
          <Typography sx={{ color: secondaryText, lineHeight: 1.7 }}>
            Opening the panel moves keyboard focus inside it and traps it there until closed, so
            users cannot tab into the blurred page behind it. Escape, the visible close button and
            a backdrop click all close the panel and return focus to the element that opened it.
          </Typography>
        </Card>
      </Section>
    </Page>
  );
}
