"use client";

import { Box, Typography } from "@mui/material";
import {
  AlertCircle,
  ChevronDown,
  ListChecks,
  Mail,
  TextCursorInput,
  User,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Badge } from "@ssw/ui-library";
import { Card } from "@ssw/ui-library";
import { CardTitle } from "@ssw/ui-library";
import { InfoBanner } from "@ssw/ui-library";
import { Surface } from "@ssw/ui-library";
import { Tabs } from "@ssw/ui-library";
import { Text } from "@ssw/ui-library";
import { TokenCode } from "@ssw/ui-library";
import { AnatomyItem } from "@ssw/ui-library";
import { ExampleCard } from "@ssw/ui-library";
import { StateCard } from "@ssw/ui-library";
import { TokenTable } from "@ssw/ui-library";
import { ToggleField } from "@ssw/ui-library";
import { ContactForm } from "@ssw/ui-library";
import { CustomerForm } from "@ssw/ui-library";
import { SettingsForm } from "@ssw/ui-library";
import CodeExample from "@/app/components/patterns/CodeExample";
import { GuidelineList } from "@ssw/ui-library";
import { Intro } from "@ssw/ui-library";
import Page from "@/app/components/layout/Page";
import { Section } from "@ssw/ui-library";
import { useSemanticColors } from "@ssw/ui-library";
import {
  borderWidths,
  formTokens,
  iconSizes,
  pageLayoutTokens,
  radius,
  responsiveGrids,
  spacing,
} from "@ssw/ui-library";

