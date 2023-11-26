<template>
  <div class="order-component">
    <div class="order-header">
      <div class="orderID">
        ORDER #
        <h2>{{ orderID }}</h2>
      </div>
      <div class="order-type">
        <p class="orderTypeLabel">Order Type:</p>
        <select v-model="orderStore.orderType" class="orderSelect">
          <option value="Dining">Dining In</option>
          <option value="Delivery">Delivery</option>
          <option value="Take Away">Take Away</option>
        </select>
      </div>
    </div>
    <!-- Inside the template of order.vue -->

    <div v-if="orderStore.orderType === 'Delivery'">
      <div class="delivery-options">
        <label for="deliveryCompany">Delivery Company:</label>
        <select v-model="orderStore.deliveryCompany">
          <option value="Grab">Grab</option>
          <option value="Foodpanda">Food Panda</option>
          <option value="Lalamove">Lalamove</option>
          <option value="Uber Eats">Uber Eats</option>
        </select>
      </div>
      <div class="delivery-input">
        <h3 class="customerInfo">Customer's information:</h3>
        <input v-model="orderStore.customerName" placeholder="Customer Name" />
        <input
          v-model="orderStore.phoneNumber"
          type="tel"
          placeholder="Phone Number"
        />
        <input v-model="orderStore.address" placeholder="Address" />
      </div>
    </div>

    <div v-else-if="orderStore.orderType === 'Take Away'">
      <div class="takeaway-input">
        <h3 class="customerInfo">Customer's information:</h3>
        <input v-model="orderStore.customerName" placeholder="Customer Name" />
        <input
          v-model="orderStore.phoneNumber"
          type="tel"
          placeholder="Phone Number"
        />
      </div>
    </div>

    <!-- Conditionally render the PAX and Table inputs -->
    <div class="order-info" v-if="orderStore.orderType === 'Dining'">
      <div class="pax">
        <img :src="paxIconPath" alt="PAX Icon" />
        <label>PAX:</label>
        <input v-model.number="pax" type="number" min="1" />
      </div>
      <div class="table">
        <img :src="tableIconPath" alt="Table Icon" />
        <label>Table:</label>
        <input v-model="tableID" type="text" />
      </div>
    </div>

    <div v-if="orderDetails.length > 0" class="order-items">
      <div
        class="order-item"
        v-for="(item, index) in orderDetails"
        :key="index"
      >
        <ul>
          <li>
            <p class="itemIndex">{{ index + 1 }}</p>
            {{ item.name }}
            {{ item.quantity }} x RM{{ item.price.toFixed(2) }} RM{{
              (item.quantity * item.price).toFixed(2)
            }}
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="no-order-message">
      <img :src="noOrdersIcon" alt="No Orders" />
      No orders added.
    </div>
    <div class="order-summary">
      <div class="subtotal">Subtotal: RM{{ formatPrice(subtotal) }}</div>
      <div class="serviceCharge">
        Service Charge (10%): RM{{ formatPrice(serviceCharge) }}
      </div>
      <div class="gst">GST (6%): RM{{ formatPrice(gst) }}</div>
      <div class="total">Total: RM{{ formatPrice(totalComputed) }}</div>
    </div>
    <div class="order-actions">
      <button @click="cancelOrder" class="cancel">Cancel Order</button>
      <button @click="sendOrder" class="send">{{ sendButtonLabel }}</button>
    </div>
  </div>
</template>

<script>
import { useOrderStore } from "/src/stores/orderStore.js";
import { useThemeStore } from "/src/stores/themeStore.js";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";

export default {
  setup(props, { emit }) {
    // Use Pinia order store
    const orderStore = useOrderStore();
    const themeStore = useThemeStore();
    const sendButtonLabel = ref("Send Order");
    const router = useRouter(); // Import and use useRouter to get the router instance
    const {
      orderDetails,
      total,
      orderID,
      tableID,
      pax,
      orderType,
      customerName,
      address,
      phoneNumber,
    } = storeToRefs(orderStore);

    onMounted(async () => {
      if (orderDetails.value.length === 0) {
        await orderStore.fetchOrderDetails();
      }
    });
    // Methods
    function cancelOrder() {
      orderStore.clearOrder();
    }

    function sendOrder() {
      console.log("Sending order...");
      orderStore.sendOrder(router);
      emit("send-order", orderDetails.value);

      // Change button label to 'Order Sent ✔'
      sendButtonLabel.value = "Order Sent ✔";

      // Reset button label after 2 seconds
      setTimeout(() => {
        sendButtonLabel.value = "Send Order";
      }, 2000);
    }

    const subtotal = computed(() => {
      return orderDetails.value.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    });

    const serviceCharge = computed(() => {
      return subtotal.value * 0.1; // 10%
    });

    const gst = computed(() => {
      return subtotal.value * 0.06; // 6%
    });

    const totalComputed = computed(() => {
      return subtotal.value + serviceCharge.value + gst.value;
    });

    const estimatedDeliveryTime = computed(() => {
      // Randomly calculate delivery time between 15 to 45 minutes
      return Math.floor(Math.random() * (45 - 15 + 1)) + 15;
    });

    const estimatedCookingTime = computed(() => {
      // Calculate cooking time based on the number of menu items
      return orderDetails.value.length * 12;
    });

    const estimatedTotalWaitingTime = computed(() => {
      // Total waiting time is the sum of delivery and cooking time
      return estimatedDeliveryTime.value + estimatedCookingTime.value;
    });

    // Compute the path for the PAX icon based on the current theme
    const paxIconPath = computed(() => {
      return themeStore.currentTheme === "light"
        ? "/pax-black.svg"
        : "/pax-white.svg";
    });

    const tableIconPath = computed(() => {
      return themeStore.currentTheme === "light"
        ? "/table-icon-black.svg"
        : "/table-icon-white.svg";
    });

    function formatPrice(value) {
      if (typeof value === "number") {
        return value.toFixed(2);
      }
      return "0.00";
    }

    const noOrdersIcon = computed(() => {
      return themeStore.currentTheme === "light"
        ? "/order-black.svg"
        : "/order-white.svg";
    });

    return {
      orderDetails,
      total,
      orderID,
      tableID,
      pax,
      cancelOrder,
      sendOrder,
      formatPrice,
      subtotal,
      serviceCharge,
      gst,
      totalComputed,
      orderStore,
      estimatedDeliveryTime,
      estimatedCookingTime,
      estimatedTotalWaitingTime,
      paxIconPath,
      tableIconPath,
      noOrdersIcon,
      sendButtonLabel,
    };
  },
};
</script>
<style scoped>
.order-component {
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow: scroll;
  color: var(--text-color);
  background: var(--active-color);
}

