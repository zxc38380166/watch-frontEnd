import { createApp } from "vue";
import { createPinia, Pinia } from "pinia";
import router from "./router";
import "./index.css";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App);
const pinia: Pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(pinia);
app.use(router);
app.mount("#app");
