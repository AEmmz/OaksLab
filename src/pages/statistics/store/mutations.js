export default {
  saveDb(state, payload) {
    state.userDb = payload;
  },
  setStats(state, payload) {
    state.statistics.caught.all.total = payload.all.total;
    state.statistics.caught.all.longestTime = payload.all.lTime;
    state.statistics.caught.all.shortestTime = payload.all.sTime;
    state.statistics.caught.all.longestCount = payload.all.lCount;
    state.statistics.caught.all.shortestCount = payload.all.sCount;
    //Normal
    state.statistics.caught.normal.total = payload.normal.total;
    state.statistics.caught.normal.longestTime = payload.normal.lTime;
    state.statistics.caught.normal.shortestTime = payload.normal.sTime;
    state.statistics.caught.normal.longestCount = payload.normal.lCount;
    state.statistics.caught.normal.shortestCount = payload.normal.sCount;
    //Shiny
    state.statistics.caught.shiny.total = payload.shiny.total;
    state.statistics.caught.shiny.longestTime = payload.shiny.lTime;
    state.statistics.caught.shiny.shortestTime = payload.shiny.sTime;
    state.statistics.caught.shiny.longestCount = payload.shiny.lCount;
    state.statistics.caught.shiny.shortestCount = payload.shiny.sCount;
    //Alpha
    state.statistics.caught.alpha.total = payload.alpha.total;
    state.statistics.caught.alpha.longestTime = payload.alpha.lTime;
    state.statistics.caught.alpha.shortestTime = payload.alpha.sTime;
    state.statistics.caught.alpha.longestCount = payload.alpha.lCount;
    state.statistics.caught.alpha.shortestCount = payload.alpha.sCount;
    //Shiny Alpha
    state.statistics.caught.shinyAlpha.total = payload.shinyAlpha.total;
    state.statistics.caught.shinyAlpha.longestTime = payload.shinyAlpha.lTime;
    state.statistics.caught.shinyAlpha.shortestTime = payload.shinyAlpha.sTime;
    state.statistics.caught.shinyAlpha.longestCount = payload.shinyAlpha.lCount;
    state.statistics.caught.shinyAlpha.shortestCount = payload.shinyAlpha.sCount;
    //Marked
    state.statistics.caught.marked.total = payload.marked.total;
    state.statistics.caught.marked.longestTime = payload.marked.lTime;
    state.statistics.caught.marked.shortestTime = payload.marked.sTime;
    state.statistics.caught.marked.longestCount = payload.marked.lCount;
    state.statistics.caught.marked.shortestCount = payload.marked.sCount;
    //Shiny Marked
    state.statistics.caught.shinyMarked.total = payload.shinyMarked.total;
    state.statistics.caught.shinyMarked.longestTime = payload.shinyMarked.lTime;
    state.statistics.caught.shinyMarked.shortestTime = payload.shinyMarked.sTime;
    state.statistics.caught.shinyMarked.longestCount = payload.shinyMarked.lCount;
    state.statistics.caught.shinyMarked.shortestCount = payload.shinyMarked.sCount;
    //Pokerus
    state.statistics.caught.pokerus.total = payload.pokerus.total;
    state.statistics.caught.pokerus.longestTime = payload.pokerus.lTime;
    state.statistics.caught.pokerus.shortestTime = payload.pokerus.sTime;
    state.statistics.caught.pokerus.longestCount = payload.pokerus.lCount;
    state.statistics.caught.pokerus.shortestCount = payload.pokerus.sCount;
    //Shiny Pokerus
    state.statistics.caught.shinyPokerus.total = payload.shinyPokerus.total;
    state.statistics.caught.shinyPokerus.longestTime = payload.shinyPokerus.lTime;
    state.statistics.caught.shinyPokerus.shortestTime = payload.shinyPokerus.sTime;
    state.statistics.caught.shinyPokerus.longestCount = payload.shinyPokerus.lCount;
    state.statistics.caught.shinyPokerus.shortestCount = payload.shinyPokerus.sCount;
    //Six IV
    state.statistics.caught.sixIv.total = payload.sixIv.total;
    state.statistics.caught.sixIv.longestTime = payload.sixIv.lTime;
    state.statistics.caught.sixIv.shortestTime = payload.sixIv.sTime;
    state.statistics.caught.sixIv.longestCount = payload.sixIv.lCount;
    state.statistics.caught.sixIv.shortestCount = payload.sixIv.sCount;
    //Shiny Six IV
    state.statistics.caught.shinySixIv.total = payload.shinySixIv.total;
    state.statistics.caught.shinySixIv.longestTime = payload.shinySixIv.lTime;
    state.statistics.caught.shinySixIv.shortestTime = payload.shinySixIv.sTime;
    state.statistics.caught.shinySixIv.longestCount = payload.shinySixIv.lCount;
    state.statistics.caught.shinySixIv.shortestCount = payload.shinySixIv.sCount;
    //Zero IV
    state.statistics.caught.zeroIv.total = payload.zeroIv.total;
    state.statistics.caught.zeroIv.longestTime = payload.zeroIv.lTime;
    state.statistics.caught.zeroIv.shortestTime = payload.zeroIv.sTime;
    state.statistics.caught.zeroIv.longestCount = payload.zeroIv.lCount;
    state.statistics.caught.zeroIv.shortestCount = payload.zeroIv.sCount;
    //Shiny Zero IV
    state.statistics.caught.shinyZeroIv.total = payload.shinyZeroIv.total;
    state.statistics.caught.shinyZeroIv.longestTime = payload.shinyZeroIv.lTime;
    state.statistics.caught.shinyZeroIv.shortestTime = payload.shinyZeroIv.sTime;
    state.statistics.caught.shinyZeroIv.longestCount = payload.shinyZeroIv.lCount;
    state.statistics.caught.shinyZeroIv.shortestCount = payload.shinyZeroIv.sCount;

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
    state.statistics.caught.all.available = payload.all.total;
    state.statistics.caught.normal.available = payload.normal.total;
    state.statistics.caught.shiny.available = payload.shiny.total;
    state.statistics.caught.alpha.available = payload.alpha.total;
    state.statistics.caught.shinyAlpha.available = payload.shinyAlpha.total;
    state.statistics.caught.marked.available = payload.marked.total;
    state.statistics.caught.shinyMarked.available = payload.shinyMarked.total;
    state.statistics.caught.pokerus.available = payload.pokerus.total;
    state.statistics.caught.shinyPokerus.available = payload.shinyPokerus.total;
    state.statistics.caught.sixIv.available = payload.sixIv.total;
    state.statistics.caught.shinySixIv.available = payload.shinySixIv.total;
    state.statistics.caught.zeroIv.available = payload.zeroIv.total;
    state.statistics.caught.shinyZeroIv.available = payload.shinyZeroIv.total;
    state.statistics.generation.gen1.available = payload.gen1;
    state.statistics.generation.gen2.available = payload.gen2;
    state.statistics.generation.gen3.available = payload.gen3;
    state.statistics.generation.gen4.available = payload.gen4;
    state.statistics.generation.gen5.available = payload.gen5;
    state.statistics.generation.gen6.available = payload.gen6;
    state.statistics.generation.gen7.available = payload.gen7;
    state.statistics.generation.gen8.available = payload.gen8;
    state.statistics.generation.gen9.available = payload.gen9;
  },

  setFormStats(state, payload) {
    state.statistics.misc.gmax = payload.gmax;
    state.statistics.misc.mega = payload.mega;
  },

  setMiscStats(state, payload) {
    state.statistics.misc.alcremie = payload.alcremie;
    state.statistics.misc.flebebe = payload.flebebe;
    state.statistics.misc.floette = payload.floette;
    state.statistics.misc.florges = payload.florges;
    state.statistics.misc.furfrou = payload.furfrou;
    state.statistics.misc.minior = payload.minior;
    state.statistics.misc.oricorio = payload.oricorio;
    state.statistics.misc.unown = payload.unown;
    state.statistics.misc.vivillon = payload.vivillon;
  }

};

