export default {
  autoAuth(state, payload) {
    state.isLoggedIn = payload.isLoggedIn;
    state.currentUser = payload.currentUser;
    state.uid = payload.uid;
    state.email = payload.email;
  },
  setUsername(state, payload) {
    state.username = payload.username;
  },
  setEmail(state, payload) {
    state.email = payload.email;
  },
  logout(state) {
    state.isLoggedIn = false;
    state.currentUser = null;
    state.uid = null;
    state.email = null;
    state.username = null;
  }
};
