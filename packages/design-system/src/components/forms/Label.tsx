"use client";

import { Typography, type TypographyProps } from "@mui/material";
import { useSemanticColors } from "../../theme/useSemanticColors";

interface LabelProps extends TypographyProps {
  htmlFor?: string;
  required?: boolean;
}

export default function Label({
  htmlFor,
  required = false,
  children,
  sx,
  ...props
}: LabelProps) {
  const { primaryText, semantic } = useSemanticColors();

  return (
    <Typography
      component="label"
      htmlFor={htmlFor}
      variant="caption"
      {...props}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        color: primaryText,
        fontWeight: 700,
        lineHeight: 1.4,
        ...sx,
      }}
    >
      {children}
      {required && (
        <Typography
          component="span"
          aria-hidden="true"
          sx={{ color: semantic.error, font: "inherit" }}
        >
          *
        </Typography>
      )}
    </Typography>
  );
}
