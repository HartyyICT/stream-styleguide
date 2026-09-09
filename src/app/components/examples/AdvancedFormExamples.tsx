"use client";

import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Combobox,
  FileUpload,
  KeyValue,
  KeyValueList,
  MultiSelect,
  MultiValueInput,
  NumberField,
  spacing,
  StatusChip,
  Surface,
  type ComboboxOption,
} from "@ssw/ui-library";

interface CountryCodebookRecord {
  code: string;
  description: string;
  region: string;
}

const countryCodebook: CountryCodebookRecord[] = [
  { code: "NL", description: "Netherlands", region: "European Union" },
  { code: "BE", description: "Belgium", region: "European Union" },
  { code: "DE", description: "Germany", region: "European Union" },
  { code: "GB", description: "United Kingdom", region: "Common transit country" },
  { code: "CH", description: "Switzerland", region: "Common transit country" },
];

const countryOptions: ComboboxOption[] = countryCodebook.map((country) => ({
  value: country.code,
  label: `${country.code} — ${country.description}`,
  description: country.region,
}));

const procedureOptions: ComboboxOption[] = [
  { value: "4000", label: "40 00 — Release for free circulation" },
  { value: "4200", label: "42 00 — VAT-exempt release" },
  { value: "5100", label: "51 00 — Inward processing" },
  { value: "7100", label: "71 00 — Customs warehousing" },
];

export function AsyncComboboxExample() {
  const [value, setValue] = useState<string | null>("NL");
  const [inputValue, setInputValue] = useState("NL — Netherlands");
  const [options, setOptions] = useState(countryOptions);
  const [loading, setLoading] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function search(nextValue: string) {
    setInputValue(nextValue);
    window.clearTimeout(timer.current);
    setLoading(true);
    timer.current = window.setTimeout(() => {
      const query = nextValue.toLowerCase();
      setOptions(
        countryOptions.filter((option) =>
          `${option.label} ${option.description}`.toLowerCase().includes(query),
        ),
      );
      setLoading(false);
    }, 350);
  }

  return (
    <Combobox
      label="Country of destination"
      name="destination-country"
      options={options}
      value={value}
      inputValue={inputValue}
      onValueChange={setValue}
      onInputValueChange={(nextValue, reason) => {
        if (reason === "input" || reason === "clear") search(nextValue);
        else setInputValue(nextValue);
      }}
      loading={loading}
      placeholder="Search by code or country"
      helperText="Options can be supplied by a CustomsApp codebook query."
    />
  );
}

export function CodebookAdapterExample() {
  const [value, setValue] = useState<string | null>("DE");
  const [inputValue, setInputValue] = useState("DE — Germany");
  const [status, setStatus] = useState<"ready" | "loading" | "error">("ready");
  const timer = useRef<number | undefined>(undefined);
  const selectedCountry = countryCodebook.find((country) => country.code === value);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function reloadCodebook() {
    window.clearTimeout(timer.current);
    setStatus("loading");
    timer.current = window.setTimeout(() => setStatus("ready"), 700);
  }

  function toggleError() {
    window.clearTimeout(timer.current);
    setStatus((current) => (current === "error" ? "ready" : "error"));
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.15fr) minmax(16rem, 0.85fr)" },
        gap: spacing.md,
        alignItems: "start",
      }}
    >
      <Surface sx={{ display: "grid", gap: spacing.lg }}>
        <Typography variant="h3">CustomsApp field adapter</Typography>
        <Combobox
          label="Country"
          name="country"
          options={status === "error" ? [] : countryOptions}
          value={value}
          inputValue={inputValue}
          onValueChange={(nextValue, option) => {
            setValue(nextValue);
            setInputValue(option?.label ?? "");
          }}
          onInputValueChange={(nextValue, reason) => {
            if (reason === "input" || reason === "clear") setInputValue(nextValue);
          }}
          loading={status === "loading"}
          errorText={status === "error" ? "Country codebook could not be loaded." : undefined}
          placeholder="Search the country codebook"
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: spacing.sm }}>
          <Button variant="secondary" size="sm" onClick={reloadCodebook}>
            Reload codebook
          </Button>
          <Button variant="tertiary" size="sm" onClick={toggleError}>
            {status === "error" ? "Clear error" : "Simulate error"}
          </Button>
        </Box>
      </Surface>

      <Surface subtle sx={{ display: "grid", gap: spacing.lg }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: spacing.sm }}>
          <Typography variant="h3">Adapter output</Typography>
          <StatusChip
            status={status}
            color={status === "ready" ? "success" : status === "error" ? "error" : "info"}
          />
        </Box>
        <KeyValueList>
          <KeyValue label="Query" value="CountryCodebook" />
          <KeyValue label="Selected code" value={value} />
          <KeyValue label="Display label" value={selectedCountry?.description} />
          <KeyValue label="Payload" value={value ? `{ country: \"${value}\" }` : "null"} />
        </KeyValueList>
      </Surface>
    </Box>
  );
}

export function MultiSelectExample() {
  const [values, setValues] = useState<string[]>(["4000", "5100"]);

  return (
    <MultiSelect
      label="Allowed procedures"
      name="allowed-procedures"
      options={procedureOptions}
      values={values}
      onValuesChange={setValues}
      placeholder="Select procedures"
      helperText="Search and select one or more fixed options."
    />
  );
}

export function NumberFieldExample() {
  const [weight, setWeight] = useState("1234.5");
  const [packages, setPackages] = useState("24");

  return (
    <Box sx={{ width: "100%", display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, gap: spacing.md }}>
      <NumberField
        label="Gross mass"
        name="gross-mass"
        value={weight}
        onValueChange={setWeight}
        locale="nl-NL"
        mode="decimal"
        maximumFractionDigits={3}
        helperText={`Canonical value: ${weight || "empty"}`}
        inputProps={{ endIcon: "kg" }}
      />
      <NumberField
        label="Number of packages"
        name="number-of-packages"
        value={packages}
        onValueChange={setPackages}
        locale="nl-NL"
        mode="integer"
        helperText={`Canonical value: ${packages || "empty"}`}
      />
    </Box>
  );
}

export function MultiValueInputExample() {
  const [values, setValues] = useState(["NL123456789B01", "DE987654321"]);

  return (
    <MultiValueInput
      label="Document references"
      name="document-references"
      values={values}
      onValuesChange={setValues}
      placeholder="Type a reference and press Enter"
      helperText="Paste comma-, semicolon- or line-separated values to add several references."
    />
  );
}

export function FileUploadExample() {
  const [files, setFiles] = useState<File[]>([]);
  const [rejected, setRejected] = useState(false);

  return (
    <Box sx={{ width: "100%", display: "grid", gap: spacing.md }}>
      {rejected && (
        <Alert
          severity="error"
          title="File not accepted"
          text="Choose a supported image or PDF smaller than 5 MB."
          dismissible
          onClose={() => setRejected(false)}
        />
      )}
      <FileUpload
        label="Supporting documents"
        name="supporting-documents"
        files={files}
        onFilesChange={setFiles}
        multiple
        accept=".pdf,.png,.jpg,.jpeg"
        maxFileSizeBytes={5 * 1024 * 1024}
        onRejected={() => setRejected(true)}
        description="PDF, PNG or JPG up to 5 MB"
        helperText="Files remain controlled by the parent form."
      />
    </Box>
  );
}
