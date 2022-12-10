//Firebase
import { child, get, getDatabase, ref, update } from "firebase/database";

//Imports

//Stores
import { defineStore } from "pinia";
import { usePokemonStore } from "pages/tracker/_PokemonStore";
import { useUserStore } from "pages/authorization/_UserStore";

//Models
import TrackerCountModel from "src/models/tracker/TrackerCountModel";

//Interfaces
import IPokemonSingleDatabaseCountData
  from "src/interfaces/pokemon/IPokemonSingleDatabaseCountData";

//Types
type PokemonTrackerState = {
  pokemonCounts: IPokemonSingleDatabaseCountData,
  mainCount: number,
  mainTimer: number,
  timerRunning: boolean,
  hunt: string,
  incrementCount: number,
  interval: number
}

export const usePokemonTrackerStore = defineStore("PokemonTrackerStore", {
  state: (): PokemonTrackerState => ({
    pokemonCounts: new TrackerCountModel(),
    mainCount: 0,
    mainTimer: 0,
    timerRunning: false,
    hunt: "",
    incrementCount: 1,
    interval: 0
  }),

  actions: {
    changeHuntCount(huntType: string) {
      const pokemonStore = usePokemonStore();
      const currentHunt = huntType.replaceAll(" ", "");
      const countersUpdate = (hunt: string) => {
        if (currentHunt.toLowerCase() === hunt.toLowerCase()) {
          const timerVar = `${hunt}Timer` as keyof IPokemonSingleDatabaseCountData;
          const countVar = `${hunt}Count` as keyof IPokemonSingleDatabaseCountData;
          this.mainTimer = this.pokemonCounts[timerVar] || 0;
          this.mainCount = this.pokemonCounts[countVar] || 0;
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
        if (userStore.uid) {
          const pokemonStore = usePokemonStore();
          const dbRef = ref(getDatabase());
          const rawPokemonCountData = await get(child(dbRef, `users/${userStore.uid}/pokedex/${pokemonStore.apiNo}/count`));
          const pokemonCountData = rawPokemonCountData.val() as IPokemonSingleDatabaseCountData;
          if (pokemonCountData) {
            this.pokemonCounts = pokemonCountData;
          } else {
            this.pokemonCounts = new TrackerCountModel();
          }
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
        console.log(err);
      }
    },

    async updateCounter() {
      try {
        const userStore = useUserStore();
        if (userStore.uid) {
          const pokemonStore = usePokemonStore();
          const apiNo = pokemonStore.apiNo;
          if (apiNo === "" || apiNo === null || apiNo === undefined) return;
          let huntCountForDb = {};
          const currentHunt = pokemonStore.selectors.hunt.toLowerCase().replaceAll(" ", "");
          const dbRefPokemonCounts = ref(getDatabase(), `users/${userStore.uid}/pokedex/${apiNo}/count`);
          const setHuntCountForDb = (hunt: string) => {
            const huntKey = `${hunt}Count`;
            if (currentHunt === hunt) huntCountForDb = { [huntKey]: this.mainCount };
          };
          pokemonStore.huntListVariables.forEach(hunt => {
            setHuntCountForDb(hunt);
          });
          await update(dbRefPokemonCounts, huntCountForDb);
        }
      } catch (error) {
        console.error("Failed to update count in database. Please try again later", error);
      }
    },

    async updateTimer() {
      try {
        const userStore = useUserStore();
        if (userStore.uid) {
          const pokemonStore = usePokemonStore();
          const currentHunt = pokemonStore.selectors.hunt.toLowerCase().replaceAll(" ", "");
          const dbRefPokemonCounts = ref(getDatabase(), `users/${userStore.uid}/pokedex/${pokemonStore.apiNo}/count`);
          let huntTimerForDb = {};
          const setHuntTimerForDb = (hunt: string) => {
            const huntKey = `${hunt}Timer`;
            if (currentHunt === hunt) huntTimerForDb = { [huntKey]: this.mainTimer };
          };
          pokemonStore.huntListVariables.forEach(hunt => {
            setHuntTimerForDb(hunt);
          });
          const stateKey = `${this.hunt}Timer`;
          this.pokemonCounts[stateKey as keyof IPokemonSingleDatabaseCountData] = this.mainTimer;
          await update(dbRefPokemonCounts, huntTimerForDb);
        }
      } catch (error) {
        console.error("Failed to update timer in database. Please try again later", error);
      }
    },

    changeIncrement(incrementValue: number) {
      this.incrementCount = incrementValue;
    },

    changeTimer(timerValue: number) {
      this.mainTimer = timerValue;
    },

    async countUp() {
      if (this.mainCount < 1000001) {
        this.mainCount += this.incrementCount;
        this.mainCount = this.mainCount > 999999 ? 1000000 : this.mainCount;
        const stateKey = `${this.hunt}Count`;
        this.pokemonCounts[stateKey as keyof IPokemonSingleDatabaseCountData] = this.mainCount;
      }
      await this.updateCounter();
    },

    async countDown() {
      if (this.mainCount > 0) {
        this.mainCount -= this.incrementCount;
        this.mainCount = this.mainCount < 0 ? 0 : this.mainCount;
        const stateKey = `${this.hunt}Count`;
        this.pokemonCounts[stateKey as keyof IPokemonSingleDatabaseCountData] = this.mainCount;
      }
      await this.updateCounter();
    },

    setTimerRunning(booleanValue: boolean) {
      this.timerRunning = booleanValue;
    },

    //Reset
    async resetCounter() {
      this.mainCount = 0;
      const stateKey = `${this.hunt}Count`;
      this.pokemonCounts[stateKey as keyof IPokemonSingleDatabaseCountData] = this.mainCount;
      await this.updateCounter();
    },

    defaultAllCounts() {
      this.mainCount = 0;
      this.mainTimer = 0;
      this.hunt = "";
      this.incrementCount = 1;
      this.interval = 0;
    }
  }
});
