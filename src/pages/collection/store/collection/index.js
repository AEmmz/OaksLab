import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

import cardsModule from '../cards/index.js';

export default {
	namespaced: true,
	modules: { cards: cardsModule },
	state() {
		return {
			fullList: null,
			defaultSet: null,
			filteredList: null,
			sortedList: null,
			paginatedList: null,
			// pokemon: null,
			// filtered: [],
			// sorted: [],
			// caught: [],
			// need: [],
			// generation: [],
			// type: [],
			// game: [],
			preserveSort: null,
		};
	},
	mutations,
	actions,
	getters,
};
