<template>
  <div class="table-dashboard">
    <div class="room-nav">
      <button
        v-for="room in rooms"
        :key="room.id"
        :class="{ active: currentRoom === room.id }"
        @click="currentRoom = room.id"
      >
        {{ room.name }}
      </button>
    </div>
    <div class="tables">
      <component
        :is="currentRoomComponent"
        @table-selected="forwardTableSelection"
      />
    </div>
  </div>
</template>

<script>
import diningRoom from "./diningRoom.vue";
import loungeRoom from "./loungeRoom.vue";
import retailRoom from "./retailRoom.vue";
import gardenRoom from "./gardenRoom.vue";
import vipRoom from "./vipRoom.vue";

export default {
  data() {
    return {
      currentRoom: "dining",
      rooms: [
        { id: "dining", name: "Dining", component: diningRoom },
        { id: "lounge", name: "Lounge", component: loungeRoom },
        { id: "retail", name: "Retail", component: retailRoom },
        { id: "garden", name: "Garden", component: gardenRoom },
        { id: "vip", name: "VIP", component: vipRoom },
      ],
    };
  },
  computed: {
    currentRoomComponent() {
      const room = this.rooms.find((room) => room.id === this.currentRoom);
      return room ? room.component : null;
    },
  },
  components: {
    diningRoom,
    loungeRoom,
    retailRoom,
    gardenRoom,
    vipRoom,
  },
  methods: {
    forwardTableSelection(tableId) {
      this.$emit("table-selected", tableId);
    },
  },
};
</script>

<style>
.table-dashboard {
  display: flex;
  flex-direction: column;
  border-right: 0.2px solid #000;
}

.room-nav {
  display: flex;
  justify-content: center;
  padding: 38px;
  border-bottom: 0.2px solid #000;
}

.room-nav button {
  width: 100%; /* Add this line */
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background-color: var(--btn-color);
  color: var(--text-color);
  font-size: 16px;
}

.room-nav button.active {
  background-color: #78ccc7;
  color: var(--btn-active);
}

.tables {
  flex-grow: 1;
}

.room-nav button {
  width: 100%;
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background-color: var(--btn-color);
  color: var(--text-color);
  font-size: 16px;
}

.room-nav button:hover {
  background-color: #78ccc7; /* Change the background color on hover */
  transform: scale(1.1); /* Apply a zoom in effect */
  color: black;
  transition: background-color 0.3s ease, transform 0.3s ease; /* Smooth transition for color and transform */
}

@media only screen and (min-width: 768px) {
  .room-nav button {
    width: 50%;
  }
}

@media only screen and (min-width: 1200px) {
  .room-nav button {
    width: 33.33%;
  }
}
</style>
