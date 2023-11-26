<template>
  <!-- Menu Section -->
  <div class="menu-section">
    <!-- Menu Categories -->
    <div class="menu-categories">
      <button
        v-for="(items, category) in menu"
        :key="category"
        :class="{ active: selectedCategory === category }"
        @click="selectCategory(category)"
      >
        <div class="category-wrapper">
          <img :src="getIconPath(category)" :alt="`${category} icon`" />
          <div class="category-items">
            <p class="category">{{ category }}</p>
            <span>{{ items.length }} items</span>
          </div>
        </div>
      </button>
    </div>
    <hr />
    <!-- Menu Items -->
    <div v-if="selectedCategory" class="menu-items">
      <div
        v-for="item in menu[selectedCategory]"
        :key="item.name"
        class="menu-item"
      >
        <div class="namePrice">
          <span>{{ item.name }}</span>
          <div class="price">
            <span>RM{{ item.price }}</span>
            <div class="itemAmount">
              <button @click="orderStore.addToOrder(item)" class="plus">
                +
              </button>
              <span>{{ getOrderQuantity(item) }}</span>
              <button @click="orderStore.removeFromOrder(item)" class="minus">
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch } from "vue";
import { useOrderStore } from "/src/stores/orderStore.js";
import { useSearchStore } from "/src/stores/searchStore.js";
import { useThemeStore } from "/src/stores/themeStore.js";

export default {
  setup() {
    const searchStore = useSearchStore();
    const selectedCategory = ref(null);
    const orderStore = useOrderStore();
    const themeStore = useThemeStore();

    // React to changes in search term
    watch(
      () => searchStore.searchTerm,
      (newTerm) => {
        if (newTerm) {
          let found = false;

          // Iterate through each category and their items
          for (const [category, items] of Object.entries(menu)) {
            // Check if the category matches the search term
            if (category.toLowerCase().includes(newTerm.toLowerCase())) {
              selectedCategory.value = category;
              found = true;
              break;
            }

            // Check if any item in the category matches the search term
            if (
              items.some((item) =>
                item.name.toLowerCase().includes(newTerm.toLowerCase())
              )
            ) {
              selectedCategory.value = category;
              found = true;
              break;
            }
          }

          // If no match is found, clear the selection
          if (!found) {
            selectedCategory.value = null;
          }
        } else {
          selectedCategory.value = null;
        }
      }
    );

    const iconPaths = {
      Breakfast: "/breakfast",
      Soups: "/soups",
      Pasta: "/pasta",
      Salads: "/salads",
      Mains: "/mains",
      Desserts: "/desserts",
      Drinks: "/drinks",
      Alcohol: "/alcohol",
    };

    const getIconPath = (category) => {
      const baseIconPath = iconPaths[category];
      let themeSuffix;

      // Check if the current theme is 'light' and if the category is the selected one
      if (
        themeStore.currentTheme === "light" ||
        (selectedCategory.value === category &&
          themeStore.currentTheme === "dark")
      ) {
        themeSuffix = "-black";
      } else {
        themeSuffix = "-white";
      }

      return `${baseIconPath}${themeSuffix}.svg`;
    };

    // Menu categories and items
    const menu = reactive({
      Breakfast: [
        { name: "Nasi Lemak", price: 15 },
        { name: "Roti Canai", price: 8 },
        { name: "French Toast", price: 12 },
        { name: "Banana Pancakes", price: 14 },
        { name: "Muesli", price: 13 },
        { name: "Smoked Salmon", price: 20 },
        { name: "Oatmeal Porridge", price: 10 },
        { name: "Egg Benedict", price: 14 },
      ],
      Soups: [
        { name: "Tomato Soup", price: 12 },
        { name: "Mushroom Soup", price: 14 },
        { name: "Minestrone Soup", price: 15 },
        { name: "Bisque", price: 18 },
        { name: "Miso", price: 13 },
        { name: "Lentil", price: 12 },
        { name: "Gaspacho", price: 14 },
        { name: "Borscht", price: 16 },
      ],
      Pasta: [
        { name: "Carbonara", price: 25 },
        { name: "Penne Arrabbiata", price: 23 },
        { name: "Fettuccine Alfredo", price: 28 },
        { name: "Pesto Linguine", price: 26 },
        { name: "Ravioli", price: 30 },
        { name: "Bolognese", price: 27 },
        { name: "Lasagna", price: 32 },
        { name: "Orecchiette", price: 24 },
      ],
      Salads: [
        { name: "Caesar", price: 18 },
        { name: "Greek Salad", price: 20 },
        { name: "Spinach Salad", price: 17 },
        { name: "Tabbouleh", price: 20 },
        { name: "Waldorf", price: 19 },
      ],
      Mains: [
        { name: "Fish and Chips", price: 29 },
        { name: "Salmon Trout", price: 53 },
        { name: "Chicken Chop", price: 23 },
        { name: "Rib Eye Steak", price: 72 },
        { name: "Bangers and Mash", price: 25 },
        { name: "Pork Ribs", price: 62 },
        { name: "Buffalo Wings", price: 23 },
        { name: "Lobster", price: 59 },
      ],
      Desserts: [
        { name: "Tiramisu", price: 20 },
        { name: "Panna Cotta", price: 18 },
        { name: "Brownie", price: 15 },
        { name: "Cheesecake", price: 22 },
        { name: "Eclair", price: 16 },
        { name: "Mousse", price: 19 },
        { name: "Gelato", price: 17 },
        { name: "Macaron", price: 21 },
      ],
      Drinks: [
        { name: "Latte", price: 12 },
        { name: "Green Tea", price: 10 },
        { name: "Mojito", price: 20 },
        { name: "Smoothie", price: 15 },
        { name: "Espresso", price: 8 },
        { name: "Lemonade", price: 11 },
        { name: "Margarita", price: 22 },
        { name: "Cola", price: 6 },
      ],
      Alcohol: [
        { name: "Pina Colada", price: 30 },
        { name: "Red Wine", price: 32 },
        { name: "Tequila Shot", price: 27 },
        { name: "Whiskey Shot", price: 25 },
      ],
    });

    function selectCategory(category) {
      selectedCategory.value = category;
    }

    // Function to get the quantity of a specific item in the order
    function getOrderQuantity(item) {
      const existingItem = orderStore.orderDetails.find(
        (orderItem) => orderItem.name === item.name
      );
      return existingItem ? existingItem.quantity : 0;
    }

    // Generate order ID when component is mounted
    orderStore.generateOrderID();

    return {
      selectedCategory,
      menu,
      selectCategory,
      getOrderQuantity,
      // Directly expose order store's properties and methods
      orderStore,
      getIconPath,
    };
  },
};
</script>

