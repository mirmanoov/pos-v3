<template>
  <div class="garden-room">
    <!-- Row 1: Square Tables G1 to G4 -->
    <div class="table-row">
      <div
        class="table-container long-rectangle"
        :class="{
          'reserved-table': reservedTableIds.includes(tableId),
          'active-order-table': activeOrderTableIds.includes(tableId),
        }"
        v-for="tableId in ['G1']"
        :key="tableId"
        @click="selectTable(tableId)"
      >
        <div class="table long-rectangle-table">{{ tableId }}</div>
        <img
          v-for="n in 4"
          :key="`${tableId}-top-${n}`"
          src="/chair-top.svg"
          alt="Top Chair"
          class="chair chair-top"
          :style="{ left: `${(n - 1) * 25 + 12.5}%` }"
        />
        <img
          v-for="n in 4"
          :key="`${tableId}-bottom-${n}`"
          src="/chair-bottom.svg"
          alt="Bottom Chair"
          class="chair chair-bottom"
          :style="{ left: `${(n - 1) * 25 + 12.5}%` }"
        />
      </div>
      <div
        class="table-container square"
        :class="{
          'reserved-table': reservedTableIds.includes(tableId),
          'active-order-table': activeOrderTableIds.includes(tableId),
        }"
        v-for="tableId in ['G2', 'G3', 'G4']"
        :key="tableId"
        @click="selectTable(tableId)"
      >
        <div class="table square-table">{{ tableId }}</div>
        <img src="/chair-top.svg" alt="Top Chair" class="chair chair-top" />
        <img
          src="/chair-bottom.svg"
          alt="Bottom Chair"
          class="chair chair-bottom"
        />
      </div>
    </div>

    <!-- Row 2: Square Table G5, flowers.svg, and first part of G9 -->
    <div class="table-row">
      <div
        class="table-container square"
        :class="{
          'reserved-table': reservedTableIds.includes(tableId),
          'active-order-table': activeOrderTableIds.includes(tableId),
        }"
        v-for="tableId in ['G5']"
        :key="tableId"
        @click="selectTable(tableId)"
      >
        <div class="table square-table">{{ tableId }}</div>
        <img src="/chair-top.svg" alt="Top Chair" class="chair chair-top" />
        <img
          src="/chair-bottom.svg"
          alt="Bottom Chair"
          class="chair chair-bottom"
        />
      </div>
      <div class="flower-container">
        <img src="/flowers.svg" alt="Flowers" class="flowers" />
      </div>
      <div
        class="table-container long-rectangle"
        :class="{
          'reserved-table': reservedTableIds.includes(tableId),
          'active-order-table': activeOrderTableIds.includes(tableId),
        }"
        v-for="tableId in ['G6']"
        :key="tableId"
        @click="selectTable(tableId)"
      >
        <div class="table long-rectangle-table">{{ tableId }}</div>
        <img
          v-for="n in 4"
          :key="`${tableId}-top-${n}`"
          src="/chair-top.svg"
          alt="Top Chair"
          class="chair chair-top"
          :style="{ left: `${(n - 1) * 25 + 12.5}%` }"
        />
        <img
          v-for="n in 4"
          :key="`${tableId}-bottom-${n}`"
          src="/chair-bottom.svg"
          alt="Bottom Chair"
          class="chair chair-bottom"
          :style="{ left: `${(n - 1) * 25 + 12.5}%` }"
        />
      </div>
    </div>

    <!-- Row 3: Square Tables G6, G7, G8, and second part of G9 -->
    <div class="table-row">
      <div
        class="table-container square"
        :class="{
          'reserved-table': reservedTableIds.includes(tableId),
          'active-order-table': activeOrderTableIds.includes(tableId),
        }"
        v-for="tableId in ['G7', 'G8', 'G9']"
        :key="tableId"
        @click="selectTable(tableId)"
      >
        <div class="table square-table">{{ tableId }}</div>
        <img src="/chair-top.svg" alt="Top Chair" class="chair chair-top" />

        <img
          src="/chair-bottom.svg"
          alt="Bottom Chair"
          class="chair chair-bottom"
        />
      </div>
      <div
        class="table-container long-rectangle"
        :class="{
          'reserved-table': reservedTableIds.includes(tableId),
          'active-order-table': activeOrderTableIds.includes(tableId),
        }"
        v-for="tableId in ['G10']"
        :key="tableId"
        @click="selectTable(tableId)"
      >
        <div class="table long-rectangle-table">{{ tableId }}</div>
        <img
          v-for="n in 4"
          :key="`${tableId}-top-${n}`"
          src="/chair-top.svg"
          alt="Top Chair"
          class="chair chair-top"
          :style="{ left: `${(n - 1) * 25 + 12.5}%` }"
        />
        <img
          v-for="n in 4"
          :key="`${tableId}-bottom-${n}`"
          src="/chair-bottom.svg"
          alt="Bottom Chair"
          class="chair chair-bottom"
          :style="{ left: `${(n - 1) * 25 + 12.5}%` }"
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
      squareTables: [
        { id: "G2", chairs: ["top", "bottom"] },
        { id: "G3", chairs: ["top", "bottom"] },
        { id: "G4", chairs: ["top", "bottom"] },
        { id: "G5", chairs: ["top", "bottom"] },
        { id: "G7", chairs: ["top", "bottom"] },
        { id: "G8", chairs: ["top", "bottom"] },
        { id: "G9", chairs: ["top", "bottom"] },
      ],
      longRectangleTables: [
        { id: "G1", chairs: ["top", "bottom"] },
        { id: "G6", chairs: ["top", "bottom"] },
        { id: "G10", chairs: ["top", "bottom"] },
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
.garden-room {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 120px; /* Space between rows */
  margin-top: 50px;
  background-color: var(--active-color);
}

.table-row {
  display: flex;
  justify-content: center;
  gap: 50px; /* Space between tables in the same row */
}

.table-container {
  position: relative;
  margin: 10px;
}

.square-table:hover,
.long-rectangle-table:hover {
  background-color: #78ccc7; /* Change the background color */
  border: 2px solid black; /* Change the border style */
}

.reserved-table .rectangle-table,
.reserved-table .long-rectangle-table,
.reserved-table .square-table {
  background-color: yellow; /* or any color you prefer */
}

.active-order-table .rectangle-table,
.active-order-table .long-rectangle-table,
.active-order-table .square-table {
  background-color: #91f8b4; /* or any color you prefer for active orders */
}

.square-table {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--table-bg-color);
  border: 2px solid var(--table-border-color);
  width: 100px;
  height: 100px;
  position: relative;
  z-index: 1;
}

.long-rectangle-table {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--table-bg-color);
  border: 2px solid var(--table-border-color);
  width: 250px;
  height: 100px;
  position: relative;
  z-index: 1;
}

.chair {
  position: absolute;
  width: 30px;
  height: 30px;
}

/* Square table chairs */
.chair-top {
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
}

.chair-bottom {
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
}

/* Long rectangle table chairs */
.chair-top {
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
}

.chair-bottom {
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
