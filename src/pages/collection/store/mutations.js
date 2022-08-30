export default {
  setShinyView(state, payload) {
    state.collectionSettings = payload;
  },
  setDefaultLists(state, payload) {
    state.userList = payload;
  }
};
