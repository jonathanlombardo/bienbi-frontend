<script>
import axios from "axios";
import { api } from "../store";

export default {
  data() {
    return {
      appartment: {},
    };
  },
  methods: {
    fetchAppartmentDetails(
      endpoint = api.baseUrl +
        "appartments/" +
        this.$route.params.appartmentSlug
    ) {
      axios.get(endpoint).then((response) => {
        console.log(response);
        this.appartment = response.data;
      });
    },
  },
  mounted() {
    this.fetchAppartmentDetails();
  },
};
</script>

<template>
  <section class="p-5">
    <div class="card  card_show">
      <h2 class="text-center mb-4 show_title">{{ appartment.title }}</h2>
      <div class="d-flex flex-row">
        <div class="w-50 me-5">
          <img src="/img/appartment_placeholder.jpg" alt="" class="w-100 rounded">
        </div>
        <div class="w-50">
          <div class="d-flex gap-3">
            <div class="rooms_container px-2">
              <img src="/img/stanze.png" alt="" class="w-100 p-3">
              <div class="text-center"><strong>Stanze: </strong>{{ appartment.rooms }}</div>
            </div>
            <div class="rooms_container px-2">
              <img src="/img/letti.png" alt="" class="w-100 p-3">
              <div class="text-center"><strong>Letti: </strong>{{ appartment.beds }}</div>
            </div>
            <div class="rooms_container px-2">
              <img src="/img/bagni.png" alt="" class="w-100 p-3">
              <div class="text-center"><strong>Bagni: </strong>{{ appartment.bathrooms }}</div>
            </div>
            <div class="rooms_container px-2">
              <img src="/img/mq.png" alt="" class="w-100 p-3">
              <div class="text-center"><strong>Metri quadri: </strong>{{ appartment.square_meters }}</div>
            </div>
          </div>
          <div class="my-2"><strong>Indirizzo: </strong>{{ appartment.address }}</div>
          <div class="my-2"><strong>Servizi: </strong></div>
          <!-- <div class="my-2"><strong>Descrizione: </strong>
            {{ appartment.slug }}
          </div> -->
        </div>
      </div>
      <div class="text-center my-4"><strong>Mappa</strong></div>
    </div>
  </section>
</template>

<style lang="scss">

.card_show {
  background-color: rgb(243, 243, 243);
  border: none;
  padding: 15px;
}

.show_title {
  background: linear-gradient(90deg, rgb(233, 214, 171) 10%, rgb(255, 179, 14) 48%, rgb(243, 78, 57) 97%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: bold;
}

.rooms_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 140px;
  border: 1px solid #c85f5f;
  margin-bottom: 10px;
  padding: 10px;
}
</style>
