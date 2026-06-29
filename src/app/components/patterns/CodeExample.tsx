"use client";

import { Box, Typography } from "@mui/material";
import {
  BookOpen,
  Check,
  Download,
  Filter,
  Grid3X3,
  Keyboard,
  Moon,
  MousePointer2,
  Palette,
  Search,
  Settings,
  Trash2,
  Type,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import {
  borderColors,
  borderWidths,
  colors,
  radius,
  shadows,
  spacing,
} from "@/app/theme/tokens";
import Button from "@/app/components/atoms/Button";
import Card from "@/app/components/atoms/Card";
import CodeExampleToolbar from "@/app/components/molecules/CodeExampleToolbar";
import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";

interface CodeExampleProps {
  title?: string;
  code: string;
  preview: ReactNode;
  renderPreview?: (code: string) => ReactNode;
  editable?: boolean;
  previewMinHeight?: number | string;
}

export default function CodeExample({
  title,
  code,
  preview,
  renderPreview,
  editable = true,
  previewMinHeight,
}: CodeExampleProps) {
  const { borders, surface, subtleBackground, primaryText, secondaryText, accent } =
    useDocumentationStyles();
  const [currentCode, setCurrentCode] = useState(code);
  const [isEditing, setIsEditing] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const isElevationExample = currentCode.includes("boxShadow");
  const needsTallPreview =
    isElevationExample ||
    currentCode.includes("borderWidths") ||
    (currentCode.includes("spacing.") && !currentCode.includes("gridTemplateColumns"));
  const codeLineCount = currentCode.split(/\r\n|\r|\n/).length;
  const codePanelHeight = Math.max(220, codeLineCount * 22 + 32);

  function getButtonLabel(codeValue: string, fallback: string) {
    const labelMatch = codeValue.match(/>\s*([^<>]+?)\s*<\/Button>/);
    return (
      labelMatch?.[1]
        ?.replace(/[{}>]/g, " ")
        .replace(/\s+/g, " ")
        .trim() || fallback
    );
  }

  function renderAutomaticPreview(codeValue: string) {
    const codeWithoutLineComments = codeValue.replace(/\/\/.*$/gm, "");
    const buttonVariant = codeValue.match(/variant=["']([^"']+)["']/)?.[1] as
      | "primary"
      | "secondary"
      | "tertiary"
      | "icon"
      | "destructive"
      | "disabled"
      | undefined;

    if (codeValue.includes("<Button")) {
      const iconOnly = /\siconOnly(\s|>)/.test(codeValue);

      if (iconOnly) {
        const Icon = codeValue.includes("<Settings")
          ? Settings
          : codeValue.includes("<Download")
            ? Download
            : codeValue.includes("<Filter")
              ? Filter
              : Search;

        return (
          <Button
            variant="icon"
            iconOnly
            aria-label={codeValue.match(/aria-label=["']([^"']+)["']/)?.[1] ?? "Icon action"}
          >
            <Icon />
          </Button>
        );
      }

      const StartIcon = codeValue.includes("Trash2")
        ? Trash2
        : codeValue.includes("Check")
          ? Check
          : undefined;

      return (
        <Button
          variant={buttonVariant}
          startIcon={StartIcon ? <StartIcon /> : undefined}
        >
          {getButtonLabel(codeValue, "Button")}
        </Button>
      );
    }

    const colorMatch = codeValue.match(/backgroundColor:\s*colors\.primary\[(\d+)\]/);
    if (colorMatch) {
      const shade = colorMatch[1] as unknown as keyof typeof colors.primary;
      const backgroundColor = colors.primary[shade] ?? colors.primary[500];
      const radiusToken = codeValue.match(/borderRadius:\s*radius\.(\w+)/)?.[1] as
        | keyof typeof radius
        | undefined;

      return (
        <Box
          sx={{
            px: 2,
            py: 1,
            color: colors.semantic.surface,
            backgroundColor,
            borderRadius: radiusToken ? radius[radiusToken] : radius.medium,
            fontWeight: 700,
          }}
        >
          Save changes
        </Box>
      );
    }

    if (codeValue.includes("Typography")) {
      const allowedTypographyVariants = [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "body1",
        "body2",
        "subtitle1",
        "subtitle2",
        "caption",
      ] as const;
      type TypographyVariant = (typeof allowedTypographyVariants)[number];
      const typographyMatches = [
        ...codeWithoutLineComments.matchAll(
          /<Typography\s+variant=["']([^"']+)["'][^>]*>([\s\S]*?)<\/Typography>/g,
        ),
      ];
      const typographyItems =
        typographyMatches.length > 0
          ? typographyMatches.map((match) => {
              const variant = allowedTypographyVariants.includes(
                match[1] as TypographyVariant,
              )
                ? (match[1] as TypographyVariant)
                : "body2";
              const text =
                match[2]
                  .replace(/<[^>]+>/g, "")
                  .replace(/\s+/g, " ")
                  .trim() || "Typography text";

              return { variant, text };
            })
          : [{ variant: "h3" as TypographyVariant, text: "Customer overview" }];

      return (
        <Box sx={{ textAlign: "center" }}>
          {typographyItems.map((item, index) => (
            <Typography
              key={`${item.variant}-${index}`}
              variant={item.variant}
              sx={{
                mt: index === 0 ? 0 : 0.75,
                color: index === 0 ? primaryText : secondaryText,
              }}
            >
              {item.text}
            </Typography>
          ))}
          <Typography
            component="code"
            variant="caption"
            sx={{
              display: "block",
              mt: 1,
              color: secondaryText,
              fontFamily: "var(--font-space-mono), monospace",
            }}
          >
            {typographyItems
              .map((item) => `variant="${item.variant}"`)
              .join(" / ")}
          </Typography>
        </Box>
      );
    }

    if (
      codeValue.includes("spacing.") &&
      !codeValue.includes("gridTemplateColumns") &&
      !codeValue.includes("boxShadow")
    ) {
      const paddingToken = codeValue.match(/padding:\s*spacing\.(\w+)/)?.[1] as
        | keyof typeof spacing
        | undefined;
      const gapToken = codeValue.match(/gap:\s*spacing\.(\w+)/)?.[1] as
        | keyof typeof spacing
        | undefined;
      const radiusName = codeValue.match(/borderRadius:\s*radius\.(\w+)/)?.[1];
      const radiusToken =
        radiusName && radiusName in radius
          ? (radiusName as keyof typeof radius)
          : undefined;
      const invalidRadius =
        radiusName && !radiusToken ? `Unknown radius: radius.${radiusName}` : null;

      return (
        <Box sx={{ display: "grid", gap: 1, justifyItems: "center" }}>
          <Box
            sx={{
              display: "grid",
              gap: gapToken ? spacing[gapToken] : spacing.sm,
              p: paddingToken ? spacing[paddingToken] : spacing.md,
              border: `${borderWidths.default} solid ${
                invalidRadius ? colors.semantic.error.main : borders.default
              }`,
              borderRadius: radiusToken ? radius[radiusToken] : radius.medium,
              backgroundColor: surface,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              Form section
            </Typography>
            <Typography variant="caption" sx={{ color: secondaryText }}>
              Token spacing preview
            </Typography>
          </Box>
          <Typography
            component="code"
            variant="caption"
            sx={{
              color: invalidRadius ? colors.semantic.error.main : secondaryText,
              fontFamily: "var(--font-space-mono), monospace",
            }}
          >
            {invalidRadius ?? `radius.${radiusToken ?? "medium"}`}
          </Typography>
        </Box>
      );
    }

    if (codeValue.includes("borderWidths")) {
      const widthToken = codeValue.match(/borderWidths\.(\w+)/)?.[1] as
        | keyof typeof borderWidths
        | undefined;
      const widthName = codeValue.match(/borderWidths\.(\w+)/)?.[1];
      const borderColorMatch = codeValue.match(
        /borderColors\.(light|dark)\.(\w+)/,
      );
      const borderMode = borderColorMatch?.[1] as keyof typeof borderColors | undefined;
      const borderRole = borderColorMatch?.[2] as
        | keyof typeof borderColors.light
        | undefined;
      const radiusToken = codeValue.match(/borderRadius:\s*radius\.(\w+)/)?.[1] as
        | keyof typeof radius
        | undefined;
      const textPrimaryName = codeValue.match(/color:\s*colors\.primary\[(\d+)\]/)?.[1];
      const backgroundNeutralName = codeValue.match(
        /backgroundColor:\s*colors\.neutral\[(\d+)\]/,
      )?.[1];
      const backgroundPrimaryName = codeValue.match(
        /backgroundColor:\s*colors\.primary\[(\d+)\]/,
      )?.[1];
      const backgroundNeutral =
        backgroundNeutralName && backgroundNeutralName in colors.neutral
          ? (backgroundNeutralName as unknown as keyof typeof colors.neutral)
          : undefined;
      const backgroundPrimary =
        backgroundPrimaryName && backgroundPrimaryName in colors.primary
          ? (backgroundPrimaryName as unknown as keyof typeof colors.primary)
          : undefined;
      const textPrimary =
        textPrimaryName && textPrimaryName in colors.primary
          ? (textPrimaryName as unknown as keyof typeof colors.primary)
          : undefined;
      const invalidMessages = [
        widthName && !(widthName in borderWidths)
          ? `Unknown width: borderWidths.${widthName}`
          : null,
        borderMode && borderRole && !(borderRole in borderColors[borderMode])
          ? `Unknown color: borderColors.${borderMode}.${borderRole}`
          : null,
        textPrimaryName && !(textPrimaryName in colors.primary)
          ? `Unknown text color: colors.primary[${textPrimaryName}]`
          : null,
        backgroundNeutralName && !(backgroundNeutralName in colors.neutral)
          ? `Unknown background: colors.neutral[${backgroundNeutralName}]`
          : null,
        backgroundPrimaryName && !(backgroundPrimaryName in colors.primary)
          ? `Unknown background: colors.primary[${backgroundPrimaryName}]`
          : null,
      ].filter(Boolean);
      const resolvedBorderColor =
        borderMode && borderRole
          ? borderColors[borderMode][borderRole]
          : borders.interactive;
      const resolvedBackground = backgroundPrimary
        ? colors.primary[backgroundPrimary]
        : backgroundNeutral
          ? colors.neutral[backgroundNeutral]
          : subtleBackground;

      return (
        <Box sx={{ display: "grid", gap: 1, justifyItems: "center" }}>
          <Box
            sx={{
              p: 2,
              color: textPrimary ? colors.primary[textPrimary] : primaryText,
              border: `${widthToken ? borderWidths[widthToken] : borderWidths.interactive} solid ${resolvedBorderColor}`,
              borderRadius: radiusToken ? radius[radiusToken] : radius.medium,
              backgroundColor: resolvedBackground,
              fontWeight: 700,
            }}
          >
            Interactive border
          </Box>
          <Typography
            component="code"
            variant="caption"
            sx={{
              color: invalidMessages.length
                ? colors.semantic.error.main
                : secondaryText,
              fontFamily: "var(--font-space-mono), monospace",
              textAlign: "center",
            }}
          >
            {invalidMessages.length
              ? invalidMessages.join(" · ")
              : `${widthToken ? `borderWidths.${widthToken}` : "borderWidths.interactive"} / ${
                  borderMode && borderRole
                    ? `borderColors.${borderMode}.${borderRole}`
                    : "borderColors.light.interactive"
                }`}
          </Typography>
        </Box>
      );
    }

    if (codeValue.includes("boxShadow")) {
      const shadowMatch = codeValue.match(/boxShadow:\s*shadows\.(\w+)/);
      const shadowName = shadowMatch?.[1];
      const shadowToken =
        shadowName && shadowName in shadows
          ? (shadowName as keyof typeof shadows)
          : undefined;
      const isInvalidShadow = Boolean(shadowName && !shadowToken);

      return (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
            p: spacing.lg,
            backgroundColor: colors.neutral[100],
            borderRadius: radius.medium,
          }}
        >
          <Box
            sx={{
              width: 220,
              minHeight: 96,
              p: spacing.md,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border:
                shadowToken === "level0" || isInvalidShadow
                  ? `${borderWidths.default} solid ${
                      isInvalidShadow ? colors.semantic.error.main : borders.default
                    }`
                  : "none",
              borderRadius: radius.large,
              backgroundColor: colors.semantic.surface,
              boxShadow: shadowToken ? shadows[shadowToken] : shadows.level0,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              Raised surface
            </Typography>
            <Typography
              component="code"
              variant="caption"
              sx={{
                mt: 2,
                color: isInvalidShadow ? colors.semantic.error.main : secondaryText,
                fontFamily: "var(--font-space-mono), monospace",
              }}
            >
              {isInvalidShadow
                ? `Unknown token: shadows.${shadowName}`
                : `shadows.${shadowToken}`}
            </Typography>
          </Box>
        </Box>
      );
    }

    if (codeValue.includes("HoverSurfaceExample") || codeValue.includes("MousePointer2")) {
      const isInteractiveCard = /<Card\s+interactive\b/.test(codeWithoutLineComments);
      const cardLabel =
        codeWithoutLineComments
          .match(/<MousePointer2[^>]*\/>\s*([^<]+?)\s*<\/Card>/)?.[1]
          ?.trim() || "Hover surface";

      return (
        <Box sx={{ display: "grid", gap: 1, justifyItems: "center" }}>
          <Card
            interactive={isInteractiveCard}
            sx={{
              minWidth: 220,
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: secondaryText,
            }}
          >
            <MousePointer2 size={20} />
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {cardLabel}
            </Typography>
          </Card>
          <Typography
            component="code"
            variant="caption"
            sx={{
              color: isInteractiveCard ? accent : secondaryText,
              fontFamily: "var(--font-space-mono), monospace",
            }}
          >
            {isInteractiveCard ? "<Card interactive>" : "<Card>"}
          </Typography>
        </Box>
      );
    }

    if (codeValue.includes("SearchModal")) {
      return (
        <Box
          sx={{
            width: "100%",
            maxWidth: 380,
            height: 40,
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 1.5,
            color: secondaryText,
            border: `${borderWidths.default} solid ${borders.default}`,
            borderRadius: radius.medium,
            backgroundColor: surface,
          }}
        >
          <Search size={18} />
          <Typography variant="body2" sx={{ flex: 1 }}>
            Search documentation...
          </Typography>
        </Box>
      );
    }

    if (codeValue.includes("Sidebar")) {
      return (
        <Box sx={{ width: 220, display: "grid", gap: 0.75 }}>
          {[
            ["Colors", Palette, true],
            ["Typography", Type, false],
            ["Spacing", Grid3X3, false],
          ].map(([label, Icon, active]) => {
            const ItemIcon = Icon as typeof Palette;

            return (
              <Box
                key={label as string}
                sx={{
                  minHeight: 38,
                  display: "grid",
                  gridTemplateColumns: "18px 1fr",
                  alignItems: "center",
                  gap: 1,
                  px: 1.25,
                  color: active ? accent : secondaryText,
                  borderRadius: radius.medium,
                  backgroundColor: active ? subtleBackground : surface,
                }}
              >
                <ItemIcon size={17} />
                <Typography variant="body2" sx={{ fontWeight: active ? 700 : 500 }}>
                  {label as string}
                </Typography>
              </Box>
            );
          })}
        </Box>
      );
    }

    if (codeValue.includes("Navbar")) {
      return (
        <Box
          sx={{
            width: "100%",
            maxWidth: 540,
            height: 52,
            px: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
            border: `${borderWidths.default} solid ${borders.default}`,
            borderRadius: radius.medium,
            backgroundColor: surface,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <BookOpen size={20} color={accent} />
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              Stream Design System
            </Typography>
          </Box>
          <Moon size={17} color={secondaryText} />
        </Box>
      );
    }

    if (codeValue.includes("aria-label") || codeValue.includes("Keyboard")) {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 1,
            color: accent,
            border: `${borderWidths.focus} solid ${borders.focus}`,
            borderRadius: radius.medium,
            backgroundColor: surface,
          }}
        >
          <Keyboard size={20} />
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            Keyboard reachable
          </Typography>
        </Box>
      );
    }

    if (codeValue.includes("gridTemplateColumns")) {
      const columns = codeValue.includes("repeat(3")
        ? "3 columns available"
        : codeValue.includes("repeat(2")
          ? "2 columns available"
          : "1 column";

      return (
        <Box sx={{ width: "100%", display: "grid", gap: 1.25 }}>
          <Typography
            component="code"
            variant="caption"
            sx={{
              color: accent,
              fontFamily: "var(--font-space-mono), monospace",
              textAlign: "center",
            }}
          >
            {columns}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: codeValue.includes("repeat(3")
                ? "repeat(3, minmax(0, 1fr))"
                : codeValue.includes("repeat(2")
                  ? "repeat(2, minmax(0, 1fr))"
                  : "1fr",
              gap: spacing.sm,
            }}
          >
            {["Customer", "Status", "Next action"].map((label) => (
              <Box
                key={label}
                sx={{
                  p: 1.5,
                  textAlign: "center",
                  border: `${borderWidths.default} solid ${borders.default}`,
                  borderRadius: radius.medium,
                  backgroundColor: surface,
                }}
              >
                <Typography variant="caption" sx={{ color: secondaryText }}>
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      );
    }

    return preview;
  }

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        p: 0,
      }}
    >
      {title && (
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderBottom: `${borderWidths.subtle} solid ${borders.subtle}`,
          }}
        >
          <Typography variant="h3">{title}</Typography>
        </Box>
      )}

      <Box
        sx={{
          minHeight: previewMinHeight ?? (needsTallPreview ? 160 : 112),
          height: "auto",
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          flexWrap: "wrap",
          backgroundColor: subtleBackground,
        }}
      >
        {renderPreview ? renderPreview(currentCode) : renderAutomaticPreview(currentCode)}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
          px: 1.25,
          py: 1,
          borderTop: `${borderWidths.subtle} solid ${borders.subtle}`,
          borderBottom: showCode ? `${borderWidths.subtle} solid ${borders.subtle}` : 0,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: secondaryText,
            fontFamily: "var(--font-space-mono), monospace",
          }}
        >
          Example code
        </Typography>

        <CodeExampleToolbar
          code={currentCode}
          showCode={showCode}
          editable={editable}
          isEditing={isEditing}
          onToggleCode={() => {
            setShowCode((value) => !value);
            setIsEditing(false);
          }}
          onToggleEdit={() => {
            setShowCode(true);
            setIsEditing((value) => !value);
          }}
        />
      </Box>

      {showCode && isEditing ? (
        <Box
          component="textarea"
          value={currentCode}
          aria-label="Editable example code"
          onChange={(event) => setCurrentCode(event.target.value)}
          spellCheck={false}
          sx={{
            width: "100%",
            height: codePanelHeight,
            minHeight: codePanelHeight,
            flex: "0 0 auto",
            boxSizing: "border-box",
            p: 2,
            display: "block",
            resize: "none",
            border: 0,
            color: primaryText,
            backgroundColor: surface,
            outline: "none",
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "0.8125rem",
            lineHeight: 1.7,
            overflow: "auto",
            whiteSpace: "pre-wrap",
            overflowWrap: "anywhere",
          }}
        />
      ) : showCode ? (
        <Box
          component="pre"
          sx={{
            m: 0,
            p: 2,
            height: codePanelHeight,
            minHeight: codePanelHeight,
            flex: "0 0 auto",
            boxSizing: "border-box",
            overflow: "hidden",
            color: primaryText,
            backgroundColor: surface,
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "0.8125rem",
            lineHeight: 1.7,
            whiteSpace: "pre-wrap",
            overflowWrap: "anywhere",
          }}
        >
          <code>{currentCode}</code>
        </Box>
      ) : null}
    </Card>
  );
}
