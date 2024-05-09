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
        <div class="d-none d-lg-inline text-decoration-none text-black px-2 me-1">
          <span>Se sei un Host di Bien-Bì
          </span><button class="my_btn">Accedi qui</button>
        </div>
        <div class="d-lg-none">
          <button class="my_btn">Sei un Host?</button>
        </div>
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
