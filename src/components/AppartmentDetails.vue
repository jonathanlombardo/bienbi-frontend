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

    <div class="container my-container">

      <h2 class="text-center mb-4 show_title">{{ appartment.title }}</h2>

      <div class="row flex-column flex-md-row">

        <div class="col-12 col-md-6 ">
          <div class="">
            <img src="/img/appartment_placeholder.jpg" alt="" class="w-100 rounded">
          </div>
        </div>

        <div class="col-12 col-md-6 mt-3 mt-md-0">
          <div class="row align-items-center justify-content-center">
            <div class="col-3 px-2">
              <div class="rooms_container">
                <img src="/img/stanze.png" alt="" class="w-100 p-3">
                <div class="text-center"><strong>Stanze: </strong>{{ appartment.rooms }}</div>
              </div>
            </div>
            <div class="col-3 px-2">
              <div class="rooms_container">
                <img src="/img/letti.png" alt="" class="w-100 p-3">
                <div class="text-center"><strong>Letti: </strong>{{ appartment.beds }}</div>

              </div>
            </div>
            <div class="col-3 px-2">
              <div class="rooms_container">
                <img src="/img/bagni.png" alt="" class="w-100 p-3">
                <div class="text-center"><strong>Bagni: </strong>{{ appartment.bathrooms }}</div>

              </div>
            </div>
            <div class="col-3 px-2">
              <div class="rooms_container">
                <img src="/img/mq.png" alt="" class="w-100 p-3">
                <div class="text-center"><strong>mq: </strong>{{ appartment.square_meters }}</div>

              </div>
            </div>
          </div>
          <div class="my-2"><strong>Indirizzo: </strong>{{ appartment.address }}</div>

        </div>

      </div>
    </div>
    
  </section>
</template>

<style lang="scss">
.my-container {
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
  border: 1px solid #c85f5f;
  margin-bottom: 10px;
  padding: 20px;
  max-height: 115px;
  min-height: 115px;
  img{
    min-width: 60px;
    max-width: 80px;
  }
}
</style>
