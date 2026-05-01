import { useState } from "react";
import { lightColors, darkColors, createStyles } from "./index";

export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  const colors = isDark ? darkColors : lightColors;
  const styles = createStyles(colors);

  return {
    isDark,
    setIsDark,
    colors,
    styles,
  };
}