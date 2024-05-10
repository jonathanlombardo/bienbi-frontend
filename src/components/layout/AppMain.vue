<script>
import AppSearch from "../AppSearch.vue";
import AppCard from "../AppCard.vue";
import axios from "axios";
import { api, store } from "../../store";

export default {
  data() {
    return {
      store,
    };
  },

  components: { AppSearch, AppCard },

  methods: {
    fetchSponsoredAppartment(endpoint = api.baseUrl + "appartments") {
      axios.get(endpoint).then((res) => {
        store.sponsoredAppartments = res.data;
        console.log(store.sponsoredAppartments);
      });
    },
  },

  created() {
    this.fetchSponsoredAppartment();
  },
};
</script>

<template>
  <AppSearch></AppSearch>
  <main>
    <div class="container">
      <h1 class="my-4">Potrebbero interessarti...</h1>
      <div class="row g-4">
        <AppCard v-for="appartment in store.sponsoredAppartments" :appartment="appartment"></AppCard>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  background-image: url();
  background-repeat: no-repeat;
  background-size: cover
}

h1 {
  font-size: 1.5rem;
  color: gray;
}
</style>
