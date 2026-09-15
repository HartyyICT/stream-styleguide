"use client";

import { Checkbox as MuiCheckbox, type CheckboxProps as MuiCheckboxProps } from "@mui/material";

export interface CheckboxProps extends Omit<MuiCheckboxProps, "color"> {
  error?: boolean;
}

export default function Checkbox({ error = false, ...props }: CheckboxProps) {
  return <MuiCheckbox color={error ? "error" : "default"} {...props} />;
}
