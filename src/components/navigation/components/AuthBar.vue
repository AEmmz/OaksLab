<template>
  <transition mode="out-in">
    <div
      class="btn-container"
      v-if="!isLoggedIn">
      <q-btn
        size="lg"
        stretch
        unelevated
        label="Login"
        color="primary"
        to="/login"></q-btn>
      <q-btn
        size="lg"
        stretch
        unelevated
        label="Register"
        color="secondary"
        to="/register"></q-btn>
    </div>
    <div
      v-else
      class="full-height">
      <q-btn
        size="lg"
        stretch
        unelevated
        label="Logout"
        color="primary"
        @click="commitLogout"
        class="btn-container"></q-btn>
      <q-btn
        size="lg"
        stretch
        unelevated
        label="Admin"
        color="secondary"
        class="btn-container"
        to="/admin"></q-btn>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  methods: {
    ...mapActions("authorization", ["logout"]),
    commitLogout() {
      this.logout();
      this.$router.replace("/home");
    }
  },
  computed: {
    ...mapGetters("authorization", ["isLoggedIn"])
  }
};
</script>

<style scoped>
.btn-container,
.btn-container .q-btn {
  height: 100%;
}

.btn-container .q-btn {
  width: 30%;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-active {
  transition: all 0.5s ease-out;
}

.v-leave-active {
  transition: all 0.5s ease-in;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
}
</style>
