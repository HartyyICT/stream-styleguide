"use client";

import { Box, ButtonBase, Menu } from "@mui/material";
import { ChevronDown, LogOut, Moon, Sun, UserRound } from "lucide-react";
import { useState } from "react";
import {
  borderColors,
  borderWidths,
  colors,
  Divider,
  iconSizes,
  interactionStates,
  navbarTokens,
  ProfileIdentity,
  ProfileMenuItem,
  radius,
  shadows,
} from "@ssw/ui-library";
import { useColorMode } from "../../theme/themeProvider";

type UserProfileMenuProps = {
  name?: string;
  email?: string;
  role?: string;
};

export default function UserProfileMenu({
  name = "Hartiessan Asep",
  email = "hartiessan.asep@streamsoftware.nl",
  role = "Administrator",
}: UserProfileMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { mode, toggleColorMode } = useColorMode();
  const isDarkMode = mode === "dark";
  const open = Boolean(anchorEl);

  const surface = isDarkMode ? colors.neutral[800] : colors.semantic.surface;
  const raisedSurface = isDarkMode ? colors.neutral[800] : colors.semantic.surface;
  const borders = isDarkMode ? borderColors.dark : borderColors.light;
  const interaction = isDarkMode ? interactionStates.dark : interactionStates.light;
  const primaryText = isDarkMode ? colors.neutral[50] : colors.neutral[900];

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
          pl: 1,
          pr: 0.5,
          borderRadius: radius.medium,
          color: primaryText,
          backgroundColor: surface,
          transition:
            "background-color 160ms ease, border-color 160ms ease, color 160ms ease",
          "&:hover": {
            color: interaction.hoverContent,
            backgroundColor: interaction.hoverBackground,
          },
          "&:focus-visible": {
            outline: `${borderWidths.focus} solid ${interaction.focusRing}`,
            outlineOffset: 2,
          },
        }}
      >
        <ProfileIdentity name={name} compact />

        <Box
          sx={{
            width: navbarTokens.profileChevronSlotSize,
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
        autoFocus={false}
        disableAutoFocusItem
        disableScrollLock
        transitionDuration={0}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              width: "max-content",
              minWidth: navbarTokens.profileMenuWidth,
              maxWidth: "calc(100vw - 2rem)",
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
        <ProfileIdentity name={name} email={email} role={role} />

        <Divider />

        <ProfileMenuItem
          onClick={() => setAnchorEl(null)}
          icon={<UserRound size={iconSizes.control} aria-hidden="true" />}
        >
          Profile
        </ProfileMenuItem>

        <ProfileMenuItem
          onClick={() => {
            toggleColorMode();
          }}
          icon={
            isDarkMode ? (
              <Sun size={iconSizes.control} aria-hidden="true" />
            ) : (
              <Moon size={iconSizes.control} aria-hidden="true" />
            )
          }
        >
          {isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        </ProfileMenuItem>

        <Divider sx={{ my: 0.5 }} />

        <ProfileMenuItem
          onClick={() => setAnchorEl(null)}
          tone="danger"
          icon={<LogOut size={iconSizes.control} aria-hidden="true" />}
        >
          Logout
        </ProfileMenuItem>
      </Menu>
    </>
  );
}