.order-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--active-color);
  padding: 16px;
  border-bottom: 1px solid #e2e2e2;
}

.order-header h2 {
  font-size: 16px;
  font-weight: 600;
}

.orderID {
  display: flex;
  align-items: center;
}

.order-info {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 16px 16px;
}

.order-info label {
  font-weight: bold;
  font-size: 16px;
  margin-right: 8px;
  margin-left: 8px;
}

.order-info input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 1rem;
  width: 3vw;
}

.order-items {
  border-top: 1px dashed #ccc;
}

.order-item li {
  color: var(--text-color);
  padding-left: 10px;
  border-radius: 20px;
  background-color: var(--list-bg-color);
}

.order-item ul {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.itemIndex {
  background-color: white;
  border-radius: 50%;
  padding: 5px 5px;
  margin-right: 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  color: black;
}

.order-actions {
  display: flex;
  padding-top: 30px;
  justify-content: space-between;
  background-color: var(--active-color);
}

.order-actions button {
  padding: 15px 50px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  border: 1px solid white;
}

.cancel:hover {
  background-color: #ff6666;
  border: 1px solid black;
}

.send:hover {
  background-color: #66ff66;
  border: 1px solid black;
}

.cancel {
  color: black;
  background-color: var(--cancel-btn-color);
  border: 1px solid white;
}

.send {
  color: black;
  background-color: var(--send-btn-color);
  border: 1px solid black;
}

/* Scrollbar styles for order items */
.order-items::-webkit-scrollbar {
  width: 8px;
}

.order-items::-webkit-scrollbar-thumb {
  background-color: #cccccc;
  border-radius: 4px;
}

.order-items::-webkit-scrollbar-track {
  background-color: #f8f8f8;
}

/* Add to your existing styles in order.vue */
.order-type {
  background-color: var(--active-color);
  display: flex;
  flex-direction: row;
  align-items: center;
}

.orderTypeLabel {
  font-size: 16px;
  font-weight: 600;
  vertical-align: middle;
  margin-right: 8px;
}

.order-type select {
  background: var(--active-color);
  color: var(--text-color);
  border-radius: 10px;
  padding: 5px;
}

/* Style for the additional input fields */
input {
  margin-top: 8px;
  margin-right: 8px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.delivery-options {
  background-color: var(--active-color);
  margin-top: 20px;
}

.delivery-options label,
.delivery-options select {
  margin-right: 8px;
}

.delivery-options label {
  padding-left: 16px;
}

.delivery-options select {
  color: var(--text-color);
  background-color: var(--active-color);
  border-radius: 10px;
  padding-left: 5px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.delivery-input {
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: var(--active-color);
}

.delivery-input input {
  padding: 16px;
  background-color: var(--active-color);
}

.delivery-input input::placeholder {
  color: var(--text-color);
}

.takeaway-input {
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: var(--active-color);
}

.takeaway-input input {
  padding: 16px;
  background-color: var(--active-color);
}

.takeaway-input input::placeholder {
  color: var(--text-color);
}

.pax img {
  height: 1.2em; /* Adjust size to match your text */
  width: 1.2em; /* Adjust size to match your text */
  margin-top: -2px;
  vertical-align: middle;
  background-color: var(--active-color);
}

.pax input {
  width: 2vw;
  height: 1vh;
  background-color: var(--active-color);
  color: var(--text-color);
}

.table input {
  width: 3vw;
  height: 1vh;
  color: var(--text-color);
  background-color: var(--active-color);
}

.table img {
  height: 1.2em; /* Adjust size to match your text */
  width: 1.2em; /* Adjust size to match your text */
  vertical-align: middle;
  margin-bottom: 6px;
}

.order-summary {
  display: flex;
  flex-direction: column;
  background-color: var(--total-wrapper-bg-color);
  border: 1px dashed #a9a9a9;
  border-radius: 14px;
  gap: 20px;
  padding-left: 5px;
  padding-top: 20px;
  padding-bottom: 10px;
}

.total {
  padding-top: 20px;
  font-size: 20px;
  border-top: 1px dashed #a9a9a9;
  font-weight: 600;
  padding: 10px;
  padding-top: 20px;
}

.subtotal,
.serviceCharge,
.gst {
  padding-left: 10px;
}

.no-order-message {
  margin-top: 10vh;
  margin-bottom: 10vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: var(--active-color);
}
</style>
