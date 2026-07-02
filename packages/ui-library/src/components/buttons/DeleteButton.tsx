"use client";

import { Trash2 } from "lucide-react";
import Button from "../Button";
import type { ComponentProps } from "react";

type DeleteButtonProps = Omit<
  ComponentProps<typeof Button>,
  "children" | "startIcon" | "variant"
> & {
  label?: string;
};

export default function DeleteButton({
  label = "Delete",
  ...props
}: DeleteButtonProps) {
  return (
    <Button variant="destructive" startIcon={<Trash2 />} {...props}>
      {label}
    </Button>
  );
}
