"use client";

import NavigationGroup, {
  type NavigationGroupItem,
} from "@/app/components/molecules/NavigationGroup";

interface SidebarNavigationProps {
  label: string;
  items: readonly NavigationGroupItem[];
  activeHref?: string;
  collapsed?: boolean;
}

export default function SidebarNavigation(props: SidebarNavigationProps) {
  return <NavigationGroup {...props} />;
}
