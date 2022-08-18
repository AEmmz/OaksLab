<template>
	<q-card class="flex justify-evenly q-py-md">
		<q-select
			class="selection"
			outlined
			label="Find A Pokemon"
			v-model="pokemon"
			:options="pokemonList"
			:option-label="(pkmn) => menuLabel(pkmn)"
			@update:model-value="searchPokemon()"
			options-dark
			:options-selected-class="`bg-${pkType1}Type text-light text-h6`"
			use-input
			clearable
			input-debounce="0"
			@filter="pokemonFilter"
			popup-content-class="text-h6"
		>
		</q-select>

		<q-select
			class="selection"
			outlined
			label="Choose A Hunt"
			v-model="hunt"
			:options="huntList"
			@update:model-value="searchHunt()"
			options-dark
			:options-selected-class="`bg-${pkType1}Type text-light`"
		></q-select>
	</q-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import pokeJSON from '../../../assets/json/pokemonList.json';

export default {
	mounted() {
		let pokemonName = this.$route.params.pkName;
		//Unown ? Safeguard
		if (pokemonName) {
			if (pokemonName === 'unown-question') pokemonName = 'unown-?';
			let nameSplit = pokemonName
				.split('-')
				.map((e) => e[0].toUpperCase() + e.substring(1))
				.join(' ');
			let dexNum;
			let apiNum;
			let types;
			pokeJSON.pokemon.forEach((pkmn) => {
				if (pkmn.name.toLowerCase() == nameSplit.toLowerCase()) {
					dexNum = pkmn.dexNo;
					apiNum = pkmn.apiNo;
					types = pkmn.types;
				}
			});
			if (!dexNum) {
				const redirect = '/' + (this.$route.query.redirect || 'notFound');
				this.$router.replace(redirect);
			}
			this.pokemon = {
				name: nameSplit,
				dexNo: dexNum,
				apiNo: apiNum,
				types: types,
			};
			this.searchPokemon();
		}
	},
	destroy() {
		this.restoreDefault();
	},

	data() {
		return {
			pokemon: '',
			pokemonList: this.fetchPokemonList(),
			hunt: 'Normal',
			huntList: [
				'Normal',
				'Shiny',
				'Alpha',
				'Shiny Alpha',
				'Marked',
				'Shiny Marked',
				'Pokerus',
				'Shiny Pokerus',
				'0 IV',
				'Shiny 0 IV',
				'6 IV',
				'Shiny 6 IV',
			],
		};
	},
	computed: {
		...mapGetters('tracker', ['pkType1']),
	},
	methods: {
		...mapActions('tracker', ['changeActivePokemon']),
		...mapActions('tracker/counter', ['changeCount']),
		...mapActions('tracker/forms', ['fetchForms']),

		fetchPokemonList() {
			const data = [...pokeJSON.pokemon];
			const formFilter = data.filter((p) => {
				return +p.apiNo < 8000 || +p.apiNo === 10136;
			});
			return formFilter;
		},

		searchHunt() {
			const hunt = this.hunt.toLowerCase();
			this.changeCount(hunt);
		},

		listName(pkmn) {
			if (pkmn.listName) return pkmn.listName;
			return pkmn.name;
		},

		restoreDefault() {
			this.pokemonSearch = null;
		},

		menuLabel(pokemon) {
			let displayName;
			displayName =
				pokemon && pokemon.dexNo && pokemon.name
					? `${pokemon.dexNo}. ${pokemon.name}`
					: null;
			return displayName;
		},

		pokemonFilter(val, update) {
			if (val === '') {
				update(() => {
					this.pokemonList = this.fetchPokemonList();
				});
				return;
			}
			update(() => {
				const userInput = val.toLowerCase();
				const fullList = this.fetchPokemonList();
				this.pokemonList = fullList.filter(
					(pkmn) =>
						pkmn.name.toLowerCase().indexOf(userInput) > -1 ||
						pkmn.dexNo.indexOf(userInput) > -1
				);
			});
		},

		async searchPokemon() {
			const pkmn = this.pokemon;
			const pokemonName = pkmn.name.toLowerCase();
			let redirect = '/tracker/' + pokemonName.replaceAll(' ', '-');

			//Unown Safeguard
			if (redirect === '/tracker/unown-?') {
				redirect = '/tracker/unown-question';
			}

			this.$router.replace(redirect);
			const inputPokemon = {
				api: pkmn.apiNo,
				dex: pkmn.dexNo,
				name: pkmn.name,
				types: pkmn.types,
			};

			const changePkmn = await this.changeActivePokemon(inputPokemon);
			const data = this.hunt.toLowerCase();
			this.changeCount(data);
			this.fetchForms();
		},
	},
};
</script>

<style scoped>
.selection {
	width: 45%;
	font-size: 1.1rem;
}
</style>
