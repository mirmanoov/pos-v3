<template>
  <div class="menu-container">
    <MenuComponent class="menu-section" />
    <OrderComponent class="order-section" />
  </div>
</template>

<script>
import MenuComponent from "./menuComponent.vue";
import OrderComponent from "./menuOrder.vue";

export default {
  components: {
    MenuComponent,
    OrderComponent,
  },
};
</script>

<style>
@media (max-width: 849px) {
  .menu-container {
    flex-direction: column !important;
  }
  .menu-section {
    width: 100% !important;
    border-right: none !important;
  }
  .order-section {
    width: 100% !important;
  }
}
.menu-container {
  display: flex;
  height: 100%;
}

.menu-section {
  width: 65%;
  border-right: 1px solid #ccc; /* Horizontal line */
}

.order-section {
  width: 35%;
}
</style>
