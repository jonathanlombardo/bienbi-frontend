<script>
import AppCard from "./AppCard.vue";
import AppLoader from "./AppLoader.vue";
import axios from "axios";
import { api, store } from "../store";
import TomTomSearchbox from "./TomTomSearchbox.vue";
import CollectionPaginator from "./CollectionPaginator.vue";
import { watch } from "vue";

export default {
  data() {
    return {
      store,
      appartmentCollection: false,
      clock: false,
      services: [],
      activeFilter: {
        radius: this.$route.query.radius,
        rooms: this.$route.query.rooms,
        beds: this.$route.query.beds,
        bathrooms: this.$route.query.bathrooms,
        square_meters: this.$route.query.square_meters,
        lat: this.$route.query.lat,
        long: this.$route.query.long,
      },
      defaultAddress: "Milano",
      defaultRadius: 30000,
      defaultLat: 45.463618,
      defaultLong: 9.18951,
      address: this.$route.query.address,
    };
  },

  computed: {
    radiusKm() {
      this.activeFilter.radius = this.activeFilter.radius ?? this.defaultRadius;
      return Math.floor(this.activeFilter.radius / 1000);
    },

    serviceN() {
      return this.services.length;
    },
  },
  watch: {
    $route() {
      let changes = [];

      this.services.forEach((service) => {
        const serviceId = "service" + service.id;
        // console.log(this.$route.query[serviceId]);
        if (this.$route.query[serviceId] === "true") {
          this.activeFilter[serviceId] = true;
          // changes.push(key);
        } else {
          this.activeFilter[serviceId] = false;
          // changes.push(key);
        }
      });

      for (const [key, value] of Object.entries(this.$route.query)) {
        if (value) {
          this.activeFilter[key] = value;
          changes.push(key);
        }
      }

      console.log(changes);

      for (const [key, value] of Object.entries(this.activeFilter)) {
        if (!changes.includes(key)) {
          this.activeFilter[key] = null;
        }
      }

      this.fetchSearchedAppartment();
    },
  },

  methods: {
    changePage(url, page) {
      const query = {};
      for (const [key, value] of Object.entries(this.activeFilter)) {
        if (value) {
          query[key] = value;
        }
      }
      query.lat = query.lat ?? this.defaultLat;
      query.long = query.long ?? this.defaultLong;
      query.radius = query.radius ?? this.defaultRadius;
      if (page == "&laquo; Previous") {
        query.page = parseInt(this.$route.query.page) - 1;
      } else if (page == "Next &raquo;") {
        if (this.$route.query.page) {
          query.page = parseInt(this.$route.query.page) + 1;
        } else {
          query.page = 2;
        }
      } else {
        query.page = page;
      }

      this.$router.push({ name: "ricerca-avanzata", query: query });
      this.$route.query = query;
      // this.fetchSearchedAppartment();
    },

    newFilter(delay = 800) {
      clearTimeout(this.clock);

      this.clock = setTimeout(() => {
        const query = {};
        for (const [key, value] of Object.entries(this.activeFilter)) {
          if (value) query[key] = value;
        }
        query.lat = query.lat ?? this.defaultLat;
        query.long = query.long ?? this.defaultLong;
        query.radius = query.radius ?? this.defaultRadius;

        this.$router.push({ name: "ricerca-avanzata", query: query });
        this.$route.query = query;

        // this.fetchSearchedAppartment();
      }, delay);
    },

    fetchServices(endpoint = api.baseUrl + "services") {
      axios.get(endpoint).then((res) => {
        res.data.sort((a, b) => {
          if (a.label > b.label) {
            return 1;
          } else {
            return -1;
          }
        });

        this.services = res.data;

        this.services.forEach((service) => {
          const serviceId = "service" + service.id;
          console.log(this.$route.query[serviceId]);
          if (this.$route.query[serviceId] === "true") this.activeFilter[serviceId] = true;
        });
      });
    },

    fetchSearchedAppartment(endpoint = api.baseUrl + "appartments/filtered") {
      console.log(this.$route.query);

      const params = {};
      for (const [key, value] of Object.entries(this.$route.query)) {
        params[key] = value;
      }

      params.lat = params.lat ?? this.defaultLat;
      params.long = params.long ?? this.defaultLong;
      params.radius = params.radius ?? this.defaultRadius;

      axios
        .get(endpoint, {
          params: params,
        })
        .then((res) => {
          store.searchedAppartments = res.data.data;
          this.appartmentCollection = res.data;
          console.group("API APPARTMENTS FILTERED RESULT");
          console.log(res.data);
          console.groupEnd();
        });
    },

    updatePosition(address) {
      this.activeFilter.lat = address.lat;
      this.activeFilter.long = address.long;
      this.address = address.address;
      this.newFilter();
      console.log(address);
    },
    handleServiceChange(id) {
      const serviceLabel = "service" + id;
      const serviceValue = document.getElementById(serviceLabel).checked;
      console.log(serviceValue, serviceLabel);
      this.activeFilter[serviceLabel] = serviceValue;
      console.log(this.activeFilter.service1);

      this.newFilter();
    },

    handleRoomsInput(idString) {
      // verifica se valido
      let isValid = false;
      const input = document.getElementById(idString);
      const roomValue = input.value;
      if (roomValue == parseInt(roomValue) && roomValue > 0) {
        isValid = true;
      }

      // inserisci eventuali classi d'errore
      if (!isValid) {
        input.classList.add("is-invalid");
      }

      // lancia nuovo filtro
      if (isValid) {
        input.classList.remove("is-invalid");
        this.newFilter();
      }
    },

    handleMetersInput() {
      // verifica se valido
      let isValid = false;
      const input = document.getElementById("square_meters");
      const metersValue = input.value;
      if (metersValue == parseInt(metersValue) && metersValue >= 30) {
        isValid = true;
      }

      // inserisci eventuali classi d'errore
      if (!isValid) {
        input.classList.add("is-invalid");
      }

      // lancia nuovo filtro
      if (isValid) {
        input.classList.remove("is-invalid");
        this.newFilter();
      }
    },
  },

  created() {
    this.fetchSearchedAppartment();
    this.fetchServices();

    // console.log(this.activeFilter.service1);
  },

  components: { AppCard, TomTomSearchbox, CollectionPaginator, AppLoader },
};
</script>

