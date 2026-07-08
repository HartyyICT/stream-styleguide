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
    success: { light: "#22C35D", main: "#22C35D", dark: "#1A8E46" },
    warning: { light: "#FFBA6B", main: "#FF8800", dark: "#CC6D00" },
    error: { light: "#FF7070", main: "#C32222", dark: "#991B1B" },
    info: { light: "#A3CEFF", main: "#297CD9", dark: "#034B9C" },
  },
};

export const semanticStateColors = {
  light: {
    success: colors.semantic.success.light,
    warning: colors.semantic.warning.light,
    error: colors.semantic.error.light,
    info: colors.semantic.info.light,
  },
  dark: {
    success: colors.semantic.success.dark,
    warning: colors.semantic.warning.dark,
    error: colors.semantic.error.dark,
    info: colors.semantic.info.dark,
  },
} as const;

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
  pill: "999px",
  circle: "50%",
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

export const pageLayoutTokens = {
  navbarHeight: responsiveLayout.navbarHeight,
  shellMaxWidth: responsiveLayout.shellMaxWidth,
  contentMaxWidth: responsiveLayout.contentMaxWidth,
  wideContentMaxWidth: 980,
  dataContentMaxWidth: 1100,
  onThisPageWidth: responsiveLayout.onThisPageWidth,
  articleScrollMarginTop: 96,
  sectionScrollMarginTop: 96,
  introDescriptionMaxWidth: 720,
  contentGridColumns: {
    mobile: "1fr",
    desktop: `minmax(0, 1fr) ${responsiveLayout.onThisPageWidth}px`,
  },
  shellPaddingX: responsiveLayout.pagePaddingX,
  shellPaddingY: responsiveLayout.pagePaddingY,
  sectionGap: responsiveLayout.sectionGap,
  contentGap: {
    mobile: responsiveLayout.sectionGap.mobile,
    desktop: responsiveLayout.sectionGap.desktop,
  },
  sectionDividerMarginY: spacing.xxl,
  sectionDescriptionMarginBottom: spacing.lg,
  notePadding: spacing.lg,
  noteMarginBottom: spacing.xxl,
} as const;

export const navbarTokens = {
  actionSize: "2.375rem",
  actionSlotSize: "2.375rem",
  actionEdgeInset: "0.8125rem",
  actionGap: spacing.sm,
  searchWidth: "32rem",
  searchTextMaxWidth: "19rem",
  shortcutPaddingX: "0.375rem",
  shortcutPaddingY: "0.125rem",
  profileAvatarSize: "1.5rem",
  profileChevronSlotSize: "1.75rem",
  profileTextMaxWidth: "9rem",
  profileMenuWidth: "17.5rem",
  profileMenuAvatarSize: "2.5rem",
  menuItemMinHeight: "2.25rem",
  menuItemPaddingX: "1.125rem",
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
  typography: {
    fontWeight: 500,
  },
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
  },
  disabledState: {
    background: colors.neutral[100],
    content: colors.neutral[400],
    border: colors.neutral[200],
    hoverBackground: colors.neutral[100],
    hoverBorder: colors.neutral[200],
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
  },
  darkDisabledState: {
    background: colors.neutral[700],
    content: colors.neutral[500],
    border: colors.neutral[700],
    hoverBackground: colors.neutral[700],
    hoverBorder: colors.neutral[700],
  },
  sizes: {
    sm: {
      height: "1.75rem",
      minWidth: "3.5rem",
      padding: "0.25rem 0.625rem",
      fontSize: "0.875rem",
      iconSize: 14,
    },
    md: {
      height: "2.25rem",
      minWidth: "4.5rem",
      padding: "0.4375rem 0.875rem",
      fontSize: "0.875rem",
      iconSize: 14,
    },
    lg: {
      height: "2.75rem",
      minWidth: "5.5rem",
      padding: "0.625rem 1.125rem",
      fontSize: "1rem",
      iconSize: 16,
    },
  },
} as const;

