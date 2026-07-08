"use client";

import type { ReactNode } from "react";
import Card from "../layout/Card";
import CardTitle from "../layout/CardTitle";
import Text from "../typography/Text";
import { borderWidths, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

interface StateCardProps {
  title: string;
  description: string;
  state?: "default" | "hover" | "active" | "focus";
  children?: ReactNode;
}

export default function StateCard({
  title,
  description,
  state = "default",
  children,
}: StateCardProps) {
  const { interaction, borders } = useSemanticColors();

  return (
    <Card
      sx={{
        borderColor:
          state === "hover"
            ? interaction.hoverBorder
            : state === "focus"
              ? interaction.focusRing
              : borders.default,
        borderWidth: state === "active" ? borderWidths.active : borderWidths.default,
        backgroundColor:
          state === "active"
            ? interaction.activeBackground
            : state === "hover"
              ? interaction.hoverBackground
              : undefined,
      }}
    >
      <CardTitle sx={{ mb: spacing.xs }}>{title}</CardTitle>
      <Text tone="secondary" variant="body2" sx={{ mb: children ? spacing.md : 0 }}>
        {description}
      </Text>
      {children}
    </Card>
  );
}
