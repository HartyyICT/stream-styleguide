"use client";

import { Box, type BoxProps } from "@mui/material";
import { borderWidths, formTokens, radius } from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

type TextareaState = "default" | "success" | "warning" | "info" | "error";

interface TextareaProps extends Omit<BoxProps<"textarea">, "component"> {
  error?: boolean;
  state?: TextareaState;
}

export default function Textarea({
  error = false,
  state = "default",
  disabled,
  sx,
  ...props
}: TextareaProps) {
  const { surface, primaryText, placeholderText, formStates, formFocusRing } =
    useDocumentationStyles();
  const activeState = error ? "error" : state;
  const stateToken = formStates[activeState];
  const borderColor = stateToken.border;
  const disabledToken = formStates.disabled;

  return (
    <Box
      component="textarea"
      disabled={disabled}
      aria-invalid={error || undefined}
      {...props}
      sx={{
        width: "100%",
        minWidth: 0,
        minHeight: formTokens.textarea.minHeight,
        boxSizing: "border-box",
        px: formTokens.field.paddingX,
        py: formTokens.textarea.padding,
        resize: "vertical",
        color: disabled ? disabledToken.content : primaryText,
        border: `${borderWidths.default} solid ${borderColor}`,
        borderRadius: radius.medium,
        backgroundColor: disabled ? disabledToken.background : surface,
        font: "inherit",
        fontSize: formTokens.field.fontSize,
        lineHeight: formTokens.textarea.lineHeight,
        outline: 0,
        "&:hover": !disabled
          ? {
              borderColor:
                activeState === "default" ? formStates.hover.border : borderColor,
            }
          : undefined,
        "&:focus": {
          borderColor:
            activeState === "default" ? formStates.focus.border : borderColor,
          boxShadow: formFocusRing,
        },
        "&::placeholder": {
          color: placeholderText,
          opacity: 1,
        },
        ...sx,
      }}
    />
  );
}
