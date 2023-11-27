<template>
  <div class="reservation-container">
    <!-- Add Reservation Button -->
    <button class="add-reservation-btn" @click="toggleForm">
      Add Reservation
    </button>

    <!-- Reservation Form (Shown based on showForm flag) -->
    <div v-if="showForm" class="reservation-form">
      <h2>Enter the guest's information:</h2>
      <div class="column-wrapper">
        <div class="column-1">
          <label for="name">Name:</label>
          <input
            id="name"
            v-model="newReservation.name"
            placeholder="Enter your name"
          />

          <label for="room">Room:</label>
          <select id="room" v-model="newReservation.room">
            <option disabled value="">Select a Room</option>
            <option value="Dining Room">Dining Room</option>
            <option value="Lounge Room">Lounge Room</option>
            <option value="Retail Room">Retail Room</option>
            <option value="Garden Room">Garden Room</option>
            <option value="VIP Room">VIP Room</option>
          </select>

          <label for="pax">Pax:</label>
          <input
            id="pax"
            v-model="newReservation.pax"
            type="number"
            placeholder="Enter number of people"
          />

          <label for="tableId">Table ID:</label>
          <input
            id="tableId"
            v-model="newReservation.tableId"
            placeholder="Enter table ID"
          />
        </div>
        <div class="column-2">
          <label for="date">Date:</label>
          <input id="date" v-model="newReservation.date" type="date" />

          <label for="time">Time:</label>
          <input id="time" v-model="newReservation.time" type="time" />

          <label for="mobile">Mobile Number:</label>
          <input
            id="mobile"
            v-model="newReservation.mobile"
            placeholder="Enter mobile number"
          />
        </div>
      </div>
      <button class="submit-btn" @click="addReservation">
        Submit Reservation
      </button>
    </div>

    <!-- Date Headers and Reservation Entries -->
    <div
      v-for="dateHeader in reservationDates"
      :key="dateHeader"
      class="date-section"
    >
      <div class="date-header">{{ dateHeader }}</div>

      <div class="reservation-grid">
        <div
          v-for="reservation in getReservationsByDate(dateHeader)"
          :key="reservation.id"
          class="reservation-card"
        >
          <div class="date-time">
            <p>Date: {{ reservation.date }}</p>
            <p>Time: {{ reservation.time }}</p>
          </div>
          <div class="name">{{ reservation.name }}</div>
          <h3>Reservation Details:</h3>
          <div class="room">Room: {{ reservation.room }}</div>
          <div class="table-id">Table ID: {{ reservation.tableId }}</div>
          <div class="details">
            <p>Pax: {{ reservation.pax }}</p>
            <p>Mobile: {{ reservation.mobile }}</p>
          </div>
          <div class="confirmation-status">{{ reservation.status }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import { useReservationStore } from "/src/stores/reservationStore.js";

export default defineComponent({
  setup() {
    const reservationStore = useReservationStore();

    const toggleForm = () => {
      showForm.value = !showForm.value;
    };

    onMounted(() => {
      reservationStore.initializeStore();
      console.log("Initial reservations:", reservationStore.reservations);
    });

    const addReservation = () => {
      console.log("Adding reservation:", newReservation.value);
      reservationStore.addReservation({ ...newReservation.value });
      resetForm();
      toggleForm();
    };

    const resetForm = () => {
      newReservation.value = {
        name: "",
        room: "",
        tableId: "",
        date: "",
        time: "",
        pax: "",
        mobile: "",
        status: "",
      };
    };

    const showForm = ref(false);
    const newReservation = ref({
      name: "",
      room: "",
      tableId: "",
      date: "",
      time: "",
      pax: "",
      mobile: "",
      status: "",
    });

    return {
      showForm,
      newReservation,
      toggleForm,
      addReservation,
      resetForm,

      reservations: computed(() => reservationStore.reservations),
      reservationDates: computed(() => reservationStore.reservationDates),
      getReservationsByDate: reservationStore.getReservationsByDate,
    };
  },
});
</script>

<style scoped>
.reservation-container {
  padding: 20px;
  display: block;
  color: var(--text-color);
}

.date-header {
  margin-top: 3vh;
  background-color: #78ccc7;
  border-radius: 20px;
  padding: 15px;
  font-weight: 600;
  text-align: center;
  color: black;
}

.column-wrapper {
  display: flex;
  min-width: 50vw;
  flex-direction: row;
  gap: 50px;
  margin-bottom: 2vh;
}

.column-1 {
  min-width: 30vw;
  max-width: 30vw;
}
.column-2 {
  min-width: 30vw;
  max-width: 30vw;
}

.date-time {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

.reservation-grid {
  display: grid;
  margin-top: 3vh;
  margin-bottom: 3vh;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.reservation-card {
  background-color: var(--delivery-card-bg-color);
  border-radius: 20px; /* Example background color */
  padding: 20px;
  border-radius: 10px;
  border: 1px solid var(--text-color);
  /* Other styles */
}

.add-reservation-btn,
.submit-btn {
  background-color: #8bc8b6; /* Green background */
  color: black;
  padding: 12px 26px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  border: 1px solid black;
}

.add-reservation-btn:hover,
.submit-btn:hover {
  background-color: white;
  color: black;
  border: 1px solid #8bc8b6; /* Green border */
}

.reservation-form label {
  display: block;
  margin-top: 10px;
  margin-bottom: 5px;
  font-weight: bold;
}

.reservation-form input,
.reservation-form select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: var(--text-color);
  box-sizing: border-box;
  background: var(--active-color);
}

.name,
.room,
.table-id,
.details,
.confirmation-status {
  margin-bottom: 10px;
  color: var(--text-color);
}

.name {
  background: transparent;
  border-radius: 20px;
  border: 1px solid var(--text-color);
  width: fit-content;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-weight: 600;
}

.confirmation-status {
  padding: 5px;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
  background: #8bc8b6;
  border: 1px solid black;
  color: black;
}
</style>