export const tableTokens = {
  density: {
    compact: {
      rowHeight: "2.5rem",
      cellPadding: `${spacing.sm} ${spacing.md}`,
      use: "Dense data views and dashboards",
    },
    comfortable: {
      rowHeight: "3rem",
      cellPadding: `${spacing.md} ${spacing.lg}`,
      use: "Default enterprise tables",
    },
    spacious: {
      rowHeight: "3.5rem",
      cellPadding: `${spacing.lg} ${spacing.xl}`,
      use: "Review screens and low-density content",
    },
  },
  columns: {
    label: {
      minWidth: "12rem",
      alignment: "left",
    },
    numeric: {
      minWidth: "7rem",
      alignment: "right",
    },
    status: {
      minWidth: "8rem",
      alignment: "left",
    },
    action: {
      minWidth: "5rem",
      alignment: "right",
    },
  },
} as const;

export const formTokens = {
  field: {
    height: "2.75rem",
    minHeight: "2.75rem",
    paddingX: spacing.md,
    paddingY: "0.625rem",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    gap: spacing.xs,
    focusRing: `0 0 0 3px ${colors.primary[50]}`,
    focusOutlineOffset: "2px",
    hoverIndicatorHeight: 2,
    selectIconPaddingRight: "2.5rem",
    selectIconOffsetInline: spacing.md,
  },
  textarea: {
    minHeight: "7rem",
    padding: spacing.md,
    lineHeight: 1.7,
  },
  label: {
    gap: spacing.xs,
    rowHeight: "1.25rem",
  },
  helperText: {
    gap: spacing.xs,
  },
  choice: {
    size: 18,
    indicatorSize: 6,
    disabledOpacity: 0.65,
  },
  toggle: {
    width: 44,
    height: 24,
    padding: "2px",
    thumbSize: 20,
    thumbOffset: "20px",
    disabledOpacity: 0.65,
    transition: "background-color 160ms ease, opacity 160ms ease",
    thumbTransition: "transform 160ms ease",
  },
  toggleField: {
    minHeight: "3.5rem",
    disabledOpacity: 0.75,
  },
  layout: {
    singleColumn: "minmax(0, 1fr)",
    twoColumn: "repeat(2, minmax(0, 1fr))",
    sectionGap: spacing.lg,
  },
  states: {
    default: {
      border: colors.neutral[300],
      background: colors.semantic.surface,
      content: colors.neutral[900],
    },
    hover: {
      border: colors.primary[200],
      background: colors.semantic.surface,
      content: colors.neutral[900],
    },
    focus: {
      border: colors.primary[500],
      background: colors.semantic.surface,
      content: colors.neutral[900],
    },
    error: {
      border: colors.semantic.error.main,
      background: colors.semantic.surface,
      content: colors.neutral[900],
    },
    success: {
      border: colors.semantic.success.main,
      background: colors.semantic.surface,
      content: colors.neutral[900],
    },
    warning: {
      border: colors.semantic.warning.main,
      background: colors.semantic.surface,
      content: colors.neutral[900],
    },
    info: {
      border: colors.semantic.info.main,
      background: colors.semantic.surface,
      content: colors.neutral[900],
    },
    disabled: {
      border: colors.neutral[200],
      background: colors.neutral[100],
      content: colors.neutral[400],
    },
  },
} as const;

export const wizardTokens = {
  shellPadding: spacing.lg,
  panelGap: "0rem",
  panelColumnWidth: "280px",
  cardPadding: spacing.lg,
  fieldGap: spacing.md,
  stepGap: spacing.md,
  stepHeight: "4.5rem",
  stepIconSize: 24,
  contentMinHeight: {
    mobile: 560,
    desktop: 604,
  },
  bodyMinHeight: 300,
} as const;

export const tablePreviewTokens = {
  columns: "2fr 1.4fr 1.2fr 88px",
  headerFontSize: "0.8125rem",
} as const;
