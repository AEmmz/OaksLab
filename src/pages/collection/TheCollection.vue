<template>
	<div class="flex row justify-center q-ma-md">
		<q-card class="collection-cont bg-dark flex column items-center q-pa-md">
			<h2 class="text-light q-ma-lg">Your Collection</h2>
			<div class="full-width">
				<collection-filters :getSearch="getSearch"></collection-filters>
			</div>
			<q-table
				grid
				:columns="columns"
				:rows="rows"
				:filter="filter"
				:filter-method="filterData"
				:rows-per-page-options="perPageOptions"
				card-container-class="flex justify-center q-gutter-sm"
				class="q-pt-md"
			>
				<template v-slot:item="props">
					<collection-card :pokemon="props.row"></collection-card>
				</template>
			</q-table>
			<!-- <div class="flex items-center justify-center full-width">
				<q-pagination
					class="q-ma-md"
					v-model="currentPage"
					:max="maxPages"
					:max-pages="7"
					boundary-links
					boundary-numbers
					direction-links
					size="30px"
					rounded
					text-color="white"
					color="white"
					active-color="primary"
				/>
				<q-separator vertical dark inset></q-separator>
				<q-select class="per-page q-ma-md" dark outlined v-model="perPage" :options="perPageOptions" label="Per Page"></q-select>
			</div> -->
		</q-card>
	</div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import PokemonList from '../../assets/json/pokemonList.json';

const CollectionFilters = defineAsyncComponent(() => import('./components/CollectionFilters.vue'));
const CollectionCard = defineAsyncComponent(() => import('./components/CollectionCard.vue'));
const CollectionSearch = defineAsyncComponent(() => import('./components/CollectionSearch.vue'));

const CollectionPagination = defineAsyncComponent(() => import('./components/CollectionPagination.vue'));

