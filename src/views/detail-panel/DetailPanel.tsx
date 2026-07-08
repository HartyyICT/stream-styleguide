"use client";

import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  ArrowUp,
  Calendar,
  ExternalLink,
  FileText,
  Link2,
  Tag,
  User,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CopyAction,
  DetailPanel,
  DetailRow,
  DetailSection,
  GuidelineList,
  IconBox,
  Intro,
  Surface,
  useSemanticColors,
} from "@ssw/ui-library";
import CodeExample from "@/app/components/patterns/CodeExample";
import Page from "@/app/components/layout/Page";
import { Section } from "@ssw/ui-library";
import { borderWidths, radius, spacing } from "@ssw/ui-library";

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
  "Pin primary actions in the footer so they stay reachable while the body scrolls.",
  "Always provide a visible close control in addition to the escape key and backdrop click.",
  "Do not stack detail panels on top of each other; close the current one before opening the next.",
] as const;

function TaskDetailsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { borders, semantic } = useSemanticColors();

  return (
    <DetailPanel
      open={open}
      onClose={onClose}
      title="Task details"
      footer={
        <>
          <Button startIcon={<UserPlus size={16} />} onClick={onClose}>
            Assign task to me
          </Button>
          <Button variant="secondary" startIcon={<ExternalLink size={16} />} onClick={onClose}>
            Open consignment details
          </Button>
        </>
      }
    >
      <DetailRow icon={FileText as LucideIcon} label="Description">
        <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>
          Contact support about portbase issue - MRN invalid.
        </Typography>
        <Badge tone="accent">follow up</Badge>
      </DetailRow>

      <DetailRow icon={Calendar as LucideIcon} label="Created on">
        <Typography variant="body2">02/06/2026 16:42 (5w ago)</Typography>
      </DetailRow>

      <DetailSection title="Consignment details">
        <DetailRow icon={Link2 as LucideIcon} label="Reference">
          <Surface
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: spacing.sm,
              p: spacing.sm,
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, fontFamily: "var(--font-space-mono), monospace" }}
            >
              EXPORT
            </Typography>
            <CopyAction value="EXPORT" />
          </Surface>
        </DetailRow>

        <DetailRow icon={Tag as LucideIcon} label="Label">
          <Typography variant="body2">EXPORT</Typography>
        </DetailRow>

        <DetailRow icon={User as LucideIcon} label="Customer">
          <Typography variant="body2">DAF TRUCK AUSTRALIA</Typography>
        </DetailRow>

        <DetailRow icon={ArrowUp as LucideIcon} label="Activities">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: spacing.sm,
              p: spacing.sm,
              border: `${borderWidths.default} solid ${borders.subtle}`,
              borderRadius: radius.medium,
            }}
          >
            <IconBox
              sx={{
                width: 36,
                height: 36,
                color: semantic.success,
                backgroundColor: alpha(semantic.success, 0.14),
              }}
            >
              <ArrowUp size={18} />
            </IconBox>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Permanent export
              </Typography>
              <Badge tone="success">Exported</Badge>
            </Box>
            <IconButton size="small" aria-label="Open activity">
              <ExternalLink size={16} />
            </IconButton>
          </Box>
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
  DetailSection,
} from "@ssw/ui-library";
import { Calendar, FileText, UserPlus } from "lucide-react";

export function TaskDetailsAction() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open task details</Button>
      <DetailPanel
        open={open}
        onClose={() => setOpen(false)}
        title="Task details"
        footer={<Button startIcon={<UserPlus size={16} />}>Assign task to me</Button>}
      >
        <DetailRow icon={FileText} label="Description">
          Contact support about portbase issue - MRN invalid.
        </DetailRow>
        <DetailRow icon={Calendar} label="Created on">
          02/06/2026 16:42 (5w ago)
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
        description="A header with a title and close control, a scrollable body of labeled fields grouped into sections, and a footer with pinned actions."
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
        description="Control the open state from the parent component, group fields with DetailRow, and use DetailSection to divide the body into labeled groups."
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
            users cannot tab into the dimmed page behind it. Escape, the visible close button and
            a backdrop click all close the panel and return focus to the element that opened it.
          </Typography>
        </Card>
      </Section>
    </Page>
  );
}
