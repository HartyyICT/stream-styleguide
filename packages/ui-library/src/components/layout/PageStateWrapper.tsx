"use client";

import { Box } from "@mui/material";
import { useState, type ReactNode } from "react";
import { spacing } from "../../theme/tokens";
import Alert from "../feedback/Alert";
import Loading from "../feedback/Loading";

export type PageState = "content" | "loading" | "forbidden" | "error";

export interface ResolvePageStateOptions {
  hasRendered: boolean;
  isLoading: boolean;
  isError?: boolean;
  isForbidden?: boolean;
  preserveContent?: boolean;
}

export function resolvePageState({
  hasRendered,
  isLoading,
  isError = false,
  isForbidden = false,
  preserveContent = true,
}: ResolvePageStateOptions): PageState {
  if (preserveContent && hasRendered) {
    return "content";
  }
  if (!isLoading && !isError && !isForbidden) {
    return "content";
  }
  if (isLoading) {
    return "loading";
  }
  if (isForbidden) {
    return "forbidden";
  }
  return "error";
}

export interface PageStateWrapperProps {
  isLoading: boolean;
  isError?: boolean;
  isForbidden?: boolean;
  error?: unknown;
  loadingFallback?: ReactNode;
  errorFallback?: ReactNode | ((error: unknown) => ReactNode);
  forbiddenFallback?: ReactNode;
  preserveContent?: boolean;
  children: ReactNode;
}

export default function PageStateWrapper({
  isLoading,
  isError = false,
  isForbidden = false,
  error,
  loadingFallback,
  errorFallback,
  forbiddenFallback,
  preserveContent = true,
  children,
}: PageStateWrapperProps) {
  const [hasRendered, setHasRendered] = useState(false);
  const state = resolvePageState({
    hasRendered,
    isLoading,
    isError,
    isForbidden,
    preserveContent,
  });

  if (state === "content" && !hasRendered) {
    setHasRendered(true);
  }

  if (state === "loading") {
    return (
      loadingFallback ?? (
        <Box sx={{ minHeight: 240, display: "flex", alignItems: "center" }}>
          <Loading label="Loading page" />
        </Box>
      )
    );
  }

  if (state === "forbidden") {
    return (
      forbiddenFallback ?? (
        <Box sx={{ p: spacing.lg }}>
          <Alert
            severity="warning"
            title="Access denied"
            text="You do not have permission to view this page."
          />
        </Box>
      )
    );
  }

  if (state === "error") {
    return typeof errorFallback === "function" ? (
      errorFallback(error)
    ) : (
      errorFallback ?? (
        <Box sx={{ p: spacing.lg }}>
          <Alert
            severity="error"
            title="Unable to load page"
            text="Please try again later."
          />
        </Box>
      )
    );
  }

  return <>{children}</>;
}
