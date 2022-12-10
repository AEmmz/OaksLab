const Admin = () => import("../pages/authorization/TheAdmin.vue");
const BugReport = () => import("../pages/authorization/TheBugReport.vue");
const Collection = () => import("../pages/collection/TheCollection.vue");
const FeatureRequest = () => import("../pages/authorization/TheFeatureRequest.vue");
const Home = () => import("src/pages/main/TheHome.vue");
const LocationMaps = () => import("src/pages/location-maps/LocationMaps.vue");
const Login = () => import("../pages/authorization/TheLogin.vue");
const QuickCollectionUpdate = () => import("../pages/collection/components/QuickCollectionUpdate/QuickCollectionUpdate.vue");
const Register = () => import("../pages/authorization/TheRegister.vue");
const Statistics = () => import("../pages/statistics/TheStatistics.vue");
// const StreamerTools = () => import("../pages/streamer-tools/StreamerTools.vue");
const Tracker = () => import("../pages/tracker/TheTracker.vue");
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
    path: "/collection/quick-update",
    name: "quick-update",
    component: QuickCollectionUpdate,
    meta: { requiresAuth: true }
  },
  {
    path: "/collection/",
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
  {
    path: "/location-maps",
    component: LocationMaps,
    name: "location-maps",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/bug-report",
    component: BugReport,
    name: "bug-report",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/feature-request",
    component: FeatureRequest,
    name: "feature-request",
    meta: {
      requiresAuth: true
    }
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
