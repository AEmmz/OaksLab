<template>
  <q-card class="bg-dark flex justify-evenly q-py-md text-h6">
    <div class="type-cont">
      <transition>
        <q-card
          class="q-pa-sm type-1 flex justify-center"
          :class="`bg-${pkType1}Type`"
          v-if="pkType1">
          <q-icon
            :name="`icon-type-2-${pkType1}`"
            size="xl"
            class="absolute-left icon"
            color="white"></q-icon>
          <div>{{ getPkType1 }}</div>
        </q-card>
      </transition>
    </div>
    <div class="type-cont">
      <transition>
        <q-card
          class="q-pa-sm type-2 flex justify-center"
          :class="`bg-${pkType2}Type`"
          v-if="pkType2">
          <q-icon
            :name="`icon-type-2-${pkType2}`"
            size="xl"
            class="absolute-left icon"
            color="white"></q-icon>
          <div>{{ getPkType2 }}</div>
        </q-card>
      </transition>
    </div>
  </q-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("tracker", ["pkType1", "pkType2"]),
    getPkType1() {
      if (this.pkType1) {
        const type = this.pkType1;
        return type.charAt(0).toUpperCase() + type.substring(1);
      } else {
        return "";
      }
    },
    getPkType2() {
      if (this.pkType2) {
        const type = this.pkType2;
        return type.charAt(0).toUpperCase() + type.substring(1);
      } else {
        return "";
      }
    }
  }
};
</script>

<style scoped>
.type-cont {
  width: 40%;
}

.type-1,
.type-2 {
  border-radius: 1.5rem;
  transition: 400ms all;
}

.type-1:hover,
.type-2:hover {
  transform: scale(1.05);
}

</style>
