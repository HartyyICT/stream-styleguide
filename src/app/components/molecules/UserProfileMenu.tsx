"use client";

import {
  Avatar,
  Box,
  ButtonBase,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { ChevronDown, LogOut, Moon, Sun, UserRound } from "lucide-react";
import { useState } from "react";
import {
  borderColors,
  borderWidths,
  colors,
  iconSizes,
  interactionStates,
  navbarTokens,
  radius,
  shadows,
} from "../../theme/tokens";
import { useColorMode } from "../../theme/themeProvider";

type UserProfileMenuProps = {
  name?: string;
  email?: string;
  role?: string;
};

export default function UserProfileMenu({
  name = "Hartiessan Asep",
  email = "hartiessan.asep@streamsoftware.nl",
  role = "Design system",
}: UserProfileMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { mode, toggleColorMode } = useColorMode();
  const isDarkMode = mode === "dark";
  const open = Boolean(anchorEl);
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const surface = isDarkMode ? colors.neutral[800] : colors.semantic.surface;
  const raisedSurface = isDarkMode ? colors.neutral[800] : colors.semantic.surface;
  const borders = isDarkMode ? borderColors.dark : borderColors.light;
  const interaction = isDarkMode ? interactionStates.dark : interactionStates.light;
  const primaryText = isDarkMode ? colors.neutral[50] : colors.neutral[900];
  const secondaryText = isDarkMode ? colors.neutral[300] : colors.neutral[600];
  const mutedText = isDarkMode ? colors.neutral[400] : colors.neutral[500];
  const avatarBackground = isDarkMode ? colors.primary[300] : colors.primary[500];
  const avatarColor = isDarkMode ? colors.neutral[900] : colors.semantic.surface;

  return (
    <>
      <ButtonBase
        type="button"
        aria-label="Open user menu"
        aria-haspopup="menu"
        aria-expanded={open ? "true" : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{
          height: navbarTokens.actionSize,
          display: "flex",
          alignItems: "center",
          gap: 0,
          p: 0,
          borderRadius: radius.medium,
          color: primaryText,
          backgroundColor: surface,
          border: `${borderWidths.subtle} solid ${borders.subtle}`,
          transition:
            "background-color 160ms ease, border-color 160ms ease, color 160ms ease",
          "&:hover": {
            color: interaction.hoverContent,
            backgroundColor: interaction.hoverBackground,
            borderColor: interaction.hoverBorder,
          },
          "&:focus-visible": {
            outline: `${borderWidths.focus} solid ${interaction.focusRing}`,
            outlineOffset: 2,
          },
        }}
      >
        <Box
          sx={{
            width: navbarTokens.profileChevronSlotSize,
            height: navbarTokens.actionSlotSize,
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <Avatar
            sx={{
              width: navbarTokens.profileAvatarSize,
              height: navbarTokens.profileAvatarSize,
              fontSize: "0.75rem",
              fontWeight: 700,
              color: avatarColor,
              backgroundColor: avatarBackground,
            }}
          >
            {initials}
          </Avatar>
        </Box>

        <Box
          sx={{
            display: { xs: "none", lg: "block" },
            minWidth: 0,
            textAlign: "left",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              maxWidth: navbarTokens.profileTextMaxWidth,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "inherit",
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {name}
          </Typography>
        </Box>

        <Box
          sx={{
            width: navbarTokens.actionSlotSize,
            height: navbarTokens.actionSlotSize,
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <ChevronDown
            size={iconSizes.small}
            aria-hidden="true"
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 160ms ease",
            }}
          />
        </Box>
      </ButtonBase>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        disableScrollLock
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              width: navbarTokens.profileMenuWidth,
              mt: 1,
              borderRadius: radius.medium,
              border: `${borderWidths.subtle} solid ${borders.subtle}`,
              backgroundColor: raisedSurface,
              boxShadow: shadows.level3,
              overflow: "hidden",
            },
          },
          list: {
            "aria-label": "User menu",
            sx: { p: 0 },
          },
        }}
      >
        <Box sx={{ display: "flex", gap: 1.5, p: 2 }}>
          <Avatar
            sx={{
              width: navbarTokens.profileMenuAvatarSize,
              height: navbarTokens.profileMenuAvatarSize,
              fontSize: "0.875rem",
              fontWeight: 700,
              color: avatarColor,
              backgroundColor: avatarBackground,
            }}
          >
            {initials}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ color: primaryText, fontWeight: 700, lineHeight: 1.3 }}>
              {name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: secondaryText,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {email}
            </Typography>
            <Typography variant="caption" sx={{ color: mutedText }}>
              {role}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: borders.subtle }} />

        <MenuItem
          onClick={() => setAnchorEl(null)}
          sx={{
            minHeight: navbarTokens.menuItemMinHeight,
            gap: 1.25,
            color: primaryText,
            "&:hover": {
              color: interaction.hoverContent,
              backgroundColor: interaction.hoverBackground,
            },
          }}
        >
          <UserRound size={iconSizes.control} aria-hidden="true" />
          Profile
        </MenuItem>

        <MenuItem
          onClick={() => {
            toggleColorMode();
          }}
          sx={{
            minHeight: navbarTokens.menuItemMinHeight,
            gap: 1.25,
            color: primaryText,
            "&:hover": {
              color: interaction.hoverContent,
              backgroundColor: interaction.hoverBackground,
            },
          }}
        >
          {isDarkMode ? (
            <Sun size={iconSizes.control} aria-hidden="true" />
          ) : (
            <Moon size={iconSizes.control} aria-hidden="true" />
          )}
          {isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        </MenuItem>

        <Divider sx={{ borderColor: borders.subtle }} />

        <MenuItem
          onClick={() => setAnchorEl(null)}
          sx={{
            minHeight: navbarTokens.menuItemMinHeight,
            gap: 1.25,
            color: colors.semantic.error.main,
            "&:hover": {
              color: colors.semantic.error.dark,
              backgroundColor: isDarkMode ? colors.neutral[700] : colors.neutral[100],
            },
          }}
        >
          <LogOut size={iconSizes.control} aria-hidden="true" />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
