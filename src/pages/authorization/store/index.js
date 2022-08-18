import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';

export default {
	namespaced: true,
	state() {
		return {
			uid: null,
			currentUser: null,
			isLoggedIn: false,
			auth: null,
			username: null,
		};
	},
	mutations,
	actions,
	getters,
};
