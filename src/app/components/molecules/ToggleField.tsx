"use client";

import { Box, Typography, type BoxProps } from "@mui/material";
import { useState } from "react";
import Toggle from "@/app/components/atoms/Toggle";
import {
  borderWidths,
  colors,
  formTokens,
  radius,
  spacing,
} from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

interface ToggleFieldProps extends Omit<BoxProps, "onChange"> {
  label: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export default function ToggleField({
  label,
  description,
  checked,
  defaultChecked = false,
  disabled = false,
  onCheckedChange,
  sx,
  ...props
}: ToggleFieldProps) {
  const { borders, surface, primaryText, secondaryText, accent } =
    useDocumentationStyles();
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : uncontrolledChecked;

  function handleCheckedChange(nextChecked: boolean) {
    if (!isControlled) {
      setUncontrolledChecked(nextChecked);
    }

    onCheckedChange?.(nextChecked);
  }

  return (
    <Box
      {...props}
      sx={{
        width: "100%",
        minHeight: formTokens.toggleField.minHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: spacing.md,
        p: spacing.md,
        border: `${borderWidths.default} solid ${borders.default}`,
        borderRadius: radius.medium,
        backgroundColor: surface,
        opacity: disabled ? formTokens.toggleField.disabledOpacity : 1,
        ...sx,
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="body2"
          sx={{
            color: disabled ? colors.neutral[400] : primaryText,
            fontWeight: 700,
          }}
        >
          {label}
        </Typography>
        {description && (
          <Typography
            variant="caption"
            sx={{
              color: disabled ? colors.neutral[400] : secondaryText,
            }}
          >
            {description}
          </Typography>
        )}
      </Box>
      <Toggle
        checked={isChecked}
        disabled={disabled}
        aria-label={label}
        onCheckedChange={handleCheckedChange}
        sx={{
          "&:focus-visible": {
            outline: `${borderWidths.focus} solid ${accent}`,
            outlineOffset: formTokens.field.focusOutlineOffset,
          },
        }}
      />
    </Box>
  );
}
