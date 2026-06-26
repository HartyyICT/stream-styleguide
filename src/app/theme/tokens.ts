export const colors = {
  primary: {
    50: "#EEF4FB",
    100: "#D9E6F5",
    200: "#B4CCE9",
    300: "#8EB3DD",
    400: "#6899D1",
    500: "#154F96",
    600: "#124785",
    700: "#0F3D73",
    800: "#0B3361",
    900: "#08294F",
  },
  neutral: {
    50: "#F8FAFB",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
  },
  semantic: {
    surface: "#FFFFFF",
    background: "#F8FAFB",
    success: { light: "#69E89E", main: "#22C35D", dark: "#1A8E46" },
    warning: { light: "#FFBA6B", main: "#FF8800", dark: "#CC6D00" },
    error: { light: "#FF7070", main: "#C32222", dark: "#991B1B" },
    info: { light: "#A3CEFF", main: "#297CD9", dark: "#034B9C" },
  },
};

export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  xxl: "3rem",
};

export const radius = {
  small: "0.25rem",
  medium: "0.5rem",
  large: "0.75rem",
  extraLarge: "1rem",
};

export const iconSizes = {
  small: 16,
  control: 19,
  medium: 20,
  large: 24,
  extraLarge: 32,
} as const;

export const breakpoints = {
  mobile: 0,
  tablet: 600,
  laptop: 900,
  desktop: 1200,
} as const;

export const responsiveLayout = {
  navbarHeight: "4rem",
  contentMaxWidth: 920,
  shellMaxWidth: 1440,
  tableMinWidth: 860,
  onThisPageWidth: 220,
  pagePaddingX: {
    mobile: spacing.lg,
    tablet: spacing.xl,
    desktop: spacing.xxl,
  },
  pagePaddingY: {
    mobile: spacing.lg,
    desktop: spacing.xxl,
  },
  sectionGap: {
    mobile: spacing.xl,
    desktop: spacing.xxl,
  },
} as const;

export const responsiveGrids = {
  oneToTwo: {
    mobile: "1fr",
    laptop: "repeat(2, minmax(0, 1fr))",
  },
  oneToThree: {
    mobile: "1fr",
    tablet: "repeat(2, minmax(0, 1fr))",
    desktop: "repeat(3, minmax(0, 1fr))",
  },
  colorScale: {
    mobile: "repeat(2, minmax(0, 1fr))",
    tablet: "repeat(3, minmax(0, 1fr))",
    desktop: "repeat(5, minmax(0, 1fr))",
  },
} as const;

export const shadows = {
  level0: "none",
  level1: "0 1px 4px rgba(0,0,0,0.06)",
  level2: "0 2px 8px rgba(0,0,0,0.08)",
  level3: "0 4px 12px rgba(0,0,0,0.10)",
  level4: "0 8px 24px rgba(0,0,0,0.12)",
};

export const interactionStates = {
  light: {
    default: colors.semantic.surface,
    hoverBackground: colors.neutral[100],
    hoverBorder: colors.primary[200],
    hoverContent: colors.primary[600],
    activeBackground: colors.primary[50],
    activeIndicator: colors.primary[500],
    focusRing: colors.primary[500],
  },
  dark: {
    default: colors.neutral[800],
    hoverBackground: colors.neutral[700],
    hoverBorder: colors.primary[300],
    hoverContent: colors.primary[200],
    activeBackground: colors.neutral[700],
    activeIndicator: colors.primary[300],
    focusRing: colors.primary[300],
  },
} as const;

export const borderWidths = {
  subtle: "1px",
  default: "1px",
  interactive: "2px",
  active: "3px",
  focus: "2px",
  accent: "4px",
} as const;

export const borderColors = {
  light: {
    subtle: colors.neutral[200],
    default: colors.neutral[300],
    interactive: colors.primary[200],
    active: colors.primary[500],
    focus: colors.primary[500],
    accent: colors.primary[500],
  },
  dark: {
    subtle: colors.neutral[700],
    default: colors.neutral[600],
    interactive: colors.primary[300],
    active: colors.primary[300],
    focus: colors.primary[300],
    accent: colors.primary[300],
  },
} as const;

export const buttonTokens = {
  types: {
    primary: {
      background: colors.primary[500],
      content: colors.semantic.surface,
      border: colors.primary[500],
      hoverBackground: colors.primary[600],
      hoverBorder: colors.primary[600],
    },
    secondary: {
      background: colors.semantic.surface,
      content: colors.primary[500],
      border: colors.primary[500],
      hoverBackground: colors.primary[50],
      hoverBorder: colors.primary[600],
    },
    tertiary: {
      background: "transparent",
      content: colors.primary[500],
      border: "transparent",
      hoverBackground: colors.primary[50],
      hoverBorder: "transparent",
    },
    icon: {
      background: colors.semantic.surface,
      content: colors.neutral[700],
      border: colors.neutral[200],
      hoverBackground: colors.neutral[100],
      hoverBorder: colors.primary[200],
    },
    destructive: {
      background: colors.semantic.error.main,
      content: colors.semantic.surface,
      border: colors.semantic.error.main,
      hoverBackground: colors.semantic.error.dark,
      hoverBorder: colors.semantic.error.dark,
    },
    disabled: {
      background: colors.neutral[100],
      content: colors.neutral[400],
      border: colors.neutral[200],
      hoverBackground: colors.neutral[100],
      hoverBorder: colors.neutral[200],
    },
  },
  darkTypes: {
    secondary: {
      background: colors.neutral[800],
      content: colors.primary[200],
      border: colors.primary[300],
      hoverBackground: colors.neutral[700],
      hoverBorder: colors.primary[200],
    },
    tertiary: {
      background: "transparent",
      content: colors.primary[200],
      border: "transparent",
      hoverBackground: colors.neutral[700],
      hoverBorder: "transparent",
    },
    icon: {
      background: colors.neutral[800],
      content: colors.neutral[300],
      border: colors.neutral[700],
      hoverBackground: colors.neutral[700],
      hoverBorder: colors.primary[300],
    },
    disabled: {
      background: colors.neutral[700],
      content: colors.neutral[500],
      border: colors.neutral[700],
      hoverBackground: colors.neutral[700],
      hoverBorder: colors.neutral[700],
    },
  },
  sizes: {
    sm: {
      height: "2rem",
      minWidth: "4rem",
      padding: "0.375rem 0.75rem",
      fontSize: "0.875rem",
      iconSize: 14,
    },
    md: {
      height: "2.5rem",
      minWidth: "5rem",
      padding: "0.5rem 1rem",
      fontSize: "0.875rem",
      iconSize: 14,
    },
    lg: {
      height: "3rem",
      minWidth: "6rem",
      padding: "0.75rem 1.25rem",
      fontSize: "1rem",
      iconSize: 16,
    },
  },
} as const;
