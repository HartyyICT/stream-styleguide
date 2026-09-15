"use client";

import { Box, Typography, type BoxProps } from "@mui/material";
import type { ElementType, ReactNode } from "react";
import { appLayoutTokens, borderWidths, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";
import Breadcrumbs, { type BreadcrumbItem } from "../navigation/Breadcrumbs";

export interface PageLayoutProps extends Omit<BoxProps, "title"> {
  title: ReactNode;
  titleAdornment?: ReactNode;
  description?: ReactNode;
  breadcrumbs?: readonly BreadcrumbItem[];
  actions?: ReactNode;
  contextBanner?: ReactNode;
  children: ReactNode;
  titleComponent?: ElementType;
  contentComponent?: ElementType;
  contentMaxWidth?: number | string;
}

export default function PageLayout({
  title,
  titleAdornment,
  description,
  breadcrumbs,
  actions,
  contextBanner,
  children,
  titleComponent = "h1",
  contentComponent = "main",
  contentMaxWidth,
  sx,
  ...props
}: PageLayoutProps) {
  const { borders, surface, pageBackground, secondaryText } = useSemanticColors();

  return (
    <Box
      {...props}
      sx={{
        width: "100%",
        minWidth: 0,
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: pageBackground,
        ...sx,
      }}
    >
      {contextBanner}
      <Box
        component="header"
        sx={{
          px: appLayoutTokens.headerPaddingX,
          py: appLayoutTokens.headerPaddingY,
          display: "flex",
          alignItems: { xs: "stretch", md: "flex-end" },
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          gap: spacing.lg,
          backgroundColor: surface,
          borderBottom: `${borderWidths.default} solid ${borders.subtle}`,
        }}
      >
        <Box sx={{ minWidth: 0, display: "grid", gap: spacing.md }}>
          {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
          <Box sx={{ minWidth: 0, display: "grid", gap: spacing.xs }}>
            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: spacing.sm }}>
              <Typography component={titleComponent} variant="h3">
                {title}
              </Typography>
              {titleAdornment}
            </Box>
            {description && (
              <Typography variant="body2" sx={{ color: secondaryText }}>
                {description}
              </Typography>
            )}
          </Box>
        </Box>
        {actions && (
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: spacing.sm }}>
            {actions}
          </Box>
        )}
      </Box>
      <Box
        component={contentComponent}
        sx={{
          width: "100%",
          maxWidth: contentMaxWidth,
          mx: contentMaxWidth ? "auto" : undefined,
          p: appLayoutTokens.contentPadding,
          minWidth: 0,
          flex: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
