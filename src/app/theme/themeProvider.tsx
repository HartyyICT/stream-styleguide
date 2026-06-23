"use client";

import {
  ThemeProvider as MuiThemeProvider,
  type PaletteMode,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
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
  const transitionFrame = useRef<number | undefined>(undefined);

  useEffect(() => {
    const savedMode = getSavedMode();

    if (savedMode === "light" || savedMode === "dark") {
      document.documentElement.dataset.colorMode = savedMode;
      const frame = window.requestAnimationFrame(() => setMode(savedMode));
      return () => window.cancelAnimationFrame(frame);
    }

    document.documentElement.dataset.colorMode = "light";
  }, []);

  useEffect(() => {
    return () => {
      if (transitionFrame.current) {
        window.cancelAnimationFrame(transitionFrame.current);
      }
    };
  }, []);

  const toggleColorMode = useCallback(() => {
    const root = document.documentElement;

    if (root.dataset.themeSwitching) {
      return;
    }

    const nextMode = mode === "light" ? "dark" : "light";

    root.dataset.themeSwitching = "true";

    flushSync(() => {
      root.dataset.colorMode = nextMode;
      setMode(nextMode);
    });

    saveMode(nextMode);

    if (transitionFrame.current) {
      window.cancelAnimationFrame(transitionFrame.current);
    }

    transitionFrame.current = window.requestAnimationFrame(() => {
      transitionFrame.current = window.requestAnimationFrame(() => {
        delete root.dataset.themeSwitching;
        transitionFrame.current = undefined;
      });
    });
  }, [mode]);

  const colorMode = useMemo<ColorModeContextValue>(
    () => ({
      mode,
      toggleColorMode,
    }),
    [mode, toggleColorMode],
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
