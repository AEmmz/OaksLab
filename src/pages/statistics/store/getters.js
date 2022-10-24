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
  teraStats(state) {
    return {
      teraAll: state.statistics.caught.teraAll,
      teraBug: state.statistics.caught.teraBug,
      teraDark: state.statistics.caught.teraDark,
      teraDragon: state.statistics.caught.teraDragon,
      teraElectric: state.statistics.caught.teraElectric,
      teraFairy: state.statistics.caught.teraFairy,
      teraFighting: state.statistics.caught.teraFighting,
      teraFire: state.statistics.caught.teraFire,
      teraFlying: state.statistics.caught.teraFlying,
      teraGhost: state.statistics.caught.teraGhost,
      teraGrass: state.statistics.caught.teraGrass,
      teraGround: state.statistics.caught.teraGround,
      teraIce: state.statistics.caught.teraIce,
      teraNormal: state.statistics.caught.teraNormal,
      teraPoison: state.statistics.caught.teraPoison,
      teraPsychic: state.statistics.caught.teraPsychic,
      teraRock: state.statistics.caught.teraRock,
      teraSteel: state.statistics.caught.teraSteel,
      teraWater: state.statistics.caught.teraWater,
      teraShinyAll: state.statistics.caught.teraShinyAll,
      teraShinyBug: state.statistics.caught.teraShinyBug,
      teraShinyDark: state.statistics.caught.teraShinyDark,
      teraShinyDragon: state.statistics.caught.teraShinyDragon,
      teraShinyElectric: state.statistics.caught.teraShinyElectric,
      teraShinyFairy: state.statistics.caught.teraShinyFairy,
      teraShinyFighting: state.statistics.caught.teraShinyFighting,
      teraShinyFire: state.statistics.caught.teraShinyFire,
      teraShinyFlying: state.statistics.caught.teraShinyFlying,
      teraShinyGhost: state.statistics.caught.teraShinyGhost,
      teraShinyGrass: state.statistics.caught.teraShinyGrass,
      teraShinyGround: state.statistics.caught.teraShinyGround,
      teraShinyIce: state.statistics.caught.teraShinyIce,
      teraShinyNormal: state.statistics.caught.teraShinyNormal,
      teraShinyPoison: state.statistics.caught.teraShinyPoison,
      teraShinyPsychic: state.statistics.caught.teraShinyPsychic,
      teraShinyRock: state.statistics.caught.teraShinyRock,
      teraShinySteel: state.statistics.caught.teraShinySteel,
      teraShinyWater: state.statistics.caught.teraShinyWater
    };
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
