export default {
	updateCount(state, payload) {
		if (payload.hunt === 'normalCount') {
			state.mainCount = payload.normalCount;
			state.hunt = 'normalCount';
		}
		if (payload.hunt === 'favoriteCount') {
			state.mainCount = payload.favoriteCount;
			state.hunt = 'favoriteCount';
		}
		if (payload.hunt === 'shinyCount') {
			state.mainCount = payload.shinyCount;
			state.hunt = 'shinyCount';
		}
		if (payload.hunt === 'alphaCount') {
			state.mainCount = payload.alphaCount;
			state.hunt = 'alphaCount';
		}
		if (payload.hunt === 'shinyAlphaCount') {
			state.mainCount = payload.shinyAlphaCount;
			state.hunt = 'shinyAlphaCount';
		}
		if (payload.hunt === 'markedCount') {
			state.mainCount = payload.markedCount;
			state.hunt = 'markedCount';
		}
		if (payload.hunt === 'shinyMarkedCount') {
			state.mainCount = payload.shinyMarkedCount;
			state.hunt = 'shinyMarkedCount';
		}
		if (payload.hunt === 'pokerusCount') {
			state.mainCount = payload.pokerusCount;
			state.hunt = 'pokerusCount';
		}
		if (payload.hunt === 'shinyPokerusCount') {
			state.mainCount = payload.shinyPokerusCount;
			state.hunt = 'shinyPokerusCount';
		}
		if (payload.hunt === 'zeroIvCount') {
			state.mainCount = payload.zeroIvCount;
			state.hunt = 'zeroIvCount';
		}
		if (payload.hunt === 'shinyZeroIvCount') {
			state.mainCount = payload.shinyZeroIvCount;
			state.hunt = 'shinyZeroIvCount';
		}
		if (payload.hunt === 'sixIvCount') {
			state.mainCount = payload.sixIvCount;
			state.hunt = 'sixIvCount';
		}
		if (payload.hunt === 'shinySixIvCount') {
			state.mainCount = payload.shinySixIvCount;
			state.hunt = 'shinySixIvCount';
		}
	},
	//Main Count
	countUp(state) {
		if (state.mainCount < 1000001) {
			state.mainCount += state.incrementCount;
			state.mainCount = state.mainCount > 999999 ? 1000000 : state.mainCount;
		}
	},
	countDown(state) {
		if (state.mainCount > 0) {
			state.mainCount -= state.incrementCount;
			state.mainCount = state.mainCount < 0 ? 0 : state.mainCount;
		}
	},

	changeIncrement(state, payload) {
		state.incrementCount = payload;
	},

	//Hold Intervals
	startHold(state, payload) {
		state.interval = payload;
	},

	clearHold(state) {
		clearInterval(state.interval);
	},

	//Reset
	resetCounter(state) {
		if (state.mainCount > 0) {
			state.reset = !state.reset;
		}
	},
	resetConfirm(state) {
		state.mainCount = 0;
		state.incrementCount = 1;
		state.reset = !state.reset;
	},
	resetCancel(state) {
		state.reset = !state.reset;
	},
	resetTracker(state) {
		state.mainCount = 0;
		state.incrementCount = 1;
		state.interval = 0;
		state.reset = false;
	},
};
