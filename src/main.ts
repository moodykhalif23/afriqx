import { createApp } from "vue";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Tooltip from "primevue/tooltip";
import ECharts from "vue-echarts";

import "./echarts";
import "primeicons/primeicons.css";
import "./styles.css";

import App from "./App.vue";
import { router } from "./router";
import { AfriqxPreset } from "./theme/preset";
import { installAuthInterceptor } from "./stores/auth";

// Clear the session on any 401 so the router guard redirects to /login.
installAuthInterceptor();

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: AfriqxPreset,
    options: {
      darkModeSelector: ".afriqx-dark",
      cssLayer: false,
    },
  },
});
app.use(ToastService);
app.directive("tooltip", Tooltip);
app.component("VChart", ECharts);

app.mount("#app");
