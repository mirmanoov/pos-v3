<template>
  <div class="tables-component">
    <tableDashboard @table-selected="setSelectedTable" class="dashboard" />
    <order :selectedTable="selectedTable" class="order" />
  </div>
</template>

<script>
import tableDashboard from "./tableDashboard.vue";
import order from "./order.vue";

export default {
  components: {
    tableDashboard,
    order,
  },
  data() {
    return {
      selectedTable: "",
    };
  },
  methods: {
    setSelectedTable(tableId) {
      console.log("Received selected table:", tableId);
      this.selectedTable = tableId;
    },
  },
};
</script>

<style>
.tables-component {
  display: flex;
  background-color: var(--active-color);
  width: 100%;
}

.dashboard {
  width: 70%;
}

.order {
  width: 30%;
}
</style>
