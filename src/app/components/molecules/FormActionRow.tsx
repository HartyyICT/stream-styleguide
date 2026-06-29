"use client";

import { Box, type BoxProps } from "@mui/material";
import Button from "@/app/components/atoms/Button";
import { borderWidths, spacing } from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

interface FormActionRowProps extends BoxProps {
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export default function FormActionRow({
  primaryLabel = "Save",
  secondaryLabel = "Cancel",
  onPrimaryClick,
  onSecondaryClick,
  sx,
  ...props
}: FormActionRowProps) {
  const { borders } = useDocumentationStyles();

  return (
    <Box
      {...props}
      sx={{
        pt: spacing.md,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-end",
        gap: spacing.sm,
        borderTop: `${borderWidths.default} solid ${borders.subtle}`,
        ...sx,
      }}
    >
      <Button variant="secondary" type="button" onClick={onSecondaryClick}>
        {secondaryLabel}
      </Button>
      <Button type="submit" onClick={onPrimaryClick}>
        {primaryLabel}
      </Button>
    </Box>
  );
}
