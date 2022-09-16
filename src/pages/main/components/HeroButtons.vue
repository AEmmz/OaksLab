<template>
  <div
    class="row justify-center q-my-sm button-container"
    :class="[{'top': !intersecting},{'logged-in': isLoggedIn }]">
    <q-btn
      v-if="!isLoggedIn"
      size="md"
      :unelevated="!intersecting"
      padding="10px 32px"
      class="button q-ma-xs"
      to="/login"
      color="primary">Login
    </q-btn>
    <q-btn
      v-if="!isLoggedIn"
      size="md"
      :unelevated="!intersecting"
      padding="10px 32px"
      to="/register"
      class="button q-ma-xs"
      color="positive">
      <div class="text-center">
        Signup
      </div>
    </q-btn>
    <q-btn
      v-if="isLoggedIn"
      size="md"
      :unelevated="!intersecting"
      padding="10px 32px"
      to="/tracker"
      class="button q-ma-xs"
      color="positive">
      <div class="text-center">
        Tracker
      </div>
    </q-btn>
    <q-btn
      v-if="isLoggedIn"
      size="md"
      :unelevated="!intersecting"
      padding="10px 32px"
      to="/collection"
      class="button q-ma-xs"
      color="positive">
      <div class="text-center">
        Collection
      </div>
    </q-btn>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HeroButtons",
  props: { "intersecting": { type: Boolean } },
  computed: {
    ...mapGetters("authorization", ["isLoggedIn"])
  }
};
</script>

<style
  scoped
  lang="scss">

/*
* Prefixed by https://autoprefixer.github.io
* PostCSS: v8.4.14,
* Autoprefixer: v10.4.7
* Browsers: last 4 version
*/

.button-container {
  position: relative;
  top: 0;
  right: 0;
  width: 100%;
  -webkit-transform: translateX(0);
  -ms-transform: translateX(0);
  transform: translateX(0);
  z-index: 5;
}

.button-container.top {
  position: fixed;
  width: 38%;
  top: 0;
  right: 0;
  -webkit-animation: slideright 0.5s 0.3s ease-in-out forwards;
  animation: slideright 0.5s 0.3s ease-in-out forwards;
}

.button-container.top.logged-in {
  -webkit-animation: sliderightLogged 0.5s 0.3s ease-in-out forwards;
  animation: sliderightLogged 0.5s 0.3s ease-in-out forwards;
}

@-webkit-keyframes slideright {
  to {
    width: 255px;
    position: fixed;
  }
}

@keyframes slideright {
  to {
    width: 255px;
    position: fixed;
  }
}

@-webkit-keyframes sliderightLogged {
  to {
    width: 360px;
    position: fixed;
  }
}

@keyframes sliderightLogged {
  to {
    width: 360px;
    position: fixed;
  }
}

.button {
  border-radius: 0.5rem;
  font-family: Futura-Bold, sans-serif;
}

</style>
