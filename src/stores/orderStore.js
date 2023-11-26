import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orderDetails: [],
    orderType: "Dining",
    deliveryCompany: "Foodpanda",
    customerName: "",
    address: "",
    phoneNumber: "",
    orderTimestamp: null,
    total: 0,
    orderID: "",
    tableID: "",
    pax: 1,
    orderHistory: [],
    selectedOrder: null,
  }),
  actions: {
    addToOrder(item) {
      const existingItem = this.orderDetails.find(
        (orderItem) => orderItem.name === item.name
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.orderDetails.push({ ...item, quantity: 1 });
      }
      this.calculateTotal();
    },
    removeFromOrder(item) {
      const existingItem = this.orderDetails.find(
        (orderItem) => orderItem.name === item.name
      );
      if (existingItem && existingItem.quantity > 0) {
        existingItem.quantity--;
        if (existingItem.quantity === 0) {
          this.orderDetails = this.orderDetails.filter(
            (orderItem) => orderItem.name !== item.name
          );
        }
        this.calculateTotal();
      }
    },

    deleteOrderItem(orderID, itemIndex) {
      const orderIndex = this.orderHistory.findIndex(
        (o) => o.orderID === orderID
      );
      if (orderIndex !== -1) {
        const order = this.orderHistory[orderIndex];
        order.orderDetails.splice(itemIndex, 1);

        // Check if the order is now empty
        if (order.orderDetails.length === 0) {
          // Remove the order from orderHistory
          this.orderHistory.splice(orderIndex, 1);

          // If the deleted order was the selectedOrder, update selectedOrder
          if (this.selectedOrder && this.selectedOrder.orderID === orderID) {
            if (this.orderHistory.length > 0) {
              this.selectedOrder =
                this.orderHistory[this.orderHistory.length - 1];
            } else {
              this.selectedOrder = null;
            }
          }
        } else {
          // Recalculate the order totals
          const { subtotal, serviceCharge, gst, total } =
            this.calculateOrderDetailsFor(order.orderDetails);
          Object.assign(order, { subtotal, serviceCharge, gst, total });
        }
      }
    },

    calculateOrderDetailsFor(orderDetails) {
      const subtotal = orderDetails.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const serviceCharge = subtotal * 0.1; // 10%
      const gst = subtotal * 0.06; // 6%
      const total = subtotal + serviceCharge + gst;

      return { subtotal, serviceCharge, gst, total };
    },

    calculateTotal() {
      let subtotal = this.orderDetails.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const serviceCharge = subtotal * 0.1; // 10%
      const gst = subtotal * 0.06; // 6%
      this.total = subtotal + serviceCharge + gst;
    },

    setSelectedOrder(order) {
      this.selectedOrder = order;
    },

    calculateOrderDetails() {
      const subtotal = this.orderDetails.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const serviceCharge = subtotal * 0.1; // 10%
      const gst = subtotal * 0.06; // 6%
      const total = subtotal + serviceCharge + gst;

      return { subtotal, serviceCharge, gst, total };
    },

    addToOrderHistory() {
      // Calculate order details
      const { subtotal, serviceCharge, gst, total } =
        this.calculateOrderDetails();

      const currentTimestamp = new Date().toISOString();
      // Format values to have only 2 digits after the decimal
      const formattedSubtotal = parseFloat(subtotal.toFixed(2));
      const formattedServiceCharge = parseFloat(serviceCharge.toFixed(2));
      const formattedGst = parseFloat(gst.toFixed(2));
      const formattedTotal = parseFloat(total.toFixed(2));
      const estimatedDeliveryTime =
        Math.floor(Math.random() * (45 - 15 + 1)) + 15;
      const estimatedCookingTime = this.orderDetails.length * 12;
      const estimatedTotalWaitingTime =
        estimatedDeliveryTime + estimatedCookingTime;

      const customerDetails = {
        customerName: this.customerName,
        address: this.address,
        phoneNumber: this.phoneNumber,
      };

      this.orderHistory.push({
        orderDetails: this.orderDetails.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          lineTotal: parseFloat((item.quantity * item.price).toFixed(2)),
        })),
        subtotal: formattedSubtotal,
        serviceCharge: formattedServiceCharge,
        gst: formattedGst,
        total: formattedTotal,
        orderID: this.orderID,
        tableID: this.tableID,
        pax: this.pax,
        ...customerDetails,
        orderType: this.orderType,
        deliveryCompany: this.deliveryCompany,
        estimatedDeliveryTime,
        estimatedCookingTime,
        estimatedTotalWaitingTime,
        timestamp: currentTimestamp,
      });
      this.customerName = "";
      this.address = "";
      this.phoneNumber = "";
    },

    generateOrderID() {
      this.orderID = Math.random().toString().slice(2, 10);
    },
    clearOrder() {
      this.orderDetails = [];
      this.total = 0;
      this.orderID = "";
      this.tableID = "";
      this.pax = 1;
    },

    async fetchOrderDetails() {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating async operation
      this.orderDetails = [
        /* fetched data */
      ];
    },

    async sendOrder(router) {
      // Ensure fetchOrderDetails completes before proceeding
      this.addToOrderHistory(); // Add to history after fetching details
      await this.fetchOrderDetails();

      router.push({ name: "payment" });
    },
  },
});
