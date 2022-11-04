<template>
  <div class="whats-new-container bg-dark flex justify-center text-light q-pa-lg relative-position">
    <div class="header-container full-width flex justify-center q-my-md">
      <h3>What's New</h3>
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
        arrows
        class="bg-primary text-white shadow-1 rounded-borders full-width full-height">

        <q-carousel-slide
          v-for="change in changes"
          :key="change.name"
          :name="change.name"
          class="row">
          <div class="flex justify-center items-center col-6">
            <q-img
              :src="change.screenshot"
              spinner-color="white"
              :ratio="4/3"
              style="height: 140px; max-width: 150px"/>
          </div>
          <div class="column items-center justify-center text-h5 col-6">
            <div>{{ change.title }}</div>
            <div>{{ change.description }}</div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <q-btn
      label="Close"
      size="lg"
      color="primary"/>
  </div>
</template>

<script>
export default {
  name: "WhatsNewDialog",
  data() {
    return {
      slide: "new2",
      changes: [
        {
          name: "new1",
          title: "Hi Ho",
          description: "A New change",
          screenshot: ""
        },
        {
          name: "new2",
          title: "Hi",
          description: "A New",
          screenshot: ""
        },
        {
          name: "new3",
          title: "Ho",
          description: "A change",
          screenshot: ""
        },
        {
          name: "new4",
          title: "oh",
          description: "change",
          screenshot: ""
        }]
    };
  }
};
</script>

<style
  scoped
  lang="scss">

.header-container {
}

.slide-container {
  height: 500px
}

.whats-new-container {
  width: 75%;
  max-width: 80%;
}

</style>
