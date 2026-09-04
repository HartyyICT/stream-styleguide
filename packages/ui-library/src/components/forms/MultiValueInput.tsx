"use client";

import { Autocomplete, Chip, TextField, type BoxProps } from "@mui/material";
import FieldShell from "./FieldShell";

export interface MultiValueInputProps {
  label: string;
  name: string;
  values: readonly string[];
  onValuesChange: (values: string[]) => void;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
  allowDuplicates?: boolean;
  sx?: BoxProps["sx"];
}

function normalizeValues(values: readonly string[], allowDuplicates: boolean) {
  const trimmed = values.map((value) => value.trim()).filter(Boolean);
  return allowDuplicates ? trimmed : [...new Set(trimmed)];
}

export default function MultiValueInput({
  label,
  name,
  values,
  onValuesChange,
  placeholder = "Type a value and press Enter",
  helperText,
  errorText,
  required = false,
  disabled = false,
  allowDuplicates = false,
  sx,
}: MultiValueInputProps) {
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
          freeSolo
          options={[]}
          value={[...values]}
          disabled={disabled}
          onChange={(_event, nextValues) =>
            onValuesChange(normalizeValues(nextValues, allowDuplicates))
          }
          renderValue={(selected, getItemProps) =>
            selected.map((value, index) => {
              const { key, ...itemProps } = getItemProps({ index });

              return <Chip key={key} label={value} size="small" {...itemProps} />;
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              id={fieldProps.id}
              name={fieldProps.name}
              required={fieldProps.required}
              error={fieldProps.error}
              placeholder={values.length ? undefined : placeholder}
              slotProps={{
                ...params.slotProps,
                htmlInput: {
                  ...params.slotProps.htmlInput,
                  "aria-describedby": fieldProps["aria-describedby"],
                },
              }}
              onPaste={(event) => {
                const entries = event.clipboardData
                  .getData("text")
                  .split(/[,;\n]/)
                  .map((entry) => entry.trim())
                  .filter(Boolean);

                if (entries.length > 1) {
                  event.preventDefault();
                  onValuesChange(
                    normalizeValues([...values, ...entries], allowDuplicates),
                  );
                }
              }}
            />
          )}
        />
      )}
    </FieldShell>
  );
}
