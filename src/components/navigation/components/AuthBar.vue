<template>
   <transition mode="out-in">
      <div
         class="btn-container"
         v-if="!userStore.isLoggedIn">
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
            color="secondary"
            class="admin"
            to="/admin">
            <q-icon
               class="lt-md"
               size="sm"
               left
               name="fas fa-gear"
               color="white"/>
            <div class="text-center item-name">
               Admin
            </div>
         </q-btn>
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
            <div class="text-center item-name">
               Logout
            </div>
         </q-btn>
         <div class="row justify-around full-width q-mt-md">
            <q-btn
               color="purple"
               label="Request"
               to="/feature-request">
               <q-icon
                  class="lt-md q-pl-sm"
                  size="xs"
                  name="fas fa-lightbulb"
                  color="white"/>
            </q-btn>
            <q-btn
               color="red"
               label="Report"
               to="/bug-report">
               <q-icon
                  class="lt-md q-pl-sm"
                  size="xs"
                  name="fas fa-bug"
                  color="white"/>
            </q-btn>
         </div>
      </div>
   </transition>
</template>

<script>
import { useUserStore } from "pages/authorization/_UserStore";

export default {
   setup() {
      const userStore = useUserStore();
      return { userStore };
   },
   methods: {
      commitLogout() {
         this.userStore.logout();
         this.$router.replace("/home");
      },
      desktopCheck() {
         return this.$q.screen.gt.sm;
      }
   }
};
</script>

<style
   scoped
   lang="scss">

.item-name {
   font-family: Futura, sans-serif;
}

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
