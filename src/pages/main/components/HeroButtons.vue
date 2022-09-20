<template>
  <div
    class="row justify-center button-container"
    :class="[{'logged-in': isLoggedIn }, intersecting? 'q-my-sm' :'top']">
    <q-btn
      v-if="!isLoggedIn"
      :size="!intersecting ? 'md' : 'lg'"
      :unelevated="!intersecting"
      :padding="desktopCheck() ? '10px 32px' : '10px 25px'"
      class="button q-mx-xs q-my-md"
      to="/login"
      color="primary">Login
    </q-btn>
    <q-btn
      v-if="!isLoggedIn"
      :size="!intersecting ? 'md' : 'lg'"
      :unelevated="!intersecting"
      :padding="desktopCheck() ? '10px 32px' : '10px 25px'"
      to="/register"
      class="button q-mx-xs q-my-md"
      color="positive">
      <div class="text-center">
        Signup
      </div>
    </q-btn>
    <q-btn
      v-if="isLoggedIn"
      :size="!intersecting ? 'md' : 'lg'"
      :unelevated="!intersecting"
      :padding="desktopCheck() ? '10px 32px' : '10px 25px'"
      to="/tracker"
      class="button q-mx-xs q-my-md"
      color="positive">
      <div class="text-center">
        Tracker
      </div>
    </q-btn>
    <q-btn
      v-if="isLoggedIn"
      :size="!intersecting ? 'md' : 'lg'"
      :unelevated="!intersecting"
      :padding="desktopCheck() ? '10px 32px' : '10px 25px'"
      to="/collection"
      class="button q-mx-xs q-my-md"
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
  },
  methods: {
    desktopCheck() {
      return this.$q.screen.gt.sm;
    }
  }
};
</script>

<style
  scoped
  lang="scss">

body.screen--xs, body.screen--sm {
  .button {
    border-radius: 0.5rem;
    font-family: Futura-Bold, sans-serif;
  }

  .button-container {
    position: relative;
    width: 100%;
    z-index: 5;
  }
}

body.screen--md, body.screen--lg, body.screen--xl, {

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
    height: 4.5rem;
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
      width: 265px;
      position: fixed;
    }
  }

  @keyframes slideright {
    to {
      width: 265px;
      position: fixed;
    }
  }

  @-webkit-keyframes sliderightLogged {
    to {
      width: 310px;
      position: fixed;
    }
  }

  @keyframes sliderightLogged {
    to {
      width: 310px;
      position: fixed;
    }
  }

  .button {
    border-radius: 0.5rem;
    font-family: Futura-Bold, sans-serif;
  }
}

</style>
