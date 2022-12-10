<template>
   <div>
      <h2 class="text-center q-my-lg">Streamer Green Screen</h2>
      <q-separator inset></q-separator>
      <div class="text-center q-ma-lg flex justify-center items-center description-container text-subtitle2">
         <p class="description">
            A tool made for streamers. Utilize your DexHunt tracking data to store and display
            all of your hunts in an easy to use overlay for your stream.</p><br/><br/>
         <q-separator
            inset
            vertical/>
         <p class="description">
            Simply select from the customization options below and click the "Open Window" button to
            generate a Green Key Tracker.</p><br/><br/>
         <q-separator
            inset
            vertical/>
         <p class="description">
            Then, in your favorite streaming software, screen capture the Green Key Tracker window
            and apply a
            simple green key filter.</p><br/><br/>
         <q-separator
            inset
            vertical/>
         <p class="description">
            You now have a stream counter that is responsive to your DexHunt tracker. You can even
            use
            a phone or tablet to increment your on screen Green Key Tracker.</p>
      </div>
      <q-separator inset></q-separator>
      <div class="options-container column q-ma-xl">
         <div>
            <h6>General Options:</h6>
            <div>
               <q-select
                  class="selector"
                  v-model="styleObject.flexDirection"
                  :options="[{label: 'Row', value: 'row'}, {label: 'Column', value: 'column'}]"
                  emit-value
                  map-options
                  label="Overall Direction"/>
            </div>
         </div>
         <q-separator inset></q-separator>
         <div>
            <h6>Main Text Options:</h6>
            <div class="flex q-gutter-x-xl">
               <q-select
                  class="selector"
                  v-model="nameActive"
                  :options="booleanOptions"
                  emit-value
                  map-options
                  label="Show Pokemon Name"/>
               <q-select
                  class="selector"
                  v-model="counterActive"
                  :options="booleanOptions"
                  emit-value
                  map-options
                  label="Show Counter"/>
               <q-select
                  class="selector"
                  v-model="styleObject.fontSize"
                  :options="fontSizeOptions"
                  label="Main Font Size"></q-select>
            </div>
         </div>
         <q-separator inset></q-separator>
         <div>
            <h6>Subtitle Options:</h6>
            <div class="flex q-gutter-x-xl">
               <q-select
                  class="selector"
                  v-model="subtitlesActive"
                  :options="booleanOptions"
                  emit-value
                  map-options
                  label="Show Subtitles"/>
               <q-select
                  class="selector"
                  v-model="subtitleObject.fontSize"
                  :options="fontSizeOptions"
                  label="Subtitle Font Size"></q-select>
               <q-select
                  class="selector"
                  v-model="subtitleObject.alignSelf"
                  :options="[{label: 'Top', value: 'start'}, {label: 'Center', value: 'center'}, {label: 'Bottom', value:'end'}]"
                  emit-value
                  map-options
                  label="Alignment"/>
            </div>
         </div>
         <q-separator inset></q-separator>
         <div>
            <h6>Picture Options:</h6>
            <div>
               <q-select
                  class="selector"
                  v-model="pictureActive"
                  :options="booleanOptions"
                  emit-value
                  map-options
                  label="Show Picture"/>
            </div>
         </div>
         <q-separator inset></q-separator>
         <div>
            <q-btn
               color="primary"
               size="md"
               @click="openWindow"
               label="Open Window"/>
         </div>
         <q-separator inset></q-separator>
      </div>

      <WindowPortal :isOpen="open">
         <green-screen
            :count="count"
            :name="name"
            :counter-active="counterActive"
            :picture-active="pictureActive"
            :subtitles-active="subtitlesActive"
            :name-active="nameActive"
            :styleObject="styleObject"
            :subtitleObject="subtitleObject"/>
      </WindowPortal>
   </div>
</template>

<script lang="ts">
//Imports
import { defineComponent, defineAsyncComponent } from "vue";

//Components
const GreenScreen = defineAsyncComponent(() => import("./components/GreenScreen.vue"));
const WindowPortal = defineAsyncComponent(() => import("./utility/WindowPortal.vue"));

export default defineComponent({
   name: "StreamerTools",
   components: {
      GreenScreen, WindowPortal

   },
   data() {
      return {
         open: false,
         name: "Charizard",
         count: "16",
         counterActive: true,
         pictureActive: true,
         nameActive: true,
         subtitlesActive: true,

         styleObject: {
            position: "relative",
            flexDirection: "row",
            color: "#000000",
            fontFamily: "Arial",
            fontSize: "64px",
            lineHeight: "50px",
            top: "0px"
         },
         subtitleObject: {
            position: "relative",
            color: "#000000",
            alignSelf: "start",
            fontFamily: "Arial",
            fontSize: "20px",
            lineHeight: "20px",
            top: "0px"
         },
         fontSizeOptions: ["16px", "32px", "48px", "64px", "80px"],
         booleanOptions: [{ label: "Yes", value: true }, { label: "No", value: false }]
      };
   },
   computed: {
      mainLineHeight() {
         return this.styleObject.fontSize;
      },
      subLineHeight() {
         return this.subtitleObject.fontSize;
      }
   },
   methods: {
      openWindow() {
         this.open = false;
         setTimeout(() => {
            this.open = true;
         }, 500);

      }
   },
   watch: {
      subLineHeight() {
         let number = Number(this.subtitleObject.fontSize.split("px")[0]);
         number = number - 10;
         this.subtitleObject.lineHeight = `${number}px`;
      },
      mainLineHeight() {
         let number = Number(this.styleObject.fontSize.split("px")[0]);
         number = number - 10;
         this.styleObject.lineHeight = `${number}px`;
      }
   }
});
</script>

<style
   scoped
   lang="scss">
.options-container {
   display: flex;
   gap: 2rem;
}

.description-container {
   gap: 3rem;
}

.description {
   width: 13%;
}

.selector {
   width: 10rem;
}
</style>
