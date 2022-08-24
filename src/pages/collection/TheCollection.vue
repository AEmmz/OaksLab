<template>
	<div class="flex row justify-center q-ma-md">
		<q-card class="collection-cont bg-dark flex column items-center q-pa-md">
			<h2 class="text-light q-ma-lg">Your Collection</h2>
			<div class="collection flex justify-center q-gutter-md">
				<collection-card
					v-for="(pokemon, index) in loadedList"
					:key="index"
					:pokemon="pokemon"
				></collection-card>
			</div>
			<div class="flex items-center justify-center full-width">
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
				<q-select
					class="per-page q-ma-md"
					dark
					outlined
					v-model="perPage"
					:options="perPageOptions"
					label="Per Page"
				></q-select>
			</div>
		</q-card>
	</div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import PokemonList from '../../assets/json/pokemonList.json';

const CollectionCard = defineAsyncComponent(() => import('./components/CollectionCard.vue'));
const CollectionSearch = defineAsyncComponent(() => import('./components/CollectionSearch.vue'));

const CollectionPagination = defineAsyncComponent(() =>
	import('./components/CollectionPagination.vue')
);

export default {
	components: {
		CollectionCard,
		// CollectionSearch,
		// CollectionPagination,
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
			perPage: 20,
			perPageOptions: [20, 50, 100, 200],
			currentPage: 1,
			pagination: false,
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
.collection-cont {
	width: 80%;
	min-height: 50rem;
	border-radius: 0.7rem;
}

.per-page {
	width: 10%;
}
</style>
