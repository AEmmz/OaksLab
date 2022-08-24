<template>
	<div>
		<div class="page-container flex row justify-center q-ma-md q-gutter-x-lg">
			<div class="left q-gutter-y-md">
				<q-card class="bg-light images-cont">
					<pokemon-images></pokemon-images>
				</q-card>
				<q-card class="bg-light toggle-cont">
					<caught-buttons></caught-buttons>
				</q-card>
				<q-card class="bg-dark type-cont">
					<type-bar></type-bar>
				</q-card>
			</div>

			<q-separator vertical inset />

			<div class="right q-gutter-y-md">
				<q-card class="bg-dark search-cont">
					<tracker-search-bar></tracker-search-bar>
				</q-card>
				<q-card class="bg-dark counter-cont">
					<counter-card></counter-card>
					<!-- <transition name="right-top-cont-group">
								<tracker-forms v-show="isForms"></tracker-forms>
							</transition> -->
				</q-card>
				<q-card class="bg-dark form-cont">
					<tracker-forms></tracker-forms>
				</q-card>
			</div>
		</div>
	</div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
const PokemonImages = defineAsyncComponent(() => import('./components/PokemonImages.vue'));
const CaughtButtons = defineAsyncComponent(() => import('./components/CaughtButtons.vue'));
const TypeBar = defineAsyncComponent(() => import('./components/TypeBar.vue'));
const TrackerSearchBar = defineAsyncComponent(() => import('./components/TrackerSearchBar.vue'));
const CounterCard = defineAsyncComponent(() => import('./components/CounterCard.vue'));
const TrackerForms = defineAsyncComponent(() => import('./components/TrackerForms.vue'));
const DetailsArea = defineAsyncComponent(() => import('./components/DetailsArea.vue'));

export default {
	components: {
		CaughtButtons,
		// DetailsArea,
		PokemonImages,
		CounterCard,
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
		...mapMutations('tracker', ['resetTracker']),
		...mapMutations('tracker/forms', ['resetForms']),
	},
	unmounted() {
		this.resetTracker();
		this.resetForms();
	},
};
</script>

<style scoped>
/* POKEMON CONTAINER */
.left {
	width: 47rem;
	overflow: none;
}

.right {
	width: 53rem;
	overflow: none;
}

.images-cont,
.toggle-cont,
.type-cont,
.search-cont,
.counter-cont,
.form-cont {
	border-radius: 0.7rem;
}

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
