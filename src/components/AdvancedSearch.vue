<script>
import AppCard from "./AppCard.vue";
import axios from "axios";
import { api, store } from "../store";

export default {
	data() {
		return {
			store,
			radius: 0,
			searchedAppartment: {
				rooms: 0,
				beds: 0,
				bathrooms: 0,
				square_meeters: 0,
			},
		};
	},
	computed: {
		radiusKm() {
			return Math.floor(this.radius / 1000000);
		},
	},

	methods: {
		fetchSearchedAppartment(endpoint = api.baseUrl + "appartments/filtered") {
			const lat = this.$route.params.lat;
			const long = this.$route.params.long;
			axios
				.get(endpoint, {
					params: {
						lat: lat,
						long: long,
						radius: this.radius,
					},
				})
				.then((res) => {
					store.searchedAppartments = res.data;
					console.log(res.data);
				});
		},
	},

	created() {
		this.fetchSearchedAppartment();
		console.log(this.$route.params.lat, this.$route.params.long);
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
					<label for="customRange1" class="form-label"
						>Example range raggio: {{ radiusKm }} Km</label
					>
					<input
						type="range"
						class="form-range form-range-moz"
						id="customRange1"
						min="0"
						max="1000000000"
						step="5000000"
						v-model="radius"
					/>
				</div>

				<div class="col">
					<label for="rooms" class="form-label">rooms</label>
					<input
						type="number"
						class="form-control"
						id="rooms"
						v-model="searchedAppartment.rooms"
					/>
				</div>
				<div class="col">
					<label for="beds" class="form-label">beds</label>
					<input
						type="number"
						class="form-control"
						id="beds"
						v-model="searchedAppartment.beds"
					/>
				</div>
				<div class="col">
					<label for="bathrooms" class="form-label">bathrooms</label>
					<input
						type="number"
						class="form-control"
						id="bathrooms"
						v-model="searchedAppartment.bathrooms"
					/>
				</div>
				<div class="col">
					<label for="square_meeters" class="form-label">square_meeters</label>
					<input
						type="number"
						class="form-control"
						id="square_meeters"
						v-model="searchedAppartment.square_meeters"
					/>
				</div>
			</div>
		</div>
	</section>

	<section class="p-5">
		<div class="container">
			<div class="row g-4">
				<div class="col-3" v-for="appartment in store.searchedAppartments">
					<AppCard :appartment="appartment"></AppCard>
				</div>
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
