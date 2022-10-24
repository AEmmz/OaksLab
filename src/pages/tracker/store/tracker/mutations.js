export default {
  setHunt(state, payload) {
    state.selectors.hunt = payload;
  },

  resetTracker(state) {
    state.apiNo = "";
    state.dexNo = "";
    state.pkName = "";
    state.pkType1 = "";
    state.pkType2 = "";
    state.pkImageNormal = "";
    state.pkImageShiny = "";
    state.pkSprite = "";
  },

  async changeActivePokemon(state, payload) {
    const pokemonData = payload;
    const apiNo = pokemonData.apiNo;
    state.apiNo = pokemonData.apiNo;
    state.dexNo = pokemonData.dexNo;
    state.pkName = pokemonData.setName;
    state.pkType1 = pokemonData.setType[0];
    state.pkType2 = pokemonData.setType[1];
    state.pkImageNormal = `https://ik.imagekit.io/kw2qoeib2/Home-Normal/${apiNo}.png`;
    state.pkImageShiny = `https://ik.imagekit.io/kw2qoeib2/Home-Shiny/${apiNo}.png`;
  }
};
