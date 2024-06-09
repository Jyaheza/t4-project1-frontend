import 'vuetify/styles'
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

loadFonts();

createApp(App).use(vuetify).use(router).mount("#app");
