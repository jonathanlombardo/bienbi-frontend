<script>
    import axios from 'axios';

    export default {
        

        props: {
            appartment: Object,
        },

    }
</script>

<template>
    <div class="card h-100 my_card">
        <img :src="appartment.imgUrl" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">{{ appartment.title }}</h5>
            <span class="card-text">{{ appartment.address }}</span>
            <div class="mt-3"><strong>Stanze: </strong>{{ appartment.rooms > 1 ? appartment.rooms : 'Una stanza' }}</div>
            <div class="mt-1"><strong>Metri quadri: </strong>{{ appartment.square_meters }}</div>
            <div class="mt-4"><strong>Host: </strong>{{ appartment.user.name }}</div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    span {
        opacity: 0.6;
    }

    .my_card {
        transition: transform 0.5s;
        cursor: pointer;

        &:hover {
            transform: scale(1.1);
        }
    }
</style>