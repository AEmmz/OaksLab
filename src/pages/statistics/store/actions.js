import { getDatabase, ref, child, get, update } from "firebase/database";
import { catchLock } from "src/util/tracker/catchLock";

const PokeList = () => import("../../../assets/json/pokemonList.json");

export default {
  async fetchStats(context, huntType) {
    const uid = context.rootGetters["authorization/uid"];
    const dbRef = ref(getDatabase());
    const data = await get(child(dbRef, `users/${uid}/pokedex`));
    const userData = Object.entries(data.val());
    await context.commit("saveDb", userData);
    await context.dispatch("calculateAllCaught", userData);
    await context.dispatch("calculateAllTotal");
  },

  async calculateAllCaught(context, userData) {
    let totalCount = 0;
    let normalCount = 0;
    let shinyCount = 0;
    let alphaCount = 0;
    let shinyAlphaCount = 0;
    let markedCount = 0;
    let shinyMarkedCount = 0;
    let pokerusCount = 0;
    let shinyPokerusCount = 0;
    let sixIvCount = 0;
    let shinySixIvCount = 0;
    let zeroIvCount = 0;
    let shinyZeroIvCount = 0;

    let generationCounts = {
      all: 0,
      normal: 0,
      shiny: 0,
      alpha: 0,
      shinyAlpha: 0,
      marked: 0,
      shinyMarked: 0,
      pokerus: 0,
      shinyPokerus: 0,
      sixIv: 0,
      shinySixIv: 0,
      zeroIv: 0,
      shinyZeroIv: 0
    };

    let gen1Counts = { ...generationCounts };
    let gen2Counts = { ...generationCounts };
    let gen3Counts = { ...generationCounts };
    let gen4Counts = { ...generationCounts };
    let gen5Counts = { ...generationCounts };
    let gen6Counts = { ...generationCounts };
    let gen7Counts = { ...generationCounts };
    let gen8Counts = { ...generationCounts };
    let gen9Counts = { ...generationCounts };

    const genCheck = (id, val) => {
      if (id <= 151) gen1Counts[val]++;
      else if (id <= 251) gen2Counts[val]++;
      else if (id <= 386) gen3Counts[val]++;
      else if (id <= 493) gen4Counts[val]++;
      else if (id <= 649) gen5Counts[val]++;
      else if (id <= 721) gen6Counts[val]++;
      else if (id <= 809) gen7Counts[val]++;
      else if (id <= 905) gen8Counts[val]++;
      else if (id <= 1000) gen9Counts[val]++;
    };

    userData.forEach((pk) => {
      const caughtObject = pk[1].catch;
      const pkId = pk[1].dexNo;
      for (const caught in caughtObject) {
        if (caughtObject[caught] === true) {
          totalCount++;
          genCheck(pkId, "all");
        }
        ;
        if (caught === "normalCaught" && caughtObject[caught] === true) {
          normalCount++;
          genCheck(pkId, "normal");
        }
        if (caught === "shinyCaught" && caughtObject[caught] === true) {
          shinyCount++;
          genCheck(pkId, "shiny");
        }
        if (caught === "alphaCaught" && caughtObject[caught] === true) {
          alphaCount++;
          genCheck(pkId, "alpha");
        }
        if (caught === "shinyAlphaCaught" && caughtObject[caught] === true) {
          shinyAlphaCount++;
          genCheck(pkId, "shinyAlpha");
        }
        if (caught === "markedCaught" && caughtObject[caught] === true) {
          markedCount++;
          genCheck(pkId, "marked");
        }
        if (caught === "shinyMarkedCaught" && caughtObject[caught] === true) {
          shinyMarkedCount++;
          genCheck(pkId, "shinyMarked");
        }
        if (caught === "pokerusCaught" && caughtObject[caught] === true) {
          pokerusCount++;
          genCheck(pkId, "pokerus");
        }
        if (caught === "shinyPokerusCaught" && caughtObject[caught] === true) {
          shinyPokerusCount++;
          genCheck(pkId, "shinyPokerus");
        }
        if (caught === "sixIvCaught" && caughtObject[caught] === true) {
          sixIvCount++;
          genCheck(pkId, "sixIv");
        }
        if (caught === "shinySixIvCaught" && caughtObject[caught] === true) {
          shinySixIvCount++;
          genCheck(pkId, "shinySixIv");
        }
        if (caught === "zeroIvCaught" && caughtObject[caught] === true) {
          zeroIvCount++;
          genCheck(pkId, "zeroIv");
        }
        if (caught === "shinyZeroIvCaught" && caughtObject[caught] === true) {
          shinyZeroIvCount++;
          genCheck(pkId, "shinyZeroIv");
        }
      }
    });

    const statistics = {
      all: totalCount,
      normal: normalCount,
      shiny: shinyCount,
      alpha: alphaCount,
      shinyAlpha: shinyAlphaCount,
      marked: markedCount,
      shinyMarked: shinyMarkedCount,
      pokerus: pokerusCount,
      shinyPokerus: shinyPokerusCount,
      sixIv: sixIvCount,
      shinySixIv: shinySixIvCount,
      zeroIv: zeroIvCount,
      shinyZeroIv: shinyZeroIvCount,
      gen1: gen1Counts,
      gen2: gen2Counts,
      gen3: gen3Counts,
      gen4: gen4Counts,
      gen5: gen5Counts,
      gen6: gen6Counts,
      gen7: gen7Counts,
      gen8: gen8Counts,
      gen9: gen9Counts
    };
    context.commit("setStats", statistics);
  },


  async calculateAllTotal(context) {
    let pokeArray = await PokeList();
    pokeArray = pokeArray.pokemon;
    let totalCount = 0;
    let normalCount = 0;
    let shinyCount = 0;
    let alphaCount = 0;
    let shinyAlphaCount = 0;
    let markedCount = 0;
    let shinyMarkedCount = 0;
    let pokerusCount = 0;
    let shinyPokerusCount = 0;
    let sixIvCount = 0;
    let shinySixIvCount = 0;
    let zeroIvCount = 0;
    let shinyZeroIvCount = 0;

    let generationCounts = {
      all: 0,
      normal: 0,
      shiny: 0,
      alpha: 0,
      shinyAlpha: 0,
      marked: 0,
      shinyMarked: 0,
      pokerus: 0,
      shinyPokerus: 0,
      sixIv: 0,
      shinySixIv: 0,
      zeroIv: 0,
      shinyZeroIv: 0
    };
    let gen1Counts = { ...generationCounts };
    let gen2Counts = { ...generationCounts };
    let gen3Counts = { ...generationCounts };
    let gen4Counts = { ...generationCounts };
    let gen5Counts = { ...generationCounts };
    let gen6Counts = { ...generationCounts };
    let gen7Counts = { ...generationCounts };
    let gen8Counts = { ...generationCounts };
    let gen9Counts = { ...generationCounts };

    const genCheck = (id, val) => {
      if (id <= 151) gen1Counts[val]++;
      else if (id <= 251) gen2Counts[val]++;
      else if (id <= 386) gen3Counts[val]++;
      else if (id <= 493) gen4Counts[val]++;
      else if (id <= 649) gen5Counts[val]++;
      else if (id <= 721) gen6Counts[val]++;
      else if (id <= 809) gen7Counts[val]++;
      else if (id <= 905) gen8Counts[val]++;
      else if (id <= 1000) gen9Counts[val]++;
    };

    pokeArray.forEach((pk) => {
      const apiNo = pk.apiNo;
      const pkId = +pk.dexNo;
      const lockCheck = catchLock(apiNo);
      for (const available in lockCheck) {
        if (lockCheck[available] === true) {
          totalCount++;
          genCheck(pkId, "all");
        }
        if (available === "normal" && lockCheck[available] === true) {
          normalCount++;
          genCheck(pkId, "normal");
        }
        if (available === "shiny" && lockCheck[available] === true) {
          shinyCount++;
          genCheck(pkId, "shiny");
        }
        if (available === "alpha" && lockCheck[available] === true) {
          alphaCount++;
          genCheck(pkId, "alpha");
        }
        if (available === "shinyAlpha" && lockCheck[available] === true) {
          shinyAlphaCount++;
          genCheck(pkId, "shinyAlpha");
        }
        if (available === "marked" && lockCheck[available] === true) {
          markedCount++;
          genCheck(pkId, "marked");
        }
        if (available === "shinyMarked" && lockCheck[available] === true) {
          shinyMarkedCount++;
          genCheck(pkId, "shinyMarked");
        }
        if (available === "pokerus" && lockCheck[available] === true) {
          pokerusCount++;
          genCheck(pkId, "pokerus");
        }
        if (available === "shinyPokerus" && lockCheck[available] === true) {
          shinyPokerusCount++;
          genCheck(pkId, "shinyPokerus");
        }
        if (available === "sixIv" && lockCheck[available] === true) {
          sixIvCount++;
          genCheck(pkId, "sixIv");
        }
        if (available === "shinySixIv" && lockCheck[available] === true) {
          shinySixIvCount++;
          genCheck(pkId, "shinySixIv");
        }
        if (available === "zeroIv" && lockCheck[available] === true) {
          zeroIvCount++;
          genCheck(pkId, "zeroIv");
        }
        if (available === "shinyZeroIv" && lockCheck[available] === true) {
          shinyZeroIvCount++;
          genCheck(pkId, "shinyZeroIv");
        }

      }
    });

    const statistics = {
      all: totalCount,
      normal: normalCount,
      shiny: shinyCount,
      alpha: alphaCount,
      shinyAlpha: shinyAlphaCount,
      marked: markedCount,
      shinyMarked: shinyMarkedCount,
      pokerus: pokerusCount,
      shinyPokerus: shinyPokerusCount,
      sixIv: sixIvCount,
      shinySixIv: shinySixIvCount,
      zeroIv: zeroIvCount,
      shinyZeroIv: shinyZeroIvCount,
      gen1: gen1Counts,
      gen2: gen2Counts,
      gen3: gen3Counts,
      gen4: gen4Counts,
      gen5: gen5Counts,
      gen6: gen6Counts,
      gen7: gen7Counts,
      gen8: gen8Counts,
      gen9: gen9Counts
    };

    context.commit("setAvailableStats", statistics);

  }

};
