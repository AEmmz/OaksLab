import { defineStore } from "pinia";
import { child, get, getDatabase, ref, update } from "firebase/database";
import { catchLock } from "src/util/tracker/catchLock";
import { useUserStore } from "pages/authorization/_UserStore";
import { usePokemonStore } from "pages/tracker/_PokemonStore";
import { huntTypes } from "src/util/huntTypes/huntTypes";

export const usePokemonCatchStatusStore = defineStore("PokemonCatchStatusStore", {
  state: () => ({
    normal: false,
    shiny: false,
    alpha: false,
    shinyAlpha: false,
    marked: false,
    shinyMarked: false,
    pokerus: false,
    shinyPokerus: false,
    zeroIv: false,
    shinyZeroIv: false,
    sixIv: false,
    shinySixIv: false,
    favorite: false,

    teraBug: false,
    teraDark: false,
    teraDragon: false,
    teraElectric: false,
    teraFairy: false,
    teraFighting: false,
    teraFire: false,
    teraFlying: false,
    teraGhost: false,
    teraGrass: false,
    teraGround: false,
    teraIce: false,
    teraNormal: false,
    teraPoison: false,
    teraPsychic: false,
    teraRock: false,
    teraSteel: false,
    teraWater: false,
    teraShinyBug: false,
    teraShinyDark: false,
    teraShinyDragon: false,
    teraShinyElectric: false,
    teraShinyFairy: false,
    teraShinyFighting: false,
    teraShinyFire: false,
    teraShinyFlying: false,
    teraShinyGhost: false,
    teraShinyGrass: false,
    teraShinyGround: false,
    teraShinyIce: false,
    teraShinyNormal: false,
    teraShinyPoison: false,
    teraShinyPsychic: false,
    teraShinyRock: false,
    teraShinySteel: false,
    teraShinyWater: false,

    shinyAvailable: false,
    alphaAvailable: false,
    shinyAlphaAvailable: false,
    markedAvailable: false,
    shinyMarkedAvailable: false,
    teraBugAvailable: false,
    teraDarkAvailable: false,
    teraDragonAvailable: false,
    teraElectricAvailable: false,
    teraFairyAvailable: false,
    teraFightingAvailable: false,
    teraFireAvailable: false,
    teraFlyingAvailable: false,
    teraGhostAvailable: false,
    teraGrassAvailable: false,
    teraGroundAvailable: false,
    teraIceAvailable: false,
    teraNormalAvailable: false,
    teraPoisonAvailable: false,
    teraPsychicAvailable: false,
    teraRockAvailable: false,
    teraSteelAvailable: false,
    teraWaterAvailable: false,
    teraShinyBugAvailable: false,
    teraShinyDarkAvailable: false,
    teraShinyDragonAvailable: false,
    teraShinyElectricAvailable: false,
    teraShinyFairyAvailable: false,
    teraShinyFightingAvailable: false,
    teraShinyFireAvailable: false,
    teraShinyFlyingAvailable: false,
    teraShinyGhostAvailable: false,
    teraShinyGrassAvailable: false,
    teraShinyGroundAvailable: false,
    teraShinyIceAvailable: false,
    teraShinyNormalAvailable: false,
    teraShinyPoisonAvailable: false,
    teraShinyPsychicAvailable: false,
    teraShinyRockAvailable: false,
    teraShinySteelAvailable: false,
    teraShinyWaterAvailable: false
  }),

  actions: {
    async toggler(catchType) {
      try {
        const userStore = useUserStore();
        const pokemonStore = usePokemonStore();
        this[catchType] = !this[catchType];
        const databaseCatchTypeIdentifier = catchType + "Caught";
        const catchInfoForDatabase = { [databaseCatchTypeIdentifier]: this[catchType] };
        const dbRef = await ref(getDatabase(), `users/${userStore.uid}/pokedex/${pokemonStore.apiNo}/catch`);
        await update(dbRef, catchInfoForDatabase);
      } catch (error) {
        console.error("Failed to update checklist in database. Please try again later", error);
      }
    },

    async caughtCheck(pokemon) {
      try {
        const userStore = useUserStore();
        const pokemonStore = usePokemonStore();
        const dbRef = ref(getDatabase());
        const rawPokemonCatchData = await get(child(dbRef, `users/${userStore.uid}/pokedex/${pokemonStore.apiNo}/catch`));
        let pokemonCatchData = rawPokemonCatchData.val();

        //Create Pokemon Instance If They Do Not Exist In The DB (new Pokemon)
        if (!pokemonCatchData) {
          const dbRefPokedex = await ref(getDatabase(), `users/${userStore.uid}/pokedex/`);
          const pokemonModel = {
            [pokemonStore.apiNo]: {
              name: pokemon.setName,
              type1: pokemon.setType[0],
              type2: pokemon.setType[1] || null,
              dexNo: pokemon.dexNo,
              catch: {
                normalCaught: false
              }
            }
          };
          await update(dbRefPokedex, pokemonModel);
          this.pokemonCatchData = pokemonModel.catch;
        }
        for (const type in huntTypes) {
          const singleCatchType = huntTypes[type] + "Caught";
          this[huntTypes[type]] = pokemonCatchData[singleCatchType];
        }
        await this.lockCheck();
      } catch (error) {
        console.error("Failed to pull checklist in database. Please try again later", error);
      }
    },

    async lockCheck() {
      try {
        const pokemonStore = usePokemonStore();
        const locked = catchLock(pokemonStore.apiNo);
        this.shinyAvailable = locked.shiny;
        this.alphaAvailable = locked.alpha;
        this.shinyAlphaAvailable = locked.shinyAlpha;
        this.markedAvailable = locked.marked;
        this.shinyMarkedAvailable = locked.shinyMarked;
        this.teraBugAvailable = locked.teraBug;
        this.teraDarkAvailable = locked.teraDark;
        this.teraDragonAvailable = locked.teraDragon;
        this.teraElectricAvailable = locked.teraElectric;
        this.teraFairyAvailable = locked.teraFairy;
        this.teraFightingAvailable = locked.teraFighting;
        this.teraFireAvailable = locked.teraFire;
        this.teraFlyingAvailable = locked.teraFlying;
        this.teraGhostAvailable = locked.teraGhost;
        this.teraGrassAvailable = locked.teraGrass;
        this.teraGroundAvailable = locked.teraGround;
        this.teraIceAvailable = locked.teraIce;
        this.teraNormalAvailable = locked.teraNormal;
        this.teraPoisonAvailable = locked.teraPoison;
        this.teraPsychicAvailable = locked.teraPsychic;
        this.teraRockAvailable = locked.teraRock;
        this.teraSteelAvailable = locked.teraSteel;
        this.teraWaterAvailable = locked.teraWater;
        this.teraShinyBugAvailable = locked.teraShinyBug;
        this.teraShinyDarkAvailable = locked.teraShinyDark;
        this.teraShinyDragonAvailable = locked.teraShinyDragon;
        this.teraShinyElectricAvailable = locked.teraShinyElectric;
        this.teraShinyFairyAvailable = locked.teraShinyFairy;
        this.teraShinyFightingAvailable = locked.teraShinyFighting;
        this.teraShinyFireAvailable = locked.teraShinyFire;
        this.teraShinyFlyingAvailable = locked.teraShinyFlying;
        this.teraShinyGhostAvailable = locked.teraShinyGhost;
        this.teraShinyGrassAvailable = locked.teraShinyGrass;
        this.teraShinyGroundAvailable = locked.teraShinyGround;
        this.teraShinyIceAvailable = locked.teraShinyIce;
        this.teraShinyNormalAvailable = locked.teraShinyNormal;
        this.teraShinyPoisonAvailable = locked.teraShinyPoison;
        this.teraShinyPsychicAvailable = locked.teraShinyPsychic;
        this.teraShinyRockAvailable = locked.teraShinyRock;
        this.teraShinySteelAvailable = locked.teraShinySteel;
        this.teraShinyWaterAvailable = locked.teraShinyWater;
      } catch (error) {
        console.error("Failed to pull checklist in database. Please try again later", error);
      }
    },

    defaultToggles() {
      this.normal = this.shiny = this.alpha = this.shinyAlpha = this.marked = this.shinyMarked = this.pokerus = this.shinyPokerus = this.zeroIv = this.shinyZeroIv = this.sixIv = this.shinySixIv = this.favorite = this.shinyAvailable = this.alphaAvailable = this.shinyAlphaAvailable = this.markedAvailable = this.shinyMarkedAvailable = false;
    }
  }
});
