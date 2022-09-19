<template>
  <q-page-container class="home-container relative-position">
    <div
      class="home-container row relative-position justify-center items-center"
      v-intersection="{handler: cardIntersect, cfg:{threshold: cardThreshold}}">
      <div
        class="home-toolbar row  full-width items-center q-px-lg"
        :class="[{'toolbar-top': !intersecting}, desktopCheck() ? 'absolute-top-left' : 'justify-center']">
        <div
          class="site-header col-6 text-h4 row items-center"
          :class="desktopCheck() ? '' : 'justify-center q-mb-xl'">
          <q-icon
            name="icon-poke-pokeball"
            size="sm"
            class="q-pt-xs q-pr-sm"/>
          DexHunt
          <q-icon
            name="icon-poke-pokeball"
            size="sm"
            class="q-pt-xs q-pl-sm"/>
          <!--          ShinySprite-->
          <!--          TheShinyCharm-->
          <!--          ExpertDex-->
          <!--          ShinyPal-->
        </div>
      </div>
      <hero-cards
        v-if="desktopCheck()"
        :card-position="cardPosition"/>
      <q-separator
        class="separator q-mb-lg"
        v-if="!desktopCheck()"
        inset></q-separator>

      <div
        class="hero-header text-dark"
        :class="[{'vanish' : cardPosition === 10}, desktopCheck() ? 'absolute-bottom-left text-h1 q-ma-xl' : 'text-h3']">
        Gotta
        Track<br/>'Em
        All
      </div>
      <div
        class="hero-subheader justify-center text-dark "
        :class="{'absolute-top-right q-ma-xl': desktopCheck()}">
        <div
          class="subheader text-h6 text-center"
          v-intersection="buttonIntersect">Collect the way that you want to collect.
        </div>
        <hero-buttons :intersecting="intersecting"/>
      </div>
      <q-separator
        class="separator q-my-lg"
        v-if="!desktopCheck()"
        inset></q-separator>
    </div>

    <feature-carousels
      :card-intersecting="cardIntersecting"/>

    <div class="full-height full-width backdrop fixed"></div>
    <div class="design1"></div>
    <div class="design2 "></div>
    <div class="design3 "></div>
    <div class="design4 "></div>
    <div class="design5"></div>
  </q-page-container>
</template>

<script>
import HeroCards from "./components/HeroCards.vue";
import HeroButtons from "./components/HeroButtons.vue";
import FeatureCarousels from "./components/FeatureCarousels.vue";

export default {
  components: { FeatureCarousels, HeroButtons, HeroCards },
  data() {
    return {
      intersecting: false,
      cardIntersecting: 0,
      cardThreshold: [0, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.10, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.20, 0.21, 0.22, 0.23, 0.24, 0.25, 0.26, 0.27, 0.28, 0.29, 0.30, 0.31, 0.32, 0.33, 0.34, 0.35, 0.36, 0.37, 0.38, 0.39, 0.40, 0.41, 0.42, 0.43, 0.44, 0.45, 0.46, 0.47, 0.48, 0.49, 0.50, 0.51, 0.52, 0.53, 0.54, 0.55, 0.56, 0.57, 0.58, 0.59, 0.60, 0.61, 0.62, 0.63, 0.64, 0.65, 0.66, 0.67, 0.68, 0.69, 0.70, 0.71, 0.72, 0.73, 0.74, 0.75, 0.76, 0.77, 0.78, 0.79, 0.80, 0.81, 0.82, 0.83, 0.84, 0.85, 0.86, 0.87, 0.88, 0.89, 0.90, 0.91, 0.92, 0.93, 0.94, 0.95, 0.96, 0.97, 0.98, 0.99]
    };
  },
  computed: {
    cardPosition() {
      const val = 20 - (this.cardIntersecting * 20);
      if (val > 0) {
        if (val >= 10) return 10;
        return val;
      }
      return 0;
    }
  },
  methods: {
    buttonIntersect(entry) {
      this.intersecting = entry.isIntersecting;
    },
    cardIntersect(entry) {
      this.cardIntersecting = entry.intersectionRatio;
    },
    desktopCheck() {
      return this.$q.screen.gt.xs;
    }
  }
};
</script>