const sections = [
  { label: "Overview", href: "#forms" },
  { label: "Anatomy", href: "#anatomy" },
  { label: "Field types", href: "#field-types" },
  { label: "States", href: "#states" },
  { label: "Choice controls", href: "#choice-controls" },
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

type FormStateStyles = ReturnType<typeof useSemanticColors>["formStates"];

function getStateRows(formStates: FormStateStyles) {
  return [
    {
      token: "form.states.default",
      columns: [
        { value: formStates.default.border, code: true },
        { value: formStates.default.background, code: true },
        { value: "Resting field" },
      ],
    },
    {
      token: "form.states.hover",
      columns: [
        { value: formStates.hover.border, code: true },
        { value: formStates.hover.background, code: true },
        { value: "Pointer feedback" },
      ],
    },
    {
      token: "form.states.focus",
      columns: [
        { value: formStates.focus.border, code: true },
        { value: formStates.focus.background, code: true },
        { value: "Keyboard and active input" },
      ],
    },
    {
      token: "form.states.error",
      columns: [
        { value: formStates.error.border, code: true },
        { value: formStates.error.background, code: true },
        { value: "Validation feedback" },
      ],
    },
    {
      token: "form.states.success",
      columns: [
        { value: formStates.success.border, code: true },
        { value: formStates.success.background, code: true },
        { value: "Positive confirmation" },
      ],
    },
    {
      token: "form.states.warning",
      columns: [
        { value: formStates.warning.border, code: true },
        { value: formStates.warning.background, code: true },
        { value: "Needs attention" },
      ],
    },
    {
      token: "form.states.info",
      columns: [
        { value: formStates.info.border, code: true },
        { value: formStates.info.background, code: true },
        { value: "Informational guidance" },
      ],
    },
    {
      token: "form.states.disabled",
      columns: [
        { value: formStates.disabled.border, code: true },
        { value: formStates.disabled.background, code: true },
        { value: "Unavailable input" },
      ],
    },
  ];
}

const stateExamples = [
  {
    title: "Default",
    description: "A resting field uses a neutral border and clear label.",
    label: "Reference",
    placeholder: "SO-1042",
    state: "default",
  },
  {
    title: "Hover",
    description: "Hover gives pointer feedback without changing the layout.",
    label: "Reference",
    value: "SO-1042",
    state: "hover",
  },
  {
    title: "Focus",
    description: "Focused fields use a stronger border and visible focus ring.",
    label: "Reference",
    value: "SO-1042",
    state: "focus",
  },
  {
    title: "Error",
    description: "Errors show the issue and explain how to fix it.",
    label: "Email address",
    value: "support@",
    state: "error",
    helper: "Enter a valid email address.",
  },
  {
    title: "Success",
    description: "Use success when confirmation helps the user continue.",
    label: "VAT number",
    value: "NL123456789B01",
    state: "success",
    helper: "VAT number verified.",
  },
  {
    title: "Warning",
    description: "Use warning for accepted values that need attention.",
    label: "Delivery date",
    value: "Friday 12 July",
    state: "warning",
    helper: "This date is outside the standard planning window.",
  },
  {
    title: "Info",
    description: "Use info for helpful guidance that is not an error.",
    label: "Reference",
    value: "SO-1042",
    state: "info",
    helper: "References are visible in reports and exports.",
  },
  {
    title: "Disabled",
    description: "Disabled fields are muted and should not hide important values.",
    label: "Account number",
    value: "A-20488",
    state: "disabled",
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

const textInputCode = `import { FormField } from "@ssw/ui-library";
import { User } from "lucide-react";

export function CustomerNameField() {
  return (
    <FormField
      label="Customer name"
      name="customerName"
      required
      helperText="Use the official company name."
      inputProps={{
        autoComplete: "organization",
        placeholder: "Van Dijk Logistics",
        startIcon: <User />,
      }}
    />
  );
}`;

const validationCode = `import { FormField } from "@ssw/ui-library";
import { Mail } from "lucide-react";

export function EmailField() {
  return (
    <FormField
      label="Email address"
      name="email"
      required
      errorText="Enter a valid email address."
      inputProps={{
        type: "email",
        defaultValue: "sanne@",
        startIcon: <Mail />,
      }}
    />
  );
}`;

const formLayoutCode = `import { Button } from "@ssw/ui-library";
import { formTokens, spacing } from "@ssw/ui-library";

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
import { ToggleField } from "@ssw/ui-library";

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
  state?: "default" | "hover" | "focus" | "error" | "success" | "warning" | "info" | "disabled";
  required?: boolean;
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
  required = false,
  multiline = false,
  icon,
  endIcon,
}: FieldPreviewProps) {
  const {
    surface,
    primaryText,
    secondaryText,
    placeholderText,
    subtleBackground,
    semantic,
    formStates,
    formFocusRing,
  } =
    useSemanticColors();
  const stateToken = formStates[state];
  const isDisabled = state === "disabled";
  const feedbackColor =
    state === "success"
      ? semantic.success
      : state === "warning"
        ? semantic.warning
        : state === "info"
          ? semantic.info
          : state === "error"
            ? semantic.error
            : secondaryText;

  return (
    <Box sx={{ display: "grid", gap: formTokens.label.gap, width: "100%" }}>
      <Typography
        component="span"
        variant="caption"
        sx={{ color: primaryText, fontWeight: 700 }}
      >
        {label}
        {required && (
          <Typography
            component="span"
            aria-hidden="true"
            sx={{ color: semantic.error, ml: 0.25 }}
          >
            *
          </Typography>
        )}
      </Typography>
      <Box
        sx={{
          minHeight: multiline ? formTokens.textarea.minHeight : formTokens.field.minHeight,
          display: "flex",
          alignItems: multiline ? "flex-start" : "center",
          gap: formTokens.field.gap,
          px: multiline ? formTokens.textarea.padding : formTokens.field.paddingX,
          py: multiline ? formTokens.textarea.padding : 0,
          color: isDisabled ? formStates.disabled.content : primaryText,
          border: `${state === "focus" ? borderWidths.interactive : borderWidths.default} solid ${
            stateToken.border
          }`,
          borderRadius: radius.medium,
          backgroundColor: isDisabled ? formStates.disabled.background : surface,
          boxShadow: state === "focus" ? formFocusRing : "none",
        }}
      >
        {icon && (
          <Box
            aria-hidden="true"
            sx={{
              width: iconSizes.small,
              height: iconSizes.small,
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
              mt: multiline ? "0.1875rem" : 0,
              color: secondaryText,
              "& svg": {
                width: iconSizes.small,
                height: iconSizes.small,
                display: "block",
              },
            }}
          >
            {icon}
          </Box>
        )}
        <Typography
          variant="body2"
          sx={{
            flex: 1,
            color: value
              ? isDisabled
                ? formStates.disabled.content
                : primaryText
              : placeholderText,
            lineHeight: multiline ? 1.7 : 1,
          }}
        >
          {value ?? placeholder}
        </Typography>
        {endIcon && (
          <Box
            aria-hidden="true"
            sx={{
              width: iconSizes.small,
              height: iconSizes.small,
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
              color: secondaryText,
              "& svg": {
                width: iconSizes.small,
                height: iconSizes.small,
                display: "block",
              },
            }}
          >
            {endIcon}
          </Box>
        )}
      </Box>
      {helper && (
        <Box
          sx={{
            color: state === "default" || state === "disabled" ? secondaryText : feedbackColor,
          }}
        >
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
    </Box>
  );
}

function ChoicePreview({ type, error = false }: { type: "checkbox" | "radio"; error?: boolean }) {
  const { borders, primaryText, secondaryText, surface, accent, semantic } =
    useSemanticColors();
  const isRadio = type === "radio";

  return (
    <Box sx={{ display: "grid", gap: spacing.sm }}>
      {["Standard", "Priority"].map((label, index) => {
        const selected = !error && index === 0;

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
              backgroundColor: "transparent",
            }}
          >
            <Box
              aria-hidden="true"
              sx={{
                width: formTokens.choice.size,
                height: formTokens.choice.size,
                display: "grid",
                placeItems: "center",
                border: `${borderWidths.default} solid ${
                  error ? semantic.error : selected ? accent : borders.default
                }`,
                borderRadius: isRadio ? radius.circle : radius.small,
                backgroundColor: surface,
              }}
            >
              {selected && isRadio ? (
                <Box
                  sx={{
                    width: formTokens.choice.indicatorSize + 4,
                    height: formTokens.choice.indicatorSize + 4,
                    borderRadius: radius.circle,
                    backgroundColor: accent,
                  }}
                />
              ) : selected ? (
                <Box
                  sx={{
                    width: formTokens.choice.indicatorSize + 4,
                    height: formTokens.choice.indicatorSize + 4,
                    borderRadius: radius.small,
                    backgroundColor: accent,
                  }}
                />
              ) : null}
            </Box>
            <Box sx={{ display: "grid", gap: 0.25, pt: "0.0625rem" }}>
              <Typography variant="body2" sx={{ color: primaryText, fontWeight: 700 }}>
                {label}
              </Typography>
              <Typography variant="caption" sx={{ color: secondaryText, lineHeight: 1.4 }}>
                {isRadio ? "Select one option" : "Can be combined with other choices"}
              </Typography>
            </Box>
          </Box>
        );
      })}
      {error && (
        <Box sx={{ color: semantic.error }}>
          <Typography variant="caption" sx={{ color: "inherit" }}>
            Select at least one option.
          </Typography>
        </Box>
      )}
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
  const { surface, primaryText, secondaryText, placeholderText, formStates, formFocusRing } =
    useSemanticColors();
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
          border: `${borderWidths.default} solid ${formStates.focus.border}`,
          borderRadius: radius.medium,
          backgroundColor: surface,
          boxShadow: formFocusRing,
          "&:focus-within": {
            borderColor: formStates.focus.border,
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
              color: placeholderText,
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
  const { surface, primaryText, secondaryText, placeholderText, semantic, formStates } =
    useSemanticColors();
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
            isInvalid ? formStates.error.border : formStates.default.border
          }`,
          borderRadius: radius.medium,
          backgroundColor: surface,
          "&:focus-within": {
            borderColor: isInvalid
              ? formStates.error.border
              : formStates.focus.border,
          },
        }}
      >
        <Mail
          size={iconSizes.small}
          color={isInvalid ? semantic.error : secondaryText}
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
              color: placeholderText,
              opacity: 1,
            },
          }}
        />
      </Box>
      <Box
        id={helperId}
        sx={{
          color: isInvalid ? semantic.error : secondaryText,
        }}
      >
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

