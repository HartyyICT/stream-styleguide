"use client";

import type { ComponentProps } from "react";
import HelperText from "./HelperText";

type ErrorTextProps = Omit<ComponentProps<typeof HelperText>, "tone">;

export default function ErrorText({ children, sx, ...props }: ErrorTextProps) {
  return (
    <HelperText
      role="alert"
      tone="error"
      {...props}
      sx={sx}
    >
      {children}
    </HelperText>
  );
}
