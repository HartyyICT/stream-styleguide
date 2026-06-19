import { Box, Typography } from "@mui/material";

interface ColorSwatchProps {
  name: string;
  color: string;
}

export default function ColorSwatch({
  name,
  color,
}: ColorSwatchProps) {
  return (
    <Box sx={{ width: 180 }}>
      <Box
        sx={{
          height: 80,
          backgroundColor: color,
          borderRadius: 2,
          border: "1px solid #CBD5E1",
        }}
      />

      <Typography variant="body1">{name}</Typography>

      <Typography variant="body2">
        {color}
      </Typography>
    </Box>
  );
}