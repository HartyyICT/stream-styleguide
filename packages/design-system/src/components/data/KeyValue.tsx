"use client";

import { Typography } from "@mui/material";
import type { ReactNode } from "react";
import RowFlexBox from "../layout/RowFlexBox";

export interface KeyValueProps {
  label: ReactNode;
  value: ReactNode;
  emptyValue?: ReactNode;
  noWrap?: boolean;
}

export default function KeyValue({
  label,
  value,
  emptyValue = "—",
  noWrap = true,
}: KeyValueProps) {
  const shownValue = value === null || value === undefined || value === "" ? emptyValue : value;
  const primitive = typeof shownValue === "string" || typeof shownValue === "number";

  return (
    <RowFlexBox fullWidth centerY gap={1} sx={{ justifyContent: "space-between" }}>
      <Typography variant="body2" color="text.secondary" noWrap={noWrap}>
        {label}
      </Typography>
      {primitive ? (
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, textAlign: "right", minWidth: 0 }}
          noWrap={noWrap}
        >
          {shownValue}
        </Typography>
      ) : (
        shownValue
      )}
    </RowFlexBox>
  );
}
