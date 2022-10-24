<template>
  <div
    class="row main-container relative-position  full-width items-center justify-center">
    <div
      class="card1 relative-position"
      :style="`left: ${cardPosition}%`">
      <div class="full-width full-height  absolute-top-left card-overlay"></div>
      <collection-card
        :pokemon="card1"
        shiny-view="All Normal"></collection-card>
    </div>
    <div class="card2 relative-position">
      <div class="full-width full-height  absolute-top-left card-overlay"></div>
      <collection-card
        :pokemon="card2"
        shiny-view="All Normal"></collection-card>
    </div>
    <div
      class="card3 relative-position"
      :style="`right: ${cardPosition}%`">
      <div class="full-width full-height  absolute-top-left card-overlay"></div>
      <collection-card
        :pokemon="card3"
        shiny-view="All Normal"></collection-card>
    </div>
  </div>
</template>

<script>
import collectionCard from "../../collection/components/CollectionCard.vue";

export default {
  name: "HeroCards",
  components: { collectionCard },
  props: { "card-position": { type: Number } },
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
      }
    };
  }
};
</script>

<style
  scoped
  lang="scss">

body.screen--md, body.screen--lg, body.screen--xl, {
  .main-container {
    max-width: 100rem;
    height: 70%;
  }

  .card-overlay {
    z-index: 2;
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
}

</style>
