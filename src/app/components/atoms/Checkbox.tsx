"use client";

import { Box, type BoxProps } from "@mui/material";
import { borderWidths, formTokens, radius } from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

interface CheckboxProps extends Omit<BoxProps<"input">, "component" | "type"> {
  checked?: boolean;
  error?: boolean;
}

export default function Checkbox({ checked, error = false, disabled, sx, ...props }: CheckboxProps) {
  const { accent, borders, surface, semantic } = useDocumentationStyles();
  const borderColor = error ? semantic.error : checked ? accent : borders.default;

  return (
    <Box sx={{ position: "relative", width: formTokens.choice.size, height: formTokens.choice.size, flexShrink: 0 }}>
      <Box
        component="input"
        type="checkbox"
        checked={checked}
        disabled={disabled}
        aria-invalid={error || undefined}
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
          border: `${borderWidths.default} solid ${borderColor}`,
          borderRadius: radius.small,
          backgroundColor: surface,
          opacity: disabled ? formTokens.choice.disabledOpacity : 1,
          pointerEvents: "none",
          transition: "border-color 160ms ease, background-color 160ms ease",
        }}
      >
        {checked && (
          <Box
            sx={{
              width: formTokens.choice.indicatorSize + 4,
              height: formTokens.choice.indicatorSize + 4,
              borderRadius: radius.small,
              backgroundColor: accent,
            }}
          />
        )}
      </Box>
    </Box>
  );
}
