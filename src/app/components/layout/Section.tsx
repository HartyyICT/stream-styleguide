"use client";

import { Box, Divider, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

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
  const { secondaryText } = useDocumentationStyles();

  return (
    <>
      {divider && <Divider sx={{ my: 6 }} />}
      <Box
        component="section"
        id={id}
        sx={{ scrollMarginTop: 96, pb: last ? 4 : 0 }}
      >
        <Typography variant="h2" sx={{ mb: 1.5 }}>
          {title}
        </Typography>
        {description && (
          <Typography sx={{ mb: 3, color: secondaryText, lineHeight: 1.7 }}>
            {description}
          </Typography>
        )}
        {children}
      </Box>
    </>
  );
}
