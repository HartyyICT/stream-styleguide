"use client";

import { Box, Typography, type BoxProps } from "@mui/material";
import { useState } from "react";
import Radio from "./Radio";
import Label from "./Label";
import ErrorText from "./ErrorText";
import HelperText from "./HelperText";
import { formTokens, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

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
  helperText?: string;
  errorText?: string;
  required?: boolean;
  onValueChange?: (value: string) => void;
}

export default function RadioGroup({
  label,
  name,
  options,
  value,
  defaultValue,
  helperText,
  errorText,
  required = false,
  onValueChange,
  sx,
  ...props
}: RadioGroupProps) {
  const { primaryText, secondaryText } = useSemanticColors();
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
      <Label component="span" required={required}>{label}</Label>
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
                error={Boolean(errorText)}
                onChange={() => selectValue(option.value)}
              />
              <Box sx={{ display: "grid", gap: 0.25, pt: "0.0625rem" }}>
                <Typography
                  variant="body2"
                  sx={{ color: primaryText, fontWeight: 700, lineHeight: 1.35 }}
                >
                  {option.label}
                </Typography>
                {option.description && (
                  <Typography variant="caption" sx={{ color: secondaryText, lineHeight: 1.4 }}>
                    {option.description}
                  </Typography>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
      {errorText ? (
        <ErrorText>{errorText}</ErrorText>
      ) : helperText ? (
        <HelperText>{helperText}</HelperText>
      ) : null}
    </Box>
  );
}
