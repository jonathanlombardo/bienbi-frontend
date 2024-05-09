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
	<section class="p-5 jumbo d-flex flex-column">
		<div>
			<h1 class="text-center mb-4">Cerca l'appartamento che fa al caso tuo</h1>
		</div>

		<div class="container">
			<div class="row">
				<div class="col p-3">
                    <div class="p-3">
                        <label for="customRange1" class="form-label"
                            >Raggio: {{ radiusKm }} Km
						</label>
                    </div>
                    <input
                        type="range"
                        class="form-range form-range-moz mt-3"
                        id="customRange1"
                        min="0"
                        max="100000000"
                        step="5000000"
                        v-model="radius"
                    />
                </div>

				<div class="col p-3">
                    <div class="servizi-img p-3">
                        <img src="/img/stanze.png" alt="casa" />
                        <label for="rooms" class="form-label ms-2">Stanze</label>
                    </div>
					<input
						type="number"
						class="form-control"
                        min="0" max="50"
						id="rooms"
						v-model="searchedAppartment.rooms"
					/>
				</div>
				<div class="col p-3">
                    <div class="servizi-img p-3">
                        <img src="/img/letti.png" alt="casa" />
                        <label for="beds" class="form-label ms-2">Letti</label>
                    </div>
					<input
						type="number"
						class="form-control"
                        min="0" max="50"
						id="beds"
						v-model="searchedAppartment.beds"
					/>
				</div>
				<div class="col p-3">
                    <div class="servizi-img p-3">
                        <img src="/img/bagni.png" alt="casa" />
                        <label for="bathrooms" class="form-label ms-2">Bagni</label>
                    </div>
					
					<input
						type="number"
						class="form-control"
                        min="0" max="50"
						id="bathrooms"
						v-model="searchedAppartment.bathrooms"
					/>
				</div>
				<div class="col p-3">
                    <div class="servizi-img p-3">
                        <img src="/img/mq.png" alt="casa" />
                        <label for="square_meeters" class="form-label ms-2">Metri quadri</label>
                    </div>
					<input
						type="number"
						class="form-control"
                        min="0" max="1000"
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

.jumbo {
	display: flex;
	background: linear-gradient(
		90deg,
		rgb(226, 199, 137) 10%,
		rgba(255, 179, 14, 1) 48%,
		rgba(243, 78, 57, 1) 97%
	);
	justify-content: space-around;
	margin-top: 20px;
}

.form-range::-webkit-slider-thumb {
	background-color: #f34e39;
}

.form-range::-webkit-slider-thumb:hover {
	box-shadow: 2px 3px 12px #ffb30e;
	color: #f34e39;
}

.form-range::-webkit-slider-thumb:active {
	background-color: rgb(243, 78, 57);
}

// .form-range::-webkit-slider-thumb:focus {
// 	box-shadow: 0 0 0 3px rgba(243, 78, 57, 0.25);
// }

.form-range::-moz-range-thumb {
	background-color: #f34e39;
}

.form-range::-moz-range-thumb:hover {
	box-shadow: 2px 3px 12px #ffb30e;
	color: #f34e39;
}

.form-range::-moz-range-thumb:active {
	background-color: #f34e39;
}

// .form-range::-moz-range-thumb:focus {
// 	background-color: #f34e39;
// }

.servizi-img{
    display: flex;
}

.servizi-img img{
    width: 40px;
}
</style>
