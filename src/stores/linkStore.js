// linkStore.js
import { defineStore } from "pinia";

export const useLinkStore = defineStore("linkStore", {
  state: () => ({
    links: [
      // Define your links here
      { name: "Tables" },
      { name: "Menu" },
      { name: "Payment" },
      { name: "Delivery" },
      { name: "Take Away" },
      { name: "Reservations" },
      { name: "Settings" },
    ],
  }),
});
