<template>
  <q-layout view="hHh lpR fFf">
    <the-navigation-bar class=""></the-navigation-bar>
    <!--      <main>-->
    <q-page-container>
      <router-view
        v-slot="slotProps">
        <transition
          name="router"
          mode="out-in">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
    </q-page-container>
    <!--      </main>-->
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
import TheNavigationBar from "./components/navigation/TheNavigationBar.vue";

export default {
  components: {
    TheNavigationBar
  },
  computed: {
    ...mapGetters("authorization", ["uid"])
  },
  watch: {
    uid(cur, prev) {
    }
    // didAutoLogout(curVal, oldVal) {
    // 	if (curVal && curVal !== oldVal) {
    // 		this.$router.replace('/login');
    // 	}
    // },
  }
};

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600&display=swap');
@import './css/variables.css';

* {
  margin: 0;
  box-sizing: border-box;
}

.q-dialog__backdrop {
  background: rgba(0, 0, 0, 0.7);
}

html {
  /* font-size: 62.5%; */
  background-color: var(--med-bg);
  font-family: Archivo, sans-serif;
  overflow-x: hidden;
}

.main {
  /*display: grid;*/
  /*grid-template-columns: 1fr;*/
  position: relative;
  top: 80px;
  /*color: var(--bg-grey);*/
  /*justify-content: center;*/
  /*background-color: var(--bg-offwhite);*/
  /*font-size: 1.6rem;*/
  /*overflow: hidden;*/
}

.router-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.router-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.router-enter-active {
  transition: all 0.2s ease-out;
}

.router-leave-active {
  transition: all 0.2s ease-in;
}

.router-enter-to,
.router-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/*
::-webkit-scrollbar {
	width: 2.5rem;
}
::-webkit-scrollbar-track {
	background: var(--bg-offwhite);
	border-radius: 2rem;
}
::-webkit-scrollbar-thumb {
	background: var(--bg-grey);
	border: 0.2rem solid var(--bg-offwhite);
	border-radius: 2rem;
	height: 18%;
}
::-webkit-scrollbar-thumb:hover {
	background: var(--main-red);
} */

@supports (scrollbar-color: red blue) {
  * {
    scrollbar-color: var(--bg-grey) var(--bg-offwhite);
    scrollbar-width: auto;
  }
}

@media (max-width: 77rem) {
}

@media (max-width: 48rem) {
}
</style>
