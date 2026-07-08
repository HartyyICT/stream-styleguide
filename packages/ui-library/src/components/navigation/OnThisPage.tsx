"use client";

import { Box, ButtonBase, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { borderWidths } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

export interface OnThisPageItem {
  label: string;
  href: `#${string}`;
}

interface OnThisPageProps {
  items: readonly OnThisPageItem[];
  activeHref?: `#${string}`;
}

export default function OnThisPage({
  items,
  activeHref = items[0]?.href,
}: OnThisPageProps) {
  const [currentHref, setCurrentHref] = useState(activeHref);
  const sectionOffsets = useRef<Array<{ href: `#${string}`; top: number }>>(
    [],
  );
  const animationFrame = useRef(0);
  const { borders, interaction, pageBackground, secondaryText, accent } =
    useSemanticColors();
  const border = borders.subtle;

  const measureSections = useCallback(() => {
    sectionOffsets.current = items.flatMap(({ href }) => {
      const section = document.getElementById(href.slice(1));

      return section
        ? [{ href, top: section.getBoundingClientRect().top + window.scrollY }]
        : [];
    });
  }, [items]);

  const updateActiveSection = useCallback(() => {
    const offsets = sectionOffsets.current;

    if (offsets.length === 0) {
      return;
    }

    const activationPoint = window.scrollY + 128;
    const nearPageBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 4;
    let nextHref = offsets[0].href;

    if (nearPageBottom) {
      nextHref = offsets[offsets.length - 1].href;
    } else {
      for (const section of offsets) {
        if (section.top > activationPoint) {
          break;
        }

        nextHref = section.href;
      }
    }

    setCurrentHref((current) => (current === nextHref ? current : nextHref));
  }, []);

  useEffect(() => {
    const scheduleMeasurement = () => {
      window.cancelAnimationFrame(animationFrame.current);
      animationFrame.current = window.requestAnimationFrame(() => {
        measureSections();
        updateActiveSection();
      });
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrame.current);
      animationFrame.current = window.requestAnimationFrame(
        updateActiveSection,
      );
    };

    const handleResize = () => {
      scheduleMeasurement();
    };

    const handleHashChange = () => {
      const matchingHref = items.find(
        ({ href }) => href === window.location.hash,
      )?.href;

      if (matchingHref) {
        setCurrentHref(matchingHref);
      }

      handleResize();
    };

    const article =
      document.getElementById(items[0]?.href.slice(1) ?? "") ??
      document.querySelector("article");
    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(scheduleMeasurement);

    if (article) {
      resizeObserver?.observe(article);
    }

    scheduleMeasurement();
    window.setTimeout(scheduleMeasurement, 80);
    window.setTimeout(scheduleMeasurement, 240);

    const initialHash = items.find(
      ({ href }) => href === window.location.hash,
    )?.href;

    if (initialHash) {
      window.requestAnimationFrame(() => setCurrentHref(initialHash));
    }

    document.fonts?.ready.then(scheduleMeasurement).catch(() => undefined);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.cancelAnimationFrame(animationFrame.current);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("hashchange", handleHashChange);
      resizeObserver?.disconnect();
    };
  }, [items, measureSections, updateActiveSection]);

  const handleItemClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: `#${string}`,
  ) => {
    const section = document.getElementById(href.slice(1));

    if (!section) {
      return;
    }

    event.preventDefault();
    setCurrentHref(href);
    window.history.pushState(null, "", href);
    section.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  return (
    <Box
      component="aside"
      aria-label="On this page"
      sx={{
        display: { xs: "none", xl: "block" },
        position: "sticky",
        top: 88,
        alignSelf: "start",
        maxHeight: "calc(100vh - 112px)",
        overflowY: "auto",
        overscrollBehavior: "contain",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
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
              <ButtonBase
                component="a"
                href={href}
                key={href}
                aria-current={active ? "location" : undefined}
                onClick={(event) => handleItemClick(event, href)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "100%",
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
                <Typography
                  variant="body2"
                  sx={{ color: "inherit", fontWeight: "inherit" }}
                >
                  {label}
                </Typography>
              </ButtonBase>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
