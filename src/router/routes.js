const Tracker = () => import("../pages/tracker/TheTracker.vue");
const Home = () => import("../pages/main/TheHome.vue");
const Register = () => import("../pages/authorization/TheRegister.vue");
const Login = () => import("../pages/authorization/TheLogin.vue");
const Admin = () => import("../pages/authorization/TheAdmin.vue");
const Collection = () => import("../pages/collection/TheCollection.vue");
const Statistics = () => import("../pages/statistics/TheStatistics.vue");
// const StreamerTools = () => import("../pages/streamer-tools/StreamerTools.vue");
const QuickCollectionUpdate = () => import("../pages/collection/components/QuickCollectionUpdate/QuickCollectionUpdate.vue");
const BugReport = () => import("../pages/authorization/TheBugReport.vue");
const FeatureRequest = () => import("../pages/authorization/TheFeatureRequest.vue");
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
    children: [{ path: ":pkName", component: Tracker }],
    redirect: "/home"
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
    meta: { requiresNotAuth: true },
    redirect: "/home"
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { requiresNotAuth: true },
    redirect: "/home"
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: { requiresAuth: true },
    redirect: "/home"
  },
  {
    path: "/collection/quick-update",
    name: "quick-update",
    component: QuickCollectionUpdate,
    meta: { requiresAuth: true },
    redirect: "/home"
  },
  {
    path: "/collection/",
    name: "collection",
    component: Collection,
    meta: { requiresAuth: true },
    redirect: "/home"
  },
  {
    path: "/statistics",
    component: Statistics,
    name: "statistics",
    meta: {
      requiresAuth: true
    },
    redirect: "/home"
  },
  {
    path: "/bug-report",
    component: BugReport,
    name: "bug-report",
    meta: {
      requiresAuth: true
    },
    redirect: "/home"
  },
  {
    path: "/feature-request",
    component: FeatureRequest,
    name: "feature-request",
    meta: {
      requiresAuth: true
    },
    redirect: "/home"
  },
  // {
  //   path: "/streamer",
  //   component: StreamerTools,
  //   name: "streamertools",
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  { path: "/:notFound(.*)", component: NotFound }
];

export default routes;
