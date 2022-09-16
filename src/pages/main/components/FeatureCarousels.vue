<template>
  <div
    class="section-1 row justify-center items-center"
    :class="{'shifted':cardIntersecting <= 0.75}">
    <div class="text-light col-4 row column items-center text-center">
      <div class="track-header text-h2 ">Track 'Em All</div>
      <q-carousel
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
        class="carousel-text bg-transparent ">
        <q-carousel-slide name="trackerSlide1">
          <h6>Over a dozen different ways to track and more on the way.</h6>
        </q-carousel-slide>
        <q-carousel-slide name="trackerSlide2">
          <h6>Keep track of your encounters and time with individual counters for all of your hunts.</h6>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <div class="text-light col-4 row column items-center text-center">
      <div class="text-h2 track-header">Collect 'Em All</div>
      <q-carousel
        v-model="collectionCarousel"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        padding
        navigation
        control-text-color="dark"
        class="carousel-2 full-height shadow-8">
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
        class="bg-transparent carousel-text">
        <q-carousel-slide name="collectionSlide1">
          <h6>View and manage your own collection with 1200+ different Pokemon and forms.</h6>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <div class="text-light col-4 row column items-center text-center">
      <div class="text-h2 track-header">Master 'Em All</div>
      <q-carousel
        v-model="masterCarousel"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        padding
        navigation
        control-text-color="dark"
        class="carousel-3 full-height shadow-8">
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
        class="bg-transparent carousel-text">
        <q-carousel-slide name="masterSlide1">
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
  }
};
</script>

<style
  scoped
  lang="scss">

/*
* Prefixed by https://autoprefixer.github.io
* PostCSS: v8.4.14,
* Autoprefixer: v10.4.7
* Browsers: last 4 version
*/

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
  height: 120px;
  width: 60%;
  font-family: Gellix, sans-serif;
}
</style>
