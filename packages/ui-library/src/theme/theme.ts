import { createTheme, type PaletteMode } from "@mui/material/styles";
import {
  borderColors,
  borderWidths,
  breakpoints,
  buttonTokens,
  colors,
  formTokens,
  interactionStates,
  radius,
  semanticStateColors,
  shadows,
} from "./tokens";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    fontFamilyHeading: string;
    fontFamilyMonospace: string;
  }

  interface TypographyVariantsOptions {
    fontFamilyHeading?: string;
    fontFamilyMonospace?: string;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
    tertiary: true;
    icon: true;
    destructive: true;
    text: false;
    outlined: false;
    contained: false;
  }

  interface ButtonPropsSizeOverrides {
    sm: true;
    md: true;
    lg: true;
  }
}

declare module "@mui/material/OutlinedInput" {
  interface OutlinedInputPropsColorOverrides {
    success: true;
    warning: true;
    info: true;
  }
}

declare module "@mui/material/TextField" {
  interface TextFieldPropsColorOverrides {
    success: true;
    warning: true;
    info: true;
  }
}

const buttonVariantKeys = [
  "primary",
  "secondary",
  "tertiary",
  "icon",
  "destructive",
] as const;

const buttonSizeKeys = ["sm", "md", "lg"] as const;

const fontFamilies = {
  body: "var(--font-open-sans), Arial, sans-serif",
  heading: "var(--font-poppins), Arial, sans-serif",
  monospace: "var(--font-space-mono), monospace",
};

