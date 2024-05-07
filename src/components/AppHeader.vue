<script>

</script>

<template>
  <header id="top">
    <section class="header-fixed"> 
        <div class="banda-dinamica">
            <div class="logo">
              <img src="/img/logo-bienbi.png" alt="logo">
            </div>
            <ul class="m-0">
            </ul>
            <div>
                <button type="button" class="btn my_btn mx-1">Login</button>
                <button type="button" class="btn my_btn mx-1">Register</button>
            </div>
        </div>
    </section>
    <section class="jumbo p-4">
            <div>
              <h1 class="display-3">Scegli la tua prossima <span class="coloring-text">meta</span></h1>
              <form action="">
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-magnifying-glass"></i></span>
                  <input type="text" class="form-control" placeholder="Cerca" aria-label="Username" aria-describedby="basic-addon1">
                </div>
              </form>
            </div>
            
            <div class="gap-2">
              <div class="jumbo-img">
                <img src="/img/casa-gialla.jpg" alt="casa">
              </div>
            </div>
    </section>
 </header>
</template>

<style lang="scss">

.header-fixed{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999;
  background-color: #fff;
}

.banda-dinamica{
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .logo img{
    width: 250px;
    overflow: hidden;
    position: relative;
    animation-name: mymoves;
    animation-duration: 3s;
  }

  @keyframes mymoves {
    0% {
        right: 400px;
    }
    100% {
        right: 0px;
    }
}
}

.jumbo{
  display: flex;  
  background: linear-gradient(
        90deg,
        rgb(226, 199, 137) 10%,
        rgba(255, 179, 14, 1) 48%,
        rgba(243, 78, 57, 1) 97%
    );
  justify-content: space-around;
  margin-top: 100px;
}

.jumbo-img img{
  width: 250px;
}

.coloring-text{
  color: rgba(243, 78, 57, 1);
}
.my_btn {
  font-size: 0.9rem;
  text-align: center;
  background-color: #ffb30e;
  padding: 6px 10px;
  border: none;
  width: 100px;
  border-radius: 10px;
  font-weight: bold;
}

.my_btn:hover {
  background-color: #f34e39;
  transform: scale(1.1);
  box-shadow: 2px 3px 12px #f34e39;
}

</style>