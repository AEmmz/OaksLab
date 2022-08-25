<template>
  <div class="full-width flex justify-center q-gutter-x-md">
    <q-select
      class="filter"
      dark
      outlined
      label="Sort"
      v-model="sortQuery"
      :options="sortFilter"
      transition-show="jump-up"
      transition-hide="jump-up"
      @update:model-value="sendSearch"
    ></q-select>
    <q-select
      class="filter"
      dark
      outlined
      label="Caught"
      v-model="caughtQuery"
      :options="caughtFilter"
      transition-show="jump-up"
      transition-hide="jump-up"
      @update:model-value="sendSearch"
    ></q-select>
    <q-select
      class="filter"
      dark
      outlined
      label="Need"
      v-model="needQuery"
      :options="needFilter"
      transition-show="jump-up"
      transition-hide="jump-up"
      @update:model-value="sendSearch"
    ></q-select>
    <q-select
      class="filter"
      dark
      outlined
      size="xl"
      label="Generation"
      v-model="generationQuery"
      :options="generationFilter"
      transition-show="jump-up"
      transition-hide="jump-up"
      @update:model-value="sendSearch"
    ></q-select>
    <q-select
      class="filter type"
      dark
      outlined
      multiple
      max-values="2"
      use-chips
      label="Type"
      v-model="typeQuery"
      :options="typeFilter"
      transition-show="jump-up"
      transition-hide="jump-up"
      @update:model-value="sendSearch"
    ></q-select>
    <q-select
      class="filter"
      dark
      outlined
      label="Game"
      v-model="gameQuery"
      :options="gameFilter"
      transition-show="jump-up"
      transition-hide="jump-up"
      @update:model-value="sendSearch"
    ></q-select>
  </div>
</template>

<script>
export default {
	props: { getSearch: { type: Function } },
	data() {
		return {
			sortQuery: 'Dex: Asc',
			caughtQuery: 'My Caught',
			needQuery: 'None',
			generationQuery: 'All',
			typeQuery: ['All'],
			gameQuery: 'All',

			sortFilter: ['Dex: Asc', 'Dex: Desc', 'Name: A-Z', 'Name: Z-A'],
			// prettier-ignore
			caughtFilter: ['Show All','My Caught','Normal','Shiny','Alpha','Shiny Alpha', 'Pokerus', 'Shiny Pokerus', 'Marked', 'Shiny Marked', '0 IV', 'Shiny 0 IV', '6 IV', 'Shiny 6 IV','Complete'],
			// prettier-ignore
			needFilter: ['None', 'All', 'Normal','Shiny','Alpha','Shiny Alpha', 'Pokerus', 'Shiny Pokerus', 'Marked', 'Shiny Marked', '0 IV', 'Shiny 0 IV', '6 IV', 'Shiny 6 IV'],
			// prettier-ignore
			generationFilter: ['All','Gen 1','Gen 2','Gen 3','Gen 4','Gen 5','Gen 6','Gen 7','Gen 8'],
			// prettier-ignore
			typeFilter: ['All','Bug','Dark','Dragon','Electric','Fairy','Fighting','Fire','Flying','Grass','Ghost','Ground','Ice','Normal','Poison','Psychic','Steel','Rock','Water'],
			// prettier-ignore
			gameFilter: ['All','Red','Green','Blue','Yellow','Gold','Silver','Crystal','Ruby','Sapphire','Fire Red','Leaf Green','Emerald','Colosseum','XD','Diamond','Pearl','Platinum','Heart Gold','Soul Silver','Black','White','Black 2','White 2','X','Y','Omega Ruby','Alpha Sapphire','Sun','Moon','Ultra Sun','Ultra Moon',"Let's Go, Pikachu!","Let's Go, Eevee!",'Sword','Shield','Brilliant Diamond','Shining Pearl','Legends: Arceus'],
		};
	},
	methods: {
		sendSearch() {
			this.getSearch({
				sortQuery: this.sortQuery,
				caughtQuery: this.caughtQuery,
				needQuery: this.needQuery,
				generationQuery: this.generationQuery,
				typeQuery: this.typeQuery,
				gameQuery: this.gameQuery,
			});
		},
	},
};
</script>

<style scoped>
.filter {
  width: 10%;
}

.filter >>> .q-field__control {
  min-height: 70px;
}
.type {
  width: 15%;
}
</style>
