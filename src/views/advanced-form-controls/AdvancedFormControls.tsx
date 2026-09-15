"use client";

import { Box, Typography } from "@mui/material";
import { Card, InfoBanner, pageLayoutTokens, spacing, useSemanticColors } from "@ssw/design-system";
import {
  CodeExample,
  GuidelineList,
  Intro,
  Section,
} from "@/app/components/documentation";
import {
  AsyncComboboxExample,
  CodebookAdapterExample,
  FileUploadExample,
  MultiSelectExample,
  MultiValueInputExample,
  NumberFieldExample,
} from "@/app/components/examples";
import Page from "@/app/components/layout/Page";

const sections = [
  { label: "Overview", href: "#advanced-form-controls" },
  { label: "Combobox", href: "#combobox" },
  { label: "Multi-select", href: "#multi-select" },
  { label: "Number fields", href: "#number-fields" },
  { label: "Multiple values", href: "#multiple-values" },
  { label: "File upload", href: "#file-upload" },
  { label: "Integration", href: "#integration" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Accessibility", href: "#accessibility" },
] as const;

const comboboxCode = `<Combobox
  label="Country of destination"
  name="destination-country"
  options={countryOptions}
  value={countryCode}
  onValueChange={setCountryCode}
  onInputValueChange={searchCountries}
  loading={countriesQuery.isFetching}
  placeholder="Search by code or country"
/>`;

const multiSelectCode = `<MultiSelect
  label="Allowed procedures"
  name="allowed-procedures"
  options={procedureOptions}
  values={procedureCodes}
  onValuesChange={setProcedureCodes}
  placeholder="Select procedures"
/>`;

const numberFieldCode = `<NumberField
  label="Gross mass"
  name="gross-mass"
  value={grossMass}
  onValueChange={setGrossMass}
  locale="nl-NL"
  mode="decimal"
  maximumFractionDigits={3}
  inputProps={{ endIcon: "kg" }}
/>`;

const multiValueCode = `<MultiValueInput
  label="Document references"
  name="document-references"
  values={references}
  onValuesChange={setReferences}
  helperText="Press Enter after every reference."
/>`;

const fileUploadCode = `<FileUpload
  label="Supporting documents"
  name="supporting-documents"
  files={files}
  onFilesChange={setFiles}
  multiple
  accept=".pdf,.png,.jpg,.jpeg"
  maxFileSizeBytes={5 * 1024 * 1024}
  onRejected={handleRejectedFiles}
/>`;

const adapterCode = `function CustomsCountryField({ value, onChange, errorText }) {
  const [search, setSearch] = useState("");
  const countries = useCountryCodebook(search);
  const options = (countries.data ?? []).map((country) => ({
    value: country.code,
    label: \`\${country.code} — \${country.description}\`,
    description: country.region,
  }));

  return (
    <Combobox
      label="Country"
      name="country"
      options={options}
      value={value}
      onValueChange={(code) => onChange(code)}
      onInputValueChange={setSearch}
      loading={countries.isFetching}
      errorText={errorText ?? countries.error?.message}
    />
  );
}`;

const guidelines = [
  "Use Combobox when users need to search a fixed or remotely loaded option set.",
  "Use MultiSelect for several choices from a known list and MultiValueInput for free-form repeated values.",
  "Keep NumberField values canonical in form state and format only the displayed value for the active locale.",
  "Set accepted file types and size limits in both the interface and the upload endpoint.",
  "Keep API queries, codebook mapping and form-library adapters outside the package components.",
  "Show helper text before validation and replace it with one specific error when the value is invalid.",
] as const;

const accessibilityGuidelines = [
  "Every control has a persistent visible label connected to its input.",
  "Autocomplete options remain reachable with arrow keys and selectable with Enter.",
  "Selected values and files expose keyboard-operable remove controls.",
  "Number fields use a numeric input mode without blocking copy, paste or assistive technology.",
  "The upload dropzone also works with Enter and Space and never requires drag-and-drop.",
] as const;

export default function AdvancedFormControlsPage() {
  const { secondaryText } = useSemanticColors();

  return (
    <Page pageId="advanced-form-controls" sections={sections} maxWidth={pageLayoutTokens.dataContentMaxWidth}>
      <Intro
        title="Advanced form controls"
        description="Advanced controls support searchable codebooks, multiple selections, locale-aware numbers, repeated free-form values and document uploads while keeping application data and services outside the UI package."
        note="Use an advanced control only when a standard input or select cannot represent the task clearly. The package handles interaction and accessibility while the application keeps data fetching, validation and payload mapping."
      />

      <Section
        id="combobox"
        title="Combobox"
        description="This is the standalone package component. It stores a stable option value while displaying a searchable label and optional description."
        divider={false}
      >
        <CodeExample title="Controlled searchable selection" code={comboboxCode} preview={<AsyncComboboxExample />} previewMinHeight={230} />
      </Section>

      <Section
        id="multi-select"
        title="Multi-select"
        description="Use MultiSelect when users can select several values from the same controlled option set. Selected labels remain removable and the parent receives only their stable values."
      >
        <CodeExample title="Multiple codebook values" code={multiSelectCode} preview={<MultiSelectExample />} previewMinHeight={230} />
      </Section>

      <Section
        id="number-fields"
        title="Number fields"
        description="NumberField displays grouping and decimal separators for the selected locale while onValueChange always emits a canonical dot-decimal string for form state and API payloads."
      >
        <CodeExample title="Decimal and integer values" code={numberFieldCode} preview={<NumberFieldExample />} previewMinHeight={250} />
      </Section>

      <Section
        id="multiple-values"
        title="Multiple values"
        description="MultiValueInput accepts repeated free-form values. Users can add values with Enter, remove individual chips or paste comma-, semicolon- and line-separated lists."
      >
        <CodeExample title="Document references" code={multiValueCode} preview={<MultiValueInputExample />} previewMinHeight={230} />
      </Section>

      <Section
        id="file-upload"
        title="File upload"
        description="FileUpload supports clicking, keyboard activation and drag-and-drop. The parent owns the selected files and decides how rejected or uploaded files are processed."
      >
        <CodeExample title="Supporting documents" code={fileUploadCode} preview={<FileUploadExample />} previewMinHeight={360} />
      </Section>

      <Section
        id="integration"
        title="Application integration"
        description="This example shows the CustomsApp-specific layer around the package component: codebook records are mapped to options, query states become field states and only the canonical code enters the payload."
      >
        <Box sx={{ display: "grid", gap: spacing.lg }}>
          <CodeExample title="CustomsApp codebook adapter" code={adapterCode} preview={<CodebookAdapterExample />} previewMinHeight={390} />
          <InfoBanner title="Package boundary">
            The package owns labels, states, interaction and accessibility. CustomsApp owns fetching, caching, schema validation and payload mapping.
          </InfoBanner>
        </Box>
      </Section>

      <Section
        id="guidelines"
        title="Guidelines"
        description="Choose the control from the shape of the value instead of styling several controls to look interchangeable."
      >
        <GuidelineList items={guidelines} />
      </Section>

      <Section
        id="accessibility"
        title="Accessibility"
        description="Advanced controls must retain ordinary keyboard, label and validation behaviour."
        last
      >
        <Card>
          <Typography variant="h3" sx={{ mb: spacing.sm }}>
            Preserve native input expectations
          </Typography>
          <Typography variant="body2" sx={{ mb: spacing.lg, color: secondaryText, lineHeight: 1.7 }}>
            Search, selection and drag-and-drop are enhancements. Every task must still be possible with visible labels, keyboard controls and understandable error text.
          </Typography>
          <GuidelineList items={accessibilityGuidelines} />
        </Card>
      </Section>
    </Page>
  );
}
