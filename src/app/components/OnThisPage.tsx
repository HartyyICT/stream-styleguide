"use client";

import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  borderColors,
  borderWidths,
  colors,
  interactionStates,
} from "../theme/tokens";
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
  const [currentHref, setCurrentHref] = useState(activeHref);
  const { mode } = useColorMode();
  const isDarkMode = mode === "dark";
  const borders = isDarkMode ? borderColors.dark : borderColors.light;
  const interaction = isDarkMode
    ? interactionStates.dark
    : interactionStates.light;
  const border = borders.subtle;
  const pageBackground = isDarkMode
    ? colors.neutral[900]
    : colors.semantic.background;
  const secondaryText = isDarkMode
    ? colors.neutral[300]
    : colors.neutral[600];
  const accent = interaction.activeIndicator;

  useEffect(() => {
    const sections = items
      .map(({ href }) => document.getElementById(href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    let animationFrame = 0;

    const updateActiveSection = () => {
      const activationLine = 128;
      const nearPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      let activeSection = sections[0];

      if (nearPageBottom) {
        activeSection = sections[sections.length - 1];
      } else {
        sections.forEach((section) => {
          if (section.getBoundingClientRect().top <= activationLine) {
            activeSection = section;
          }
        });
      }

      setCurrentHref(`#${activeSection.id}`);
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    const handleHashChange = () => {
      const matchingHref = items.find(
        ({ href }) => href === window.location.hash,
      )?.href;

      if (matchingHref) {
        setCurrentHref(matchingHref);
      }

      handleScroll();
    };

    animationFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(updateActiveSection);
    });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [items]);

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
            const active = href === currentHref;

            return (
              <Typography
                component="a"
                href={href}
                key={href}
                aria-current={active ? "location" : undefined}
                onClick={() => setCurrentHref(href)}
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  minHeight: 34,
                  py: 0.5,
                  pl: 1.25,
                  color: active ? accent : secondaryText,
                  fontWeight: active ? 700 : 500,
                  borderLeft: `${borderWidths.active} solid ${
                    active ? accent : pageBackground
                  }`,
                  transition:
                    "color 160ms ease, padding-left 160ms ease, border-color 160ms ease",
                  "&:hover": {
                    color: active ? accent : interaction.hoverContent,
                    borderLeftColor: active ? accent : pageBackground,
                  },
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
