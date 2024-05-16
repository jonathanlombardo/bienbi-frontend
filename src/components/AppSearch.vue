<script>
import TomTomSearchbox from "./TomTomSearchbox.vue";

export default {
  data() {
    return {
      lat: false,
      long: false,
      address: false,
      searchError: false,
    };
  },
  components: { TomTomSearchbox },
  methods: {
    savePosition(address) {
      this.lat = address.lat;
      this.long = address.long;
      this.address = address.address;
      this.searchError = false;
    },

    handleSearchBtn() {
      if (this.lat && this.long) {
        this.$router.push({ name: "ricerca-avanzata", query: { lat: this.lat, long: this.long, radius: 10000, address: this.address } });
      } else {
        this.searchError = true;
      }
    },
  },
};
</script>

<template>
  <section class="jumbo p-5">
    <div class="container">
      <div class="row flex-wrap">
        <div class="col-md-6 col-12 px-5 text-center text-md-start">
          <h1 class="display-3 align-middle">Scegli la tua prossima <span class="coloring-text">meta</span></h1>
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
              <TomTomSearchbox @returnAddress="savePosition" class="search-box" :class="{ invalid: searchError }"></TomTomSearchbox>
              <p class="search-box-fb mb-0" :class="{ active: searchError }">Seleziona uno tra i risultati suggeriti</p>

              <div @click="handleSearchBtn()" class="rounded btn my_btn w-md-25 mt-3">Cerca</div>
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
  
  justify-content: space-around;
  margin-top: 0;
  background-image: url("../../public/img/1950571-sfondo-astratto-di-linee-arancioni-gratuito-vettoriale.jpg");
  background-size: cover ;
}

.jumbo img {
  width: 250px;
}

.coloring-text {
  color: #ffe001;
  opacity: 1;
}

h1 {
  font-weight: bold;
}

.my_btn {
  font-size: 0.9rem;
  text-align: center;
  background-color: #fecb00;
  padding: 6px 10px;
  border: none;
  width: 100px;
  border-radius: 10px;
  font-weight: bold;
  transition: transform 0.5s;

  &:hover {
    background-color: #ffdf00;
    transform: scale(1.1);
    box-shadow: 2px 3px 12px #ffdf00;
    color: #000;
  }
}

.search-box.invalid {
  border: 2px solid rgb(152, 0, 0);
}

.search-box-fb {
  display: none;
}

.search-box-fb.active {
  color: rgb(152, 0, 0);
  display: block;
}
</style>
