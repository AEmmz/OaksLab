import { child, get, getDatabase, ref } from "firebase/database";

export default {
  async getLocationDetails(context) {
    const apiNo = await context.rootGetters["tracker/apiNo"];
    const dbRef = await ref(getDatabase());
    const rawData = await get(child(dbRef, `pokemon/${apiNo}/game`));
    const locationData = await rawData.val();
    await context.commit("setLocationDetails", locationData);
    await context.dispatch("changeLocationDetails");
  },

  async changeLocationDetails(context) {
    const details = context.getters.locationDetails;
    let rawGame = context.rootGetters["authorization/selectedGame"];
    if (!rawGame) {
      rawGame = "Scarlet / Violet";
      await context.dispatch("authorization/setSelectedGame", rawGame, { root: true });
    }
    // const selectedGame = rawGame ? rawGame.toLowerCase() : "red / blue";
    const selectedGame = rawGame.toLowerCase();
    let currentGameDetails = [];
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
    if (details) {
      details.forEach((gameEntry) => {
        const gameDataName = gameEntry.game.toLowerCase();
        for (let inputOptionsKey in inputOptions) {
          const gameNameArray = inputOptions[inputOptionsKey];
          if (gameNameArray.includes(selectedGame) && gameNameArray.includes(gameDataName)) {
            currentGameDetails.push(gameEntry);
          }
        }
      });
    }
    context.commit("setCurrentGameLocations", currentGameDetails);
  }

};
