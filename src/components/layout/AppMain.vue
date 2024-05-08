<script>
    import AppSearch from '../AppSearch.vue';
    import AppCard from '../AppCard.vue';
    import axios from 'axios';
    import {api, store} from '../../store';

    export default {
        data() {
            return {
                store,
            }
        },

        components: { AppSearch,AppCard },

        methods: {
            fetchSponsoredAppartment(endpoint = api.baseUrl + 'appartments') {
                axios.get(endpoint).then((res) => {
                    store.sponsoredAppartments = res.data;
                    console.log(store.sponsoredAppartments)
                });
            }
        },

        created() {
            this.fetchSponsoredAppartment()
        }
    }
</script>

<template>
    <AppSearch></AppSearch>
    <main class="my-5">
        <div class="container">
            <div class="row g-4">
                <div class="col-3" v-for="appartment in store.sponsoredAppartments">
                    <router-link :to="{ name: 'detail', params: { id: appartment.id } }" class="text-decoration-none">
                        <AppCard :appartment="appartment"></AppCard>
                    </router-link>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>

</style>