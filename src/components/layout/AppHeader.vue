<script></script>

<template>
  <header id="top">
    <section class="header-fixed container">
      <div class="banda-dinamica">
        <router-link class="text-decoration-none" :to="{ name: 'home' }">
          <div class="logo">
            <img src="/img/logo-bienbi.png" alt="logo" />
          </div>
        </router-link>
        <div>
          <span class="d-none d-md-inline text-decoration-none text-black px-2">Sei un Host di Bien-Bì?</span>
          <span class="d-md-none text-decoration-none text-black px-2">Sei un Host?</span>
          <a href="http://127.0.0.1:8000/" class="my_btn">Accedi qui</a>
        </div>
        <!-- MODALE PER MOBILE -->
        <!-- <button class="d-md-none btn btn-light mx-3 m-sm-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <i class="fa-solid fa-bars"></i>
          </button>
          
          <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <div>
                Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
              </div>
              <div class="dropdown mt-3">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  Dropdown button
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </div>
            </div>
          </div> -->
      </div>
    </section>
  </header>
</template>

<style lang="scss">
.header-fixed {
  position: sticky;
  top: 0;
  z-index: 9999;
  background-color: #fff;
}

.banda-dinamica {
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo img {
    width: 200px;
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

.my_btn {
  display: inline-block;
  font-size: 0.9rem;
  text-align: center;
  background-color: #ffb30e;
  padding: 6px 10px;
  border: none;
  width: 100px;
  border-radius: 10px;
  font-weight: bold;
  transition: transform 0.5s;

  &:hover {
    background-color: #f34e39;
    transform: scale(1.1);
    box-shadow: 2px 3px 12px #f34e39;
    color: #fff;
  }
}
</style>
