<script>
export default {
  props: {
    appartment: Object,
  },
};
</script>

<template>
  <div class="h-100">
    <div class="card h-100 my_card">
      <div v-if="appartment.isSponsored" class="sponsorLabel"><i class="fa-solid fa-crown"></i> sponsorizzato</div>
      <img :src="appartment.imgUrl" class="card-img-top" alt="" />
      <div class="card-body d-flex flex-column">
        <h5 class="card-title pb-3">{{ appartment.title }}</h5>
        <span class="card-text">{{ appartment.address }}</span>
        <div class="mt-2" v-if="appartment.distance"><strong>Distanza: </strong>{{ appartment.distance }} m</div>
        <div class="mb-4">
          <span v-for="service in appartment.services" class="d-inline-block mt-2 me-2"><i :class="service.faIconClass"></i></span>
        </div>
        <div class="mt-auto"><strong>Host: </strong>{{ appartment.user.name }}</div>
        <div class="text-end"><strong>300€</strong> / notte</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
span {
  opacity: 0.6;
}

.card-title {
  border-bottom: 1px solid #808080;
}

.card-img-top {
  aspect-ratio: 16/9;
  object-fit: cover;
  object-position: center;
}

.my_card {
  transition: transform 0.5s;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: scale(1.1);
  }

  .sponsorLabel {
    padding: 5px 15px;
    position: absolute;
    left: 5px;
    top: 5px;
    background-color: #0000003e;
    font-size: 0.8rem;
    color: #ffb30e;
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
