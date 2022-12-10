<template>
   <div>
      <q-card
         class="bg-dark q-pa-md column items-center"
         :flat="!desktopCheck()">
         <div class="timer-cont flex-column justify-around full-width q-gutter-y-md">
      <span
         class=" flex justify-center items-center text-light time">{{ hours }}:{{ minutes }}:{{
            seconds }}</span>
            <div
               class=" flex items-center justify-center"
               :class="desktopCheck() ? 'q-gutter-x-md' : 'q-gutter-x-xs'">
               <q-btn
                  :size="desktopCheck() ? 'lg' : 'md'"
                  class="button bg-light text-dark"
                  @click="toggleStart">
                  <div class="q-gutter-x-sm row">
                     <q-icon
                        :name="!PokemonTrackerStore.timerRunning ? 'fas fa-play' : 'fas fa-pause'"></q-icon>
                     <div v-if="desktopCheck()">
                        {{ !PokemonTrackerStore.timerRunning ? "Start" : "Pause" }}
                     </div>
                  </div>
               </q-btn>
               <q-btn
                  :size="desktopCheck() ? 'lg' : 'md'"
                  class="button bg-light text-dark flex justify-center"
                  @click="stop">
                  <div class="q-gutter-x-sm row">
                     <q-icon
                        :name="!isSaved ? 'fas fa-floppy-disk' : 'fas fa-circle-check'"></q-icon>
                     <div v-if="desktopCheck()">
                        {{ !isSaved ? "Save" : "Saved" }}
                     </div>
                  </div>
               </q-btn>
               <q-btn
                  :size="desktopCheck() ? 'lg' : 'md'"
                  class="button bg-light text-dark"
                  @click="PokemonTrackerStore.mainTimer > 0 ? timerDialog=true : timerDialog=false">
                  <div class="q-gutter-x-sm row">
                     <q-icon
                        name="fas fa-arrow-rotate-right"></q-icon>
                     <div v-if="desktopCheck()">
                        Reset
                     </div>
                  </div>
               </q-btn>
            </div>
         </div>
      </q-card>

      <q-dialog
         v-model="timerDialog">
         <q-card>
            <q-card-section class="column justify-center text-center">
               <h4>Are You Sure?</h4>
               <span class="text-subtitle1">Do you really want to reset your timer?</span>
            </q-card-section>
            <q-card-section class="row justify-around">
               <q-btn
                  class="dialog-button"
                  size="xl"
                  label="cancel"
                  color="negative"
                  @click="timerDialog=false"></q-btn>
               <q-btn
                  class="dialog-button"
                  size="xl"
                  label="Confirm"
                  color="positive"
                  @click="reset"></q-btn>
            </q-card-section>
         </q-card>
      </q-dialog>
   </div>
</template>

<script lang="ts">
//Import
import { defineComponent } from "vue";
//Stores
import { usePokemonStore } from "pages/tracker/_PokemonStore";
import { usePokemonTrackerStore } from "pages/tracker/_PokemonTrackerStore";
//Types
type TimeState = {
   timer: undefined | ReturnType<typeof setInterval>,
   savedTimer: number,
   timerDialog: boolean
}

export default defineComponent({
   name: "TimerCard",
   data(): TimeState {
      return {
         timer: undefined,
         savedTimer: 0,
         timerDialog: false
      };
   },
   setup() {
      const PokemonStore = usePokemonStore();
      const PokemonTrackerStore = usePokemonTrackerStore();
      return {
         PokemonStore,
         PokemonTrackerStore
      };
   },
   beforeMount() {
      window.addEventListener("beforeunload", this.preventNav.bind(this));
   },
   unmounted() {
      this.stop().catch(err =>
         console.log(err));
   },

   watch: {
      async timerRunning(newVal) {
         if (!newVal) await this.stop();
      }
   },

   computed: {
      timerRunning() {
         return this.PokemonTrackerStore.timerRunning;
      },
      isSaved() {
         return this.PokemonTrackerStore.mainTimer === this.savedTimer;
      },

      hours() {
         return Math.floor(this.PokemonTrackerStore.mainTimer / (1000 * 60 * 60)).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false
         });
      },
      minutes() {
         return Math.floor(this.PokemonTrackerStore.mainTimer % (1000 * 60 * 60) / (1000 * 60)).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false
         });
      },
      seconds() {
         return Math.floor(this.PokemonTrackerStore.mainTimer % (1000 * 60) / (1000)).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false
         });
      }
   },
   methods: {
      preventNav(event: { preventDefault: () => void; returnValue: string; }) {
         if (!this.PokemonTrackerStore.timerRunning) {
            return;
         }
         event.preventDefault();
         event.returnValue = "";
      },
      desktopCheck() {
         return this.$q.screen.gt.sm;
      },
      mediumCheck() {
         return this.$q.screen.md;
      },

      async toggleStart() {
         if (!this.PokemonTrackerStore.timerRunning) {
            this.start();
         } else {
            await this.stop();
         }
      },

      start() {
         this.savedTimer = this.PokemonTrackerStore.mainTimer;
         this.PokemonTrackerStore.timerRunning = true;
         this.timer = setInterval(() => {
            this.PokemonTrackerStore.mainTimer += 1000;
         }, 1000);
      },
      async stop() {
         clearInterval(this.timer);
         this.PokemonTrackerStore.timerRunning = false;
         if (this.PokemonTrackerStore.mainTimer > 0 && !this.isSaved) {
            await this.PokemonTrackerStore.updateTimer();
            this.savedTimer = this.PokemonTrackerStore.mainTimer;
         }
      },
      async reset() {
         clearInterval(this.timer);
         this.PokemonTrackerStore.timerRunning = false;
         this.timerDialog = false;
         if (this.PokemonTrackerStore.mainTimer > 0) {
            this.PokemonTrackerStore.mainTimer = 0;
            this.savedTimer = 0;
            await this.PokemonTrackerStore.updateTimer();
         }
      }
   }
});
</script>

<style
   scoped
   lang="scss">

.time {
   font-family: Futura, sans-serif;
}

.button {
   font-family: Futura, sans-serif;
}

body.screen--xs, body.screen--sm {
   .time {
      font-size: 4.5rem;
      line-height: 4.5rem;
   }
}

body.screen--md {
   .time {
      font-size: 5rem;
      line-height: 5rem;
   }
}

body.screen--lg, body.screen--xl {
   .time {
      font-size: 6rem;
      line-height: 6rem;
   }
}

body.screen--md, body.screen--lg, body.screen--xl {
   .time {
      font-weight: 300;
      letter-spacing: -0.01562em;
   }

   .button {
      width: 150px;
   }
}

</style>
