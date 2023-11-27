<template>
  <div class="settings">
    <h1 class="settings-header">User Settings</h1>

    <div class="settings-wrapper">
      <!-- Profile Photo -->
      <div class="input-group profPic">
        <label for="profilePhoto" class="userpic">Profile Picture</label>
        <div class="photo-container">
          <img
            :src="profilePhotoPreview"
            class="profile-photo"
            alt="Profile Photo"
          />
          <img
            :src="editIconSrc"
            src="/edit.svg"
            class="edit-icon"
            alt="Edit Icon"
            @click="triggerFileInput"
          />
          <input
            type="file"
            id="profilePhoto"
            ref="fileInput"
            @change="handleFileUpload"
            accept="image/*"
            class="hidden-file-input"
          />
        </div>
      </div>
      <div class="row-container">
        <div class="column-1">
          <!-- Full Name -->
          <div class="input-group">
            <label for="fullName" class="full-name">Full Name:</label>
            <input
              type="text"
              id="fullName"
              v-model="settings.fullName"
              class="input-field"
            />
          </div>
          <!-- Username -->
          <div class="input-group">
            <label for="username">Username:</label>
            <input
              type="text"
              id="username"
              class="input-field"
              v-model="settings.username"
            />
          </div>

          <!-- Email -->
          <div class="input-group">
            <label for="email">Notification Email:</label>
            <input
              type="email"
              id="email"
              class="input-field"
              v-model="settings.email"
            />
          </div>
        </div>

        <div class="column-2">
          <!-- Updates Enable/Disable -->
          <div class="input-group">
            <label for="updates">Enable Updates:</label>
            <select id="updates" class="input-field" v-model="settings.updates">
              <option value="enable">Enable</option>
              <option value="disable">Disable</option>
            </select>
          </div>

          <!-- Currency -->
          <div class="input-group">
            <label for="currency">Currency:</label>
            <select
              id="currency"
              class="input-field"
              v-model="settings.currency"
            >
              <option value="USD">United States Dollar (USD)</option>
              <option value="RM">Malaysian Ringgit (MYR)</option>
              <option value="EUR">Euro (EUR)</option>
            </select>
          </div>

          <!-- License Key -->
          <div class="input-group">
            <label for="licenseKey">License Key:</label>
            <input
              type="text"
              id="licenseKey"
              v-model="settings.licenseKey"
              @input="validateLicenseKey"
              class="input-field"
            />
            <span class="error-message" v-if="licenseKeyError">{{
              licenseKeyError
            }}</span>
          </div>
        </div>
      </div>
      <!-- Submit Button -->
      <button class="submit-button" @click="saveSettings">Save Settings</button>
      <!-- Success Message -->
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import { useSettingStore } from "/src/stores/settingStore.js";
import { useThemeStore } from "/src/stores/themeStore.js";
import { ref, computed, watch } from "vue";

export default {
  setup() {
    const settings = useSettingStore();
    const themeStore = useThemeStore();

    // Local state for file upload preview
    const profilePhotoPreview = ref(settings.profilePhoto);

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        profilePhotoPreview.value = URL.createObjectURL(file);
        settings.updateProfilePhoto(profilePhotoPreview.value); // Update store
      }
    };

    watch(
      () => settings.currency,
      (newCurrency) => {
        console.log("Currency in settings component:", newCurrency);
      }
    );

    const fileInput = ref(null);

    const triggerFileInput = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };

    // Local method for license key validation
    const licenseKeyError = ref(null);
    const validateLicenseKey = () => {
      const regex = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/i;
      if (!regex.test(settings.licenseKey)) {
        licenseKeyError.value = "Invalid license key format";
      } else {
        licenseKeyError.value = null;
      }
    };

    const editIconSrc = computed(() => {
      return themeStore.currentTheme === "light"
        ? "/edit-black.svg"
        : "/edit-white.svg";
    });

    const successMessage = ref("");

    const saveSettings = async () => {
      console.log("Saving settings");

      // Update each piece of state
      settings.updateFullName(settings.fullName);
      settings.updateUsername(settings.username);
      settings.updateEmail(settings.email);
      settings.updateUpdatesPreference(settings.updates);
      settings.updateCurrency(settings.currency); // This also updates i18n locale
      settings.updateLicenseKey(settings.licenseKey);
      settings.updateProfilePhoto(profilePhotoPreview.value); // Assuming this is correct

      successMessage.value = "Settings updated successfully";

      setTimeout(() => (successMessage.value = ""), 3000);
      // Call any additional logic if needed
      await settings.saveSettings();
    };

    return {
      // Data and methods to use in the template
      settings,
      profilePhotoPreview,
      handleFileUpload,
      licenseKeyError,
      validateLicenseKey,
      fileInput,
      editIconSrc,
      successMessage,
      triggerFileInput,
      saveSettings,
    };
  },
};
</script>

<style scoped>
.settings {
  margin-top: 5vh;
  color: var(--text-color);
  align-items: center;
  background-color: var(--active-color);
  border-radius: 8px;
}

label {
  font-weight: 400;
  font-size: 20px;
}

.row-container {
  display: flex;
  flex-direction: row;
  gap: 5vw;
}

.success-message {
  color: green;
  margin-top: 10px;
  text-align: left;
}

.column-1 {
  display: flex;
  flex-direction: column;
  gap: 1vh;
}

.column-2 {
  display: flex;
  flex-direction: column;
  gap: 1vh;
}

.settings-header {
  padding-bottom: 3vh;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.settings-wrapper {
  padding-left: 3vw;
  padding-top: 2vh;
  max-width: 50vw;
}
.input-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.profPic {
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: flex-start;
}

.hidden-file-input {
  display: none;
}

.input-field {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  min-width: 20vw;
  max-width: 20vw;
  border: 1px solid #ddd;
  background-color: #f0f0f0; /* Light grey background */
}

[data-theme="dark"] .input-field {
  background-color: var(--active-color);
  color: var(--text-color);
}

[data-theme="dark"] .input-field:focus {
  background-color: var(--active-color);
  color: var(--text-color);
}

.input-field:focus {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
}

/* Additional styles for other input types if needed */
input[type="text"],
input[type="email"],
select {
  background-color: #f0f0f0; /* Light grey background */
  min-width: 20vw;
  max-width: 20vw;
}

input[type="text"]:focus,
input[type="email"]:focus,
select:focus {
  background-color: white; /* Light grey background */
}

.profile-photo {
  width: 20%;
  height: 20%;
  border-radius: 50%;
  border: 1px solid var(--text-color);
  object-fit: cover;
  margin-bottom: 10px;
}

.error-message {
  color: red;
  font-size: 0.8em;
}

.photo-container {
  position: relative;
  display: flex;
}

.edit-icon {
  position: absolute;
  bottom: 0;
  left: 0;
  margin-left: 7vw;
  width: 2vw;
  height: auto;
  cursor: pointer;
}

.submit-button {
  margin-top: 5vh;
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>
