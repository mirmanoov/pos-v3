<template>
  <nav class="navbar">
    <div class="left-content">
      <img
        :src="currentTheme === 'light' ? '/logo-light.svg' : '/logo-dark.svg'"
        alt="Logo"
        class="logo"
      />

      <input
        type="text"
        class="search-input"
        placeholder="Search..."
        v-model="searchInput"
        @keyup.enter="submitSearch"
      />
    </div>
    <div class="right-content">
      <span class="date-time">{{ dateTime }}</span>
      <button class="theme-button" @click="toggleTheme">
        <img
          :src="currentTheme === 'light' ? '/sun.svg' : '/moon.svg'"
          alt="Theme"
        />
      </button>
    </div>
  </nav>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useThemeStore } from "/src/stores/themeStore.js";
import { useSearchStore } from "/src/stores/searchStore.js";

export default {
  setup(props, { emit }) {
    const themeStore = useThemeStore();
    const searchStore = useSearchStore();
    const searchInput = ref("");

    const dateTime = computed(() =>
      new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    const submitSearch = () => {
      if (searchInput.value) {
        searchStore.setSearchTerm(searchInput.value);
      }
    };

    const applyTheme = (theme) => {
      document.documentElement.setAttribute("data-theme", theme);
    };

    const toggleTheme = () => {
      themeStore.toggleTheme();
      applyTheme(themeStore.currentTheme);
    };

    onMounted(() => {
      applyTheme(themeStore.currentTheme);
    });

    return {
      dateTime,
      toggleTheme,
      currentTheme: computed(() => themeStore.currentTheme),
      searchInput,
      submitSearch,
    };
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--navbar-bg-color);
  padding: 0.5rem 1rem;
  min-height: 10vh;
  max-height: 10vh;
  padding-right: 5vw;
}

[data-theme="light"] .logo {
  min-height: 7vh;
  max-height: 7vh;
  padding-left: 2vw;
}

[data-theme="dark"] .logo {
  min-height: 11vh;
  max-height: 11vh;
  min-width: 12vw;
  max-width: 12vw;
  padding-right: 2vw;
}

[data-theme="dark"] .search-input {
  min-height: 5vh;
  max-height: 5vh;
  margin-top: 2vh;
  min-width: 21vw;
  max-width: 21vw;
}

[data-theme="dark"] .left-content {
  gap: 11vw;
}

.search-input {
  flex-grow: 1;
  margin: 0 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 25px;
}

.left-content {
  display: flex; /* or grid */
  gap: 10vw; /* adjust accordingly */
}

@media (min-width: 700px) {
  .search-input {
    width: 21vw;
    flex-grow: 0;
    background-position: 10px center;
    background-repeat: no-repeat;
    background: var(--active-color);
    text-indent: 30px;
    min-height: 5vh;
    max-height: 5vh;
    background-image: url("/search-black.svg");
    background-repeat: no-repeat;
    background-position: 12px center;
  }

  [data-theme="dark"] .search-input {
    background-image: url("/search-white.svg");
    background-repeat: no-repeat;
    background-position: 12px center;
    color: white;
  }
}
@media (max-width: 700px) {
  .date-time {
    display: none;
  }

  [data-theme="dark"] .search-input {
    min-height: 5vh;
    max-height: 5vh;
    margin-top: 2vh;
    min-width: 42vw;
    max-width: 42vw;
    color: var(--text-color);
    background: var(--navbar-bg-color);
  }

  .right-content {
    gap: 1vw;
  }

  [data-theme="dark"].left-content {
    gap: 10vw; /* adjust accordingly */
  }
}

.right-content {
  display: flex;
  align-items: center;
  gap: 10vw;
}

.date-time {
  margin-right: 1rem;
  font-size: 1.2rem;
  color: var(--text-color);
}

.theme-button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
