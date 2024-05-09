<script>
import AppCard from "./AppCard.vue";
import axios from "axios";
import { api, store } from "../store";

export default {
	data() {
		return {
			store,
			clock: false,
			activeFilter: {},
		};
	},

	methods: {
		newFilter() {
			clearTimeout(this.clock);

			this.clock = setTimeout(() => {
				const query = {};
				for (const [key, value] of Object.entries(this.activeFilter)) {
					query[key] = value;
				}
				query.lat = query.lat ?? 45.463618;
				query.long = query.long ?? 9.18951;
				query.radius = query.radius ?? 30000;

				this.$router.push({ name: "ricerca-avanzata", query: query });
				this.$route.query = query;
				this.fetchSearchedAppartment();
			}, 1500);
		},

		fetchSearchedAppartment(endpoint = api.baseUrl + "appartments/filtered") {
			console.log(this.$route.query);

			const params = {};
			for (const [key, value] of Object.entries(this.$route.query)) {
				params[key] = value;
			}

			params.lat = params.lat ?? 45.463618;
			params.long = params.long ?? 9.18951;
			params.radius = params.radius ?? 30000;

			// console.log(params);

			axios
				.get(endpoint, {
					params: params,
				})
				.then((res) => {
					store.searchedAppartments = res.data;
					console.log(res.data);
				});
		},
	},

	created() {
		this.fetchSearchedAppartment();
	},

	components: { AppCard },
};
</script>

<template>
	<section class="p-5">
		<h1>Ricerca Avanzata</h1>

		<div class="container">
			<div class="row">
				<div class="col">
					<label for="customRange1" class="form-label">Example range</label>
					<input v-model="activeFilter.radius" @input="newFilter()" min="0" max="100000" type="range"
						class="form-range form-range-moz" id="customRange1" />
				</div>
			</div>
		</div>
	</section>

	<section class="p-5">
		<div class="container">
			<div class="row g-4">
				<AppCard v-for="appartment in store.searchedAppartments" :appartment="appartment"></AppCard>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
.form-range::-webkit-slider-thumb {
	background-color: #ffb30e;
}

.form-range::-webkit-slider-thumb:hover {
	box-shadow: 2px 3px 12px #f34e39;
	color: #ffb30e;
}

.form-range::-moz-range-thumb {
	background-color: #ffb30e;
}

.form-range::-moz-range-thumb:hover {
	box-shadow: 2px 3px 12px #f34e39;
	color: #ffb30e;
}
</style>
