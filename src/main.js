import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { createI18n } from "vue-i18n";
import GoogleLogin from "vue3-google-login";

const app = createApp(App);

const messages = {
  USD: {
    currency: "USD",
  },
  RM: {
    currency: "RM",
  },
  EUR: {
    currency: "EUR",
  },
};

const i18n = createI18n({
  locale: "RM",
  fallbackLocale: "USD",
  messages,
});

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(GoogleLogin, {
  clientId:
    "551009167372-iv64ojqp569r4bs7tdmjlm2rdolg6ho8.apps.googleusercontent.com",
});

app.mount("#app");

export { i18n };
