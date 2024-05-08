<script>
import AppHeader from './components/layout/AppHeader.vue';
import AppMain from './components/layout/AppMain.vue';
import AppFooter from './components/layout/AppFooter.vue';

export default {
  components: { AppHeader, AppMain, AppFooter }
}
</script>

<template>
  <AppHeader></AppHeader>
  <AppMain ></AppMain>
  <AppFooter></AppFooter>
</template>

<style lang="scss">
@import url("../src/styles/general.scss");


</style>