const layoutPlaygroundOptions = [
  {
    value: "contact",
    label: "Contact",
    description: "Best for a short workflow with required fields and validation feedback.",
  },
  {
    value: "customer",
    label: "Customer",
    description: "Shows grouped business fields with a select and action row.",
  },
  {
    value: "settings",
    label: "Settings",
    description: "Shows toggles, checkbox choices and radio choices in one flow.",
  },
] as const;

function LayoutPlayground() {
  const { borders, secondaryText, subtleBackground } = useSemanticColors();
  const [activeLayout, setActiveLayout] =
    useState<(typeof layoutPlaygroundOptions)[number]["value"]>("contact");
  const activeOption = layoutPlaygroundOptions.find((option) => option.value === activeLayout);

  return (
    <Surface elevated sx={{ display: "grid", gap: spacing.md }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr auto" },
          gap: spacing.md,
          alignItems: "start",
        }}
      >
        <Box>
          <CardTitle>Interactive layout playground</CardTitle>
          <Text tone="secondary" variant="body2" sx={{ mt: spacing.xs }}>
            Choose one form pattern at a time. This keeps the section readable while the
            examples stay clickable and editable.
          </Text>
        </Box>

        <Tabs
          ariaLabel="Form layout examples"
          items={layoutPlaygroundOptions}
          value={activeLayout}
          onValueChange={setActiveLayout}
          sx={{
            justifySelf: { xs: "start", md: "end" },
          }}
        />
      </Box>

      <Box
        sx={{
          p: spacing.md,
          border: `${borderWidths.default} solid ${borders.subtle}`,
          borderRadius: radius.large,
          backgroundColor: subtleBackground,
        }}
      >
        <Text tone="secondary" variant="body2">
          {activeOption?.description}
        </Text>
      </Box>

      <Box
        sx={{
          display: "grid",
          placeItems: "stretch",
          p: 0,
        }}
      >
        {activeLayout === "contact" && <ContactForm />}
        {activeLayout === "customer" && <CustomerForm />}
        {activeLayout === "settings" && <SettingsForm />}
      </Box>

      <Text tone="secondary" variant="caption" sx={{ color: secondaryText }}>
        Tip: switch between the patterns and interact with the fields, choices and actions.
      </Text>
    </Surface>
  );
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

  if (code.includes("errorText")) {
    return <InteractiveValidationPreview />;
  }

  if (code.includes("gridTemplateColumns")) {
    return <InteractiveFormLayoutPreview />;
  }

  return <InteractiveInputPreview />;
}

