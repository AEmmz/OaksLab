<template>
  <div class="quick-edit-card-cont relative-position">
    <q-card class="bg-dark toggle-cont flex justify-around q-pa-md ">
      <div class="toggle q-my-md flex column items-center">
        <q-toggle
          :model-value="caughtData.caught.normal && caughtData.available.normal || false"
          @update:model-value="setToggler('normal')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="caughtData.available.normal ? 'icon-poke-pokeball' : 'icon-misc-ban'"
          :disable="!caughtData.available.normal"/>
        <p class="text-body2 text-light">Normal</p>
      </div>
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
          :model-value="caughtData.caught.alpha && caughtData.available.alpha || false"
          @update:model-value="setToggler('alpha')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="caughtData.available.alpha ? 'icon-poke-alpha' : 'icon-misc-ban'"
          :disable="!caughtData.available.alpha"/>
        <p class="text-body2 text-light">Alpha</p>
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
          :model-value="caughtData.caught.marked && caughtData.available.marked || false"
          @update:model-value="setToggler('marked')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="caughtData.available.marked ? 'icon-poke-marked' : 'icon-misc-ban'"
          :disable="!caughtData.available.marked"/>
        <p class="text-body2 text-light">Marked</p>
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
          :model-value="caughtData.caught.pokerus && caughtData.available.pokerus || false"
          @update:model-value="setToggler('pokerus')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="caughtData.available.pokerus ? 'icon-poke-pokerus' : 'icon-misc-ban'"
          :disable="!caughtData.available.pokerus"/>
        <p class="text-body2 text-light">Pokerus</p>
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
          :model-value="caughtData.caught.zeroIv && caughtData.available.zeroIv || false"
          @update:model-value="setToggler('zeroIv')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="caughtData.available.zeroIv ? 'icon-poke-zero' : 'icon-misc-ban'"
          :disable="!caughtData.available.zeroIv"/>
        <p class="text-body2 text-light">Zero IV</p>
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
          :model-value="caughtData.caught.sixIv && caughtData.available.sixIv || false"
          @update:model-value="setToggler('sixIv')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="caughtData.available.sixIv ? 'icon-poke-six' : 'icon-misc-ban'"
          :disable="!caughtData.available.sixIv"/>
        <p class="text-body2 text-light">Six IV</p>
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
      <div
        class="full-width flex justify-center gt-sm">
        <q-btn
          @click="$emit('closeEditDialog')"
          class="col-12"
          color="primary"
          size="lg"
          label="Close"></q-btn>
      </div>
    </q-card>

    <q-page-sticky
      class="lt-md"
      position="bottom"
      :offset="[18,20]">
      <q-btn
        @click="$emit('closeEditDialog')"
        vertical-actions-align="right"
        color="primary"
        size="1rem"
        label="Close"></q-btn>
    </q-page-sticky>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  async mounted() {
    this.caughtData = await this.quickEditCaughtCheck(this.quickEditPokemon);
  },
  data() {
    return {
      toggleSize: "80px",
      caughtData: {
        caught: {
          normal: false,
          shiny: false,
          alpha: false,
          shinyAlpha: false,
          pokerus: false,
          shinyPokerus: false,
          marked: false,
          shinyMarked: false,
          zeroIv: false,
          shinyZeroIv: false,
          sixIv: false,
          shinySixIv: false
        },
        available: {
          normal: false,
          shiny: false,
          alpha: false,
          shinyAlpha: false,
          pokerus: false,
          shinyPokerus: false,
          marked: false,
          shinyMarked: false,
          zeroIv: false,
          shinyZeroIv: false,
          sixIv: false,
          shinySixIv: false
        }
      }
    };
  },
  props: { quickEditPokemon: { type: Object, required: false } },
  computed: {
    pkToggleColor() {
      return `${this.quickEditPokemon.type[0]}Type`;
    },
    pkIsActive() {
      return this.quickEditPokemon.apiNo !== "";
    }
  },
  methods: {
    ...mapActions("collection", ["quickEditToggler", "quickEditCaughtCheck"]),
    setToggler(huntType) {
      if (this.pkIsActive) {
        console.log("hit1");
        this.caughtData.caught[huntType] = !this.caughtData.caught[huntType];
        console.log(this.caughtData.caught.normal);
        this.quickEditToggler({ huntType: huntType, apiNo: this.quickEditPokemon.apiNo, caughtData: this.caughtData });
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

body.screen--xs, body.screen--sm {
  .quick-edit-card-cont {
    position: relative;
    height: 85%;
    width: 100%;
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

* {
  font-family: Gellix, sans-serif;
}

.toggle {
  text-align: center;
}

.toggle > > > .q-toggle__inner--truthy .q-toggle__track {
  box-shadow: 0 0 15px 1px currentColor;
}

.toggle > > > .disabled .q-toggle__inner .q-toggle__thumb:after {
  background: rgb(63, 63, 63);
}

.toggle > > > .disabled .q-toggle__inner .q-toggle__thumb i {
  color: #fff;
  opacity: 0.54;
}

.toggle > > > .disabled .q-toggle__inner .q-toggle__track {
  color: #000;
}

.toggle > > > .disabled .q-toggle__inner .q-toggle__thumb {
  left: 0.45em;
}

.toggle > > > .q-toggle__inner--indet .q-toggle__thumb:after,
.toggle > > > .q-toggle__inner--falsy .q-toggle__thumb:after {
  background: rgb(126, 126, 126);
}
</style>
