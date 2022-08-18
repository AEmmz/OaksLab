export default {
	toggleCollectionFilter(context) {
		context.commit('toggleCollectionFilter');
	},

	toggleStatisticsFilter(context) {
		context.commit('toggleStatisticsFilter');
	},

	closeSliders(context) {
		context.commit('closeSliders');
	},

	menuOverlay(context) {
		context.commit('menuOverlay');
	},

	toggleNav(context) {
		context.commit('toggleNav');
	},
};
