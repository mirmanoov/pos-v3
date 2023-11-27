<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Login</h2>
      <!-- Google Login -->
      <GoogleLogin :callback="callback" class="log" />
      <div class="divider">OR</div>

      <!-- Username and Password Login -->
      <div class="input-container">
        <img src="/user.svg" alt="Username Icon" class="icon" />
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Enter username"
        />
      </div>
      <div class="input-container">
        <img src="/lock.svg" alt="Password Icon" class="icon" />
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter password"
        />
      </div>
      <button @click="loginWithCredentials">Login</button>

      <!-- Error Message -->
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
import { GoogleLogin } from "vue3-google-login";

export default {
  components: {
    GoogleLogin,
  },
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    callback(response) {
      if (response.error) {
        this.$emit("login-failure", response.error);
      } else {
        this.$emit("login-success", response);
      }
    },
    loginWithCredentials() {
      if (this.username === "egor" && this.password === "vrnsky") {
        this.$emit("login-success", { username: this.username });
        this.errorMessage = "";
      } else {
        this.errorMessage = "Invalid username or password";
      }
    },
  },
};
</script>

<style scoped>
.modal-content {
  background-color: white; /* White background for the modal */
  border-radius: 57px; /* Rounded corners */
  padding: 20px; /* Padding around the content */
  display: flex; /* Flexbox layout */
  flex-direction: column; /* Arrange items in a column */
  align-items: center; /* Center items horizontally */
  gap: 2vh;
  width: 40vw;
  height: auto; /* Set a fixed width for the modal */
}

.log {
  width: 70%;
}

.modal-content h2 {
  padding-top: 5vh;

  padding-bottom: 5vh;
  margin: 0; /* Remove default margin */
  font-size: 3em; /* Make the 'Login' text bigger */
  text-align: center; /* Center the text */
}
.modal {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  /* Set the background image */
  background-image: url("/modal.png");

  /* Ensure the background covers the entire modal */
  background-size: cover;
}

.error {
  color: red;
  margin: 10px 0;
}

.divider {
  margin: 10px 0;
  text-align: center;
}

input[type="text"],
input[type="password"] {
  margin: 5px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 90%;
}

.input-container {
  display: flex;
  width: 70%;
  align-items: center;
  gap: 10px;
}

.icon {
  width: 24px; /* Adjust icon size */
  height: 24px;
}

button {
  background-color: #91f8b4;
  border: 1px solid transparent;
  border-radius: 26px; /* Rounded corners for the button */
  padding: 10px 20px; /* Padding inside the button */
  margin-top: 2vh;
  margin-bottom: 2vh;
  font-size: 20px;
  width: 70%;
  cursor: pointer; /* Change cursor to pointer on hover */
}

button:hover {
  border: 1px solid black;
  background-color: #58ce7f; /* Set the button background color */
}
</style>
