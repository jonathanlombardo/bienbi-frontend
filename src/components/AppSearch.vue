<script>
import TomTomSearchbox from './TomTomSearchbox.vue';

 export default {
        components: { TomTomSearchbox}
    };

 
</script>

<template>
    <section class="jumbo p-5">
        <div>
            <div class="logo-testo">
                <form action="">
                    <div class="input-group my-5">
                    
                        <!-- barra di ricerca -->
                        <TomTomSearchbox @returnAddress="emitAddress"></TomTomSearchbox>
                    </div>
                    <router-link :to="{ name: 'ricerca-avanzata',  params: { position: returnAddress.position } }">
                        <div class="btn btn-primary">ricerca avanzata</div>
                    </router-link>
                </form>
                <img src="/img/prossima_meta.png" alt="casa">
            </div>

            
            
         
        </div>
        
    </section>
</template>


<style lang="scss" scoped>
    .jumbo{
        display: flex;  
        background: linear-gradient(90deg, rgb(226, 199, 137) 10%, rgba(255, 179, 14, 1) 48%, rgba(243, 78, 57, 1) 97%);
        justify-content: space-around;
        margin-top: 20px;
    }

    .logo-testo {
        display: flex;
    }

    .logo-testo img{
        width: 200px;
    }

    .coloring-text{
        color: rgba(243, 78, 57, 1);
    }

    h1{
        font-weight: bold;
    }
    
</style>