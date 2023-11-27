<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Login with Google</h2>
      <GoogleLogin :callback="callback" />
    </div>
    <button @click="closeModal" class="close">Close</button>
  </div>
</template>

<script>
import { GoogleLogin } from "vue3-google-login";

export default {
  components: {
    GoogleLogin,
  },
  methods: {
    callback(response) {
      if (response.error) {
        this.$emit("login-failure", response.error);
      } else {
        this.$emit("login-success", response);
      }
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.close {
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
  width: 130px;
}
</style>
