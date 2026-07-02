"use client";

import { Box, ButtonBase, Typography } from "@mui/material";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Boxes,
  CheckCircle2,
  Circle,
  ClipboardCheck,
  FileCheck2,
  Info,
  ListChecks,
  PackageCheck,
  Save,
  ShieldCheck,
  Trash2,
  Upload,
} from "lucide-react";
import { useState } from "react";
import Badge from "@/app/components/atoms/Badge";
import Button from "@/app/components/atoms/Button";
import Card from "@/app/components/atoms/Card";
import CardTitle from "@/app/components/atoms/CardTitle";
import IconBox from "@/app/components/atoms/IconBox";
import Surface from "@/app/components/atoms/Surface";
import Text from "@/app/components/atoms/Text";
import TokenCode from "@/app/components/atoms/TokenCode";
import AnatomyItem from "@/app/components/molecules/AnatomyItem";
import ExampleCard from "@/app/components/molecules/ExampleCard";
import FormActionRow from "@/app/components/molecules/FormActionRow";
import FormField from "@/app/components/molecules/FormField";
import SelectField from "@/app/components/molecules/SelectField";
import ToggleField from "@/app/components/molecules/ToggleField";
import CodeExample from "@/app/components/patterns/CodeExample";
import GuidelineList from "@/app/components/patterns/GuidelineList";
import Intro from "@/app/components/layout/Intro";
import Page from "@/app/components/layout/Page";
import Section from "@/app/components/layout/Section";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";
import {
  borderWidths,
  colors,
  formTokens,
  iconSizes,
  pageLayoutTokens,
  radius,
  responsiveGrids,
  shadows,
  spacing,
  wizardTokens,
} from "@/app/theme/tokens";

