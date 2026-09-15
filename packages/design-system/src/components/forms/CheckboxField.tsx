"use client";

import { Box, Typography, type BoxProps } from "@mui/material";
import Checkbox from "./Checkbox";
import ErrorText from "./ErrorText";
import { spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

interface CheckboxFieldProps extends Omit<BoxProps, "onChange"> {
  label: string;
  description?: string;
  errorText?: string;
  name: string;
  checked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export default function CheckboxField({
  label,
  description,
  errorText,
  name,
  checked,
  disabled = false,
  onCheckedChange,
  sx,
  ...props
}: CheckboxFieldProps) {
  const { primaryText, secondaryText } = useSemanticColors();

  return (
    <Box
      {...props}
      sx={{
        display: "grid",
        gap: spacing.xs,
        ...sx,
      }}
    >
      <Box
        component="label"
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: spacing.sm,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        <Checkbox
          name={name}
          checked={checked}
          disabled={disabled}
          error={Boolean(errorText)}
          onChange={(event) => onCheckedChange?.(event.currentTarget.checked)}
        />
        <Box sx={{ display: "grid", gap: 0.25, pt: "0.0625rem" }}>
          <Typography
            variant="body2"
            sx={{ color: primaryText, fontWeight: 700, lineHeight: 1.35 }}
          >
            {label}
          </Typography>
          {description && (
            <Typography variant="caption" sx={{ color: secondaryText, lineHeight: 1.4 }}>
              {description}
            </Typography>
          )}
        </Box>
      </Box>
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </Box>
  );
}
