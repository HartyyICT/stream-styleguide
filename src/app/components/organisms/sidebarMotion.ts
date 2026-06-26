export const sidebarMotion = {
  collapsedWidth: 88,
  expandedWidth: 280,
  duration: 280,
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

export const sidebarTransition = `${sidebarMotion.duration}ms ${sidebarMotion.easing}`;
