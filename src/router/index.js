import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory
} from "vue-router";
import routes from "./routes";
import { useUserStore } from "pages/authorization/_UserStore";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function({}) {
  const userStore = useUserStore();
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  });

  Router.beforeEach(async (to, from, next) => {
    if (
      to.matched.some((record) => record.meta.requiresAuth) &&
      !userStore.currentUser
    ) {
      next("/login");
    } else if (
      to.matched.some((record) => record.meta.requiresNotAuth) &&
      userStore.currentUser
    ) {
      next("/home");
    } else {
      next();
    }
  });


  return Router;
});
