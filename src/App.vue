<script>
import AppHeader from "./components/layout/AppHeader.vue";
import AppMain from "./components/layout/AppMain.vue";
import AppFooter from "./components/layout/AppFooter.vue";
import { store, api } from "./store/index.js";
import axios from "axios";

export default {
	components: { AppHeader, AppMain, AppFooter },
	methods: {
		fetchServices(endpoint = api.baseUrl + "services") {
			axios.get(endpoint).then((res) => {
				store.services = res.data;
				console.log(store.services);
			});
		},
	},
	created() {
		this.fetchServices();
	},
};
</script>

<template>
	<AppHeader></AppHeader>
	<router-view></router-view>
	<AppFooter></AppFooter>
</template>

<style lang="scss">
@import url("../src/styles/general.scss");
</style>
