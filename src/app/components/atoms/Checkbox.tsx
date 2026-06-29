"use client";

import { Box, type BoxProps } from "@mui/material";
import { Check } from "lucide-react";
import { borderWidths, colors, formTokens, iconSizes, radius } from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

interface CheckboxProps extends Omit<BoxProps<"input">, "component" | "type"> {
  checked?: boolean;
}

export default function Checkbox({ checked, disabled, sx, ...props }: CheckboxProps) {
  const { accent, borders, surface } = useDocumentationStyles();

  return (
    <Box sx={{ position: "relative", width: formTokens.choice.size, height: formTokens.choice.size, flexShrink: 0 }}>
      <Box
        component="input"
        type="checkbox"
        checked={checked}
        disabled={disabled}
        {...props}
        sx={{
          position: "absolute",
          inset: 0,
          m: 0,
          opacity: 0,
          cursor: disabled ? "not-allowed" : "pointer",
          ...sx,
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          width: formTokens.choice.size,
          height: formTokens.choice.size,
          display: "grid",
          placeItems: "center",
          border: `${borderWidths.default} solid ${checked ? accent : borders.default}`,
          borderRadius: radius.small,
          backgroundColor: checked ? accent : surface,
          opacity: disabled ? formTokens.choice.disabledOpacity : 1,
          pointerEvents: "none",
        }}
      >
        {checked && <Check size={iconSizes.small} color={colors.semantic.surface} />}
      </Box>
    </Box>
  );
}
