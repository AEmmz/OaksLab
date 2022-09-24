import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
	namespaced: true,
	state() {
		return {
			//Hunt Counts Do Not Include Forms. Regional, Mega, Gigantamax

			userDex: null,

			normalCount: 0,
			shinyCount: 0,
			alphaCount: 0,
			shinyAlphaCount: 0,
			megaCount: 0,
			shinyMegaCount: 0,
			gigantamaxCount: 0,
			shinyGigantamaxCount: 0,
			pokerusCount: 0,
			shinyPokerusCount: 0,
			favoriteCount: 0,

			bugCount: 0,
			darkCount: 0,
			dragonCount: 0,
			electricCount: 0,
			fairyCount: 0,
			fightingCount: 0,
			fireCount: 0,
			flyingCount: 0,
			grassCount: 0,
			ghostCount: 0,
			groundCount: 0,
			iceCount: 0,
			normalTypeCount: 0,
			poisonCount: 0,
			psychicCount: 0,
			steelCount: 0,
			rockCount: 0,
			waterCount: 0,

			longestHunt: null,
			shortestHunt: null,
		};
	},
	mutations,
	actions,
	getters,
};
