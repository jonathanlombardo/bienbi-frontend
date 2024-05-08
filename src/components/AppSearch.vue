<script>


    export default {
        
    }
</script>

<template>
    <section class="jumbo p-4">
        <div>
            <h1 class="display-3">Scegli la tua prossima <span class="coloring-text">meta</span></h1>
            <form action="">
            <div class="input-group my-5">
                <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-magnifying-glass"></i></span>
                <!-- barra di ricerca -->
                <input type="text" class="form-control" placeholder="Cerca" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            </form>
        </div>
        
        <div class="gap-2">
            <div class="jumbo-img">
            <img src="/img/bnb.png" alt="casa">
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>
    .jumbo{
        display: flex;  
        background: linear-gradient(90deg, rgb(226, 199, 137) 10%, rgba(255, 179, 14, 1) 48%, rgba(243, 78, 57, 1) 97%);
        justify-content: space-around;
        margin-top: 100px;
    }

    .jumbo-img img{
        width: 250px;
    }

    .coloring-text{
        color: rgba(243, 78, 57, 1);
    }

    h1{
        font-weight: bold;
    }
    
</style>