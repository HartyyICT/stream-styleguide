"use client";

import {
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  TextField,
  Typography,
  type AutocompleteInputChangeReason,
  type SxProps,
  type Theme,
} from "@mui/material";
import { iconSizes, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";
import type { ComboboxOption } from "./Combobox";
import FieldShell from "./FieldShell";

export interface MultiSelectProps<TValue extends string | number = string> {
  label: string;
  name: string;
  options: readonly ComboboxOption<TValue>[];
  values: readonly TValue[];
  onValuesChange: (
    values: TValue[],
    options: ComboboxOption<TValue>[],
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
  limitTags?: number;
  sx?: SxProps<Theme>;
}

export default function MultiSelect<TValue extends string | number = string>({
  label,
  name,
  options,
  values,
  onValuesChange,
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
  limitTags = 3,
  sx,
}: MultiSelectProps<TValue>) {
  const { secondaryText } = useSemanticColors();
  const selectedOptions = options.filter((option) => values.includes(option.value));

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
          multiple
          options={options}
          value={selectedOptions}
          inputValue={inputValue}
          loading={loading}
          loadingText={loadingText}
          noOptionsText={noOptionsText}
          disabled={disabled}
          limitTags={limitTags}
          getOptionLabel={(option) => option.label}
          getOptionDisabled={(option) => Boolean(option.disabled)}
          isOptionEqualToValue={(option, selected) => option.value === selected.value}
          onChange={(_event, nextOptions) =>
            onValuesChange(
              nextOptions.map((option) => option.value),
              nextOptions,
            )
          }
          onInputChange={(_event, nextValue, reason) =>
            onInputValueChange?.(nextValue, reason)
          }
          renderValue={(selected, getItemProps) =>
            selected.map((option, index) => {
              const { key, ...itemProps } = getItemProps({ index });

              return <Chip key={key} label={option.label} size="small" {...itemProps} />;
            })
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
              placeholder={selectedOptions.length ? undefined : placeholder}
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
