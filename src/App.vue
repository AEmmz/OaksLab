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
      class="bg-dark shadow-up-3 flex justify-center q-py-sm">
      <div>
        <div class="col-12 text-light row justify-center text-caption text-center">
          © 2022 DexHunt. All Rights Reserved.
          <br/>
          Pokémon and All Respective Names are Trademark & © of Nintendo 1996-2022
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TheNavigationBar from "./components/navigation/TheNavigationBar.vue";

export default {
  components: {
    TheNavigationBar
  },
  mounted() {
    if (this.uid) {
      this.retrieveUserSettings();
    }
  },
  computed: {
    ...mapGetters("authorization", ["uid"])
  },
  methods: {
    ...mapActions("authorization", ["retrieveUserSettings"])
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
