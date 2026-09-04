"use client";

import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { MoreVertical } from "lucide-react";
import { useState, type MouseEvent, type ReactNode } from "react";
import { iconSizes, radius, spacing } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

export interface MenuAction {
  label: string;
  onSelect: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  tooltip?: string;
  destructive?: boolean;
}

export interface ActionsMenuProps {
  actions: MenuAction[];
  label?: string;
}

export default function ActionsMenu({ actions, label = "More actions" }: ActionsMenuProps) {
  const { semantic } = useSemanticColors();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  if (actions.length === 0) {
    return null;
  }

  function handleOpen(event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  }

  function handleSelect(action: MenuAction, event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
    action.onSelect();
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        aria-label={label}
        aria-haspopup="true"
        aria-expanded={open || undefined}
        onClick={handleOpen}
      >
        <MoreVertical size={iconSizes.small} aria-hidden="true" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: { borderRadius: radius.medium, minWidth: 180 } } }}
      >
        {actions.map((action) => {
          const item = (
            <MenuItem
              key={action.label}
              onClick={(event) => handleSelect(action, event)}
              disabled={action.disabled}
              sx={{
                gap: spacing.sm,
                color: action.destructive ? semantic.error : undefined,
                "& .MuiListItemIcon-root": {
                  minWidth: 0,
                  color: "inherit",
                },
              }}
            >
              {action.icon && <ListItemIcon>{action.icon}</ListItemIcon>}
              <ListItemText disableTypography>{action.label}</ListItemText>
            </MenuItem>
          );

          if (!action.tooltip) {
            return item;
          }

          return (
            <Tooltip key={action.label} title={action.tooltip} placement="left">
              <span>{item}</span>
            </Tooltip>
          );
        })}
      </Menu>
    </>
  );
}
