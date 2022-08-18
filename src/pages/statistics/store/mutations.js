export default {
	fetchStats(state, payload) {
		state.userDex = payload;
	},

	calculateBaseStats(state, payload) {
		state.normalCount = payload.normal;
		state.shinyCount = payload.shiny;
		state.alphaCount = payload.alpha;
		state.shinyAlphaCount = payload.shinyAlpha;
		state.megaCount = payload.mega;
		state.shinyMegaCount = payload.shinyMega;
		state.gigantamaxCount = payload.gigantamax;
		state.shinyGigantamaxCount = payload.shinyGigantamax;
		state.pokerusCount = payload.pokerus;
		state.shinyPokerusCount = payload.shinyPokerus;
		state.favoriteCount = payload.favorite;
	},

	calculateTypeStats(state, payload) {
		state.bugCount = payload.bug;
		state.darkCount = payload.dark;
		state.dragonCount = payload.dragon;
		state.electricCount = payload.electric;
		state.fairyCount = payload.fairy;
		state.fightingCount = payload.fighting;
		state.fireCount = payload.fire;
		state.flyingCount = payload.flying;
		state.grassCount = payload.grass;
		state.ghostCount = payload.ghost;
		state.groundCount = payload.ground;
		state.iceCount = payload.ice;
		state.normalTypeCount = payload.normalType;
		state.poisonCount = payload.poison;
		state.psychicCount = payload.psychic;
		state.steelCount = payload.steel;
		state.rockCount = payload.rock;
		state.waterCount = payload.water;
	},

	calculateStats(state, payload) {
		state.normalCount = payload.normal;
		state.shinyCount = payload.shiny;
		state.alphaCount = payload.alpha;
		state.shinyAlphaCount = payload.shinyAlpha;
		state.megaCount = payload.mega;
		state.shinyMegaCount = payload.shinyMega;
		state.gigantamaxCount = payload.gigantamax;
		state.shinyGigantamaxCount = payload.shinyGigantamax;
		state.pokerusCount = payload.pokerus;
		state.shinyPokerusCount = payload.shinyPokerus;
		state.favoriteCount = payload.favorite;
		state.bugCount = payload.bug;
		state.darkCount = payload.dark;
		state.dragonCount = payload.dragon;
		state.electricCount = payload.electric;
		state.fairyCount = payload.fairy;
		state.fightingCount = payload.fighting;
		state.fireCount = payload.fire;
		state.flyingCount = payload.flying;
		state.grassCount = payload.grass;
		state.ghostCount = payload.ghost;
		state.groundCount = payload.ground;
		state.iceCount = payload.ice;
		state.normalTypeCount = payload.normalType;
		state.poisonCount = payload.poison;
		state.psychicCount = payload.psychic;
		state.steelCount = payload.steel;
		state.rockCount = payload.rock;
		state.waterCount = payload.water;
	},
};
