"use client";

import { Box, Typography, type BoxProps } from "@mui/material";
import type { ReactNode } from "react";
import TokenCode from "../typography/TokenCode";
import { borderWidths, radius, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

interface PageLayoutRegionProps extends BoxProps {
  title: string;
  description: string;
  token: string;
  icon?: ReactNode;
}

export default function PageLayoutRegion({
  title,
  description,
  token,
  icon,
  sx,
  ...props
}: PageLayoutRegionProps) {
  const { borders, primaryText, secondaryText, accent, surface } =
    useSemanticColors();

  return (
    <Box
      {...props}
      sx={{
        display: "grid",
        gap: spacing.sm,
        p: spacing.lg,
        border: `${borderWidths.default} solid ${borders.default}`,
        borderRadius: radius.large,
        backgroundColor: surface,
        ...sx,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
        {icon && (
          <Box
            aria-hidden="true"
            sx={{
              color: accent,
              display: "grid",
              placeItems: "center",
              "& svg": { display: "block" },
            }}
          >
            {icon}
          </Box>
        )}
        <Typography variant="h3" sx={{ color: primaryText }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: secondaryText, lineHeight: 1.7 }}>
        {description}
      </Typography>
      <TokenCode>{token}</TokenCode>
    </Box>
  );
}
