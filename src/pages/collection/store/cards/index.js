import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
	namespaced: true,
	state() {
		return {
			displayed: [],
			fullList: [],
			loadedList: [],
			displayedCount: 35,
			startCount: 0,
			endList: false,
			shinyToggle: 'none',
		};
	},
	mutations,
	actions,
	getters,
};
