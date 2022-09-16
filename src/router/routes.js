const Tracker = () => import("../pages/tracker/TheTracker.vue");
const Home = () => import("../pages/main/TheHome.vue");
const Register = () => import("../pages/authorization/TheRegister.vue");
const Login = () => import("../pages/authorization/TheLogin.vue");
const Admin = () => import("../pages/authorization/TheAdmin.vue");
const Collection = () => import("../pages/collection/TheCollection.vue");
const Statistics = () => import("../pages/statistics/TheStatistics.vue");
const NotFound = () => import("../pages/page-not-found/PageNotFound.vue");

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/tracker",
    component: Tracker,
    name: "tracker",
    meta: { requiresAuth: true },
    children: [{ path: ":pkName", component: Tracker }]
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { requiresNotAuth: true }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { requiresNotAuth: true }
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: { requiresAuth: true }
  },
  {
    path: "/collection",
    name: "collection",
    component: Collection,
    meta: { requiresAuth: true }
  },
  {
    path: "/statistics",
    component: Statistics,
    name: "statistics",
    meta: {
      requiresAuth: true
    }
  },
  { path: "/:notFound(.*)", component: NotFound }
];

export default routes;
