"use client";

import { Box, Typography, type BoxProps } from "@mui/material";
import type { ReactNode } from "react";
import {
  authenticationTokens,
  radius,
  shadows,
  spacing,
} from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

export interface LoginPageProps extends Omit<BoxProps, "title"> {
  logo: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  signInAction: ReactNode;
  productName?: ReactNode;
  productDescription?: ReactNode;
  notice?: ReactNode;
  footer?: ReactNode;
}

export default function LoginPage({
  logo,
  title,
  description,
  signInAction,
  productName,
  productDescription,
  notice,
  footer,
  sx,
  ...props
}: LoginPageProps) {
  const { surface, primaryText, secondaryText } = useSemanticColors();

  return (
    <Box
      component="main"
      {...props}
      sx={{
        position: "relative",
        width: "100%",
        minWidth: 0,
        minHeight: authenticationTokens.pageMinHeight,
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        background: authenticationTokens.background,
        ...sx,
      }}
    >
      {notice && (
        <Box sx={{ position: "absolute", inset: "0 0 auto", zIndex: 2 }}>
          {notice}
        </Box>
      )}

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: authenticationTokens.contentMaxWidth,
          px: { xs: spacing.lg, sm: spacing.xxl },
          py: spacing.xxl,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: authenticationTokens.contentGap,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: authenticationTokens.cardWidth,
            px: authenticationTokens.cardPaddingX,
            py: authenticationTokens.cardPaddingY,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: authenticationTokens.cardGap,
            color: primaryText,
            backgroundColor: surface,
            borderRadius: radius.extraLarge,
            boxShadow: shadows.level4,
          }}
        >
          <Box
            sx={{
              minHeight: authenticationTokens.logoHeight,
              display: "grid",
              placeItems: "center",
            }}
          >
            {logo}
          </Box>

          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Typography component="h1" variant="h4" sx={{ mb: spacing.xs }}>
              {title}
            </Typography>
            {description && (
              <Typography variant="body1" sx={{ color: secondaryText }}>
                {description}
              </Typography>
            )}
          </Box>

          <Box sx={{ width: "100%", "& > *": { width: "100%" } }}>
            {signInAction}
          </Box>

          {footer && (
            <Typography component="div" variant="body2" sx={{ color: secondaryText, textAlign: "center" }}>
              {footer}
            </Typography>
          )}
        </Box>

        {(productName || productDescription) && (
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              flex: 1,
              maxWidth: authenticationTokens.productCopyMaxWidth,
              color: "common.white",
            }}
          >
            {productName && (
              <Typography component="h2" variant="h1" sx={{ mb: spacing.lg, color: "inherit" }}>
                {productName}
              </Typography>
            )}
            {productDescription && (
              <Typography
                variant="h5"
                sx={{
                  color: authenticationTokens.productTextColor,
                  lineHeight: 1.7,
                  fontWeight: 400,
                }}
              >
                {productDescription}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
