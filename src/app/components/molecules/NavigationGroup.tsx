"use client";

import { Box } from "@mui/material";
import type { LucideIcon } from "lucide-react";
import SidebarNavItem from "@/app/components/molecules/SidebarNavItem";
import { Text } from "@ssw/ui-library";
import { spacing } from "@ssw/ui-library";

export type NavigationGroupItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

interface NavigationGroupProps {
  label: string;
  items: readonly NavigationGroupItem[];
  activeHref?: string;
  collapsed?: boolean;
}

export default function NavigationGroup({
  label,
  items,
  activeHref,
  collapsed = false,
}: NavigationGroupProps) {
  return (
    <Box>
      {!collapsed && (
        <Text
          variant="overline"
          tone="secondary"
          sx={{ display: "block", mb: spacing.xs, fontWeight: 700 }}
        >
          {label}
        </Text>
      )}
      <Box sx={{ display: "grid", gap: 0.5 }}>
        {items.map((item) => (
          <SidebarNavItem
            key={item.href}
            label={item.label}
            href={item.href}
            icon={item.icon}
            active={item.href === activeHref}
            collapsed={collapsed}
          />
        ))}
      </Box>
    </Box>
  );
}
