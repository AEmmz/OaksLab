import { defineStore } from "pinia";
import { getDatabase, ref, update } from "firebase/database";
import { usePokemonCatchStatusStore } from "pages/tracker/_PokemonCatchStatusStore";
import { useUserStore } from "pages/authorization/_UserStore";

export const usePokemonStore = defineStore("PokemonStore", {
  state: () => ({
    apiNo: "",
    dexNo: "",
    pkName: "",
    pkType1: "",
    pkType2: "",
    pkImageNormal: "",
    pkImageShiny: "",
    pkUserInfo: null,
    pkSprite: "",
    isForms: true,
    selectors: {
      hunt: "Normal",
      huntList: [
        "normal",
        "shiny",
        "alpha",
        "shiny alpha",
        "marked",
        "shiny marked",
        "pokerus",
        "shiny pokerus",
        "zero iv",
        "shiny zero iv",
        "six iv",
        "shiny six iv",
        "tera bug",
        "shiny tera bug",
        "tera dark",
        "shiny tera dark",
        "tera dragon",
        "shiny tera dragon",
        "tera electric",
        "shiny tera electric",
        "tera fairy",
        "shiny tera fairy",
        "tera fighting",
        "shiny tera fighting",
        "tera fire",
        "shiny tera fire",
        "tera flying",
        "shiny tera flying",
        "tera ghost",
        "shiny tera ghost",
        "tera grass",
        "shiny tera grass",
        "tera ground",
        "shiny tera ground",
        "tera ice",
        "shiny tera ice",
        "tera normal",
        "shiny tera normal",
        "tera poison",
        "shiny tera poison",
        "tera psychic",
        "shiny tera psychic",
        "tera rock",
        "shiny tera rock",
        "tera steel",
        "shiny tera steel",
        "tera water",
        "shiny tera water"
      ]
    }
  }),

  getters: {
    huntList() {
      const list = this.selectors.huntList;
      const capitalizedList = [];
      list.forEach(i => {
        const words = i.split(" ");
        let capital = [];
        words.forEach(w => {
          capital.push(w.charAt(0).toUpperCase() + w.slice(1));
        });
        capitalizedList.push(capital.join(" "));
      });
      return capitalizedList;
    },

    huntListVariables() {
      const huntArray = this.huntList;
      const huntVariable = [];
      huntArray.forEach(hunt => {
        let stringAdjustment = hunt[0].toLowerCase() + hunt.substring(1);
        stringAdjustment = stringAdjustment.replaceAll(" ", "");
        huntVariable.push(stringAdjustment);
      });
      return huntVariable;
    }
  },

  actions: {
    async changeActivePokemon(pokemon) {
      const pokemonCatchStatusStore = usePokemonCatchStatusStore();
      this.apiNo = pokemon.apiNo;
      this.dexNo = pokemon.dexNo;
      this.pkName = pokemon.setName;
      this.pkType1 = pokemon.setType[0];
      this.pkType2 = pokemon.setType[1];
      this.pkImageNormal = `https://ik.imagekit.io/kw2qoeib2/Home-Normal/${pokemon.apiNo}.png`;
      this.pkImageShiny = `https://ik.imagekit.io/kw2qoeib2/Home-Shiny/${pokemon.apiNo}.png`;
      let pokemonData = {
        apiNo: pokemon.apiNo,
        dexNo: pokemon.dexNo,
        setName: pokemon.setName,
        setType: pokemon.setType
      };
      await pokemonCatchStatusStore.caughtCheck(pokemonData);
    },

    async createPokemonDbEntry(pokemon) {
      const userStore = useUserStore();
      const dbRefPokemon = await ref(getDatabase(), `users/${userStore.uid}/pokedex/${pokemon.apiNo}`);
      const pokemonData = {
        name: pokemon.name,
        type1: pokemon.type1,
        type2: pokemon.type2 || null,
        dexNo: pokemon.dexNo,
        catch: { normalCaught: false },
        count: { normalCount: 0 }
      };
      await update(dbRefPokemon, pokemonData);
    },

    resetPokemon() {
      this.apiNo = "";
      this.dexNo = "";
      this.pkName = "";
      this.pkType1 = "";
      this.pkType2 = "";
      this.pkImageNormal = "";
      this.pkImageShiny = "";
      this.pkSprite = "";
    }
  }
});
