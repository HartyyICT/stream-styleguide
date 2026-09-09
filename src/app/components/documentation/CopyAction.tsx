"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@ssw/ui-library";

interface CopyActionProps {
  value: string;
  label?: string;
  iconOnly?: boolean;
}

export default function CopyAction({ value, label = "Copy", iconOnly = false }: CopyActionProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  if (iconOnly) {
    return (
      <Button
        variant="tertiary"
        size="sm"
        iconOnly
        aria-label={copied ? "Copied" : label}
        title={copied ? "Copied" : label}
        onClick={handleCopy}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </Button>
    );
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
