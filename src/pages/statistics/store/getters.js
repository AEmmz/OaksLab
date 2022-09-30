export default {
  userDb(state) {
    return state.userDb;
  },
  allStats(state) {
    return state.statistics.caught.all;
  },
  miscStats(state) {
    return state.statistics.misc;
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
  generationData(state) {
    const data = state.statistics.generation;

    return (id) => {
      const dataArray = [];
      const totalArray = [];
      const availableArray = [];
      const genTemplate = (gen) => {
        return {
          total: data[gen].caught?.[id],
          available: data[gen].available?.[id],
          percent: ((data[gen].caught?.[id] / data[gen].available?.[id]) * 100).toFixed(2)
        };
      };
      const genObject =
        {
          gen1: genTemplate("gen1"),
          gen2: genTemplate("gen2"),
          gen3: genTemplate("gen3"),
          gen4: genTemplate("gen4"),
          gen5: genTemplate("gen5"),
          gen6: genTemplate("gen6"),
          gen7: genTemplate("gen7"),
          gen8: genTemplate("gen8"),
          gen9: genTemplate("gen9")
        };
      for (const gen in genObject) {
        if (genObject[gen].percent === "NaN") {
          genObject[gen].total = 0;
          genObject[gen].available = 0;
          genObject[gen].percent = 0;
        }
        dataArray.push(genObject[gen].percent);
        totalArray.push(genObject[gen].total);
        availableArray.push((genObject[gen].available));
      }
      return { data: dataArray, total: totalArray, available: availableArray };
    };
  }
};
