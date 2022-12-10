//Imports
import { defineStore } from "pinia";

const PokeList = () => import("src/assets/json/pokemonList.json");

//Stores
import { usePokemonStore } from "pages/tracker/_PokemonStore";

//Interfaces
import IPokemonSingleForm from "src/interfaces/pokemon/IPokemonSingleForm";
import IPokemonSingleCollection from "src/interfaces/pokemon/IPokemonSingleCollection";

///Types
type PokemonFormState = {
  forms: IPokemonSingleForm[]
}

export const usePokemonFormStore = defineStore("PokemonFormStore", {
  state: (): PokemonFormState => ({
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
      const forms: IPokemonSingleForm[] = [];
      filteredPokemon.forEach((pokemon) => {
        const image = `https://ik.imagekit.io/kw2qoeib2/Home-Normal/${pokemon.apiNo}.png`;
        forms.push({
          image: image,
          apiNo: pokemon.apiNo,
          dexNo: pokemon.dexNo,
          name: pokemon.name,
          type: [pokemon.type[0], pokemon.type[1]] as IPokemonSingleCollection["type"]
        });
      });
      this.forms = forms;
    },
    resetForms() {
      this.forms = [];
    }
  }
});
