export type AppColors = {
  primary: string;
  background: string;
  header: string;
  link: string;
  border: string;
  text: string;
  symbol: string;
  input: string;
  activeItemBg: string;
  activeItem: string;
};

export const lightColors: AppColors = {
  primary: "#7dc75a",
  background: "#c1e1c1",
  header: "#b5d5b5",
  link: "#2a335e",
  border: "#141414",
  text: "#141414",
  symbol: "#141414",
  input: "#d8d8d8",
  activeItemBg: "#e8f5e9",
  activeItem: "#2e7d32",
};

const darkOverrides: Partial<AppColors> = {
  background: "#121212",
  header: "#1e1e1e",
  link: "#90caf9",
  border: "#2a2a2a",
  text: "#ffffff",
  symbol: "#bbbbbb",
  input: "#2a2a2a",
};

export const darkColors: AppColors = {
  ...lightColors,
  ...darkOverrides,
  primary: "#4caf50",
  activeItemBg: "#2e7d32",
  activeItem: "#a5d6a7",
};