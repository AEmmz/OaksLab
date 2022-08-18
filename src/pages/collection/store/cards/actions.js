export default {
	async fetchFullList({ dispatch, commit, rootGetters }) {
		const fetch = await dispatch('collection/retrieveList', {}, { root: true });
		const list = await rootGetters['collection/filtered'];
		commit('fetchFullList', list);
	},

	updateLoadedList(context) {
		const displayed = context.getters.displayedCount;
		const start = context.getters.startCount;
		const fullList = context.getters.fullList;
		const newList = [];
		for (let i = start; i < displayed; i++) {
			if (fullList[i]) newList.push(fullList[i]);
			if (!fullList[i]) context.commit('toggleEnd', true);
		}

		context.commit('updateLoadedList', newList);
		context.commit('updateDisplayedCount');
		context.commit('updateStartCount');
	},

	resetLiveList(context, payload) {
		context.commit('resetLiveList', payload);
		context.dispatch('updateLoadedList');
	},

	shinyToggle(context, payload) {
		context.commit('shinyToggle', payload);
		context.dispatch('pokemonImage');
	},
};
