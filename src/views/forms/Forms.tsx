"use client";

import { Box, Typography } from "@mui/material";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  HelpCircle,
  ListChecks,
  Mail,
  TextCursorInput,
  User,
} from "lucide-react";
import type { ReactNode } from "react";
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
import ButtonGroupExample from "@/app/components/molecules/ButtonGroupExample";
import ExampleCard from "@/app/components/molecules/ExampleCard";
import StateCard from "@/app/components/molecules/StateCard";
import TokenTable from "@/app/components/molecules/TokenTable";
import ToggleField from "@/app/components/molecules/ToggleField";
import ContactForm from "@/app/components/organisms/ContactForm";
import CustomerForm from "@/app/components/organisms/CustomerForm";
import SettingsForm from "@/app/components/organisms/SettingsForm";
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
  radius,
  responsiveGrids,
  spacing,
} from "@/app/theme/tokens";

const sections = [
  { label: "Overview", href: "#forms" },
  { label: "Anatomy", href: "#anatomy" },
  { label: "Field types", href: "#field-types" },
  { label: "States", href: "#states" },
  { label: "Validation", href: "#validation" },
  { label: "Layout", href: "#layout" },
  { label: "Code examples", href: "#code-examples" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const fieldTypeRows = [
  {
    token: "form.field.text",
    columns: [
      { value: "Single-line text" },
      { value: "Names, titles, references" },
      { value: "Use a clear label and optional helper text." },
    ],
  },
  {
    token: "form.field.select",
    columns: [
      { value: "Closed option list" },
      { value: "Status, type, country, owner" },
      { value: "Use when choices are known and limited." },
    ],
  },
  {
    token: "form.field.textarea",
    columns: [
      { value: "Multi-line text" },
      { value: "Comments, notes, descriptions" },
      { value: "Use a visible minimum height and allow resizing when useful." },
    ],
  },
  {
    token: "form.choice.checkbox",
    columns: [
      { value: "Multiple choice" },
      { value: "Permissions, filters, settings" },
      { value: "Use for independent yes/no choices." },
    ],
  },
  {
    token: "form.choice.radio",
    columns: [
      { value: "Single choice" },
      { value: "Priority, plan, workflow path" },
      { value: "Use when one option must be selected from a short list." },
    ],
  },
  {
    token: "form.choice.toggle",
    columns: [
      { value: "Immediate on/off setting" },
      { value: "Notifications, feature settings, visibility" },
      { value: "Use when the setting changes immediately or is saved with a clear action." },
    ],
  },
] as const;

const stateRows = [
  {
    token: "form.states.default",
    columns: [
      { value: formTokens.states.default.border, code: true },
      { value: formTokens.states.default.background, code: true },
      { value: "Resting field" },
    ],
  },
  {
    token: "form.states.hover",
    columns: [
      { value: formTokens.states.hover.border, code: true },
      { value: formTokens.states.hover.background, code: true },
      { value: "Pointer feedback" },
    ],
  },
  {
    token: "form.states.focus",
    columns: [
      { value: formTokens.states.focus.border, code: true },
      { value: formTokens.states.focus.background, code: true },
      { value: "Keyboard and active input" },
    ],
  },
  {
    token: "form.states.error",
    columns: [
      { value: formTokens.states.error.border, code: true },
      { value: formTokens.states.error.background, code: true },
      { value: "Validation feedback" },
    ],
  },
  {
    token: "form.states.disabled",
    columns: [
      { value: formTokens.states.disabled.border, code: true },
      { value: formTokens.states.disabled.background, code: true },
      { value: "Unavailable input" },
    ],
  },
] as const;

const guidelines = [
  "Use one visible label for every field.",
  "Keep placeholder text optional; it must not replace the label.",
  "Group related fields into short sections with clear headings.",
  "Use helper text for formatting rules, not for essential instructions hidden after focus.",
  "Validate only after users can reasonably complete the field.",
  "Place error messages directly below the relevant field.",
  "Keep primary form actions at the end of the form and align them with the content flow.",
  "Use toggles for on/off settings; use checkboxes for selecting one or more options inside a form.",
  "Use disabled fields only when the reason is obvious or explained nearby.",
] as const;

const accessibilityGuidelines = [
  "Connect labels, helper text and errors to their input with semantic relationships.",
  "Do not communicate errors through color alone.",
  "Use aria-invalid for invalid fields and expose the error text to assistive technology.",
  "Keep focus indicators visible and high contrast.",
  "Use autocomplete attributes for common personal and business information.",
  "Make checkbox and radio targets large enough to click comfortably.",
] as const;

const textInputCode = `import { formTokens, radius } from "@/app/theme/tokens";

export function CustomerNameField() {
  return (
    <label>
      <span>Customer name</span>
      <input
        name="customerName"
        autoComplete="organization"
        placeholder="Van Dijk Logistics"
        style={{
          minHeight: formTokens.field.minHeight,
          paddingInline: formTokens.field.paddingX,
          borderRadius: radius.medium,
        }}
      />
    </label>
  );
}`;

const validationCode = `import { formTokens, colors } from "@/app/theme/tokens";

export function EmailField() {
  const errorId = "email-error";

  return (
    <label>
      <span>Email address</span>
      <input
        type="email"
        name="email"
        aria-invalid="true"
        aria-describedby={errorId}
        style={{ borderColor: formTokens.states.error.border }}
      />
      <span id={errorId} style={{ color: colors.semantic.error.main }}>
        Enter a valid email address.
      </span>
    </label>
  );
}`;

const formLayoutCode = `import Button from "@/app/components/atoms/Button";
import { formTokens, spacing } from "@/app/theme/tokens";

export function ContactForm() {
  return (
    <form style={{ display: "grid", gap: formTokens.layout.sectionGap }}>
      <div style={{ display: "grid", gridTemplateColumns: formTokens.layout.twoColumn, gap: spacing.md }}>
        <label>First name<input name="firstName" /></label>
        <label>Last name<input name="lastName" /></label>
      </div>
      <label>Message<textarea name="message" /></label>
      <Button type="submit">Save form</Button>
    </form>
  );
}`;

const toggleCode = `import { useState } from "react";
import ToggleField from "@/app/components/molecules/ToggleField";

export function NotificationToggle() {
  const [enabled, setEnabled] = useState(true);

  return (
    <ToggleField
      label="Email notifications"
      description="Send updates when workflow status changes."
      checked={enabled}
      onCheckedChange={setEnabled}
    />
  );
}`;

type FieldPreviewProps = {
  label: string;
  value?: string;
  placeholder?: string;
  helper?: string;
  state?: "default" | "hover" | "focus" | "error" | "disabled";
  multiline?: boolean;
  icon?: ReactNode;
  endIcon?: ReactNode;
};

function FieldPreview({
  label,
  value,
  placeholder,
  helper,
  state = "default",
  multiline = false,
  icon,
  endIcon,
}: FieldPreviewProps) {
  const { borders, surface, primaryText, secondaryText, subtleBackground } =
    useDocumentationStyles();
  const stateToken = formTokens.states[state];
  const isError = state === "error";
  const isDisabled = state === "disabled";

  return (
    <Box sx={{ display: "grid", gap: formTokens.label.gap, width: "100%" }}>
      <Typography
        component="span"
        variant="caption"
        sx={{ color: primaryText, fontWeight: 700 }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          minHeight: multiline ? formTokens.textarea.minHeight : formTokens.field.minHeight,
          display: "flex",
          alignItems: multiline ? "flex-start" : "center",
          gap: formTokens.field.gap,
          px: multiline ? formTokens.textarea.padding : formTokens.field.paddingX,
          py: multiline ? formTokens.textarea.padding : 0,
          color: isDisabled ? formTokens.states.disabled.content : primaryText,
          border: `${state === "focus" ? borderWidths.interactive : borderWidths.default} solid ${
            stateToken.border
          }`,
          borderRadius: radius.medium,
          backgroundColor: isDisabled ? stateToken.background : surface,
          boxShadow: state === "focus" ? formTokens.field.focusRing : "none",
        }}
      >
        {icon}
        <Typography
          variant="body2"
          sx={{
            flex: 1,
            color: value
              ? isDisabled
                ? formTokens.states.disabled.content
                : primaryText
              : secondaryText,
            lineHeight: multiline ? 1.7 : 1,
          }}
        >
          {value ?? placeholder}
        </Typography>
        {endIcon}
      </Box>
      {helper && (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: formTokens.helperText.gap,
            color: isError ? colors.semantic.error.main : secondaryText,
          }}
        >
          {isError ? (
            <AlertCircle size={iconSizes.small} aria-hidden="true" />
          ) : (
            <HelpCircle size={iconSizes.small} aria-hidden="true" />
          )}
          <Typography variant="caption" sx={{ color: "inherit", lineHeight: 1.5 }}>
            {helper}
          </Typography>
        </Box>
      )}
      {state === "hover" && (
        <Box
          sx={{
            height: formTokens.field.hoverIndicatorHeight,
            borderRadius: radius.small,
            backgroundColor: subtleBackground,
          }}
        />
      )}
      {borders.default && null}
    </Box>
  );
}

