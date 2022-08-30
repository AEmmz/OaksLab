import { store } from "quasar/wrappers";
import { createStore } from "vuex";
import authorization from "../pages/authorization/store/index.js";
import activePokemon from "../pages/tracker/store/tracker/index.js";
import collection from "pages/collection/store";
import statistics from "../pages/statistics/store/index.js";
import navigation from "../components/navigation/store/index.js";

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function(/* { ssrContext } */) {
  const store = createStore({
    modules: {
      authorization: authorization,
      tracker: activePokemon,
      collection: collection,
      statistics: statistics,
      navigation: navigation
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  });

  return store;
});

export { store };
