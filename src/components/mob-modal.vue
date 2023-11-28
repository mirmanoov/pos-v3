<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <ul class="menu-links">
        <li @click="selectLink('TABLES')">Tables</li>
        <li @click="selectLink('MENU')">Menu</li>
        <li @click="selectLink('PAYMENT')">Payment</li>
        <li @click="selectLink('DELIVERY')">Delivery</li>
        <li @click="selectLink('TAKE AWAY')">Take Away</li>
        <li @click="selectLink('RESERVATION')">Reservations</li>
        <li @click="selectLink('SETTINGS')">Settings</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
  },
  setup(props, { emit }) {
    console.log("MobModal isVisible prop:", props.isVisible);

    const selectLink = (linkName) => {
      emit("link-selected", linkName);
      emit("close");
    };

    return {
      selectLink,
    };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: black;
  width: 80%;
  padding: 20px;
  border-radius: 10px;
}

.menu-links {
  list-style-type: none;
  padding: 0;
  color: white;
  text-align: center;
}

.menu-links li {
  margin: 10px 0;
  cursor: pointer;
}
</style>
