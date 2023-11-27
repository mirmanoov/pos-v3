import { defineStore } from "pinia";

export const useReservationStore = defineStore("reservationStore", {
  state: () => ({
    reservations: [
      {
        name: "Michael Leong",
        room: "Dining Room",
        tableId: "D2",
        date: "2023-12-15",
        time: "19:30",
        pax: 2,
        mobile: "017-871-0380",
        status: "Confirmed",
      },
      {
        name: "Elon Musk",
        room: "Garden Room",
        tableId: "G6",
        date: "2023-12-16",
        time: "14:50",
        pax: 5,
        mobile: "016-454-7820",
        status: "Confirmed",
      },
      {
        name: "Sam Altman",
        room: "VIP Room",
        tableId: "V1",
        date: "2023-12-16",
        time: "12:00",
        pax: 1,
        mobile: "013-496-0290",
        status: "Confirmed",
      },
    ],
    reservationDates: [],
  }),
  getters: {
    // Getter to filter reservations by a specific date
    getReservationsByDate: (state) => {
      return (dateHeader) => {
        const filtered = state.reservations.filter((reservation) => {
          // Convert both dates to the same format for comparison
          const reservationDate = new Date(reservation.date);
          const [headerDate, day] = dateHeader.split(" - ");
          const [month, dayOfMonth, year] = headerDate.split("/");
          const dateHeaderFormatted = new Date(
            `${year}-${month.padStart(2, "0")}-${dayOfMonth.padStart(2, "0")}`
          );

          return (
            reservationDate.toISOString().split("T")[0] ===
            dateHeaderFormatted.toISOString().split("T")[0]
          );
        });
        console.log(`Reservations for ${dateHeader}:`, filtered);
        return filtered;
      };
    },
  },
  actions: {
    addReservation(newReservation) {
      const newRes = {
        ...newReservation,
        id: Date.now(),
        status: "Confirmed",
      };

      console.log("Before adding:", this.reservations);

      // Add the new reservation
      this.reservations.push(newRes);
      console.log("After adding:", this.reservations);
      // Update reservationDates
      this.updateReservationDates();
    },
    updateReservationDates() {
      this.reservationDates = this.reservations
        .map((res) => {
          const date = new Date(res.date);
          return `${date.toLocaleDateString(
            "en-US"
          )} - ${date.toLocaleDateString("en-US", { weekday: "long" })}`;
        })
        .filter((v, i, a) => a.indexOf(v) === i);
    },

    initializeStore() {
      this.updateReservationDates();
    },

    sortDates() {
      this.reservationDates.sort((a, b) => {
        const dateA = new Date(a.split(" - ")[0]);
        const dateB = new Date(b.split(" - ")[0]);
        return dateA - dateB;
      });
    },
  },
});