const sections = [
  { label: "Overview", href: "#wizards" },
  { label: "Anatomy", href: "#anatomy" },
  { label: "Wizard example", href: "#wizard-example" },
  { label: "Stepper states", href: "#stepper-states" },
  { label: "Actions", href: "#actions" },
  { label: "Code examples", href: "#code-examples" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const wizardSteps = [
  {
    label: "General information",
    description: "Reference, title and owner details",
    status: "current",
    icon: FileCheck2,
  },
  {
    label: "Attachments",
    description: "Relevant documents and files",
    icon: Upload,
  },
  {
    label: "Details",
    description: "People, locations and control numbers",
    icon: ShieldCheck,
  },
  {
    label: "Items",
    description: "Items, quantities and supporting data",
    icon: Boxes,
  },
  {
    label: "Activities",
    description: "Workflow activity details",
    icon: PackageCheck,
  },
  {
    label: "Review & submit",
    description: "Review information and submit the record",
    icon: ClipboardCheck,
  },
] as const;

const wizardSpacing = wizardTokens;

const stepperRows = [
  {
    token: "wizard.step.current",
    columns: [
      { value: "Active step" },
      { value: "Primary border, active background and clear title" },
      { value: "Use for the step currently being edited." },
    ],
  },
  {
    token: "wizard.step.complete",
    columns: [
      { value: "Completed step" },
      { value: "Success icon with readable secondary text" },
      { value: "Use when the step has valid saved data." },
    ],
  },
  {
    token: "wizard.step.upcoming",
    columns: [
      { value: "Future step" },
      { value: "Neutral icon and muted text" },
      { value: "Keep accessible, but visually lower priority." },
    ],
  },
  {
    token: "wizard.step.error",
    columns: [
      { value: "Blocked step" },
      { value: "Error icon and direct recovery text" },
      { value: "Use when users must return to fix invalid data." },
    ],
  },
] as const;

const guidelines = [
  "Use wizards for long workflows that have a clear sequence and a final review step.",
  "Keep one primary task per step; move supporting details into helper text or secondary panels.",
  "Show progress as a step label and count, for example Step 1 of 6.",
  "Keep draft status visible near the action bar, not hidden in a toast.",
  "Disable Continue only when the reason is visible on the current step.",
  "Use a Review & submit step before committing important operational or financial data.",
  "Let users move back without losing completed step data.",
  "Use consistent step labels across product navigation, validation summaries and page titles.",
] as const;

const accessibilityGuidelines = [
  "Expose the current step with aria-current=\"step\".",
  "Keep Previous, Continue and Save draft reachable by keyboard.",
  "Announce validation errors at the step level and near the affected field.",
  "Do not rely on step icon color alone; combine icon, label and status text.",
  "Use semantic headings so assistive technology can navigate between wizard areas.",
] as const;

const wizardCode = `import FormField from "@/app/components/molecules/FormField";
import SelectField from "@/app/components/molecules/SelectField";
import FormActionRow from "@/app/components/molecules/FormActionRow";

export function ExampleWizardStep() {
  return (
    <form>
      <h2>General information</h2>
      <FormField label="Reference" name="reference" required />
      <SelectField
        label="Owner"
        name="owner"
        required
        options={[{ label: "Select owner", value: "" }]}
      />
      <FormActionRow primaryLabel="Continue" secondaryLabel="Previous" />
    </form>
  );
}`;

function WizardStepList({
  currentStep,
  completedSteps,
  onStepSelect,
}: {
  currentStep: number;
  completedSteps: boolean[];
  onStepSelect: (stepIndex: number) => void;
}) {
  const { borders, surface, subtleBackground, primaryText, secondaryText, accent } =
    useDocumentationStyles();

  return (
    <Box
      component="ol"
      aria-label="Wizard steps"
      sx={{
        m: 0,
        p: 0,
        display: "grid",
        gap: wizardSpacing.stepGap,
        listStyle: "none",
      }}
    >
      {wizardSteps.map((step, index) => {
        const Icon = step.icon;
        const isCurrent = index === currentStep;
        const isComplete = completedSteps[index];
        const isReachable = index === 0 || completedSteps[index - 1] || isComplete;
        const isLocked = !isReachable;

        return (
          <Box
            key={step.label}
            component="li"
            sx={{ opacity: isLocked ? 0.42 : 1 }}
          >
            <ButtonBase
              type="button"
              disabled={isLocked}
              aria-current={isCurrent ? "step" : undefined}
              onClick={() => onStepSelect(index)}
              sx={{
                border: `${borderWidths.default} solid ${
                  isCurrent ? accent : borders.subtle
                }`,
                width: "100%",
                minHeight: wizardSpacing.stepHeight,
                display: "grid",
                gridTemplateColumns: `${wizardTokens.stepIconSize}px minmax(0, 1fr)`,
                gap: spacing.sm,
                p: spacing.md,
                textAlign: "left",
                borderRadius: radius.medium,
                backgroundColor: isCurrent ? subtleBackground : surface,
                cursor: isLocked ? "not-allowed" : "pointer",
                transition:
                  "opacity 160ms ease, border-color 160ms ease, background-color 160ms ease, box-shadow 160ms ease",
                "&:hover": {
                  borderColor: isCurrent ? accent : borders.default,
                  backgroundColor: isLocked
                    ? surface
                    : isCurrent
                      ? subtleBackground
                      : colors.primary[50],
                },
                "&:focus-visible": {
                  borderColor: accent,
                  boxShadow: formTokens.field.focusRing,
                },
              }}
            >
              <Box
                sx={{
                  width: wizardTokens.stepIconSize,
                  height: wizardTokens.stepIconSize,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: radius.circle,
                  color: isComplete
                    ? colors.semantic.success.dark
                    : isCurrent
                      ? accent
                      : secondaryText,
                  backgroundColor: isComplete
                    ? colors.semantic.success.light
                    : isCurrent
                      ? colors.primary[50]
                      : surface,
                  border: `${borderWidths.default} solid ${
                    isCurrent ? accent : borders.default
                  }`,
                }}
              >
                {isComplete ? (
                  <CheckCircle2 size={iconSizes.small} aria-hidden="true" />
                ) : (
                  <Icon size={iconSizes.small} aria-hidden="true" />
                )}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: isCurrent ? accent : primaryText,
                    fontWeight: isCurrent ? 700 : 600,
                  }}
                >
                  {index + 1}. {step.label}
                </Typography>
                <Typography variant="caption" sx={{ color: secondaryText, lineHeight: 1.5 }}>
                  {step.description}
                </Typography>
              </Box>
            </ButtonBase>
          </Box>
        );
      })}
    </Box>
  );
}

