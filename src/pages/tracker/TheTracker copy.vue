<template>
	<div>
		<Suspense>
			<template #default>
				<div class="tracker-container">
					<div class="left-cont">
						<div class="sticky-group">
							<tracker-search-bar class="mobile"></tracker-search-bar>
							<base-card-v2 class="left-top-cont">
								<pokemon-images></pokemon-images>
								<caught-buttons></caught-buttons>
							</base-card-v2>
							<type-bar class="desktop"></type-bar>
						</div>
					</div>
					<div class="right-cont">
						<base-card class="right-top-cont">
							<tracker-search-bar class="desktop"></tracker-search-bar>
							<tracker-counter></tracker-counter>
							<type-bar class="mobile"></type-bar>
							<transition name="right-top-cont-group">
								<tracker-forms v-show="isForms"></tracker-forms>
							</transition>
						</base-card>

						<div class="right-bottom-cont">
							<details-area></details-area>
							<details-area></details-area>
							<details-area></details-area>
						</div>
					</div>
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
import { mapGetters, mapMutations } from 'vuex';
const PokemonImages = defineAsyncComponent(() => import('./components/PokemonImages.vue'));
const CaughtButtons = defineAsyncComponent(() => import('./components/CaughtButtons.vue'));
const TypeBar = defineAsyncComponent(() => import('./components/TypeBar.vue'));
const TrackerSearchBar = defineAsyncComponent(() => import('./components/TrackerSearchBar.vue'));
const TrackerCounter = defineAsyncComponent(() => import('./components/TrackerCounter.vue'));
const TrackerForms = defineAsyncComponent(() => import('./components/TrackerForms.vue'));
const DetailsArea = defineAsyncComponent(() => import('./components/DetailsArea.vue'));

export default {
	components: {
		CaughtButtons,
		DetailsArea,
		PokemonImages,
		TrackerCounter,
		TrackerSearchBar,
		TypeBar,
		TrackerForms,
	},
	computed: {
		...mapGetters('tracker/forms', ['forms']),
		isForms() {
			if (this.forms.length > 1) {
				return true;
			} else {
				return false;
			}
		},
	},
	methods: {
		...mapMutations('tracler', ['resetTracker', 'resetTracker', 'resetForms', 'resetTracker']),
		defaultTracker() {
			this.resetTracker();
			this.resetTracker();
			this.resetForms();
			this.resetTracker();
		},
	},
	unmounted() {
		this.defaultTracker();
	},
};
</script>

<style scoped>
/* POKEMON CONTAINER */

.tracker-container {
	display: flex;
	flex-wrap: wrap;
	gap: 1.5rem;
	justify-content: center;
	position: relative;
}

.left-cont {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	min-width: 700px;
	max-width: 800px;
}

.left-top-cont {
	display: flex;
	flex-direction: column;
}

.sticky-group {
	display: flex;
	flex-direction: column;
	position: sticky;
	top: 10rem;
	gap: 1.5rem;
}
/* PICTURE CONTAINER */
.right-cont {
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	min-width: 600px;
	max-width: 800px;
}

.right-top-cont {
	display: flex;
	flex-direction: column;
}
.right-bottom-cont {
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
}

.right-top-cont-group-enter-active,
.right-top-cont-group-leave-active {
	transition: all 0.8s ease-in-out;
}
.right-top-cont-group-move {
	transition: all 0.8s ease-in-out;
}
.right-top-cont-group-enter-from {
	opacity: 0;
	transform: translateX(-99rem) translateY(-40rem);
}
.right-top-cont-group-leave-to {
	opacity: 0;
	transform: translateX(70rem) translateY(10rem);
}
.right-top-cont-group-leave-active {
	position: absolute;
}

.search-cont.mobile {
	display: none;
}

@media (max-width: 77rem) {
}

@media (max-width: 48rem) {
	.left-cont {
		min-width: 300px;
		max-width: 375px;
		width: 95%;
	}
	.right-cont {
		min-width: 300px;
		max-width: 375px;
		width: 95%;
	}
	.card.right-top-cont {
		padding: 0;
		box-shadow: none;
		background-color: transparent;
	}

	.search-cont.mobile {
		display: flex;
	}
	.type-cont.mobile {
		display: grid;
	}
	.search-cont.desktop,
	.type-cont.desktop {
		display: none;
	}
}
</style>
