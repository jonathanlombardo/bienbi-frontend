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
			this.lat = address.lat
			this.long = address.long
			console.log(address)
		},
	},
};
</script>

<template>
	<section class="jumbo p-5">
		<div>
			<h1 class="display-3">
				Scegli la tua prossima <span class="coloring-text">meta</span>
			</h1>

			<form action="">
				<div class="input-group my-5">
					<!-- barra di ricerca -->
					<TomTomSearchbox @returnAddress="savePosition"></TomTomSearchbox>
				</div>

				<router-link v-if="lat && long"
					:to="{
						name: 'ricerca-avanzata',
						params: { lat: lat, long:long },
					}"
				>
					<div class="btn btn-primary">ricerca avanzata</div>
				</router-link>
			</form>
		</div>

		<div class="gap-2">
			<div class="jumbo-img">
				<img src="/img/bnb.png" alt="casa" />
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
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

.jumbo img {
	width: 250px;
}

.coloring-text {
	color: rgba(243, 78, 57, 1);
}

h1 {
	font-weight: bold;
}
</style>
