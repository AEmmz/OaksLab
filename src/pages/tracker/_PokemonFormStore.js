import { defineStore } from "pinia";

const PokeList = () => import("src/assets/json/pokemonList.json");
import { usePokemonStore } from "pages/tracker/_PokemonStore";

export const usePokemonFormStore = defineStore("PokemonFormStore", {
  state: () => ({
    forms: []
  }),

  actions: {
    async fetchForms() {
      const pokemonStore = usePokemonStore();
      const fetchAllPokemon = await PokeList();
      const allPokemon = fetchAllPokemon.default.pokemon;
      const filteredPokemon = allPokemon.filter((pokemon) => {
        return +pokemon.dexNo === +pokemonStore.dexNo;
      });
      const forms = [];
      filteredPokemon.forEach((pokemon) => {
        const image = `https://ik.imagekit.io/kw2qoeib2/Home-Normal/${pokemon.apiNo}.png`;
        forms.push({ ...pokemon, image: image });
      });
      this.forms = forms;
    },
    resetForms() {
      this.forms = [];
    }
  }
});
