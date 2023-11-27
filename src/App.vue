<template>
  <div>
    <!-- Navbar Component -->
    <Navbar />

    <!-- Google Login Modal -->
    <GoogleLoginModal
      v-if="showLoginModal"
      @close="showLoginModal = false"
      @login-success="onLoginSuccess"
      @login-failure="onLoginFailure"
    />

    <div class="container" v-if="isAuthenticated">
      <!-- Sidebar Component -->
      <Sidebar @link-selected="updateMainComponent" />

      <main class="mains"><component :is="currentComponent"></component></main>
    </div>
  </div>
</template>
<script>
import { watch } from "vue";
import { useSearchStore } from "/src/stores/searchStore.js";
import GoogleLoginModal from "/src/components/GoogleLoginModal.vue";
import Navbar from "/src/components/navbar.vue";
import Sidebar from "/src/components/sidebar.vue";
import tables from "/src/components/tables.vue";
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
    GoogleLoginModal,
  },
  data() {
    return {
      currentComponent: tables,
      showLoginModal: true, // Initially true to show login on app load
      isAuthenticated: false, // Authentication state
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
        default:
          this.currentComponent = null;
      }
    },
    onLoginSuccess(googleUser) {
      this.isAuthenticated = true;
      this.showLoginModal = false;
      // You can store the googleUser details or token as needed
    },
    onLoginFailure(error) {
      console.error("Login Failed:", error);
      // Handle login failure, such as re-showing the login modal
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
