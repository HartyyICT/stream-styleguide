"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import Button from "../buttons/Button";

interface CopyActionProps {
  value: string;
  label?: string;
}

export default function CopyAction({ value, label = "Copy" }: CopyActionProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <Button
      variant="secondary"
      size="sm"
      startIcon={copied ? <Check /> : <Copy />}
      onClick={handleCopy}
    >
      {copied ? "Copied" : label}
    </Button>
  );
}
