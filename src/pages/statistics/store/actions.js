import { getDatabase, ref, child, get, update } from "firebase/database";
import {
  standardDexCount
} from "src/util/statistics/formsCheck";

const PokeList = () => import("../../../assets/json/pokemonList.json");

export default {
  async fetchStats(context, huntType) {
    const uid = context.rootGetters["authorization/uid"];
    const dbRef = ref(getDatabase());
    const data = await get(child(dbRef, `users/${uid}/pokedex`));
    const userDex = await Object.entries(data.val());
    context.commit("fetchStats", userDex);
    context.dispatch("calculateBaseStats");
    context.dispatch("calculateTypeStats", huntType);
  },

  async quickPatch(context) {
    const uid = context.rootGetters["authorization/uid"];
    const dbRef = await ref(getDatabase(), `users/${uid}/pokedex/`);
    const fetchPkDetails = await PokeList();
    const pokelist = fetchPkDetails.default.pokemon;

    pokelist.forEach(async (p) => {
      const dexNo = p.dexNo;
      const name = p.name;
      const pkId = p.apiNo;
      const type1 = p.types[0];
      const type2 = p.types[1] || null;
      const updateDb = await update(dbRef, {
        [pkId]: {
          name: name,
          type1: type1,
          type2: type2,
          dexNo: dexNo,
          catch: {
            normalCaught: false,
            shinyCaught: false,
            alphaCaught: false,
            shinyAlphaCaught: false,
            megaCaught: false,
            shinyMegaCaught: false,
            gigantamaxCaught: false,
            shinyGigantamaxCaught: false,
            pokerusCaught: false,
            shinyPokerusCaught: false,
            favoriteCaught: false
          },
          count: {
            normalCount: 0,
            shinyCount: 0,
            alphaCount: 0,
            shinyAlphaCount: 0,
            megaCount: 0,
            shinyMegaCount: 0,
            gigantamaxCount: 0,
            shinyGigantamaxCount: 0,
            pokerusCount: 0,
            shinyPokerusCount: 0,
            favoriteCount: 0
          }
        }
      });
    });
  },

  async calculateBaseStats(context, payload) {
    const userDex = context.getters.userDex;

    const fetchPkDetails = await PokeList();
    const pkDetails = fetchPkDetails.default.pokemon;
    let normalCaught = [];
    let shinyCaught = [];
    let alphaCaught = [];
    let shinyAlphaCaught = [];
    let megaCaught = [];
    let shinyMegaCaught = [];
    let gigantamaxCaught = [];
    let shinyGigantamaxCaught = [];
    let pokerusCaught = [];
    let shinyPokerusCaught = [];
    let favoriteCaught = [];
    await Promise.all(
      userDex.map(async (pkmn) => {
        const cS = pkmn[1].catch;
        const count = async (data, array, pokemon) => {
          if (data === true) {
            await standardDexCount(array, pokemon, pkDetails);
          }
        };
        await count(cS.normalCaught, normalCaught, pkmn);
        await count(cS.shinyCaught, shinyCaught, pkmn);
        await count(cS.alphaCaught, alphaCaught, pkmn);
        await count(cS.shinyAlphaCaught, shinyAlphaCaught, pkmn);
        await count(cS.megaCaught, megaCaught, pkmn);
        await count(cS.shinyMegaCaught, shinyMegaCaught, pkmn);
        await count(cS.gigantamaxCaught, gigantamaxCaught, pkmn);
        await count(cS.shinyGigantamaxCaught, shinyGigantamaxCaught, pkmn);
        await count(cS.pokerusCaught, pokerusCaught, pkmn);
        await count(cS.shinyPokerusCaught, shinyPokerusCaught, pkmn);
        await count(cS.favoriteCaught, favoriteCaught, pkmn);
      })
    );

    const caughtStats = {
      normal: normalCaught.length,
      shiny: shinyCaught.length,
      alpha: alphaCaught.length,
      shinyAlpha: shinyAlphaCaught.length,
      mega: megaCaught.length,
      shinyMega: shinyMegaCaught.length,
      gigantamax: gigantamaxCaught.length,
      shinyGigantamax: shinyGigantamaxCaught.length,
      pokerus: pokerusCaught.length,
      shinyPokerus: shinyPokerusCaught.length,
      favorite: favoriteCaught.length
    };
    context.commit("calculateBaseStats", caughtStats);
    // context.dispatch('quickPatch');
  },

  async calculateTypeStats(context, payload) {
    const fetchPkDetails = await PokeList();
    const pkDetails = fetchPkDetails.default.pokemon;
    const userDex = context.getters.userDex;
    let huntFilter;
    let bug = [];
    let dark = [];
    let dragon = [];
    let electric = [];
    let fairy = [];
    let fighting = [];
    let fire = [];
    let flying = [];
    let grass = [];
    let ghost = [];
    let ground = [];
    let ice = [];
    let normal = [];
    let poison = [];
    let psychic = [];
    let steel = [];
    let rock = [];
    let water = [];
    const pushPokemon = (pokemon, assignArray, type) => {
      if (pokemon.types.includes(type)) {
        assignArray.push(pokemon.dexNo);
      }
    };

    if (payload === "normal") {
      huntFilter = userDex.filter((p) => {
        return p[1].catch.normalCaught === true;
      });
    }
    if (payload === "shiny") {
      huntFilter = userDex.filter((p) => {
        return p[1].catch.shinyCaught === true;
      });
    }
    if (payload === "alpha") {
      huntFilter = userDex.filter((p) => {
        return p[1].catch.alphaCaught === true;
      });
    }
    if (payload === "shinyAlpha") {
      huntFilter = userDex.filter((p) => {
        return p[1].catch.shinyAlphaCaught === true;
      });
    }
    if (payload === "mega") {
      huntFilter = userDex.filter((p) => {
        return p[1].catch.megaCaught === true;
      });
    }
    if (payload === "shinyMega") {
      huntFilter = userDex.filter((p) => {
        return p[1].catch.shinyMegaCaught === true;
      });
    }
    if (payload === "gigantamax") {
      huntFilter = userDex.filter((p) => {
        return p[1].catch.gigantamaxCaught === true;
      });
    }
    if (payload === "shinyGigantamax") {
      huntFilter = userDex.filter((p) => {
        return p[1].catch.shinyGigantamaxCaught === true;
      });
    }
    if (payload === "pokerus") {
      huntFilter = userDex.filter((p) => {
        return p[1].catch.pokerusCaught === true;
      });
    }
    if (payload === "shinyPokerus") {
      huntFilter = userDex.filter((p) => {
        return p[1].catch.shinyPokerusCaught === true;
      });
    }
    if (payload === "favorite") {
      huntFilter = userDex.filter((p) => {
        return p[1].catch.favoriteCaught === true;
      });
    }

    //TYPE STATS
    await Promise.all(
      huntFilter.map(async (pkmn) => {
        pkDetails.map((p) => {
          if (pkmn[1].dexNo === p.dexNo) {
            pushPokemon(p, bug, "bug");
            pushPokemon(p, dark, "dark");
            pushPokemon(p, dragon, "dragon");
            pushPokemon(p, electric, "electric");
            pushPokemon(p, fairy, "fairy");
            pushPokemon(p, fighting, "fighting");
            pushPokemon(p, fire, "fire");
            pushPokemon(p, flying, "flying");
            pushPokemon(p, grass, "grass");
            pushPokemon(p, ghost, "ghost");
            pushPokemon(p, ground, "ground");
            pushPokemon(p, ice, "ice");
            pushPokemon(p, normal, "normal");
            pushPokemon(p, poison, "poison");
            pushPokemon(p, psychic, "psychic");
            pushPokemon(p, steel, "steel");
            pushPokemon(p, rock, "rock");
            pushPokemon(p, water, "water");
          }
        });
      })
    );

    bug = [...new Set(bug)];
    dark = [...new Set(dark)];
    dragon = [...new Set(dragon)];
    electric = [...new Set(electric)];
    fairy = [...new Set(fairy)];
    fighting = [...new Set(fighting)];
    fire = [...new Set(fire)];
    flying = [...new Set(flying)];
    grass = [...new Set(grass)];
    ghost = [...new Set(ghost)];
    ground = [...new Set(ground)];
    ice = [...new Set(ice)];
    normal = [...new Set(normal)];
    poison = [...new Set(poison)];
    psychic = [...new Set(psychic)];
    steel = [...new Set(steel)];
    rock = [...new Set(rock)];
    water = [...new Set(water)];

    const caughtStats = {
      bug: bug.length,
      dark: dark.length,
      dragon: dragon.length,
      electric: electric.length,
      fairy: fairy.length,
      fighting: fighting.length,
      fire: fire.length,
      flying: flying.length,
      grass: grass.length,
      ghost: ghost.length,
      ground: ground.length,
      ice: ice.length,
      normalType: normal.length,
      poison: poison.length,
      psychic: psychic.length,
      steel: steel.length,
      rock: rock.length,
      water: water.length
    };

    context.commit("calculateTypeStats", caughtStats);
  }
};
