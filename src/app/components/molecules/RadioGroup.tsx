"use client";

import { Box, Typography, type BoxProps } from "@mui/material";
import { useState } from "react";
import Radio from "@/app/components/atoms/Radio";
import Label from "@/app/components/atoms/Label";
import { formTokens, spacing } from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

interface RadioOption {
  label: string;
  value: string;
  description?: string;
}

interface RadioGroupProps extends Omit<BoxProps, "onChange"> {
  label: string;
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export default function RadioGroup({
  label,
  name,
  options,
  value,
  defaultValue,
  onValueChange,
  sx,
  ...props
}: RadioGroupProps) {
  const { primaryText, secondaryText } = useDocumentationStyles();
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? options[0]?.value ?? "");
  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : uncontrolledValue;

  function selectValue(nextValue: string) {
    if (!isControlled) {
      setUncontrolledValue(nextValue);
    }

    onValueChange?.(nextValue);
  }

  return (
    <Box
      role="radiogroup"
      aria-label={label}
      {...props}
      sx={{
        display: "grid",
        gap: formTokens.label.gap,
        ...sx,
      }}
    >
      <Label component="span">{label}</Label>
      <Box sx={{ display: "grid", gap: spacing.sm }}>
        {options.map((option) => {
          const checked = selectedValue === option.value;

          return (
            <Box
              key={option.value}
              component="label"
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: spacing.sm,
                cursor: "pointer",
              }}
            >
              <Radio
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => selectValue(option.value)}
              />
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: primaryText, fontWeight: 700, lineHeight: 1.4 }}
                >
                  {option.label}
                </Typography>
                {option.description && (
                  <Typography variant="caption" sx={{ color: secondaryText, lineHeight: 1.5 }}>
                    {option.description}
                  </Typography>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
