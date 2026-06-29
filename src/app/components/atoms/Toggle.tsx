"use client";

import { ButtonBase, type ButtonBaseProps } from "@mui/material";
import { useState } from "react";
import {
  borderWidths,
  colors,
  formTokens,
  radius,
} from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

interface ToggleProps extends Omit<ButtonBaseProps, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export default function Toggle({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  sx,
  ...props
}: ToggleProps) {
  const { accent } = useDocumentationStyles();
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : uncontrolledChecked;

  function toggleChecked() {
    if (disabled) {
      return;
    }

    const nextChecked = !isChecked;

    if (!isControlled) {
      setUncontrolledChecked(nextChecked);
    }

    onCheckedChange?.(nextChecked);
  }

  return (
    <ButtonBase
      component="button"
      type="button"
      role="switch"
      aria-checked={isChecked}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={toggleChecked}
      {...props}
      sx={{
        width: formTokens.toggle.width,
        height: formTokens.toggle.height,
        p: formTokens.toggle.padding,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexShrink: 0,
        border: 0,
        borderRadius: radius.pill,
        backgroundColor: isChecked ? accent : colors.neutral[300],
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? formTokens.toggle.disabledOpacity : 1,
        transition: "background-color 160ms ease, opacity 160ms ease",
        "&:focus-visible": {
          outline: `${borderWidths.focus} solid ${accent}`,
          outlineOffset: 2,
        },
        ...sx,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: formTokens.toggle.thumbSize,
          height: formTokens.toggle.thumbSize,
          display: "block",
          borderRadius: radius.extraLarge,
          backgroundColor: colors.semantic.surface,
          transform: isChecked ? `translateX(${formTokens.toggle.thumbOffset})` : "translateX(0)",
          transition: "transform 160ms ease",
        }}
      />
    </ButtonBase>
  );
}
