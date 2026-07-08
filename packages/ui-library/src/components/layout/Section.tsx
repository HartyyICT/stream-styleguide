"use client";

import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";
import Divider from "./Divider";
import { useSemanticColors } from "../../theme/useSemanticColors";
import { pageLayoutTokens } from "../../theme/tokens";

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
  divider?: boolean;
  last?: boolean;
}

export default function Section({
  id,
  title,
  description,
  children,
  divider = true,
  last = false,
}: SectionProps) {
  const { secondaryText } = useSemanticColors();

  return (
    <>
      {divider && <Divider sx={{ my: pageLayoutTokens.sectionDividerMarginY }} />}
      <Box
        component="section"
        id={id}
        sx={{ scrollMarginTop: pageLayoutTokens.sectionScrollMarginTop, pb: last ? 4 : 0 }}
      >
        <Typography variant="h2" sx={{ mb: 1.5 }}>
          {title}
        </Typography>
        {description && (
          <Typography
            sx={{
              mb: pageLayoutTokens.sectionDescriptionMarginBottom,
              color: secondaryText,
              lineHeight: 1.7,
            }}
          >
            {description}
          </Typography>
        )}
        {children}
      </Box>
    </>
  );
}
