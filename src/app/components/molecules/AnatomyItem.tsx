"use client";

import type { ReactNode } from "react";
import { Box } from "@mui/material";
import Card from "@/app/components/atoms/Card";
import Text from "@/app/components/atoms/Text";
import TokenCode from "@/app/components/atoms/TokenCode";
import { spacing } from "@/app/theme/tokens";

interface AnatomyItemProps {
  label: string;
  description: string;
  token?: string;
  icon?: ReactNode;
}

export default function AnatomyItem({
  label,
  description,
  token,
  icon,
}: AnatomyItemProps) {
  return (
    <Card>
      <Box sx={{ display: "flex", alignItems: "center", gap: spacing.sm, mb: spacing.sm }}>
        {icon}
        <Text variant="h3">{label}</Text>
      </Box>
      <Text tone="secondary" variant="body2" sx={{ mb: token ? spacing.sm : 0 }}>
        {description}
      </Text>
      {token && <TokenCode>{token}</TokenCode>}
    </Card>
  );
}
