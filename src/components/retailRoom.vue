<template>
  <div class="retail-room">
    <!-- Row 1: Round Tables R1 and R2 and Rectangle Table R3 -->
    <div class="table-row">
      <div
        class="table-container round"
        v-for="tableId in ['R1']"
        :key="tableId"
        @click="selectTable(tableId)"
      >
        <div class="table round-table">{{ tableId }}</div>
        <img src="/chair-top.svg" alt="Top Chair" class="chair chair-top" />
        <img
          src="/chair-bottom.svg"
          alt="Bottom Chair"
          class="chair chair-bottom-round"
        />
      </div>
      <div
        class="table-container big-rectangle"
        v-for="tableId in ['R2']"
        :key="tableId"
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
      <div
        class="table-container round"
        v-for="tableId in ['R3']"
        :key="tableId"
        @click="selectTable(tableId)"
      >
        <div class="table round-table">{{ tableId }}</div>
        <img src="/chair-top.svg" alt="Top Chair" class="chair chair-top" />
        <img
          src="/chair-bottom.svg"
          alt="Bottom Chair"
          class="chair chair-bottom-round"
        />
      </div>
    </div>

    <!-- Row 2: Round Tables R4, R5 and Rectangle Table R6 -->
    <div class="table-row">
      <div
        class="table-container round"
        v-for="tableId in ['R4', 'R5']"
        :key="tableId"
        @click="selectTable(tableId)"
      >
        <div class="table round-table">{{ tableId }}</div>
        <img src="/chair-top.svg" alt="Top Chair" class="chair chair-top" />
        <img
          src="/chair-bottom.svg"
          alt="Bottom Chair"
          class="chair chair-bottom-round"
        />
      </div>
      <div
        class="table-container big-rectangle"
        v-for="tableId in ['R6']"
        :key="tableId"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      roundTables: [
        {
          id: "R1",
          chairs: ["top", "bottom"],
        },
        {
          id: "R3",
          chairs: ["top", "bottom"],
        },
        {
          id: "R4",
          chairs: ["top", "bottom"],
        },
        {
          id: "R5",
          chairs: ["top", "bottom"],
        },
      ],
      rectangleTables: [
        { id: "R2", chairs: ["top", "bottom"] },
        { id: "R6", chairs: ["top", "bottom"] },
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
.retail-room {
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
  justify-content: space-between;
  gap: 100px; /* Space between tables in the same row */
}

.table-container {
  position: relative;
  margin: 10px;
}

.round-table {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--table-bg-color);
  border: 2px solid var(--table-border-color);
  width: 75px;
  height: 75px;
  border-radius: 50%;
  position: relative;
  z-index: 1;
}

.big-rectangle-table,
.round-table {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--table-bg-color);
  border: 2px solid var(--table-border-color);
}

.big-rectangle-table {
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

/* Round table chairs */
.chair-top {
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
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

.chair-bottom-round {
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.round-table:hover,
.big-rectangle-table:hover {
  background-color: #78ccc7; /* Change the background color */
  border: 2px solid black; /* Change the border style */
}
</style>
