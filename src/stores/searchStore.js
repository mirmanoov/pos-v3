import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", {
  state: () => ({
    searchTerm: "",
  }),
  actions: {
    setSearchTerm(term) {
      console.log("Setting search term to:", term);
      this.searchTerm = term;
    },
  },
});
