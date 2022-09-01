<template>
  <div class="flex justify-evenly q-pa-md q-gutter-x-md text-light">
    <q-card class="normal bg-dark q-pa-md flex justify-center items-center">
      <h4 class="absolute-top q-ma-md">Normal</h4>
      <div class="img-cont">
        <q-img
          :src="pkImageNormal"
          height="100%"
          fit="contain"></q-img>
      </div>
    </q-card>
    <q-card
      class="shiny bg-dark q-pa-md flex justify-center items-center"
      @click="toggleShiny">
      <h4 class="absolute-top q-ma-md">Shiny</h4>
      <transition mode="out-in">
        <p
          class="image-reveal"
          v-if="!shinyIsActive && pkIsActive">Click To Reveal</p>
        <div
          v-else
          class="img-cont">
          <q-img
            :src="pkImageShiny"
            height="100%"
            fit="contain"></q-img>
        </div>
      </transition>
    </q-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      shinyIsActive: false
    };
  },

  computed: {
    ...mapGetters("tracker", ["pkImageNormal", "pkImageShiny", "pkId"]),
    pkIsActive() {
      return this.pkId !== "";
    }
  },
  methods: {
    toggleShiny() {
      if (this.pkIsActive) {
        this.shinyIsActive = !this.shinyIsActive;
      }
    }
  }
};
</script>

<style scoped>
/* For extremely small screen devices (480px and below) */
@media only screen and (max-width: 480px) {
}

/* Small screen devices (481px and above) */
@media only screen and (min-width: 481px) {
}

/* Medium screen devices (769px and above) */
@media only screen and (min-width: 769px) {
}

/* Big screen devices (1025px and above) */
@media only screen and (min-width: 1025px) {
}

/* Extra big screen devices (1200px and above) */
@media only screen and (min-width: 1200px) {
  .img-cont {
    width: 90%;
    height: 90%;
  }

  .normal,
  .shiny {
    height: 16rem;
    width: 46%;
    max-width: 22rem;
    border-radius: 0.7rem;
  }

  .image-reveal {
    font-size: 1.3rem;
  }
}
</style>
