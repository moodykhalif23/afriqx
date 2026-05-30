import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";
import ECharts from "vue-echarts";

import "./echarts";
import "primeicons/primeicons.css";
import "./styles.css";

import App from "./App.vue";
import { router } from "./router";
import { AfriqxPreset } from "./theme/preset";

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
app.directive("tooltip", Tooltip);
app.component("VChart", ECharts);

app.mount("#app");
