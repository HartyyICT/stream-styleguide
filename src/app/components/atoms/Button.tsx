"use client";

import { ButtonBase, type ButtonBaseProps } from "@mui/material";
import type { MouseEvent, ReactNode } from "react";
import {
  buttonTokens,
  borderWidths,
  colors,
  radius,
  shadows,
} from "@/app/theme/tokens";
import { useColorMode } from "@/app/theme/themeProvider";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "icon"
  | "destructive"
  | "disabled";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<ButtonBaseProps, "size"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  iconOnly?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  startIcon,
  endIcon,
  iconOnly = false,
  children,
  sx,
  disabled,
  onClick,
  tabIndex,
  ...props
}: ButtonProps) {
  const { mode } = useColorMode();
  const isDarkMode = mode === "dark";
  const sizeStyle = buttonTokens.sizes[size];
  const isDisabled = disabled || variant === "disabled";
  const tokenVariant = isDisabled ? "disabled" : variant;
  const darkVariant =
    tokenVariant in buttonTokens.darkTypes
      ? buttonTokens.darkTypes[
          tokenVariant as keyof typeof buttonTokens.darkTypes
        ]
      : undefined;
  const variantStyles =
    isDarkMode && darkVariant
      ? darkVariant
      : buttonTokens.types[tokenVariant];

  return (
    <ButtonBase
      component="button"
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : tabIndex}
      disableRipple={isDisabled}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        if (isDisabled) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }

        onClick?.(event);
      }}
      {...props}
      sx={{
        minWidth: iconOnly ? sizeStyle.height : sizeStyle.minWidth,
        height: sizeStyle.height,
        px: iconOnly ? 0 : undefined,
        padding: iconOnly ? 0 : sizeStyle.padding,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.75,
        border: `${borderWidths.default} solid ${variantStyles.border}`,
        borderRadius: radius.medium,
        color: variantStyles.content,
        backgroundColor: variantStyles.background,
        boxShadow: shadows.level0,
        fontFamily: "var(--font-poppins), Arial, sans-serif",
        fontSize: sizeStyle.fontSize,
        fontWeight: 600,
        lineHeight: 1,
        cursor: isDisabled ? "not-allowed" : "pointer",
        pointerEvents: "auto",
        opacity: isDisabled ? 0.9 : 1,
        transition:
          "color 160ms ease, background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease",
        "& svg": {
          width: sizeStyle.iconSize,
          height: sizeStyle.iconSize,
        },
        "&:hover": !isDisabled
          ? {
              backgroundColor: variantStyles.hoverBackground,
              borderColor: variantStyles.hoverBorder,
              boxShadow: variant === "primary" ? shadows.level1 : shadows.level0,
            }
          : {
              backgroundColor: variantStyles.background,
              borderColor: variantStyles.border,
              cursor: "not-allowed",
            },
        "&:focus-visible": {
          outline: `${borderWidths.focus} solid ${
            isDarkMode ? colors.primary[300] : colors.primary[500]
          }`,
          outlineOffset: 2,
        },
        ...sx,
      }}
    >
      {startIcon}
      {children}
      {endIcon}
    </ButtonBase>
  );
}
