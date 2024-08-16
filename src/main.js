import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

import VueMeta from "vue-meta";
Vue.use(VueMeta);

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

var optionsSession = {
  persist: true,
};
import VueSession from "vue-session";
Vue.use(VueSession, optionsSession);

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);

import numeral from "numeral";
import numFormat from "vue-filter-number-format";
Vue.filter("numFormat", numFormat(numeral));

import VueFilterDateFormat from "vue-filter-date-format";
Vue.use(VueFilterDateFormat);

import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
Vue.use(Datetime);

import VueFbCustomerChat from "vue-fb-customer-chat";

Vue.use(VueFbCustomerChat, {
  page_id: 101883828910655,
  theme_color: "#BC1F1A",
  locale: "th_TH",
});

import VueHtmlToPaper from "vue-html-to-paper";
const optionsprint = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "http://110.169.137.35/Server/css/print.css",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
  ],
  timeout: 1000,
  autoClose: true,
  windowTitle: "Address",
};
Vue.use(VueHtmlToPaper, optionsprint);

import FBSignInButton from "vue-facebook-signin-button";
Vue.use(FBSignInButton);

// Vue.prototype.$URL = "http://localhost/github/Server-main/";
// Vue.prototype.$URL = "http://localhost/github/Server-main/";
Vue.prototype.$URL = `http://localhost/github/Server-main/`;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
