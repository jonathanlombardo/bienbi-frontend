<script></script>

<template>
  <footer class="main_footer">
    <div class="container">
      <div class="row justify-content-between py-4">
        <!-- Right -->
        <div id="info-links" class="col-6">
          <ul class="d-flex flex-column flex-md-row gap-3 list-unstyled mb-0">
            <li>
              <a class="footer_link" href="#">&#169; 2024 Bien bi, Inc.</a>
            </li>
            <li>
              <a class="footer_link" href="#">Privacy</a>
            </li>
            <li>
              <a class="footer_link" href="#">Termini</a>
            </li>
            <li>
              <a class="footer_link" href="#">FAQ</a>
            </li>
          </ul>
        </div>
        <!-- Left -->
        <div id="socials-icons" class="col-6">
          <ul class="d-flex gap-3 list-unstyled mb-0 justify-content-end">
            <li>
              <a class="footer_link" href="#"><i class="fa-brands fa-square-facebook"></i></a>
            </li>
            <li>
              <a class="footer_link" href="#"><i class="fa-brands fa-square-twitter"></i></a>
            </li>
            <li>
              <a class="footer_link" href="#"><i class="fa-brands fa-square-instagram"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: white;
  transition: color 0.5s;

  &:hover {
    color: #ffb30e;
  }
}

.main_footer {
  background-color: #333333;
}
</style>
