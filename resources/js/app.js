import "./bootstrap";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "../css/app.css";
import { useAuthStore } from "./stores/authStore";

import "vue3-toastify/dist/index.css"; // Vue 3 toastify css import

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

const authStore = useAuthStore();
authStore.init();

authStore.checkAuth().finally(() => {
    app.use(router);
    app.mount("#app");
});
