<template>
  <div
    class="section-1  justify-center items-center"
    :class="[{'shifted':cardIntersecting <= 0.75}, desktopCheck() ? 'row' : 'column']">
    <div
      class="col-4 row column items-center text-center"
      :class="desktopCheck() ? 'text-light' : 'text-dark shadow-1'">
      <div
        class="track-header  text-h2"
        :class="desktopCheck() ? '' : 'q-mt-md'">Track 'Em All
      </div>
      <q-carousel
        v-if="desktopCheck()"
        v-model="trackerCarousel"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        padding
        navigation
        control-text-color="dark"
        class="carousel-1 full-height shadow-8">
        <q-carousel-slide
          name="trackerSlide1"
          class="q-pa-xs">
          <q-img
            class="feature-image"
            :ratio="1"
            :src="slide1F1"/>
        </q-carousel-slide>
        <q-carousel-slide
          name="trackerSlide2"
          class="q-pa-xs">
          <q-img
            class="feature-image"
            :ratio="1"
            :src="slide1F2"/>
        </q-carousel-slide>
      </q-carousel>
      <q-carousel
        v-model="trackerCarousel"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        padding
        :navigation="!desktopCheck()"
        class="carousel-text bg-transparent">
        <q-carousel-slide
          name="trackerSlide1"
          class="flex items-center justify-center">
          <q-icon
            v-if="!desktopCheck()"
            name="icon-poke-pokeball"
            size="md"/>
          <h6>Over a dozen different ways to track and more on the way.</h6>
        </q-carousel-slide>
        <q-carousel-slide
          name="trackerSlide2"
          class="flex items-center">
          <h6>Keep track of your encounters and time with individual counters for all of your
            hunts.</h6>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <q-separator
      v-if="!desktopCheck()"
      inset
      class="separator q-my-lg"></q-separator>

    <div
      class="col-4 row column items-center text-center"
      :class="desktopCheck() ? 'text-light' : 'text-dark bg-fireType shadow-1'">
      <div
        class="text-h2 track-header"
        :class="desktopCheck() ? '' : 'q-mt-md'">Collect 'Em All
      </div>
      <q-carousel
        v-if="desktopCheck()"
        v-model="collectionCarousel"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        padding
        navigation
        control-text-color="dark"
        class="carousel-2 full-height "
        :class="desktopCheck() ? 'shadow-8' : ''">
        <q-carousel-slide
          name="collectionSlide1"
          class="q-pa-xs">
          <q-img
            class="feature-image"
            :ratio="1"
            :src="slide2F1"/>
        </q-carousel-slide>
      </q-carousel>
      <q-carousel
        v-model="collectionCarousel"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        padding
        :navigation="!desktopCheck()"
        class="bg-transparent carousel-text">
        <q-carousel-slide
          name="collectionSlide1"
          class="flex items-center">
          <h6>View and manage your own collection with 1200+ different Pokemon and forms.</h6>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <q-separator
      v-if="!desktopCheck()"
      inset
      class="separator q-my-lg"></q-separator>

    <div
      class="col-4 row column items-center text-center"
      :class="desktopCheck() ? 'text-light' : 'text-dark bg-waterType shadow-1'">
      <div
        class="text-h2 track-header"
        :class="desktopCheck() ? '' : 'q-mt-md'">Master 'Em All
      </div>
      <q-carousel
        v-if="desktopCheck()"
        v-model="masterCarousel"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        padding
        :navigation="desktopCheck()"
        control-text-color="dark"
        class="carousel-3 full-height "
        :class="desktopCheck() ? 'shadow-8' : ''">
        <q-carousel-slide
          name="masterSlide1"
          class="q-pa-xs">
          <q-img
            class="feature-image"
            :ratio="1"
            :src="slide3F1"/>
        </q-carousel-slide>
      </q-carousel>
      <q-carousel
        v-model="masterCarousel"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        padding
        :navigation="!desktopCheck()"

        class="bg-transparent carousel-text">
        <q-carousel-slide
          name="masterSlide1"
          class="flex items-center">
          <h6>How is your collection going? Find the answer with dozens of stats about your collection.</h6>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeatureCarousels",
  props: { "card-intersecting": { type: Number } },
  data() {
    return {
      trackerCarousel: "trackerSlide1",
      slide1F1: "https://ik.imagekit.io/kw2qoeib2/ImageAssets/Feature_1.PNG?ik-sdk-version=javascript-1.4.3&updatedAt=1663356178378",
      slide1F2: "https://ik.imagekit.io/kw2qoeib2/ImageAssets/Feature_1-2.PNG?ik-sdk-version=javascript-1.4.3&updatedAt=1663361877114",
      collectionCarousel: "collectionSlide1",
      slide2F1: "https://ik.imagekit.io/kw2qoeib2/ImageAssets/Feature_2.PNG?ik-sdk-version=javascript-1.4.3&updatedAt=1663361732521",
      masterCarousel: "masterSlide1",
      slide3F1: "https://ik.imagekit.io/kw2qoeib2/ImageAssets/Feature_1.PNG?ik-sdk-version=javascript-1.4.3&updatedAt=1663356178378"
    };
  },
  methods: {
    desktopCheck() {
      return this.$q.screen.gt.xs;
    }
  }
};
</script>

<style
  scoped
  lang="scss">

body.screen--xs, body.screen--sm {

  .track-header {
    margin-bottom: 1rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-family: Futura, sans-serif;
  }

  .separator {
    width: 70%;
    height: 2px
  }

  .carousel-1,
  .carousel-2,
  .carousel-3 {
    width: 70%;
    border-radius: 1rem;
    overflow: hidden;
  }

  .carousel-1 {
    background: transparent;
  }

  .carousel-2 {
    background: transparent;
  }

  .carousel-3 {
    background: transparent;
  }

  .feature-image {
    border-radius: 1rem;
  }

  .carousel-text {
    display: flex;
    align-items: center;
    height: 200px;
    width: 80%;
    font-family: Gellix, sans-serif;
  }
}

body.screen--md, body.screen--lg, body.screen--xl, {
  .section-1 {
    height: 100vh;
    width: 100%;
    -webkit-transition: 0.5s ease all;
    -o-transition: 0.5s ease all;
    transition: 0.5s ease all;
    background: rgba(0, 0, 0, 0.6);
    opacity: 0;
  }

  .section-1.shifted {
    opacity: 1;
  }

  .track-header {
    margin: 0 0 1rem 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 35%;
    max-width: 35rem;
    min-width: 30rem;
    font-family: Futura, sans-serif;
  }

  .carousel-1,
  .carousel-2,
  .carousel-3 {
    width: 70%;
    border-radius: 2rem;
    overflow: hidden;
  }

  .carousel-1 {
    background: $grassType;
  }

  .carousel-2 {
    background: $fireType;
  }

  .carousel-3 {
    background: $waterType;
  }

  .feature-image {
    border-radius: 2rem;
  }

  .carousel-text {
    height: 130px;
    width: 70%;
    font-family: Gellix, sans-serif;
  }
}
</style>
