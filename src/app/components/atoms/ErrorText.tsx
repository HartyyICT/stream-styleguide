"use client";

import HelperText from "@/app/components/atoms/HelperText";
import type { ComponentProps } from "react";

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
