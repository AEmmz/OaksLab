export default {
	toggler(state, payload) {
		if (payload === 'normal') state.normal = !state.normal;
		if (payload === 'shiny') state.shiny = !state.shiny;
		if (payload === 'alpha') state.alpha = !state.alpha;
		if (payload === 'shinyAlpha') state.shinyAlpha = !state.shinyAlpha;
		if (payload === 'marked') state.marked = !state.marked;
		if (payload === 'shinyMarked') state.shinyMarked = !state.shinyMarked;
		if (payload === 'pokerus') state.pokerus = !state.pokerus;
		if (payload === 'shinyPokerus') state.shinyPokerus = !state.shinyPokerus;
		if (payload === 'zeroIv') state.zeroIv = !state.zeroIv;
		if (payload === 'shinyZeroIv') state.shinyZeroIv = !state.shinyZeroIv;
		if (payload === 'sixIv') state.sixIv = !state.sixIv;
		if (payload === 'shinySixIv') state.shinySixIv = !state.shinySixIv;
		if (payload === 'favorite') state.favorite = !state.favorite;
	},

	caughtCheck(state, payload) {
		state.normal = payload.normalCaught;
		state.shiny = payload.shinyCaught;
		state.alpha = payload.alphaCaught;
		state.shinyAlpha = payload.shinyAlphaCaught;
		state.marked = payload.markedCaught;
		state.shinyMarked = payload.shinyMarkedCaught;
		state.pokerus = payload.pokerusCaught;
		state.shinyPokerus = payload.shinyPokerusCaught;
		state.zeroIv = payload.zeroIvCaught;
		state.shinyZeroIv = payload.shinyZeroIvCaught;
		state.sixIv = payload.sixIvCaught;
		state.shinySixIv = payload.shinySixIvCaught;
		state.favorite = payload.favoriteCaught;
	},

	resetTracker(state) {
		state.normal = false;
		state.shiny = false;
		state.alpha = false;
		state.shinyAlpha = false;
		state.marked = false;
		state.shinyMarked = false;
		state.pokerus = false;
		state.shinyPokerus = false;
		state.zeroIv = false;
		state.shinyZeroIv = false;
		state.sixIv = false;
		state.shinySixIv = false;
		state.favorite = false;
	},

	catchLock(state, payload) {
		state.shinyAvailable = payload.shiny;
		state.alphaAvailable = payload.alpha;
		state.shinyAlphaAvailable = payload.shinyAlpha;
		// state.markedAvailable = payload.marked;
		// state.shinyMarkedAvailable = payload.shinyMarked;
	},
};
