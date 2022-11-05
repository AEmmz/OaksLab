<template>
  <div
    class="whats-new-container bg-dark flex justify-center text-light relative-position"
    :class="desktopCheck()?'q-pa-lg':'q-pa-sm'">
    <div
      class="header-container full-width flex justify-center "
      :class="desktopCheck()?'q-my-md':'q-my-sm'">
      <div :class="desktopCheck()?'text-h4':'text-h5'">What's New</div>
    </div>
    <q-separator
      class="full-width"
      dark/>
    <div class="slide-container full-width flex justify-center q-my-md">
      <q-carousel
        v-model="slide"
        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        control-color="white"
        navigation
        padding
        class="bg-primary text-white shadow-1 rounded-borders full-width full-height">

        <q-carousel-slide
          v-for="change in changes"
          :key="change.name"
          :name="change.name">
          <q-scroll-area class="fit ">
            <div :class="desktopCheck()?'row justify-between':'column'">
              <div
                class="justify-center items-center col-6 q-px-sm"
                :class="desktopCheck()?'flex':'column'">
                <q-img
                  :src="desktopCheck()?change.screenshot:change.mobileScreenshot"
                  spinner-color="white"
                  cover
                  :style="desktopCheck()?'height: 400px; max-width: 1000px':'height: 300px; max-width: 1000px'"
                  class="slide-image"/>
              </div>
              <div
                class="info-container items-center justify-center column "
                :class="desktopCheck()?'col-5':'q-mt-md'">
                <q-badge
                  color="light"
                  outline>{{ change.date }}
                </q-badge>
                <br v-if="desktopCheck()"/>
                <div
                  class="text-center"
                  :class="desktopCheck()?'text-h4 ':'text-h5'">{{ change.title }}
                </div>
                <br v-if="desktopCheck()"/>
                <div :class="desktopCheck()?'text-h5 ':'text-subtitle1 text-center'">{{ change.description }}</div>
              </div>
            </div>
          </q-scroll-area>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <q-btn
      label="Close"
      :size="desktopCheck()?'lg':'md'"
      color="primary"
      @click="$emit('closeWhatsNewDialog')"/>
  </div>
</template>

<script>
export default {
  name: "WhatsNewDialog",
  data() {
    return {
      slide: "new1",
      changes: [
        {
          name: "new1",
          date: "October 30 2022",
          title: "Collection Quick Edit",
          description: `Introducing a new way to quickly edit your collections. Simply select the "Collection Quick Edit" button (pen icon on mobile) on the "Collections" page. From there you can now mark Pokemon as caught or uncaught by checking them off of the provided table.`,
          screenshot: "https://ik.imagekit.io/kw2qoeib2/WhatsNew/new1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667597090984",
          mobileScreenshot: "https://ik.imagekit.io/kw2qoeib2/WhatsNew/new1_mobile?ik-sdk-version=javascript-1.4.3&updatedAt=1667604743899"
        },
        {
          name: "new2",
          date: "October 24 2022",
          title: "Tera Types Are Here!",
          description: `In anticipation for the release of Pokemon Scarlet and Viole, Tera Types and Shiny Tera Types have been added. These will continue to be updated up to and after the game realse to ensure they are accurate and up to date. Stay tuned for more!`,
          screenshot: "https://ik.imagekit.io/kw2qoeib2/WhatsNew/new2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667598399665",
          mobileScreenshot: "https://ik.imagekit.io/kw2qoeib2/WhatsNew/new2_mobile.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667606134713"
        },
        {
          name: "new3",
          date: "October 17 2022",
          title: "Quick Edit",
          description: `Now you can quick edit individual Pokemon's capture status' straight from the collection screen. Hover or touch a Pokemon's card on the collection screen to reveal the new "Quick Edit" button. This will open a dialog allowing you to make your changes.`,
          screenshot: "https://ik.imagekit.io/kw2qoeib2/WhatsNew/new3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667599252343",
          mobileScreenshot: "https://ik.imagekit.io/kw2qoeib2/WhatsNew/new3_mobile.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667607142048"
        },
        {
          name: "new4",
          date: "October 11 2022",
          title: "And We're Live",
          description: "Introducing DexHunt! A passion project of a dedicated Pokemon fan. Since Generation 1, Anthony, the creator of DexHunt, has been hunting, capturing and collection all the Pokemon he could, mostly keeping track of his collection in spreadsheets. It's time for something different. Welcome and thank you for stopping by!",
          screenshot: "https://ik.imagekit.io/kw2qoeib2/WhatsNew/new4.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667599364005",
          mobileScreenshot: "https://ik.imagekit.io/kw2qoeib2/WhatsNew/new4_mobile.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667607372682"
        }]
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

.slide-image {
  border-radius: 2rem;
}


body.screen--xs, body.screen--sm {
  .q-carousel__slide {
    padding-left: 0;
    padding-right: 0;
  }

  .slide-container {
    height: 74vh;
    max-height: 100% !important;
  }

  .whats-new-container {
    max-height: 100% !important;
    width: 95%;
    max-width: 95%;
  }

  .info-container {
    gap: 10px;
  }
}

body.screen--md, body.screen--lg, body.screen--xl {
  .slide-container {
    height: 500px
  }

  .whats-new-container {
    width: 75%;
    max-width: 80%;
  }
}

</style>
