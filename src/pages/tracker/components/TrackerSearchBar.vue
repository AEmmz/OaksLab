<template>
  <q-card class="flex justify-evenly q-py-md search-cont">
    <h5 class="lt-md text-center">Select A Pokemon</h5>
    <q-select
      class="selection"
      outlined
      label="Find A Pokemon"
      v-model="pokemon"
      :model-value="pokemon"
      :options="pokemonList"
      :option-label="(pkmn) => menuLabel(pkmn)"
      @update:model-value="pokeUpdate()"
      options-dark
      :options-selected-class="`bg-${pkType1}Type text-light text-h6`"
      use-input
      clearable
      input-debounce="0"
      @filter="pokemonFilter"
      popup-content-class="text-h6"></q-select>
    <q-select
      class="selection"
      outlined
      label="Choose A Hunt"
      v-model="hunt"
      :model-value="hunt"
      :options="huntList"
      @update:model-value="huntUpdate()"
      options-dark
      :options-selected-class="`bg-${pkType1}Type text-light`"></q-select>
    <q-btn
      class="lt-md"
      @click="mobileSearch()"
      label="Start Hunt"
      color="primary"></q-btn>
  </q-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import pokeJSON from "../../../assets/json/pokemonList.json";

export default {
  mounted() {
    let pokemonName = this.$route.params.pkName;
    if (!pokemonName) {
      this.$emit("new");
    }
    //Unown ? Safeguard
    if (pokemonName) {
      if (pokemonName === "unown-question") pokemonName = "unown-?";
      let nameSplit = pokemonName
        .split("-")
        .map((e) => e[0].toUpperCase() + e.substring(1))
        .join(" ");
      let dexNum;
      let apiNum;
      let types;
      pokeJSON.pokemon.forEach((pkmn) => {
        if (pkmn.name.toLowerCase() === nameSplit.toLowerCase()) {
          dexNum = pkmn.dexNo;
          apiNum = pkmn.apiNo;
          types = pkmn.types;
        }
      });
      if (!dexNum) {
        const redirect = "/" + (this.$route.query.redirect || "notFound");
        this.$router.replace(redirect);
      }
      this.pokemon = {
        name: nameSplit,
        dexNo: dexNum,
        apiNo: apiNum,
        types: types
      };
      this.searchPokemon();
    }
  },
  data() {
    return {
      pokemon: "",
      pokemonList: this.fetchPokemonList()
    };
  },
  computed: {
    ...mapGetters("tracker", ["pkType1", "huntList"]),
    ...mapGetters("tracker/counter", ["timerRunning"]),
    hunt: {
      get() {
        return this.$store.getters["tracker/hunt"];
      },
      set(val) {
        this.$store.commit("tracker/setHunt", val);
      }
    }
  },
  methods: {
    ...mapActions("tracker", ["changeActivePokemon"]),
    ...mapActions("tracker/counter", ["changeCount"]),
    ...mapActions("tracker/forms", ["fetchForms"]),
    startNew() {
      this.freshStart();
    },
    pokeUpdate() {
      if (this.$q.screen.gt.sm) this.searchPokemon();
    },
    huntUpdate() {
      if (this.$q.screen.gt.sm) this.searchHunt();
    },

    desktopCheck() {
      return this.$q.screen.gt.sm ? true : false;
    },

    async mobileSearch() {
      await this.searchPokemon();
      await this.searchHunt();
      this.$emit("closeSearchDialog");
    },

    fetchPokemonList() {
      const data = [...pokeJSON.pokemon];
      return data.filter((p) => {
        return +p.apiNo < 8000 || +p.apiNo === 10136;
      });
    },

    searchHunt() {
      const hunt = this.hunt.toLowerCase();
      this.changeCount(hunt);
    },

    listName(pkmn) {
      if (pkmn.listName) return pkmn.listName;
      return pkmn.name;
    },

    menuLabel(pokemon) {
      let displayName;
      displayName =
        pokemon && pokemon.dexNo && pokemon.name
          ? `${pokemon.dexNo}. ${pokemon.listName || pokemon.name}`
          : null;
      return displayName;
    },

    pokemonFilter(val, update) {
      if (val === "") {
        update(() => {
          this.pokemonList = this.fetchPokemonList();
        });
        return;
      }
      update(() => {
        const userInput = val.toLowerCase();
        const fullList = this.fetchPokemonList();
        this.pokemonList = fullList.filter(
          (pkmn) =>
            pkmn.name.toLowerCase().indexOf(userInput) > -1 ||
            pkmn.dexNo.indexOf(userInput) > -1
        );
      });
    },

    async searchPokemon() {
      if (this.timerRunning) {
        this.$store.commit("tracker/counter/setTimerRunning", false);
      }
      const pkmn = this.pokemon;
      const pokemonName = pkmn.name.toLowerCase();
      let redirect = "/tracker/" + pokemonName.replaceAll(" ", "-");

      //Unown Safeguard
      if (redirect === "/tracker/unown-?") {
        redirect = "/tracker/unown-question";
      }

      this.$router.replace(redirect);
      const inputPokemon = {
        apiNo: pkmn.apiNo,
        dexNo: pkmn.dexNo,
        setName: pkmn.name,
        setType: pkmn.types
      };

      await this.changeActivePokemon(inputPokemon);
      const data = this.hunt.toLowerCase();
      await this.changeCount(data);
      await this.fetchForms();
    }
  }
};
</script>

<style
  scoped
  lang="scss">

* {
  font-family: Gellix, sans-serif;
}

body.screen--xs, body.screen--sm {
  .search-cont {
    gap: 20px;
  }

  .selection {
    width: 80%;
    font-size: 1.1rem;
  }
}

body.screen--md {
  .selection {
    width: 47%;
    font-size: 0.95rem;
  }
}

body.screen--lg, body.screen--xl {
  .selection {
    width: 45%;
    font-size: 1.1rem;
  }
}

body.screen--md, body.screen--lg, body.screen--xl, {
  .search-header {
    display: none;
  }


}
</style>
