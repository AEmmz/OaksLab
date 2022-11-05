import {getDatabase, ref, update} from "firebase/database";

export default {
  async changeActivePokemon(context, payload) {
    let pokemonInfo = {
      apiNo: payload.apiNo,
      dexNo: payload.dexNo,
      setName: payload.setName,
      setType: payload.setType
    };
    await context.commit("changeActivePokemon", pokemonInfo);
    await context.dispatch("caught/caughtCheck", pokemonInfo);
  },

  async createPokemonDbEntry(context, pokemonData) {
    const apiNo = pokemonData.apiNo;
    const dexNo = pokemonData.dexNo;
    const name = pokemonData.name;
    const type1 = pokemonData.type1;
    const type2 = pokemonData.type2;

    const uid = context.rootGetters["authorization/uid"];
    const dexRef = await ref(getDatabase(), `users/${uid}/pokedex/${apiNo}`);
    const pokemon = {
      name: name,
      type1: type1,
      type2: type2 || null,
      dexNo: dexNo,
      catch: {normalCaught: false},
      count: {normalCount: 0}
    }
    await update(dexRef, pokemon);
  }
};
