"use client";

import { Box, Typography } from "@mui/material";
import { borderWidths, pageLayoutTokens } from "@ssw/ui-library";
import { useSemanticColors } from "@ssw/ui-library";

interface IntroProps {
  title: string;
  description: string;
  note?: string;
  eyebrow?: string;
}

export default function Intro({
  title,
  description,
  note,
  eyebrow = "Design foundations",
}: IntroProps) {
  const { accent, primaryText, secondaryText, subtleBackground } =
    useSemanticColors();

  return (
    <>
      <Typography
        variant="overline"
        sx={{ color: accent, fontWeight: 700, letterSpacing: "0.08em" }}
      >
        {eyebrow}
      </Typography>
      <Typography variant="h1" sx={{ mt: 1, mb: 2 }}>
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          maxWidth: pageLayoutTokens.introDescriptionMaxWidth,
          mb: 3,
          color: secondaryText,
          fontSize: "1.0625rem",
          lineHeight: 1.75,
        }}
      >
        {description}
      </Typography>
      {note && (
        <Box
          sx={{
            p: pageLayoutTokens.notePadding,
            mb: pageLayoutTokens.noteMarginBottom,
            borderLeft: `${borderWidths.accent} solid ${accent}`,
            backgroundColor: subtleBackground,
          }}
        >
          <Typography variant="body2" sx={{ color: primaryText }}>
            {note}
          </Typography>
        </Box>
      )}
    </>
  );
}
