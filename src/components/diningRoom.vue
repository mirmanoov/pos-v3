<template>
  <div class="dining-room">
    <!-- Row 1: Rectangle Tables D1 to D4 with 4 chairs each -->
    <div class="table-row">
      <div
        v-for="tableId in ['D1', 'D2', 'D3', 'D4']"
        :key="tableId"
        class="table-container rectangle"
        :class="{
          'reserved-table': reservedTableIds.includes(tableId),
          'active-order-table': activeOrderTableIds.includes(tableId),
        }"
        @click="selectTable(tableId)"
      >
        <div class="table rectangle-table">{{ tableId }}</div>
        <img
          v-for="n in 2"
          :key="`${tableId}-left-${n}`"
          src="/chair-left.svg"
          alt="Left Chair"
          class="chair chair-left"
          :style="{ top: `${(n - 1) * 50 + 20}%` }"
        />
        <img
          v-for="n in 2"
          :key="`${tableId}-right-${n}`"
          src="/chair-right.svg"
          alt="Right Chair"
          class="chair chair-right"
          :style="{ top: `${(n - 1) * 50 + 20}%` }"
        />
      </div>
    </div>

    <!-- Row 2: Big Rectangle Tables D5 and D6 with 6 chairs each -->
    <div class="table-row">
      <div
        v-for="tableId in ['D5', 'D6']"
        :key="tableId"
        :class="{
          'reserved-table': reservedTableIds.includes(tableId),
          'active-order-table': activeOrderTableIds.includes(tableId),
        }"
        class="table-container big-rectangle"
        @click="selectTable(tableId)"
      >
        <div class="table big-rectangle-table">{{ tableId }}</div>
        <img
          v-for="n in 3"
          :key="`${tableId}-top-${n}`"
          src="/chair-top.svg"
          alt="Top Chair"
          class="chair chair-top"
          :style="{ left: `${(n - 1) * 33 + 16.5}%` }"
        />
        <img
          v-for="n in 3"
          :key="`${tableId}-bottom-${n}`"
          src="/chair-bottom.svg"
          alt="Bottom Chair"
          class="chair chair-bottom"
          :style="{ left: `${(n - 1) * 33 + 16.5}%` }"
        />
      </div>
    </div>

    <!-- Row 3: Round Tables D7 to D10 with 2 chairs each -->
    <div class="table-row">
      <div
        class="table-container"
        :class="{
          'reserved-table': reservedTableIds.includes(tableId),
          'active-order-table': activeOrderTableIds.includes(tableId),
        }"
        v-for="tableId in ['D7', 'D8', 'D9', 'D10']"
        :key="tableId"
        @click="selectTable(tableId)"
      >
        <div class="table round-table">{{ tableId }}</div>
        <img src="/chair-top.svg" alt="Top Chair" class="chair chair-top" />
        <img
          src="/chair-bottom.svg"
          alt="Bottom Chair"
          class="chair chair-bottom"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useReservationStore } from "/src/stores/reservationStore.js";
import { useOrderStore } from "/src/stores/orderStore.js";
import { computed } from "vue";
export default {
  setup() {
    // Access the reservation store
    const reservationStore = useReservationStore();
    const orderStore = useOrderStore();

    // Computed property to get a list of reserved table IDs
    const reservedTableIds = computed(() => {
      return reservationStore.reservations.map(
        (reservation) => reservation.tableId
      );
    });
    const activeOrderTableIds = computed(() => {
      return orderStore.orderHistory.map((order) => order.tableID);
    });

    const selectTable = (tableId) => {
      console.log("Selected table:", tableId);
    };
    return {
      activeOrderTableIds,
      reservedTableIds,
      selectTable,
    };
  },
  data() {
    return {
      selectedTableId: null,
      rectangleTables: [
        {
          id: "D1",
          chairs: ["left", "right", "top", "bottom"],
        },
        { id: "D2", chairs: ["left", "right"] },
        { id: "D3", chairs: ["left", "right"] },
        { id: "D4", chairs: ["left", "right"] },
      ],
      bigRectangleTables: [
        { id: "D5", chairs: ["top", "bottom"] },
        { id: "D6", chairs: ["top", "bottom"] },
      ],
      roundTables: [
        { id: "D7", chairs: ["top", "bottom"] },
        { id: "D8", chairs: ["top", "bottom"] },
        { id: "D9", chairs: ["top", "bottom"] },
        { id: "D10", chairs: ["top", "bottom"] },
      ],
    };
  },
  methods: {
    getChairSvg(chair) {
      return `/chair-${chair}.svg`;
    },
    selectTable(tableId) {
      this.$emit("table-selected", tableId);
      console.log("Selected table:", tableId);
    },
  },
};
</script>

<style scoped>
.dining-room {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 120px; /* Space between rows */
  margin-top: 50px;
  background-color: var(--active-color);
}

.reserved-table .rectangle-table,
.reserved-table .big-rectangle-table,
.reserved-table .round-table {
  background-color: yellow; /* or any color you prefer */
}

.active-order-table .rectangle-table,
.active-order-table .big-rectangle-table,
.active-order-table .round-table {
  background-color: #91f8b4; /* or any color you prefer for active orders */
}

.table-row {
  display: flex;
  justify-content: center;
  justify-content: space-between;
  gap: 100px; /* Space between tables in the same row */
}

.table-container {
  position: relative;
  margin: 10px;
}

.rectangle-table,
.big-rectangle-table,
.round-table {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--table-bg-color);
  border: 2px solid var(--table-border-color);
}

.rectangle-table {
  width: 80px;
  height: 150px;
  position: relative;
  z-index: 1;
}

.big-rectangle-table {
  width: 250px;
  height: 100px;
  position: relative;
  z-index: 1;
}

.chair-left,
.chair-right {
  transform: translateX(-50%);
}
.chair-left {
  right: 95%;
}

.chair-right {
  left: 130%;
}
.round-table {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  position: relative;
  z-index: 1;
}

.chair {
  position: absolute;
  width: 30px;
  height: 30px;
}

/* Round table chairs */
.chair-top {
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
}

.rectangle-table:hover,
.big-rectangle-table:hover,
.round-table:hover {
  background-color: #78ccc7; /* Change the background color */
  border: 2px solid black; /* Change the border style */
}

.chair-bottom {
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
