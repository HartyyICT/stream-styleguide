"use client";

import { Box, type BoxProps } from "@mui/material";
import { borderWidths, colors, formTokens, radius } from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

interface RadioProps extends Omit<BoxProps<"input">, "component" | "type"> {
  checked?: boolean;
}

export default function Radio({ checked, disabled, sx, ...props }: RadioProps) {
  const { accent, borders, surface } = useDocumentationStyles();

  return (
    <Box sx={{ position: "relative", width: formTokens.choice.size, height: formTokens.choice.size, flexShrink: 0 }}>
      <Box
        component="input"
        type="radio"
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
          borderRadius: radius.circle,
          backgroundColor: checked ? accent : surface,
          opacity: disabled ? formTokens.choice.disabledOpacity : 1,
          pointerEvents: "none",
        }}
      >
        {checked && (
          <Box
            sx={{
              width: formTokens.choice.indicatorSize,
              height: formTokens.choice.indicatorSize,
              borderRadius: radius.circle,
              backgroundColor: colors.semantic.surface,
            }}
          />
        )}
      </Box>
    </Box>
  );
}
