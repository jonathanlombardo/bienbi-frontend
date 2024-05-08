import { createRouter, createWebHistory } from "vue-router";

import AdvancedSearch from './components/AdvancedSearch.vue'
import AppMain from './components/layout/AppMain.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppMain,

    },
    {
      path: "/ricerca-avanzata/{position}",
      name: "ricerca-avanzata",
      component: AdvancedSearch,

    },
  ],
});

export { router };