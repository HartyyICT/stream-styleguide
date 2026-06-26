"use client";

import Link from "next/link";
import { Box, ButtonBase } from "@mui/material";
import type { LucideIcon } from "lucide-react";
import IconBox from "@/app/components/atoms/IconBox";
import Text from "@/app/components/atoms/Text";
import { borderWidths, radius, spacing } from "@/app/theme/tokens";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

interface SearchResultItemProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  onSelect?: () => void;
}

export default function SearchResultItem({
  title,
  description,
  href,
  icon: Icon,
  onSelect,
}: SearchResultItemProps) {
  const { surface, borders, interaction } = useDocumentationStyles();

  return (
    <ButtonBase
      component={Link}
      href={href}
      onClick={onSelect}
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "42px minmax(0, 1fr)",
        gap: spacing.md,
        p: spacing.md,
        textAlign: "left",
        border: `${borderWidths.default} solid ${borders.subtle}`,
        borderRadius: radius.medium,
        backgroundColor: surface,
        cursor: "pointer",
        "&:hover": {
          borderColor: interaction.hoverBorder,
          backgroundColor: interaction.hoverBackground,
        },
      }}
    >
      <IconBox>
        <Icon size={18} aria-hidden="true" />
      </IconBox>
      <Box sx={{ minWidth: 0 }}>
        <Text variant="body2" sx={{ fontWeight: 700 }}>{title}</Text>
        <Text tone="secondary" variant="caption">{description}</Text>
      </Box>
    </ButtonBase>
  );
}
