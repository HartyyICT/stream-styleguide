"use client";

import { Box, Typography } from "@mui/material";
import { ChevronRight } from "lucide-react";
import type { ElementType } from "react";
import { iconSizes, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbsProps {
  items: readonly BreadcrumbItem[];
  linkComponent?: ElementType;
}

export default function Breadcrumbs({
  items,
  linkComponent = "a",
}: BreadcrumbsProps) {
  const { secondaryText, primaryText, interaction } = useSemanticColors();

  return (
    <Box component="nav" aria-label="Breadcrumb">
      <Box
        component="ol"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          m: 0,
          p: 0,
          listStyle: "none",
          gap: spacing.xs,
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isLink = Boolean(item.href) && !isLast;

          return (
            <Box
              component="li"
              key={`${item.label}-${index}`}
              sx={{ display: "flex", alignItems: "center", gap: spacing.xs }}
            >
              {isLink ? (
                <Typography
                  component={linkComponent}
                  href={item.href}
                  variant="body2"
                  sx={{
                    color: secondaryText,
                    textDecoration: "none",
                    "&:hover": {
                      color: interaction.hoverContent,
                      textDecoration: "underline",
                    },
                  }}
                >
                  {item.label}
                </Typography>
              ) : (
                <Typography
                  variant="body2"
                  aria-current={isLast ? "page" : undefined}
                  sx={{
                    color: isLast ? primaryText : secondaryText,
                    fontWeight: isLast ? 600 : 400,
                  }}
                >
                  {item.label}
                </Typography>
              )}
              {!isLast && (
                <ChevronRight
                  size={iconSizes.small}
                  aria-hidden="true"
                  style={{ color: secondaryText, flexShrink: 0 }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