export default function FormsPage() {
  const { accent, formStates } = useSemanticColors();
  const stateRows = getStateRows(formStates);

  return (
    <Page pageId="forms" sections={sections} maxWidth={pageLayoutTokens.wideContentMaxWidth}>
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
            description="Use consistent height, borders, label spacing and muted leading icons."
          >
            <Box sx={{ display: "grid", gap: spacing.md, width: "100%" }}>
              <FieldPreview
                label="Customer"
                required
                placeholder="Search customer"
                icon={<User size={iconSizes.small} />}
              />
              <FieldPreview
                label="Status"
                value="Active"
                state="success"
                helper="Status is available for this workflow."
                endIcon={<ChevronDown size={iconSizes.small} />}
              />
            </Box>
          </ExampleCard>

          <ExampleCard
            title="Textarea"
            description="Use a larger field for comments, notes and descriptions."
          >
            <FieldPreview
              label="Internal note"
              placeholder="Add context for the implementation team."
              helper="Keep notes short and relevant."
              multiline
              icon={<TextCursorInput size={iconSizes.small} />}
            />
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
          {stateExamples.map((item) => (
            <StateCard
              key={item.title}
              title={item.title}
              description={item.description}
              state={item.state === "focus" ? "focus" : undefined}
            >
              <FieldPreview
                label={item.label}
                value={"value" in item ? item.value : undefined}
                placeholder={"placeholder" in item ? item.placeholder : undefined}
                state={item.state}
                helper={"helper" in item ? item.helper : undefined}
              />
            </StateCard>
          ))}
        </Box>
      </Section>

      <Section
        id="choice-controls"
        title="Choice controls"
        description="Checkboxes and radio buttons use the same sizing, spacing and validation language."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: spacing.md,
          }}
        >
          <ExampleCard
            title="Checkboxes"
            description="Use checkboxes for independent choices that can be combined."
          >
            <ChoicePreview type="checkbox" />
          </ExampleCard>
          <ExampleCard
            title="Checkbox error"
            description="Show an error when a required confirmation is missing."
          >
            <ChoicePreview type="checkbox" error />
          </ExampleCard>
          <ExampleCard
            title="Radio buttons"
            description="Use radio buttons when users must choose one option."
          >
            <ChoicePreview type="radio" />
          </ExampleCard>
          <ExampleCard
            title="Radio error"
            description="Show the same error language for radio groups."
          >
            <ChoicePreview type="radio" error />
          </ExampleCard>
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
        <LayoutPlayground />
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
        <InfoBanner
          title="Keep every field understandable"
          footer={
            <>
              <TokenCode>{"<label>"}</TokenCode>
              <TokenCode>{"aria-describedby"}</TokenCode>
              <TokenCode>{"aria-invalid"}</TokenCode>
              <TokenCode>{"autocomplete"}</TokenCode>
            </>
          }
        >
          Labels, helper text and errors should be programmatically connected to the field. The
          visual state and the semantic state need to tell the same story.
        </InfoBanner>

        <Card sx={{ mt: spacing.md }}>
          <CardTitle sx={{ mb: spacing.sm }}>Accessibility checklist</CardTitle>
          <GuidelineList items={accessibilityGuidelines} />
        </Card>
      </Section>
    </Page>
  );
}
