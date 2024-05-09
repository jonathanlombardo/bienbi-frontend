<script>
export default {
	props: {
		appartment: Object,
	},
};
</script>

<template>
	<router-link
		:to="{
			name: 'appartmentDetails',
			params: { appartmentSlug: appartment.slug },
		}"
		class="text-decoration-none"
	>
		<div class="card h-100 my_card">
			<img :src="appartment.imgUrl" class="card-img-top" alt="" />
			<div class="card-body">
				<h5 class="card-title pb-3">{{ appartment.title }}</h5>
				<span class="card-text">{{ appartment.address }}</span>
        <div class="mt-2" v-if="appartment.distance"><strong>Distanza: </strong>{{ appartment.distance }} m</div>
				<div class="mt-4">
					<strong>Host: </strong>{{ appartment.user.name }}
				</div>
				<div class="text-end"><strong>300€</strong> / notte</div>
			</div>
		</div>
	</router-link>
</template>

<style lang="scss">
span {
	opacity: 0.6;
}

.card-title {
	border-bottom: 1px solid gray;
}

.my_card {
	transition: transform 0.5s;
	cursor: pointer;
	position: relative;

	&:hover {
		transform: scale(1.1);
	}
}

.card-title {
	height: 50px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
