<template>
  <div class="dining-room">
    <!-- Row 1: Rectangle Tables D1 to D4 with 4 chairs each -->
    <div class="table-row-1">
      <div
        v-for="tableId in ['V1']"
        :key="tableId"
        class="table-container rectangle"
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
export default {
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
.dining-room {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 120px; /* Space between rows */
  margin-top: 50px;
  background-color: var(--active-color);
}

.flower-container {
  display: flex;
  align-items: center;
  justify-content: center;
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
  height: 350px;
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

.chair-bottom {
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
}

.rectangle-table:hover,
.big-rectangle-table:hover {
  background-color: #78ccc7; /* Change the background color */
  border: 2px solid black; /* Change the border style */
}
</style>
