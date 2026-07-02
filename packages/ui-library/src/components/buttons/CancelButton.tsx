"use client";

import Button from "../Button";
import type { ComponentProps } from "react";

type CancelButtonProps = Omit<
  ComponentProps<typeof Button>,
  "children" | "variant"
> & {
  label?: string;
};

export default function CancelButton({
  label = "Cancel",
  ...props
}: CancelButtonProps) {
  return (
    <Button variant="secondary" {...props}>
      {label}
    </Button>
  );
}
