"use client";

import { Box, type BoxProps } from "@mui/material";
import type { ReactNode } from "react";
import { formTokens } from "../../theme/tokens";
import ErrorText from "./ErrorText";
import HelperText from "./HelperText";
import Label from "./Label";

export interface FieldAccessibilityProps {
  id: string;
  name: string;
  required: boolean;
  error: boolean;
  "aria-describedby"?: string;
}

interface FieldShellProps extends Omit<BoxProps, "children"> {
  label: string;
  name: string;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  children: (props: FieldAccessibilityProps) => ReactNode;
}

export default function FieldShell({
  label,
  name,
  required = false,
  helperText,
  errorText,
  children,
  sx,
  ...props
}: FieldShellProps) {
  const helperId = helperText && !errorText ? `${name}-helper` : undefined;
  const errorId = errorText ? `${name}-error` : undefined;
  const describedBy = helperId ?? errorId;

  return (
    <Box
      {...props}
      sx={{
        display: "grid",
        gridTemplateRows: `${formTokens.label.rowHeight} auto minmax(${formTokens.label.rowHeight}, auto)`,
        gap: formTokens.label.gap,
        alignSelf: "start",
        minWidth: 0,
        ...sx,
      }}
    >
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      {children({
        id: name,
        name,
        required,
        error: Boolean(errorText),
        "aria-describedby": describedBy,
      })}
      {helperId && <HelperText id={helperId}>{helperText!}</HelperText>}
      {errorId && <ErrorText id={errorId}>{errorText!}</ErrorText>}
    </Box>
  );
}
