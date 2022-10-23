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
          :model-value="caughtData.caught.sixIv && caughtData.available.sixIv || false"
          @update:model-value="setToggler('sixIv')"
          :color="pkToggleColor"
          :size="sizeCheck()"
          :icon="caughtData.available.sixIv ? 'icon-poke-six' : 'icon-misc-ban'"
          :disable="!caughtData.available.sixIv"/>
        <p class="text-body2 text-light">Six IV</p>
      </div>
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      tab: "normal",
      toggleSize: "80px",
      toggleData: {}
    };
  },
  props: { quickEditPokemon: { type: Object } },
  computed: {
    ...mapGetters({ caughtData: "collection/caughtData_Normal" }),
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
          tab: "normal",
          huntType: huntType,
          apiNo: this.quickEditPokemon.apiNo
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
