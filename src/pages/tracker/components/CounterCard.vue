<template>
  <q-card class="bg-dark flex justify-evenly items-center text-h6">
    <q-card-section class="main-cont flex column items-center justify-evenly q-pa-none q-pb-lg">
      <div
        class="name-cont flex items-center justify-center full-width text-h3 text-light q-pa-lg">
        {{ pkName }}
      </div>
      <div class="counter-cont flex justify-center row">
        <q-btn
          :label="mainCount"
          push
          class="counter-main text-h1 full-width text-dark"
          :class="`bg-${pkType1 || 'default'}Type`"
          @click="countUp"
          @mousedown="holdCountUp"
          @mouseup="clearCountHold"></q-btn>
        <div class="secondary-cont full-width justify-center row">
          <div class="col">
            <q-btn
              label="Subtract"
              push
              class="btn bg-light secondary-btn full-width text-h6 text-dark"
              @click="countDown"
              @mousedown="holdCountDown"
              @mouseup="clearCountHold"></q-btn>
          </div>
          <div class="col">
            <q-btn
              @click="counterDialog=true"
              label="Reset"
              push
              class="btn bg-light secondary-btn full-width text-h6 text-dark"></q-btn>
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
        vertical
        label
        switch-label-side
        track-size="10px"
        thumb-size="30px"
        :min="1"
        :max="100"
        reverse></q-slider>
      <h5 class="text-light">Increment</h5>
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

<style scoped>
.main-cont {
  width: 89%;
  height: 100%;
}

.name-cont {
  text-align: center;
}

.inc-cont {
  width: 11%;
  height: 25rem;
}

.inc-cont h5 {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.counter-cont {
  width: 95%;
  gap: 1rem;
}

.counter-main {
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
  height: 100%;
}

.slider >>> .q-slider__text {
  font-size: 1.2rem;
}
</style>
