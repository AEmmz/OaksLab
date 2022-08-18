export default {
	setFilteredList(state, payload) {
		state.filteredList = payload;
	},
	setPaginatedList(state, payload) {
		state.paginatedList = payload;
	},

	setDefaultLists(state, payload) {
		state.fullList = payload.fullList;
		state.defaultSet = payload.defaultSort;
		state.filteredList = payload.defaultSort;
		// state.sortedList = payload.noSort;
		// state.pokemon = payload.userInfo;
		// state.filtered = payload.userInfo;
		// state.sorted = payload.userInfo;
		// state.caught = payload.userInfo;
		// state.need = payload.userInfo;
		// state.generation = payload.userInfo;
		// state.type = payload.userInfo;
		// state.game = payload.userInfo;
	},
	// pokemonList(state, payload) {
	// 	state.pokemon = payload.userInfo;
	// 	state.filtered = payload.userInfo;
	// 	state.sorted = payload.userInfo;
	// 	state.caught = payload.userInfo;
	// 	state.need = payload.userInfo;
	// 	state.generation = payload.userInfo;
	// 	state.type = payload.userInfo;
	// 	state.game = payload.userInfo;
	// },

	combineFilters(state) {
		const arrays = [
			[...state.sorted],
			[...state.caught],
			[...state.need],
			[...state.generation],
			[...state.type],
			[...state.game],
		];
		const result = arrays.shift().filter(function (v) {
			return arrays.every(function (a) {
				return a.indexOf(v) !== -1;
			});
		});

		state.filtered = result;
	},

	sortFilter(state, payload) {
		state.sorted = state.pokemon;
		state.sorted = payload;
	},

	caughtFilter(state, payload) {
		state.caught = state.pokemon;
		state.caught = payload;
	},
	needFilter(state, payload) {
		state.need = state.pokemon;
		state.need = payload;
	},
	typeFilter(state, payload) {
		state.type = state.pokemon;
		state.type = payload;
	},
	genFilter(state, payload) {
		state.generation = state.pokemon;
		state.generation = payload;
	},
	gameFilter(state, payload) {
		state.game = state.pokemon;
		state.generation = payload;
	},
	preserveSort(state, payload) {
		state.preserveSort = payload;
	},
};
