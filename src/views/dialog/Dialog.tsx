"use client";

import { useState } from "react";
import { Typography } from "@mui/material";
import { Button } from "@ssw/ui-library";
import { CancelButton } from "@ssw/ui-library";
import { Card } from "@ssw/ui-library";
import CodeExample from "@/app/components/patterns/CodeExample";
import { DeleteButton } from "@ssw/ui-library";
import { Dialog } from "@ssw/ui-library";
import { GuidelineList } from "@ssw/ui-library";
import { Intro } from "@ssw/ui-library";
import Page from "@/app/components/layout/Page";
import { Section } from "@ssw/ui-library";
import { useSemanticColors } from "@ssw/ui-library";

const sections = [
  { label: "Overview", href: "#dialog" },
  { label: "Anatomy", href: "#anatomy" },
  { label: "Variants", href: "#variants" },
  { label: "Code examples", href: "#code-examples" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const guidelines = [
  "Use a dialog to interrupt the user for a single, focused task or decision.",
  "Keep the title short and describe the action, such as \"Delete customer\" instead of \"Warning\".",
  "Always provide a visible close control in addition to the escape key and backdrop click.",
  "Put the primary action on the right and the cancel action on the left inside the actions row.",
  "Do not stack dialogs on top of each other; close the current one before opening the next.",
  "Use a confirmation dialog only for destructive or hard-to-reverse actions.",
] as const;

function BasicDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Invite a user"
        description="Send an invitation email so a new colleague can access this environment."
        actions={
          <>
            <CancelButton onClick={() => setOpen(false)} />
            <Button onClick={() => setOpen(false)}>Send invite</Button>
          </>
        }
      >
        <Typography variant="body2">
          The form fields for this dialog would go here, using the same
          FormField and SelectField components shown on the Forms page.
        </Typography>
      </Dialog>
    </>
  );
}

function ConfirmDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DeleteButton label="Delete customer" onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete customer"
        description="This removes Van Dijk Logistics and all related invoices. This action cannot be undone."
        maxWidth="xs"
        actions={
          <>
            <CancelButton onClick={() => setOpen(false)} />
            <DeleteButton onClick={() => setOpen(false)} />
          </>
        }
      />
    </>
  );
}

export default function DialogPage() {
  const { secondaryText } = useSemanticColors();

  return (
    <Page pageId="dialog" sections={sections}>
      <Intro
        title="Dialog"
        description="A dialog (or modal) interrupts the current screen to ask for a decision or collect input for a single, focused task. It blocks interaction with the rest of the page until it is closed."
        note="Modal and dialog describe the same pattern in Stream applications: a focused overlay backed by a dimmed backdrop. This page uses 'dialog' as the component name."
      />

      <Section
        id="anatomy"
        title="Anatomy"
        description="A dialog has an optional title and description, a content area, and an actions row for buttons."
        divider={false}
      >
        <Card>
          <BasicDialogExample />
        </Card>
      </Section>

      <Section
        id="variants"
        title="Variants"
        description="Use a smaller maxWidth and a destructive action for confirmation dialogs."
      >
        <Card>
          <ConfirmDialogExample />
        </Card>
      </Section>

      <Section
        id="code-examples"
        title="Code examples"
        description="Control the open state from the parent component and pass content and actions as props."
      >
        <CodeExample
          title="Invite user dialog"
          preview={<BasicDialogExample />}
          code={`import { useState } from "react";
import { Button, CancelButton, Dialog } from "@ssw/ui-library";

export function InviteUserAction() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Invite a user"
        description="Send an invitation email so a new colleague can access this environment."
        actions={
          <>
            <CancelButton onClick={() => setOpen(false)} />
            <Button onClick={() => setOpen(false)}>Send invite</Button>
          </>
        }
      >
        Form fields go here.
      </Dialog>
    </>
  );
}`}
        />
      </Section>

      <Section
        id="guidelines"
        title="Guidelines"
        description="These rules keep dialogs predictable and easy to dismiss across Stream interfaces."
      >
        <GuidelineList items={guidelines} />
      </Section>

      <Section
        id="accessibility"
        title="Accessibility"
        description="Dialogs must trap focus and remain fully operable with a keyboard."
        last
      >
        <Card>
          <Typography variant="h3" sx={{ mb: 1.5 }}>
            Focus stays inside the dialog
          </Typography>
          <Typography sx={{ color: secondaryText, lineHeight: 1.7 }}>
            Opening a dialog moves keyboard focus inside it and traps it there
            until closed, so users cannot tab into the dimmed page behind it.
            Escape and the visible close button both close the dialog and
            return focus to the element that opened it.
          </Typography>
        </Card>
      </Section>
    </Page>
  );
}
