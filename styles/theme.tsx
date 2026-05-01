import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { lightColors, darkColors, createStyles } from "./index";
import type { AppColors } from "./color";

interface ThemeContextType {
  isDark: boolean;
  setIsDark: (v: boolean) => void;
  colors: AppColors;
  styles: ReturnType<typeof createStyles>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDarkState] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("isDark").then((val) => {
      if (val === "true") setIsDarkState(true);
    });
  }, []);

  const setIsDark = (v: boolean) => {
    setIsDarkState(v);
    AsyncStorage.setItem("isDark", v ? "true" : "false");
  };

  const colors = isDark ? darkColors : lightColors;
  const styles = createStyles(colors);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark, colors, styles }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}