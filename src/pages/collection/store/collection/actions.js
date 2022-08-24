import { getDatabase, ref, child, get } from 'firebase/database';

const PokeList = () => import('../../../../assets/json/pokemonList.json');
const GameAvailability = () => import('../../../../assets/json/gameAvailability.json');

export default {
	async retrieveList(context) {
		const uid = await context.rootGetters['authorization/uid'];
		const dbRef = await ref(getDatabase());
		const data = await get(child(dbRef, `users/${uid}/pokedex`));
		const userInfo = await Object.entries(data.val());

		context.dispatch('setDefaultLists', userInfo);
	},

	async setDefaultLists(context, payload) {
		const byCaught = await context.dispatch('filterByCaught', { data: payload, caught: true });
		const byDex = await context.dispatch('sortByPokedex', { data: byCaught, sort: 'asc' });
		await context.commit('setDefaultLists', { defaultSort: byDex, fullList: payload });
		await context.dispatch('paginate', { current: 1, perPage: 25, defaultSet: true });
	},

	async paginate(context, { current, perPage, defaultSet, presetList }) {
		context.commit('setPaginatedList', []);
		let list;
		if (presetList) {
			list = presetList;
		} else if (defaultSet) {
			list = await context.getters.defaultSet;
		} else {
			list = await context.getters.filteredList;
		}
		const start = (current - 1) * perPage;
		const end = start + perPage;
		const paginatedList = list.slice(start, end);
		context.commit('setPaginatedList', paginatedList);
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		return;
	},

	sortByName(_, { data, sort }) {
		if (sort === 'asc') {
			return data.sort((a, b) => {
				return a[1].name.localeCompare(b[1].name);
			});
		}
		if (sort === 'desc') {
			return data.sort((a, b) => {
				return b[1].name.localeCompare(a[1].name);
			});
		}
	},

	sortByPokedex(_, { data, sort }) {
		if (sort === 'asc') {
			return data.sort((a, b) => {
				const first = +a[1].dexNo;
				const second = +b[1].dexNo;
				return first - second;
			});
		}
		if (sort === 'desc') {
			return data.sort((a, b) => {
				return +b[1].dexNo - +a[1].dexNo;
			});
		}
	},

	filterByCaught(_, { data, caught }) {
		if (caught) {
			return data.filter((p) => {
				return (
					p[1]?.catch?.normalCaught ||
					p[1]?.catch?.shinyCaught ||
					p[1]?.catch?.alphaCaught ||
					p[1]?.catch?.favoriteCaught ||
					p[1]?.catch?.shinyAlphaCaught ||
					p[1]?.catch?.markedCaught ||
					p[1]?.catch?.shinyMarkedCaught ||
					p[1]?.catch?.pokerusCaught ||
					p[1]?.catch?.shinyPokerusCaught ||
					p[1]?.catch?.zeroIvCaught ||
					p[1]?.catch?.shinyZeroIvCaught ||
					p[1]?.catch?.sixIvCaught ||
					p[1]?.catch?.shinySixIvCaught
				);
			});
		}
		if (!caught) {
			return data.filter((p) => {
				return (
					!p[1]?.catch?.normalCaught &&
					!p[1]?.catch?.shinyCaught &&
					!p[1]?.catch?.alphaCaught &&
					!p[1]?.catch?.favoriteCaught &&
					!p[1]?.catch?.shinyAlphaCaught &&
					!p[1]?.catch?.markedCaught &&
					!p[1]?.catch?.shinyMarkedCaught &&
					!p[1]?.catch?.pokerusCaught &&
					!p[1]?.catch?.shinyPokerusCaught &&
					!p[1]?.catch?.zeroIvCaught &&
					!p[1]?.catch?.shinyZeroIvCaught &&
					!p[1]?.catch?.sixIvCaught &&
					!p[1]?.catch?.shinySixIvCaught
				);
			});
		}
	},

	async applySearch({ dispatch, commit, getters }, payload) {
		let list = getters.filteredList;
		list = list.filter((p) => {
			const name = p[1].name.toLowerCase();
			const query = payload.search.toLowerCase();
			return name.includes(query);
		});
		commit('setFilteredList', list);
		dispatch('paginate', { current: 1, perPage: payload.pagination, defaultSet: false });
	},

	async applyFilters({ dispatch, commit, getters }, payload) {
		let list = getters.fullList;
		const filter = payload.filter;
		const sort = payload.sortOrder;
		if (filter.includes('myCaught')) {
			list = await dispatch('filterByCaught', { data: list, caught: true });
		}
		if (filter.includes('dexNo')) {
			list = await dispatch('sortByPokedex', { data: list, sort: sort });
		}
		commit('setSortList', list);
		dispatch('paginate', { current: 1, perPage: 25, defaultSet: false });
	},

	// async collectionFilters(context, { option, filter }) {
	// 	try {
	// 		let allFilter = [context.getters.pokemon][0];
	// 		let fetchPkDetails = await PokeList();
	// 		let fetchGameDetails = await GameAvailability();
	// 		let pkDetails = await fetchPkDetails.default.pokemon;
	// 		let gameDetails = await fetchGameDetails.default;
	// 		let filtered = await context.getters.filtered;
	// 		let sorted = [];

	// 		//GONE BAD
	// 		let filterCopy = [...filtered];

	// 		//----SORT FILTER----//
	// 		if (option == 'Sort Order:') {
	// 			if (filter === 'Name: A-Z') {
	// 				sorted = await filtered.sort((a, b) => {
	// 					return a[1].name.localeCompare(b[1].name);
	// 				});
	// 			}
	// 			if (filter === 'Name: Z-A') {
	// 				sorted = await filtered.sort((a, b) => {
	// 					return b[1].name.localeCompare(a[1].name);
	// 				});
	// 			}
	// 			if (filter === 'Dex: Asc') {
	// 				sorted = await filtered.sort((a, b) => {
	// 					const first = +a[1].dexNo;
	// 					const second = +b[1].dexNo;
	// 					return first - second;
	// 				});
	// 			}
	// 			if (filter === 'Dex: Desc') {
	// 				sorted = await filtered.sort((a, b) => {
	// 					return +b[1].dexNo - +a[1].dexNo;
	// 				});
	// 			}

	// 			const set = await context.commit('sortFilter', sorted);
	// 			const set2 = await context.commit('combineFilters');
	// 			const set3 = await context.commit('preserveSort', { option, filter });
	// 			return;
	// 		}

	// 		//----CAUGHT FILTER----//
	// 		if (option == 'Caught:') {
	// 			//Displays All Pokemon
	// 			if (filter === 'Show All') {
	// 				sorted = allFilter;
	// 			}
	// 			//Displays All Caught Pokemon - Default
	// 			if (filter === 'My Caught') {
	// 				sorted = allFilter.filter((pk) => {
	// 					return (
	// 						pk[1]?.catch?.normalCaught ||
	// 						pk[1]?.catch?.shinyCaught ||
	// 						pk[1]?.catch?.alphaCaught ||
	// 						pk[1]?.catch?.favoriteCaught ||
	// 						pk[1]?.catch?.shinyAlphaCaught ||
	// 						pk[1]?.catch?.markedCaught ||
	// 						pk[1]?.catch?.shinyMarkedCaught ||
	// 						pk[1]?.catch?.pokerusCaught ||
	// 						pk[1]?.catch?.shinyPokerusCaught ||
	// 						pk[1]?.catch?.zeroIvCaught ||
	// 						pk[1]?.catch?.shinyZeroIvCaught ||
	// 						pk[1]?.catch?.sixIvCaught ||
	// 						pk[1]?.catch?.shinySixIvCaught
	// 					);
	// 				});
	// 			}

	// 			if (filter === 'Normal') {
	// 				sorted = allFilter.filter((pk) => {
	// 					return pk[1]?.catch?.normalCaught;
	// 				});
	// 			}
	// 			if (filter === 'Shiny') {
	// 				sorted = allFilter.filter((pk) => {
	// 					return pk[1]?.catch?.shinyCaught;
	// 				});
	// 			}
	// 			if (filter === 'Alpha') {
	// 				sorted = allFilter.filter((pk) => {
	// 					return pk[1]?.catch?.alphaCaught;
	// 				});
	// 			}
	// 			if (filter === 'Favorite') {
	// 				sorted = allFilter.filter((pk) => {
	// 					return pk[1]?.catch?.favoriteCaught;
	// 				});
	// 			}
	// 			if (filter === 'Complete') {
	// 				sorted = allFilter.filter((pk) => {
	// 					return (
	// 						pk[1]?.catch?.normalCaught &&
	// 						pk[1]?.catch?.shinyCaught &&
	// 						pk[1]?.catch?.alphaCaught &&
	// 						pk[1]?.catch?.favoriteCaught
	// 					);
	// 				});
	// 			}
	// 			await context.commit('caughtFilter', sorted);
	// 			await context.commit('combineFilters');
	// 		}

	// 		//----NEED FILTER----//
	// 		if (option == 'Need:') {
	// 			//Displays All Pokemon -  - Default
	// 			if (filter === 'No Filter') {
	// 				sorted = allFilter;
	// 			}
	// 			//Displays All Needed Pokemon
	// 			if (filter === 'Any') {
	// 				sorted = allFilter.filter((pk) => {
	// 					return (
	// 						!pk[1]?.catch.normalCaught ||
	// 						!pk[1]?.catch?.shinyCaught ||
	// 						!pk[1]?.catch?.alphaCaught ||
	// 						!pk[1]?.catch?.favoriteCaught
	// 					);
	// 				});
	// 			}
	// 			if (filter === 'All') {
	// 				sorted = allFilter.filter((pk) => {
	// 					return (
	// 						!pk[1]?.catch.normalCaught &&
	// 						!pk[1]?.catch?.shinyCaught &&
	// 						!pk[1]?.catch?.alphaCaught &&
	// 						!pk[1]?.catch?.favoriteCaught
	// 					);
	// 				});
	// 			}

	// 			if (filter === 'Normal') {
	// 				sorted = allFilter.filter((pk) => {
	// 					return !pk[1]?.catch?.normalCaught;
	// 				});
	// 			}
	// 			if (filter === 'Shiny') {
	// 				sorted = allFilter.filter((pk) => {
	// 					return !pk[1]?.catch?.shinyCaught;
	// 				});
	// 			}
	// 			if (filter === 'Alpha') {
	// 				sorted = allFilter.filter((pk) => {
	// 					return !pk[1]?.catch?.alphaCaught;
	// 				});
	// 			}
	// 			if (filter === 'Favorite') {
	// 				sorted = allFilter.filter((pk) => {
	// 					return !pk[1]?.catch?.favoriteCaught;
	// 				});
	// 			}
	// 			await context.commit('sortFilter', sorted);
	// 			await context.commit('combineFilters');
	// 			await context.dispatch('rerunSort');
	// 		}

	// 		//----GEN FILTER----//
	// 		if (option == 'Generation:') {
	// 			const findGen = (dexLow, dexHigh) => {
	// 				allFilter.forEach((pokemon) => {
	// 					const dexNo = +pokemon[1].dexNo;
	// 					if (dexNo >= dexLow && dexNo <= dexHigh) {
	// 						sorted.push(pokemon);
	// 					}
	// 				});
	// 			};

	// 			if (filter === 'All') sorted = allFilter;
	// 			if (filter === 'Gen 1') findGen(1, 151);
	// 			if (filter === 'Gen 2') findGen(152, 251);
	// 			if (filter === 'Gen 3') findGen(252, 386);
	// 			if (filter === 'Gen 4') findGen(387, 493);
	// 			if (filter === 'Gen 5') findGen(494, 649);
	// 			if (filter === 'Gen 6') findGen(650, 721);
	// 			if (filter === 'Gen 7') findGen(722, 809);
	// 			if (filter === 'Gen 8') findGen(810, 905);
	// 			if (filter === 'Gen 9') findGen(906, 1500);
	// 			await context.commit('genFilter', sorted);
	// 			await context.commit('combineFilters');
	// 		}

	// 		//----TYPE FILTER----//
	// 		if (option == 'Type:') {
	// 			const typeFilter = (match) => {
	// 				allFilter.forEach((pk) => {
	// 					match.forEach((pkmn) => {
	// 						if (pk[2] === pkmn.name) sorted.push(pk);
	// 					});
	// 				});
	// 			};
	// 			const typeSort = (typing) => {
	// 				const typeMatch = pkDetails.filter((pk) => {
	// 					return pk.types.includes(typing);
	// 				});
	// 				typeFilter(typeMatch);
	// 			};

	// 			if (filter === 'All') {
	// 				sorted = allFilter;
	// 			}

	// 			if (filter === 'Normal') {
	// 				typeSort('normal');
	// 			}
	// 			if (filter === 'Fire') {
	// 				typeSort('fire');
	// 			}
	// 			if (filter === 'Water') {
	// 				typeSort('water');
	// 			}
	// 			if (filter === 'Grass') {
	// 				typeSort('grass');
	// 			}
	// 			if (filter === 'Electric') {
	// 				typeSort('electric');
	// 			}
	// 			if (filter === 'Ice') {
	// 				typeSort('ice');
	// 			}
	// 			if (filter === 'Fighting') {
	// 				typeSort('fighting');
	// 			}
	// 			if (filter === 'Poison') {
	// 				typeSort('poison');
	// 			}
	// 			if (filter === 'Ground') {
	// 				typeSort('ground');
	// 			}
	// 			if (filter === 'Flying') {
	// 				typeSort('flying');
	// 			}
	// 			if (filter === 'Psychic') {
	// 				typeSort('psychic');
	// 			}
	// 			if (filter === 'Bug') {
	// 				typeSort('bug');
	// 			}
	// 			if (filter === 'Rock') {
	// 				typeSort('rock');
	// 			}
	// 			if (filter === 'Ghost') {
	// 				typeSort('ghost');
	// 			}
	// 			if (filter === 'Dark') {
	// 				typeSort('dark');
	// 			}
	// 			if (filter === 'Dragon') {
	// 				typeSort('dragon');
	// 			}
	// 			if (filter === 'Steel') {
	// 				typeSort('steel');
	// 			}
	// 			if (filter === 'Fairy') {
	// 				typeSort('fairy');
	// 			}
	// 			await context.commit('typeFilter', sorted);
	// 			await context.commit('combineFilters');
	// 		}

	// 		//----TYPE FILTER----//
	// 		if (option == 'Game:') {
	// 			const findGame = (gameQuery) => {
	// 				allFilter.forEach((pk) => {
	// 					gameDetails.forEach((pkmn) => {
	// 						if (pkmn.dexno === pk[0]) {
	// 							if (pkmn.games[gameQuery]) sorted.push(pk);
	// 						}
	// 					});
	// 				});
	// 			};

	// 			if (filter === 'All') {
	// 				sorted = allFilter;
	// 			}
	// 			if (filter === 'Red') {
	// 				findGame('red');
	// 			}
	// 			if (filter === 'Green') {
	// 				findGame('green');
	// 			}
	// 			if (filter === 'Blue') {
	// 				findGame('blue');
	// 			}
	// 			if (filter === 'Yellow') {
	// 				findGame('yellow');
	// 			}
	// 			if (filter === 'Gold') {
	// 				findGame('gold');
	// 			}
	// 			if (filter === 'Silver') {
	// 				findGame('silver');
	// 			}
	// 			if (filter === 'Crystal') {
	// 				findGame('crystal');
	// 			}
	// 			if (filter === 'Ruby') {
	// 				findGame('ruby');
	// 			}
	// 			if (filter === 'Sapphire') {
	// 				findGame('sapphire');
	// 			}
	// 			if (filter === 'Fire Red') {
	// 				findGame('firered');
	// 			}
	// 			if (filter === 'Leaf Green') {
	// 				findGame('leafgreen');
	// 			}
	// 			if (filter === 'Emerald') {
	// 				findGame('emerald');
	// 			}
	// 			if (filter === 'Colosseum') {
	// 				findGame('colosseum');
	// 			}
	// 			if (filter === 'XD') {
	// 				findGame('xd');
	// 			}
	// 			if (filter === 'Diamond') {
	// 				findGame('diamond');
	// 			}
	// 			if (filter === 'Pearl') {
	// 				findGame('pearl');
	// 			}
	// 			if (filter === 'Platinum') {
	// 				findGame('platinum');
	// 			}
	// 			if (filter === 'Heart Gold') {
	// 				findGame('heartgold');
	// 			}
	// 			if (filter === 'Soul Silver') {
	// 				findGame('soulsilver');
	// 			}
	// 			if (filter === 'Black') {
	// 				findGame('black');
	// 			}
	// 			if (filter === 'White') {
	// 				findGame('white');
	// 			}
	// 			if (filter === 'Black 2') {
	// 				findGame('black2');
	// 			}
	// 			if (filter === 'White 2') {
	// 				findGame('white2');
	// 			}
	// 			if (filter === 'X') {
	// 				findGame('x');
	// 			}
	// 			if (filter === 'Y') {
	// 				findGame('y');
	// 			}
	// 			if (filter === 'Omega Ruby') {
	// 				findGame('omegaruby');
	// 			}
	// 			if (filter === 'Alpha Sapphire') {
	// 				findGame('alphasapphire');
	// 			}
	// 			if (filter === 'Sun') {
	// 				findGame('sun');
	// 			}
	// 			if (filter === 'Moon') {
	// 				findGame('moon');
	// 			}
	// 			if (filter === 'Ultra Sun') {
	// 				findGame('ultrasun');
	// 			}
	// 			if (filter === 'Ultra Moon') {
	// 				findGame('ultramoon');
	// 			}
	// 			if (filter === "Let's Go, Pikachu!") {
	// 				findGame('lgpikachu');
	// 			}
	// 			if (filter === "Let's Go, Eevee!") {
	// 				findGame('lgeevee');
	// 			}
	// 			if (filter === 'Sword') {
	// 				findGame('sword');
	// 			}
	// 			if (filter === 'Shield') {
	// 				findGame('shield');
	// 			}
	// 			if (filter === 'Brilliant Diamond') {
	// 				findGame('brilliantdiamond');
	// 			}
	// 			if (filter === 'Shining Pearl') {
	// 				findGame('shiningpearl');
	// 			}
	// 			if (filter === 'Legends: Arceus') {
	// 				findGame('legendsarceus');
	// 			}

	// 			context.commit('gameFilter', sorted);
	// 			context.commit('combineFilters');
	// 		}
	// 	} catch (error) {
	// 		console.log(error.message);
	// 	}
	// },

	// async rerunSort(context) {
	// 	const sort = context.getters.preserveSort;
	// 	context.dispatch('collectionFilters', { option: sort.option, filter: sort.filter });
	// },
};
