"use client";

import { Box, ButtonBase, type BoxProps } from "@mui/material";
import { borderWidths, radius, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

interface TabItem<TValue extends string> {
  value: TValue;
  label: string;
}

interface TabsProps<TValue extends string> extends Omit<BoxProps, "onChange"> {
  items: readonly TabItem<TValue>[];
  value: TValue;
  ariaLabel: string;
  onValueChange: (value: TValue) => void;
}

export default function Tabs<TValue extends string>({
  items,
  value,
  ariaLabel,
  onValueChange,
  sx,
  ...props
}: TabsProps<TValue>) {
  const { borders, interaction, primaryText, secondaryText, selectedBackground } =
    useSemanticColors();

  return (
    <Box
      role="tablist"
      aria-label={ariaLabel}
      {...props}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: spacing.xs,
        p: spacing.xs,
        border: `${borderWidths.default} solid ${borders.subtle}`,
        borderRadius: radius.large,
        backgroundColor: interaction.default,
        ...sx,
      }}
    >
      {items.map((item) => {
        const selected = item.value === value;

        return (
          <ButtonBase
            key={item.value}
            role="tab"
            type="button"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onValueChange(item.value)}
            sx={{
              minHeight: "2rem",
              px: spacing.md,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: 0,
              borderRadius: radius.medium,
              color: selected ? interaction.hoverContent : secondaryText,
              backgroundColor: selected ? selectedBackground : "transparent",
              fontFamily: "var(--font-poppins), Arial, sans-serif",
              fontSize: "0.875rem",
              fontWeight: 500,
              lineHeight: 1,
              cursor: "pointer",
              transition:
                "color 160ms ease, background-color 160ms ease, box-shadow 160ms ease",
              "&:hover": {
                color: selected ? interaction.hoverContent : primaryText,
                backgroundColor: selected ? selectedBackground : interaction.hoverBackground,
              },
              "&:focus-visible": {
                outline: `${borderWidths.focus} solid ${interaction.focusRing}`,
                outlineOffset: 2,
              },
            }}
          >
            {item.label}
          </ButtonBase>
        );
      })}
    </Box>
  );
}
