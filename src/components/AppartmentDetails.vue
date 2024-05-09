<script>
import axios from "axios";
import { api } from "../store";

export default {
  data() {
    return {};
  },
  methods: {
    fetchAppartmentDetails(
      endpoint = api.baseUrl +
        "appartments/" +
        this.$route.params.appartmentSlug
    ) {
      axios.get(endpoint).then((response) => {
        console.log(response);
      });
    },
  },
};
</script>

<template>
  <section class="p-5">{{ this.$route.params.appartmentSlug }}</section>
</template>

<style lang="scss"></style>
