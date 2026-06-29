"use client";

import { Box, type BoxProps } from "@mui/material";
import type { ComponentProps } from "react";
import Select from "@/app/components/atoms/Select";
import Label from "@/app/components/atoms/Label";
import HelperText from "@/app/components/atoms/HelperText";
import ErrorText from "@/app/components/atoms/ErrorText";
import { formTokens } from "@/app/theme/tokens";

type NativeSelectProps = ComponentProps<typeof Select>;

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps extends Omit<BoxProps, "onChange"> {
  label: string;
  name: string;
  options: SelectOption[];
  helperText?: string;
  errorText?: string;
  required?: boolean;
  selectProps?: NativeSelectProps;
}

export default function SelectField({
  label,
  name,
  options,
  helperText,
  errorText,
  required = false,
  selectProps,
  sx,
  ...props
}: SelectFieldProps) {
  const helperId = helperText ? `${name}-helper` : undefined;
  const errorId = errorText ? `${name}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <Box
      {...props}
      sx={{
        display: "grid",
        gridTemplateRows: `${formTokens.label.rowHeight} auto minmax(${formTokens.label.rowHeight}, auto)`,
        gap: formTokens.label.gap,
        alignSelf: "start",
        ...sx,
      }}
    >
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <Select
        id={name}
        name={name}
        required={required}
        error={Boolean(errorText)}
        aria-describedby={describedBy}
        {...selectProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {helperText && !errorText && <HelperText id={helperId}>{helperText}</HelperText>}
      {errorText && <ErrorText id={errorId}>{errorText}</ErrorText>}
    </Box>
  );
}
