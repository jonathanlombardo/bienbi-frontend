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
    <div>
      <h1 class="display-3 fw-bold">Scegli la tua prossima <span class="coloring-text fw-bold">meta</span></h1>

      <form action="">
        <div class="input-group my-5">
          <!-- barra di ricerca -->
          <TomTomSearchbox @returnAddress="savePosition"></TomTomSearchbox>
        </div>

        <router-link
          v-if="lat && long"
          :to="{
            name: 'ricerca-avanzata',
            query: { lat: lat, long: long, radius: 10000 },
          }"
        >
          <div class="btn my_btn w-25">ricerca avanzata</div>
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
  background: linear-gradient(90deg, rgb(226, 199, 137) 10%, rgba(255, 179, 14, 1) 48%, rgba(243, 78, 57, 1) 97%);
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
  border-radius: 10px;
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
