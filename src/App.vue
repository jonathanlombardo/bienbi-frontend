<script>
import AppHeader from "./components/layout/AppHeader.vue";
import AppMain from "./components/layout/AppMain.vue";
import AppFooter from "./components/layout/AppFooter.vue";
import { store, api } from "./store/index.js";
import axios from "axios";

export default {
  components: { AppHeader, AppMain, AppFooter },
};
</script>

<template>
  <AppHeader></AppHeader>
  <div class="main-wrapper">
    <router-view :key="$route.query.page ?? 1"></router-view>
  </div>
  <AppFooter></AppFooter>
</template>

<style lang="scss">
@import url("../src/styles/general.scss");
</style>
