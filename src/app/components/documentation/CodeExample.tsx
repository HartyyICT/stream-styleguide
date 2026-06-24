"use client";

import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import {
  BookOpen,
  Check,
  Code2,
  Copy,
  EyeOff,
  Grid3X3,
  Keyboard,
  Moon,
  MousePointer2,
  Palette,
  Pencil,
  Search,
  Settings,
  Trash2,
  Type,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { borderWidths, colors, radius, shadows, spacing } from "@/app/theme/tokens";
import Button from "./Button";
import Card from "./Card";
import { useDocumentationStyles } from "./useDocumentationStyles";

interface CodeExampleProps {
  title?: string;
  code: string;
  preview: ReactNode;
  renderPreview?: (code: string) => ReactNode;
  editable?: boolean;
}

export default function CodeExample({
  title,
  code,
  preview,
  renderPreview,
  editable = true,
}: CodeExampleProps) {
  const { borders, surface, subtleBackground, primaryText, secondaryText, accent } =
    useDocumentationStyles();
  const [currentCode, setCurrentCode] = useState(code);
  const [isEditing, setIsEditing] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(currentCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

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
        const Icon = codeValue.includes("<Settings") ? Settings : Search;

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

    const colorMatch = codeValue.match(/colors\.primary\[(\d+)\]/);
    if (colorMatch) {
      const shade = colorMatch[1] as unknown as keyof typeof colors.primary;
      const backgroundColor = colors.primary[shade] ?? colors.primary[500];

      return (
        <Box
          sx={{
            px: 2,
            py: 1,
            color: colors.semantic.surface,
            backgroundColor,
            borderRadius: radius.medium,
            fontWeight: 700,
          }}
        >
          Save changes
        </Box>
      );
    }

    if (codeValue.includes("Typography")) {
      const variant = codeValue.match(/variant=["']([^"']+)["']/)?.[1] ?? "h3";

      return (
        <Box>
          <Typography variant={variant === "body2" ? "body2" : "h3"}>
            {variant === "body2" ? "Supporting body text" : "Customer overview"}
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.75, color: secondaryText }}>
            Review activity, status and recent updates.
          </Typography>
        </Box>
      );
    }

    if (codeValue.includes("spacing.")) {
      const paddingToken = codeValue.match(/padding:\s*spacing\.(\w+)/)?.[1] as
        | keyof typeof spacing
        | undefined;
      const gapToken = codeValue.match(/gap:\s*spacing\.(\w+)/)?.[1] as
        | keyof typeof spacing
        | undefined;

      return (
        <Box
          sx={{
            display: "grid",
            gap: gapToken ? spacing[gapToken] : spacing.sm,
            p: paddingToken ? spacing[paddingToken] : spacing.md,
            border: `${borderWidths.default} solid ${borders.default}`,
            borderRadius: radius.medium,
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
      );
    }

    if (codeValue.includes("borderWidths")) {
      const isInteractive = codeValue.includes("interactive");

      return (
        <Box
          sx={{
            p: 2,
            color: isInteractive ? accent : primaryText,
            border: `${isInteractive ? borderWidths.interactive : borderWidths.default} solid ${
              isInteractive ? borders.interactive : borders.default
            }`,
            borderRadius: radius.medium,
            backgroundColor: isInteractive ? subtleBackground : surface,
            fontWeight: 700,
          }}
        >
          Interactive border
        </Box>
      );
    }

    const shadowMatch = codeValue.match(/shadows\.(level\d)/);
    if (shadowMatch) {
      const shadowToken = shadowMatch[1] as keyof typeof shadows;

      return (
        <Box
          sx={{
            p: spacing.md,
            borderRadius: radius.large,
            backgroundColor: surface,
            boxShadow: shadows[shadowToken] ?? shadows.level2,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            Raised surface
          </Typography>
        </Box>
      );
    }

    if (codeValue.includes("Card interactive")) {
      return (
        <Card interactive sx={{ display: "flex", alignItems: "center", gap: 1, color: secondaryText }}>
          <MousePointer2 size={20} />
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            Hover surface
          </Typography>
        </Card>
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
      return (
        <Box sx={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 1 }}>
          {["Mobile", "Tablet", "Desktop"].map((label) => (
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
          height: 112,
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
          borderBottom: `${borderWidths.subtle} solid ${borders.subtle}`,
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

        <Box sx={{ display: "flex", gap: 0.75 }}>
          <Button
            size="sm"
            variant="secondary"
            startIcon={showCode ? <EyeOff /> : <Code2 />}
            onClick={() => {
              setShowCode((value) => !value);
              setIsEditing(false);
            }}
            sx={{ minWidth: 112 }}
          >
            {showCode ? "Hide Code" : "Show Code"}
          </Button>

          {editable && (
            <Tooltip title={isEditing ? "Preview code" : "Edit code"}>
              <IconButton
                size="small"
                aria-label={isEditing ? "Preview code" : "Edit code"}
                onClick={() => {
                  setShowCode(true);
                  setIsEditing((value) => !value);
                }}
                sx={{
                  width: 32,
                  height: 32,
                  color: isEditing ? accent : secondaryText,
                  border: `${borderWidths.default} solid ${
                    isEditing ? accent : borders.default
                  }`,
                  borderRadius: radius.small,
                  "&:hover": {
                    color: accent,
                    borderColor: accent,
                    backgroundColor: subtleBackground,
                  },
                }}
              >
                <Pencil size={15} />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title={copied ? "Copied" : "Copy code"}>
            <IconButton
              size="small"
              aria-label={copied ? "Code copied" : "Copy code"}
              onClick={copyCode}
              sx={{
                width: 32,
                height: 32,
                color: copied ? accent : secondaryText,
                border: `${borderWidths.default} solid ${
                  copied ? accent : borders.default
                }`,
                borderRadius: radius.small,
                "&:hover": {
                  color: accent,
                  borderColor: accent,
                  backgroundColor: subtleBackground,
                },
              }}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
            </IconButton>
          </Tooltip>
        </Box>
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
            minHeight: 220,
            flex: 1,
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
            minHeight: 220,
            flex: 1,
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
