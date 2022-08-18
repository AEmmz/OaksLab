<template>
	<div class="collection-cont">
		<Suspense>
			<template #default>
				<div class="collection">
					<!-- <div class="collection-top" :class="{ active: collectionFilter }">
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
								<collection-search></collection-search>
								<div class="collection-card-container-inner">
									<collection-card
										:pkName="pkName(pokemon)"
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
										:type1="typePrimary(pokemon)"
										:type2="typeSecondary(pokemon)"
										:endList="this.endList"
										v-for="pokemon in loadedList"
										:key="pokemon"
									></collection-card>
								</div>
								<!-- <end-card :endList="endList" v-if="endList"></end-card> -->
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
import FitText from '../../components/ui/FitText/FitText.vue';
import PokemonList from '../../assets/json/pokemonList.json';
import { mapActions, mapGetters } from 'vuex';

const CollectionCard = defineAsyncComponent(() => import('./components/CollectionCard.vue'));
const EndCard = defineAsyncComponent(() => import('./components/EndCard.vue'));
const CollectionSearch = defineAsyncComponent(() => import('./components/CollectionSearch.vue'));
const CollectionFilter = defineAsyncComponent(() => import('./components/CollectionFilters.vue'));
const CollectionToggles = defineAsyncComponent(() => import('./components/CollectionToggles.vue'));

export default {
	components: {
		FitText,
		CollectionCard,
		EndCard,
		CollectionFilter,
		CollectionToggles,
		CollectionSearch,
	},

	mounted() {
		this.fetchPk();
	},
	unmounted() {
		window.removeEventListener('scroll', this.handleScroll);
	},
	data() {
		return {
			listReady: false,
			dummyData: [{ name: 'pizza' }, { name: 'rolls' }, { name: 'friends' }],
			search: '',
		};
	},

	computed: {
		...mapGetters('collection/cards', ['loadedList', 'endList']),
		...mapGetters('collection', ['filtered']),
		...mapGetters('navigation', ['collectionFilter']),
	},
	watch: {
		...mapActions('collection/cards', ['resetLiveList']),
		liveList(newVal, oldVal) {
			if (oldVal && newVal !== oldVal) {
				setTimeout(async () => {
					await this.resetLiveList(newVal);
					this.listReady = true;
				}, 250);
			}
		},
	},

	methods: {
		...mapActions('collection/cards', ['fetchFullList', 'updateLoadedList']),
		...mapActions('collection', ['collectionFilters']),
		async fetchPk() {
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
		pkName(pokemon) {
			return pokemon[1].name;
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
		typePrimary(pokemon) {
			return pokemon[1].type1;
		},
		typeSecondary(pokemon) {
			return pokemon[1].type2 || null;
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

.collection-filter {
	width: 100%;
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
