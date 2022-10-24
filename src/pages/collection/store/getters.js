export default {
  userList(state) {
    return state.userList;
  },
  collectionSettings(state) {
    return state.collectionSettings;
  },
  persistedFilters(state) {
    return state.filters;
  },
  caughtData_Normal(state) {
    return state.caughtData.normal;
  },
  caughtData_Shiny(state) {
    return state.caughtData.shiny;
  },
  caughtData_Tera(state) {
    return state.caughtData.tera;
  },
  caughtData_Pokeball(state) {
    return state.caughtData.pokeball;
  }
};
