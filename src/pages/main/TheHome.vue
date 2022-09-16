<template>
  <div
    class="row justify-center items-center home-container relative-position"
    v-intersection="{handler: cardIntersect, cfg:{threshold: cardThreshold}}">
    <div
      class="row home-toolbar q-px-lg absolute-top-left full-width items-center"
      :class="{'toolbar-top': !intersecting}">
      <div class="col-6 text-h4 site-header">Oaks Lab</div>
    </div>
    <div
      class="row main-container relative-position  full-width items-center justify-center">
      <div
        class="card1 relative-position"
        :style="`left: ${cardPosition}%`">
        <div class="full-width full-height  absolute-top-left card-overlay"></div>
        <collection-card
          class="cards"
          :pokemon="card1"
          shiny-view="All Normal"></collection-card>
      </div>
      <div class="card2 relative-position">
        <div class="full-width full-height  absolute-top-left card-overlay"></div>
        <collection-card
          class="cards"
          :pokemon="card2"
          shiny-view="All Normal"></collection-card>
      </div>
      <div
        class="card3 relative-position"
        :style="`right: ${cardPosition}%`">
        <div class="full-width full-height  absolute-top-left card-overlay"></div>
        <collection-card
          class="cards"
          :pokemon="card3"
          shiny-view="All Normal"></collection-card>
      </div>
    </div>
    <div class="absolute-bottom-left hero-header text-dark  q-ma-xl text-h1">
      <div>Gotta Track<br/>'Em All</div>
    </div>
    <div class="absolute-top-right hero-subheader text-dark  q-ma-xl text-h6 text-center">
      <div
        class="subheader"
        v-intersection="buttonIntersect">Collect the way that you want to collect.
      </div>
      <div
        class="row justify-center q-ma-sm button-container"
        :class="{'top': !intersecting}">
        <q-btn
          size="md"
          :unelevated="!intersecting"
          padding="10px 32px"
          class="button q-ma-xs"
          to="/login"
          color="primary">Login
        </q-btn>
        <q-btn
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
      </div>
    </div>
  </div>
  <div class="section-1 bg-dark"></div>

  <div class="full-height full-width backdrop fixed"></div>
  <div class="design1"></div>
  <div class="design2 "></div>
  <div class="design3 "></div>
  <div class="design4 "></div>
  <div class="design5"></div>
  <div class="design6 "></div>

</template>

<script>
import collectionCard from "../collection/components/CollectionCard.vue";

export default {
  components: { collectionCard },
  mounted() {
    for (let i = 0; i <= 1.0; i += 0.01) {
      this.cardThreshold.push(i);
    }
  },
  data() {
    return {
      card1: {
        name: "Sprigatito",
        apiNo: 906,
        dexNo: 906,
        type: ["grass", undefined],
        caught: [{ shinyCaught: true, pokerusCaught: true, sixIvTimer: true }],
        need: [{ shinyCaught: true, pokerusCaught: true, sixIvTimer: true }]
      },
      card2: {
        name: "Fuecoco",
        apiNo: 909,
        dexNo: 909,
        type: ["fire", undefined],
        caught: [{ shinyCaught: true, pokerusCaught: true, sixIvTimer: true }],
        need: [{ shinyCaught: true, pokerusCaught: true, sixIvTimer: true }]
      },
      card3: {
        name: "Quaxly",
        apiNo: 912,
        dexNo: 912,
        type: ["water", undefined],
        caught: [{ shinyCaught: true, pokerusCaught: true, sixIvTimer: true }],
        need: [{ shinyCaught: true, pokerusCaught: true, sixIvTimer: true }]
      },
      card4: {
        name: "Charizard",
        apiNo: 6,
        dexNo: 6,
        type: ["fire", "flying"],
        caught: [{ shinyCaught: true, pokerusCaught: true, sixIvTimer: true }],
        need: [{ shinyCaught: true, pokerusCaught: true, sixIvTimer: true }]
      },
      intersecting: false,
      cardIntersecting: 0,
      cardThreshold: [0, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.10, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.20, 0.21, 0.22, 0.23, 0.24, 0.25, 0.26, 0.27, 0.28, 0.29, 0.30, 0.31, 0.32, 0.33, 0.34, 0.35, 0.36, 0.37, 0.38, 0.39, 0.40, 0.41, 0.42, 0.43, 0.44, 0.45, 0.46, 0.47, 0.48, 0.49, 0.50, 0.51, 0.52, 0.53, 0.54, 0.55, 0.56, 0.57, 0.58, 0.59, 0.60, 0.61, 0.62, 0.63, 0.64, 0.65, 0.66, 0.67, 0.68, 0.69, 0.70, 0.71, 0.72, 0.73, 0.74, 0.75, 0.76, 0.77, 0.78, 0.79, 0.80, 0.81, 0.82, 0.83, 0.84, 0.85, 0.86, 0.87, 0.88, 0.89, 0.90, 0.91, 0.92, 0.93, 0.94, 0.95, 0.96, 0.97, 0.98, 0.99]
    };
  },
  computed: {
    cardPosition() {
      const val = 20 - (this.cardIntersecting * 20);
      console.log(val);
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
      console.log("trigger");
    }

  }
};
</script>

<style></style>

<style
  scoped
  lang="scss">

.main-page {
  max-width: 100rem;
}

.main-container {
  max-width: 100rem;
  height: 70%;
}

.right-cards {
  position: relative;
  top: 15rem;
}

.hero-header {
  height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  max-width: 35rem;
  min-width: 30rem;
  font-family: Futura, sans-serif;
}

.site-header {
  font-family: Gellix, sans-serif;
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
  transform: rotate(-35deg);
}

.design2 {
  top: -18rem;
  left: 45%;
  transform: rotate(-60deg);
}

.design3 {
  bottom: -6rem;
  left: 80%;
  transform: rotate(20deg);
}

.design4 {
  top: 25rem;
  left: -8%;
  transform: rotate(-35deg);
}

.design5 {
  top: -5rem;
  left: 50%;
  transform: rotate(-60deg);
}


.card1, .card2, .card3 {
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: 0.5s ease all;
}

.card1 {
  transform: rotate(15deg);
  top: -10rem;
  z-index: 4;
}

.card2 {
  transform: rotate(15deg);
  z-index: 3;
}

.card3 {
  transform: rotate(15deg);
  top: 10rem;
  z-index: 2;
}


.button {
  border-radius: 0.5rem;
  font-family: Futura-Bold, sans-serif;
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
  transition: 0.5s ease-in-out all;
}

.button-container {
  position: relative;
  top: 0;
  right: 0;
  width: 100%;
  transform: translateX(0);
  z-index: 5;
}

.button-container.top {
  position: fixed;
  width: 38%;
  top: 0;
  right: 0;
  animation: slideright 0.5s 0.3s ease-in-out forwards

}

@keyframes slideright {
  to {
    width: 255px;
    position: fixed
  }

}

.home-container {
  height: 100vh;
  top: -5rem
}

.card-overlay {
  z-index: 2;
}

.section-1 {
  height: 60rem;
  width: 100%;
}

</style>
