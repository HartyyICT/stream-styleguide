"use client";

import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { useState } from "react";
import {
  Card,
  borderWidths,
  useSemanticColors,
} from "@ssw/ui-library";
import CodeExampleToolbar from "./CodeExampleToolbar";

interface CodeExampleProps {
  title?: string;
  code: string;
  preview?: ReactNode;
  renderPreview?: (code: string) => ReactNode;
  editable?: boolean;
  previewMinHeight?: number | string;
}

export default function CodeExample({
  title,
  code,
  preview,
  renderPreview,
  previewMinHeight,
}: CodeExampleProps) {
  const { borders, surface, subtleBackground, primaryText, secondaryText } =
    useSemanticColors();
  const [showCode, setShowCode] = useState(false);
  const needsTallPreview =
    code.includes("boxShadow") ||
    code.includes("borderWidths") ||
    (code.includes("spacing.") && !code.includes("gridTemplateColumns"));
  const codePanelHeight = Math.max(220, code.split(/\r\n|\r|\n/).length * 22 + 32);
  const hasPreview = Boolean(renderPreview) || (preview !== null && preview !== undefined);

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

      {hasPreview && (
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
          {renderPreview ? renderPreview(code) : preview}
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
          px: 1.25,
          py: 1,
          borderTop: `${borderWidths.subtle} solid ${borders.subtle}`,
          borderBottom: showCode
            ? `${borderWidths.subtle} solid ${borders.subtle}`
            : 0,
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
          code={code}
          showCode={showCode}
          onToggleCode={() => setShowCode((value) => !value)}
        />
      </Box>

      {showCode && (
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
          <code>{code}</code>
        </Box>
      )}
    </Card>
  );
}
