<template>
  <q-card
    flat
    square
    v-if="!desktopCheck()"
    class="full-width bg-primary row justify-center button-container">
    <q-btn
      class="button"
      padding="sm xl"
      size="md"
      unelevated
      icon="fas fa-paw"
      label="Track"
      color="primary"
      :to="{ name: 'tracker', params: { pkName: pokemonInfo.name.toLowerCase() }}"/>
    <q-separator
      vertical
      inset
      dark></q-separator>
    <q-btn
      class="button"
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
      return this.$q.screen.gt.sm;
    }
  }
};
</script>

<style
  scoped
  lang="scss">

.button-container {
  font-family: Futura, sans-serif;
  height: 8%;
}

.button {
  width: 49%;
}

a {
  text-decoration: none;
}

</style>
