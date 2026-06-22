import { Box, Divider, Typography } from "@mui/material";
import DocumentationLayout from "./components/DocumentationLayout";
import ColorSwatch from "./components/ColorSwatch";
import { colors } from "./theme/tokens";

const primaryColors = Object.entries(colors.primary);
const neutralColors = Object.entries(colors.neutral);

const semanticColors = [
  {
    name: "Success",
    color: colors.semantic.success.main,
    description: "Completed actions and positive states",
  },
  {
    name: "Warning",
    color: colors.semantic.warning.main,
    description: "Important attention and caution states",
  },
  {
    name: "Error",
    color: colors.semantic.error.main,
    description: "Errors, destructive actions and failures",
  },
  {
    name: "Info",
    color: colors.semantic.info.main,
    description: "Informative messages and system guidance",
  },
];

export default function Home() {
  return (
    <DocumentationLayout>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", xl: "minmax(0, 1fr) 220px" },
          gap: { xs: 4, xl: 8 },
          alignItems: "start",
        }}
      >
        <Box component="article" id="colors" sx={{ maxWidth: 920 }}>
          <Typography
            variant="overline"
            sx={{
              color: colors.primary[600],
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            Design foundations
          </Typography>

          <Typography variant="h1" sx={{ mt: 1, mb: 2 }}>
            Colors
          </Typography>

          <Typography
            variant="body1"
            sx={{
              maxWidth: 720,
              mb: 3,
              color: colors.neutral[600],
              fontSize: "1.0625rem",
              lineHeight: 1.75,
            }}
          >
            Color tokens create a consistent visual language across Stream
            Software applications. They support brand recognition, visual
            hierarchy, system feedback and accessible interfaces.
          </Typography>

          <Box
            sx={{
              p: 2.5,
              mb: 6,
              borderLeft: `4px solid ${colors.semantic.info.main}`,
              backgroundColor: colors.primary[50],
            }}
          >
            <Typography variant="body2" sx={{ color: colors.neutral[700] }}>
              All color combinations must meet WCAG 2.1 AA: at least 4.5:1
              for regular text and 3:1 for large text and interactive
              elements.
            </Typography>
          </Box>

          <Box component="section" id="primary-colors" sx={{ scrollMarginTop: 96 }}>
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Primary colors
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: colors.neutral[600], mb: 3, lineHeight: 1.7 }}
            >
              The primary scale represents Stream Software and is used for
              primary actions, selected navigation and key interactive states.
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, minmax(0, 1fr))",
                  sm: "repeat(3, minmax(0, 1fr))",
                  lg: "repeat(5, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              {primaryColors.map(([shade, color]) => (
                <ColorSwatch
                  key={shade}
                  name={`Primary ${shade}`}
                  color={color}
                />
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 6 }} />

          <Box component="section" id="neutral-colors" sx={{ scrollMarginTop: 96 }}>
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Neutral colors
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: colors.neutral[600], mb: 3, lineHeight: 1.7 }}
            >
              Neutral tokens provide structure for text, borders, backgrounds
              and surfaces without competing with the interface content.
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, minmax(0, 1fr))",
                  sm: "repeat(3, minmax(0, 1fr))",
                  lg: "repeat(5, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              {neutralColors.map(([shade, color]) => (
                <ColorSwatch
                  key={shade}
                  name={`Neutral ${shade}`}
                  color={color}
                />
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 6 }} />

          <Box component="section" id="semantic-colors" sx={{ scrollMarginTop: 96 }}>
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              Semantic colors
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: colors.neutral[600], mb: 3, lineHeight: 1.7 }}
            >
              Semantic colors communicate a consistent meaning. Always combine
              color with a label, icon or message so meaning never depends on
              color alone.
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                  lg: "repeat(4, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              {semanticColors.map((token) => (
                <ColorSwatch key={token.name} {...token} />
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          component="aside"
          sx={{
            display: { xs: "none", xl: "block" },
            position: "sticky",
            top: 104,
            pl: 3,
            borderLeft: `1px solid ${colors.neutral[200]}`,
          }}
        >
          <Typography
            variant="overline"
            sx={{
              display: "block",
              mb: 1.5,
              color: colors.neutral[500],
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            On this page
          </Typography>
          {[
            ["Overview", "#colors"],
            ["Primary colors", "#primary-colors"],
            ["Neutral colors", "#neutral-colors"],
            ["Semantic colors", "#semantic-colors"],
          ].map(([label, href]) => (
            <Typography
              component="a"
              href={href}
              key={href}
              variant="body2"
              sx={{
                display: "block",
                py: 0.75,
                color:
                  href === "#colors" ? colors.primary[600] : colors.neutral[600],
                fontWeight: href === "#colors" ? 700 : 500,
                "&:hover": { color: colors.primary[600] },
              }}
            >
              {label}
            </Typography>
          ))}
        </Box>
      </Box>
    </DocumentationLayout>
  );
}
