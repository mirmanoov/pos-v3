<template>
  <div class="VIPRoom">
    <!-- Row 1: Rectangle Tables D1 to D4 with 4 chairs each -->
    <div class="table-row-1">
      <div
        v-for="tableId in ['V1']"
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
          v-for="n in 4"
          :key="`${tableId}-left-${n}`"
          src="/chair-left.svg"
          alt="Left Chair"
          class="chair chair-left"
          :style="{ top: `${(n - 1) * 25 + 7}%` }"
        />
        <img
          v-for="n in 4"
          :key="`${tableId}-right-${n}`"
          src="/chair-right.svg"
          alt="Right Chair"
          class="chair chair-right"
          :style="{ top: `${(n - 1) * 25 + 7}%` }"
        />
      </div>
      <div class="flower-container">
        <img src="/flowers-vertical.svg" alt="Flowers" class="flowers" />
      </div>
      <div
        v-for="tableId in ['V2']"
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
          v-for="n in 4"
          :key="`${tableId}-left-${n}`"
          src="/chair-left.svg"
          alt="Left Chair"
          class="chair chair-left"
          :style="{ top: `${(n - 1) * 25 + 7}%` }"
        />
        <img
          v-for="n in 4"
          :key="`${tableId}-right-${n}`"
          src="/chair-right.svg"
          alt="Right Chair"
          class="chair chair-right"
          :style="{ top: `${(n - 1) * 25 + 7}%` }"
        />
      </div>
    </div>

    <!-- Row 2: Big Rectangle Tables D5 and D6 with 6 chairs each -->
    <div class="table-row-2">
      <div class="flower-container">
        <img src="/flower.svg" alt="Flowers" class="flowers" />
      </div>
      <div
        v-for="tableId in ['V3']"
        :key="tableId"
        class="table-container big-rectangle"
        :class="{
          'reserved-table': reservedTableIds.includes(tableId),
          'active-order-table': activeOrderTableIds.includes(tableId),
        }"
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
      <div class="flower-container">
        <img src="/flower.svg" alt="Flowers" class="flowers" />
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
      rectangleTables: [
        {
          id: "V1",
          chairs: ["left", "right"],
        },
        { id: "V2", chairs: ["left", "right"] },
      ],
      bigRectangleTables: [{ id: "V3", chairs: ["top", "bottom"] }],
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
@media (max-width: 849px) {
  .rectangle-table {
    width: 40px !important;
    height: 350px !important;
  }

  .big-rectangle-table {
    width: 18vw;
    height: 12vh;
    position: relative;
    z-index: 1;
  }
  .flower-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flowers {
    width: 70px !important;
    height: auto;
  }

  .chair-left {
    right: 40px !important;
  }

  .chair-right {
    left: 67px !important;
  }
}
.VIPRoom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12vh;
  margin-top: 5vh;
  background-color: var(--active-color);
}

.flower-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flowers {
  width: 100%;
  height: auto;
}

.table-row-1 {
  display: flex;
  justify-content: center;
  justify-content: space-between;
  gap: 10vw; /* Space between tables in the same row */
}
.table-row-2 {
  display: flex;
  justify-content: center;
  justify-content: space-between;
  gap: 5vw; /* Space between tables in the same row */
}

.table-container {
  position: relative;
  margin: 10px;
}

.rectangle-table,
.big-rectangle-table {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--table-bg-color);
  border: 2px solid var(--table-border-color);
}

.rectangle-table {
  width: 6vw;
  height: 50vh;
  position: relative;
  z-index: 1;
}

.big-rectangle-table {
  width: 18vw;
  height: 12vh;
  position: relative;
  z-index: 1;
}

.chair-left,
.chair-right {
  transform: translateX(-50%);
}
.chair-left {
  right: 6vw;
}

.chair-right {
  left: 8vw;
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

.chair-bottom {
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
}
.reserved-table .rectangle-table,
.reserved-table .big-rectangle-table {
  background-color: yellow; /* or any color you prefer */
}

.active-order-table .rectangle-table,
.active-order-table .big-rectangle-table {
  background-color: #91f8b4; /* or any color you prefer for active orders */
}

.rectangle-table:hover,
.big-rectangle-table:hover {
  background-color: #78ccc7; /* Change the background color */
  border: 2px solid black; /* Change the border style */
}
</style>
