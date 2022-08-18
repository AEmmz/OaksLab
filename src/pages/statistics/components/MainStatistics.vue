<template>
	<h1 class="main-statistics__card-header">Standard Pokedex</h1>
	<h3 class="main-statistics__card-subheader">Any Pokemon Form Counts Towards Totals</h3>
	<div class="main-statistics">
		<progress-circle
			class="progress-bar progress-button"
			:count="normalCount"
			:total="normalTotal"
			name="Normal"
			iconType="Pokeball"
		></progress-circle>
		<progress-circle
			class="progress-bar progress-button"
			:count="shinyCount"
			:total="shinyTotal"
			name="Shiny"
			iconType="Shine"
		></progress-circle>
		<progress-circle
			class="progress-bar progress-button"
			:count="alphaCount"
			:total="alphaTotal"
			name="Alpha"
			iconType="Alpha"
		></progress-circle>
	</div>

	<h1 class="main-statistics__card-header">Type Stats</h1>
	<h3 class="main-statistics__card-subheader">
		Any Pokemon Form Counts Towards All Related Types
	</h3>

	<div class="main-statistics">
		<type-circle
			class="progress-bar"
			:count="bugCount"
			:total="bugTotal"
			name="Bug"
			iconType="Bug"
			color="#84C400"
		></type-circle>
		<type-circle
			class="progress-bar"
			:count="darkCount"
			:total="darkTotal"
			name="Dark"
			iconType="Dark"
			color="#5B5366"
		></type-circle>
		<type-circle
			class="progress-bar"
			:count="dragonCount"
			:total="dragonTotal"
			name="Dragon"
			iconType="Dragon"
			color="#0070CA"
		></type-circle>
		<type-circle
			class="progress-bar"
			:count="electricCount"
			:total="electricTotal"
			name="Electric"
			iconType="Electric"
			color="#FBD200"
		></type-circle>
		<type-circle
			class="progress-bar"
			:count="fairyCount"
			:total="fairyTotal"
			name="Fairy"
			iconType="Fairy"
			color="#FCAEF1"
		></type-circle>
		<type-circle
			class="progress-bar"
			:count="fightingCount"
			:total="fightingTotal"
			name="Fighting"
			iconType="Fighting"
			color="#E12C6A"
		></type-circle>
		<type-circle
			class="progress-bar"
			:count="fireCount"
			:total="fireTotal"
			name="Fire"
			iconType="Fire"
			color="#FF983F"
		></type-circle>
		<type-circle
			class="progress-bar"
			:count="flyingCount"
			:total="flyingTotal"
			name="Flying"
			iconType="Flying"
			color="#8AACE4"
		></type-circle>
		<type-circle
			class="progress-bar"
			:count="grassCount"
			:total="grassTotal"
			name="Grass"
			iconType="Grass"
			color="#35C04A"
		></type-circle>
		<type-circle
			class="progress-bar"
			:count="ghostCount"
			:total="ghostTotal"
			name="Ghost"
			iconType="Ghost"
			color="#4B6AB3"
		></type-circle>
		<type-circle
			class="progress-bar"
			:count="groundCount"
			:total="groundTotal"
			name="Ground"
			iconType="Ground"
			color="#E97333"
		></type-circle>
		<type-circle
			class="progress-bar"
			:count="iceCount"
			:total="iceTotal"
			name="Ice"
			iconType="Ice"
			color="#4BD2C1"
		></type-circle>
		<type-circle
			class="progress-bar"
			:count="normalTypeCount"
			:total="normalTypeTotal"
			name="Normal"
			iconType="Normal"
			color="#929BA3"
		></type-circle>
		<type-circle
			class="progress-bar"
			:count="poisonCount"
			:total="poisonTotal"
			name="Poison"
			iconType="Poison"
			color="#B667CF"
		></type-circle>
		<type-circle
			class="progress-bar"
			:count="psychicCount"
			:total="psychicTotal"
			name="Psychic"
			iconType="Psychic"
			color="#FF6676"
		></type-circle>
		<type-circle
			class="progress-bar"
			:count="rockCount"
			:total="rockTotal"
			name="Rock"
			iconType="Rock"
			color="#C9B787"
		></type-circle>
		<type-circle
			class="progress-bar"
			:count="steelCount"
			:total="steelTotal"
			name="Steel"
			iconType="Steel"
			color="#5A8FA3"
		></type-circle>
		<type-circle
			class="progress-bar"
			:count="waterCount"
			:total="waterTotal"
			name="Water"
			iconType="Water"
			color="#3393DD"
		></type-circle>
	</div>
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