function ChoicePreview({ type }: { type: "checkbox" | "radio" }) {
  const { borders, primaryText, secondaryText, surface, accent } =
    useDocumentationStyles();
  const isRadio = type === "radio";

  return (
    <Box sx={{ display: "grid", gap: spacing.sm }}>
      {["Standard", "Priority"].map((label, index) => {
        const selected = index === 0;

        return (
          <Box
            key={label}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: spacing.sm,
              minHeight: formTokens.field.minHeight,
              px: spacing.sm,
              borderRadius: radius.medium,
              backgroundColor: selected ? colors.primary[50] : surface,
            }}
          >
            <Box
              aria-hidden="true"
              sx={{
                width: formTokens.choice.size,
                height: formTokens.choice.size,
                display: "grid",
                placeItems: "center",
                border: `${borderWidths.default} solid ${selected ? accent : borders.default}`,
                borderRadius: isRadio ? radius.circle : radius.small,
                backgroundColor: selected ? accent : surface,
              }}
            >
              {selected && isRadio ? (
                <Box
                  sx={{
                    width: formTokens.choice.indicatorSize,
                    height: formTokens.choice.indicatorSize,
                    borderRadius: radius.circle,
                    backgroundColor: colors.semantic.surface,
                  }}
                />
              ) : selected ? (
                <CheckCircle2 size={13} color={colors.semantic.surface} />
              ) : null}
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: primaryText, fontWeight: 700 }}>
                {label}
              </Typography>
              <Typography variant="caption" sx={{ color: secondaryText }}>
                {isRadio ? "Select one option" : "Can be combined with other choices"}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

function TogglePreview({
  label = "Email notifications",
  description = "Send updates when workflow status changes.",
}: {
  label?: string;
  description?: string;
}) {
  return (
    <ToggleField
      label={label}
      description={description}
      defaultChecked
    />
  );
}

function InteractiveInputPreview() {
  const { surface, primaryText, secondaryText } = useDocumentationStyles();
  const [customerName, setCustomerName] = useState("");

  return (
    <Box sx={{ display: "grid", gap: formTokens.label.gap, width: "100%", maxWidth: 360 }}>
      <Typography variant="caption" sx={{ color: primaryText, fontWeight: 700 }}>
        Customer name
      </Typography>
      <Box
        sx={{
          minHeight: formTokens.field.minHeight,
          display: "flex",
          alignItems: "center",
          gap: formTokens.field.gap,
          px: formTokens.field.paddingX,
          border: `${borderWidths.interactive} solid ${formTokens.states.focus.border}`,
          borderRadius: radius.medium,
          backgroundColor: surface,
          boxShadow: formTokens.field.focusRing,
          "&:focus-within": {
            borderColor: formTokens.states.focus.border,
          },
        }}
      >
        <TextCursorInput size={iconSizes.small} color={secondaryText} aria-hidden="true" />
        <Box
          component="input"
          value={customerName}
          onChange={(event) => setCustomerName(event.target.value)}
          placeholder="Van Dijk Logistics"
          aria-label="Customer name"
          sx={{
            width: "100%",
            minWidth: 0,
            border: 0,
            outline: 0,
            color: primaryText,
            backgroundColor: "transparent",
            font: "inherit",
            fontSize: formTokens.field.fontSize,
            "&::placeholder": {
              color: secondaryText,
              opacity: 1,
            },
          }}
        />
      </Box>
      <Typography variant="caption" sx={{ color: secondaryText }}>
        Try typing a customer name in this preview.
      </Typography>
    </Box>
  );
}

function InteractiveValidationPreview() {
  const { surface, primaryText, secondaryText } = useDocumentationStyles();
  const [email, setEmail] = useState("sanne@");
  const isInvalid = email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const helperId = "interactive-email-helper";

  return (
    <Box sx={{ display: "grid", gap: formTokens.label.gap, width: "100%", maxWidth: 360 }}>
      <Typography variant="caption" sx={{ color: primaryText, fontWeight: 700 }}>
        Email address
      </Typography>
      <Box
        sx={{
          minHeight: formTokens.field.minHeight,
          display: "flex",
          alignItems: "center",
          gap: formTokens.field.gap,
          px: formTokens.field.paddingX,
          border: `${borderWidths.default} solid ${
            isInvalid ? formTokens.states.error.border : formTokens.states.default.border
          }`,
          borderRadius: radius.medium,
          backgroundColor: surface,
          "&:focus-within": {
            borderWidth: borderWidths.interactive,
            borderColor: isInvalid
              ? formTokens.states.error.border
              : formTokens.states.focus.border,
          },
        }}
      >
        <Mail
          size={iconSizes.small}
          color={isInvalid ? colors.semantic.error.main : secondaryText}
          aria-hidden="true"
        />
        <Box
          component="input"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@company.com"
          aria-label="Email address"
          aria-invalid={isInvalid}
          aria-describedby={helperId}
          sx={{
            width: "100%",
            minWidth: 0,
            border: 0,
            outline: 0,
            color: primaryText,
            backgroundColor: "transparent",
            font: "inherit",
            fontSize: formTokens.field.fontSize,
            "&::placeholder": {
              color: secondaryText,
              opacity: 1,
            },
          }}
        />
      </Box>
      <Box
        id={helperId}
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: formTokens.helperText.gap,
          color: isInvalid ? colors.semantic.error.main : secondaryText,
        }}
      >
        {isInvalid ? (
          <AlertCircle size={iconSizes.small} aria-hidden="true" />
        ) : (
          <CheckCircle2 size={iconSizes.small} aria-hidden="true" />
        )}
        <Typography variant="caption" sx={{ color: "inherit", lineHeight: 1.5 }}>
          {isInvalid ? "Enter a valid email address." : "Email format looks good."}
        </Typography>
      </Box>
    </Box>
  );
}

