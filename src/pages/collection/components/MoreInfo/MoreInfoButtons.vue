<template>
  <q-card
    flat
    square
    v-if="!desktopCheck() && !tabletCheck()"
    class="full-width bg-primary row justify-center button-container">
    <router-link
      :to="{
							name: 'tracker',
							params: { pkName: pokemonInfo.name.toLowerCase() },
						}"
      class="track-button-cont full-height">
      <q-btn
        class="full-height"
        padding="sm xl"
        size="md"
        unelevated
        icon="fas fa-paw"
        label="Track"
        color="primary"/>
    </router-link>
    <q-separator
      vertical
      inset
      dark></q-separator>
    <q-btn
      padding="sm xl"
      size="md"
      unelevated
      icon="fas fa-xmark"
      label="Close"
      color="primary"
      @click="toggleDetails()"/>
  </q-card>
</template>

<script>
export default {
  name: "MoreInfoButtons",
  props: { pokemonInfo: { type: Object }, toggleDetails: { type: Function } },
  methods: {
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

.button-container {
  font-family: Futura, sans-serif;
}

body.screen--xs {
  .button-container {
    height: 8%;
  }

  a {
    text-decoration: none;
  }
}

</style>
