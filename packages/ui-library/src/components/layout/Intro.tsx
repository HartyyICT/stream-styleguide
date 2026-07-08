"use client";

import { Typography } from "@mui/material";
import InfoBanner from "../feedback/InfoBanner";
import { pageLayoutTokens } from "../../theme/tokens";
import { useSemanticColors } from "../../theme/useSemanticColors";

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
  const { accent, secondaryText } = useSemanticColors();

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
        <InfoBanner sx={{ mb: pageLayoutTokens.noteMarginBottom }}>
          {note}
        </InfoBanner>
      )}
    </>
  );
}
