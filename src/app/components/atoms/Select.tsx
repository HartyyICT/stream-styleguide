"use client";

import { Box, type BoxProps } from "@mui/material";
import { ChevronDown } from "lucide-react";
import { borderWidths, formTokens, iconSizes, radius } from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

interface SelectProps extends Omit<BoxProps<"select">, "component"> {
  error?: boolean;
}

export default function Select({ error = false, disabled, children, sx, ...props }: SelectProps) {
  const { surface, primaryText, borders } = useDocumentationStyles();

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
          pr: 5,
          color: disabled ? formTokens.states.disabled.content : primaryText,
          border: `${borderWidths.default} solid ${
            error ? formTokens.states.error.border : borders.default
          }`,
          borderRadius: radius.medium,
          backgroundColor: disabled ? formTokens.states.disabled.background : surface,
          font: "inherit",
          fontSize: formTokens.field.fontSize,
          lineHeight: formTokens.field.lineHeight,
          outline: 0,
          "&:focus": {
            borderWidth: borderWidths.interactive,
            borderColor: error ? formTokens.states.error.border : formTokens.states.focus.border,
            boxShadow: formTokens.field.focusRing,
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
          right: 16,
          transform: "translateY(-50%)",
          pointerEvents: "none",
          color: disabled ? formTokens.states.disabled.content : primaryText,
        }}
      />
    </Box>
  );
}