function WizardActionBar({
  canContinue,
  currentStep,
  onPrevious,
  onContinue,
}: {
  canContinue: boolean;
  currentStep: number;
  onPrevious: () => void;
  onContinue: () => void;
}) {
  const { borders, surface, secondaryText } = useDocumentationStyles();
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === wizardSteps.length - 1;

  return (
    <Box
      sx={{
        mt: spacing.lg,
        pt: spacing.md,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: spacing.md,
        borderTop: `${borderWidths.default} solid ${borders.subtle}`,
        backgroundColor: surface,
      }}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: spacing.sm }}>
        <Button variant="destructive" size="sm" startIcon={<Trash2 />}>Discard</Button>
        <Button variant="secondary" size="sm" startIcon={<Save />}>Save draft</Button>
        <Typography variant="caption" sx={{ color: secondaryText }}>
          Draft saved 2 minutes ago
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: spacing.sm }}>
        <Button
          variant={isFirstStep ? "disabled" : "secondary"}
          disabled={isFirstStep}
          size="sm"
          startIcon={<ArrowLeft />}
          onClick={onPrevious}
        >
          Previous
        </Button>
        <Button
          size="sm"
          endIcon={<ArrowRight />}
          variant={canContinue ? "primary" : "disabled"}
          disabled={!canContinue}
          onClick={onContinue}
        >
          {isLastStep ? "Submit" : "Continue"}
        </Button>
      </Box>
    </Box>
  );
}