<style scoped>
.menu-section {
  padding: 1rem;
  overflow-y: auto;
}

.menu-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 3vh;
}

.menu-categories button {
  padding-top: 10px;
  padding-left: 15px;
  padding-bottom: 10px;
  min-width: 13vw;
  align-items: flex-start;
  border: none;
  border-radius: 20px;
  background-color: var(--menu-category-bg-color);
  color: var(--text-color);
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 1px solid var(--menu-category-bg-color);
}

.menu-categories button:hover {
  background: #78ccc7;
  border: 1px solid black;
}

.menu-categories button img {
  width: 30px;
  height: 30px;
  vertical-align: middle; /* Optional, to align icons with text */
  margin-right: 5px; /* Optional, to add some space between the icon and text */
}

.category-items {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.price {
  display: flex;
  justify-content: space-between;
}
.namePrice {
  display: flex;
  flex-direction: column;
  gap: 4vh;
}

.menu-item button.plus,
.menu-item button.minus {
  border: 1px solid #ccc; /* You can adjust the border color as needed */
  border-radius: 50%; /* This will make the button circular */
  background-color: transparent; /* Set background to transparent */
  cursor: pointer;
  width: 1.7rem; /* Fixed width */
  height: 1.7rem; /* Fixed height */
  font-size: 1rem; /* Adjust font size as needed */
  margin-left: 5px;
  margin-right: 5px;
  color: var(--text-color);
}

.category {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}

.category-wrapper {
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: flex-start;
}

.menu-categories button.active {
  background-color: #78ccc7;
  color: black;
}

.menu-items {
  margin-top: 3vh;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.menu-item {
  min-width: 10.9vw;
  padding-left: 20px;
  padding-top: 10px;
  background-color: var(--menu-category-bg-color);
  padding-bottom: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--text-color);
  border-radius: 20px;
  transition: transform 0.3s ease;
}

.itemAmount {
  margin-left: auto;
}

.menu-item:hover {
  transform: translateY(-5px);
}

.menu-item span {
  margin: 0.5rem 0;
}

.menu-item button {
  padding: 0.25rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  margin: 0.25rem;
}

.menu-item button:active {
  background-color: #e9e9e9;
}
</style>
