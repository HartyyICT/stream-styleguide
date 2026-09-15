"use client";

import {
  Box,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  type BoxProps,
} from "@mui/material";
import { ArrowLeftRight, BriefcaseBusiness, Check, Trash2 } from "lucide-react";
import { useId, useState, type MouseEvent } from "react";
import { borderWidths, iconSizes, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";
import Button from "../buttons/Button";

export interface BusinessUnitOption {
  id: string;
  name: string;
  code: string;
}

export interface BusinessUnitBannerProps extends Omit<BoxProps, "children" | "onSelect"> {
  businessUnit?: BusinessUnitOption | null;
  availableBusinessUnits?: readonly BusinessUnitOption[];
  onSelect?: (businessUnit: BusinessUnitOption) => void;
  onClear?: () => void;
  label?: string;
  switchLabel?: string;
  clearLabel?: string;
}

export default function BusinessUnitBanner({
  businessUnit,
  availableBusinessUnits = [],
  onSelect,
  onClear,
  label = "Working in Business Unit",
  switchLabel = "Switch",
  clearLabel = "Clear selection",
  sx,
  ...props
}: BusinessUnitBannerProps) {
  const { borders, surface, secondaryText, semantic } = useSemanticColors();
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const menuId = useId();

  if (!businessUnit) {
    return null;
  }

  const open = Boolean(anchorElement);
  const canSwitch = Boolean(onSelect && availableBusinessUnits.length > 1);

  function openMenu(event: MouseEvent<HTMLElement>) {
    setAnchorElement(event.currentTarget);
  }

  function closeMenu() {
    setAnchorElement(null);
  }

  function selectBusinessUnit(option: BusinessUnitOption) {
    onSelect?.(option);
    closeMenu();
  }

  function clearBusinessUnit() {
    onClear?.();
    closeMenu();
  }

  return (
    <Box
      {...props}
      sx={{
        width: "100%",
        minWidth: 0,
        px: spacing.xl,
        py: spacing.sm,
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: spacing.sm,
        backgroundColor: surface,
        borderBottom: `${borderWidths.default} solid ${borders.subtle}`,
        ...sx,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: spacing.sm, minWidth: 0 }}>
        <BriefcaseBusiness
          size={iconSizes.small}
          color={secondaryText}
          aria-hidden="true"
          style={{ flexShrink: 0 }}
        />
        <Typography variant="caption" sx={{ color: secondaryText }}>
          {label}{" "}
          <Box component="strong" sx={{ color: "text.primary" }}>
            {businessUnit.name} ({businessUnit.code})
          </Box>
        </Typography>
      </Box>

      {canSwitch && (
        <>
          <Button
            variant="tertiary"
            size="sm"
            startIcon={<ArrowLeftRight size={iconSizes.small} aria-hidden="true" />}
            aria-controls={open ? menuId : undefined}
            aria-haspopup="menu"
            aria-expanded={open ? "true" : undefined}
            onClick={openMenu}
            sx={{ minWidth: 0 }}
          >
            {switchLabel}
          </Button>
          <Menu
            id={menuId}
            anchorEl={anchorElement}
            open={open}
            onClose={closeMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            {availableBusinessUnits.map((option) => {
              const active = option.id === businessUnit.id;

              return (
                <MenuItem
                  key={option.id}
                  selected={active}
                  onClick={() => selectBusinessUnit(option)}
                >
                  <ListItemIcon>
                    {active ? (
                      <Check size={iconSizes.small} color={semantic.info} aria-hidden="true" />
                    ) : (
                      <BriefcaseBusiness size={iconSizes.small} aria-hidden="true" />
                    )}
                  </ListItemIcon>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="body2">{option.name}</Typography>
                    <Typography variant="caption" sx={{ color: secondaryText }}>
                      {option.code}
                    </Typography>
                  </Box>
                </MenuItem>
              );
            })}
            {onClear && (
              <MenuItem
                onClick={clearBusinessUnit}
                sx={{
                  mt: spacing.sm,
                  pt: spacing.md,
                  color: semantic.error,
                  borderTop: `${borderWidths.default} solid ${borders.subtle}`,
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <Trash2 size={iconSizes.small} aria-hidden="true" />
                </ListItemIcon>
                <Typography variant="body2">{clearLabel}</Typography>
              </MenuItem>
            )}
          </Menu>
        </>
      )}
    </Box>
  );
}
