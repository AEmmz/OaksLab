const PokeList = () => import("../../../../assets/json/pokemonList.json");

export default {
  async fetchForms(context) {
    const fetchAllPokemon = await PokeList();
    const allPokemon = fetchAllPokemon.default.pokemon;
    const dexNo = context.rootGetters["tracker/dexNo"];
    const filteredPokemon = allPokemon.filter((p) => {
      return +p.dexNo === +dexNo;
    });
    await context.dispatch("fetchFormPhotos", { forms: filteredPokemon, id: dexNo });
  },

  fetchFormPhotos(context, payload) {
    const formArray = [...payload.forms];
    const forms = [];
    formArray.forEach((p) => {
      const imageId = p.apiNo;
      const image = `https://ik.imagekit.io/kw2qoeib2/Home-Normal/${imageId}.png`;
      forms.push({ ...p, image: image });
    });
    context.commit("fetchForms", forms);
  }
};