<template>
  <section class="p-5 jumbo d-flex flex-column">
    <div>
      <h1 class="text-center mb-4 fw-bold">Cerca l'appartamento che fa al caso tuo</h1>
    </div>

    <div class="container">
      <div class="w-75 m-auto">
        <TomTomSearchbox :placeholder="address" class="my-3" @returnAddress="updatePosition" :inputValue="address"> </TomTomSearchbox>
      </div>
      <div class="row">
        <div class="col p-3">
          <div class="p-3">
            <label for="customRange1" class="form-label fw-bold text-nowrap">Raggio di ricerca: {{ radiusKm }} Km </label>
          </div>
          <input type="range" class="form-range form-range-moz mt-3" id="customRange1" min="5000" max="100000" step="5000" @input="newFilter()" v-model="activeFilter.radius" />
        </div>

        <div class="col p-3">
          <div class="servizi-img p-3">
            <img src="/img/stanze.png" alt="casa" />
            <label for="rooms" class="form-label fw-bold m-2">Stanze</label>
          </div>
          <input type="number" class="form-control" min="1" max="50" id="rooms" @input="handleRoomsInput('rooms')" v-model="activeFilter.rooms" />
          <div class="invalid-feedback text-black fw-bold">Inserisci un numero intero > 0</div>
        </div>

        <div class="col p-3">
          <div class="servizi-img p-3">
            <img src="/img/letti.png" alt="casa" />
            <label for="beds" class="form-label fw-bold m-2">Letti</label>
          </div>
          <input type="number" class="form-control" min="1" max="50" id="beds" @input="handleRoomsInput('beds')" v-model="activeFilter.beds" />
          <div class="invalid-feedback text-black fw-bold">Inserisci un numero intero > 0</div>
        </div>

        <div class="col p-3">
          <div class="servizi-img p-3">
            <img src="/img/bagni.png" alt="casa" />
            <label for="bathrooms" class="form-label fw-bold m-2">Bagni</label>
          </div>
          <input type="number" class="form-control" min="1" max="50" id="bathrooms" @input="handleRoomsInput('bathrooms')" v-model="activeFilter.bathrooms" />
          <div class="invalid-feedback text-black fw-bold">Inserisci un numero intero > 0</div>
        </div>

        <div class="col p-3">
          <div class="servizi-img p-3">
            <img src="/img/mq.png" alt="casa" />
            <label for="square_meters" class="form-label fw-bold m-2 text-nowrap">Metri quadri</label>
          </div>
          <input type="number" class="form-control" min="30" max="1000" step="10" id="square_meters" @input="handleMetersInput()" v-model="activeFilter.square_meters" />
          <div class="invalid-feedback text-black fw-bold">Inserisci un numero intero > 30</div>
        </div>

        <!-- <div class="col-12 my-2 d-none d-md-block">
          
        </div> -->

        <div class="col-12 p-3">
          <button class="btn my_btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Servizi</button>

          <div class="collapse mt-4" id="collapseExample">
            <div class="card card-body my-card">
              <div class="form-label fw-bold m-2">Servizi</div>
              <div class="row flex-column my-3" id="desktop-service-row">
                <div v-for="service of services" class="col-auto">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" :id="'service' + service.id" @change="handleServiceChange(service.id)" :checked="activeFilter['service' + service.id]" />
                    <!-- icona servizi  -->
                    <label class="form-check-label text-nowrap" :for="'service' + service.id">
                      <div class="icon-container"><i :class="service.faIconClass" class="me-2"></i></div>
                      {{ service.label }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section v-if="store.searchedAppartments" class="my-5">
    <div class="container">
      <h2 v-if="store.searchedAppartments.length" class="text-center mb-5">Risultati nelle vicinanze di {{ address ?? defaultAddress }}</h2>
      <h2 v-else class="text-center mb-5">Nessun risultato con i criteri inseriti</h2>
      <div class="row g-4">
        <router-link
          class="col-lg-3 col-sm-6 col-12 my-4 px-5 px-sm-2"
          v-for="appartment in store.searchedAppartments"
          :to="{
            name: 'appartmentDetails',
            params: { appartmentSlug: appartment.slug, from: 'from-ricerca-avanzata' },
          }"
        >
          <AppCard :appartment="appartment"></AppCard>
        </router-link>
      </div>
      <CollectionPaginator v-if="appartmentCollection" :collection="appartmentCollection" @linkClicked="changePage" />
    </div>
  </section>
  <section v-else>
    <AppLoader></AppLoader>
  </section>
</template>

<style lang="scss">
#desktop-service-row {
  --serviceEl: v-bind(serviceN);
  --serviceHeight: 26px;
  --serviceCol: 1;

  height: calc(var(--serviceHeight) * (var(--serviceEl) / var(--serviceCol)) - (var(--serviceHeight) / var(--serviceCol)) + var(--serviceHeight));
}

@media only screen and (min-width: 767px) {
  #desktop-service-row {
    --serviceCol: 2;
  }
}

@media only screen and (min-width: 1140px) {
  #desktop-service-row {
    --serviceCol: 3;
  }
}

.icon-container {
  width: 40px;
  text-align: center;
  display: inline-block;
}

.jumbo {
  display: flex;
  background: linear-gradient(90deg, rgb(226, 199, 137) 10%, rgba(255, 179, 14, 1) 48%, rgba(243, 78, 57, 1) 97%);
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

.servizi-img {
  display: flex;
}

.servizi-img img {
  width: 40px;
}

.form-check-input:checked {
  background-color: #f34e39;
  border-color: #f34e39;
}

.my-card {
  background-color: transparent;
  border: none;
}
</style>
