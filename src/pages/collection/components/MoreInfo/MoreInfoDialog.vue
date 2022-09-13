<!--suppress CssUnusedSymbol -->
<template>
  <!-- Mobile View -->
  <div
    v-if="!desktopCheck() && !tabletCheck()"
    class="more-info-card-cont"
    :class="desktopCheck() ? 'row items-center justify-center' : 'column justify-center'">
    <more-info-image
      :pokemonInfo="pokemonInfo"
      :selectedImage="selectedImage"></more-info-image>
    <more-info-header
      :pokemonInfo="pokemonInfo"
      @changeTabs="changeTab"></more-info-header>
    <more-info-tab-content
      :pokemonInfo="pokemonInfo"
      :tabs="tabs"></more-info-tab-content>
    <more-info-buttons
      :pokemonInfo="pokemonInfo"
      :toggleDetails="toggleDetails"></more-info-buttons>
  </div>

  <!--Desktop & Tablet Views -->
  <div
    v-if="desktopCheck() || tabletCheck()"
    class="more-info-card-cont full-width"
    :class="desktopCheck() ? 'row items-center justify-center' : 'column justify-center'">
    <more-info-image
      :pokemonInfo="pokemonInfo"
      :notCaught="notCaught"
      :selectedImage="selectedImage"></more-info-image>
    <div class="tracker-button-cont absolute-bottom-left flex justify-end">
      <q-btn
        v-if="tabletCheck() || desktopCheck()"
        class="track-button"
        color="primary"
        :size="tabletCheck() ? 'md' : 'xl'"
        :padding="tabletCheck() ? '8px': '18px'"
        label="Track"></q-btn>
    </div>
    <div class="bg-white full-height desktop-tablet-view relative-position">
      <q-btn
        class="absolute-top-left"
        color="primary"
        flat
        @click="toggleDetails()"
        :size="tabletCheck() ? 'md' : 'xl'"
        icon="fas fa-arrow-left"></q-btn>
      <h6
        v-if="tabletCheck()"
        class="text-center q-py-sm tablet-name">{{ pokemonInfo.name }}</h6>
      <div
        :class="{'row tablet-view': tabletCheck()}">
        <div class="header-panel flex justify-center">
          <more-info-header
            :pokemonInfo="pokemonInfo"
            @changeTabs="changeTab"></more-info-header>
        </div>
        <q-separator
          v-if="tabletCheck()"
          vertical
          inset></q-separator>
        <div class="information-panels flex justify-center">
          <more-info-tab-content
            :pokemonInfo="pokemonInfo"
            :tabs="tabs"></more-info-tab-content>
        </div>
      </div>
      <more-info-buttons
        :pokemonInfo="pokemonInfo"
        :toggleDetails="toggleDetails"></more-info-buttons>
    </div>

  </div>

</template>

<script>
import MoreInfoImage from "./MoreInfoImage.vue";
import MoreInfoHeader from "./MoreInfoHeader.vue";
import MoreInfoTabContent from "./MoreInfoTabContent.vue";
import MoreInfoButtons from "./MoreInfoButtons.vue";

export default {
  components: { MoreInfoButtons, MoreInfoTabContent, MoreInfoHeader, MoreInfoImage },
  props: {
    pokemonInfo: { type: Object },
    pokemonId: { type: String },
    selectedImage: { type: String },
    pkClasses: { type: String },
    close: { type: Function },
    notCaught: { type: Boolean },
    toggleDetails: { type: Function }
  },
  data() {
    return {
      tabs: "stats"
    };
  },
  methods: {
    changeTab(tab) {
      this.tabs = tab;
    },
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
@import url(../../../../css/card-styles.css);

body.screen--xs, {
  .more-info-card-cont {
    position: relative;
    height: 100%;
    width: 100%;
    max-width: 120rem;
    overflow: hidden;
    border-radius: 0.7rem;
  }

  .more-info-card {
    overflow: hidden;
    border-radius: 0.7rem;
  }
}

body.screen--sm {
  .more-info-card-cont {
    position: relative;
    max-height: 95%;
    height: 100%;
    width: 90%;
    max-width: 120rem;
    overflow: hidden;
    border-radius: 0.7rem;
  }

  .more-info-card {
    overflow: hidden;
    border-radius: 0.7rem;
  }

  .desktop-tablet-view {
    width: 75%;
    border-radius: 0.7rem 0.7rem 0.7rem 0;
    overflow: hidden;
  }

  .tablet-name {
    height: 15%;
  }

  .tablet-view {
    display: flex;
    justify-content: center;
    height: 85%;
  }

  .header-panel {
    width: 18%;
  }

  .information-panels {
    width: 79%;
  }

  .tracker-button-cont {
    width: 25%;
  }

  .track-button {
    width: 70%;
    margin: 0 0;
    border-radius: 0.3rem 0 0 0.3rem;
  }
}

body.screen--md, body.screen--lg, body.screen--xl {

  .more-info-card-cont {
    position: relative;
    height: 90%;
    width: 90%;
    max-width: 120rem;
    overflow: hidden;
    border-radius: 0.7rem;
  }

  .more-info-card {
    overflow: hidden;
    border-radius: 0.7rem;
  }

  .desktop-tablet-view {
    width: 70%;
    border-radius: 0.7rem 0.7rem 0.7rem 0;
    overflow: hidden;
  }


  .tracker-button-cont {
    width: 30%;
  }

  .track-button {
    width: 70%;
    margin: 0 0;
    border-radius: 0.3rem 0 0 0.3rem;
  }
}
</style>
