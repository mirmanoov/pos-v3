// Importing Pinia
import { defineStore } from "pinia";
import { i18n } from "/src/main.js";

export const useSettingStore = defineStore("setting", {
  // State
  state: () => ({
    fullName: "Egor Voronianskii",
    username: "egor",
    email: "voronyanskii13@gmail.com",
    updates: "enable",
    currency: "RM",
    licenseKey: "HDBF-SJAD-J23C-NS2L-HSAZ",
    profilePhoto: "/user.png",
    profilePhotoPreview: null,
  }),

  // Getters
  getters: {
    isLicenseKeyValid: (state) => {
      const regex =
        /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/i;
      return regex.test(state.licenseKey);
    },
  },

  // Actions (methods for updating state)
  actions: {
    // Update methods for each field
    updateFullName(name) {
      this.fullName = name;
    },
    updateUsername(username) {
      this.username = username;
    },
    updateEmail(email) {
      this.email = email;
    },
    updateUpdatesPreference(updates) {
      this.updates = updates;
    },
    updateCurrency(currency) {
      console.log("Updating currency to:", currency);
      this.currency = currency;
      i18n.global.locale = currency;
    },
    updateLicenseKey(licenseKey) {
      this.licenseKey = licenseKey;
    },
    updateProfilePhoto(photoUrl) {
      this.profilePhoto = photoUrl;
    },
  },
});
