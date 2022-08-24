<template>
	<div>
		<v-text-field
			label="Search"
			v-model.trim="search"
			prepend-inner-icon="fas fa-search"
			clearable
			@input="searchPokemon()"
			@click:clear="getSearch('')"
			:rules="[rules.minimum]"
		></v-text-field>
	</div>
</template>

<script>
export default {
	props: { getSearch: Function },
	data() {
		return {
			search: '',
			rules: { minimum: (value) => value === '' || value.length >= 3 || 'Min 3 Characters' },
		};
	},
	computed: {
		minumumInput() {
			return this.search.length >= 3;
		},
	},
	methods: {
		searchPokemon() {
			if (this.search === '') {
				this.getSearch('');
			} else {
				this.getSearch(this.search);
			}
		},
	},
};
</script>
