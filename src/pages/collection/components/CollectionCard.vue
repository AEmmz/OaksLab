<!--suppress CssUnusedSymbol -->
<template>
  <q-dialog v-model="details">
    <more-info
      :pokemonInfo="pokemon"
      :pokemonId="pokemon.dexNo"
      :selectedImage="selectedImage"
      :pkClasses="pkClasses"
      :close="close"
      :notCaught="deactivated"></more-info>
  </q-dialog>

  <div
    class="card-cont"
    @mouseenter="flipToBack"
    @mouseleave="flipToFront">
    <q-card
      class="card card-front"
      :class="[`bg-${pokemon.type[0]}Type`, { flipped: flipped, notCaught: deactivated }]">
      <div class="background-type-icon flex justify-center items-center full-height absolute-center">
        <q-icon
          :name="`icon-type-2-${pokemon.type[0]}`"
          color="white"
          class="type-icon"
          size="250px"></q-icon>
      </div>
      <div class="card-front-number absolute-top-right q-pr-sm">
        <h6>{{ pokemon.dexNo }}</h6>
      </div>
      <div class="card-front-name">
        <fit-text class="name">
          {{ pokemon.name }}
        </fit-text>
      </div>
      <div class="flex items-end full-height">
        <q-img
          class="card-image"
          :src="selectedImage"
          :alt="`${pokemon.name}-Image`"
          :class="[{ 'disabled-image': deactivated }, pkClasses]"
          style="min-width: 250px"></q-img>
      </div>
    </q-card>

    <q-card
      class="card card-back absolute-top-left"
      :class="[`bg-${pokemon.type[0]}Type`, { flipped: !flipped, notCaught: deactivated }]">
      <div class="card-back-info-cont column items-center q-px-xs absolute-center bg-light">
        <div class="card-back-name col flex items-center justify-center">
          <fit-text-alt class="name">
            {{ pokemon.name }}
          </fit-text-alt>
        </div>
        <div class="card-back-info col-8 full-width column">
          <q-separator inset/>
          <div class="q-ma-xs col column items-center justify-center">
            <span class="card-back-subtitle text-subtitle2 q-pb-xs">Caught</span>
            <div class="icons flex justify-center q-gutter-xs">
              <q-icon
                v-if="pokemon.caught[0].normalCaught"
                size="xs"
                name="icon-poke-pokeball"/>
              <q-icon
                v-if="pokemon.caught[0].shinyCaught"
                size="xs"
                name="icon-poke-shiny"/>
              <q-icon
                v-if="pokemon.caught[0].alphaCaught"
                size="xs"
                name="icon-poke-alpha"/>
              <q-icon
                v-if="pokemon.caught[0].shinyAlphaCaught"
                size="xs"
                name="icon-poke-alpha-shiny"/>
              <q-icon
                v-if="pokemon.caught[0].pokerusCaught"
                size="xs"
                name="icon-poke-pokerus"/>
              <q-icon
                v-if="pokemon.caught[0].shinyPokerusCaught"
                size="xs"
                name="icon-poke-pokerus-shiny"/>
              <q-icon
                v-if="pokemon.caught[0].markedCaught"
                size="xs"
                name="icon-poke-marked"/>
              <q-icon
                v-if="pokemon.caught[0].shinyMarkedCaught"
                size="xs"
                name="icon-poke-marked-shiny"/>
              <q-icon
                v-if="pokemon.caught[0].sixIvCaught"
                size="xs"
                name="icon-poke-six"/>
              <q-icon
                v-if="pokemon.caught[0].shinySixIvCaught"
                size="xs"
                name="icon-poke-six-shiny"/>
              <q-icon
                v-if="pokemon.caught[0].zeroIvCaught"
                size="xs"
                name="icon-poke-zero"/>
              <q-icon
                v-if="pokemon.caught[0].shinyZeroIvCaught"
                size="xs"
                name="icon-poke-zero-shiny"/>
            </div>
          </div>
          <q-separator inset/>
          <div class="q-ma-xs col column items-center justify-center q-pb-xs">
            <span class="card-back-subtitle text-subtitle2">Uncaught</span>
            <div class="icons flex justify-center q-gutter-xs">
              <q-icon
                v-if="!pokemon.caught[0].normalCaught"
                size="xs"
                name="icon-poke-pokeball"/>
              <q-icon
                v-if="!pokemon.caught[0].shinyCaught"
                size="xs"
                name="icon-poke-shiny"/>
              <q-icon
                v-if="!pokemon.caught[0].alphaCaught"
                size="xs"
                name="icon-poke-alpha"/>
              <q-icon
                v-if="!pokemon.caught[0].shinyAlphaCaught"
                size="xs"
                name="icon-poke-alpha-shiny"/>
              <q-icon
                v-if="!pokemon.caught[0].pokerusCaught"
                size="xs"
                name="icon-poke-pokerus"/>
              <q-icon
                v-if="!pokemon.caught[0].shinyPokerusCaught"
                size="xs"
                name="icon-poke-pokerus-shiny"/>
              <q-icon
                v-if="!pokemon.caught[0].markedCaught"
                size="xs"
                name="icon-poke-marked"/>
              <q-icon
                v-if="!pokemon.caught[0].shinyMarkedCaught"
                size="xs"
                name="icon-poke-marked-shiny"/>
              <q-icon
                v-if="!pokemon.caught[0].sixIvCaught"
                size="xs"
                name="icon-poke-six"/>
              <q-icon
                v-if="!pokemon.caught[0].shinySixIvCaught"
                size="xs"
                name="icon-poke-six-shiny"/>
              <q-icon
                v-if="!pokemon.caught[0].zeroIvCaught"
                size="xs"
                name="icon-poke-zero"/>
              <q-icon
                v-if="!pokemon.caught[0].shinyZeroIvCaught"
                size="xs"
                name="icon-poke-zero-shiny"/>
            </div>
          </div>
          <q-separator inset/>
        </div>

        <div class="card-back-buttons column items-center justify-center col-2 full-width">
          <router-link
            :to="{
							name: 'tracking',
							params: { pkName: pokemon.name.toLowerCase() },
						}"
            class="track-button-cont">
            <q-btn
              round
              class="q-ma-xs"
              size="sm"
              color="primary"
              icon="fas fa-paw">
              <q-tooltip class="text-body1">Track</q-tooltip>
            </q-btn>
          </router-link>
          <q-btn
            round
            class="q-ma-xs"
            size="sm"
            color="primary"
            icon="fas fa-info"
            @click="details = true">
            <q-tooltip class="text-body1">More Info</q-tooltip>
          </q-btn>
          <q-btn
            round
            class="q-ma-xs"
            size="sm"
            color="primary"
            icon="fas fa-pen">
            <q-tooltip class="text-body1">Quick Edit</q-tooltip>
          </q-btn>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import FitText from "../../../components/ui/FitText/FitText.vue";
