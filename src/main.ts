import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./layouts/index";
import { createProvider } from "@/apollo/config";
import VueApollo from "vue-apollo";

Vue.use(VueApollo);

const apolloProvider = createProvider();

Vue.config.productionTip = false;

// get user authentication token saved after login
const token = localStorage.getItem("AUTH_TOKEN");

router.beforeEach((to, from, next) => {
  const EXCEPT_ROUTES = ["/login"];

  if (
    !EXCEPT_ROUTES.includes(to.path) &&
    (!token || token === "" || token === null)
  ) {
    return next("/login");
  }

  next();
});

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