function WizardExamplePreview() {
  const { borders, surface, subtleBackground, primaryText, secondaryText, accent } =
    useDocumentationStyles();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    () => Array(wizardSteps.length).fill(false),
  );
  const [reference, setReference] = useState("");
  const [owner, setOwner] = useState("");
  const [attachmentName, setAttachmentName] = useState("");
  const [detailsContact, setDetailsContact] = useState("");
  const [itemName, setItemName] = useState("");
  const [activityType, setActivityType] = useState("");
  const stepIsValid = [
    reference.trim().length > 0 && owner.trim().length > 0,
    attachmentName.trim().length > 0,
    detailsContact.trim().length > 0,
    itemName.trim().length > 0,
    activityType.trim().length > 0,
    completedSteps.slice(0, 5).every(Boolean),
  ];
  const canContinue = stepIsValid[currentStep];
  const currentStepMeta = wizardSteps[currentStep];

  function completeCurrentStep() {
    if (!canContinue) {
      return;
    }

    setCompletedSteps((current) => {
      const next = [...current];
      next[currentStep] = true;
      return next;
    });

    setCurrentStep((current) => Math.min(current + 1, wizardSteps.length - 1));
  }

  function selectStep(stepIndex: number) {
    const isReachable =
      stepIndex === 0 || completedSteps[stepIndex - 1] || completedSteps[stepIndex];

    if (isReachable) {
      setCurrentStep(stepIndex);
    }
  }

  function renderCurrentStepContent() {
    if (currentStep === 0) {
      return (
        <Box sx={{ display: "grid", gap: wizardSpacing.fieldGap }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: formTokens.layout.twoColumn },
              gap: wizardSpacing.fieldGap,
              alignItems: "start",
            }}
          >
            <FormField
              label="Reference"
              name="wizardReference"
              required
              helperText="Unique reference. Use letters, numbers, underscores and dashes."
              errorText={reference.trim().length === 0 ? "Reference is required before continuing." : undefined}
              inputProps={{
                value: reference,
                onChange: (event) => setReference(event.currentTarget.value),
                placeholder: "REC-2026-0042",
              }}
            />
            <FormField
              label="Title"
              name="wizardLabel"
              helperText="Optional title for finding this record later."
              inputProps={{ placeholder: "New onboarding workflow" }}
            />
            <FormField
              label="External reference"
              name="wizardUcr"
              inputProps={{ placeholder: "External reference" }}
            />
            <SelectField
              label="Owner"
              name="wizardOwner"
              required
              helperText="Select who owns this record."
              errorText={owner ? undefined : "Owner is required before continuing."}
              options={[
                { label: "Select owner", value: "" },
                { label: "Operations team", value: "operations" },
                { label: "Finance team", value: "finance" },
              ]}
              selectProps={{
                value: owner,
                onChange: (event) => setOwner(event.currentTarget.value),
              }}
            />
          </Box>

          <Box>
            <ToggleField
              label="Assign this record to me"
              description="System generated tasks for this workflow will appear in your task list."
              defaultChecked
            />
          </Box>
        </Box>
      );
    }

    if (currentStep === 1) {
      return (
        <Box sx={{ display: "grid", gap: wizardSpacing.fieldGap }}>
          <FormField
            label="Attachment name"
            name="attachmentName"
            required
            helperText="Use a clear name for the supporting file or document."
            errorText={attachmentName.trim().length === 0 ? "Attachment name is required before continuing." : undefined}
            inputProps={{
              value: attachmentName,
              onChange: (event) => setAttachmentName(event.currentTarget.value),
              placeholder: "Signed agreement",
            }}
          />
        </Box>
      );
    }

    if (currentStep === 2) {
      return (
        <Box sx={{ display: "grid", gap: wizardSpacing.fieldGap }}>
          <FormField
            label="Responsible contact"
            name="detailsContact"
            required
            helperText="Name the person or team responsible for this step."
            errorText={detailsContact.trim().length === 0 ? "Responsible contact is required before continuing." : undefined}
            inputProps={{
              value: detailsContact,
              onChange: (event) => setDetailsContact(event.currentTarget.value),
              placeholder: "Operations desk",
            }}
          />
        </Box>
      );
    }

    if (currentStep === 3) {
      return (
        <Box sx={{ display: "grid", gap: wizardSpacing.fieldGap }}>
          <FormField
            label="Item name"
            name="itemName"
            required
            helperText="Add the main item or data object this workflow is about."
            errorText={itemName.trim().length === 0 ? "Item name is required before continuing." : undefined}
            inputProps={{
              value: itemName,
              onChange: (event) => setItemName(event.currentTarget.value),
              placeholder: "Primary item",
            }}
          />
        </Box>
      );
    }

    if (currentStep === 4) {
      return (
        <Box sx={{ display: "grid", gap: wizardSpacing.fieldGap }}>
          <SelectField
            label="Activity type"
            name="activityType"
            required
            helperText="Select the activity that should happen in this workflow."
            errorText={activityType ? undefined : "Activity type is required before continuing."}
            options={[
              { label: "Select activity", value: "" },
              { label: "Review", value: "review" },
              { label: "Approval", value: "approval" },
            ]}
            selectProps={{
              value: activityType,
              onChange: (event) => setActivityType(event.currentTarget.value),
            }}
          />
        </Box>
      );
    }

    return (
      <Surface subtle>
        <CardTitle sx={{ mb: spacing.sm }}>Ready to submit</CardTitle>
        <Text tone="secondary" variant="body2">
          All previous steps are complete. Use the final action to submit this record.
        </Text>
      </Surface>
    );
  }

  return (
    <Surface sx={{ p: 0, overflow: "hidden" }}>
      <Box
        sx={{
          px: spacing.lg,
          py: spacing.md,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacing.md,
          borderBottom: `${borderWidths.default} solid ${borders.subtle}`,
          backgroundColor: surface,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: spacing.md }}>
          <Button variant="icon" iconOnly aria-label="Back to records">
            <ArrowLeft />
          </Button>
          <Box>
            <Typography variant="h2" sx={{ color: primaryText }}>
              Create new record
            </Typography>
            <Typography variant="caption" sx={{ color: secondaryText }}>
              Records / New record
            </Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="body2" sx={{ color: primaryText, fontWeight: 700 }}>
            {currentStepMeta.label}
          </Typography>
          <Typography variant="caption" sx={{ color: secondaryText }}>
            Step {currentStep + 1} of {wizardSteps.length}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: formTokens.layout.singleColumn,
            lg: `${wizardTokens.panelColumnWidth} minmax(0, 1fr)`,
          },
          alignItems: "stretch",
          gap: wizardSpacing.panelGap,
          p: { xs: wizardSpacing.shellPadding, lg: 0 },
          backgroundColor: subtleBackground,
        }}
      >
        <Box
          sx={{
            p: wizardSpacing.shellPadding,
            borderRight: {
              xs: 0,
              lg: `${borderWidths.default} solid ${borders.subtle}`,
            },
          }}
        >
          <WizardStepList
            currentStep={currentStep}
            completedSteps={completedSteps}
            onStepSelect={selectStep}
          />
        </Box>

        <Box
          sx={{
            p: wizardSpacing.shellPadding,
            backgroundColor: subtleBackground,
          }}
        >
          <Box
            sx={{
              p: wizardSpacing.cardPadding,
              minHeight: {
                xs: wizardTokens.contentMinHeight.mobile,
                lg: wizardTokens.contentMinHeight.desktop,
              },
              display: "flex",
              flexDirection: "column",
              border: `${borderWidths.default} solid ${borders.default}`,
              borderRadius: radius.medium,
              backgroundColor: surface,
              boxShadow: shadows.level0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: wizardSpacing.fieldGap,
                mb: wizardSpacing.fieldGap,
              }}
            >
              <Box>
                <CardTitle sx={{ mb: spacing.xs }}>{currentStepMeta.label}</CardTitle>
                <Text tone="secondary" variant="body2">
                  {currentStepMeta.description}. Complete required information to
                  unlock the next step.
                </Text>
              </Box>
              <Badge tone="accent">Required</Badge>
            </Box>

            <Box sx={{ flex: 1, minHeight: wizardTokens.bodyMinHeight }}>{renderCurrentStepContent()}</Box>

            <Box
              sx={{
                mt: wizardSpacing.fieldGap,
                p: wizardSpacing.fieldGap,
                display: "flex",
                gap: spacing.sm,
                color: accent,
                borderLeft: `${borderWidths.accent} solid ${accent}`,
                borderRadius: radius.medium,
                backgroundColor: colors.primary[50],
              }}
            >
              <Info size={iconSizes.medium} aria-hidden="true" />
              <Typography variant="body2" sx={{ color: colors.neutral[900], lineHeight: 1.7 }}>
                Complete this step to unlock the next one. Steps further ahead
                stay muted until the previous step is finished.
              </Typography>
            </Box>

            <WizardActionBar
              canContinue={canContinue}
              currentStep={currentStep}
              onPrevious={() => setCurrentStep((current) => Math.max(current - 1, 0))}
              onContinue={completeCurrentStep}
            />
          </Box>
        </Box>
      </Box>
    </Surface>
  );
}