export const createAppTheme = (mode: PaletteMode) =>
  createTheme({
  breakpoints: {
    values: {
      xs: breakpoints.mobile,
      sm: breakpoints.tablet,
      md: breakpoints.laptop,
      lg: breakpoints.desktop,
      xl: 1536,
    },
  },
  palette: {
    mode,
    common: {
      black: colors.neutral[900],
      white: colors.semantic.surface,
    },
    grey: {
      50: colors.neutral[50],
      100: colors.neutral[100],
      200: colors.neutral[200],
      300: colors.neutral[300],
      400: colors.neutral[400],
      500: colors.neutral[500],
      600: colors.neutral[600],
      700: colors.neutral[700],
      800: colors.neutral[800],
      900: colors.neutral[900],
      A100: colors.neutral[100],
      A200: colors.neutral[200],
      A400: colors.neutral[400],
      A700: colors.neutral[700],
    },
    primary: {
      light: colors.primary[100],
      main: mode === "light" ? colors.primary[500] : colors.primary[300],
      dark: colors.primary[700],
      contrastText: colors.semantic.surface,
    },
    background: {
      default:
        mode === "light" ? colors.semantic.background : colors.neutral[900],
      paper:
        mode === "light" ? colors.semantic.surface : colors.neutral[800],
    },
    text: {
      primary:
        mode === "light" ? colors.neutral[900] : colors.neutral[50],
      secondary:
        mode === "light" ? colors.neutral[600] : colors.neutral[300],
      disabled: colors.neutral[400],
    },
    success: {
      ...colors.semantic.success,
      main:
        mode === "light"
          ? colors.semantic.success.light
          : colors.semantic.success.dark,
      contrastText:
        mode === "light" ? colors.neutral[900] : colors.semantic.surface,
    },
    warning: {
      ...colors.semantic.warning,
      main:
        mode === "light"
          ? colors.semantic.warning.light
          : colors.semantic.warning.dark,
      contrastText:
        mode === "light" ? colors.neutral[900] : colors.semantic.surface,
    },
    error: {
      ...colors.semantic.error,
      main:
        mode === "light"
          ? colors.semantic.error.light
          : colors.semantic.error.dark,
      contrastText:
        mode === "light" ? colors.neutral[900] : colors.semantic.surface,
    },
    info: {
      ...colors.semantic.info,
      main:
        mode === "light"
          ? colors.semantic.info.light
          : colors.semantic.info.dark,
      contrastText:
        mode === "light" ? colors.neutral[900] : colors.semantic.surface,
    },
    divider: mode === "light" ? colors.neutral[200] : colors.neutral[700],
    action: {
      active: mode === "light" ? colors.neutral[600] : colors.neutral[300],
      hover:
        mode === "light"
          ? interactionStates.light.hoverBackground
          : interactionStates.dark.hoverBackground,
      selected:
        mode === "light"
          ? interactionStates.light.activeBackground
          : interactionStates.dark.activeBackground,
      disabled: colors.neutral[400],
      disabledBackground:
        mode === "light" ? colors.neutral[100] : colors.neutral[800],
      focus: mode === "light" ? colors.primary[100] : colors.neutral[700],
    },
  },

  typography: {
    fontFamily: fontFamilies.body,
    fontFamilyHeading: fontFamilies.heading,
    fontFamilyMonospace: fontFamilies.monospace,

    h1: {
      fontFamily: fontFamilies.heading,
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: fontFamilies.heading,
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.25,
    },
    h3: {
      fontFamily: fontFamilies.heading,
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: fontFamilies.heading,
      fontSize: "1.125rem",
      fontWeight: 500,
      lineHeight: 1.35,
    },
    h5: {
      fontFamily: fontFamilies.heading,
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: fontFamilies.heading,
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.45,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.45,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.35,
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.3,
    },
    button: {
      fontFamily: fontFamilies.heading,
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.4,
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: Number.parseFloat(radius.medium) * 16,
  },
  components: (() => {
    const formBorders = mode === "light" ? borderColors.light : borderColors.dark;
    const formSemantic =
      mode === "light" ? semanticStateColors.light : semanticStateColors.dark;
    const formInteraction =
      mode === "light" ? interactionStates.light : interactionStates.dark;
    const formSurface =
      mode === "light" ? colors.semantic.surface : colors.neutral[800];
    const formContent = mode === "light" ? colors.neutral[900] : colors.neutral[50];
    const formPlaceholder =
      mode === "light" ? colors.neutral[400] : colors.neutral[500];
    const formDisabledBackground =
      mode === "light" ? colors.neutral[100] : colors.neutral[700];
    const formDisabledContent =
      mode === "light" ? colors.neutral[400] : colors.neutral[500];
    const formDisabledBorder =
      mode === "light" ? colors.neutral[200] : colors.neutral[700];
    const choiceDefaultColor = formBorders.default;
    const choiceCheckedColor = formInteraction.activeIndicator;

    return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          colorScheme: mode,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          boxSizing: "border-box",
          border: `${borderWidths.subtle} solid ${
            mode === "light"
              ? borderColors.light.subtle
              : borderColors.dark.subtle
          }`,
          borderRadius: radius.medium,
          color:
            mode === "light" ? colors.neutral[600] : colors.neutral[300],
          backgroundColor:
            mode === "light"
              ? colors.semantic.surface
              : colors.neutral[800],
          "&:hover": {
            color:
              mode === "light"
                ? interactionStates.light.hoverContent
                : interactionStates.dark.hoverContent,
            border: `${borderWidths.interactive} solid ${
              mode === "light"
                ? interactionStates.light.hoverBorder
                : interactionStates.dark.hoverBorder
            }`,
            backgroundColor:
              mode === "light"
                ? interactionStates.light.hoverBackground
                : interactionStates.dark.hoverBackground,
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        centerRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          border: `${borderWidths.default} solid transparent`,
          borderRadius: radius.medium,
          textTransform: "none",
          "&.Mui-disabled": {
            cursor: "not-allowed",
            pointerEvents: "auto",
            color: (mode === "light"
              ? buttonTokens.disabledState
              : buttonTokens.darkDisabledState
            ).content,
            backgroundColor: (mode === "light"
              ? buttonTokens.disabledState
              : buttonTokens.darkDisabledState
            ).background,
            borderColor: (mode === "light"
              ? buttonTokens.disabledState
              : buttonTokens.darkDisabledState
            ).border,
          },
          "&:focus-visible": {
            outline: `${borderWidths.focus} solid ${
              mode === "light" ? colors.primary[500] : colors.primary[300]
            }`,
            outlineOffset: 2,
          },
        },
      },
      variants: [
        ...buttonVariantKeys.map((variantKey) => {
          const variantTokens =
            mode === "dark" && variantKey in buttonTokens.darkTypes
              ? buttonTokens.darkTypes[
                  variantKey as keyof typeof buttonTokens.darkTypes
                ]
              : buttonTokens.types[variantKey];

          return {
            props: { variant: variantKey },
            style: {
              color: variantTokens.content,
              backgroundColor: variantTokens.background,
              borderColor: variantTokens.border,
              "&:hover": {
                backgroundColor: variantTokens.hoverBackground,
                borderColor: variantTokens.hoverBorder,
                boxShadow: variantKey === "primary" ? shadows.level1 : shadows.level0,
              },
            },
          };
        }),
        ...buttonSizeKeys.map((sizeKey) => {
          const sizeTokens = buttonTokens.sizes[sizeKey];

          return {
            props: { size: sizeKey },
            style: {
              height: sizeTokens.height,
              minWidth: sizeTokens.minWidth,
              padding: sizeTokens.padding,
              fontSize: sizeTokens.fontSize,
              "& svg": {
                width: sizeTokens.iconSize,
                height: sizeTokens.iconSize,
              },
            },
          };
        }),
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: radius.medium,
          backgroundColor: formSurface,
          color: formContent,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: formBorders.default,
            borderWidth: borderWidths.default,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: formBorders.interactive,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: formBorders.focus,
            boxShadow: `0 0 0 3px ${formInteraction.activeBackground}`,
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: formSemantic.error,
          },
          "&.Mui-disabled": {
            backgroundColor: formDisabledBackground,
          },
          "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
            borderColor: formDisabledBorder,
          },
          "& .MuiInputBase-inputMultiline": {
            minHeight: formTokens.textarea.minHeight,
            lineHeight: formTokens.textarea.lineHeight,
            padding: formTokens.textarea.padding,
          },
        },
        input: {
          padding: `${formTokens.field.paddingY} ${formTokens.field.paddingX}`,
          fontSize: formTokens.field.fontSize,
          lineHeight: formTokens.field.lineHeight,
          "&::placeholder": {
            color: formPlaceholder,
            opacity: 1,
          },
          "&.Mui-disabled": {
            WebkitTextFillColor: formDisabledContent,
          },
        },
      },
      variants: [
        {
          props: { color: "success" as const },
          style: {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: formSemantic.success,
            },
          },
        },
        {
          props: { color: "warning" as const },
          style: {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: formSemantic.warning,
            },
          },
        },
        {
          props: { color: "info" as const },
          style: {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: formSemantic.info,
            },
          },
        },
      ],
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            cursor: "not-allowed",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          paddingRight: formTokens.field.selectIconPaddingRight,
        },
        icon: {
          right: formTokens.field.selectIconOffsetInline,
          color: mode === "light" ? colors.neutral[600] : colors.neutral[300],
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0,
          width: formTokens.choice.size,
          height: formTokens.choice.size,
          borderRadius: radius.small,
          "&.Mui-disabled": {
            opacity: formTokens.choice.disabledOpacity,
          },
        },
      },
      variants: [
        {
          props: { color: "default" as const },
          style: {
            color: choiceDefaultColor,
            "&.Mui-checked": {
              color: choiceCheckedColor,
            },
          },
        },
      ],
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: 0,
          width: formTokens.choice.size,
          height: formTokens.choice.size,
          "&.Mui-disabled": {
            opacity: formTokens.choice.disabledOpacity,
          },
        },
      },
      variants: [
        {
          props: { color: "default" as const },
          style: {
            color: choiceDefaultColor,
            "&.Mui-checked": {
              color: choiceCheckedColor,
            },
          },
        },
      ],
    },
    };
  })(),
});
