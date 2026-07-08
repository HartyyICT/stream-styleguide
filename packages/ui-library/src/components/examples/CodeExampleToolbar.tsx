"use client";

import { Code2, EyeOff } from "lucide-react";
import { Box } from "@mui/material";
import Button from "../buttons/Button";
import CopyAction from "./CopyAction";

interface CodeExampleToolbarProps {
  code: string;
  showCode: boolean;
  onToggleCode: () => void;
}

export default function CodeExampleToolbar({
  code,
  showCode,
  onToggleCode,
}: CodeExampleToolbarProps) {
  return (
    <Box sx={{ display: "flex", gap: 0.75, alignItems: "center" }}>
      <Button
        variant="secondary"
        size="sm"
        startIcon={showCode ? <EyeOff /> : <Code2 />}
        onClick={onToggleCode}
      >
        {showCode ? "Hide Code" : "Show Code"}
      </Button>
      <CopyAction value={code} />
    </Box>
  );
}
