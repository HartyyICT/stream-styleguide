"use client";

import { Typography, type TypographyProps } from "@mui/material";
import { useSemanticColors } from "../theme/useSemanticColors";

type TextTone = "primary" | "secondary" | "accent";

interface TextProps extends TypographyProps {
  tone?: TextTone;
}

export default function Text({ tone = "primary", sx, ...props }: TextProps) {
  const { primaryText, secondaryText, accent } = useSemanticColors();
  const color =
    tone === "secondary" ? secondaryText : tone === "accent" ? accent : primaryText;

  return (
    <Typography
      {...props}
      sx={{
        color,
        lineHeight:
          props.variant === "caption" || props.variant === "overline" ? 1.3 : 1.7,
        ...sx,
      }}
    />
  );
}
