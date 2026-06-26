"use client";

import type { ReactNode } from "react";
import { Box } from "@mui/material";
import Card from "@/app/components/atoms/Card";
import CardTitle from "@/app/components/atoms/CardTitle";
import Text from "@/app/components/atoms/Text";
import { spacing } from "@/app/theme/tokens";

interface ExampleCardProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export default function ExampleCard({ title, description, children }: ExampleCardProps) {
  return (
    <Card>
      <CardTitle sx={{ mb: description ? spacing.xs : spacing.md }}>
        {title}
      </CardTitle>
      {description && (
        <Text tone="secondary" variant="body2" sx={{ mb: spacing.md }}>
          {description}
        </Text>
      )}
      {children && <Box>{children}</Box>}
    </Card>
  );
}
