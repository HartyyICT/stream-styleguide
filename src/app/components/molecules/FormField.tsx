"use client";

import { Box, type BoxProps } from "@mui/material";
import type { ComponentProps } from "react";
import Input from "@/app/components/atoms/Input";
import Label from "@/app/components/atoms/Label";
import HelperText from "@/app/components/atoms/HelperText";
import ErrorText from "@/app/components/atoms/ErrorText";
import { formTokens } from "@/app/theme/tokens";

type NativeInputProps = ComponentProps<typeof Input>;

interface FormFieldProps extends Omit<BoxProps, "onChange"> {
  label: string;
  name: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  inputProps?: NativeInputProps;
}

export default function FormField({
  label,
  name,
  helperText,
  errorText,
  required = false,
  inputProps,
  sx,
  ...props
}: FormFieldProps) {
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
      <Input
        id={name}
        name={name}
        required={required}
        error={Boolean(errorText)}
        aria-describedby={describedBy}
        {...inputProps}
      />
      {helperText && !errorText && <HelperText id={helperId}>{helperText}</HelperText>}
      {errorText && <ErrorText id={errorId}>{errorText}</ErrorText>}
    </Box>
  );
}
