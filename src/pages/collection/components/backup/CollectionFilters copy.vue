<template>
	<base-card-inner class="search-cont">
		<h1>Filters</h1>
		<div class="filters">
			<collection-single-filter
				:filter="sortOrder"
				filterName="Sort Order:"
			></collection-single-filter>
			<collection-single-filter
				:filter="caughtType"
				filterName="Caught:"
			></collection-single-filter>
			<collection-single-filter
				:filter="needType"
				filterName="Need:"
			></collection-single-filter>
			<collection-single-filter
				:filter="generation"
				filterName="Generation:"
			></collection-single-filter>
			<collection-single-filter :filter="types" filterName="Type:"></collection-single-filter>
			<collection-single-filter :filter="games" filterName="Game:"></collection-single-filter>
		</div>
	</base-card-inner>
</template>

<script>
import CollectionSingleFilter from './CollectionSingleFilter.vue';

export default {
	components: { CollectionSingleFilter },
	data() {
		return {
			sortOrder: ['Dex: Asc', 'Dex: Desc', 'Name: A-Z', 'Name: Z-A'],
			caughtType: [
				//Displays All Pokemon
				'Show All',
				//Displays All Caught Pokemon - Default
				'My Caught',
				'Normal',
				'Shiny',
				'Alpha',
				'Favorite',
				'Complete',
			],
			needType: [
				//Displays All Pokemon -  - Default
				'No Filter',
				//Displays All Needed Pokemon
				'Any',
				'All',
				'Normal',
				'Shiny',
				'Alpha',
				'Favorite',
			],
			generation: [
				'All',
				'Gen 1',
				'Gen 2',
				'Gen 3',
				'Gen 4',
				'Gen 5',
				'Gen 6',
				'Gen 7',
				'Gen 8',
			],
			types: [
				'All',
				'Bug',
				'Dark',
				'Dragon',
				'Electric',
				'Fairy',
				'Fighting',
				'Fire',
				'Flying',
				'Grass',
				'Ghost',
				'Ground',
				'Ice',
				'Normal',
				'Poison',
				'Psychic',
				'Steel',
				'Rock',
				'Water',
			],
			games: [
				'All',
				'Red',
				'Green',
				'Blue',
				'Yellow',
				'Gold',
				'Silver',
				'Crystal',
				'Ruby',
				'Sapphire',
				'Fire Red',
				'Leaf Green',
				'Emerald',
				'Colosseum',
				'XD',
				'Diamond',
				'Pearl',
				'Platinum',
				'Heart Gold',
				'Soul Silver',
				'Black',
				'White',
				'Black 2',
				'White 2',
				'X',
				'Y',
				'Omega Ruby',
				'Alpha Sapphire',
				'Sun',
				'Moon',
				'Ultra Sun',
				'Ultra Moon',
				"Let's Go, Pikachu!",
				"Let's Go, Eevee!",
				'Sword',
				'Shield',
				'Brilliant Diamond',
				'Shining Pearl',
				'Legends: Arceus',
			],
		};
	},
};
</script>

<style scoped>
.search-cont {
	display: flex;
	flex-direction: column;
	align-items: center;
	color: var(--bg-offwhite2);
}

.filters {
	display: flex;
	position: relative;
	align-items: center;
	justify-content: space-around;
	text-align: center;
	width: 100%;
}

@media (max-width: 77rem) {
}

@media (max-width: 48rem) {
	.search-cont {
		width: 100%;
		height: 100%;
	}

	.filters {
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}
}
</style>
