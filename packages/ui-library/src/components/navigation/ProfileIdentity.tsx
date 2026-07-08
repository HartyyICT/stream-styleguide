"use client";

import { Avatar, Box, Typography } from "@mui/material";
import { colors, navbarTokens } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

type ProfileIdentityProps = {
  name: string;
  email?: string;
  role?: string;
  compact?: boolean;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function ProfileIdentity({
  name,
  email,
  role,
  compact = false,
}: ProfileIdentityProps) {
  const { isDarkMode, primaryText, secondaryText } = useSemanticColors();
  const initials = getInitials(name);
  const avatarBackground = isDarkMode ? colors.primary[300] : colors.primary[500];
  const avatarColor = isDarkMode ? colors.neutral[900] : colors.semantic.surface;
  const avatarSize = compact
    ? navbarTokens.profileAvatarSize
    : navbarTokens.profileMenuAvatarSize;

  if (compact) {
    return (
      <>
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
              width: avatarSize,
              height: avatarSize,
              fontSize: "0.6875rem",
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
            ml: 0.5,
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
      </>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `${avatarSize} minmax(0, 1fr)`,
        alignItems: "center",
        gap: 1.5,
        p: 2,
      }}
    >
      <Avatar
        sx={{
          width: avatarSize,
          height: avatarSize,
          fontSize: "0.75rem",
          fontWeight: 700,
          color: avatarColor,
          backgroundColor: avatarBackground,
        }}
      >
        {initials}
      </Avatar>
      <Box sx={{ minWidth: 0, maxWidth: "min(24rem, calc(100vw - 7rem))" }}>
        <Typography variant="body2" sx={{ color: primaryText, fontWeight: 700, lineHeight: 1.3 }}>
          {name}
        </Typography>
        {email && (
          <Typography
            variant="caption"
            sx={{
              display: "block",
              color: secondaryText,
              width: "max-content",
              maxWidth: "100%",
              overflowWrap: "anywhere",
              wordBreak: "break-word",
              lineHeight: 1.5,
            }}
          >
            {email}
          </Typography>
        )}
        {role && (
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 0.25,
              color: secondaryText,
              fontWeight: 600,
            }}
          >
            {role}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
