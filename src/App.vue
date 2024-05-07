<script>
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import AppFooter from './components/AppFooter.vue';

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

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
}
</style>