<script>
    import axios from 'axios';

    export default {
        

        props: {
            appartment: Object,
        },

        methods: {

        }
    }
</script>

<template>
    <div class="card h-100">
        <img src="" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ appartment.title }}</h5>
            <span class="card-text">{{ appartment.address }}</span>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    span {
        opacity: 0.6;
    }
</style>