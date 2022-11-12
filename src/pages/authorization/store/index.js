import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      uid: null,
      currentUser: null,
      isLoggedIn: false,
      username: null,
      email: null,
      userInfo: {
        username: "",
        collectionSettings: {
          shinyView: "All Normal"
        },
        notifications: {
          whatsNew: false
        },
        selectedGame: "Scarlet / Violet"
      }
    };
  },
  mutations,
  actions,
  getters
};
