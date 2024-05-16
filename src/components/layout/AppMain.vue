<script>
import AppSearch from "../AppSearch.vue";
import AppCard from "../AppCard.vue";
import AppLoader from "../AppLoader.vue"
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

  watch: {
    $route() {
      this.fetchSponsoredAppartment();
    },
  },

  components: { AppSearch, AppCard, CollectionPaginator, AppLoader },

  methods: {
    changePage(endpoint, page) {
      const query = {
        page,
      };

      this.$router.push({ name: "home", query: query });
      this.$route.query = query;
      this.fetchSponsoredAppartment();
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
      <div class="row g-4 pt-4" v-if="store.sponsoredAppartments">
        <h1>Potrebbero interessarti...</h1>
        <router-link class="col-lg-3 col-sm-6 col-12 my-4 px-5 px-sm-2"  v-for="appartment in store.sponsoredAppartments"  :to="{
          name: 'appartmentDetails',
          params: { appartmentSlug: appartment.slug, from: 'from-homepage' },
        }" >
          <AppCard :appartment="appartment"></AppCard>
        </router-link>

      </div>
      <AppLoader v-else></AppLoader>

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
