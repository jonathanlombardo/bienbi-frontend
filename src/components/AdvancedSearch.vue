<script>
import AppCard from "./AppCard.vue";
import axios from "axios";
import { api, store } from "../store";
import TomTomSearchbox from "./TomTomSearchbox.vue";

export default {
  data() {
    return {
      store,
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

  methods: {
    newFilter() {
      clearTimeout(this.clock);

      this.clock = setTimeout(() => {
        const query = {};
        for (const [key, value] of Object.entries(this.activeFilter)) {
          query[key] = value;
        }
        query.lat = query.lat ?? this.defaultLat;
        query.long = query.long ?? this.defaultLong;
        query.radius = query.radius ?? this.defaultRadius;

        this.$router.push({ name: "ricerca-avanzata", query: query });
        this.$route.query = query;
        this.fetchSearchedAppartment();
      }, 800);
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

  components: { AppCard, TomTomSearchbox },
};
</script>

<template>
  <section class="p-5 jumbo d-flex flex-column">
    <div>
      <h1 class="text-center mb-4 fw-bold">Cerca l'appartamento che fa al caso tuo</h1>
    </div>

    <div class="container">
      <div class="w-75 m-auto">
        <TomTomSearchbox :placeholder="address" class="my-3" @returnAddress="updatePosition" :inputValue="address"></TomTomSearchbox>
      </div>
      <div class="row">
        <div class="col p-3">
          <div class="p-3">
            <label for="customRange1" class="form-label fw-bold">Raggio di ricerca: {{ radiusKm }} Km </label>
          </div>
          <input type="range" class="form-range form-range-moz mt-3" id="customRange1" min="0" max="100000" step="5000" @input="newFilter()" v-model="activeFilter.radius" />
        </div>

        <div class="col p-3">
          <div class="servizi-img p-3">
            <img src="/img/stanze.png" alt="casa" />
            <label for="rooms" class="form-label fw-bold m-2">Stanze</label>
          </div>
          <input type="number" class="form-control" min="0" max="50" id="rooms" @input="handleRoomsInput('rooms')" v-model="activeFilter.rooms" />
          <div class="invalid-feedback text-black fw-bold">Inserisci un numero intero > 0</div>
        </div>

        <div class="col p-3">
          <div class="servizi-img p-3">
            <img src="/img/letti.png" alt="casa" />
            <label for="beds" class="form-label fw-bold m-2">Letti</label>
          </div>
          <input type="number" class="form-control" min="0" max="50" id="beds" @input="handleRoomsInput('beds')" v-model="activeFilter.beds" />
          <div class="invalid-feedback text-black fw-bold">Inserisci un numero intero > 0</div>
        </div>

        <div class="col p-3">
          <div class="servizi-img p-3">
            <img src="/img/bagni.png" alt="casa" />
            <label for="bathrooms" class="form-label fw-bold m-2">Bagni</label>
          </div>
          <input type="number" class="form-control" min="0" max="50" id="bathrooms" @input="handleRoomsInput('bathrooms')" v-model="activeFilter.bathrooms" />
          <div class="invalid-feedback text-black fw-bold">Inserisci un numero intero > 0</div>
        </div>

        <div class="col p-3">
          <div class="servizi-img p-3">
            <img src="/img/mq.png" alt="casa" />
            <label for="square_meters" class="form-label fw-bold m-2">Metri quadri</label>
          </div>
          <input type="number" class="form-control" min="30" max="1000" step="10" id="square_meters" @input="handleMetersInput()" v-model="activeFilter.square_meters" />
          <div class="invalid-feedback text-black fw-bold">Inserisci un numero intero > 30</div>
        </div>

        <div class="col-12 my-2 d-none d-md-block">
          <div class="form-label fw-bold m-2">Servizi</div>
          <div class="row flex-column my-3" id="desktop-service-row">
            <div v-for="service of services" class="col-auto">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" :id="'service' + service.id" @change="handleServiceChange(service.id)" :checked="activeFilter['service' + service.id]" />
                <!-- icona servizi -->
                <label class="form-check-label text-nowrap" :for="'service' + service.id"
                  ><div class="icon-container"><i :class="service.faIconClass" class="me-2"></i></div>
                  {{ service.label }}</label
                >
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 p-3">
          <button class="btn btn-primary d-inline d-md-none my_btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Servizi</button>

          <div class="collapse d-md-none mt-4" id="collapseExample">
            <div class="card card-body">
              <div class="form-label fw-bold m-2">Servizi</div>
              <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 my-3">
                <div v-for="service of services" class="col">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" :id="'service' + service.id" @change="handleServiceChange(service.id)" :checked="activeFilter['service' + service.id]" />
                    <!-- icona servizi -->
                    <!-- <span><i :class="service.faIconClass"></i></span> -->
                    <label class="form-check-label" :for="'service' + service.id">{{ service.label }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="my-5">
    <div class="container">
      <h2 v-if="store.searchedAppartments.length" class="text-center mb-5">Risultati nelle vicinanze di {{ address ?? defaultAddress }}</h2>
      <h2 v-else class="text-center mb-5">Nessun risultato con i criteri inseriti</h2>
      <div class="row g-4">
        <AppCard v-for="appartment in store.searchedAppartments" :appartment="appartment"></AppCard>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
#desktop-service-row {
  --serviceEl: v-bind(serviceN);
  --serviceHeight: 26px;
  --serviceCol: 2;

  height: calc(var(--serviceHeight) * (var(--serviceEl) / var(--serviceCol)) - (var(--serviceHeight) / var(--serviceCol)) + var(--serviceHeight));
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
</style>
