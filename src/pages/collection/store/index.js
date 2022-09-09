import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";


export default {
  namespaced: true,
  state() {
    return {
      userList: null,
      collectionSettings: null,
      filters: {
        searchQuery: "",
        sortQuery: "Dex: Asc",
        caughtQuery: "My Caught",
        needQuery: "None",
        generationQuery: "All",
        typeQuery1: "All",
        typeQuery2: "All",
        shinyView: "All Normal"
      }
    };
  },
  mutations,
  actions,
  getters
};
