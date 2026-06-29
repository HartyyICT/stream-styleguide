"use client";

import { Box, Typography, type BoxProps } from "@mui/material";
import Checkbox from "@/app/components/atoms/Checkbox";
import { spacing } from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

interface CheckboxFieldProps extends Omit<BoxProps, "onChange"> {
  label: string;
  description?: string;
  name: string;
  checked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export default function CheckboxField({
  label,
  description,
  name,
  checked,
  disabled = false,
  onCheckedChange,
  sx,
  ...props
}: CheckboxFieldProps) {
  const { primaryText, secondaryText } = useDocumentationStyles();

  return (
    <Box
      component="label"
      {...props}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: spacing.sm,
        cursor: disabled ? "not-allowed" : "pointer",
        ...sx,
      }}
    >
      <Checkbox
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={(event) => onCheckedChange?.(event.currentTarget.checked)}
      />
      <Box>
        <Typography
          variant="body2"
          sx={{ color: primaryText, fontWeight: 700, lineHeight: 1.4 }}
        >
          {label}
        </Typography>
        {description && (
          <Typography variant="caption" sx={{ color: secondaryText, lineHeight: 1.5 }}>
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
