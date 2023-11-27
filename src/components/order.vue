<template>
  <div class="order-component">
    <h2 v-if="selectedOrders.length" class="orderLabel">
      Orders for Table {{ selectedTable }}
    </h2>

    <div
      v-for="order in selectedOrders"
      :key="order.orderID"
      class="order-summary"
    >
      <h3 @click="toggleDetails(order.orderID)" class="orderList">
        Order #: {{ order.orderID }}
        <img :src="getChevronIcon(order.orderID)" alt="Toggle Details" />
      </h3>
      <div v-if="visibleOrders[order.orderID]" class="order-details">
        <div class="info-wrapper">
          <h3>
            <img :src="paxIconPath" alt="PAX Icon" />PAX:
            <p class="paxAndTable">{{ order.pax }}</p>
          </h3>
          <h3>
            <img :src="tableIconPath" alt="Table Icon" />Table:
            <p class="paxAndTable">{{ selectedTable }}</p>
          </h3>
        </div>
        <ul>
          <li v-for="(item, itemIndex) in order.orderDetails" :key="item.name">
            <p class="itemIndex">{{ itemIndex + 1 }}</p>
            {{ item.name }} x{{ item.quantity }} RM{{
              item.lineTotal.toFixed(2)
            }}
          </li>
        </ul>
        <div class="total-wrapper">
          <div class="subtotal">
            Subtotal: RM{{ order.subtotal.toFixed(2) }}
          </div>
          <div class="serviceCharge">
            Service Charge (10%): RM{{ order.serviceCharge.toFixed(2) }}
          </div>
          <div class="gst">GST (6%): RM{{ order.gst.toFixed(2) }}</div>
          <div class="total">Total: RM{{ order.total.toFixed(2) }}</div>
        </div>
      </div>
    </div>
    <div v-if="!selectedOrders.length" class="no-orders">
      <img :src="noOrdersIcon" alt="No Orders" />
      No orders for this table.
    </div>
  </div>
</template>

<script>
import { useOrderStore } from "/src/stores/orderStore.js";
import { useThemeStore } from "/src/stores/themeStore.js";
import { computed, reactive } from "vue";

export default {
  props: {
    selectedTable: String,
  },
  setup(props) {
    const orderStore = useOrderStore();
    const themeStore = useThemeStore();
    const selectedOrders = computed(() => {
      return orderStore.orderHistory.filter(
        (order) => order.tableID === props.selectedTable && order.tableID
      );
    });

    const visibleOrders = reactive({});

    const toggleDetails = (orderId) => {
      if (visibleOrders[orderId]) {
        visibleOrders[orderId] = false;
      } else {
        visibleOrders[orderId] = true;
      }
    };

    // Compute the path of the icon based on the current theme
    const noOrdersIcon = computed(() => {
      return themeStore.currentTheme === "light"
        ? "/order-black.svg"
        : "/order-white.svg";
    });

    // Compute the path for the PAX icon based on the current theme
    const paxIconPath = computed(() => {
      return themeStore.currentTheme === "light"
        ? "/pax-black.svg"
        : "/pax-white.svg";
    });

    const getChevronIcon = (orderId) => {
      const baseIcon = visibleOrders[orderId] ? "chevron-up" : "chevron-down";
      return themeStore.currentTheme === "light"
        ? `/${baseIcon}-black.svg`
        : `/${baseIcon}-white.svg`;
    };

    const tableIconPath = computed(() => {
      return themeStore.currentTheme === "light"
        ? "/table-icon-black.svg"
        : "/table-icon-white.svg";
    });

    return {
      selectedOrders,
      visibleOrders,
      toggleDetails,
      noOrdersIcon,
      paxIconPath,
      tableIconPath,
      getChevronIcon,
    };
  },
};
</script>

<style scoped>
.no-orders img {
  margin-bottom: 10px;
}

.order-summary h3 img {
  height: 1.2em; /* Adjust size to match your text */
  width: 1.2em; /* Adjust size to match your text */
  margin-top: -2px;
}

[data-theme="dark"] .order-details {
  background-color: #484444;
}

.order-summary h3,
.info-wrapper h3 {
  display: flex;
  align-items: center; /* Centers items vertically within the h3 tag */
  gap: 5px; /* Optional: adds space between icon and text */
}

.info-wrapper h3 {
  font-weight: 500;
}

.orderLabel {
  border-bottom: 1px solid var(--text-color);
  padding-bottom: 20px;
}

.orderList {
  border-bottom: 0.5px dashed var(--text-color);
  padding-bottom: 20px;
}

.no-orders {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  text-align: center !important;
  justify-content: center !important;
}

.order-component {
  position: relative;
  display: flex !important;
  flex-direction: column !important; /* Stacks children vertically */
  padding: 20px;
  min-height: 120vh;
  background-color: var(--active-color);
  border-radius: none !important;
  box-shadow: none !important;
  color: var(--text-color);
  overflow-y: scroll !important;
}

[data-theme="dark"] .order-component {
  padding: 20px;
  background-color: #484444;
  border-radius: none !important;
  box-shadow: none !important;
  min-height: 120vh;
}

.order-summary h3 {
  cursor: pointer;
  color: var(--text-color);
}
.order-summary {
  align-items: flex-start;
  color: var(--text-color);
}

.order-details {
  margin-top: 10px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 4px;
  border: 1px solid var(--text-color);
  box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.3);
}

.paxAndTable {
  color: var(--paxAndTableColor);
  font-weight: 600;
}

.order-details h3 {
  margin: 0;
}
.info-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--text-color);
}
ul {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

li {
  margin-bottom: 5px;
  color: var(--text-color);
  background-color: var(--list-bg-color);
  border-radius: 20px;
  padding: 0px 10px;
  margin-top: 15px;
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

.total-wrapper {
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
</style>
