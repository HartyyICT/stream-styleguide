"use client";

import { Box, type BoxProps } from "@mui/material";
import type { ReactNode } from "react";
import { borderWidths, formTokens, iconSizes, radius } from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

type InputState = "default" | "success" | "warning" | "info" | "error";

interface InputProps extends Omit<BoxProps<"input">, "component"> {
  error?: boolean;
  state?: InputState;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export default function Input({
  error = false,
  state = "default",
  startIcon,
  endIcon,
  disabled,
  sx,
  ...props
}: InputProps) {
  const { surface, primaryText, secondaryText, placeholderText, formStates, formFocusRing } =
    useDocumentationStyles();
  const activeState = error ? "error" : state;
  const stateToken = formStates[activeState];
  const borderColor = stateToken.border;
  const disabledToken = formStates.disabled;

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        height: formTokens.field.height,
        minHeight: formTokens.field.minHeight,
        display: "flex",
        alignItems: "center",
        gap: formTokens.field.gap,
        boxSizing: "border-box",
        px: formTokens.field.paddingX,
        py: formTokens.field.paddingY,
        color: disabled ? disabledToken.content : primaryText,
        border: `${borderWidths.default} solid ${borderColor}`,
        borderRadius: radius.medium,
        backgroundColor: disabled ? disabledToken.background : surface,
        outline: 0,
        "&:hover": !disabled
          ? {
              borderColor:
                activeState === "default" ? formStates.hover.border : borderColor,
            }
          : undefined,
        "&:focus-within": {
          borderColor:
            activeState === "default" ? formStates.focus.border : borderColor,
          boxShadow: formFocusRing,
        },
        ...sx,
      }}
    >
      {startIcon && (
        <Box
          aria-hidden="true"
          sx={{
            width: iconSizes.small,
            height: iconSizes.small,
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            color: disabled ? disabledToken.content : secondaryText,
            "& svg": {
              width: iconSizes.small,
              height: iconSizes.small,
              display: "block",
            },
          }}
        >
          {startIcon}
        </Box>
      )}
      <Box
        component="input"
        disabled={disabled}
        aria-invalid={activeState === "error" || undefined}
        {...props}
        sx={{
          width: "100%",
          minWidth: 0,
          border: 0,
          outline: 0,
          color: "inherit",
          backgroundColor: "transparent",
          font: "inherit",
          fontSize: formTokens.field.fontSize,
          lineHeight: formTokens.field.lineHeight,
          caretColor: primaryText,
          "&:-webkit-autofill": {
            WebkitBoxShadow: `0 0 0 1000px ${surface} inset`,
            WebkitTextFillColor: primaryText,
            caretColor: primaryText,
            transition: "background-color 9999s ease-out",
          },
          "&::placeholder": {
            color: placeholderText,
            opacity: 1,
          },
        }}
      />
      {endIcon && (
        <Box
          aria-hidden="true"
          sx={{
            width: iconSizes.small,
            height: iconSizes.small,
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            color: secondaryText,
            "& svg": {
              width: iconSizes.small,
              height: iconSizes.small,
              display: "block",
            },
          }}
        >
          {endIcon}
        </Box>
      )}
    </Box>
  );
}