export default function WizardsPage() {
  const { accent, semantic } = useDocumentationStyles();

  return (
    <Page pageId="wizards" sections={sections} maxWidth={pageLayoutTokens.dataContentMaxWidth}>
      <Intro
        title="Wizards"
        description="Wizards guide users through long workflows by splitting input into clear, ordered steps. They are useful for operational flows where users need to save drafts, validate each step and review before submitting."
        note="Place wizards under Components. Forms document individual controls; Wizards document the multi-step workflow pattern around those controls."
      />

      <Section
        id="anatomy"
        title="Anatomy"
        description="A wizard combines progress, step content, validation, draft state and navigation actions."
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
            label="Stepper"
            description="Shows where users are, what is complete and what comes next."
            token="wizard.stepper"
            icon={<ListChecks size={iconSizes.medium} color={accent} />}
          />
          <AnatomyItem
            label="Step content"
            description="Contains one focused task with fields, helper text and validation."
            token="wizard.content"
            icon={<FileCheck2 size={iconSizes.medium} color={accent} />}
          />
          <AnatomyItem
            label="Action bar"
            description="Keeps Previous, Continue, Save draft and discard actions predictable."
            token="wizard.actions"
            icon={<ArrowRight size={iconSizes.medium} color={accent} />}
          />
        </Box>
      </Section>

      <Section
        id="wizard-example"
        title="Wizard example"
        description="A wizard should feel more structured than a plain form: clear progress, grouped content, visible draft state, validation and one obvious next action."
      >
        <WizardExamplePreview />
      </Section>

      <Section
        id="stepper-states"
        title="Stepper states"
        description="Stepper states explain progress without relying on color alone."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1.2fr" },
            gap: spacing.md,
          }}
        >
          <Card>
            <CardTitle sx={{ mb: spacing.md }}>State guidance</CardTitle>
            <Box sx={{ display: "grid", gap: spacing.sm }}>
              {stepperRows.map((row) => (
                <Box key={row.token} sx={{ display: "grid", gap: spacing.xs }}>
                  <TokenCode>{row.token}</TokenCode>
                  <Text tone="secondary" variant="body2">
                    {row.columns[2].value}
                  </Text>
                </Box>
              ))}
            </Box>
          </Card>
          <Card>
            <CardTitle sx={{ mb: spacing.md }}>Visual states</CardTitle>
            <Box sx={{ display: "grid", gap: spacing.sm }}>
              <Badge tone="accent">Current</Badge>
              <Badge tone="success">Complete</Badge>
              <Badge tone="neutral">Upcoming</Badge>
              <Box sx={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
                <AlertTriangle size={iconSizes.small} color={semantic.error} />
                <Text variant="body2">Error: return to this step</Text>
              </Box>
            </Box>
          </Card>
        </Box>
      </Section>

      <Section
        id="actions"
        title="Actions"
        description="Wizard actions should stay stable across every step so users do not have to relearn navigation."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
            gap: spacing.md,
          }}
        >
          <ExampleCard
            title="Primary progression"
            description="Continue moves forward only when the current step is valid."
          >
            <Button endIcon={<ArrowRight />}>Continue</Button>
          </ExampleCard>
          <ExampleCard
            title="Draft state"
            description="Save draft is visible and paired with a clear saved/unsaved status."
          >
            <Button variant="secondary" startIcon={<Save />}>Save draft</Button>
          </ExampleCard>
          <ExampleCard
            title="Final review"
            description="Use a review step before submitting records with operational impact."
          >
            <FormActionRow primaryLabel="Submit record" secondaryLabel="Back" />
          </ExampleCard>
        </Box>
      </Section>

      <Section
        id="code-examples"
        title="Code examples"
        description="Use form molecules inside the wizard step so field behavior stays consistent with the Forms page."
      >
        <CodeExample
          title="Wizard step"
          code={wizardCode}
          preview={<WizardExamplePreview />}
          editable={false}
          previewMinHeight={820}
        />
      </Section>

      <Section
        id="guidelines"
        title="Guidelines"
        description="These rules keep multi-step workflows efficient and predictable."
      >
        <GuidelineList items={guidelines} />
      </Section>

      <Section
        id="accessibility"
        title="Accessibility"
        description="Wizard progress, validation and navigation must remain understandable for keyboard and assistive technology users."
        last
      >
        <Surface elevated>
          <Box sx={{ display: "flex", gap: spacing.md, alignItems: "flex-start" }}>
            <IconBox>
              <Circle size={iconSizes.medium} aria-hidden="true" />
            </IconBox>
            <Box>
              <CardTitle sx={{ mb: spacing.xs }}>Make progress semantic</CardTitle>
              <Text tone="secondary" variant="body2">
                The active step should use aria-current, validation should be connected
                to fields, and navigation actions should remain reachable in the same order.
              </Text>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: spacing.sm, mt: spacing.md }}>
                <TokenCode>{'aria-current="step"'}</TokenCode>
                <TokenCode>{"aria-describedby"}</TokenCode>
                <TokenCode>{"role=\"alert\""}</TokenCode>
              </Box>
            </Box>
          </Box>
        </Surface>

        <Card sx={{ mt: spacing.md }}>
          <CardTitle sx={{ mb: spacing.sm }}>Accessibility checklist</CardTitle>
          <GuidelineList items={accessibilityGuidelines} />
        </Card>
      </Section>
    </Page>
  );
}
