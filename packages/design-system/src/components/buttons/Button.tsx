"use client";

import { Button as MuiButton, type ButtonProps as MuiButtonProps } from "@mui/material";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "icon"
  | "destructive";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<MuiButtonProps, "variant" | "size"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconOnly?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  iconOnly = false,
  sx,
  ...props
}: ButtonProps) {
  return (
    <MuiButton
      variant={variant}
      size={size}
      sx={[
        iconOnly ? { minWidth: 0, px: 0, aspectRatio: "1 / 1" } : {},
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    />
  );
}
