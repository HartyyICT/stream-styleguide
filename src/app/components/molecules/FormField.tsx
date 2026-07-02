"use client";

import { Box, type BoxProps } from "@mui/material";
import type { ComponentProps } from "react";
import Input from "@/app/components/atoms/Input";
import Label from "@/app/components/atoms/Label";
import HelperText from "@/app/components/atoms/HelperText";
import ErrorText from "@/app/components/atoms/ErrorText";
import { formTokens } from "@/app/theme/tokens";

type NativeInputProps = ComponentProps<typeof Input>;
type FieldState = "default" | "success" | "warning" | "info" | "error";

interface FormFieldProps extends Omit<BoxProps, "onChange"> {
  label: string;
  name: string;
  helperText?: string;
  errorText?: string;
  state?: FieldState;
  required?: boolean;
  inputProps?: NativeInputProps;
}

export default function FormField({
  label,
  name,
  helperText,
  errorText,
  state = "default",
  required = false,
  inputProps,
  sx,
  ...props
}: FormFieldProps) {
  const helperId = helperText ? `${name}-helper` : undefined;
  const errorId = errorText ? `${name}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;
  const activeState = errorText ? "error" : state;

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
        state={activeState}
        error={Boolean(errorText)}
        aria-describedby={describedBy}
        {...inputProps}
      />
      {helperText && !errorText && (
        <HelperText id={helperId} tone={activeState === "default" ? "default" : activeState}>
          {helperText}
        </HelperText>
      )}
      {errorText && <ErrorText id={errorId}>{errorText}</ErrorText>}
    </Box>
  );
}
