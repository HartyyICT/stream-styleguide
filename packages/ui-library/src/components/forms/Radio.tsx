"use client";

import { Radio as MuiRadio, type RadioProps as MuiRadioProps } from "@mui/material";

export interface RadioProps extends Omit<MuiRadioProps, "color"> {
  error?: boolean;
}

export default function Radio({ error = false, ...props }: RadioProps) {
  return <MuiRadio color={error ? "error" : "default"} {...props} />;
}
