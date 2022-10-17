// -----------------Imports------------------ //
import { getDatabase, ref, child, get } from "firebase/database";
import { catchLock } from "src/util/tracker/catchLock";
import { gmaxArray, megaArray } from "src/util/statistics/FormsArrays";
import PokeList from "../../../assets/json/pokemonList.json";

// const PokeList = () => import("../../../assets/json/pokemonList.json");

// -----------------General Setup------------------ //
const pokeArray = PokeList.pokemon;
const counts = {
  total: 0,
  lTime: { name: null, total: 0, category: null },
  sTime: { name: null, total: 0, category: null },
  lCount: { name: null, total: 0, category: null },
  sCount: { name: null, total: 0, category: null }
};
const generationCounts = {
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

export default {

  // -----------------Main Stats Tabs------------------ //
  async fetchStats(context) {
    const uid = context.rootGetters["authorization/uid"];
    const dbRef = ref(getDatabase());
    const data = await get(child(dbRef, `users/${uid}/pokedex`));
    const userData = Object.entries(data.val());
    await context.dispatch("calculateAllCaught", userData);
    await context.dispatch("calculateAllTotal");
    return userData;
  },

  async calculateAllCaught(context, userData) {
    let totalCount = structuredClone(counts);
    let normalCount = structuredClone(counts);
    let shinyCount = structuredClone(counts);
    let alphaCount = structuredClone(counts);
    let shinyAlphaCount = structuredClone(counts);
    let markedCount = structuredClone(counts);
    let shinyMarkedCount = structuredClone(counts);
    let pokerusCount = structuredClone(counts);
    let shinyPokerusCount = structuredClone(counts);
    let sixIvCount = structuredClone(counts);
    let shinySixIvCount = structuredClone(counts);
    let zeroIvCount = structuredClone(counts);
    let shinyZeroIvCount = structuredClone(counts);
    let gen1Counts = structuredClone(generationCounts);
    let gen2Counts = structuredClone(generationCounts);
    let gen3Counts = structuredClone(generationCounts);
    let gen4Counts = structuredClone(generationCounts);
    let gen5Counts = structuredClone(generationCounts);
    let gen6Counts = structuredClone(generationCounts);
    let gen7Counts = structuredClone(generationCounts);
    let gen8Counts = structuredClone(generationCounts);
    let gen9Counts = structuredClone(generationCounts);

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
    const timeCheck = (val, name, typeArray, category) => {
      if (typeArray.lTime.total === 0 || val > typeArray.lTime.total) {
        typeArray.lTime.total = val || 0;
        typeArray.lTime.name = name;
      }
      if (typeArray.sTime.total === 0 || val < typeArray.sTime.total) {
        typeArray.sTime.total = val || 0;
        typeArray.sTime.name = name;
      }
      if (totalCount.lTime.total === 0 || val > totalCount.lTime.total) {
        totalCount.lTime.total = val || 0;
        totalCount.lTime.name = name;
        totalCount.lTime.category = category;
      }
      if (totalCount.sTime.total === 0 || val < totalCount.sTime.total) {
        totalCount.sTime.total = val || 0;
        totalCount.sTime.name = name;
        totalCount.sTime.category = category;
      }
    };
    const countCheck = (val, name, typeArray, category) => {
      if (typeArray.lCount.total === 0 || val > typeArray.lCount.total) {
        typeArray.lCount.total = val || 0;
        typeArray.lCount.name = name;
      }
      if (typeArray.sCount.total === 0 || val < typeArray.sCount.total) {
        typeArray.sCount.total = val || 0;
        typeArray.sCount.name = name;
      }
      if (totalCount.lCount.total === 0 || val > totalCount.lCount.total) {
        totalCount.lCount.total = val || 0;
        totalCount.lCount.name = name;
        totalCount.lCount.category = category;
      }
      if (totalCount.sCount.total === 0 || val < totalCount.sCount.total) {
        totalCount.sCount.total = val || 0;
        totalCount.sCount.name = name;
        totalCount.sCount.category = category;
      }
    };

    const calcStats = (typeCount, id, type, timer, counter, name, category) => {
      typeCount.total++;
      genCheck(id, type);
      timeCheck(timer, name, typeCount, category);
      countCheck(counter, name, typeCount, category);
    };


    userData.forEach((pk) => {
      const caughtObject = pk[1].catch;
      const pkId = pk[1].dexNo;
      const lockCheck = catchLock(pkId);

      for (const caught in caughtObject) {
        const type = caught.slice(0, -6);
        if (caughtObject[caught] === true) {
          totalCount.total++;
          genCheck(pkId, "all");
        }
        if (caught === "normalCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(normalCount, pkId, "normal", pk[1].count?.normalTimer, pk[1].count?.normalCount, pk[1].name, "Normal");
        if (caught === "shinyCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(shinyCount, pkId, "shiny", pk[1].count?.shinyTimer, pk[1].count?.shinyCount, pk[1].name, "Shiny");
        if (caught === "alphaCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(alphaCount, pkId, "alpha", pk[1].count?.alphaTimer, pk[1].count?.alphaCount, pk[1].name, "Alpha");
        if (caught === "shinyAlphaCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(shinyAlphaCount, pkId, "shinyAlpha", pk[1].count?.shinyAlphaTimer, pk[1].count?.shinyAlphaCount, pk[1].name, "Shiny Alpha");
        if (caught === "markedCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(markedCount, pkId, "marked", pk[1].count?.markedTimer, pk[1].count?.markedCount, pk[1].name, "Marked");
        if (caught === "shinyMarkedCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(shinyMarkedCount, pkId, "shinyMarked", pk[1].count?.shinyMarkedTimer, pk[1].count?.shinyMarkedCount, pk[1].name, "Shiny Marked");
        if (caught === "pokerusCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(pokerusCount, pkId, "pokerus", pk[1].count?.pokerusTimer, pk[1].count?.pokerusCount, pk[1].name, "Pokerus");
        if (caught === "shinyPokerusCaught" && lockCheck["shiny"] && caughtObject[caught] === true) calcStats(shinyPokerusCount, pkId, "shinyPokerus", pk[1].count?.shinyPokerusTimer, pk[1].count?.shinyPokerusCount, pk[1].name, "Shiny Pokerus");
        if (caught === "sixIvCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(sixIvCount, pkId, "sixIv", pk[1].count?.sixIvTimer, pk[1].count?.sixIvCount, pk[1].name, "Six IV");
        if (caught === "shinySixIvCaught" && lockCheck["shiny"] && caughtObject[caught] === true) calcStats(shinySixIvCount, pkId, "shinySixIv", pk[1].count?.shinySixIvTimer, pk[1].count?.shinySixIvCount, pk[1].name, "Shiny Six IV");
        if (caught === "zeroIvCaught" && lockCheck[type] && caughtObject[caught] === true) calcStats(zeroIvCount, pkId, "zeroIv", pk[1].count?.zeroIvTimer, pk[1].count?.zeroIvCount, pk[1].name, "Zero IV");
        if (caught === "shinyZeroIvCaught" && lockCheck["shiny"] && caughtObject[caught] === true) calcStats(shinyZeroIvCount, pkId, "shinyZeroIv", pk[1].count?.shinyZeroIvTimer, pk[1].count?.shinyZeroIvCount, pk[1].name, "Shiny Zero IV");
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
    let totalCount = structuredClone(counts);
    let normalCount = structuredClone(counts);
    let shinyCount = structuredClone(counts);
    let alphaCount = structuredClone(counts);
    let shinyAlphaCount = structuredClone(counts);
    let markedCount = structuredClone(counts);
    let shinyMarkedCount = structuredClone(counts);
    let pokerusCount = structuredClone(counts);
    let shinyPokerusCount = structuredClone(counts);
    let sixIvCount = structuredClone(counts);
    let shinySixIvCount = structuredClone(counts);
    let zeroIvCount = structuredClone(counts);
    let shinyZeroIvCount = structuredClone(counts);
    let gen1Counts = structuredClone(generationCounts);
    let gen2Counts = structuredClone(generationCounts);
    let gen3Counts = structuredClone(generationCounts);
    let gen4Counts = structuredClone(generationCounts);
    let gen5Counts = structuredClone(generationCounts);
    let gen6Counts = structuredClone(generationCounts);
    let gen7Counts = structuredClone(generationCounts);
    let gen8Counts = structuredClone(generationCounts);
    let gen9Counts = structuredClone(generationCounts);
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

    const calcStats = (typeCount, id, type) => {
      typeCount.total++;
      genCheck(id, type);
    };

    pokeArray.forEach((pk) => {
      const apiNo = pk.apiNo;
      const pkId = +pk.dexNo;
      const lockCheck = catchLock(apiNo);
      for (const available in lockCheck) {
        if (lockCheck[available] === true) calcStats(totalCount, pkId, "all");
        if (available === "normal" && lockCheck[available] === true) calcStats(normalCount, pkId, "normal");
        if (available === "shiny" && lockCheck[available] === true) calcStats(shinyCount, pkId, "shiny");
        if (available === "alpha" && lockCheck[available] === true) calcStats(alphaCount, pkId, "alpha");
        if (available === "shinyAlpha" && lockCheck[available] === true) calcStats(shinyAlphaCount, pkId, "shinyAlpha");
        if (available === "marked" && lockCheck[available] === true) calcStats(markedCount, pkId, "marked");
        if (available === "shinyMarked" && lockCheck[available] === true) calcStats(shinyMarkedCount, pkId, "shinyMarked");
        if (available === "pokerus" && lockCheck[available] === true) calcStats(pokerusCount, pkId, "pokerus");
        if (available === "shinyPokerus" && lockCheck[available] === true) calcStats(shinyPokerusCount, pkId, "shinyPokerus");
        if (available === "sixIv" && lockCheck[available] === true) calcStats(sixIvCount, pkId, "sixIv");
        if (available === "shinySixIv" && lockCheck[available] === true) calcStats(shinySixIvCount, pkId, "shinySixIv");
        if (available === "zeroIv" && lockCheck[available] === true) calcStats(zeroIvCount, pkId, "zeroIv");
        if (available === "shinyZeroIv" && lockCheck[available] === true) calcStats(shinyZeroIvCount, pkId, "shinyZeroIv");
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
  },

  // -----------------Misc Stats Tabs------------------ //
  async formStats(context, userData) {
    const getAvailable = (array, count, type) => {
      const available = pokeArray.filter(pk => {
        if (catchLock(+pk.apiNo)?.[type]) {
          return array.includes(+pk.apiNo);
        }
      }).length;

      const total = userData.filter(pk => {
        if (catchLock(+pk[0])?.[type]) {
          return array.includes(+pk[0]) && pk[1]?.catch?.[count];
        }
      }).length;
      return { total, available };
    };

    const statTemplate = (array) => {
      return {
        normal: { type: "Normal", ...getAvailable(array, "normalCaught", "normal") },
        shiny: { type: "Shiny", ...getAvailable(array, "shinyCaught", "shiny") },
        marked: { type: "Marked", ...getAvailable(array, "markedCaught", "marked") },
        shinyMarked: { type: "Shiny Marked", ...getAvailable(array, "shinyMarkedCaught", "shinyMarked") },
        pokerus: { type: "Pokerus", ...getAvailable(array, "pokerusCaught", "pokerus") },
        shinyPokerus: { type: "Shiny Pokerus", ...getAvailable(array, "shinyPokerusCaught", "shiny") },
        sixIv: { type: "Six IV", ...getAvailable(array, "sixIvCaught", "sixIv") },
        shinySixIv: { type: "Shiny Six IV", ...getAvailable(array, "shinySixIvCaught", "shiny") },
        zeroIv: { type: "Zero IV", ...getAvailable(array, "zeroIvCaught", "zeroIv") },
        shinyZeroIv: { type: "Shiny Zero IV", ...getAvailable(array, "shinyZeroIvCaught", "shiny") }
      };
    };

    const pokeStats = {
      gmax: statTemplate(gmaxArray),
      mega: statTemplate(megaArray)
    };

    context.commit("setFormStats", pokeStats);
  },

  async pokemonStats(context, userData) {
    const getAvailable = (pkId, count, type) => {
      const targetArray = pokeArray.filter(pk => {
        return +pk.dexNo === pkId;
      });
      const userArray = userData.filter(pk => {
        return +pk[1].dexNo === pkId && pk[1]?.catch?.[count];
      });
      const available = targetArray.filter(pk => {
        return catchLock(+pk.apiNo)?.[type];
      }).length;
      const total = userArray.filter(pk => {
        return catchLock(+pk[0])?.[type];
      }).length;
      return { total, available };
    };
    const statTemplate = (pkId) => {
      return {
        normal: { type: "Normal", ...getAvailable(pkId, "normalCaught", "normal") },
        shiny: { type: "Shiny", ...getAvailable(pkId, "shinyCaught", "shiny") },
        alpha: { type: "Alpha", ...getAvailable(pkId, "alphaCaught", "alpha") },
        shinyAlpha: { type: "Shiny Alpha", ...getAvailable(pkId, "shinyAlphaCaught", "shinyAlpha") },
        marked: { type: "Marked", ...getAvailable(pkId, "markedCaught", "marked") },
        shinyMarked: { type: "Shiny Marked", ...getAvailable(pkId, "shinyMarkedCaught", "shinyMarked") },
        pokerus: { type: "Pokerus", ...getAvailable(pkId, "pokerusCaught", "pokerus") },
        shinyPokerus: { type: "Shiny Pokerus", ...getAvailable(pkId, "shinyPokerusCaught", "shiny") },
        sixIv: { type: "Six IV", ...getAvailable(pkId, "sixIvCaught", "sixIv") },
        shinySixIv: { type: "Shiny Six IV", ...getAvailable(pkId, "shinySixIvCaught", "shiny") },
        zeroIv: { type: "Zero IV", ...getAvailable(pkId, "zeroIvCaught", "zeroIv") },
        shinyZeroIv: { type: "Shiny Zero IV", ...getAvailable(pkId, "shinyZeroIvCaught", "shiny") }
      };
    };


    const miscStats = {
      alcremie: statTemplate(869),
      flebebe: statTemplate(669),
      floette: statTemplate(670),
      florges: statTemplate(671),
      furfrou: statTemplate(676),
      minior: statTemplate(774),
      oricorio: statTemplate(741),
      unown: statTemplate(201),
      vivillon: statTemplate(666)
    };
    context.commit("setMiscStats", miscStats);
  }

};





