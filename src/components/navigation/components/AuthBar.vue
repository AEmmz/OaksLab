<template>
  <transition mode="out-in">
    <div
      class="btn-container"
      v-if="!isLoggedIn">
      <q-btn
        size="lg"
        stretch
        unelevated
        color="primary"
        to="/login"
        class="login">
        <q-icon
          class="lt-md"
          size="sm"
          left
          name="fas fa-right-to-bracket"
          color="white"/>
        <div class="text-center">
          Login
        </div>
      </q-btn>
      <q-btn
        size="lg"
        stretch
        unelevated
        color="secondary"
        to="/register"
        class="register">
        <q-icon
          class="lt-md"
          size="sm"
          left
          name="fas fa-address-card"
          color="white"/>
        <div class="text-center">
          Register
        </div>
      </q-btn>
    </div>
    <div
      v-else
      class="full-height">

      <q-btn
        size="lg"
        stretch
        unelevated
        color="primary"
        @click="commitLogout"
        class="logout">
        <q-icon
          class="lt-md"
          size="sm"
          left
          name="fas fa-right-from-bracket"
          color="white"/>
        <div class="text-center">
          Logout
        </div>
      </q-btn>
      <q-btn
        size="lg"
        stretch
        unelevated
        color="secondary"
        class="admin"
        to="/admin">
        <q-icon
          class="lt-md"
          size="sm"
          left
          name="fas fa-toolbox"
          color="white"/>
        <div class="text-center">
          Admin
        </div>
      </q-btn>
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
    },
    desktopCheck() {
      return this.$q.screen.gt.sm ? true : false;
    }
  },
  computed: {
    ...mapGetters("authorization", ["isLoggedIn"])
  }
};
</script>

<style
  scoped
  lang="scss">

body.screen--xs, body.screen--sm {
  .btn-container {
    width: 100%;
    height: 100%;
  }

  .register, .login {
    width: 100%;
    height: 5rem;
  }

  .logout, .admin {
    width: 100%;
    height: 2rem;
  }
}


body.screen--md, body.screen--lg, body.screen--xl, {
  .btn-container,
  .login, .logout, .register, .admin {
    height: 100%;
  }

  .login, .logout, .register, .admin {
    width: 30%;
    height: 100%;
  }

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
