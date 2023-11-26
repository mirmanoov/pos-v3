<template>
  <div class="lounge-room">
    <!-- Row 1: Round Tables L1 to L4 with 2 chairs each -->
    <div class="table-row">
      <div
        class="table-container round"
        v-for="tableId in ['L1', 'L2', 'L3', 'L4']"
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

    <!-- Row 2: Rectangle Tables L5 and L6 with 6 chairs each -->
    <div class="table-row">
      <div
        v-for="tableId in ['L5', 'L6']"
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
    </div>
    <!-- Row 3: Round Tables L7 to L10 with 2 chairs each -->
    <div class="table-row">
      <div
        class="table-container round"
        v-for="tableId in ['L7', 'L8', 'L9', 'L10']"
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
export default {
  data() {
    return {
      roundTables: [
        {
          id: "L1",
          chairs: ["top", "bottom"],
        },
        {
          id: "L2",
          chairs: ["top", "bottom"],
        },
        {
          id: "L3",
          chairs: ["top", "bottom"],
        },
        {
          id: "L4",
          chairs: ["top", "bottom"],
        },
        {
          id: "L7",
          chairs: ["top", "bottom"],
        },
        {
          id: "L8",
          chairs: ["top", "bottom"],
        },
        {
          id: "L9",
          chairs: ["top", "bottom"],
        },
        {
          id: "L10",
          chairs: ["top", "bottom"],
        },
      ],
      rectangleTables: [
        { id: "L5", chairs: ["top", "bottom"] },
        { id: "L6", chairs: ["top", "bottom"] },
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
.lounge-room {
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

.round-table:hover,
.big-rectangle-table:hover {
  background-color: #78ccc7; /* Change the background color */
  border: 2px solid black; /* Change the border style */
}
</style>
