"use client";

import { Box, IconButton, Typography, type BoxProps } from "@mui/material";
import { Paperclip, Trash2, UploadCloud } from "lucide-react";
import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { borderWidths, iconSizes, radius, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";
import FieldShell from "./FieldShell";

export interface FileUploadProps {
  label: string;
  name: string;
  files: readonly File[];
  onFilesChange: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  placeholder?: string;
  description?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
  maxFileSizeBytes?: number;
  onRejected?: (files: File[]) => void;
  sx?: BoxProps["sx"];
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function matchesAccept(file: File, accept?: string) {
  if (!accept) {
    return true;
  }

  return accept
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)
    .some((value) => {
      if (value.startsWith(".")) {
        return file.name.toLowerCase().endsWith(value);
      }
      if (value.endsWith("/*")) {
        return file.type.toLowerCase().startsWith(value.slice(0, -1));
      }
      return file.type.toLowerCase() === value;
    });
}

export default function FileUpload({
  label,
  name,
  files,
  onFilesChange,
  multiple = false,
  accept,
  placeholder = "Drop files here or choose files",
  description,
  helperText,
  errorText,
  required = false,
  disabled = false,
  maxFileSizeBytes,
  onRejected,
  sx,
}: FileUploadProps) {
  const { borders, surface, subtleBackground, secondaryText, accent, semantic } =
    useSemanticColors();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function addFiles(nextFiles: File[]) {
    const accepted = nextFiles.filter(
      (file) =>
        matchesAccept(file, accept) &&
        (!maxFileSizeBytes || file.size <= maxFileSizeBytes),
    );
    const rejected = nextFiles.filter((file) => !accepted.includes(file));

    if (rejected.length) {
      onRejected?.(rejected);
    }

    if (accepted.length) {
      onFilesChange(multiple ? [...files, ...accepted] : accepted.slice(0, 1));
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    addFiles(Array.from(event.target.files ?? []));
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);

    if (!disabled) {
      addFiles(Array.from(event.dataTransfer.files));
    }
  }

  return (
    <FieldShell
      label={label}
      name={name}
      required={required}
      helperText={helperText}
      errorText={errorText}
      sx={sx}
    >
      {(fieldProps) => (
        <Box sx={{ display: "grid", gap: spacing.sm }}>
          <Box
            onDragEnter={(event) => {
              event.preventDefault();
              if (!disabled) setDragging(true);
            }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setDragging(false);
              }
            }}
            onDrop={handleDrop}
            onClick={() => !disabled && inputRef.current?.click()}
            onKeyDown={(event) => {
              if (!disabled && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                inputRef.current?.click();
              }
            }}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            aria-describedby={fieldProps["aria-describedby"]}
            sx={{
              minHeight: 176,
              px: spacing.lg,
              py: spacing.xl,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: spacing.sm,
              textAlign: "center",
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.65 : 1,
              color: errorText ? semantic.error : dragging ? accent : secondaryText,
              backgroundColor: dragging ? subtleBackground : surface,
              border: `${borderWidths.interactive} dashed ${
                errorText ? semantic.error : dragging ? accent : borders.default
              }`,
              borderRadius: radius.medium,
              transition: "color 160ms ease, border-color 160ms ease, background-color 160ms ease",
              "&:hover": disabled
                ? undefined
                : {
                    color: accent,
                    borderColor: accent,
                    backgroundColor: subtleBackground,
                  },
              "&:focus-visible": {
                outline: `${borderWidths.focus} solid ${accent}`,
                outlineOffset: 2,
              },
            }}
          >
            <UploadCloud size={iconSizes.extraLarge} aria-hidden="true" />
            <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 700 }}>
              {placeholder}
            </Typography>
            {description && <Typography variant="caption">{description}</Typography>}
            <input
              ref={inputRef}
              id={fieldProps.id}
              name={fieldProps.name}
              type="file"
              hidden
              multiple={multiple}
              accept={accept}
              required={required && files.length === 0}
              disabled={disabled}
              onChange={handleChange}
            />
          </Box>

          {files.map((file, index) => (
            <Box
              key={`${file.name}-${file.size}-${file.lastModified}`}
              sx={{
                px: spacing.md,
                py: spacing.sm,
                display: "flex",
                alignItems: "center",
                gap: spacing.sm,
                minWidth: 0,
                backgroundColor: subtleBackground,
                border: `${borderWidths.default} solid ${borders.subtle}`,
                borderRadius: radius.small,
              }}
            >
              <Paperclip size={iconSizes.small} color={accent} aria-hidden="true" />
              <Typography variant="body2" noWrap sx={{ minWidth: 0, flex: 1 }}>
                {file.name}
              </Typography>
              <Typography variant="caption" sx={{ color: secondaryText, flexShrink: 0 }}>
                {formatFileSize(file.size)}
              </Typography>
              <IconButton
                size="small"
                aria-label={`Remove ${file.name}`}
                disabled={disabled}
                onClick={(event) => {
                  event.stopPropagation();
                  onFilesChange(files.filter((_file, fileIndex) => fileIndex !== index));
                }}
              >
                <Trash2 size={iconSizes.small} aria-hidden="true" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </FieldShell>
  );
}
