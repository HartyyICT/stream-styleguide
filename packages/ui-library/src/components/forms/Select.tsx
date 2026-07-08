"use client";

import { Select as MuiSelect, type SelectProps as MuiSelectProps } from "@mui/material";

export type SelectState = "default" | "success" | "warning" | "info" | "error";

export interface SelectProps extends Omit<MuiSelectProps<string>, "variant" | "native"> {
  state?: SelectState;
}

export default function Select({
  state = "default",
  error = false,
  fullWidth = true,
  ...props
}: SelectProps) {
  return (
    <MuiSelect<string>
      native
      variant="outlined"
      fullWidth={fullWidth}
      error={error || state === "error"}
      {...props}
    />
  );
}
