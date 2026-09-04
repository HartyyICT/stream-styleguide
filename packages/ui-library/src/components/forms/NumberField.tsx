"use client";

import type { BoxProps } from "@mui/material";
import {
  useMemo,
  useState,
  type ChangeEvent,
  type FocusEvent,
} from "react";
import Input, { type InputProps } from "./Input";
import FieldShell from "./FieldShell";

export type NumberFieldMode = "integer" | "decimal";

export interface NumberFieldProps {
  label: string;
  name: string;
  value?: string | number | null;
  onValueChange: (canonicalValue: string) => void;
  mode?: NumberFieldMode;
  locale?: string;
  allowNegative?: boolean;
  maximumFractionDigits?: number;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  inputProps?: Omit<
    InputProps,
    "id" | "name" | "value" | "defaultValue" | "onChange" | "type" | "error"
  >;
  sx?: BoxProps["sx"];
}

function getNumberSeparators(locale: string) {
  const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);

  return {
    decimal: parts.find((part) => part.type === "decimal")?.value ?? ".",
    group: parts.find((part) => part.type === "group")?.value ?? ",",
  };
}

function normalizeNumberInput(
  input: string,
  decimalSeparator: string,
  groupSeparator: string,
  mode: NumberFieldMode,
  allowNegative: boolean,
  maximumFractionDigits: number,
) {
  let normalized = input
    .replaceAll(groupSeparator, "")
    .replace(/\s/g, "")
    .replaceAll(decimalSeparator, ".")
    .replace(/[^0-9.-]/g, "");
  const negative = allowNegative && normalized.startsWith("-");

  normalized = normalized.replaceAll("-", "");

  const hasDecimal = mode === "decimal" && normalized.includes(".");
  const [integer = "", ...fractionParts] = normalized.split(".");
  const fraction = fractionParts.join("").slice(0, maximumFractionDigits);
  const body = mode === "decimal" && hasDecimal ? `${integer}.${fraction}` : integer;

  return `${negative ? "-" : ""}${body}`;
}

function formatNumber(
  value: string,
  locale: string,
  mode: NumberFieldMode,
  maximumFractionDigits: number,
) {
  if (!value || value === "-" || value === "." || value === "-.") {
    return value;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return value;
  }

  const fractionDigits = mode === "decimal" ? Math.min(value.split(".")[1]?.length ?? 0, maximumFractionDigits) : 0;

  return new Intl.NumberFormat(locale, {
    useGrouping: true,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: mode === "decimal" ? maximumFractionDigits : 0,
  }).format(parsed);
}

export default function NumberField({
  label,
  name,
  value = "",
  onValueChange,
  mode = "decimal",
  locale = "en-US",
  allowNegative = false,
  maximumFractionDigits = 2,
  required = false,
  helperText,
  errorText,
  inputProps,
  sx,
}: NumberFieldProps) {
  const separators = useMemo(() => getNumberSeparators(locale), [locale]);
  const canonicalValue = value === null || value === undefined ? "" : String(value);
  const [typedValue, setTypedValue] = useState<string | null>(null);
  const displayValue =
    typedValue ?? formatNumber(canonicalValue, locale, mode, maximumFractionDigits);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const normalized = normalizeNumberInput(
      event.target.value,
      separators.decimal,
      separators.group,
      mode,
      allowNegative,
      maximumFractionDigits,
    );

    setTypedValue(normalized.replace(".", separators.decimal));
    onValueChange(normalized);
  }

  function handleFocus(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setTypedValue(canonicalValue.replace(".", separators.decimal));
    inputProps?.onFocus?.(event);
  }

  function handleBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setTypedValue(null);
    inputProps?.onBlur?.(event);
  }

  return (
    <FieldShell
      label={label}
      name={name}
      required={required}
      helperText={helperText}
      errorText={errorText}
      sx={sx}
    >
      {(fieldProps) => (
        <Input
          {...inputProps}
          {...fieldProps}
          type="text"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          slotProps={{
            ...inputProps?.slotProps,
            htmlInput: {
              inputMode: mode === "integer" ? "numeric" : "decimal",
            },
          }}
        />
      )}
    </FieldShell>
  );
}
