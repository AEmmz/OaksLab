<template>
  <q-card class="bg-dark q-pa-md column items-center">
    <div class="timer-cont flex-column justify-around full-width q-gutter-y-md">
      <h1
        class=" flex justify-center items-center text-light">{{ timeInSeconds }}</h1>
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
          @click="reset"/>
      </div>
    </div>
  </q-card>
</template>

<script>

import { mapActions, mapGetters } from "vuex";

export default {
  name: "TimerCard",
  data() {
    return {
      timer: null,
      timerRunning: false,
      savedTimer: 0
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
    timeInSeconds() {
      const date = new Date(null);
      date.setSeconds(this.mainTimer / 1000);
      const dateUtc = date.toUTCString();
      const dateStart = dateUtc.indexOf(":") - 2;
      const dateEnd = dateStart + 8;
      return dateUtc.substring(dateStart, dateEnd);
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
      if (this.mainTimer > 0) {
        this.mainTimer = 0;
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