<style
  scoped
  lang="scss">

body.screen--xs {
  .home-container {
    top: -2rem
  }

  .home-toolbar {
    height: 4.5rem;
  }

  .toolbar-top {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    color: white;
    background: rgba(50, 50, 50, 0.85);
    -webkit-transition: 0.5s ease-in-out all;
    -o-transition: 0.5s ease-in-out all;
    transition: 0.5s ease-in-out all;
  }

  .site-header {
    font-family: Gellix, sans-serif;
    width: 80%;
  }

  .separator {
    height: 2px;
    width: 70%;
  }

  .hero-header {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 80%;
    font-family: Futura, sans-serif;
    transition: ease 0.5s all;
    opacity: 1;
  }

  .hero-header.vanish {
    opacity: 0
  }

  .hero-subheader {
    width: 85%;
  }

  .subheader {
    font-family: Gellix, sans-serif;
  }

  .backdrop {
    background: rgba(200, 200, 200, 0.7);
    -webkit-box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(60px);
    -webkit-backdrop-filter: blur(9.2px);
    z-index: -1;
    top: 0;
  }

  .design1, .design2, .design3, .design4, .design5, .design6 {
    opacity: 1;
    position: fixed;
    border-radius: 5rem;
    height: 10rem;
    width: 40rem;
    z-index: -2;
  }

  .design1, .design2, .design3 {
    background: darkviolet;
  }

  .design4, .design5, .design6 {
    background: red;
  }

  .design1 {
    top: 25rem;
    left: -20%;
    -webkit-transform: rotate(-35deg);
    -ms-transform: rotate(-35deg);
    transform: rotate(-35deg);
  }

  .design2 {
    top: -18rem;
    left: 45%;
    -webkit-transform: rotate(-60deg);
    -ms-transform: rotate(-60deg);
    transform: rotate(-60deg);
  }

  .design3 {
    bottom: -6rem;
    left: 80%;
    -webkit-transform: rotate(20deg);
    -ms-transform: rotate(20deg);
    transform: rotate(20deg);
  }

  .design4 {
    top: 25rem;
    left: -8%;
    -webkit-transform: rotate(-35deg);
    -ms-transform: rotate(-35deg);
    transform: rotate(-35deg);
  }

  .design5 {
    top: -5rem;
    left: 50%;
    -webkit-transform: rotate(-60deg);
    -ms-transform: rotate(-60deg);
    transform: rotate(-60deg);
  }
}

