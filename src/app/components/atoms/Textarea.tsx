"use client";

import { Box, type BoxProps } from "@mui/material";
import { borderWidths, formTokens, radius } from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

interface TextareaProps extends Omit<BoxProps<"textarea">, "component"> {
  error?: boolean;
}

export default function Textarea({ error = false, disabled, sx, ...props }: TextareaProps) {
  const { surface, primaryText, secondaryText, borders } = useDocumentationStyles();

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
        color: disabled ? formTokens.states.disabled.content : primaryText,
        border: `${borderWidths.default} solid ${
          error ? formTokens.states.error.border : borders.default
        }`,
        borderRadius: radius.medium,
        backgroundColor: disabled ? formTokens.states.disabled.background : surface,
        font: "inherit",
        fontSize: formTokens.field.fontSize,
        lineHeight: formTokens.textarea.lineHeight,
        outline: 0,
        "&:hover": !disabled
          ? {
              borderColor: error ? formTokens.states.error.border : formTokens.states.hover.border,
            }
          : undefined,
        "&:focus": {
          borderWidth: borderWidths.interactive,
          borderColor: error ? formTokens.states.error.border : formTokens.states.focus.border,
          boxShadow: formTokens.field.focusRing,
        },
        "&::placeholder": {
          color: secondaryText,
          opacity: 1,
        },
        ...sx,
      }}
    />
  );
}
