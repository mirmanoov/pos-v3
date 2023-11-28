<template>
  <div class="delivery-history">
    <h3 class="deliver-history-text">Take Away Orders</h3>
    <div class="delivery-wrapper">
      <div
        v-if="filteredDeliveryOrders.length > 0"
        v-for="(order, index) in filteredDeliveryOrders"
        :key="index"
        class="delivery-item"
      >
        <div class="orderID">Order #{{ order.orderID }}</div>
        <div class="order-text">Order Details:</div>
        <div class="order-wrapper">
          Time Ordered:
          <span class="text">{{ formatTimestamp(order.timestamp) }}</span>
        </div>
        <div>
          Name:
          <span class="bold-text">{{ order.customerName }}</span>
        </div>
        <div>
          Phone: <span class="bold-text">{{ order.phoneNumber }}</span>
        </div>
        <div>
          Estimated Cooking Time:
          <span class="bold-text"
            >{{ order.estimatedCookingTime }} minutes</span
          >
        </div>

        <div class="order-text">Order Check:</div>
        <ul>
          <li v-for="item in order.orderDetails" :key="item.name">
            {{ item.name }} - {{ $t("currency") }} {{ item.price.toFixed(2) }} x
            {{ item.quantity }} = {{ $t("currency") }}
            {{ item.lineTotal.toFixed(2) }}
          </li>
        </ul>
        <div>
          Subtotal:
          <span class="bold-text"
            >{{ $t("currency") }} {{ order.subtotal.toFixed(2) }}</span
          >
        </div>
        <div>
          Service Charge (10%):
          <span class="bold-text"
            >{{ $t("currency") }} {{ order.serviceCharge.toFixed(2) }}</span
          >
        </div>
        <div>
          GST (6%):
          <span class="bold-text"
            >{{ $t("currency") }} {{ order.gst.toFixed(2) }}</span
          >
        </div>
        <div>
          Total:
          <span class="bold-text"
            >{{ $t("currency") }} {{ order.total.toFixed(2) }}</span
          >
        </div>
        <div :class="`order-status ${getOrderStatus(order.timestamp)}`">
          {{ capitalize(getOrderStatus(order.timestamp)) }}
        </div>
      </div>
      <div v-else class="no-orders">
        <img :src="noOrdersIcon" alt="No Orders" />
        No take away orders.
      </div>
    </div>
  </div>
</template>

<script>
import { useOrderStore } from "/src/stores/orderStore.js";
import { useThemeStore } from "/src/stores/themeStore.js";
import { useSettingStore } from "/src/stores/settingStore.js";

import { ref, computed } from "vue";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const orderStore = useOrderStore();
    const settingStore = useSettingStore();
    const themeStore = useThemeStore();
    const { orderHistory } = storeToRefs(orderStore);

    // Computed property to filter delivery orders
    const filteredDeliveryOrders = computed(() => {
      return orderHistory.value.filter(
        (order) => order.orderType === "Take Away"
      );
    });

    const noOrdersIcon = computed(() => {
      return themeStore.currentTheme === "light"
        ? "/order-black.svg"
        : "/order-white.svg";
    });

    const capitalize = (str) => {
      if (!str) return "";
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // Function to format the timestamp
    const formatTimestamp = (timestamp) => {
      if (!timestamp) return "";
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
      )} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };

    // Function to determine the current status of the order
    const getOrderStatus = (timestamp) => {
      const now = Date.now();
      const orderTime = new Date(timestamp).getTime();
      const timeElapsed = now - orderTime;

      if (timeElapsed < 40 * 1000) {
        // less than 40 seconds
        return "Received";
      } else if (timeElapsed < 100 * 1000) {
        // less than 1 minute and 40 seconds
        return "Preparing";
      } else {
        return "Ready";
      }
    };

    const pad = (num) => num.toString().padStart(2, "0");

    return {
      filteredDeliveryOrders,
      formatTimestamp,
      filteredDeliveryOrders,
      settingStore,
      formatTimestamp,
      capitalize,
      getOrderStatus,
      noOrdersIcon,
    };
  },
};
</script>
<style scoped>
@media (max-width: 849px) {
  .delivery-wrapper {
    flex-direction: column !important;
    width: 100% !important;
  }

  .delivery-history {
    width: fit-content !important;
  }

  .delivery-item {
    width: fit-content !important;
    min-width: fit-content !important;
    margin-bottom: 20px !important; /* Spacing between items */
    padding: 10px !important; /* Adjust padding for smaller screens */
  }

  .delivery-item .order-text,
  .delivery-item .bold-text,
  .delivery-item ul,
  .delivery-item div {
    font-size: 14px !important; /* Adjust font size for readability */
  }

  /* Adjusting the order-wrapper for better layout on smaller screens */
  .order-wrapper {
    flex-direction: column !important;
    gap: 5px !important;
  }
}
.delivery-history {
  font-family: Arial, sans-serif;
  margin: 0 auto;
  color: var(--text-color);
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.deliver-history-text {
  text-align: center;
}

.order-status {
  padding: 5px;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
  border: 1px solid black;
}

.order-status.Received {
  background-color: #fdfdfd;
  color: black;
}

.order-status.Preparing {
  background-color: #e4f898;
  color: black;
}

.order-status.Ready {
  background-color: #91f8b4;
  color: black;
}

.deliver-history-text {
  font-weight: 600;
  font-size: 30px;
  padding-bottom: 20px;
}

.delivery-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 2vw;
}

.order-text {
  padding-top: 20px;
  font-weight: 600;
  font-size: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
.orderID {
  width: fit-content;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-weight: 600;
  border-radius: 20px;
  border: 0.4px solid var(--text-color);
}

.delivery-item {
  border: 1px solid black;
  border-radius: 8px;
  width: fit-content;
  max-width: 18vw;
  align-items: start;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: var(--delivery-card-bg-color);
}

.bold-text {
  font-weight: bold;
}

.delivery-item h4 {
  margin: 0 0 10px 0;
}

.delivery-item div,
.delivery-item ul {
  margin-bottom: 10px;
}

.order-wrapper {
  display: flex;
  flex-direction: row;
  gap: 5px;
}

.text {
  color: var(--paxAndTableColor);
  font-weight: 600;
}

.time {
  font-weight: 600;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}

.no-orders {
  margin-top: 18vh;
  margin-bottom: 18vh;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: var(--active-color);
}
</style>
