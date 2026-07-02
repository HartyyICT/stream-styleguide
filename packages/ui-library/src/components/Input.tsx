"use client";

import { InputAdornment, TextField, type TextFieldProps } from "@mui/material";
import type { ReactNode } from "react";

export type InputState = "default" | "success" | "warning" | "info" | "error";

export interface InputProps extends Omit<TextFieldProps, "variant" | "select"> {
  state?: InputState;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const stateColor: Partial<Record<InputState, NonNullable<TextFieldProps["color"]>>> = {
  success: "success",
  warning: "warning",
  info: "info",
};

export default function Input({
  state = "default",
  error = false,
  startIcon,
  endIcon,
  fullWidth = true,
  slotProps,
  ...props
}: InputProps) {
  return (
    <TextField
      variant="outlined"
      fullWidth={fullWidth}
      error={error}
      color={error ? undefined : stateColor[state]}
      slotProps={{
        ...slotProps,
        input: {
          startAdornment: startIcon ? (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ) : undefined,
          endAdornment: endIcon ? (
            <InputAdornment position="end">{endIcon}</InputAdornment>
          ) : undefined,
          ...slotProps?.input,
        },
      }}
      {...props}
    />
  );
}
