<template>
  <div
    class="footer-bar bg-dark shadow-up-3 flex justify-center full-width">
    <q-toolbar>
      <div class="col-12 text-light row justify-center text-subtitle1">
        © 2022 DexHunt. All Rights Reserved.
      </div>
    </q-toolbar>
  </div>
</template>

<script>
export default {
  name: "TheFooterBar.vue"
};
</script>

<style
  scoped
  lang="scss">

.auth-bar,
.menu-bar {
  height: 100%;
}

.home {
  text-decoration: none;
  color: white;
}


body.screen--xs, body.screen--sm {
  .footer-bar {
    height: 4rem;
  }

  .toolbar {
    height: 4rem;
  }

  .mobile-title {
    font-family: Gellix, sans-serif;
    text-decoration: none;
  }

  .homepage-header {
    top: -9rem;
    transition: 0.5s ease-in-out all;
  }
}

body.screen--md, body.screen--lg, body.screen--xl, {
  .footer-bar {
    height: 100%;
  }

  .toolbar {
    height: 4rem;
    overflow: hidden;

  }

  .home-link {
    text-decoration: none;
  }

  .site-header {
    font-family: Gellix, sans-serif;
  }

  .homepage-header {
    top: -9rem;
    transition: 0.5s ease-in-out all;
  }
}
</style>
