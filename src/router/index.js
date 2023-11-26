import { createRouter, createWebHistory } from "vue-router";
import navbar from "/src/components/navbar.vue";
import sidebar from "/src/components/sidebar.vue";
import tables from "/src/components/tables.vue";
import menu from "/src/components/menu.vue";
import payment from "/src/components/payment.vue";
import delivery from "/src/components/delivery.vue";
import takeaway from "/src/components/takeaway.vue";
import order from "/src/components/order.vue";
import orderComponent from "/src/components/menuOrder.vue";
import reservations from "/src/components/reservations.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/navbar",
      name: "navbar",
      component: navbar,
    },
    {
      path: "/sidebar",
      name: "sidebar",
      component: sidebar,
    },
    {
      path: "/tables",
      name: "tables",
      component: tables,
    },
    {
      path: "/menu",
      name: "menu",
      component: menu,
    },
    {
      path: "/payment",
      name: "payment",
      component: payment,
      props: true,
    },
    {
      path: "/delivery",
      name: "delivery",
      component: delivery,
      props: true,
    },
    {
      path: "/takeaway",
      name: "takeaway",
      component: takeaway,
      props: true,
    },
    {
      path: "/order",
      name: "order",
      component: order,
      props: true,
    },
    {
      path: "/orderComponent",
      name: "orderComponent",
      component: orderComponent,
    },
    {
      path: "/reservations",
      name: "reservations",
      component: reservations,
    },
  ],
});

export default router;
