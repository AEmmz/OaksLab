export default {
	toggleNav(state) {
		state.mobileMenu = !state.mobileMenu;
		state.menuOverlay = !state.menuOverlay;
	},

	toggleCollectionFilter(state) {
		state.collectionFilter = !state.collectionFilter;
		state.menuOverlay = !state.menuOverlay;
	},
	toggleStatisticsFilter(state) {
		state.statisticsFilter = !state.statisticsFilter;
		state.menuOverlay = !state.menuOverlay;
	},

	closeSliders(state) {
		state.collectionFilter = false;
		state.statisticsFilter = false;
		state.mobileMenu = false;
		state.menuOverlay = false;
	},

	menuOverlay(state) {
		state.menuOverlay = !state.menuOverlay;
	},
};
