<template>
  <div>
    <q-card class="bg-dark flex justify-evenly items-center text-h6">
      <q-card-section
        class="main-cont flex column items-center justify-evenly q-pa-none q-pb-lg"
        :class="{'full-width': !desktopCheck()}">
        <div
          class="name-cont flex items-center justify-center full-width text-h3 text-light q-pa-lg gt-sm">
          {{ pkName }}
        </div>
        <div
          class="counter-cont flex justify-center row"
          :class="{'full-width': !desktopCheck()}">
          <q-btn
            :square="!desktopCheck()"
            :push="desktopCheck()"
            :unelevated="!desktopCheck()"
            class="counter-main text-h1 full-width text-dark"
            :color="pkType1 ? `${pkType1}Type` : 'primary'"
            @click="countUp"
            @mousedown="holdCountUp"
            @mouseup="clearCountHold">
            <div class="text-light">{{ mainCount }}</div>
          </q-btn>
          <div class="secondary-cont full-width justify-center row">
            <div class="col">
              <q-btn
                :square="!desktopCheck()"
                :push="desktopCheck()"
                :unelevated="!desktopCheck()"
                :outline="!desktopCheck()"
                :color="!desktopCheck() ? pkTypeColor() : 'light'"
                class="btn bg-light secondary-btn full-width text-h6"
                :class="desktopCheck() ? 'text-dark' : `text-light`"
                @click="countDown"
                @mousedown="holdCountDown"
                @mouseup="clearCountHold">
                <!--                <div class="text-light">Subtract</div>-->
                <q-icon
                  name="fas fa-minus"
                  :color="desktopCheck() ? 'dark' : 'light'"
                  class="text-light"></q-icon>
              </q-btn>
            </div>
            <div class="col">
              <q-btn
                @click="counterDialog=true"
                :square="!desktopCheck()"
                :push="desktopCheck()"
                :unelevated="!desktopCheck()"
                :outline="!desktopCheck()"
                :color="!desktopCheck() ? pkTypeColor() : 'light'"
                class="btn bg-light secondary-btn full-width text-h6"
                :class="desktopCheck() ? 'text-dark' : `text-light`">
                <!--                <div class="text-light">Reset</div>-->
                <q-icon
                  name="fas fa-rotate-left"
                  :color="desktopCheck() ? 'dark' : 'light'"
                  class="text-light"></q-icon>
              </q-btn>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="inc-cont flex justify-center items-center q-pa-sm">
        <q-slider
          v-model="incrementCount"
          :model-value="incrementCount"
          class="slider"
          :thumb-color="pkTypeColor()"
          :color="pkTypeColor2()"
          label-text-color="dark"
          :vertical="desktopCheck()"
          label
          :switch-label-side="desktopCheck()"
          track-size="10px"
          thumb-size="30px"
          :min="1"
          :max="100"
          :reverse="desktopCheck()"></q-slider>
        <h5 class="text-light slider-text flex items-end">Increment</h5>
      </q-card-section>
    </q-card>

    <q-dialog
      v-model="counterDialog">
      <q-card>
        <q-card-section class="column justify-center text-center">
          <h4>Are You Sure?</h4>
          <span class="text-subtitle1">Do you really want to reset your counter for this hunt?</span>
        </q-card-section>
        <q-card-section class="row justify-around">
          <q-btn
            class="dialog-button"
            size="xl"
            label="cancel"
            color="negative"
            @click="counterDialog=false"></q-btn>
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

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {
      counterDialog: false
    };
  },
  computed: {
    ...mapGetters("tracker/counter", ["mainCount"]),
    ...mapGetters("tracker", ["pkName", "pkType1", "pkType2"]),
    incrementCount: {
      get() {
        return this.$store.getters["tracker/counter/incrementCount"];
      },
      set(value) {
        this.$store.dispatch("tracker/counter/changeIncrement", value);
      }
    }
  },
  methods: {
    ...mapActions("tracker/counter", [
      "countUp",
      "countDown",
      "holdCountUp",
      "holdCountDown",
      "clearCountHold",
      "resetCounter"
    ]),

    desktopCheck() {
      return this.$q.screen.gt.sm ? true : false;
    },

    pkTypeColor() {
      return `${this.pkType1}Type`;
    },
    pkTypeColor2() {
      return `${this.pkType2 || this.pkType1}Type`;
    },
    reset() {
      if (this.mainCount > 0) {
        this.resetCounter();
        this.counterDialog = false;
      }
    }
  }
};
</script>

<style
  scoped
  lang="scss">

body.screen--xs, body.screen--sm {
  .secondary-btn {
    height: 100%;
  }

  .secondary-cont {
    height: 6rem;
  }

  .secondary-btn {
    height: 100%;
  }

  .inc-cont {
    font-family: Gellix, sans-serif;
    width: 80%;
    gap: 0.5rem;
    margin-bottom: 1.3rem;
  }

  .slider {
    order: 2;
  }

  .slider-text {
    order: 1;
  }

  .name-cont {
    font-family: Futura, sans-serif;
    text-align: center;
    min-height: 6.2rem;
  }
}

body.screen--md, body.screen--lg, body.screen--xl, {
  .main-cont {
    width: 85%;
    height: 100%;
  }

  .name-cont {
    font-family: Futura, sans-serif;
    text-align: center;
    min-height: 6.2rem;
  }

  .inc-cont {
    width: 15%;
    height: 25rem;
  }

  .inc-cont h5 {
    font-family: Gellix, sans-serif;
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }

  .counter-cont {
    width: 95%;
    gap: 1rem;
  }

  .counter-main {
    font-family: Futura, sans-serif;
    height: 15rem;
    border-radius: 0.7rem;
  }

  .secondary-cont {
    height: 6rem;
    gap: 1rem;
  }

  .secondary-btn {
    height: 100%;
  }

  .btn {
    border-radius: 0.7rem;
  }

  .slider {
    width: 50%;
    height: 100%;
    justify-content: right;
  }

  .slider-text {
    width: 50%;
  }

  .slider > > > .q-slider__text {
    font-size: 1.2rem;
  }
}

</style>
