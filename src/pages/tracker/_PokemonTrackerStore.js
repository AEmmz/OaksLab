import { defineStore } from "pinia";
import { child, get, getDatabase, ref, update } from "firebase/database";
import { usePokemonStore } from "pages/tracker/_PokemonStore";
import { useUserStore } from "pages/authorization/_UserStore";

export const usePokemonTrackerStore = defineStore("PokemonTrackerStore", {
  state: () => ({
    pokemonCounts: {},
    mainCount: 0,
    mainTimer: 0,
    timerRunning: false,
    hunt: "",
    incrementCount: 1,
    interval: 0
  }),

  actions: {
    async changeHuntCount(huntType) {
      const pokemonStore = usePokemonStore();
      const currentHunt = huntType.replaceAll(" ", "");
      const countersUpdate = (hunt) => {
        if (currentHunt.toLowerCase() === hunt.toLowerCase()) {
          let timerVar = `${hunt}Timer`;
          let countVar = `${hunt}Count`;
          let timer = this.pokemonCounts?.[timerVar] ? this.pokemonCounts[timerVar] : 0;
          let counter = this.pokemonCounts?.[countVar] ? this.pokemonCounts[countVar] : 0;
          this.mainCount = counter;
          this.mainTimer = timer;
          this.hunt = hunt;
        }
      };
      pokemonStore.huntListVariables.forEach(hunt => {
        countersUpdate(hunt);
      });
    },

    async changeCount() {
      try {
        const userStore = useUserStore();
        const pokemonStore = usePokemonStore();
        const dbRef = ref(getDatabase());
        const rawPokemonCountData = await get(child(dbRef, `users/${userStore.uid}/pokedex/${pokemonStore.apiNo}/count`));
        let pokemonCountData = rawPokemonCountData.val();
        if (pokemonCountData) {
          this.pokemonCounts = pokemonCountData;
        } else {
          this.pokemonCounts = {};
        }
      } catch (error) {
        console.log(error.message);
        console.log(error);
      }
    },

    async updateCounter() {
      try {
        const userStore = useUserStore();
        const pokemonStore = usePokemonStore();
        const apiNo = pokemonStore.apiNo;
        if (apiNo === "" || apiNo === null || apiNo === undefined || apiNo === false) return;
        let huntCountForDb;
        const currentHunt = pokemonStore.selectors.hunt.toLowerCase().replaceAll(" ", "");
        const dbRefPokemonCounts = await ref(getDatabase(), `users/${userStore.uid}/pokedex/${apiNo}/count`);
        const setHuntCountForDb = (hunt) => {
          const huntKey = `${hunt}Count`;
          if (currentHunt === hunt) huntCountForDb = { [huntKey]: this.mainCount };
        };
        pokemonStore.huntListVariables.forEach(hunt => {
          setHuntCountForDb(hunt);
        });
        await update(dbRefPokemonCounts, huntCountForDb);
      } catch (error) {
        console.error("Failed to update count in database. Please try again later", error);
      }
    },

    async updateTimer() {
      try {
        const userStore = useUserStore();
        const pokemonStore = usePokemonStore();
        const currentHunt = pokemonStore.selectors.hunt.toLowerCase().replaceAll(" ", "");
        const dbRefPokemonCounts = await ref(getDatabase(), `users/${userStore.uid}/pokedex/${pokemonStore.apiNo}/count`);
        let huntTimerForDb;
        const setHuntTimerForDb = (hunt) => {
          const huntKey = `${hunt}Timer`;
          if (currentHunt === hunt) huntTimerForDb = { [huntKey]: this.mainTimer };
        };
        pokemonStore.huntListVariables.forEach(hunt => {
          setHuntTimerForDb(hunt);
        });
        const stateKey = `${this.hunt}Timer`;
        this.pokemonCounts[stateKey] = this.mainTimer;
        await update(dbRefPokemonCounts, huntTimerForDb);
      } catch (error) {
        console.error("Failed to update timer in database. Please try again later", error);
      }
    },

    changeIncrement(incrementValue) {
      this.incrementCount = incrementValue;
    },

    changeTimer(timerValue) {
      this.mainTimer = timerValue;
    },

    async countUp() {
      if (this.mainCount < 1000001) {
        this.mainCount += this.incrementCount;
        this.mainCount = this.mainCount > 999999 ? 1000000 : this.mainCount;
        const stateKey = `${this.hunt}Count`;
        this.pokemonCounts[stateKey] = this.mainCount;
      }
      await this.updateCounter();
    },

    async countDown() {
      if (this.mainCount > 0) {
        this.mainCount -= this.incrementCount;
        this.mainCount = this.mainCount < 0 ? 0 : this.mainCount;
        const stateKey = `${this.hunt}Count`;
        this.pokemonCounts[stateKey] = this.mainCount;
      }
      await this.updateCounter();
    },

    setTimerRunning(booleanValue) {
      this.timerRunning = booleanValue;
    },

    //Reset
    async resetCounter() {
      this.mainCount = 0;
      const stateKey = `${this.hunt}Count`;
      this.pokemonCounts[stateKey] = this.mainCount;
      await this.updateCounter();
    },

    defaultAllCounts() {
      this.mainCount = 0;
      this.mainTimer = 0;
      this.hunt = "";
      this.incrementCount = 1;
      this.interval = 0;
      this.reset = false;
    }
  }
});
