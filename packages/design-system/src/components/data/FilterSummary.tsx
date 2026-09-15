"use client";

import { Box, Chip, type ChipProps } from "@mui/material";
import type { ReactNode } from "react";
import { spacing } from "../../theme/tokens";
import Button from "../buttons/Button";
import Text from "../typography/Text";

export interface FilterChipProps extends Omit<ChipProps, "label"> {
  label: string;
  value: ReactNode;
  markerColor?: string;
}

export function FilterChip({
  label,
  value,
  markerColor,
  ...props
}: FilterChipProps) {
  return (
    <Chip
      {...props}
      size="small"
      label={
        <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
          {markerColor && (
            <Box
              component="span"
              sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: markerColor }}
            />
          )}
          <Box component="span">{label}: </Box>
          <Box component="span" sx={{ fontWeight: 700 }}>
            {value}
          </Box>
        </Box>
      }
    />
  );
}

export interface FilterSummaryProps {
  count: number;
  onReset: () => void;
  children: ReactNode;
  resetLabel?: string;
}

export default function FilterSummary({
  count,
  onReset,
  children,
  resetLabel = "Reset all",
}: FilterSummaryProps) {
  if (count === 0) {
    return null;
  }

  return (
    <Box
      aria-live="polite"
      sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: spacing.sm }}
    >
      <Text variant="body2" tone="secondary">
        {count} {count === 1 ? "filter" : "filters"} applied:
      </Text>
      {children}
      <Button variant="tertiary" size="sm" onClick={onReset}>
        {resetLabel}
      </Button>
    </Box>
  );
}
