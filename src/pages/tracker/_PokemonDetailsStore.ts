//Firebase
import { child, get, getDatabase, ref } from "firebase/database";

//Imports

//Stores
import { defineStore } from "pinia";
import { usePokemonStore } from "pages/tracker/_PokemonStore";
import { useUserStore } from "pages/authorization/_UserStore";

//Interfaces
import ITrackerDetailsDatabase from "src/interfaces/tracker/ITrackerDetailsDatabase";

//Types
type DetailsStoreState = {
  locationDetails: ITrackerDetailsDatabase[],
  currentGame: string,
  currentGameDetails: ITrackerDetailsDatabase[],
  gameOptions: string[]
}


export const usePokemonDetailsStore = defineStore("PokemonDetailsStore", {
  state: (): DetailsStoreState => ({
    locationDetails: [],
    currentGame: "",
    currentGameDetails: [],
    gameOptions: [
      "Scarlet / Violet",
      "Legends: Arceus",
      "Brilliant Diamond / Shining Pearl",
      "Sword / Shield",
      "Let's Go, Pikachu / Let's Go, Eevee",
      "Ultra Sun / Ultra Moon",
      "Sun / Moon",
      "Omega Ruby / Alpha Sapphire",
      "X / Y",
      "Black 2 / White 2",
      "Black / White",
      "HeartGold / SoulSilver",
      "Diamond / Pearl / Platinum",
      "FireRed / LeafGreen",
      "Ruby / Sapphire / Emerald",
      "Gold / Silver / Crystal",
      "Red / Blue / Yellow"
    ]
  }),

  actions: {
    async getLocationDetails() {
      const pokemonStore = usePokemonStore();
      const dbRef = ref(getDatabase());
      const rawLocationData = await get(child(dbRef, `pokemon/${pokemonStore.apiNo}/game`));
      this.locationDetails = await rawLocationData.val() as ITrackerDetailsDatabase[];
      await this.changeLocationDetails();
    },

    async changeLocationDetails() {
      const userStore = useUserStore();
      let defaultGame = userStore.userInfo.selectedGame;
      if (!defaultGame) {
        defaultGame = "Scarlet / Violet";
        await userStore.setSelectedGame(defaultGame);
      }
      const selectedGame = defaultGame.toLowerCase();
      const currentGameDetails: ITrackerDetailsDatabase[] = [];
      const inputOptions = {
        redBlueYellow: ["red", "blue", "red / blue", "yellow", "blue (japan)", "red / blue / yellow"],
        goldSilverCrystal: ["gold", "silver", "gold / silver", "crystal", "gold / silver / crystal"],
        rubySapphireEmerald: ["ruby", "sapphire", "ruby / sapphire", "emerald", "ruby / sapphire / emerald"],
        fireRedLeafGreen: ["firered", "leafgreen", "firered / leafgreen"],
        diamondPearlPlatinum: ["diamond", "pearl", "diamond / pearl", "platinum", "pal park", "diamond / pearl / platinum"],
        heartGoldSoulSilver: ["heartgold", "soulsilver", "heartgold / soulsilver", "pal park"],
        blackWhite: ["black", "white", "black / white"],
        black2White2: ["black 2", "white 2", "black 2 / white 2"],
        xY: ["x", "y", "x / y"],
        omegaRubyAlphaSapphire: ["omega ruby", "alpha sapphire", "omega ruby / alpha sapphire"],
        sunMoon: ["sun", "moon", "sun / moon"],
        ultraSunUltraMoon: ["ultra sun", "ultra moon", "ultra sun / ultra moon"],
        letsGoPikachuEevee: ["let's go, pikachu", "let's go, eevee", "let's go pikachu", "let's go eevee", "let's go, pikachu / let's go, eevee", "let's go pikachu / let's go eevee"],
        swordShield: ["sword", "shield", "sword / shield", "expansion pass"],
        brilliantDiamondShiningPearl: ["brilliant diamond", "shining pearl", "brilliant diamond / shining pearl"],
        legendsArceus: ["legends: arceus", "legends arceus", "legend's: arceus", "legend's arceus"],
        scarletViolet: ["scarlet", "violet", "scarlet / violet"]
      };
      if (this.locationDetails) {
        this.locationDetails.forEach((gameEntry) => {
          const gameDataName = gameEntry.game.toLowerCase();
          for (const inputOptionsKey in inputOptions) {
            const gameNameArray = inputOptions[inputOptionsKey as keyof typeof inputOptions];
            if (gameNameArray.includes(selectedGame) && gameNameArray.includes(gameDataName)) {
              currentGameDetails.push(gameEntry);
            }
          }
        });
      }
      this.currentGameDetails = currentGameDetails;
    }
  }
});
