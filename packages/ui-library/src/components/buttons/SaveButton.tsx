"use client";

import { Check } from "lucide-react";
import Button from "./Button";
import type { ComponentProps } from "react";

type SaveButtonProps = Omit<ComponentProps<typeof Button>, "children" | "startIcon"> & {
  label?: string;
};

export default function SaveButton({
  label = "Save changes",
  ...props
}: SaveButtonProps) {
  return (
    <Button startIcon={<Check />} {...props}>
      {label}
    </Button>
  );
}
