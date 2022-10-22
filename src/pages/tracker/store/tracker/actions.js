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
  }
};