import FitTextAlt from "../../../components/ui/FitText/FitText-Alt.vue";
import MoreInfo from "./CollectionMoreInfo.vue";

export default {
  components: { FitText, FitTextAlt, MoreInfo },
  props: {
    pokemon: { type: Object }, shinyView: { type: String }
  },
  data() {
    return {
      flipped: false,
      details: false,
      edit: false
    };
  },
  computed: {
    selectedImage() {
      if (this.shinyView === "All Shiny") {
        return `https://ik.imagekit.io/kw2qoeib2/Home-Shiny/${this.pokemon.apiNo}.png`;
      }
      if (this.shinyView === "Shiny Caught") {
        const shiny = this.pokemon.caught[0].shinyCaught ? "Home-Shiny" : "Home-Normal";
        return `https://ik.imagekit.io/kw2qoeib2/${shiny}/${this.pokemon.apiNo}.png`;
      }
      return `https://ik.imagekit.io/kw2qoeib2/Home-Normal/${this.pokemon.apiNo}.png`;
    },
    deactivated() {
      const pkmn = Object.values(this.pokemon.caught[0]);
      return pkmn.every((p) => p !== true);
    },
    pkClasses() {
      return this.pokemon.name
        .toLowerCase()
        .replaceAll(" ", "-")
        .replaceAll(".", "")
        .replaceAll("'", "")
        .replaceAll(":", "")
        .replaceAll("?", "ques")
        .replaceAll("!", "excl");
    }
  },
  methods: {
    flipToFront() {
      setTimeout(() => {
        this.flipped = false;
      }, 450);
    },
    flipToBack() {
      setTimeout(() => {
        this.flipped = true;
      }, 200);
    },
    close() {
      this.details = false;
    }
  }
};
</script>

<!--suppress CssUnusedSymbol, CssUnusedSymbol -->
<style scoped>
@import url(../../../css/card-styles.css);

.card-cont {
  position: relative;
}

.card {
  height: 20rem;
  width: 12rem;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 400ms ease-in-out;
  backface-visibility: hidden;
}

.flipped {
  transform: rotatey(180deg);
}

.type-icon {
  opacity: 0.15;
}

.card-front-name {
  display: block;
  position: absolute;
  text-align: left;
  top: 3rem;
  left: -0.5rem;
  height: 8rem;
  width: 15rem;
  transform: rotate(-90deg) translate(-107%, 0);
  transform-origin: 0 0;
  opacity: 50%;
}

.card-back-name {
  text-align: center;
  height: 5rem;
  width: 10rem;
  opacity: 70%;
}

.card-back-info-cont {
  height: 19.5rem;
  width: 11.5rem;
}

.card-front-number {
  opacity: 50%;
}

.card-back-subtitle,
.icons {
  opacity: 70%;
}

.notCaught {
  filter: grayscale(1) brightness(0.7);
}

.disabled-image {
  filter: brightness(0.3);
}
</style>
