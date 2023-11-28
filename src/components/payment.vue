<template>
  <div class="order-layout">
    <div class="order-history">
      <h3 class="history">Order History</h3>
      <div
        v-for="(order, index) in orderHistory"
        :key="index"
        class="history-item"
        @click="selectOrder(order)"
      >
        <div class="history-header-labels">
          <h4>Order #{{ order.orderID }}</h4>
          <div class="typeAndTime">
            <div class="order-wrapper">
              <p class="type">Order Type:</p>
              <p class="text">{{ order.orderType }}</p>
            </div>
            <div class="order-wrapper">
              <p class="time">Time:</p>
              <p class="text">{{ formatTimestamp(order.timestamp) }}</p>
            </div>
          </div>
        </div>
        <table>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          <tr v-for="(item, itemIndex) in order.orderDetails" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.quantity }}</td>
            <td>
              {{ item.lineTotal }}
              <button class="delete-btn" @click="deleteItem(order, itemIndex)">
                <img src="/remove.svg" alt="Delete" />
              </button>
            </td>
          </tr>
        </table>
      </div>
      <div v-if="orderHistory.length === 0" class="no-order-message">
        <img :src="noOrdersIcon" alt="No Orders" />
        No orders added.
      </div>
    </div>

    <div class="payableAmount">
      <div v-if="orderHistory.length === 0" class="add-message">
        <img :src="addIcon" alt="Add items" class="add-icon" /> Add orders from
        the menu.
      </div>
      <!-- Display selected order details -->
      <div v-else-if="selectedOrder" class="selected">
        <!-- Payment Method Selection -->
        <div class="payment-methods">
          <p class="payment-details">Payment Details</p>
          <div class="payable-header">
            <div class="order-wrapper">
              <p class="p">Order #:</p>
              <p class="text">{{ selectedOrder.orderID }}</p>
            </div>
            <div class="order-wrapper">
              <p class="p">Total Amount:</p>
              <p class="text">
                {{ $t("currency") }} {{ formatMoney(selectedOrder.total) }}
              </p>
            </div>
          </div>
          <div class="method-btn">
            <!-- Inside your template tag -->
            <button
              @click="selectPaymentMethod('card')"
              :class="{ inactive: paymentMethod !== 'card' }"
            >
              <img
                v-if="currentTheme === 'light'"
                src="/card-black.svg"
                alt="Card"
                class="payment-icon"
              />
              <img
                v-else
                src="/card-white.svg"
                alt="Card"
                class="payment-icon"
              />
              Card
            </button>
            <button
              @click="selectPaymentMethod('cash')"
              :class="{ inactive: paymentMethod !== 'cash' }"
            >
              <img
                v-if="currentTheme === 'light'"
                src="/cash-black.svg"
                alt="Cash"
                class="payment-icon"
              />
              <img
                v-else
                src="/cash-white.svg"
                alt="Cash"
                class="payment-icon"
              />
              Cash
            </button>
            <button
              @click="selectPaymentMethod('voucher')"
              :class="{ inactive: paymentMethod !== 'voucher' }"
            >
              <img
                v-if="currentTheme === 'light'"
                src="/voucher-black.svg"
                alt="Voucher"
                class="payment-icon"
              />
              <img
                v-else
                src="/voucher-white.svg"
                alt="Voucher"
                class="payment-icon"
              />
              Voucher
            </button>
          </div>
        </div>

        <!-- Cash Payment Input -->
        <div v-if="paymentMethod === 'cash'" class="cashInput">
          <div class="add-cash">Add cash received:</div>
          <div class="input-wrapper">
            <span class="currency">{{ $t("currency") }}</span>
            <input
              type="number"
              class="minimalist-input"
              v-model.number="cashReceived"
              @input="validateCashAmount"
            />
          </div>
        </div>

        <!-- Voucher Input -->
        <div v-if="paymentMethod === 'voucher'" class="voucherInput">
          <div class="voucher">
            <label>Enter the voucher code:</label>
            <input
              type="text"
              v-model="voucherCode"
              @input="validateVoucher"
              placeholder="Enter the code..."
            />
          </div>
          <div v-if="invalidVoucher" class="voucher-invalid">
            Voucher is not valid
          </div>
        </div>
        <div class="order-summary">
          <p class="subtotal">
            Subtotal: {{ $t("currency") }}
            {{ formatMoney(selectedOrder.subtotal) }}
          </p>
          <p class="serviceCharge">
            Service Charge (10%): {{ $t("currency") }}
            {{ formatMoney(selectedOrder.serviceCharge) }}
          </p>
          <p class="gst">
            GST (6%): {{ $t("currency") }} {{ formatMoney(selectedOrder.gst) }}
          </p>
          <p class="total">
            Total: {{ $t("currency") }} {{ formatMoney(selectedOrder.total) }}
          </p>
          <div v-if="cashReceived > selectedOrder.total" class="total">
            Change amount: {{ $t("currency") }} {{ cashChange }}
          </div>
        </div>
        <div class="payment-actions">
          <button @click="handleCancel" class="cancel-btn">Cancel Order</button>
          <button @click="handlePayOrder" class="pay-btn">Pay Order</button>
        </div>
      </div>

      <div v-else="orderHistory.length" class="add-message">
        <img :src="addIcon" alt="Add items" class="add-icon" /> Select an order
        from order history.
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useSettingStore } from "/src/stores/settingStore.js";
import { useOrderStore } from "/src/stores/orderStore.js";
import { useThemeStore } from "/src/stores/themeStore.js";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const orderStore = useOrderStore();
    const themeStore = useThemeStore();
    const settingStore = useSettingStore();
    const { currentTheme } = storeToRefs(themeStore);
    const { orderHistory } = storeToRefs(orderStore);
    const { selectedOrder } = storeToRefs(orderStore);

    const selectOrder = (order) => {
      orderStore.setSelectedOrder(order);
    };

    // Function to delete an item from the order
    const deleteItem = (order, itemIndex) => {
      orderStore.deleteOrderItem(order.orderID, itemIndex);
    };

    // Function to format money values to two decimal places
    const formatMoney = (value) => {
      if (value !== undefined && value !== null) {
        return Number(value).toFixed(2);
      }
      return "0.00";
    };

    // Function to format the timestamp
    const formatTimestamp = (timestamp) => {
      if (!timestamp) return "";
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
      )} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };

    const noOrdersIcon = computed(() => {
      return themeStore.currentTheme === "light"
        ? "/order-black.svg"
        : "/order-white.svg";
    });

    const addIcon = computed(() => {
      return themeStore.currentTheme === "light"
        ? "/add-black.svg"
        : "/add-white.svg";
    });

    // Helper function to pad single digit numbers with a leading zero
    const pad = (num) => num.toString().padStart(2, "0");

    return {
      orderHistory,
      deleteItem,
      formatTimestamp,
      selectedOrder,
      selectOrder,
      settingStore,
      formatMoney,
      currentTheme,
      noOrdersIcon,
      addIcon,
    };
  },
  data() {
    return {
      paymentMethod: null,
      cashReceived: 0,
      voucherCode: "",
      paymentMethod: "card",
      invalidVoucher: false,
    };
  },
  computed: {
    cashChange() {
      const change = this.cashReceived - this.selectedOrder.total;
      return Number(change).toFixed(2); // Round to 2 decimal places
    },
  },
  methods: {
    selectPaymentMethod(method) {
      this.paymentMethod = method;
    },
    validateCashAmount() {
      if (this.cashReceived < this.selectedOrder.total) {
        this.cashReceived = this.selectedOrder.total;
      }
    },
    validateVoucher() {
      this.invalidVoucher = this.voucherCode.length !== 6;
    },
    handleCancel() {
      // Logic to handle cancel action
      this.selectedOrder = null; // This will render the div with "Select an order to process the payment"
    },
    async handlePayOrder() {
      // Logic to handle pay order action
      if (this.selectedOrder) {
        // Show success message in a modal
        alert("Payment Successful"); // Replace with your modal implementation

        // Delete the whole order
        this.deleteOrder(this.selectedOrder.orderID);

        // Reset selected order
        this.selectedOrder = null;
      }
    },

    deleteOrder(orderID) {
      const index = this.orderHistory.findIndex(
        (order) => order.orderID === orderID
      );
      if (index !== -1) {
        this.orderHistory.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
@media (max-width: 849px) {
  .order-layout {
    display: flex !important;
    flex-direction: column !important;
  }

  .history-item table {
    display: flex !important;
    flex-direction: column !important;
  }

  .history-item table > * {
    display: grid !important;
  }

  .history-header-labels {
    display: flex !important;
    flex-direction: column !important;
  }

  .payableAmount {
    border-top: 1px solid var(--text-color) !important;
  }

  .order-layout > * {
    width: 100% !important;
    box-sizing: border-box !important; /* Include padding and border in the width */
  }

  .no-order-message,
  .add-message {
    padding-bottom: 300px !important;
  }
}
.history {
  text-align: center;
  font-size: 24px;
}
.order-history {
  padding: 20px;
  color: var(--text-color);
  width: 60%;
  border-right: 1px solid #ccc;
}

.order-layout {
  display: flex;
  justify-content: space-between;
  color: var(--text-color);
  min-height: 120vh;
}

.payableAmount {
  display: flex;
  flex-direction: column;
  width: 40%;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.voucherInput {
  /* Copy styles from .cashInput and adjust as needed */
  border-top: #a9a9a9 1px dashed;
  border-bottom: #a9a9a9 1px dashed;
  padding-top: 5vh;
  padding-bottom: 5vh;
  padding-left: 1vw;
  background: var(--cash-bg-color);
  display: flex;
  gap: 40px;
  flex-direction: column;
  justify-content: center;
}

.voucher {
  display: flex;
  flex-direction: row;
}

.voucher-invalid {
  color: rgb(255, 77, 77);
  font-size: 20px;
  font-weight: 600;
}

/* Add any additional specific styles for voucher input elements here */
.voucherInput label {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color);
}

.voucherInput input {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color);
  border: none;
  border-bottom: 1px solid var(--text-color);
  background: transparent;
  outline: none;
}

.voucherInput input::placeholder {
  color: var(--text-color);
  opacity: 0.5;
  padding-left: 5px;
  font-style: italic;
  font-size: 20px;
}

.add-cash {
  font-size: 20px;
  font-weight: 400;
  color: var(--text-color);
}
.payable-header {
  font-size: 20px;
  color: var(--text-color);
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.selected {
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.no-order-message {
  display: flex;
  margin-top: 25vh;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: var(--active-color);
}

.add-message {
  display: flex;
  margin-top: 32.5vh;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: var(--active-color);
}

.inactive {
  opacity: 0.4;
}

.method-btn {
  border-top: 1px solid #ccc;
  padding-top: 40px;
  display: flex;
  flex-direction: row;
  gap: 50px;
  justify-content: center;
  background: transparent;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--text-color); /* Styling the bottom border */
  position: relative;
  width: 8vw;
  font-size: 20px;
  font-weight: 600;
}

.payment-actions {
  display: flex;
  justify-content: space-between;
  background-color: var(--active-color);
}

.payment-actions button {
  padding: 15px 50px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  border: 1px solid white;
}
.pay-btn {
  color: black;
  background: var(--pay-btn-color);
  background-color: var(--pay-btn-color);
  border: 1px solid black;
}

.time,
.type {
  font-weight: 600;
}

.cancel-btn {
  color: black;
  background: var(--cancel-btn-color);
  background-color: var(--cancel-btn-color);
  border: 1px solid white;
}

.cancel-btn:hover {
  background-color: #ff6666;
  border: 1px solid black;
}

.pay-btn:hover {
  background-color: #66ff66;
  border: 1px solid black;
}

.currency {
  color: var(--text-color);
  pointer-events: none; /* Prevents the label from blocking input interaction */
}

.minimalist-input {
  background: transparent;
  color: var(--text-color);
  border: none;
  outline: none;
  width: 100%; /* Take full width of the wrapper */
  font-size: 20px;
  font-weight: 600;
}

.method-btn button {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  gap: 5px;
  background: transparent;
  color: var(--text-color);
  border: none;
}

.add-icon {
  width: 80px;
  height: auto;
}

.payment-icon {
  width: 30px;
  height: 30px;
}

.cashInput {
  border-top: #a9a9a9 1px dashed;
  border-bottom: #a9a9a9 1px dashed;
  padding-top: 5vh;
  padding-bottom: 5vh;
  background: var(--cash-bg-color);
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
}

.history-item {
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.payment-methods button {
  margin-right: 10px;
}

.history-header-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.history-item table {
  width: 100%;
  border-radius: 10px;
  border-collapse: collapse;
  overflow: hidden;
}

.history-item th,
.history-item td {
  border: 1px solid transparent;
  padding-left: 20px;
  padding-top: 20px;
  border-collapse: collapse;
  padding-bottom: 20px;
  background-color: var(--payment-bg-color);
}

.history-item td {
  border-bottom: 1px solid #ddd;
}

.history-item:last-child th {
  border-bottom: none;
}

.history-item table {
  border: 1px solid #000;
}

.history-item th {
  background-color: var(--payment-header-color);
  text-align: left;
}

.history-item h4,
.history-item div,
.history-item ul {
  margin-bottom: 10px;
}

.history-item ul {
  list-style: none;
  padding: 0;
}

.typeAndTime {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: end;
}

.history-item li {
  /* Style each list item */
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.delete-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.delete-btn img {
  width: 10px;
  height: auto;
}

.order-wrapper {
  display: flex;
  flex-direction: row;
  gap: 5px;
}

.order-summary {
  display: flex;
  flex-direction: column;
  background-color: var(--total-wrapper-bg-color);
  border: 1px dashed #a9a9a9;
  border-radius: 14px;
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
  color: var(--text-color);
}

.subtotal,
.serviceCharge,
.gst {
  padding-left: 10px;
  color: var(--text-color);
}

.p {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color);
}

.text {
  color: var(--paxAndTableColor);
  font-weight: 600;
}

.payment-details {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-color);
}
</style>
