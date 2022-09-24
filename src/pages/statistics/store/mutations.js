export default {
  saveDb(state, payload) {
    state.userDb = payload;
  },
  setStats(state, payload) {
    state.statistics.caught.all.total = payload.all;
    state.statistics.caught.normal.total = payload.normal;
    state.statistics.caught.shiny.total = payload.shiny;
    state.statistics.caught.alpha.total = payload.alpha;
    state.statistics.caught.shinyAlpha.total = payload.shinyAlpha;
    state.statistics.caught.marked.total = payload.marked;
    state.statistics.caught.shinyMarked.total = payload.shinyMarked;
    state.statistics.caught.pokerus.total = payload.pokerus;
    state.statistics.caught.shinyPokerus.total = payload.shinyPokerus;
    state.statistics.caught.sixIv.total = payload.sixIv;
    state.statistics.caught.shinySixIv.total = payload.shinySixIv;
    state.statistics.caught.zeroIv.total = payload.zeroIv;
    state.statistics.caught.shinyZeroIv.total = payload.shinyZeroIv;
    state.statistics.generation.gen1.caught = payload.gen1;
    state.statistics.generation.gen2.caught = payload.gen2;
    state.statistics.generation.gen3.caught = payload.gen3;
    state.statistics.generation.gen4.caught = payload.gen4;
    state.statistics.generation.gen5.caught = payload.gen5;
    state.statistics.generation.gen6.caught = payload.gen6;
    state.statistics.generation.gen7.caught = payload.gen7;
    state.statistics.generation.gen8.caught = payload.gen8;
    state.statistics.generation.gen9.caught = payload.gen9;
  },

  setAvailableStats(state, payload) {
    state.statistics.caught.all.available = payload.all;
    state.statistics.caught.normal.available = payload.normal;
    state.statistics.caught.shiny.available = payload.shiny;
    state.statistics.caught.alpha.available = payload.alpha;
    state.statistics.caught.shinyAlpha.available = payload.shinyAlpha;
    state.statistics.caught.marked.available = payload.marked;
    state.statistics.caught.shinyMarked.available = payload.shinyMarked;
    state.statistics.caught.pokerus.available = payload.pokerus;
    state.statistics.caught.shinyPokerus.available = payload.shinyPokerus;
    state.statistics.caught.sixIv.available = payload.sixIv;
    state.statistics.caught.shinySixIv.available = payload.shinySixIv;
    state.statistics.caught.zeroIv.available = payload.zeroIv;
    state.statistics.caught.shinyZeroIv.available = payload.shinyZeroIv;
    state.statistics.generation.gen1.available = payload.gen1;
    state.statistics.generation.gen2.available = payload.gen2;
    state.statistics.generation.gen3.available = payload.gen3;
    state.statistics.generation.gen4.available = payload.gen4;
    state.statistics.generation.gen5.available = payload.gen5;
    state.statistics.generation.gen6.available = payload.gen6;
    state.statistics.generation.gen7.available = payload.gen7;
    state.statistics.generation.gen8.available = payload.gen8;
    state.statistics.generation.gen9.available = payload.gen9;
  }

};

