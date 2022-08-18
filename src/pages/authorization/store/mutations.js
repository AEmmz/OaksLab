export default {
	autoAuth(state, payload) {
		state.isLoggedIn = payload.isLoggedIn;
		state.currentUser = payload.currentUser;
		state.uid = payload.uid;
		// state.auth = payload.auth;
	},
	setUsername(state, payload) {
		state.username = payload.username;
	},
	logout(state) {
		state.isLoggedIn = false;
		state.currentUser = null;
		state.uid = null;
		// state.auth = null;
	},
};
