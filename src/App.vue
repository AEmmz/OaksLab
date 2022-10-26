<template>
  <q-layout view="hHh lpR fFf">
    <the-navigation-bar></the-navigation-bar>
    <q-page-container>
      <router-view
        v-slot="slotProps">
        <transition
          name="router"
          mode="out-in">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
    </q-page-container>

    <div
      class="footer-bar bg-dark shadow-up-3 flex justify-center">
      <q-toolbar>
        <div class="col-12 text-light row justify-center text-caption text-center">
          © 2022 DexHunt. All Rights Reserved.
          <br/>
          Pokémon and All Respective Names are Trademark & © of Nintendo 1996-2022
        </div>
      </q-toolbar>
    </div>
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
import TheNavigationBar from "./components/navigation/TheNavigationBar.vue";

export default {
  components: {
    TheNavigationBar
  },
  computed: {
    ...mapGetters("authorization", ["uid"])
  }
};
</script>

<style>
@import './css/variables.css';

* {
  margin: 0;
  box-sizing: border-box;
}

.q-dialog__backdrop {
  background: rgba(0, 0, 0, 0.7);
}

html {
  background-color: var(--med-bg);
  font-family: Gellix, sans-serif;
  overflow-x: hidden;
}

.main {
  position: relative;
  top: 80px;
}

.router-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.router-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.router-enter-active {
  transition: all 0.2s ease-out;
}

.router-leave-active {
  transition: all 0.2s ease-in;
}

.router-enter-to,
.router-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
