"use client";

import {
  ThemeProvider as MuiThemeProvider,
  type PaletteMode,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createAppTheme } from "./theme";

interface ColorModeContextValue {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextValue | undefined>(
  undefined,
);

function getSavedMode(): PaletteMode | null {
  try {
    const savedMode = window.localStorage?.getItem("stream-color-mode");
    return savedMode === "light" || savedMode === "dark" ? savedMode : null;
  } catch {
    return null;
  }
}

function saveMode(mode: PaletteMode) {
  try {
    window.localStorage?.setItem("stream-color-mode", mode);
  } catch {
    // The theme still switches when browser storage is unavailable.
  }
}

export function useColorMode() {
  const context = useContext(ColorModeContext);

  if (!context) {
    throw new Error("useColorMode must be used inside ThemeProvider");
  }

  return context;
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<PaletteMode>("light");

  useEffect(() => {
    const savedMode = getSavedMode();

    if (savedMode === "light" || savedMode === "dark") {
      const frame = window.requestAnimationFrame(() => setMode(savedMode));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  const colorMode = useMemo<ColorModeContextValue>(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((currentMode) => {
          const nextMode = currentMode === "light" ? "dark" : "light";
          saveMode(nextMode);
          return nextMode;
        });
      },
    }),
    [mode],
  );

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}
