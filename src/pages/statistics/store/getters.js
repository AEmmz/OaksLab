export default {
  userDb(state) {
    return state.userDb;
  },
  allStats(state) {
    return state.statistics.caught.all;
  },
  normalStats(state) {
    return state.statistics.caught.normal;
  },
  shinyStats(state) {
    return state.statistics.caught.shiny;
  },
  alphaStats(state) {
    return state.statistics.caught.alpha;
  },
  shinyAlphaStats(state) {
    return state.statistics.caught.shinyAlpha;
  },
  markedStats(state) {
    return state.statistics.caught.marked;
  },
  shinyMarkedStats(state) {
    return state.statistics.caught.shinyMarked;
  },
  pokerusStats(state) {
    return state.statistics.caught.pokerus;
  },
  shinyPokerusStats(state) {
    return state.statistics.caught.shinyPokerus;
  },
  sixIvStats(state) {
    return state.statistics.caught.sixIv;
  },
  shinySixIvStats(state) {
    return state.statistics.caught.shinySixIv;
  },
  zeroIvStats(state) {
    return state.statistics.caught.zeroIv;
  },
  shinyZeroIvStats(state) {
    return state.statistics.caught.shinyZeroIv;
  },
  generationStats(state) {
    return state.statistics.generation;
  },
  generationPercent(state) {
    const data = state.statistics.generation;
    return (id) => {
      const dataArray = [
        ((data.gen1.caught?.[id] / data.gen1.available?.[id]) * 100).toFixed(2),
        ((data.gen2.caught?.[id] / data.gen2.available?.[id]) * 100).toFixed(2),
        ((data.gen3.caught?.[id] / data.gen3.available?.[id]) * 100).toFixed(2),
        ((data.gen4.caught?.[id] / data.gen4.available?.[id]) * 100).toFixed(2),
        ((data.gen5.caught?.[id] / data.gen5.available?.[id]) * 100).toFixed(2),
        ((data.gen6.caught?.[id] / data.gen6.available?.[id]) * 100).toFixed(2),
        ((data.gen7.caught?.[id] / data.gen7.available?.[id]) * 100).toFixed(2),
        ((data.gen8.caught?.[id] / data.gen8.available?.[id]) * 100).toFixed(2),
        ((data.gen9.caught?.[id] / data.gen9.available?.[id]) * 100).toFixed(2)
      ];

      return dataArray.map((val) => {
        return val === "NaN" ? 0 : val;
      });
    };

  }


};
