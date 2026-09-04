"use client";

import {
  Autocomplete,
  Box,
  CircularProgress,
  TextField,
  Typography,
  type AutocompleteInputChangeReason,
  type SxProps,
  type Theme,
} from "@mui/material";
import { iconSizes, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";
import FieldShell from "./FieldShell";

export interface ComboboxOption<TValue extends string | number = string> {
  label: string;
  value: TValue;
  description?: string;
  disabled?: boolean;
}

export interface ComboboxProps<TValue extends string | number = string> {
  label: string;
  name: string;
  options: readonly ComboboxOption<TValue>[];
  value?: TValue | null;
  onValueChange?: (
    value: TValue | null,
    option: ComboboxOption<TValue> | null,
  ) => void;
  inputValue?: string;
  onInputValueChange?: (
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => void;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  loading?: boolean;
  loadingText?: string;
  noOptionsText?: string;
  required?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  sx?: SxProps<Theme>;
}

export default function Combobox<TValue extends string | number = string>({
  label,
  name,
  options,
  value = null,
  onValueChange,
  inputValue,
  onInputValueChange,
  placeholder,
  helperText,
  errorText,
  loading = false,
  loadingText = "Loading options",
  noOptionsText = "No options",
  required = false,
  disabled = false,
  clearable = true,
  sx,
}: ComboboxProps<TValue>) {
  const { secondaryText } = useSemanticColors();
  const selectedOption = options.find((option) => option.value === value) ?? null;

  return (
    <FieldShell
      label={label}
      name={name}
      required={required}
      helperText={helperText}
      errorText={errorText}
      sx={sx}
    >
      {(fieldProps) => (
        <Autocomplete
          options={options}
          value={selectedOption}
          inputValue={inputValue}
          loading={loading}
          loadingText={loadingText}
          noOptionsText={noOptionsText}
          disabled={disabled}
          disableClearable={!clearable}
          getOptionLabel={(option) => option.label}
          getOptionDisabled={(option) => Boolean(option.disabled)}
          isOptionEqualToValue={(option, selected) => option.value === selected.value}
          onChange={(_event, option) => onValueChange?.(option?.value ?? null, option)}
          onInputChange={(_event, nextValue, reason) =>
            onInputValueChange?.(nextValue, reason)
          }
          renderOption={(optionProps, option) => (
            <Box component="li" {...optionProps} key={String(option.value)}>
              <Box sx={{ minWidth: 0, display: "grid", gap: spacing.xs }}>
                <Typography variant="body2">{option.label}</Typography>
                {option.description && (
                  <Typography variant="caption" sx={{ color: secondaryText }}>
                    {option.description}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              id={fieldProps.id}
              name={fieldProps.name}
              required={fieldProps.required}
              error={fieldProps.error}
              placeholder={placeholder}
              slotProps={{
                ...params.slotProps,
                input: {
                  ...params.slotProps.input,
                  endAdornment: (
                    <>
                      {loading && <CircularProgress size={iconSizes.small} />}
                      {params.slotProps.input.endAdornment}
                    </>
                  ),
                },
                htmlInput: {
                  ...params.slotProps.htmlInput,
                  "aria-describedby": fieldProps["aria-describedby"],
                },
              }}
            />
          )}
        />
      )}
    </FieldShell>
  );
}