body.screen--sm {
  .home-container {
    height: 100vh;
    top: -4rem
  }

  .home-toolbar {
    height: 4.5rem;
  }

  .toolbar-top {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    color: white;
    background: rgba(50, 50, 50, 0.85);
    -webkit-transition: 0.5s ease-in-out all;
    -o-transition: 0.5s ease-in-out all;
    transition: 0.5s ease-in-out all;
  }

  .site-header {
    font-family: Gellix, sans-serif;
  }

  .hero-header {
    height: 15rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 35%;
    max-width: 35rem;
    min-width: 30rem;
    font-family: Futura, sans-serif;
    -webkit-transition: ease 0.5s all;
    -o-transition: ease 0.5s all;
    transition: ease 0.5s all;
    opacity: 1;
  }

  .hero-header.vanish {
    opacity: 0
  }

  .hero-subheader {
    width: 22%;
    margin-top: 10rem;
    margin-right: 10rem;
  }

  .subheader {
    font-family: Gellix, sans-serif;
  }

  .backdrop {
    background: rgba(200, 200, 200, 0.7);
    border-radius: 16px;
    -webkit-box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(60px);
    -webkit-backdrop-filter: blur(9.2px);
    z-index: -1;
    top: 0;
  }

  .design1, .design2, .design3, .design4, .design5, .design6 {
    opacity: 1;
    position: fixed;
    border-radius: 5rem;
    height: 10rem;
    width: 40rem;
    z-index: -2;
  }

  .design1, .design2, .design3 {
    background: darkviolet;
  }

  .design4, .design5, .design6 {
    background: red;
  }

  .design1 {
    top: 25rem;
    left: -20%;
    -webkit-transform: rotate(-35deg);
    -ms-transform: rotate(-35deg);
    transform: rotate(-35deg);
  }

  .design2 {
    top: -18rem;
    left: 45%;
    -webkit-transform: rotate(-60deg);
    -ms-transform: rotate(-60deg);
    transform: rotate(-60deg);
  }

  .design3 {
    bottom: -6rem;
    left: 80%;
    -webkit-transform: rotate(20deg);
    -ms-transform: rotate(20deg);
    transform: rotate(20deg);
  }

  .design4 {
    top: 25rem;
    left: -8%;
    -webkit-transform: rotate(-35deg);
    -ms-transform: rotate(-35deg);
    transform: rotate(-35deg);
  }

  .design5 {
    top: -5rem;
    left: 50%;
    -webkit-transform: rotate(-60deg);
    -ms-transform: rotate(-60deg);
    transform: rotate(-60deg);
  }
}

body.screen--md, body.screen--lg, body.screen--xl, {
  .home-container {
    height: 100vh;
    top: -4rem
  }

  .home-toolbar {
    height: 4.5rem;
  }

  .toolbar-top {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    color: white;
    background: rgba(50, 50, 50, 0.85);
    -webkit-transition: 0.5s ease-in-out all;
    -o-transition: 0.5s ease-in-out all;
    transition: 0.5s ease-in-out all;
  }

  .site-header {
    font-family: Gellix, sans-serif;
  }

  .hero-header {
    height: 15rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 35%;
    max-width: 35rem;
    min-width: 30rem;
    font-family: Futura, sans-serif;
    -webkit-transition: ease 0.5s all;
    -o-transition: ease 0.5s all;
    transition: ease 0.5s all;
    opacity: 1;
  }

  .hero-header.vanish {
    opacity: 0
  }

  .hero-subheader {
    width: 22%;
    margin-top: 10rem;
    margin-right: 10rem;
  }

  .subheader {
    font-family: Gellix, sans-serif;
  }

  .backdrop {
    background: rgba(200, 200, 200, 0.7);
    border-radius: 16px;
    -webkit-box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(60px);
    -webkit-backdrop-filter: blur(9.2px);
    z-index: -1;
    top: 0;
  }

  .design1, .design2, .design3, .design4, .design5, .design6 {
    opacity: 1;
    position: fixed;
    border-radius: 5rem;
    height: 10rem;
    width: 40rem;
    z-index: -2;
  }

  .design1, .design2, .design3 {
    background: darkviolet;
  }

  .design4, .design5, .design6 {
    background: red;
  }

  .design1 {
    top: 25rem;
    left: -20%;
    -webkit-transform: rotate(-35deg);
    -ms-transform: rotate(-35deg);
    transform: rotate(-35deg);
  }

  .design2 {
    top: -18rem;
    left: 45%;
    -webkit-transform: rotate(-60deg);
    -ms-transform: rotate(-60deg);
    transform: rotate(-60deg);
  }

  .design3 {
    bottom: -6rem;
    left: 80%;
    -webkit-transform: rotate(20deg);
    -ms-transform: rotate(20deg);
    transform: rotate(20deg);
  }

  .design4 {
    top: 25rem;
    left: -8%;
    -webkit-transform: rotate(-35deg);
    -ms-transform: rotate(-35deg);
    transform: rotate(-35deg);
  }

  .design5 {
    top: -5rem;
    left: 50%;
    -webkit-transform: rotate(-60deg);
    -ms-transform: rotate(-60deg);
    transform: rotate(-60deg);
  }
}
</style>
