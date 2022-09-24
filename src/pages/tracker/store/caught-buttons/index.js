import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      normal: false,
      shiny: false,
      alpha: false,
      shinyAlpha: false,
      marked: false,
      shinyMarked: false,
      pokerus: false,
      shinyPokerus: false,
      zeroIv: false,
      shinyZeroIv: false,
      sixIv: false,
      shinySixIv: false,
      favorite: false,


      shinyAvailable: false,
      alphaAvailable: false,
      shinyAlphaAvailable: false,
      markedAvailable: false,
      shinyMarkedAvailable: false,
    };
  },
  mutations,
  actions,
  getters,
};
