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

@media (min-width: 849px) and (max-width: 1024px) {
  .tables-component {
    font-size: 12px;
  }
}

@media (max-width: 849px) {
  .tables-component {
    flex-direction: column;
    max-width: 100% !important;
  }

  .order {
    margin-top: 10vh;
  }

  .dashboard {
    width: 100% !important;
  }

  .order {
    width: 100% !important;
    max-width: 100% !important;
  }
}

.dashboard {
  width: 70%;
}

.order {
  width: 30%;
}
</style>
