"use client";

import { Box, Collapse, Fade, type BoxProps } from "@mui/material";
import { SlidersHorizontal, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { borderWidths, iconSizes, radius, shadows, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";
import Button from "../buttons/Button";
import Tabs from "../navigation/Tabs";
import Text from "../typography/Text";

export interface DataGridPanelTab<TValue extends string = string> {
  value: TValue;
  label: string;
}

export interface DataGridPanelProps<TValue extends string = string>
  extends Omit<BoxProps, "children"> {
  children: ReactNode;
  tabs?: readonly DataGridPanelTab<TValue>[];
  activeTab?: TValue;
  onTabChange?: (value: TValue) => void;
  filterContent?: ReactNode;
  filterSummary?: ReactNode;
  headerActions?: ReactNode;
  filtersOpen?: boolean;
  defaultFiltersOpen?: boolean;
  onFiltersOpenChange?: (open: boolean) => void;
  showFiltersLabel?: string;
  hideFiltersLabel?: string;
  selectedCount?: number;
  bulkActions?: ReactNode;
  bulkSelectionLabel?: ReactNode | ((count: number) => ReactNode);
  onClearSelection?: () => void;
}

export default function DataGridPanel<TValue extends string = string>({
  children,
  tabs,
  activeTab,
  onTabChange,
  filterContent,
  filterSummary,
  headerActions,
  filtersOpen,
  defaultFiltersOpen = false,
  onFiltersOpenChange,
  showFiltersLabel = "Show filters",
  hideFiltersLabel = "Hide filters",
  selectedCount = 0,
  bulkActions,
  bulkSelectionLabel,
  onClearSelection,
  sx,
  ...props
}: DataGridPanelProps<TValue>) {
  const { borders, surface, subtleBackground, primaryText } = useSemanticColors();
  const [internalFiltersOpen, setInternalFiltersOpen] = useState(defaultFiltersOpen);
  const open = filtersOpen ?? internalFiltersOpen;
  const hasTabs = Boolean(tabs?.length && activeTab !== undefined && onTabChange);
  const hasHeader = hasTabs || Boolean(filterContent) || Boolean(headerActions);

  function setOpen(next: boolean) {
    if (filtersOpen === undefined) {
      setInternalFiltersOpen(next);
    }
    onFiltersOpenChange?.(next);
  }

  const selectedLabel =
    typeof bulkSelectionLabel === "function"
      ? bulkSelectionLabel(selectedCount)
      : bulkSelectionLabel ?? `${selectedCount} selected`;

  return (
    <Box
      {...props}
      sx={{
        position: "relative",
        width: "100%",
        minWidth: 0,
        overflow: "hidden",
        border: `${borderWidths.default} solid ${borders.default}`,
        borderRadius: radius.large,
        backgroundColor: surface,
        boxShadow: shadows.level1,
        ...sx,
      }}
    >
      {hasHeader && (
        <Box
          sx={{
            minHeight: 56,
            px: spacing.md,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: spacing.sm,
            borderBottom: `${borderWidths.default} solid ${borders.subtle}`,
          }}
        >
          {hasTabs && (
            <Tabs
              items={tabs!}
              value={activeTab!}
              ariaLabel="Data categories"
              onValueChange={onTabChange!}
              sx={{ border: 0, p: 0 }}
            />
          )}
          <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: spacing.sm }}>
            {headerActions}
            {filterContent && (
              <Button
                variant="secondary"
                size="sm"
                startIcon={<SlidersHorizontal size={iconSizes.small} aria-hidden="true" />}
                onClick={() => setOpen(!open)}
                aria-expanded={open}
              >
                {open ? hideFiltersLabel : showFiltersLabel}
              </Button>
            )}
          </Box>
        </Box>
      )}

      {filterContent && (
        <Collapse in={open}>
          <Box
            sx={{
              px: spacing.md,
              py: spacing.md,
              display: "flex",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: spacing.md,
              borderBottom: `${borderWidths.default} solid ${borders.subtle}`,
            }}
          >
            {filterContent}
          </Box>
        </Collapse>
      )}

      {filterSummary && (
        <Box
          sx={{
            px: spacing.md,
            py: spacing.sm,
            backgroundColor: subtleBackground,
            borderBottom: `${borderWidths.default} solid ${borders.subtle}`,
            "&:empty": { display: "none" },
          }}
        >
          {filterSummary}
        </Box>
      )}

      <Box sx={{ width: "100%", minWidth: 0 }}>{children}</Box>

      {bulkActions && (
        <Fade in={selectedCount > 0} mountOnEnter unmountOnExit>
          <Box
            sx={{
              mx: spacing.md,
              mb: spacing.md,
              minWidth: 0,
              px: spacing.md,
              py: spacing.sm,
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: spacing.md,
              color: primaryText,
              backgroundColor: surface,
              border: `${borderWidths.default} solid ${borders.default}`,
              borderRadius: radius.medium,
              boxShadow: shadows.level1,
            }}
          >
            <Text variant="body2" sx={{ color: "inherit", fontWeight: 700 }}>
              {selectedLabel}
            </Text>
            {bulkActions}
            <Button
              variant="icon"
              size="sm"
              iconOnly
              aria-label="Clear selection"
              onClick={onClearSelection}
              sx={{ ml: "auto" }}
            >
              <X size={iconSizes.small} aria-hidden="true" />
            </Button>
          </Box>
        </Fade>
      )}
    </Box>
  );
}
