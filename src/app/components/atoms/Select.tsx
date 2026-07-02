"use client";

import { Box, type BoxProps } from "@mui/material";
import { ChevronDown } from "lucide-react";
import { borderWidths, formTokens, iconSizes, radius } from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

type SelectState = "default" | "success" | "warning" | "info" | "error";

interface SelectProps extends Omit<BoxProps<"select">, "component"> {
  error?: boolean;
  state?: SelectState;
}

export default function Select({
  error = false,
  state = "default",
  disabled,
  children,
  sx,
  ...props
}: SelectProps) {
  const { surface, primaryText, secondaryText, formStates, formFocusRing } =
    useDocumentationStyles();
  const activeState = error ? "error" : state;
  const stateToken = formStates[activeState];
  const borderColor = stateToken.border;
  const disabledToken = formStates.disabled;

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box
        component="select"
        disabled={disabled}
        aria-invalid={error || undefined}
        {...props}
        sx={{
          width: "100%",
          height: formTokens.field.height,
          minHeight: formTokens.field.minHeight,
          boxSizing: "border-box",
          appearance: "none",
          px: formTokens.field.paddingX,
          py: formTokens.field.paddingY,
          pr: formTokens.field.selectIconPaddingRight,
          color: disabled ? disabledToken.content : primaryText,
          border: `${borderWidths.default} solid ${borderColor}`,
          borderRadius: radius.medium,
          backgroundColor: disabled ? disabledToken.background : surface,
          font: "inherit",
          fontSize: formTokens.field.fontSize,
          lineHeight: formTokens.field.lineHeight,
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
          ...sx,
        }}
      >
        {children}
      </Box>
      <ChevronDown
        size={iconSizes.small}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          right: formTokens.field.selectIconOffsetInline,
          transform: "translateY(-50%)",
          pointerEvents: "none",
          color: disabled ? disabledToken.content : secondaryText,
        }}
      />
    </Box>
  );
}
