<template>
   <q-header
      :reveal="!desktopCheck()"
      elevated
      class="toolbar-cont"
      :class="[{'homepage-header' : homepageToolbar}, {'greenscreen-header': greenScreenToolBar}]"
      v-intersection="onIntersection">

      <!--Mobile Menu -->
      <q-toolbar class="bg-dark row justify-between fixed toolbar lt-md text-light shadow-2">
         <q-btn
            @click="drawerLeft = true"
            class="q-ma-sm"
            flat
            round
            icon="fas fa-bars"/>
         <q-toolbar-title class="mobile-title">
            DexHunt
         </q-toolbar-title>
         <q-btn
            v-if="this.$router.currentRoute.value.path === '/collection'"
            icon="fas fa-pen"
            class="q-ma-sm"
            flat
            size="sm"
            round
            to="/collection/quick-update"/>
         <q-btn
            v-if="this.$router.currentRoute.value.path === '/collection/quick-update'"
            icon="fas fa-grip"
            class="q-ma-sm"
            flat
            size="sm"
            round
            to="/collection"/>
      </q-toolbar>

      <!-- Desktop Menu -->
      <q-toolbar class="bg-dark row justify-between fixed toolbar gt-sm">
         <div class="site-header row items-center text-h4">
            <q-icon
               name="icon-poke-pokeball"
               size="sm"
               class="q-pt-xs q-pr-sm"/>
            <router-link
               to="/home"
               class="home-link text-light">DexHunt
            </router-link>
            <q-icon
               name="icon-poke-pokeball"
               size="sm"
               class="q-pt-xs q-pl-sm"/>
         </div>
         <div class="menu-bar row justify-end">
            <social-bar></social-bar>
            <menu-bar></menu-bar>
         </div>
      </q-toolbar>

      <!-- Mobile Menu Drawer -->
      <q-drawer
         v-if="!desktopCheck()"
         v-model="drawerLeft"
         :width="250"
         :breakpoint="1439"
         overlay
         elevated
         show-if-above
         class="bg-dark text-white lt-md">
         <q-scroll-area class="fit">
            <div class="row items-center justify-center">
               <q-icon
                  name="icon-poke-pokeball"
                  size="xs"
                  class="q-pr-md"/>
               <router-link
                  to="/home"
                  class="text-h5 text-light text-center q-py-md q-my-lg mobile-title">DexHunt
               </router-link>
               <q-icon
                  name="icon-poke-pokeball"
                  size="xs"
                  class="q-pl-md"/>
            </div>
            <q-separator
               dark
               inset></q-separator>
            <social-bar class="q-py-sm"></social-bar>
            <q-separator
               dark
               inset></q-separator>
            <div class="menu">
               <div
                  class="q-my-sm q-py-xs mobile-menu"
                  v-if="userStore.isLoggedIn">
                  <menu-bar></menu-bar>
               </div>
               <q-separator
                  dark
                  inset></q-separator>
               <div class="q-my-lg q-py-md">
                  <auth-bar></auth-bar>
               </div>
               <q-separator
                  dark
                  inset></q-separator>
            </div>
         </q-scroll-area>
      </q-drawer>
   </q-header>
</template>

<script>
import { useUserStore } from "pages/authorization/_UserStore";
import AuthBar from "./components/AuthBar.vue";
import MenuBar from "./components/MenuBar.vue";
import SocialBar from "./components/SocialBar.vue";

export default {
   components: { AuthBar, MenuBar, SocialBar },
   setup() {
      const userStore = useUserStore();
      return { userStore };
   },
   data() {
      return {
         drawerLeft: false,
         headerIntersect: false
      };
   },
   computed: {
      homepageToolbar() {
         return this.$router.currentRoute.value.path === "/" || this.$router.currentRoute.value.path === "/home";
      },
      greenScreenToolBar() {
         return this.$router.currentRoute.value.path === "/streamer";
      }
   },
   methods: {
      desktopCheck() {
         return this.$q.screen.gt.sm;
      },
      onIntersection(entry) {
         this.headerIntersect = entry.isIntersecting;
      }
   }
};
</script>

<style
   scoped
   lang="scss">

.greenscreen-header {
   //display: none
}

//.auth-bar,
//.name-bar,
//.menu-bar {
//  width: 25%;
//}

.auth-bar,
.menu-bar {
   height: 100%;
}

.home {
   text-decoration: none;
   color: white;
}


body.screen--xs, body.screen--sm {
   .toolbar-cont {
      height: 4rem;
   }

   .toolbar {
      height: 4rem;
   }

   .mobile-title {
      font-family: Gellix, sans-serif;
      text-decoration: none;
   }

   .homepage-header {
      top: -9rem;
      transition: 0.5s ease-in-out all;
   }
}

body.screen--md {
}

body.screen--lg, body.screen--xl {
}

body.screen--md, body.screen--lg, body.screen--xl, {
   .toolbar-cont {
      height: 4rem;
   }

   .toolbar {
      height: 4rem;
      overflow: hidden;

   }

   .home-link {
      text-decoration: none;
   }

   .site-header {
      font-family: Gellix, sans-serif;
   }

   .homepage-header {
      top: -9rem;
      transition: 0.5s ease-in-out all;
   }

}
</style>
