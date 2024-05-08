<script>

export default {


};


</script>

<template>
    <section class="p-5">

        <h1>Ricerca Avanzata</h1>

        <div class="container">

            <div class="row">
                <div class="col">
                    <label for="customRange1" class="form-label">Example range</label>
                    <input type="range" class="form-range" id="customRange1">
                </div>
            </div>

        </div>



    </section>
</template>


<style lang="scss">

.form-range::-moz-range-thumb{
    background-color: #ffb30e; 
}

.form-range::-moz-range-thumb:hover{
    box-shadow: 2px 3px 12px #f34e39; 
    color: #ffb30e;
}


</style>