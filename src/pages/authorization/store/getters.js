export default {
  isLoggedIn(state) {
    return state.isLoggedIn;
  },
  uid(state) {
    return state.uid;
  },
  currentUser(state) {
    return state.currentUser;
  },
  username(state) {
    return state.username;
  },
  email(state) {
    return state.email;
  },
  userInfo(state) {
    return state.userInfo;
  },
  whatsNew(state) {
    return state.userInfo.notifications.whatsNew;
  }
};
