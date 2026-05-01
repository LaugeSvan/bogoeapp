import React, { createContext, useContext, useState } from "react";
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
  const [isDark, setIsDark] = useState(false);
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