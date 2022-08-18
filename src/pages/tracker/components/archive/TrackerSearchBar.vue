<template>
	<base-card-inner class="search-cont">
		<transition-group name="search-cont__transition">
			<li class="search-element__cont" key="pkmn">
				<label class="search-element__label" for="pkmn-name">Pokemon:</label>
				<section class="search-element__form">
					<div class="search-element__input-wrapper">
						<input
							type="text"
							:value="pkmnQuery"
							@input="(e) => (pkmnQuery = e.target.value)"
							placeholder="Select Pokemon"
							class="search-element__input"
							@focus="(pkIsVisible = true), (pkmnQuery = '')"
							@blur="pkIsVisible = false"
						/>
						<div
							class="search-element__icon"
							:class="{ 'search-element__icon-active': pkIsVisible }"
							@click="(pkIsVisible = !pkIsVisible), (pkmnQuery = '')"
						></div>
					</div>
					<div
						class="search-element__dropdown"
						:class="pkIsVisible ? 'list-visible' : 'list-hidden'"
					>
						<div class="search-element__dropdown-options">
							<ul>
								<li
									class="search-element__drowpdown-option"
									v-for="pkmn in newFilter"
									:key="pkmn"
									@click="searchPokemon(pkmn)"
								>
									<p>{{ pkmn.dexNo }}.</p>
									<p>{{ listName(pkmn) }}</p>
								</li>
								<li v-if="pkmnQuery && !newFilter.length">
									<p>-</p>
									<p>No Results Found!</p>
								</li>
							</ul>
						</div>
					</div>
				</section>
			</li>
			<!-- <li class="search-element__cont" key="type" v-show="pkSelected">
				<label class="search-element__label" for="pkmn-name">Hunt Type:</label>
				<section class="search-element__form">
					<div class="search-element__input-wrapper">
						<input
							type="text"
							:value="huntQuery"
							@input="(e) => (huntQuery = e.target.value)"
							placeholder="Select Hunt"
							class="search-element__input"
							@focus="(huntIsVisible = true), (huntQuery = '')"
							@blur="huntIsVisible = false"
						/>
						<div
							class="search-element__icon"
							:class="{ 'angle-down': huntIsVisible }"
							@click="(huntIsVisible = !huntIsVisible), (huntQuery = '')"
						></div>
					</div>
					<div
						class="search-element__dropdown"
						:class="huntIsVisible ? 'list-visible' : 'list-hidden'"
					>
						<div class="search-element__dropdown-options">
							<ul>
								<li
									class="search-element__drowpdown-option"
									v-for="hunt in huntFilter"
									:key="hunt"
									@click="searchHuntType(hunt)"
								>
									<p>{{ hunt }}</p>
								</li>
								<li v-if="huntQuery && !newFilter.length">
									<p>-</p>
									<p>No Results Found!</p>
								</li>
							</ul>
						</div>
					</div>
				</section>
			</li> -->
		</transition-group>
	</base-card-inner>
</template>

<script>
import { mapActions } from 'vuex';
import pokemon from '../../../assets/json/pokemonList.json';

