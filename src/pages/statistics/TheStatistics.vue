<template>
	<div class="statistics-cont">
		<Suspense>
			<template #default>
				<div class="statistics">
					<div class="statistics-header">
						<h1 class="statistics-header__text">Your Statistics</h1>
					</div>
					<transition>
						<base-card class="statistics__card">
							<base-card-inner
								class="statistics__card-inner col-1"
								:class="{ active: statisticsFilter }"
							>
								<game-select></game-select
							></base-card-inner>
							<base-card-inner class="statistics__card-inner col-2">
								<main-statistics></main-statistics
							></base-card-inner>
							<base-card-inner class="statistics__card-inner col-3">
								<additional-stats></additional-stats
							></base-card-inner>
						</base-card>
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
import { mapActions, mapGetters } from 'vuex';
import { defineAsyncComponent } from 'vue';
const MainStatistics = defineAsyncComponent(() => import('./components/MainStatistics.vue'));
const AdditionalStats = defineAsyncComponent(() => import('./components/AdditionalStats.vue'));
const GameSelect = defineAsyncComponent(() => import('./components/GameSelect.vue'));

export default {
	mounted() {
		this.fetchNormalStats();
		// this.quickPatch();
	},
	components: { AdditionalStats, MainStatistics, GameSelect },
	computed: {
		...mapGetters('navigation', ['statisticsFilter']),
	},
	methods: {
		...mapActions('statistics', ['quickPatch', 'fetchStats']),
		async fetchNormalStats() {
			await this.fetchStats('normal');
		},
	},
};
</script>

<style scoped>
.statistics-cont {
	display: flex;
	position: relative;
	width: 100%;
}
.statistics {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1.2rem;
	width: 100%;
}

.statistics-header {
	display: flex;
	width: 80%;
	justify-content: center;
}

.statistics-header__text {
	font-size: 6rem;
	color: var(--bg-grey);
}

.statistics__card {
	display: flex;
	width: 90%;
}

.statistics__card-inner {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 3rem 3rem;
	overflow: hidden;
}

.col-2 {
	width: 60%;
}
.col-1,
.col-3 {
	padding-top: 4rem;
	width: 20%;
	justify-content: start;
	gap: 5rem;
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
	.card.statistics__card {
		background: none;
		box-shadow: none;
		border-radius: 0;
		padding: 0;
	}

	.statistics__card {
		flex-direction: column;
		width: 100%;
	}

	.col-1 {
		position: fixed;
		top: 0;
		right: -80%;
		width: 28rem;
		z-index: 11;
		transition: 0.3s all ease-in-out;
	}
	.col-1.active {
		right: 0;
	}

	.col-2,
	.col-3 {
		width: 100%;
		border-radius: 0;
	}

	.col-2 {
		order: 2;
		padding: 3rem 1rem;
	}
	.col-3 {
		flex-direction: row;
		gap: 1.5rem;
		padding: 2rem 1.5rem;
		order: 1;
	}

	.statistics-header__text {
		text-align: center;
	}
}
</style>
