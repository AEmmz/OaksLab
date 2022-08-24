<template>
	<div class="collection-cont">
		<Suspense>
			<template #default>
				<div class="collection">
					<!-- <div class="collection-top" :class="{ active: mobileCollectionFilter }">
						<base-card class="collection-filter">
							<collection-filter></collection-filter>
						</base-card>
					</div> -->
					<transition>
						<v-card
							class="collection-card-container"
							width="90%"
							elevation="5"
							color="secondary"
						>
							<v-card class="collection-inner" width="100%" flat color="primary">
								<div class="collection-header">
									<h1 color="secondary">Your Collection</h1>
								</div>
								<div class="divider"></div>
								<div class="collection-filters">
									<collection-search
										class="search-filter"
										:getSearch="getSearch"
									></collection-search>
									<v-switch
										@change="setFilters"
										label="My Caught"
										v-model="filters"
										color="blue"
										value="myCaught"
										ripple
									></v-switch>
								</div>

								<h2>{{ search }}</h2>
								<div class="collection-card-container-inner">
									<collection-card
										:pkName="pokemon[1].name"
										:pkId="+pokemon[0]"
										:normalCaught="pokemon[1].catch?.normalCaught"
										:alphaCaught="pokemon[1].catch?.alphaCaught"
										:shinyCaught="pokemon[1].catch?.shinyCaught"
										:shinyAlphaCaught="pokemon[1].catch?.shinyAlphaCaught"
										:markedCaught="pokemon[1].catch?.markedCaught"
										:shinyMarkedCaught="pokemon[1].catch?.shinyMarkedCaught"
										:pokerusCaught="pokemon[1].catch?.pokerusCaught"
										:shinyPokerusCaught="pokemon[1].catch?.shinyPokerusCaught"
										:zeroIvCaught="pokemon[1].catch?.zeroIvCaught"
										:shinyZeroIvCaught="pokemon[1].catch?.shinyZeroIvCaught"
										:sixIvCaught="pokemon[1].catch?.sixIvCaught"
										:shinySixIvCaught="pokemon[1].catch?.shinySixIvCaught"
										:favoriteCaught="pokemon[1].catch?.favoriteCaught"
										:type1="pokemon[1].type1"
										:type2="pokemon[1].type2 || null"
										:endList="this.endList"
										v-for="(pokemon, index) in loadedList"
										:key="index"
									></collection-card>
								</div>
								<!-- <end-card :endList="endList" v-if="endList"></end-card> -->
								<collection-pagination
									:setPerPage="setPerPage"
								></collection-pagination>
							</v-card>
						</v-card>
					</transition>
				</div>
			</template>
			<template #fallback>
				<loading-screen></loading-screen>
			</template>
		</Suspense>
	</div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import PokemonList from '../../assets/json/pokemonList.json';
import { mapGetters, mapActions } from 'vuex';

const CollectionCard = defineAsyncComponent(() => import('./components/CollectionCard.vue'));
const CollectionSearch = defineAsyncComponent(() => import('./components/CollectionSearch.vue'));

const CollectionPagination = defineAsyncComponent(() =>
	import('./components/CollectionPagination.vue')
);

export default {
	components: {
		CollectionCard,
		CollectionSearch,
		CollectionPagination,
	},

	async mounted() {
		await this.fetchStartingView();
	},
	unmounted() {
		window.removeEventListener('scroll', this.handleScroll);
	},
	data() {
		return {
			listReady: false,
			search: '',
			filters: ['myCaught', 'dexNo'],
			sortOrder: 'asc',
			perPage: null,
		};
	},

	computed: {
		...mapGetters('collection', ['filteredList', 'paginatedList']),
		...mapGetters('collection/cards', ['endList']),
		loadedList() {
			let list = this.filteredList;
			if (list && this.search.length >= 3) {
				const query = this.search.toLowerCase().trim();
				list = list.filter((p) => {
					const name = p[1].name.toLowerCase();
					return name.includes(query);
				});
			}
			return list;
		},
	},

	methods: {
		...mapActions('collection', [
			'paginate',
			'applySearch',
			'applyFilters',
			'collectionFilters',
		]),
		...mapActions('collection/cards', ['fetchFullList', 'updateLoadedList']),
		async setFilters() {
			this.applyFilters({
				filter: this.filters,
				sortOrder: this.sortOrder,
			});
		},

		async fetchStartingView() {
			const fetch = await this.fetchFullList();
			// const defaultSort = await this.collectionFilters({
			// 	option: 'Sort Order:',
			// 	filter: 'Dex: Asc',
			// });
			// const defaultSort2 = await this.collectionFilters({
			// 	option: 'Caught:',
			// 	filter: 'My Caught',
			// });
			// window.addEventListener('scroll', this.handleScroll);
		},
		// handleScroll() {
		// 	if (
		// 		window.scrollY + window.innerHeight > document.body.scrollHeight - 50 &&
		// 		this.loadedList.length > 0
		// 	) {
		// 		this.updateLoadedList());
		// 	}
		// },
		getSearch(input) {
			this.search = input;
		},

		setPerPage(input) {
			this.perPage = input;
		},
	},
};
</script>

<style scoped>
.loading {
	font-size: 24rem;
}

.collection-filters {
	display: flex;
	justify-content: center;
	gap: 2rem;
}
.search-filter {
	width: 20rem;
}
.collection-cont {
	display: flex;
	position: relative;
	justify-content: center;
	overflow: hidden;
}

.collection {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1.2rem;
	width: 90%;
}

.collection-header {
	display: flex;
	font-size: 2rem;
	justify-content: center;
	text-align: center;
	margin: 0.7rem;
}

.collection-top {
	display: flex;
	gap: 2rem;
	width: 70%;
}

.collection-card-container {
	display: flex;
	justify-content: center;
	border-radius: 0.7rem;
	padding: 1rem;
	margin: 2rem;
}
.collection-card-container-inner {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 1rem;
	border-radius: 0.7rem;
	margin: 0.7rem;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
	transform: translateX(20px);
}

.v-enter-active {
	transition: all 0.8s ease-out;
}
.v-leave-active {
	transition: all 0.2s ease-in;
}

.v-enter-to,
.v-leave-from {
	opacity: 1;
	transform: translateX(0);
}

.collection-inner {
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;
}

.divider {
	height: 0.1rem;
	width: 80%;
	background: white;
	margin-bottom: 0.7rem;
}

@media (max-width: 77rem) {
}

@media (max-width: 48rem) {
	.collection-header {
		text-align: center;
	}

	.collection {
		width: 100%;
	}

	.card.collection__card {
		background: none;
		box-shadow: none;
		padding: 0;
		width: 100%;
	}

	.collection__card-inner {
		width: 100%;
	}
	.card.collection__card-inner {
		border-radius: 0;
	}

	.collection-top {
		display: flex;
		position: fixed;
		top: 0;
		/* right: 0; */
		background: var(--bg-grey);
		right: -80%;
		padding: 3rem 0;
		gap: 2rem;
		width: 28rem;
		height: 100%;
		z-index: 11;
		box-shadow: -1.5rem 0 1.1rem -1.1rem #0000002b;
		border-left: 0.4rem solid var(--bg-offwhite2);
		transition: 0.3s all ease-in-out;
	}

	.collection-top.active {
		right: 0;
	}

	.collection-filter {
		width: 100%;
	}
	.card.collection-filter {
		background: none;
		border-radius: 0;
		box-shadow: none;
		padding: 0;
	}
}

.v-card >>> .v-card__underlay {
	display: none;
}
</style>
