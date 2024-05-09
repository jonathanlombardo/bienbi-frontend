<script>
import TomTomSearchbox from "./TomTomSearchbox.vue";

export default {
	data() {
		return {
			lat: false,
			long: false,
		};
	},
	components: { TomTomSearchbox },
	methods: {
		savePosition(address) {
			this.lat = address.lat;
			this.long = address.long;
			console.log(address);
		},
	},
};
</script>

<template>
	<section class="jumbo p-5">
		<div class="container">

			<div class="row flex-wrap">

				<div class="col-md-6 col-12 px-5 text-center text-md-start">

					<h1 class="display-3 align-middle">
						Scegli la tua prossima <span class="coloring-text">meta</span>
					</h1>

				</div>

				<div class="col-md-6 col-12 text-center d-flex justify-content-center align-items-center">
					<div class="jumbo-img">
						<img src="/img/bnb.png" alt="casa" />
					</div>

				</div>

				<div class="col-12 px-5">

					<form action="">
						<div class="input-group my-5 d-flex flex-column">
							<!-- barra di ricerca -->
							<TomTomSearchbox @returnAddress="savePosition"></TomTomSearchbox>

							<div class="rounded btn my_btn w-md-25 mt-3" :class="(lat && long)? 'd-none':'d-block'">
								Cerca
							</div>

							<router-link v-if="lat && long" :to="{
								name: 'ricerca-avanzata',
								query: { lat: lat, long: long, radius: 1000 },
							}">
								<div class="rounded btn my_btn w-md-25 mt-3">
									Cerca
								</div>

							</router-link>

						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
.jumbo {
	display: flex;
	background: linear-gradient(90deg,
			rgb(226, 199, 137) 10%,
			rgba(255, 179, 14, 1) 48%,
			rgba(243, 78, 57, 1) 97%);
	justify-content: space-around;
	margin-top: 20px;
}

.jumbo img {
	width: 250px;
}

.coloring-text {
	color: rgba(243, 78, 57, 1);
}

h1 {
	font-weight: bold;
}

.my_btn {
	font-size: 0.9rem;
	text-align: center;
	background-color: #ffb30e;
	padding: 6px 10px;
	border: none;
	width: 100px;
	font-weight: bold;
	transition: transform 0.5s;

	&:hover {
		background-color: #f34e39;
		transform: scale(1.1);
		box-shadow: 2px 3px 12px #f34e39;
		color: #fff;
	}
}
</style>
