<template>
  <q-card
    class="information-container items-center justify-center"
    :class="desktopCheck() ? '' : 'full-width'"
    :square="!desktopCheck()"
    flat>
    <div class="column">
      <div class="information-panels">
        <q-tab-panels
          v-model="selectedTab"
          class="full-width "
          animated>
          <q-tab-panel name="stats">
            <div class="text-h6">Stats</div>
            Coming Soon
          </q-tab-panel>

          <q-tab-panel
            name="caught"
            class="full-width items-center">
            <div class="row justify-center full-width ">
              <div
                class="col-3 column items-center text-center"
                v-if="pokemonInfo.caught[0].normalCaught">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-pokeball"
                  size="md"></q-icon>
                Caught
              </div>
              <div
                class="col-3 column items-center text-center"
                v-if="pokemonInfo.caught[0].shinyCaught && statusLock.shinyAvailable">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-shiny"
                  size="md"></q-icon>
                Shiny
              </div>
              <div
                class="col-3 column items-center text-center"
                v-if="pokemonInfo.caught[0].alphaCaught && statusLock.alphaAvailable">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-alpha"
                  size="md"></q-icon>
                Alpha
              </div>
              <div
                class="col-3 column items-center text-center"
                v-if="pokemonInfo.caught[0].shinyAlphaCaught && statusLock.shinyAlphaAvailable">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-alpha-shiny"
                  size="md"></q-icon>
                Shiny Alpha
              </div>
              <div
                class="col-3 column items-center text-center"
                v-if="pokemonInfo.caught[0].pokerusCaught">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-pokerus"
                  size="md"></q-icon>
                Pokerus
              </div>
              <div
                class="col-3 column items-center text-center"
                v-if="pokemonInfo.caught[0].shinyPokerusCaught">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-pokerus-shiny"
                  size="md"></q-icon>
                Shiny Pokerus
              </div>
              <div
                class="col-3 column items-center text-center"
                v-if="pokemonInfo.caught[0].markedCaught && statusLock.markedAvailable">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-marked"
                  size="md"></q-icon>
                Marked
              </div>
              <div
                class="col-3 column items-center text-center"
                v-if="pokemonInfo.caught[0].shinyMarkedCaught && statusLock.shinyMarkedAvailable">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-marked-shiny"
                  size="md"></q-icon>
                Shiny Marked
              </div>
              <div
                class="col-3 column items-center text-center"
                v-if="pokemonInfo.caught[0].sixIvCaught">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-six"
                  size="md"></q-icon>
                Six IV
              </div>
              <div
                class="col-3 column items-center text-center"
                v-if="pokemonInfo.caught[0].shinySixIvCaught">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-six-shiny"
                  size="md"></q-icon>
                Shiny Six IV
              </div>
              <div
                class="col-3 column items-center text-center"
                v-if="pokemonInfo.caught[0].zeroIvCaught">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-zero"
                  size="md"></q-icon>
                Zero IV
              </div>
              <div
                class="col-3 column items-center text-center"
                v-if="pokemonInfo.caught[0].shinyZeroIvCaught">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-zero-shiny"
                  size="md"></q-icon>
                Shiny Zero IV
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="uncaught">
            <div class="row justify-center full-width ">
              <div
                class="col-3 column items-center text-center"
                v-if="!pokemonInfo.caught[0].normalCaught">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-pokeball"
                  size="md"></q-icon>
                Caught
              </div>
              <div
                class="col-3 column items-center text-center"
                v-if="!pokemonInfo.caught[0].shinyCaught && statusLock.shinyAvailable">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-shiny"
                  size="md"></q-icon>
                Shiny
              </div>
              <div
                class="col-3 column items-center text-center"
                v-if="!pokemonInfo.caught[0].alphaCaught && statusLock.alphaAvailable">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-alpha"
                  size="md"></q-icon>
                Alpha
              </div>
              <div
                class="col-3 column items-center text-center"
                v-if="!pokemonInfo.caught[0].shinyAlphaCaught && statusLock.shinyAlphaAvailable">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-alpha-shiny"
                  size="md"></q-icon>
                Shiny Alpha
              </div>
              <div
                class="col-3 column items-center text-center"
                v-if="!pokemonInfo.caught[0].pokerusCaught">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-pokerus"
                  size="md"></q-icon>
                Pokerus
              </div>
              <div
                class="col-3 column items-center text-center"
                v-if="!pokemonInfo.caught[0].shinyPokerusCaught">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-pokerus-shiny"
                  size="md"></q-icon>
                Shiny Pokerus
              </div>
              <div
                class="col-3 column items-center text-center"
                v-if="!pokemonInfo.caught[0].markedCaught && statusLock.markedAvailable">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-marked"
                  size="md"></q-icon>
                Marked
              </div>
              <div
                class="col-3 column items-center text-center"
                v-if="!pokemonInfo.caught[0].shinyMarkedCaught && statusLock.shinyMarkedAvailable">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-marked-shiny"
                  size="md"></q-icon>
                Shiny Marked
              </div>
              <div
                class="col-3 column items-center text-center"
                v-if="!pokemonInfo.caught[0].sixIvCaught">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-six"
                  size="md"></q-icon>
                Six IV
              </div>
              <div
                class="col-3 column items-center text-center"
                v-if="!pokemonInfo.caught[0].shinySixIvCaught">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-six-shiny"
                  size="md"></q-icon>
                Shiny Six IV
              </div>
              <div
                class="col-3 column items-center text-center"
                v-if="!pokemonInfo.caught[0].zeroIvCaught">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-zero"
                  size="md"></q-icon>
                Zero IV
              </div>
              <div
                class="col-3 column items-center text-center"
                v-if="!pokemonInfo.caught[0].shinyZeroIvCaught">
                <q-icon
                  class="q-pt-md q-pb-xs"
                  color="dark"
                  name="icon-poke-zero-shiny"
                  size="md"></q-icon>
                Shiny Zero IV
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "MoreInfoTabContent",
  async mounted() {
    this.statusLock = await this.lockCheck(this.pokemonInfo.apiNo);
  },
  props: {
    pokemonInfo: { type: Object },
    tabs: { type: String }
  },
  data() {
    return {
      statusLock: {
        shinyAvailable: true,
        alphaAvailable: true,
        shinyAlphaAvailable: true,
        markedAvailable: true,
        shinyMarkedAvailable: true
      }
    };
  },
  computed: {
    selectedTab() {
      return this.tabs;
    }
  },
  methods: {
    ...mapActions("collection", ["lockCheck"]),
    desktopCheck() {
      return this.$q.screen.gt.xs;
    },
    tabletCheck() {
      return this.$q.screen.sm;
    }
  }
};
</script>

<style
  scoped
  lang="scss">

.information-panels {
  font-family: Gellix, sans-serif;
}

body.screen--xs {
  .information-container {
    overflow: scroll;
    height: 47%;
  }

  .information-panels {
    height: 10%;
    overflow-y: hidden;
  }
}

body.screen--sm {
  .information-container {
    border-radius: 0.7rem;
    height: 100%;
    width: 100%;
  }
}

body.screen--md, body.screen--lg, body.screen--xl {
  .information-container {
    border-radius: 0.7rem;
    min-width: 87%;
  }
}

</style>
