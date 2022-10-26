<template>
  <div
    class="section-1 justify-center items-center"
    :class="[{'shifted':cardIntersecting <= 0.75}, desktopCheck() ? 'row' : 'column']">
    <div
      class="col-4 row column items-center text-center"
      :class="desktopCheck() ? 'text-light' : 'text-dark'">
      <div
        class="relative-position mobile-img-container"
        v-if="!desktopCheck()">
        <q-img
          width="150px"
          src="https://ik.imagekit.io/kw2qoeib2/ImageAssets/TrackerPhone.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663631555618"/>
        <q-img
          class="absolute-bottom-right pokemon-1"
          width="150px"
          src="https://ik.imagekit.io/kw2qoeib2/Home-Normal/906.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663189443688"/>
      </div>
      <div
        class="track-header"
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
        swipeable
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
        <q-carousel-slide
          name="trackerSlide3"
          class="q-pa-xs">
          <q-img
            class="feature-image"
            :ratio="1"
            :src="slide1F3"/>
        </q-carousel-slide>
      </q-carousel>
      <q-carousel
        v-model="trackerCarousel"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        padding
        swipeable
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
          class="flex items-center justify-center">
          <q-icon
            class="q-pa-md"
            v-if="!desktopCheck()"
            name="fas fa-clock"
            size="sm"/>
          <h6>Keep track of your encounters and time with individual counters for all of your
            hunts.</h6>
        </q-carousel-slide>
        <q-carousel-slide
          name="trackerSlide3"
          class="flex items-center justify-center">
          <q-icon
            class="q-pa-md"
            v-if="!desktopCheck()"
            name="fas fa-paw"
            size="sm"/>
          <h6>Track forms including Gigantamax, Mega and Regional. Terrastal & Gender forms coming soon!</h6>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <q-separator
      v-if="!desktopCheck()"
      inset
      class="separator q-my-lg"></q-separator>

    <div
      class="col-4 row column items-center text-center"
      :class="desktopCheck() ? 'text-light' : 'text-dark'">
      <div
        class="relative-position mobile-img-container"
        v-if="!desktopCheck()">
        <q-img
          width="150px"
          src="https://ik.imagekit.io/kw2qoeib2/ImageAssets/CollectionPhone.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663631555248"/>
        <q-img
          class="absolute-bottom-right pokemon-1"
          width="150px"
          src="https://ik.imagekit.io/kw2qoeib2/Home-Normal/909.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663189443688"/>
      </div>
      <div
        class="track-header"
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
        swipeable
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
        <q-carousel-slide
          name="collectionSlide2"
          class="q-pa-xs">
          <q-img
            class="feature-image"
            :ratio="1"
            :src="slide2F2"/>
        </q-carousel-slide>
        <q-carousel-slide
          name="collectionSlide3"
          class="q-pa-xs">
          <q-img
            class="feature-image"
            :ratio="1"
            :src="slide2F3"/>
        </q-carousel-slide>
      </q-carousel>
      <q-carousel
        v-model="collectionCarousel"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        padding
        swipeable
        :navigation="!desktopCheck()"
        class="bg-transparent carousel-text">
        <q-carousel-slide
          name="collectionSlide1"
          class="flex items-center justify-center">
          <q-icon
            class="q-pa-md"
            v-if="!desktopCheck()"
            name="fas fa-book"
            size="sm"/>
          <h6>View and manage your own collection with 1200+ different Pokemon and forms.</h6>
        </q-carousel-slide>
        <q-carousel-slide
          name="collectionSlide2"
          class="flex items-center justify-center">
          <q-icon
            class="q-pa-md"
            v-if="!desktopCheck()"
            name="fas fa-eye"
            size="sm"/>
          <h6>Quickly view and edit your catches.</h6>
        </q-carousel-slide>
        <q-carousel-slide
          name="collectionSlide3"
          class="flex items-center justify-center">
          <q-icon
            class="q-pa-md"
            v-if="!desktopCheck()"
            name="fas fa-filter"
            size="sm"/>
          <h6>Filter and sort your collections in over a dozen different ways.</h6>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <q-separator
      v-if="!desktopCheck()"
      inset
      class="separator q-my-lg"></q-separator>

    <div
      class="col-4 row column items-center text-center"
      :class="desktopCheck() ? 'text-light' : 'text-dark'">
      <div
        class="relative-position mobile-img-container"
        v-if="!desktopCheck()">
        <q-img
          width="150px"
          src="https://ik.imagekit.io/kw2qoeib2/ImageAssets/CollectionPhone.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663631555248"/>
        <q-img
          class="absolute-bottom-right pokemon-1"
          width="150px"
          src="https://ik.imagekit.io/kw2qoeib2/Home-Normal/912.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663189443688"/>
      </div>
      <div
        class="track-header"
        :class="desktopCheck() ? '' : 'q-mt-md'">Master 'Em All
      </div>
      <q-carousel
        v-if="desktopCheck()"
        v-model="masterCarousel"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        padding
        swipeable
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
        <q-carousel-slide
          name="masterSlide2"
          class="q-pa-xs">
          <q-img
            class="feature-image"
            :ratio="1"
            :src="slide3F2"/>
        </q-carousel-slide>
        <q-carousel-slide
          name="masterSlide3"
          class="q-pa-xs">
          <q-img
            class="feature-image"
            :ratio="1"
            :src="slide3F3"/>
        </q-carousel-slide>
      </q-carousel>
      <q-carousel
        v-model="masterCarousel"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        padding
        swipeable
        :navigation="!desktopCheck()"

        class="bg-transparent carousel-text">
        <q-carousel-slide
          name="masterSlide1"
          class="flex items-center justify-center">
          <q-icon
            class="q-pa-md"
            v-if="!desktopCheck()"
            name="fas fa-chart-simple"
            size="sm"/>
          <h6>How is your collection going? Visualize the answer with dozens of stats and charts for your
            collection.</h6>
        </q-carousel-slide>
        <q-carousel-slide
          name="masterSlide2"
          class="flex items-center justify-center">
          <q-icon
            class="q-pa-md"
            v-if="!desktopCheck()"
            name="fas fa-bars-progress"
            size="sm"/>
          <h6>Track the completion percentages of many well known collections with more collections coming soon!</h6>
        </q-carousel-slide>
        <q-carousel-slide
          name="masterSlide3"
          class="flex items-center justify-center">
          <q-icon
            class="q-pa-md"
            v-if="!desktopCheck()"
            name="fas fa-ranking-star"
            size="sm"/>
          <h6>Which hunt was the most difficult? Easily see your shortest and longest hunts.</h6>
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
      slide1F2: "https://ik.imagekit.io/kw2qoeib2/ImageAssets/Feature_1-2.PNG?ik-sdk-version=javascript-1.4.3&updatedAt=1663702234828",
      slide1F3: "https://ik.imagekit.io/kw2qoeib2/ImageAssets/Feature_1-3.PNG?ik-sdk-version=javascript-1.4.3&updatedAt=1663701733672",
      collectionCarousel: "collectionSlide1",
      slide2F1: "https://ik.imagekit.io/kw2qoeib2/ImageAssets/Feature_2.PNG?ik-sdk-version=javascript-1.4.3&updatedAt=1663361732521",
      slide2F2: "https://ik.imagekit.io/kw2qoeib2/ImageAssets/Feature_2-2.PNG?ik-sdk-version=javascript-1.4.3&updatedAt=1663703174088",
      slide2F3: "https://ik.imagekit.io/kw2qoeib2/ImageAssets/Feature_2-3.PNG?ik-sdk-version=javascript-1.4.3&updatedAt=1663703125117",
      masterCarousel: "masterSlide1",
      slide3F1: "https://ik.imagekit.io/kw2qoeib2/ImageAssets/Feature_3?ik-sdk-version=javascript-1.4.3&updatedAt=1665785278926",
      slide3F2: "https://ik.imagekit.io/kw2qoeib2/ImageAssets/Feature_3-2.PNG?ik-sdk-version=javascript-1.4.3&updatedAt=1665787264459",
      slide3F3: "https://ik.imagekit.io/kw2qoeib2/ImageAssets/Feature_3-3.PNG?ik-sdk-version=javascript-1.4.3&updatedAt=1665787661457"
    };
  },
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

body.screen--xs, body.screen--sm {

  .track-header {
    font-size: 2.75rem;
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

  .mobile-img-container {
    width: 23rem;
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
    height: 255px;
    width: 80%;
    font-family: Gellix, sans-serif;
  }

  .pokemon-1 {
    right: 2rem;
  }
}

body.screen--md {
  .track-header {
    font-size: 2.75rem;
    min-width: 20rem;
  }
}

body.screen--lg, body.screen--xl {
  .track-header {
    font-size: 3.75rem;
    min-width: 30rem;
  }
}

body.screen--md, body.screen--lg, body.screen--xl, {
  .section-1 {
    width: 100%;
    padding: 4rem 0;
    margin-top: 2rem;
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
    height: 200px;
    width: 70%;
    font-family: Gellix, sans-serif;
  }
}
</style>
