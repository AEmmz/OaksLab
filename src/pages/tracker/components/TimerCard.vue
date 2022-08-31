<template>
  <q-card class="bg-dark q-pa-md column items-center">
    <div class="timer-cont flex-column justify-around full-width q-gutter-y-md">
      <h1
        class=" flex justify-center items-center text-light">{{ hours }}:{{ minutes }}:{{ seconds }}</h1>
      <div class=" flex items-center justify-center q-gutter-x-md">
        <q-btn
          size="lg"
          :icon="!timerRunning ? 'fas fa-play' : 'fas fa-pause'"
          class="button bg-light text-dark"
          :label="!timerRunning? 'Start' : 'Pause'"
          @click="toggleStart"/>
        <q-btn
          size="lg"
          :icon="!saved ? 'fas fa-floppy-disk' : 'fas fa-circle-check'"
          class="button bg-light text-dark"
          :label="!saved ? 'Save' : 'Saved'"
          @click="stop"></q-btn>
        <q-btn
          size="lg"
          icon="fas fa-arrow-rotate-right"
          class="button bg-light text-dark"
          label="Reset"
          @click="mainTimer > 0 ? timerDialog=true : timerDialog=false"/>
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
</template>

<script>

import { mapActions, mapGetters } from "vuex";

export default {
  name: "TimerCard",
  data() {
    return {
      timer: null,
      timerRunning: false,
      savedTimer: 0,
      timerDialog: false
    };
  },
  computed: {
    ...mapGetters("tracker", ["pkType1"]),
    mainTimer: {
      get() {
        return this.$store.getters["tracker/counter/mainTimer"];
      },
      set(value) {
        this.$store.dispatch("tracker/counter/changeTimer", value);
      }
    },
    saved() {
      return this.mainTimer === this.savedTimer;
    },

    hours() {
      return Math.floor(this.mainTimer / (1000 * 60 * 60)).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      });
    },
    minutes() {
      return Math.floor(this.mainTimer % (1000 * 60 * 60) / (1000 * 60)).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      });
    },
    seconds() {
      return Math.floor(this.mainTimer % (1000 * 60) / (1000)).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      });
    }
  },
  methods: {
    ...mapActions("tracker/counter", ["updateTimer"]),
    toggleStart() {
      if (!this.timerRunning) {
        this.start();
      } else {
        this.stop();
      }
    },

    start() {
      this.savedTimer = this.mainTimer;
      this.timerRunning = true;
      this.timer = setInterval(() => {
        this.mainTimer += 1000;
      }, 1000);
    },
    stop() {
      clearInterval(this.timer);
      this.timerRunning = false;
      if (this.mainTimer > 0 && !this.saved) {
        this.updateTimer();
        this.savedTimer = this.mainTimer;
      } else {
        console.log("rejected");
      }
    },
    reset() {
      clearInterval(this.timer);
      this.timerRunning = false;
      this.timerDialog = false;
      if (this.mainTimer > 0) {
        this.mainTimer = 0;
        this.savedTimer = 0;
        this.updateTimer();
      }
    }
  }
};
</script>

<style scoped>
.button {
  width: 150px;
}

</style>
