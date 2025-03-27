<template>
  <!-- Removed GoogleLoginModal -->
  <div>
    <!-- Navbar Component -->
    <Navbar @open-mobile-modal="handleMobileModalOpen" />
    <MobModal
      v-if="showMobileModal"
      :is-visible="showMobileModal"
      @close="showMobileModal = false"
      @link-selected="updateMainComponent"
    />

    <div class="container">
      <!-- Sidebar Component -->
      <Sidebar v-if="windowWidth > 849" @link-selected="updateMainComponent" />

      <main class="mains">
        <component :is="currentComponent"></component>
      </main>
    </div>
  </div>
</template>

<script>
import { watch, onMounted, onBeforeUnmount, ref } from "vue";
import MobModal from "/src/components/mob-modal.vue";
import { useSearchStore } from "/src/stores/searchStore.js";
import Navbar from "/src/components/navbar.vue";
import Sidebar from "/src/components/sidebar.vue";
import tables from "/src/components/tables.vue";
import settings from "/src/components/settings.vue";
import menu from "/src/components/menu.vue";
import payment from "/src/components/payment.vue";
import delivery from "/src/components/delivery.vue";
import takeaway from "/src/components/takeaway.vue";
import reservations from "/src/components/reservations.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Sidebar,
    MobModal,
  },
  setup() {
    const windowWidth = ref(window.innerWidth);

    const updateWidth = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", updateWidth);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateWidth);
    });

    return {
      windowWidth,
    };
  },
  data() {
    return {
      currentComponent: tables,
      // Removed showLoginModal and isAuthenticated since login is no longer required
      showMobileModal: false,
    };
  },
  mounted() {
    const searchStore = useSearchStore();

    watch(
      () => searchStore.searchTerm,
      (term) => {
        if (term) {
          this.currentComponent = menu;
        }
      }
    );
  },
  methods: {
    updateMainComponent(componentName) {
      switch (componentName) {
        case "TABLES":
          this.currentComponent = tables;
          break;
        case "MENU":
          this.currentComponent = menu;
          break;
        case "PAYMENT":
          this.currentComponent = payment;
          break;
        case "DELIVERY":
          this.currentComponent = delivery;
          break;
        case "TAKE AWAY":
          this.currentComponent = takeaway;
          break;
        case "RESERVATION":
          this.currentComponent = reservations;
          break;
        case "SETTINGS":
          this.currentComponent = settings;
          break;
        default:
          this.currentComponent = null;
      }
    },
    handleMobileModalOpen() {
      console.log("Before opening modal:", this.showMobileModal);
      this.showMobileModal = true;
      console.log("After opening modal:", this.showMobileModal);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
body {
  margin: 0;
  font-family: "Roboto", sans-serif;
}

.mains {
  padding: 0;
}
.container {
  display: flex;
}

main {
  flex-grow: 1;
  padding: 20px;
  background-color: var(--active-color);
}

@media (max-width: 849px) {
  body {
    flex-direction: column;
    max-width: 100% !important;
  }

  main {
    width: 100% !important;
    max-width: 100% !important;
  }
  .sidebar {
    display: none;
  }
}

:root {
  --navbar-bg-color: #f3efe9;
  --menu-category-bg-color: #d8e6e9;
  --delivery-card-bg-color: #d8e6e9;
  --text-color: black;
  --table-bg-color: #f3efe9;
  --table-border-color: #d9d9d9;
  --btn-color: #d9d9d9;
  --btn-active: black;
  --pay-btn-color: #8bb5be;
  --paxAndTableColor: #d89f65;
  --list-bg-color: #eaf0f0;
  --total-wrapper-bg-color: #fafafa;
  --cancel-btn-color: #f3efea;
  --send-btn-color: #91f8b4;
  --cash-bg-color: #ecf3f5;
  --payment-bg-color: #fafafa;
  --payment-header-color: #fafafa;
}

[data-theme="dark"] {
  --navbar-bg-color: #282c2d;
  --menu-category-bg-color: #292c2d;
  --delivery-card-bg-color: #292c2d;
  --text-color: white;
  --active-color: #484444;
  --table-bg-color: #9d9d99;
  --table-border-color: #ffffff;
  --btn-color: #292c2d;
  --btn-active: black;
  --paxAndTableColor: #78ccc7;
  --list-bg-color: #292c2d;
  --cash-bg-color: #292c2d;
  --pay-btn-color: #78ccc7;
  --total-wrapper-bg-color: #292c2d;
  --cancel-btn-color: #9d9d99;
  --send-btn-color: #78ccc7;
  --payment-bg-color: #292c2d;
  --payment-header-color: #1d1f1f;
}

[data-theme="light"] {
  --navbar-bg-color: #f3efe9;
  --menu-category-bg-color: #d8e6e9;
  --cash-bg-color: #ecf3f5;
  --text-color: black;
  --active-color: #ffffff;
  --table-bg-color: #f3efe9;
  --table-border-color: #d9d9d9;
  --btn-color: #d9d9d9;
  --btn-active: black;
  --paxAndTableColor: #d89f65;
  --list-bg-color: #eaf0f0;
  --pay-btn-color: #8bb5be;
  --total-wrapper-bg-color: #fafafa;
  --cancel-btn-color: #f3efea;
  --send-btn-color: #91f8b4;
  --payment-bg-color: #fafafa;
  --payment-header-color: #ecf3f5;
  --delivery-card-bg-color: #d8e6e9;
}
</style>