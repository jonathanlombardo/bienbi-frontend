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
  <main class="my-5">
    <div class="container">
      <h1 class="mb-5">Potrebbero interessarti...</h1>
      <div class="row g-4">
        <div class="col-lg-3 col-sm-6 col-12 my-4 px-5 px-sm-2" v-for="appartment in store.sponsoredAppartments">
          <AppCard :appartment="appartment"></AppCard>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 1.5rem;
  color: gray;
}
</style>
