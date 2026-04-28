import { create } from "zustand";

export const THEME_OPTIONS = [
  {
    id: "indigo-classic",
    title: "Indigo Classic",
    subtitle: "Current active theme",
    boxColor: "#5C5CDB",
    backgroundColor: "#F4F4FF",
    textColor: "#111827",
    supportingAccent: "#3F2E95",
    available: true
  },
  {
    id: "emerald-calm",
    title: "Emerald Calm",
    subtitle: "Calm and focused",
    boxColor: "#0F766E",
    backgroundColor: "#F3F7F6",
    textColor: "#0F172A",
    supportingAccent: "#134E4A",
    available: true
  },
  {
    id: "sunset-coral",
    title: "Sunset Coral",
    subtitle: "Warm and energetic",
    boxColor: "#F97316",
    backgroundColor: "#FFF7ED",
    textColor: "#1F2937",
    supportingAccent: "#C2410C",
    available: true
  },
  {
    id: "buttermilk-mid-blue",
    title: "Buttermilk & Mid Blue",
    subtitle: "Soft base with strong blue",
    boxColor: "#4C6FFF",
    backgroundColor: "#FFF8E8",
    textColor: "#1F2937",
    supportingAccent: "#2F4DBA",
    available: true
  },
  {
    id: "salmon-mid-green",
    title: "Salmon & Mid Green",
    subtitle: "Warm cards, calm accents",
    boxColor: "#E67D73",
    backgroundColor: "#F5FBF7",
    textColor: "#1F2937",
    supportingAccent: "#2F8A57",
    available: true
  }
];

const getThemeById = (themeId) => THEME_OPTIONS.find((theme) => theme.id === themeId) ?? THEME_OPTIONS[0];

export const useThemeStore = create((set) => ({
  selectedThemeId: "indigo-classic",
  setSelectedThemeId: (themeId) => {
    const theme = getThemeById(themeId);
    set({ selectedThemeId: theme.id });
  }
}));

export const getThemeLabel = (themeId) => getThemeById(themeId).title;
