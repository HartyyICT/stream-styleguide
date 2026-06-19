import { Box, Typography } from "@mui/material";
import ColorSwatch from "./components/ColorSwatch";

export default function Home() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        Stream Styleguide
      </Typography>

      <Typography variant="h5" gutterBottom>
        Primary Colors
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <ColorSwatch
          name="Primary 500"
          color="#154F96"
        />

        <ColorSwatch
          name="Primary 400"
          color="#6899D1"
        />

        <ColorSwatch
          name="Primary 600"
          color="#124785"
        />
      </Box>
    </Box>
  );
}