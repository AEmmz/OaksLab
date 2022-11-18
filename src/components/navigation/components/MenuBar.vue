<template>
   <q-tabs
      active-color="light"
      active-bg-color="primary"
      shrink
      :vertical="!desktopCheck()"
      class="menu-cont">
      <q-route-tab
         class="tab"
         :class="{'row justify-center': !desktopCheck()}"
         to="/tracker"
         v-if="isLoggedIn">
         <q-icon
            class="lt-md q-pa-sm"
            size="md"
            name="icon-poke-pokeball"
            color="white"/>
         <div
            class="text-center item-name"
            :class="{'text-h6': !desktopCheck()}">
            Tracker
         </div>
      </q-route-tab>
      <q-route-tab
         class="tab"
         :class="{'row justify-center': !desktopCheck()}"
         to="/collection"
         v-if="isLoggedIn">
         <q-icon
            class="lt-md q-pa-sm"
            size="md"
            name="fas fa-book"
            color="white"/>
         <div
            class="text-center item-name"
            :class="{'text-h6': !desktopCheck()}">
            Collection
         </div>
      </q-route-tab>
      <q-route-tab
         class="tab"
         :class="{'row justify-center': !desktopCheck()}"
         to="/statistics"
         v-if="isLoggedIn">
         <q-icon
            class="lt-md q-pa-sm"
            size="md"
            name="fas fa-chart-simple"
            color="white"/>
         <div
            class="text-center item-name"
            :class="{'text-h6': !desktopCheck()}">
            Statistics
         </div>
      </q-route-tab>

      <!--Desktop Admin Button-->
      <q-btn
         v-if="isLoggedIn && desktopCheck()"
         class="q-ml-sm"
         unelevated
         flat
         round
         icon="far fa-user">
         <q-menu
            dark
            :offset="[0,15]"
            transition-show="jump-down"
            transition-hide="jump-up">
            <q-list class="admin-menu text-subtitle1">
               <q-item
                  to="/admin"
                  exact
                  clickable
                  v-close-popup>
                  <q-item-section class="admin-menu-section">
                     <q-icon name="fas fa-gear"/>
                     <div>Settings</div>
                  </q-item-section>
               </q-item>
               <q-item
                  @click="commitLogout"
                  exact
                  clickable
                  v-close-popup>
                  <q-item-section class="admin-menu-section">
                     <q-icon name="fas fa-right-from-bracket"/>
                     <div>Logout</div>
                  </q-item-section>
               </q-item>
               <q-item
                  to="/feature-request"
                  exact
                  clickable
                  v-close-popup>
                  <q-item-section class="admin-menu-section">
                     <q-icon name="fas fa-envelope"/>
                     <div>Request</div>
                  </q-item-section>
               </q-item>
               <q-item
                  to="/bug-report"
                  exact
                  clickable
                  v-close-popup>
                  <q-item-section class="admin-menu-section">
                     <q-icon name="fas fa-bug"/>
                     <div>Report</div>
                  </q-item-section>
               </q-item>
            </q-list>
         </q-menu>
      </q-btn>
   </q-tabs>
</template>

<script>
import { useRouter } from "vue-router";
import { mapActions, mapGetters } from "vuex";

export default {
   computed: {
      ...mapGetters("authorization", ["isLoggedIn"])
   },
   methods: {
      ...mapActions("authorization", ["logout"]),
      commitLogout() {
         this.logout();
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

.item-name, .admin-menu {
   font-family: Futura, sans-serif;
}

body.screen--xs, body.screen--sm {
   .tab {
      height: 6rem;
   }
}

body.screen--md, body.screen--lg, body.screen--xl, {
   .menu-cont {
      height: 100%;
   }

   .admin-menu {
      min-width: 150px;
   }

   .admin-menu-section {
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
      gap: 10px
   }

   .q-item.q-router-link--active, .q-item--active {
      color: white
   }
}

</style>
