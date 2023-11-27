import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import GoogleLogin from "vue3-google-login";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(GoogleLogin, {
  clientId:
    "551009167372-iv64ojqp569r4bs7tdmjlm2rdolg6ho8.apps.googleusercontent.com",
});

app.mount("#app");
