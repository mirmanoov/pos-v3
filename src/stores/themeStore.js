import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    currentTheme: getInitialTheme(),
  }),
  actions: {
    toggleTheme() {
      this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", this.currentTheme);
      }
    },
  },
});

function getInitialTheme() {
  if (typeof window !== "undefined") {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light";
  }
  return "light"; // default theme if window is not defined
}
