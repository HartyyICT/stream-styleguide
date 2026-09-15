"use client";

import { TextField, type TextFieldProps } from "@mui/material";

export type TextareaState = "default" | "success" | "warning" | "info" | "error";

export interface TextareaProps
  extends Omit<TextFieldProps, "variant" | "select" | "multiline"> {
  state?: TextareaState;
}

const stateColor: Partial<Record<TextareaState, NonNullable<TextFieldProps["color"]>>> = {
  success: "success",
  warning: "warning",
  info: "info",
};

export default function Textarea({
  state = "default",
  error = false,
  fullWidth = true,
  minRows = 4,
  ...props
}: TextareaProps) {
  return (
    <TextField
      variant="outlined"
      multiline
      minRows={minRows}
      fullWidth={fullWidth}
      error={error}
      color={error ? undefined : stateColor[state]}
      {...props}
    />
  );
}
