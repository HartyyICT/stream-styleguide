"use client";

  import { Box, Chip, Typography } from "@mui/material";
  import Divider from "@/app/components/atoms/Divider";
  import {
    Accessibility,
    Blocks,
    BookOpen,
    Braces,
    Gauge,
    Layers3,
    RefreshCw,
    Users,
  } from "lucide-react";
  import Page from "@/app/components/layout/Page";
  import { useDocumentationStyles } from "@/app/hooks/useDocumentationStyles";
  import { colors, pageLayoutTokens, radius, shadows } from "@/app/theme/tokens";

  const benefits = [
    {
      title: "Consistent experiences",
      description:
        "Shared foundations and interaction patterns create a predictable experience across Stream Software applications.",
      icon: Layers3,
    },
    {
      title: "Reusable components",
      description:
        "Central components reduce duplicate implementations and make proven interface patterns available to multiple teams.",
      icon: Blocks,
    },
    {
      title: "Maintainable front-end",
      description:
        "Tokens, theming and shared component structures keep visual and technical changes centrally manageable.",
      icon: RefreshCw,
    },
    {
      title: "Accessible by design",
      description:
        "WCAG 2.1 AA, keyboard navigation, visible focus and semantic HTML are built into the shared foundation.",
      icon: Accessibility,
    },
    {
      title: "Lower cognitive load",
      description:
        "Clear hierarchy, progressive disclosure and consistent feedback help users complete complex enterprise workflows.",
      icon: Gauge,
    },
    {
      title: "Better collaboration",
      description:
        "A shared language and central documentation support alignment between developers, stakeholders and future contributors.",
      icon: Users,
    },
  ];

  const foundations = [
    "Colors",
    "Typography",
    "Spacing",
    "Hover states",
    "Borders",
    "Elevation & shadows",
    "Iconography",
    "Accessibility",
    "Responsiveness",
  ];

  const overviewSections = [
    { label: "Overview", href: "#overview" },
    { label: "Introduction", href: "#introduction" },
    { label: "Advantages", href: "#advantages" },
    { label: "Design foundations", href: "#foundations" },
    { label: "Author", href: "#author" },
  ] as const;

  export default function OverviewPage() {
    const {
      borders,
      surface,
      primaryText,
      secondaryText,
      accent,
      subtleBackground,
      selectedBackground,
    } = useDocumentationStyles();
    const border = borders.default;

    return (
      <Page pageId="overview" sections={overviewSections}>
            <Typography
              variant="overline"
              sx={{
                color: accent,
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              Getting started
            </Typography>

            <Typography variant="h1" sx={{ mt: 1, mb: 2 }}>
              Stream Design System
            </Typography>

            <Typography
              variant="body1"
              sx={{
                maxWidth: 720,
                mb: 3,
                color: secondaryText,
                fontSize: "1.0625rem",
                lineHeight: 1.75,
              }}
            >
              A central design system and reusable UI foundation for building
              consistent, accessible and maintainable enterprise applications
              within Stream Software.
            </Typography>

            <Box
              sx={{
                p: 2.5,
                mb: 6,
                borderLeft: 4,
                borderColor: accent,
                backgroundColor: subtleBackground,
              }}
            >
              <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                <BookOpen size={20} />
                <Typography variant="body2" sx={{ color: primaryText }}>
                  This styleguide translates the research, UI audit and Design
                  Foundations into practical tokens, guidelines and reusable
                  front-end patterns.
                </Typography>
              </Box>
            </Box>

            <Box component="section" id="introduction" sx={{ scrollMarginTop: pageLayoutTokens.sectionScrollMarginTop }}>
              <Typography variant="h2" sx={{ mb: 1.5 }}>
                Introduction
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: secondaryText, mb: 3, lineHeight: 1.7 }}
              >
                Stream Software develops and maintains multiple enterprise
                applications for logistics, compliance and customs processes.
                These applications share many components, layouts and workflows,
                but the UI audit identified differences in styling, component
                behaviour, feedback, navigation and accessibility.
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: secondaryText, lineHeight: 1.7 }}
              >
                This design system provides a central standard for design
                decisions and front-end implementation. It begins with shared
                foundations, continues into a MUI theme and documentation, and
                forms the basis for Storybook and a reusable UI library.
              </Typography>
            </Box>

            <Divider sx={{ my: pageLayoutTokens.sectionDividerMarginY }} />

            <Box component="section" id="advantages" sx={{ scrollMarginTop: pageLayoutTokens.sectionScrollMarginTop }}>
              <Typography variant="h2" sx={{ mb: 1.5 }}>
                Advantages for Stream Software
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: secondaryText, mb: 3, lineHeight: 1.7 }}
              >
                The following benefits are based on the research findings,
                literature study and analysis of existing Stream Software
                applications.
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))",
                  },
                  gap: 2,
                }}
              >
                {benefits.map(({ title, description, icon: Icon }) => (
                  <Box
                    key={title}
                    sx={{
                      p: 3,
                      backgroundColor: surface,
                      border: 1,
                      borderColor: border,
                      borderRadius: radius.medium,
                      boxShadow: shadows.level1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        display: "grid",
                        placeItems: "center",
                        mb: 2,
                        color: accent,
                        backgroundColor: selectedBackground,
                        borderRadius: radius.medium,
                      }}
                    >
                      <Icon size={21} />
                    </Box>
                    <Typography variant="h3" sx={{ mb: 1 }}>
                      {title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: secondaryText, lineHeight: 1.7 }}
                    >
                      {description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: pageLayoutTokens.sectionDividerMarginY }} />

            <Box component="section" id="foundations" sx={{ scrollMarginTop: pageLayoutTokens.sectionScrollMarginTop }}>
              <Typography variant="h2" sx={{ mb: 1.5 }}>
                Design foundations
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: secondaryText, mb: 3, lineHeight: 1.7 }}
              >
                The foundations define the shared visual and behavioural rules
                used by the MUI theme, documentation and future components.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                {foundations.map((foundation) => (
                  <Chip
                    key={foundation}
                    label={foundation}
                    variant="outlined"
                    sx={{
                      color: primaryText,
                      borderColor: border,
                      backgroundColor: surface,
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: pageLayoutTokens.sectionDividerMarginY }} />

            <Box component="section" id="author" sx={{ scrollMarginTop: pageLayoutTokens.sectionScrollMarginTop }}>
              <Typography variant="h2" sx={{ mb: 1.5 }}>
                Author
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2.5,
                  alignItems: { xs: "flex-start", sm: "center" },
                  p: 3,
                  backgroundColor: surface,
                  border: 1,
                  borderColor: border,
                  borderRadius: radius.medium,
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                    color: colors.semantic.surface,
                    backgroundColor: colors.primary[500],
                    borderRadius: radius.extraLarge,
                  }}
                >
                  <Braces size={27} />
                </Box>
                <Box>
                  <Typography variant="h3" sx={{ mb: 0.5 }}>
                    Hartiessan Asep
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: secondaryText, lineHeight: 1.7 }}
                  >
                    HBO-ICT graduation student at Stream Software. Responsible
                    for the research, Design Foundations, MUI theme, styleguide
                    and development of the central UI library.
                  </Typography>
                </Box>
              </Box>
            </Box>
      </Page>
    );
  }
