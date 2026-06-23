"use client";

import Link from "next/link";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import {
  Blend,
  BookOpen,
  Clock,
  FileText,
  Grid3X3,
  LayoutGrid,
  MousePointer2,
  Palette,
  PanelTop,
  Search,
  Type,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  borderColors,
  colors,
  interactionStates,
  radius,
  shadows,
} from "@/app/theme/tokens";
import { useColorMode } from "@/app/theme/themeProvider";

type SearchItem = {
  title: string;
  description: string;
  href: string;
  category: string;
  icon: LucideIcon;
};

type SearchGroup = {
  label: string;
  items: SearchItem[];
};

const searchGroups: SearchGroup[] = [
  {
    label: "Getting started",
    items: [
      {
        title: "Overview",
        description: "Introduction to the Stream Design System.",
        href: "/",
        category: "Getting started",
        icon: BookOpen,
      },
      {
        title: "Introduction",
        description: "Why the Stream Design System exists.",
        href: "/#introduction",
        category: "Getting started",
        icon: FileText,
      },
      {
        title: "Design foundations",
        description:
          "Overview of the design foundations used by the styleguide.",
        href: "/#foundations",
        category: "Getting started",
        icon: LayoutGrid,
      },
    ],
  },
  {
    label: "Design foundations",
    items: [
      {
        title: "Colors",
        description: "Color tokens, categories, usage and accessibility.",
        href: "/colors",
        category: "Design foundations",
        icon: Palette,
      },
      {
        title: "Primary colors",
        description: "Primary color scale for actions and selected states.",
        href: "/colors#primary-colors",
        category: "Colors",
        icon: Palette,
      },
      {
        title: "Neutral colors",
        description: "Neutral color scale for text, borders and surfaces.",
        href: "/colors#neutral-colors",
        category: "Colors",
        icon: Palette,
      },
      {
        title: "Semantic colors",
        description:
          "Semantic colors for success, warning, error and info states.",
        href: "/colors#semantic-colors",
        category: "Colors",
        icon: Palette,
      },
      {
        title: "Typography",
        description: "Font families, setup, typography scale and guidelines.",
        href: "/typography",
        category: "Design foundations",
        icon: Type,
      },
      {
        title: "Font setup",
        description: "How developers should use the Stream typography system.",
        href: "/typography#font-setup",
        category: "Typography",
        icon: Type,
      },
      {
        title: "Typography scale",
        description: "Full typography scale for headings, body text and data.",
        href: "/typography#typography-scale",
        category: "Typography",
        icon: Type,
      },
      {
        title: "Spacing",
        description: "Spacing scale, token usage and layout guidelines.",
        href: "/spacing",
        category: "Design foundations",
        icon: Grid3X3,
      },
      {
        title: "Spacing scale",
        description: "Named spacing tokens from xs to xxl.",
        href: "/spacing#spacing-scale",
        category: "Spacing",
        icon: Grid3X3,
      },
      {
        title: "Spacing examples",
        description: "Practical card, form and responsive spacing patterns.",
        href: "/spacing#layout-examples",
        category: "Spacing",
        icon: Grid3X3,
      },
      {
        title: "Hover states",
        description: "Hover, active and focus feedback for interactive UI.",
        href: "/hover-states",
        category: "Design foundations",
        icon: MousePointer2,
      },
      {
        title: "Hover state scale",
        description: "Semantic interaction tokens for light and dark mode.",
        href: "/hover-states#state-scale",
        category: "Hover states",
        icon: MousePointer2,
      },
      {
        title: "Borders",
        description: "Border colors, widths, radius and component examples.",
        href: "/borders",
        category: "Design foundations",
        icon: PanelTop,
      },
      {
        title: "Border colors & widths",
        description: "Structural, interactive, active and focus borders.",
        href: "/borders#border-colors",
        category: "Borders",
        icon: PanelTop,
      },
      {
        title: "Border radius",
        description: "Corner radius tokens from small to extra large.",
        href: "/borders#border-radius",
        category: "Borders",
        icon: PanelTop,
      },
      {
        title: "Elevation & shadows",
        description: "Elevation scale, shadow tokens and layering examples.",
        href: "/elevation",
        category: "Design foundations",
        icon: Blend,
      },
      {
        title: "Elevation scale",
        description: "Shadow levels from flat surfaces to modal content.",
        href: "/elevation#elevation-scale",
        category: "Elevation & shadows",
        icon: Blend,
      },
      {
        title: "Layering example",
        description: "See how elevation clarifies overlapping surfaces.",
        href: "/elevation#layering-example",
        category: "Elevation & shadows",
        icon: Blend,
      },
    ],
  },
  {
    label: "Guidelines",
    items: [
      {
        title: "Color guidelines",
        description: "Rules for consistent and accessible color usage.",
        href: "/colors#guidelines",
        category: "Colors",
        icon: Palette,
      },
      {
        title: "Color accessibility",
        description: "Contrast requirements for readable interfaces.",
        href: "/colors#accessibility",
        category: "Colors",
        icon: Palette,
      },
      {
        title: "Typography guidelines",
        description: "Rules for consistent and readable typography usage.",
        href: "/typography#guidelines",
        category: "Typography",
        icon: Type,
      },
      {
        title: "Typography accessibility",
        description: "Accessibility rules for readable text styles.",
        href: "/typography#accessibility",
        category: "Typography",
        icon: Type,
      },
      {
        title: "Spacing guidelines",
        description: "Rules for consistent spacing and visual grouping.",
        href: "/spacing#guidelines",
        category: "Spacing",
        icon: Grid3X3,
      },
      {
        title: "Spacing accessibility",
        description: "Spacing guidance for readable and usable interfaces.",
        href: "/spacing#accessibility",
        category: "Spacing",
        icon: Grid3X3,
      },
      {
        title: "Hover state guidelines",
        description: "Rules for clear and accessible interaction feedback.",
        href: "/hover-states#guidelines",
        category: "Hover states",
        icon: MousePointer2,
      },
      {
        title: "Border guidelines",
        description: "Rules for consistent boundaries and corner treatments.",
        href: "/borders#guidelines",
        category: "Borders",
        icon: PanelTop,
      },
      {
        title: "Border accessibility",
        description: "Accessible use of boundaries, focus and shape.",
        href: "/borders#accessibility",
        category: "Borders",
        icon: PanelTop,
      },
      {
        title: "Elevation guidelines",
        description: "Rules for consistent surface hierarchy and shadows.",
        href: "/elevation#guidelines",
        category: "Elevation & shadows",
        icon: Blend,
      },
      {
        title: "Elevation accessibility",
        description: "Accessible boundaries, contrast and focus for surfaces.",
        href: "/elevation#accessibility",
        category: "Elevation & shadows",
        icon: Blend,
      },
    ],
  },
];