function InteractiveFormLayoutPreview() {
  return <ContactForm />;
}

function renderFormCodePreview(code: string) {
  if (code.includes("ToggleField")) {
    return (
      <Box sx={{ width: "100%", maxWidth: 420 }}>
        <TogglePreview />
      </Box>
    );
  }

  if (code.includes("aria-invalid")) {
    return <InteractiveValidationPreview />;
  }

  if (code.includes("gridTemplateColumns")) {
    return <InteractiveFormLayoutPreview />;
  }

  return <InteractiveInputPreview />;
}

export default function FormsPage() {
  const { accent } = useDocumentationStyles();

  return (
    <Page pageId="forms" sections={sections} maxWidth={980}>
      <Intro
        title="Forms"
        description="Forms collect user input across Stream Software workflows. They must feel predictable, efficient and forgiving, especially in data-heavy enterprise screens."
        note="Use forms to guide users through decisions. Clear labels, direct validation and stable spacing matter more than decorative styling."
      />

      <Section
        id="anatomy"
        title="Anatomy"
        description="A form field is built from a label, control, optional helper text, validation feedback and a clear relationship to the surrounding section."
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
            label="Label"
            description="Names the information users need to provide."
            token="form.label"
            icon={<TextCursorInput size={iconSizes.medium} color={accent} />}
          />
          <AnatomyItem
            label="Control"
            description="The input, select, textarea or choice users interact with."
            token="form.control"
            icon={<ListChecks size={iconSizes.medium} color={accent} />}
          />
          <AnatomyItem
            label="Feedback"
            description="Helper, success and error text explain what happened next."
            token="form.feedback"
            icon={<AlertCircle size={iconSizes.medium} color={accent} />}
          />
        </Box>
      </Section>

      <Section
        id="field-types"
        title="Field types"
        description="Choose the simplest field type that matches the data users need to provide."
      >
        <TokenTable
          headers={["Token", "Type", "Use", "Guidance"]}
          rows={fieldTypeRows}
          columnsTemplate="1.2fr 1.2fr 1.4fr 1.8fr"
        />

        <Box
          sx={{
            mt: spacing.md,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: spacing.md,
          }}
        >
          <ExampleCard
            title="Text and select fields"
            description="Use consistent height, borders and label spacing."
          >
            <Box sx={{ display: "grid", gap: spacing.md, width: "100%" }}>
              <FieldPreview
                label="Customer"
                placeholder="Search customer"
                icon={<User size={iconSizes.small} />}
              />
              <FieldPreview
                label="Status"
                value="Active"
                endIcon={<ChevronDown size={iconSizes.small} />}
              />
            </Box>
          </ExampleCard>

          <ExampleCard
            title="Choice controls"
            description="Use checkboxes for independent choices and radio buttons for one required choice."
          >
            <ChoicePreview type="checkbox" />
          </ExampleCard>

          <ExampleCard
            title="Toggle controls"
            description="Use toggles for immediate on/off settings, not for multi-select choices."
          >
            <TogglePreview />
          </ExampleCard>
        </Box>
      </Section>

      <Section
        id="states"
        title="States"
        description="Form states must remain visible in light and dark mode and work with keyboard focus."
      >
        <TokenTable
          headers={["Token", "Border", "Background", "Use"]}
          rows={stateRows}
          columnsTemplate="1.4fr 1fr 1fr 1.4fr"
          sx={{ mb: spacing.md }}
        />

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
            description="A resting field uses a neutral border and clear label."
          >
            <FieldPreview label="Reference" placeholder="SO-1042" />
          </StateCard>
          <StateCard
            title="Focus"
            description="Focused fields use a stronger border and visible focus ring."
            state="focus"
          >
            <FieldPreview label="Reference" value="SO-1042" state="focus" />
          </StateCard>
          <StateCard
            title="Disabled"
            description="Disabled fields are muted and should not hide important values."
          >
            <FieldPreview label="Account number" value="A-20488" state="disabled" />
          </StateCard>
        </Box>
      </Section>

      <Section
        id="validation"
        title="Validation"
        description="Validation should help users recover quickly without losing the context of the field."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: spacing.md,
          }}
        >
          <ExampleCard
            title="Inline error"
            description="Show the message close to the field and describe the fix."
          >
            <FieldPreview
              label="Email address"
              value="support@"
              state="error"
              helper="Enter a valid email address."
              icon={<Mail size={iconSizes.small} />}
            />
          </ExampleCard>
          <ExampleCard
            title="Successful input"
            description="Use success feedback only when confirmation helps the workflow."
          >
            <Box sx={{ display: "grid", gap: spacing.sm }}>
              <FieldPreview
                label="VAT number"
                value="NL123456789B01"
                helper="VAT number verified."
              />
              <Badge tone="accent">Ready to save</Badge>
            </Box>
          </ExampleCard>
        </Box>
      </Section>

      <Section
        id="layout"
        title="Layout"
        description="Forms should scan from top to bottom, with related fields grouped and actions placed where users expect them."
      >
        <ContactForm />

        <Box
          sx={{
            mt: spacing.md,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
            gap: spacing.md,
          }}
        >
          <ExampleCard
            title="Single column"
            description="Best for complex forms, narrow layouts and content with varied field lengths."
          >
            <TokenCode>form.layout.singleColumn</TokenCode>
          </ExampleCard>
          <ExampleCard
            title="Two columns"
            description="Use only for short related pairs, such as first and last name."
          >
            <TokenCode>form.layout.twoColumn</TokenCode>
          </ExampleCard>
          <ExampleCard
            title="Action row"
            description="Keep one primary action and place secondary actions nearby."
          >
            <ButtonGroupExample>
              <Button variant="secondary">Cancel</Button>
              <Button>Save</Button>
            </ButtonGroupExample>
          </ExampleCard>
        </Box>

        <Box
          sx={{
            mt: spacing.md,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "repeat(2, minmax(0, 1fr))" },
            gap: spacing.md,
          }}
        >
          <ExampleCard
            title="Customer form organism"
            description="Combines form fields, select fields, action row and validation summary."
          >
            <CustomerForm />
          </ExampleCard>
          <ExampleCard
            title="Settings form organism"
            description="Combines toggle fields, checkbox fields and a radio group."
          >
            <SettingsForm />
          </ExampleCard>
        </Box>
      </Section>

      <Section
        id="code-examples"
        title="Code examples"
        description="Use the shared form tokens for field dimensions, validation states and responsive layout."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: spacing.md,
          }}
        >
          <CodeExample
            title="Text input"
            code={textInputCode}
            preview={renderFormCodePreview(textInputCode)}
            renderPreview={renderFormCodePreview}
          />
          <CodeExample
            title="Validation"
            code={validationCode}
            preview={renderFormCodePreview(validationCode)}
            renderPreview={renderFormCodePreview}
          />
          <CodeExample
            title="Toggle"
            code={toggleCode}
            preview={renderFormCodePreview(toggleCode)}
            renderPreview={renderFormCodePreview}
          />
        </Box>
        <Box sx={{ mt: spacing.md }}>
          <CodeExample
            title="Responsive form layout"
            code={formLayoutCode}
            preview={<ContactForm />}
            renderPreview={renderFormCodePreview}
            previewMinHeight={360}
          />
        </Box>
      </Section>

      <Section
        id="guidelines"
        title="Guidelines"
        description="These rules keep forms efficient, readable and predictable across Stream Software products."
      >
        <GuidelineList items={guidelines} />
      </Section>

      <Section
        id="accessibility"
        title="Accessibility"
        description="Accessible forms make labels, instructions and errors available to every user."
        last
      >
        <Surface elevated>
          <Box sx={{ display: "flex", gap: spacing.md, alignItems: "flex-start" }}>
            <IconBox>
              <CircleDot size={iconSizes.medium} aria-hidden="true" />
            </IconBox>
            <Box>
              <CardTitle sx={{ mb: spacing.xs }}>Keep every field understandable</CardTitle>
              <Text tone="secondary" variant="body2">
                Labels, helper text and errors should be programmatically connected to the
                field. The visual state and the semantic state need to tell the same story.
              </Text>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: spacing.sm, mt: spacing.md }}>
                <TokenCode>{"<label>"}</TokenCode>
                <TokenCode>{"aria-describedby"}</TokenCode>
                <TokenCode>{"aria-invalid"}</TokenCode>
                <TokenCode>{"autocomplete"}</TokenCode>
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
