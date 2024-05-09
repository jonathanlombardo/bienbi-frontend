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
    <ul>
      <li>address: {{ appartment.address }}</li>
      <li>bathrooms: {{ appartment.bathrooms }}</li>
      <li>beds: {{ appartment.beds }}</li>
      <li>id: {{ appartment.id }}</li>
      <li>isSponsored: {{ appartment.isSponsored }}</li>
      <li>lat: {{ appartment.lat }}</li>
      <li>long: {{ appartment.long }}</li>
      <li>rooms: {{ appartment.rooms }}</li>
      <li>slug: {{ appartment.slug }}</li>
      <li>square_meters: {{ appartment.square_meters }}</li>
      <li>title: {{ appartment.title }}</li>
    </ul>
  </section>
</template>

<style lang="scss"></style>
