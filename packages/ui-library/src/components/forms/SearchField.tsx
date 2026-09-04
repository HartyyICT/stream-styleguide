"use client";

import { IconButton, InputAdornment } from "@mui/material";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { iconSizes } from "../../theme/tokens";
import Input from "./Input";

export interface SearchFieldProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
  value?: string;
  label?: string;
  fullWidth?: boolean;
}

export default function SearchField({
  onSearch,
  placeholder = "Search",
  debounceMs = 300,
  value: externalValue,
  label = "Search",
  fullWidth = true,
}: SearchFieldProps) {
  const [query, setQuery] = useState(externalValue ?? "");
  const timerRef = useRef<number | undefined>(undefined);

  const reportedRef = useRef(externalValue ?? "");
  const onSearchRef = useRef(onSearch);

  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    if (externalValue === undefined || externalValue === reportedRef.current) {
      return;
    }

    reportedRef.current = externalValue;
    setQuery(externalValue);
  }, [externalValue]);

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  function report(next: string) {
    reportedRef.current = next;
    onSearchRef.current(next);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const next = event.target.value;
    setQuery(next);

    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => report(next), debounceMs);
  }

  function handleClear() {
    window.clearTimeout(timerRef.current);
    setQuery("");
    report("");
  }

  return (
    <Input
      type="search"
      value={query}
      onChange={handleChange}
      placeholder={placeholder}
      fullWidth={fullWidth}
      slotProps={{
        htmlInput: { "aria-label": label },
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search size={iconSizes.small} aria-hidden="true" />
            </InputAdornment>
          ),
          endAdornment: query ? (
            <InputAdornment position="end">
              <IconButton aria-label="Clear search" onClick={handleClear} size="small">
                <X size={iconSizes.small} aria-hidden="true" />
              </IconButton>
            </InputAdornment>
          ) : undefined,
        },
      }}
    />
  );
}
