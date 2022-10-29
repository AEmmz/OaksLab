<template>
  <div
    class="green-screen-container flex full-height full-width justify-center items-center"
    :style="styleObject">
    <span
      v-if="nameActive"
      class="items-center flex q-ma-md">
      <span
        v-if="subtitlesActive"
        class="caption"
        :style="subtitleObject">Hunting:</span>
      <span>{{ name }}</span>
    </span>
    <span
      v-if="counterActive"
      class="items-center flex q-ma-md">
      <span
        v-if="subtitlesActive"
        class="caption"
        :style="subtitleObject">Count:</span>
      <span>{{ count }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: "GreenScreen",
  props: {
    count: String,
    name: String,
    counterActive: Boolean,
    pictureActive: Boolean,
    nameActive: Boolean,
    subtitlesActive: Boolean,
    styleObject: Object,
    subtitleObject: Object
  },
  data() {
    return {};
  },
  mounted() {
    console.log("counters", this.counterActive, this.pictureActive, this.nameActive);
  }
};
</script>

<style
  scoped
  lang="scss">

.green-screen-container {
  background: #00a352;
}

.caption {
  //position: relative;
  //top: 10px
}

</style>
