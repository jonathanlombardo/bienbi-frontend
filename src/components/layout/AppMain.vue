<script>
import AppSearch from "../AppSearch.vue";
import AppCard from "../AppCard.vue";
import axios from "axios";
import { api, store } from "../../store";
import CollectionPaginator from "../CollectionPaginator.vue";

export default {
  data() {
    return {
      store,
      appartmentCollection: false,
    };
  },

  components: { AppSearch, AppCard, CollectionPaginator },

  methods: {
    changePage(endpoint, page) {
      const query = {
        page,
      };

      this.$router.push({ name: "home", query: query });
      this.$route.query = query;
      this.fetchSponsoredAppartment(endpoint);
    },

    fetchSponsoredAppartment(endpoint = api.baseUrl + "appartments") {
      console.log("fetch", this.$route.query.page ?? "default");
      const params = {
        page: this.$route.query.page ?? 1,
      };

      axios
        .get(endpoint, {
          params: params,
        })
        .then((res) => {
          store.sponsoredAppartments = res.data.data;
          this.appartmentCollection = res.data;
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
      <CollectionPaginator v-if="appartmentCollection" :collection="appartmentCollection" @linkClicked="changePage" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  background-image: url();
  background-repeat: no-repeat;
  background-size: cover;
}

h1 {
  font-size: 1.5rem;
  color: gray;
}
</style>
