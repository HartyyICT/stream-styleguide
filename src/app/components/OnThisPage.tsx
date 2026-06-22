"use client";

import { Box, Typography } from "@mui/material";
import { colors } from "../theme/tokens";
import { useColorMode } from "../theme/themeProvider";

export interface OnThisPageItem {
  label: string;
  href: `#${string}`;
}

interface OnThisPageProps {
  items: OnThisPageItem[];
  activeHref?: `#${string}`;
}

export default function OnThisPage({
  items,
  activeHref = items[0]?.href,
}: OnThisPageProps) {
  const { mode } = useColorMode();
  const isDarkMode = mode === "dark";
  const border = isDarkMode ? colors.neutral[700] : colors.neutral[200];
  const secondaryText = isDarkMode
    ? colors.neutral[300]
    : colors.neutral[600];
  const accent = isDarkMode ? colors.primary[300] : colors.primary[500];

  return (
    <Box
      component="aside"
      aria-label="On this page"
      sx={{
        display: { xs: "none", xl: "block" },
        position: "sticky",
        top: 88,
        alignSelf: "start",
        height: "fit-content",
      }}
    >
      <Box
        sx={{
          maxHeight: "calc(100vh - 112px)",
          overflowY: "auto",
          pl: 3,
          borderLeft: 1,
          borderColor: border,
        }}
      >
        <Typography
          variant="overline"
          sx={{
            display: "block",
            mb: 1.5,
            color: secondaryText,
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}
        >
          On this page
        </Typography>

        <Box component="nav" aria-label="Page sections">
          {items.map(({ label, href }) => {
            const active = href === activeHref;

            return (
              <Typography
                component="a"
                href={href}
                key={href}
                variant="body2"
                sx={{
                  display: "block",
                  py: 0.75,
                  color: active ? accent : secondaryText,
                  fontWeight: active ? 700 : 500,
                  "&:hover": { color: accent },
                }}
              >
                {label}
              </Typography>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