export default {
	components: {
		CollectionCard,
		CollectionFilters,
	},

	async mounted() {
		await this.fetchStartingView();
		this.filteredList.forEach((pokemon) => {
			this.rows.push({
				name: pokemon[1].name,
				apiNo: pokemon[0],
				dexNo: pokemon[1].dexNo,
				type: [pokemon[1].type1, pokemon[1].type2],
				caught: [pokemon[1].catch],
				need: [pokemon[1].catch],
			});
		});
	},
	unmounted() {
		window.removeEventListener('scroll', this.handleScroll);
	},
	data() {
		return {
			perPage: 20,
			perPageOptions: [20, 50, 100, 200],
			currentPage: 1,
			pagination: false,

			sortQuery: 'Dex: Asc',
			caughtQuery: 'My Caught',
			needQuery: 'None',
			generationQuery: 'All',
			typeQuery: ['All'],
			gameQuery: 'All',

			rows: [],
			columns: [
				{ name: 'name', label: 'Name', field: 'name', sortable: true, sortOrder: 'ad' },
				{ name: 'dexNo', label: 'Pokedex Number', field: 'dexNo', sortable: true },
				{ name: 'type', label: 'Type', field: 'type' },
				{ name: 'caught', label: 'Caught', field: 'caught' },
				{ name: 'need', label: 'Need', field: 'need' },
			],
			filter: {
				sortQuery: 'Dex: Asc',
				caughtQuery: 'My Caught',
				needQuery: 'None',
				typeQuery: ['All'],
				generationQuery: 'All',
				gameQuery: 'All',
			},
		};
	},

	computed: {
		...mapGetters('collection', ['filteredList', 'paginatedList']),
		...mapGetters('collection/cards', ['endList']),
		loadedList() {
			let list = this.filteredList;
			let end = this.perPage * this.currentPage;
			if (!list) {
				return [];
			}
			if (!list.length > this.perPage) {
				return list;
			}
			return list.slice(end - this.perPage, end);
		},

		maxPages() {
			if (!this.filteredList) {
				return 1;
			}
			return Math.ceil(this.filteredList.length / this.perPage);
		},
	},

	methods: {
		...mapActions('collection', ['paginate', 'applySearch', 'applyFilters', 'collectionFilters']),
		...mapActions('collection/cards', ['fetchFullList', 'updateLoadedList']),

		async fetchStartingView() {
			const fetch = await this.fetchFullList();
		},

		getSearch(input) {
			this.filter.sortQuery = input.sortQuery;
			this.filter.caughtQuery = input.caughtQuery;
			this.filter.needQuery = input.needQuery;
			this.filter.generationQuery = input.generationQuery;
			this.filter.typeQuery = input.typeQuery;
			this.filter.gameQuery = input.gameQuery;
		},
		setPerPage(input) {
			this.perPage = input;
		},

		filterData(rows, terms, cols, getCellValue) {
			console.log(rows);
			console.log(terms);
			for (const term in terms) {
				if (term === 'sortQuery') {
					const q = this.filter.sortQuery;
					if (q === 'Dex: Asc') rows.sort((a, b) => a.dexNo - b.dexNo);
					if (q === 'Dex: Desc') rows.sort((a, b) => b.dexNo - a.dexNo);
					if (q === 'Name: A-Z') rows.sort((a, b) => a.name.localeCompare(b.name));
					if (q === 'Name: Z-A') rows.sort((a, b) => b.name.localeCompare(a.name));
				}
				if (term === 'caughtQuery') {
					const q = this.filter.caughtQuery;
					if (q === 'Show All') rows;
					if (q === 'My Caught') rows;
					if (q === 'Normal') rows = rows.filter((a) => a.caught[0].normalCaught);
					if (q === 'Shiny') rows = rows.filter((a) => a.caught[0].shinyCaught);
					if (q === 'Alpha') rows = rows.filter((a) => a.caught[0].alphaCaught);
					if (q === 'Shiny Alpha') rows = rows.filter((a) => a.caught[0].shinyAlphaCaught);
					if (q === 'Pokerus') rows = rows.filter((a) => a.caught[0].pokerusCaught);
					if (q === 'Shiny Pokerus') rows = rows.filter((a) => a.caught[0].shinyPokerusCaught);
					if (q === 'Marked') rows = rows.filter((a) => a.caught[0].markedCaught);
					if (q === 'Shiny Marked') rows = rows.filter((a) => a.caught[0].shinyMarkedCaught);
					if (q === '0 IV') rows = rows.filter((a) => a.caught[0].zeroIvCaught);
					if (q === 'Shiny 0 IV') rows = rows.filter((a) => a.caught[0].shinyZeroIvCaught);
					if (q === '6 IV') rows = rows.filter((a) => a.caught[0].sixIvCaught);
					if (q === 'Shiny 6 IV') rows = rows.filter((a) => a.caught[0].shinySixIvCaught);
				}
				if (term === 'needQuery') {
					const q = this.filter.needQuery;
					if (q === 'None') rows;
					if (q === 'Normal') rows = rows.filter((a) => !a.caught[0].normalCaught);
					if (q === 'Shiny') rows = rows.filter((a) => !a.caught[0].shinyCaught);
					if (q === 'Alpha') rows = rows.filter((a) => !a.caught[0].alphaCaught);
					if (q === 'Shiny Alpha') rows = rows.filter((a) => !a.caught[0].shinyAlphaCaught);
					if (q === 'Pokerus') rows = rows.filter((a) => !a.caught[0].pokerusCaught);
					if (q === 'Shiny Pokerus') rows = rows.filter((a) => !a.caught[0].shinyPokerusCaught);
					if (q === 'Marked') rows = rows.filter((a) => !a.caught[0].markedCaught);
					if (q === 'Shiny Marked') rows = rows.filter((a) => !a.caught[0].shinyMarkedCaught);
					if (q === '0 IV') rows = rows.filter((a) => !a.caught[0].zeroIvCaught);
					if (q === 'Shiny 0 IV') rows = rows.filter((a) => !a.caught[0].shinyZeroIvCaught);
					if (q === '6 IV') rows = rows.filter((a) => !a.caught[0].sixIvCaught);
					if (q === 'Shiny 6 IV') rows = rows.filter((a) => !a.caught[0].shinySixIvCaught);
				}
				if (term === 'typeQuery') {
					const q = this.filter.typeQuery;
					if (q.includes('All')) rows;
					if (q.includes('Bug')) rows = rows.filter((a) => a.type.includes('bug'));
					if (q.includes('Dark')) rows = rows.filter((a) => a.type.includes('dark'));
					if (q.includes('Dragon')) rows = rows.filter((a) => a.type.includes('dragon'));
					if (q.includes('Electric')) rows = rows.filter((a) => a.type.includes('electric'));
					if (q.includes('Fairy')) rows = rows.filter((a) => a.type.includes('fairy'));
					if (q.includes('Fighting')) rows = rows.filter((a) => a.type.includes('fighting'));
					if (q.includes('Fire')) rows = rows.filter((a) => a.type.includes('fire'));
					if (q.includes('Flying')) rows = rows.filter((a) => a.type.includes('flying'));
					if (q.includes('Grass')) rows = rows.filter((a) => a.type.includes('grass'));
					if (q.includes('Ghost')) rows = rows.filter((a) => a.type.includes('ghost'));
					if (q.includes('Ground')) rows = rows.filter((a) => a.type.includes('ground'));
					if (q.includes('Ice')) rows = rows.filter((a) => a.type.includes('ice'));
					if (q.includes('Normal')) rows = rows.filter((a) => a.type.includes('normal'));
					if (q.includes('Poison')) rows = rows.filter((a) => a.type.includes('poison'));
					if (q.includes('Psychic')) rows = rows.filter((a) => a.type.includes('psychic'));
					if (q.includes('Steel')) rows = rows.filter((a) => a.type.includes('steel'));
					if (q.includes('Rock')) rows = rows.filter((a) => a.type.includes('rock'));
					if (q.includes('Water')) rows = rows.filter((a) => a.type.includes('water'));
				}
			}
			return rows;
		},
	},
};
</script>

<style scoped>
.collection-cont {
	width: 80%;
	min-height: 50rem;
	border-radius: 0.7rem;
}

.per-page {
	width: 10%;
}
</style>
