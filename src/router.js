import { createRouter, createWebHistory } from "vue-router";

import AdvancedSearch from "./components/AdvancedSearch.vue";
import AppMain from "./components/layout/AppMain.vue";
import AppartmentDetails from "./components/AppartmentDetails.vue";

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // always scroll 10px above the element #main
    return {
      // 10px above the element
      top: 1,
    }
  },
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppMain,
    },
    {
      path: "/ricerca-avanzata/",
      name: "ricerca-avanzata",
      component: AdvancedSearch,
    },
    {
      path: "/appartment-details/:appartmentSlug/:from",
      name: "appartmentDetails",
      component: AppartmentDetails,
    },
  ],
});

export { router };
