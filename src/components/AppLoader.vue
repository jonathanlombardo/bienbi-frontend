<template>
    <div class="my-loader-container">
        <div class="spinner-grow my-spinner-grow text-warning text-center" role="status">
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.my-spinner-grow {
    width: 3rem;
    height: 3rem;
}

.my-loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
}
</style>