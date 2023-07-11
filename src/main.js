import { createApp } from "vue";
import Toaster from '@meforma/vue-toaster';
import store from "./store";
import router from "./routes"

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

import App from "@/App.vue";

createApp(App)
  .use(router)
  .use(store)
  .use(Toaster, { position: 'top-right', duration: 2000 })
  .mount("#app");
