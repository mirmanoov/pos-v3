<template>
  <aside class="sidebar">
    <ul class="nav-links">
      <li
        v-for="(link, index) in themedLinks"
        :key="index"
        :class="{ active: currentLink === link.name }"
        @click="selectLink(link.name)"
      >
        <img :src="link.icon" :alt="link.name" />
        <span>{{ link.name }}</span>
      </li>
    </ul>
  </aside>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { useThemeStore } from "/src/stores/themeStore.js";

export default {
  setup(_, { emit }) {
    const themeStore = useThemeStore(); // Using the Pinia store
    const currentLink = ref("Tables");
    const themedLinks = ref([]);

    // Function to update themed links based on the current theme
    const updateThemedLinks = () => {
      const currentTheme = themeStore.currentTheme; // Access currentTheme from themeStore
      themedLinks.value = [
        {
          name: "TABLES",
          icon: `/tables-icon-${
            currentTheme === "light" ? "black" : "white"
          }.svg`,
        },
        {
          name: "MENU",
          icon: `/menu-icon-${
            currentTheme === "light" ? "black" : "white"
          }.svg`,
        },
        {
          name: "PAYMENT",
          icon: `/payment-icon-${
            currentTheme === "light" ? "black" : "white"
          }.svg`,
        },
        {
          name: "DELIVERY",
          icon: `/delivery-icon-${
            currentTheme === "light" ? "black" : "white"
          }.svg`,
        },
        {
          name: "TAKE AWAY",
          icon: `/takeaway-icon-${
            currentTheme === "light" ? "black" : "white"
          }.svg`,
        },
        {
          name: "RESERVATION",
          icon: `/reservation-icon-${
            currentTheme === "light" ? "black" : "white"
          }.svg`,
        },
        {
          name: "SETTINGS",
          icon: `/settings-icon-${
            currentTheme === "light" ? "black" : "white"
          }.svg`,
        },
      ];
    };

    onMounted(() => {
      updateThemedLinks(); // Update themed links on mount
    });

    watch(() => themeStore.currentTheme, updateThemedLinks);

    const selectLink = (name) => {
      currentLink.value = name;
      emit("link-selected", name);
    };

    return {
      themedLinks,
      currentLink,
      selectLink,
      currentTheme: themeStore.currentTheme,
    };
  },
};
</script>

<style scoped>
.sidebar {
  background-color: var(--navbar-bg-color);
  max-width: 10vw;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center; /* Center align the child elements */
}

@media (max-width: 849px) {
  .sidebar {
    display: none;
  }
}

@media (min-width: 849px) and (max-width: 1024px) {
  .sidebar {
    font-size: 12px;
  }
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%; /* Set width to 100% of the sidebar */
}

.nav-links li {
  display: flex;
  flex-direction: column; /* Stack logo and text vertically */
  align-items: center; /* Center align the logo and text */
  padding: 1rem;
  cursor: pointer;
  justify-content: space-between;
  border-radius: 4px;
  background-color: transparent;
  transition: background-color 0.3s;
  text-align: center; /* Center align the text */
}

.nav-links li:hover {
  transform: perspective(300px) rotateX(-25deg) rotateY(-25deg);
  transition: transform 0.3s ease-in-out;
}

.nav-links li.active {
  position: relative;
  border-radius: 30px 0 0 30px;
}

.nav-links li.active::before {
  content: "";
  position: absolute;
  top: 0;
  left: 15px;
  bottom: 0;
  right: 0;
  background-color: var(--active-color);
  border-radius: 30px 0 0 30px;
  z-index: 1;
}

.nav-links li.active:hover {
  transform: none;
}

.nav-links img {
  height: 54px;
  z-index: 2;
}

.nav-links span {
  color: var(--text-color);
  margin-top: 0.5rem; /* Add space between the icon and the text */
  z-index: 2;
}
</style>
