export default {
  setHunt(state, payload) {
    state.selectors.hunt = payload
  },

  resetTracker(state) {
    state.pkId = "";
    state.pkName = "";
    state.pkType1 = "";
    state.pkType2 = "";
    state.pkImageNormal = "";
    state.pkImageShiny = "";
    state.pkSprite = "";
  },

  async changeActivePokemon(state, payload) {
    const pokemonData = payload;
    const pkId = pokemonData.apiNo;
    //Detail Pulls
    state.pkId = pokemonData.apiNo;
    state.pkIdVar = pokemonData.dexNo;
    state.pkName = pokemonData.setName;
    state.pkType1 = pokemonData.setType[0];
    state.pkType2 = pokemonData.setType[1];

    const getPkImage = (id) => {
      return `https://ik.imagekit.io/kw2qoeib2/Home-Normal/${id}.png`;
    };
    const getPkImageShiny = (id) => {
      return `https://ik.imagekit.io/kw2qoeib2/Home-Shiny/${id}.png`;
    };

    state.pkImageNormal = getPkImage(pkId);
    state.pkImageShiny = getPkImageShiny(pkId);
    // }
  }
};
