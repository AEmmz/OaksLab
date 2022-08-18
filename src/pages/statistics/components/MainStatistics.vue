<template>
	<div></div>
</template>

<script>
import ProgressCircle from '../components/ProgressCircle.vue';
import TypeCircle from '../components/TypeCircle.vue';
import { mapGetters } from 'vuex';

export default {
	components: { ProgressCircle, TypeCircle },
	data() {
		return {
			//Dex
			normalTotal: 905,
			shinyTotal: 878,
			alphaTotal: 225,
			shinyAlphaTotal: 225,
			megaTotal: 46,
			shinyMegaTotal: 46,
			gigantamaxTotal: 32,
			shinyGigantamaxTotal: 32,
			pokerusTotal: 905,
			shinyPokerusTotal: 878,
			favoriteTotal: 905,

			bugTotal: 85,
			darkTotal: 69,
			dragonTotal: 61,
			electricTotal: 61,
			fairyTotal: 60,
			fightingTotal: 70,
			fireTotal: 75,
			flyingTotal: 106,
			grassTotal: 110,
			ghostTotal: 60,
			groundTotal: 70,
			iceTotal: 51,
			normalTypeTotal: 119,
			poisonTotal: 74,
			psychicTotal: 98,
			rockTotal: 69,
			steelTotal: 66,
			waterTotal: 145,
		};
	},
	computed: {
		...mapGetters('statistics', {
			//Counts / Total Pokemon
			// Does not include species / forms
			normalCount: 'normalCount',
			shinyCount: 'shinyCount',
			alphaCount: 'alphaCount',
			shinyAlphaCount: 'shinyAlphaCount',
			megaCount: 'megaCount',
			shinyMegaCount: 'shinyMegaCount',
			gigantamaxCount: 'gigantamaxCount',
			shinyGigantamaxCount: 'shinyGigantamaxCount',
			pokerusCount: 'pokerusCount',
			shinyPokerusCount: 'shinyPokerusCount',
			favoriteCount: 'favoriteCount',

			// Count / Total Pokemon of Type
			// Does not include species / forms
			bugCount: 'bugCount',
			darkCount: 'darkCount',
			dragonCount: 'dragonCount',
			electricCount: 'electricCount',
			fairyCount: 'fairyCount',
			fightingCount: 'fightingCount',
			fireCount: 'fireCount',
			flyingCount: 'flyingCount',
			grassCount: 'grassCount',
			ghostCount: 'ghostCount',
			groundCount: 'groundCount',
			iceCount: 'iceCount',
			normalTypeCount: 'normalTypeCount',
			poisonCount: 'poisonCount',
			psychicCount: 'psychicCount',
			steelCount: 'steelCount',
			rockCount: 'rockCount',
			waterCount: 'waterCount',
		}),
	},

	methods: {
		async iconImage(hunt) {
			const module = await import(/* @vite-ignore */ `../../../assets/icons/${hunt}Icon.png`);
			return module.default.replace(/^\/@fs/, '');
		},
	},
};
</script>

<style scoped>
.main-statistics__card-header {
	color: var(--bg-offwhite2);
	font-size: 4rem;
	text-decoration-line: underline;
	text-underline-offset: 5px;
}
.main-statistics__card-subheader {
	color: var(--bg-offwhite2);
	margin-bottom: 2rem;
}

.main-statistics {
	display: flex;
	flex-wrap: wrap;
	gap: 5rem;
	width: 100%;
	justify-content: space-around;
	margin-bottom: 8rem;
}

.progress-bar {
	transition: all 0.2s ease-in-out;
}

.progress-bar:hover {
	transform: scale(1.2);
	filter: saturate(1.2);
}

.progress-button {
	cursor: pointer;
}

@media (max-width: 77rem) {
}

@media (max-width: 48rem) {
	.additional-stats-cont {
		width: 50%;
	}
	.additional-stats-title {
		font-size: 2rem;
	}
	.additional-stats-details__name,
	.additional-stats-details__number {
		font-size: 1.6rem;
	}
	.main-statistics {
		gap: 0.5rem;
		width: 100%;
		justify-content: space-around;
		margin-bottom: 8rem;
	}
}
</style>