export default {
	mounted() {
		let pokeName = this.$route.params.pkName;

		//Unown ? Safeguard
		if (pokeName) {
			if (pokeName === 'unown-question') pokeName = 'unown-?';
			let nameSplit = pokeName
				.split('-')
				.map((e) => e[0].toUpperCase() + e.substring(1))
				.join(' ');
			let dexNum;
			let apiNum;
			let types;
			pokemon.pokemon.forEach((pkmn) => {
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
			const name = {
				name: nameSplit,
				dexNo: dexNum,
				apiNo: apiNum,
				types: types,
			};
			this.searchPokemon(name);
		}
	},
	unmounted() {
		this.restoreDefault();
	},
	data() {
		return {
			pokemonData: [...pokemon.pokemon],
			// =====
			pkmnQuery: '',
			pkIsVisible: false,
			pkSelected: false,
			huntQuery: 'Normal',
			huntIsVisible: false,
			huntType: [
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
				'Favorite',
			],
		};
	},
	computed: {
		newFilter() {
			const data = this.pokemonData;
			const formFilter = data.filter((p) => {
				return +p.apiNo < 8000 || +p.apiNo === 10136;
			});
			const numberCheck = /\d/;
			const userQuery = this.pkmnQuery.toLowerCase();
			if (this.pkmnQuery === '') {
				return formFilter;
			}
			if (numberCheck.test(userQuery)) {
				return formFilter.filter((pokemon) => pokemon.dexNo.includes(userQuery));
			}
			return formFilter.filter((pokemon) =>
				pokemon.name.toLowerCase().includes(userQuery.toLowerCase())
			);
		},

		huntFilter() {
			if (this.huntQuery === 'Normal') {
				return this.huntType;
			}
			return this.huntType.filter((hunt) =>
				hunt.toLowerCase().includes(this.huntQuery.toLocaleLowerCase())
			);
		},
	},
	methods: {
		...mapActions('tracker', ['changeActivePokemon']),
		...mapActions('tracker/counter', ['changeCount']),
		...mapActions('tracker/forms', ['fetchForms']),
		async searchPokemon(pkmn) {
			this.pkIsVisible = false;
			this.pkSelected = true;
			this.pkmnQuery = pkmn.name;
			this.huntQuery = 'Normal';
			let redirect = '/tracker/' + pkmn.name.toLowerCase().replaceAll(' ', '-');

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

			const data = this.huntQuery.toLowerCase();
			this.changeCount(data);
			this.fetchForms();
		},

		searchHuntType(hunt) {
			this.huntIsVisible = false;
			this.huntQuery = hunt;
			const data = hunt.toLowerCase();
			this.changeCount(data);
		},

		listName(pkmn) {
			if (pkmn.listName) return pkmn.listName;
			return pkmn.name;
		},

		restoreDefault() {
			this.pokemonSearch = null;
		},
	},
};
</script>

<style scoped>
.search-cont {
	display: flex;
	position: relative;
	align-items: center;
	justify-content: center;
	text-align: center;
}

.search-element__cont {
	position: relative;
	display: grid;
	align-items: center;
	grid-template-rows: repeat(auto-fit, minman(200px, 1fr));
	gap: 0.5rem;
}

.search-element__cont :focus {
	outline: none;
}

.search-element__label {
	color: var(--bg-offwhite);
	font-size: 20px;
}

.search-element__form {
	width: 80%;
	position: relative;
	margin: 0 auto;
}

.search-element__input-wrapper {
	height: 40px;
	color: var(--bg-offwhite);
	border: 2px solid var(--bg-offwhite2);
	border-radius: 0.6rem;
	padding: 5px 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 1.8rem;
	font-weight: 400;
}

.search-element__input {
	width: 85%;
	height: 33px;
	border: none;
	font-size: 2rem;
	padding-left: 8px;
	color: var(--bg-offwhite2);
	background: transparent;
}
.search-element__input::placeholder {
	color: var(--bg-offwhite);
}

/* .search-element__icon {
	mask: url(../../../assets/icons/AngleUpLite.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/AngleUpLite.svg) no-repeat center / contain;
	background: var(--bg-offwhite);
	height: 2rem;
	width: 2rem;
	transform: rotate(0deg);
	transition: all 0.4s ease-in;
	cursor: pointer;
} */
.search-element__icon-active {
	transform: rotate(180deg);
	transition: 400ms all;
}

.search-element__dropdown {
	z-index: 5000;
	position: absolute;
	border: 3px solid var(--bg-offwhite2);
	top: 43px;
	right: 0;
	left: 0;
	background: var(--bg-offwhite2);
	max-width: 100%;
	padding: 0.4rem 0;
	visibility: hidden;
	transition: all 0.4s ease-in;
	max-height: 0px;
	overflow: hidden;
	border-radius: 0.6rem;
}

.search-element__dropdown.list-visible {
	visibility: visible;
	max-height: 400px;
}

.search-element__dropdown-options {
	width: 100%;
}

.search-element__dropdown-options ul {
	list-style: none;
	text-align: left;
	padding-left: 0px;
	max-height: 300px;
	overflow-y: scroll;
	overflow-x: hidden;
}

.search-element__dropdown-options li {
	width: 100%;
	border-bottom: 2px solid var(--bg-offwhite);
	padding: 10px;
	cursor: pointer;
	font-size: 1.6rem;
}

.search-element__dropdown-options li:hover {
	background: var(--bg-grey);
	color: #fff;
	font-weight: bold;
}

.search-element__drowpdown-option {
	display: flex;
	align-items: center;
	gap: 1rem;
}

.search-cont__transition-enter-active,
.search-cont__transition-leave-active {
	transition: all 0.5s ease;
}
.search-cont__transition-move {
	transition: all 1s ease;
}
.search-cont__transition-enter-from,
.search-cont__transition-leave-to {
	opacity: 0;
	transform: translateX(-150rem);
}
.search-cont__transition-leave-active {
	position: absolute;
}

@media (max-width: 77rem) {
}

@media (max-width: 48rem) {
	.search-element__label {
		font-size: 1.7rem;
	}
	.search-input {
		padding: 0.6rem;
		font-size: 1.3rem;
		border: none;
	}
	.search-element__form {
		width: 95%;
	}

	.search-element__dropdown.list-visible {
		max-height: 400px;
	}
	.search-element__dropdown-options ul {
		max-height: 220px;
	}
}
</style>
