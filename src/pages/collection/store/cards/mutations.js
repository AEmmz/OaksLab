export default {
	fetchFullList(state, payload) {
		state.fullList = payload;
	},
	toggleEnd(state, payload) {
		state.endList = payload;
	},
	updateLoadedList(state, payload) {
		state.loadedList.push(...payload);
	},
	updateDisplayedCount(state) {
		state.displayedCount += 35;
	},
	updateStartCount(state) {
		state.startCount += 35;
	},
	resetLiveList(state, payload) {
		state.fullList = payload;
		state.loadedList = [];
		state.displayedCount = 35;
		state.startCount = 0;
		state.endList = false;
	},
	shinyToggle(state, payload) {
		state.shinyToggle = payload;
	},
};
