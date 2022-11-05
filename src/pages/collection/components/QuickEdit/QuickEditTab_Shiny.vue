<template>
  <div class="quick-edit-card-cont relative-position">
    <q-card class="bg-dark toggle-cont flex justify-around q-pa-md ">
      <div class="toggle q-my-md flex column items-center">
        <q-toggle
          :model-value="caughtData.caught.shiny && caughtData.available.shiny || false"
          @update:model-value="setToggler('shiny')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="caughtData.available.shiny ? 'icon-poke-shiny' : 'icon-misc-ban'"
          :disable="!caughtData.available.shiny"/>
        <p class="text-body2 text-light">Shiny</p>
      </div>
      <div class="toggle q-my-md flex column items-center">
        <q-toggle
          :model-value="caughtData.caught.shinyAlpha && caughtData.available.shinyAlpha || false"
          @update:model-value="setToggler('shinyAlpha')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="caughtData.available.shinyAlpha ? 'icon-poke-alpha-shiny' : 'icon-misc-ban'"
          :disable="!caughtData.available.shinyAlpha"/>
        <p class="text-body2 text-light">Shiny Alpha</p>
      </div>
      <div class="toggle q-my-md flex column items-center">
        <q-toggle
          :model-value="caughtData.caught.shinyMarked && caughtData.available.shinyMarked || false"
          @update:model-value="setToggler('shinyMarked')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="caughtData.available.shinyMarked ? 'icon-poke-marked-shiny' : 'icon-misc-ban'"
          :disable="!caughtData.available.shinyMarked"/>
        <p class="text-body2 text-light">Shiny Marked</p>
      </div>
      <div class="toggle q-my-md flex column items-center">
        <q-toggle
          :model-value="caughtData.caught.shinyPokerus && caughtData.available.shinyPokerus|| false"
          @update:model-value="setToggler('shinyPokerus')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="caughtData.available.shinyPokerus ? 'icon-poke-pokerus-shiny' : 'icon-misc-ban'"
          :disable="!caughtData.available.shinyPokerus"/>
        <p class="text-body2 text-light">Shiny Pokerus</p>
      </div>
      <div class="toggle q-my-md flex column items-center">
        <q-toggle
          :model-value="caughtData.caught.shinyZeroIv && caughtData.available.shinyZeroIv || false"
          @update:model-value="setToggler('shinyZeroIv')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="caughtData.available.shinyZeroIv ? 'icon-poke-zero-shiny' : 'icon-misc-ban'"
          :disable="!caughtData.available.shinyZeroIv"/>
        <p class="text-body2 text-light">Shiny Zero IV</p>
      </div>
      <div class="toggle q-my-md flex column items-center">
        <q-toggle
          :model-value="caughtData.caught.shinySixIv && caughtData.available.shinySixIv || false"
          @update:model-value="setToggler('shinySixIv')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="caughtData.available.shinySixIv ? 'icon-poke-six-shiny' : 'icon-misc-ban'"
          :disable="!caughtData.available.shinySixIv"/>
        <p class="text-body2 text-light">Shiny Six IV</p>
      </div>

    </q-card>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      tab: "normal",
      toggleSize: "80px"
    };
  },
  props: {quickEditPokemon: {type: Object}},
  computed: {
    ...mapGetters({caughtData: "collection/caughtData_Shiny"}),
    pkToggleColor() {
      return `${this.quickEditPokemon.type[0]}Type`;
    },
    pkIsActive() {
      return this.quickEditPokemon.apiNo !== "";
    }
  },
  methods: {
    ...mapActions("collection", ["quickEditToggler", "quickEditCaughtCheck"]),
    async setToggler(huntType) {
      if (this.pkIsActive) {
        await this.quickEditToggler({
          tab: "shiny",
          huntType: huntType,
          pokemon: this.quickEditPokemon,
        });
      }
    },
    sizeCheck() {
      return this.$q.screen.md ? "63px" : "80px";
    }
  }
};
</script>

<style
  scoped
  lang="scss">

.panels {
  margin: 0;
  padding: 0;
}

body.screen--xs, body.screen--sm {
  .quick-edit-card-cont {
    position: relative;
    max-height: 85%;
    width: 100%;
  }

  .toggles-cont {
    max-height: 78% !important;
  }
}

body.screen--sm {
  .quick-edit-card-cont {
    top: -2rem;
  }
}

body.screen--md, body.screen--lg, body.screen--lx {
  .close-button {
    transform: translateY(2rem);
  }
}

</style>
