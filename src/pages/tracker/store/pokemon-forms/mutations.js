export default {
	fetchForms(state, payload) {
		state.forms = payload;
	},
	resetForms(state) {
		state.forms = [];
	},
};
