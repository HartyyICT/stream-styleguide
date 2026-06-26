"use client";

import { Code2, EyeOff, Pencil } from "lucide-react";
import { Box } from "@mui/material";
import Button from "@/app/components/atoms/Button";
import CopyAction from "@/app/components/molecules/CopyAction";

interface CodeExampleToolbarProps {
  code: string;
  showCode: boolean;
  editable?: boolean;
  isEditing?: boolean;
  onToggleCode: () => void;
  onToggleEdit?: () => void;
}

export default function CodeExampleToolbar({
  code,
  showCode,
  editable = true,
  isEditing = false,
  onToggleCode,
  onToggleEdit,
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
      {editable && onToggleEdit && (
        <Button
          variant="icon"
          size="sm"
          iconOnly
          aria-label={isEditing ? "Preview code" : "Edit code"}
          onClick={onToggleEdit}
        >
          <Pencil />
        </Button>
      )}
      <CopyAction value={code} />
    </Box>
  );
}
