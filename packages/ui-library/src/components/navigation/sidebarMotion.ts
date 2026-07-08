import { iconSizes } from "../../theme/tokens";

export const sidebarMotion = {
  collapsedWidth: 64,
  expandedWidth: 280,
  duration: 280,
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  navItem: {
    height: 38,
    iconColumnWidth: iconSizes.control,
    collapsedPaddingLeft: 1.625,
    expandedPaddingLeft: 0.875,
    collapsedPaddingRight: 1.625,
    expandedPaddingRight: 1.5,
    paddingY: 1,
    marginBottom: 0.5,
    expandedColumnGap: 1.25,
  },
} as const;

export const sidebarTransition = `${sidebarMotion.duration}ms ${sidebarMotion.easing}`;
