export default {
  setShinyView(state, payload) {
    state.collectionSettings = payload;
  },
  setDefaultLists(state, payload) {
    state.userList = payload;
  },
  persistFilters(state, payload) {
    if (payload.isQuickEdit) {
      state.quickEditFilters = payload.filters;
    } else {
      state.filters = payload.filters;
    }
  },
  resetFilters(state) {
    state.filters.searchQuery = "";
    state.filters.sortQuery = "Dex: Asc";
    state.filters.caughtQuery = "My Caught";
    state.filters.needQuery = "None";
    state.filters.generationQuery = "All";
    state.filters.typeQuery1 = "All";
    state.filters.typeQuery2 = "All";
  },
  setQuickEditCaughtData(state, payload) {
    state.caughtData = payload;
  },
  quickEditToggler(state, payload) {
    const type = payload.type;
    const tab = payload.tab;
    state.caughtData[tab].caught[type] = !state.caughtData[tab].caught[type];
  },
  collectionQuickEditToggler(state, payload) {
    const apiNo = payload.apiNo;
    const catchType = payload.catchType;
    const catchValue = payload.catchValue;
    state.userList.forEach((pokemon) => {
      if (+pokemon[0] === +apiNo) {
        pokemon[1].catch[catchType] = catchValue;
      }
    })
  }
};
