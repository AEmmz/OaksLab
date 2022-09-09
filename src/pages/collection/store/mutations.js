export default {
  setShinyView(state, payload) {
    state.collectionSettings = payload;
  },
  setDefaultLists(state, payload) {
    state.userList = payload;
  },
  persistFilters(state, payload) {
    state.filters.searchQuery = payload.searchQuery;
    state.filters.sortQuery = payload.sortQuery;
    state.filters.caughtQuery = payload.caughtQuery;
    state.filters.needQuery = payload.needQuery;
    state.filters.generationQuery = payload.generationQuery;
    state.filters.typeQuery1 = payload.typeQuery1;
    state.filters.typeQuery2 = payload.typeQuery2;
    state.filters.shinyView = payload.shinyView;
  },
  resetFilters(state) {
    state.filters.searchQuery = "";
    state.filters.sortQuery = "Dex: Asc";
    state.filters.caughtQuery = "My Caught";
    state.filters.needQuery = "None";
    state.filters.generationQuery = "All";
    state.filters.typeQuery1 = "All";
    state.filters.typeQuery2 = "All";
  }
};
