import { getDatabase, ref, child, get, update } from 'firebase/database';

export default {
	async changeCount(context, payload) {
		try {
			const uid = context.rootGetters['authorization/uid'];
			const pkId = context.rootGetters['tracker/pkId'];
			let huntType;
			const dbRef = ref(getDatabase());
			const data = await get(child(dbRef, `users/${uid}/pokedex/${pkId}/count`));
			let counter = data.val();
			if (payload === 'normal') {
				counter = counter?.normalCount ? counter.normalCount : 0;
				context.commit('updateCount', { hunt: 'normalCount', normalCount: counter });
			}
			if (payload === 'shiny') {
				counter = counter?.shinyCount ? counter.shinyCount : 0;
				context.commit('updateCount', { hunt: 'shinyCount', shinyCount: counter });
			}
			if (payload === 'alpha') {
				counter = counter?.alphaCount ? counter.alphaCount : 0;
				context.commit('updateCount', { hunt: 'alphaCount', alphaCount: counter });
			}
			if (payload === 'shiny alpha') {
				counter = counter?.shinyAlphaCount ? counter.shinyAlphaCount : 0;
				context.commit('updateCount', {
					hunt: 'shinyAlphaCount',
					shinyAlphaCount: counter,
				});
			}
			if (payload === 'marked') {
				counter = counter?.markedCount ? counter.markedCount : 0;
				context.commit('updateCount', {
					hunt: 'markedCount',
					markedCount: counter,
				});
			}
			if (payload === 'shiny marked') {
				counter = counter?.shinyMarkedCount ? counter.shinyMarkedCount : 0;
				context.commit('updateCount', {
					hunt: 'shinyMarkedCount',
					shinyMarkedCount: counter,
				});
			}
			if (payload === 'pokerus') {
				counter = counter?.pokerusCount ? counter.pokerusCount : 0;
				context.commit('updateCount', {
					hunt: 'pokerusCount',
					pokerusCount: counter,
				});
			}
			if (payload === 'shiny pokerus') {
				counter = counter?.shinyPokerusCount ? counter.shinyPokerusCount : 0;
				context.commit('updateCount', {
					hunt: 'shinyPokerusCount',
					shinyPokerusCount: counter,
				});
			}
			if (payload === '0 iv') {
				counter = counter?.zeroIvCount ? counter.zeroIvCount : 0;
				context.commit('updateCount', {
					hunt: 'zeroIvCount',
					zeroIvCount: counter,
				});
			}
			if (payload === 'shiny 0 iv') {
				counter = counter?.shinyZeroIvCount ? counter.shinyZeroIvCount : 0;
				context.commit('updateCount', {
					hunt: 'shinyZeroIvCount',
					shinyZeroIvCount: counter,
				});
			}
			if (payload === '6 iv') {
				counter = counter?.sixIvCount ? counter.sixIvCount : 0;
				context.commit('updateCount', {
					hunt: 'sixIvCount',
					sixIvCount: counter,
				});
			}
			if (payload === 'shiny 6 iv') {
				counter = counter?.shinySixIvCount ? counter.shinySixIvCount : 0;
				context.commit('updateCount', {
					hunt: 'shinySixIvCount',
					shinySixIvCount: counter,
				});
			}
			if (payload === 'favorite') {
				counter = counter?.favoriteCount ? counter.favoriteCount : 0;
				context.commit('updateCount', { hunt: 'favoriteCount', favoriteCount: counter });
			}
		} catch (error) {
			console.log(error.message);
		}
	},

	async updateCounter({ getters, rootGetters }) {
		try {
			const uid = rootGetters['authorization/uid'];
			const pkId = rootGetters['tracker/pkId'];
			const count = getters.mainCount;
			const hunt = getters.hunt;
			const dbRef = await ref(getDatabase(), `users/${uid}/pokedex/${pkId}/count`);
			if (hunt === 'normalCount') {
				const updateDb = await update(dbRef, { normalCount: count });
			}
			if (hunt === 'shinyCount') {
				const updateDb = await update(dbRef, { shinyCount: count });
			}
			if (hunt === 'alphaCount') {
				const updateDb = await update(dbRef, { alphaCount: count });
			}
			if (hunt === 'shinyAlphaCount') {
				const updateDb = await update(dbRef, { shinyAlphaCount: count });
			}
			if (hunt === 'markedCount') {
				const updateDb = await update(dbRef, { markedCount: count });
			}
			if (hunt === 'shinyMarkedCount') {
				const updateDb = await update(dbRef, { shinyMarkedCount: count });
			}
			if (hunt === 'pokerusCount') {
				const updateDb = await update(dbRef, { pokerusCount: count });
			}
			if (hunt === 'shinyPokerusCount') {
				const updateDb = await update(dbRef, { shinyPokerusCount: count });
			}
			if (hunt === 'zeroIvCount') {
				const updateDb = await update(dbRef, { zeroIvCount: count });
			}
			if (hunt === 'shinyZeroIvCount') {
				const updateDb = await update(dbRef, { shinyZeroIvCount: count });
			}
			if (hunt === 'sixIvCount') {
				const updateDb = await update(dbRef, { sixIvCount: count });
			}
			if (hunt === 'shinySixIvCount') {
				const updateDb = await update(dbRef, { shinySixIvCount: count });
			}
			if (hunt === 'favoriteCount') {
				const updateDb = await update(dbRef, { favoriteCount: count });
			}
		} catch (error) {
			console.error('Failed to update count in database. Please try again later', error);
		}
	},

	//Main Counter
	changeIncrement(context, payload) {
		context.commit('changeIncrement', payload);
	},

	countUp(context) {
		context.commit('countUp');
		context.dispatch('updateCounter');
	},
	countDown(context) {
		context.commit('countDown');
		context.dispatch('updateCounter');
	},
	holdCountUp(context) {
		context.commit('clearHold');
		context.commit('startHold');
		const int = setInterval(() => context.commit('countUp'), 300);
		context.commit('startHold', int);
	},
	holdCountDown(context) {
		context.commit('clearHold');
		context.commit('startHold');
		const int = setInterval(() => context.commit('countDown'), 300);
		context.commit('startHold', int);
	},

	clearCountHold(context) {
		context.commit('clearHold');
		context.dispatch('updateCounter');
	},

	//Reset
	resetCounter(context) {
		context.commit('resetCounter');
	},

	resetConfirm(context) {
		context.commit('resetConfirm');
		context.dispatch('updateCounter');
	},
	resetCancel(context) {
		context.commit('resetCancel');
	},
};
