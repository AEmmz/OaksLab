export default {
  userDb(state) {
    return state.userDb;
  },
  allStats(state) {
    return state.statistics.caught.all;
  },
  availableStats(state) {
    return state.statistics.available;
  },
  miscStats(state) {
    return { ...state.statistics.misc, ...state.statistics.miscDex };
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
  teraAvailableStats(state) {
    return {
      teraAll: state.statistics.available.teraAll,
      teraBug: state.statistics.available.teraBug,
      teraDark: state.statistics.available.teraDark,
      teraDragon: state.statistics.available.teraDragon,
      teraElectric: state.statistics.available.teraElectric,
      teraFairy: state.statistics.available.teraFairy,
      teraFighting: state.statistics.available.teraFighting,
      teraFire: state.statistics.available.teraFire,
      teraFlying: state.statistics.available.teraFlying,
      teraGhost: state.statistics.available.teraGhost,
      teraGrass: state.statistics.available.teraGrass,
      teraGround: state.statistics.available.teraGround,
      teraIce: state.statistics.available.teraIce,
      teraNormal: state.statistics.available.teraNormal,
      teraPoison: state.statistics.available.teraPoison,
      teraPsychic: state.statistics.available.teraPsychic,
      teraRock: state.statistics.available.teraRock,
      teraSteel: state.statistics.available.teraSteel,
      teraWater: state.statistics.available.teraWater,
      teraShinyAll: state.statistics.available.teraShinyAll,
      teraShinyBug: state.statistics.available.teraShinyBug,
      teraShinyDark: state.statistics.available.teraShinyDark,
      teraShinyDragon: state.statistics.available.teraShinyDragon,
      teraShinyElectric: state.statistics.available.teraShinyElectric,
      teraShinyFairy: state.statistics.available.teraShinyFairy,
      teraShinyFighting: state.statistics.available.teraShinyFighting,
      teraShinyFire: state.statistics.available.teraShinyFire,
      teraShinyFlying: state.statistics.available.teraShinyFlying,
      teraShinyGhost: state.statistics.available.teraShinyGhost,
      teraShinyGrass: state.statistics.available.teraShinyGrass,
      teraShinyGround: state.statistics.available.teraShinyGround,
      teraShinyIce: state.statistics.available.teraShinyIce,
      teraShinyNormal: state.statistics.available.teraShinyNormal,
      teraShinyPoison: state.statistics.available.teraShinyPoison,
      teraShinyPsychic: state.statistics.available.teraShinyPsychic,
      teraShinyRock: state.statistics.available.teraShinyRock,
      teraShinySteel: state.statistics.available.teraShinySteel,
      teraShinyWater: state.statistics.available.teraShinyWater
    };
  },
  generationData(state) {
    const caughtData = state.statistics.generation.caught;
    const availableData = state.statistics.generation.available;

    return (id) => {
      const dataArray = [];
      const totalArray = [];
      const availableArray = [];
      const genTemplate = (gen) => {
        return {
          total: caughtData[gen]?.[id],
          available: availableData[gen]?.[id],
          percent: ((caughtData[gen]?.[id] / availableData[gen]?.[id]) * 100).toFixed(2)
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
