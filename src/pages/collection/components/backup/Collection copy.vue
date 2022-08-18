<template>
	<div class="collection-cont">
		<Suspense>
			<template #default>
				<div class="collection">
					<div class="collection-header">
						<div class="collection-header__icon"></div>
						<h1 class="collection-header__text">Your Collection</h1>
						<div class="collection-header__icon"></div>
					</div>
					<!-- <div class="collection-top" :class="{ active: mobileCollectionFilter }">
						<base-card class="collection-filter">
							<collection-filter></collection-filter>
						</base-card>
					</div> -->

					<transition>
						<v-card v-show="loadedList.length > 0 && listReady">> </v-card>
						<!--<base-card
							class="collection__card"
							v-show="loadedList.length > 0 && listReady"
						>
							<base-card-inner class="collection__card-inner">
								<div class="collection__pokemon">
									<collection-card
										:pkName="pkName(pokemon).name"
										:pkId="+pokemon[0]"
										:normalCaught="normalCaught(pokemon)"
										:alphaCaught="alphaCaught(pokemon)"
										:shinyCaught="shinyCaught(pokemon)"
										:shinyAlphaCaught="shinyAlphaCaught(pokemon)"
										:markedCaught="markedCaught(pokemon)"
										:shinyMarkedCaught="shinyMarkedCaught(pokemon)"
										:pokerusCaught="pokerusCaught(pokemon)"
										:shinyPokerusCaught="shinyPokerusCaught(pokemon)"
										:zeroIvCaught="zeroIvCaught(pokemon)"
										:shinyZeroIvCaught="shinyZeroIvCaught(pokemon)"
										:sixIvCaught="sixIvCaught(pokemon)"
										:shinySixIvCaught="shinySixIvCaught(pokemon)"
										:favoriteCaught="favoriteCaught(pokemon)"
										:endList="this.endList"
										v-for="pokemon in loadedList"
										:key="pokemon"
									></collection-card>
									<end-card :endList="endList" v-if="endList"></end-card>
								</div>
							</base-card-inner>
						</base-card>-->
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
import FitText from '../../components/ui/FitText/FitText.vue';
import PokemonList from '../../assets/json/pokemonList.json';
import { mapActions } from 'vuex';

const CollectionCard = defineAsyncComponent(() => import('./components/CollectionCard.vue'));
const EndCard = defineAsyncComponent(() => import('./components/EndCard.vue'));
const CollectionFilter = defineAsyncComponent(() => import('./components/CollectionFilters.vue'));
const CollectionToggles = defineAsyncComponent(() => import('./components/CollectionToggles.vue'));

export default {
	components: { FitText, CollectionCard, EndCard, CollectionFilter, CollectionToggles },

	mounted() {
		this.fetchPk();
	},
	unmounted() {
		window.removeEventListener('scroll', this.handleScroll);
	},
	data() {
		return {
			listReady: false,
		};
	},

	computed: {
		...mapGetters('collection/cards', ['loadedList', 'endList']),
		...mapGetters('collection', ['filtered']),
		...mapGetters('navigation', ['collectionFilter']),
	},

	methods: {
		...mapActions('collection/cards', ['fetchFullList', 'updateLoadedList']),
		...mapActions('collection', ['collectionFilters']),
		async fetchPk() {
			const fetch = await this.fetchFullList();
			const defaultSort = await this.collectionFilters({
				option: 'Sort Order:',
				filter: 'Dex: Asc',
			});
			const defaultSort2 = await this.collectionFilters({
				option: 'Caught:',
				filter: 'My Caught',
			});
			window.addEventListener('scroll', this.handleScroll);
		},

		pkName(pokemon) {
			const pkId = pokemon[0];
			const pkList = PokemonList.pokemon;
			const pkmn = pkList.filter((pk) => {
				return pkId === pk.apiNo;
			});
			return pkmn[0];
		},
		normalCaught(pokemon) {
			return pokemon[1].catch?.normalCaught;
		},
		alphaCaught(pokemon) {
			return pokemon[1].catch?.alphaCaught;
		},
		shinyCaught(pokemon) {
			return pokemon[1].catch?.shinyCaught;
		},
		shinyAlphaCaught(pokemon) {
			return pokemon[1].catch?.shinyAlphaCaught;
		},
		markedCaught(pokemon) {
			return pokemon[1].catch?.markedCaught;
		},
		shinyMarkedCaught(pokemon) {
			return pokemon[1].catch?.shinyMarkedCaught;
		},
		pokerusCaught(pokemon) {
			return pokemon[1].catch?.pokerusCaught;
		},
		shinyPokerusCaught(pokemon) {
			return pokemon[1].catch?.shinyPokerusCaught;
		},
		zeroIvCaught(pokemon) {
			return pokemon[1].catch?.zeroIvCaught;
		},
		shinyZeroIvCaught(pokemon) {
			return pokemon[1].catch?.shinyZeroIvCaught;
		},
		sixIvCaught(pokemon) {
			return pokemon[1].catch?.sixIvCaught;
		},
		shinySixIvCaught(pokemon) {
			return pokemon[1].catch?.shinySixIvCaught;
		},
		favoriteCaught(pokemon) {
			return pokemon[1].catch?.favoriteCaught;
		},
		handleScroll() {
			if (
				window.scrollY + window.innerHeight > document.body.scrollHeight - 50 &&
				this.loadedList.length > 0
			) {
				this.updateLoadedList();
			}
		},
	},
};
</script>

<style scoped>
.loading {
	font-size: 24rem;
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
	width: 80%;
	justify-content: center;
}

.collection-header__icon {
	mask: url(../../assets/icons/PokeballIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../assets/icons/PokeballIcon.svg) no-repeat center / contain;
	background-color: var(--bg-offwhite);
	width: 4rem;
}

.collection-header__text {
	font-size: 6rem;
	color: var(--bg-grey);
}

.collection__card {
	width: 90%;
}

.collection-top {
	display: flex;
	gap: 2rem;
	width: 70%;
}

.collection-filter {
	width: 100%;
}

.collection__card-inner {
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 2rem 1rem;
	overflow: hidden;
}

.collection__pokemon {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	grid-auto-flow: row;
	row-gap: 3rem;
	justify-items: center;
	justify-content: space-around;
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

	.collection-header__text {
		font-size: 4rem;
	}
}
</style>