const searchItems = searchGroups.flatMap((group) => group.items);
const foundationSuggestions =
  searchGroups
    .find((group) => group.label === "Design foundations")
    ?.items.filter((item) => item.category === "Design foundations") ?? [];
const RECENT_SEARCHES_KEY = "stream-styleguide-recent-searches";

export default function SearchDialog() {
  const { mode } = useColorMode();
  const isDarkMode = mode === "dark";

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recentHrefs, setRecentHrefs] = useState<string[]>([]);

  const surface = isDarkMode ? colors.neutral[800] : colors.semantic.surface;
  const pageBackground = isDarkMode
    ? colors.neutral[900]
    : colors.semantic.background;
  const borders = isDarkMode ? borderColors.dark : borderColors.light;
  const interaction = isDarkMode
    ? interactionStates.dark
    : interactionStates.light;
  const border = borders.subtle;
  const primaryText = isDarkMode ? colors.neutral[50] : colors.neutral[900];
  const secondaryText = isDarkMode
    ? colors.neutral[300]
    : colors.neutral[600];
  const accent = interaction.activeIndicator;

  useEffect(() => {
    const storedRecentHrefs = localStorage.getItem(RECENT_SEARCHES_KEY);

    if (!storedRecentHrefs) {
      return;
    }

    try {
      const parsedRecentHrefs = JSON.parse(storedRecentHrefs) as string[];
      const frame = window.requestAnimationFrame(() => {
        setRecentHrefs(parsedRecentHrefs);
      });

      return () => window.cancelAnimationFrame(frame);
    } catch {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    }
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [open]);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    }

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  const recentItems = useMemo(() => {
    return recentHrefs
      .map((href) => searchItems.find((item) => item.href === href))
      .filter((item): item is SearchItem => Boolean(item));
  }, [recentHrefs]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return searchItems.filter((item) => {
      const searchableText = [
        item.title,
        item.description,
        item.category,
        item.href,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [query]);

  function closeSearch() {
    setOpen(false);
    setQuery("");
  }

  function saveRecentItem(selectedItem: SearchItem) {
    const nextRecentHrefs = [
      selectedItem.href,
      ...recentHrefs.filter((href) => href !== selectedItem.href),
    ].slice(0, 4);

    setRecentHrefs(nextRecentHrefs);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(nextRecentHrefs));
  }

  function handleItemClick(item: SearchItem) {
    saveRecentItem(item);
    closeSearch();
  }

  function removeRecentItem(hrefToRemove: string) {
    const nextRecentHrefs = recentHrefs.filter(
      (href) => href !== hrefToRemove,
    );

    setRecentHrefs(nextRecentHrefs);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(nextRecentHrefs));
  }

  function renderCompactItem(item: SearchItem, showClock = false) {
    const Icon = item.icon;

    if (showClock) {
      return (
        <Box
          key={item.href}
          sx={{
            minHeight: 48,
            display: "flex",
            alignItems: "center",
            gap: 1,
            pl: 2,
            pr: 0.75,
            py: 0.75,
            backgroundColor: surface,
            border: 1,
            borderColor: border,
            borderRadius: radius.medium,
            transition:
              "border-color 160ms ease, background-color 160ms ease",
            "&:hover": {
              borderColor: interaction.hoverBorder,
              backgroundColor: interaction.hoverBackground,
            },
          }}
        >
          <Box
            component={Link}
            href={item.href}
            onClick={() => handleItemClick(item)}
            sx={{
              minWidth: 0,
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              py: 0.5,
              textDecoration: "none",
            }}
          >
            <Clock size={16} color={accent} />
            <Typography
              variant="body2"
              sx={{
                color: accent,
                fontWeight: 600,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {item.title}
            </Typography>
          </Box>

          <IconButton
            size="small"
            aria-label={`Remove ${item.title} from recent searches`}
            onClick={() => removeRecentItem(item.href)}
            sx={{
              width: 30,
              height: 30,
              flexShrink: 0,
              color: secondaryText,
              borderColor: border,
              backgroundColor: surface,
              "&:hover": {
                color: interaction.hoverContent,
                borderColor: interaction.hoverBorder,
                backgroundColor: interaction.hoverBackground,
              },
            }}
          >
            <X size={15} />
          </IconButton>
        </Box>
      );
    }

    return (
      <Box
        key={item.href}
        component={Link}
        href={item.href}
        onClick={() => handleItemClick(item)}
        sx={{
          minHeight: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          px: 2,
          py: 1.25,
          textDecoration: "none",
          backgroundColor: surface,
          border: 1,
          borderColor: border,
          borderRadius: radius.medium,
          transition: "border-color 160ms ease, background-color 160ms ease",
          "&:hover": {
            borderColor: interaction.hoverBorder,
            backgroundColor: interaction.hoverBackground,
          },
        }}
      >
        <Box
          sx={{
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            gap: 1.25,
          }}
        >
          <Icon size={16} color={accent} />

          <Typography
            variant="body2"
            sx={{
              color: accent,
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.title}
          </Typography>
        </Box>

        <Typography
          variant="caption"
          sx={{
            display: { xs: "none", sm: "inline-flex" },
            px: 1,
            py: 0.25,
            color: secondaryText,
            border: 1,
            borderColor: border,
            borderRadius: radius.small,
            whiteSpace: "nowrap",
          }}
        >
          {item.category}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box
        component="button"
        type="button"
        onClick={() => setOpen(true)}
        sx={{
          width: { xs: 40, sm: 280 },
          height: 40,
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: { xs: 1, sm: 1.5 },
          color: secondaryText,
          backgroundColor: surface,
          border: 1,
          borderColor: border,
          borderRadius: radius.medium,
          cursor: "pointer",
          boxShadow: shadows.level1,
          font: "inherit",
          textAlign: "left",
          transition:
            "border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease",
          "&:hover": {
            color: interaction.hoverContent,
            borderColor: interaction.hoverBorder,
            backgroundColor: interaction.hoverBackground,
          },
        }}
      >
        <Search size={18} />

        <Typography
          variant="body2"
          sx={{
            display: { xs: "none", sm: "block" },
            flex: 1,
            color: secondaryText,
          }}
        >
          Search documentation...
        </Typography>

        <Typography
          variant="caption"
          sx={{
            display: { xs: "none", sm: "block" },
            px: 0.75,
            py: 0.25,
            color: secondaryText,
            border: 1,
            borderColor: border,
            borderRadius: radius.small,
          }}
        >
          Ctrl K
        </Typography>
      </Box>

      <Dialog
        open={open}
        onClose={closeSearch}
        fullWidth
        maxWidth="lg"
        sx={{
          "& .MuiDialog-container": {
            alignItems: "flex-start",
          },
        }}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: isDarkMode
                ? colors.neutral[900]
                : colors.neutral[800],
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            },
          },
          paper: {
            sx: {
              mt: { xs: 2, sm: 6 },
              width: { xs: "calc(100% - 24px)", sm: "920px" },
              maxWidth: "calc(100% - 48px)",
              maxHeight: "84vh",
              backgroundColor: pageBackground,
              border: 1,
              borderColor: border,
              borderRadius: radius.large,
              boxShadow: shadows.level4,
              overflow: "hidden",
            },
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 2,
              py: 1.5,
              borderBottom: 1,
              borderColor: border,
            }}
          >
            <Search size={20} color={secondaryText} />

            <InputBase
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="What are you looking for?"
              sx={{
                flex: 1,
                color: primaryText,
                fontSize: "1rem",
              }}
            />

            <IconButton
              size="small"
              onClick={closeSearch}
              aria-label="Close search"
              sx={{
                color: secondaryText,
                border: 1,
                borderColor: border,
                borderRadius: radius.small,
              }}
            >
              <X size={16} />
            </IconButton>
          </Box>

          <Box
            sx={{
              p: 2,
              minHeight: 480,
              maxHeight: "72vh",
              overflowY: "auto",
              overscrollBehavior: "contain",
            }}
          >
            {query.trim() ? (
              <>
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
                  Results
                </Typography>

                <Box sx={{ display: "grid", gap: 1 }}>
                  {filteredItems.map((item) => (
                    <Box
                      key={item.href}
                      component={Link}
                      href={item.href}
                      onClick={() => handleItemClick(item)}
                      sx={{
                        display: "block",
                        p: 2,
                        textDecoration: "none",
                        backgroundColor: surface,
                        border: 1,
                        borderColor: border,
                        borderRadius: radius.medium,
                        transition:
                          "border-color 160ms ease, background-color 160ms ease",
                        "&:hover": {
                          borderColor: interaction.hoverBorder,
                          backgroundColor: interaction.hoverBackground,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 2,
                          mb: 0.75,
                        }}
                      >
                        <Typography
                          variant="h3"
                          sx={{ color: accent, fontSize: "1rem" }}
                        >
                          {item.title}
                        </Typography>

                        <Typography
                          variant="caption"
                          sx={{
                            px: 1,
                            py: 0.25,
                            height: "fit-content",
                            color: secondaryText,
                            border: 1,
                            borderColor: border,
                            borderRadius: radius.small,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.category}
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{ color: secondaryText, lineHeight: 1.6 }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  ))}

                  {filteredItems.length === 0 && (
                    <Box
                      sx={{
                        p: 3,
                        textAlign: "center",
                        color: secondaryText,
                        backgroundColor: surface,
                        border: 1,
                        borderColor: border,
                        borderRadius: radius.medium,
                      }}
                    >
                      <Typography variant="body2">
                        No results found for “{query}”.
                      </Typography>
                    </Box>
                  )}
                </Box>
              </>
            ) : (
              <>
                {recentItems.length > 0 && (
                  <Box sx={{ mb: 5 }}>
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
                      Recent
                    </Typography>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "1fr",
                          sm: "repeat(2, minmax(0, 1fr))",
                        },
                        gap: 1,
                      }}
                    >
                      {recentItems.map((item) => renderCompactItem(item, true))}
                    </Box>
                  </Box>
                )}

                <Box>
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
                    Design foundations
                  </Typography>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, minmax(0, 1fr))",
                      },
                      gap: 1,
                    }}
                  >
                    {foundationSuggestions.map((item) =>
                      renderCompactItem(item),
                    )}
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
