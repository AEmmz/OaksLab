<template>
	<q-dialog v-model="details">
		<more-info
			:pokemonInfo="pokemonInfo"
			:pokemonId="pokemonId"
			:selectedImage="selectedImage"
			:pkClasses="pkClasses"
			:close="close"
		></more-info>
	</q-dialog>

	<div class="card-cont" @mouseenter="flipToBack" @mouseleave="flipToFront">
		<q-card
			class="card card-front"
			:class="[`bg-${pokemonInfo.type1}Type`, { flipped: flipped }]"
		>
			<div
				class="background-type-icon flex justify-center items-center full-height absolute-center"
			>
				<q-icon
					:name="`icon-type-2-${pokemonInfo.type1}`"
					color="white"
					class="type-icon"
					size="250px"
				></q-icon>
			</div>
			<div class="card-front-number absolute-top-right q-pr-sm">
				<h6>{{ pokemonInfo.dexNo }}</h6>
			</div>
			<div class="card-front-name">
				<fit-text class="name">
					{{ pokemonInfo.name }}
				</fit-text>
			</div>
			<div class="flex items-end full-height">
				<q-img
					class="card-image"
					:src="selectedImage"
					:alt="`${pokemonInfo.name}-Image`"
					:class="[{ 'disabled-image': deactivated }, pkClasses]"
					style="min-width: 250px"
				></q-img>
			</div>
		</q-card>

		<q-card
			class="card card-back absolute-top-left"
			:class="[`bg-${pokemonInfo.type1}Type`, { flipped: !flipped }]"
		>
			<div class="card-back-info-cont column items-center q-px-xs absolute-center bg-light">
				<div class="card-back-name col flex items-center justify-center">
					<fit-text-alt class="name">
						{{ pokemonInfo.name }}
					</fit-text-alt>
				</div>
				<div class="card-back-info col-8 full-width column">
					<q-separator inset />
					<div class="q-ma-xs col column items-center justify-center">
						<span class="card-back-subtitle text-subtitle2 q-pb-xs">Caught</span>
						<div class="icons flex justify-center q-gutter-xs">
							<q-icon
								v-if="pokemonInfo.catch.normalCaught"
								size="xs"
								name="icon-poke-pokeball"
							/>
							<q-icon
								v-if="pokemonInfo.catch.shinyCaught"
								size="xs"
								name="icon-poke-shiny"
							/>
							<q-icon
								v-if="pokemonInfo.catch.alphaCaught"
								size="xs"
								name="icon-poke-alpha"
							/>
							<q-icon
								v-if="pokemonInfo.catch.shinyAlphaCaught"
								size="xs"
								name="icon-poke-alpha-shiny"
							/>
							<q-icon
								v-if="pokemonInfo.catch.pokerusCaught"
								size="xs"
								name="icon-poke-pokerus"
							/>
							<q-icon
								v-if="pokemonInfo.catch.shinyPokerusCaught"
								size="xs"
								name="icon-poke-pokerus-shiny"
							/>
							<q-icon
								v-if="pokemonInfo.catch.markedCaught"
								size="xs"
								name="icon-poke-marked"
							/>
							<q-icon
								v-if="pokemonInfo.catch.shinyMarkedCaught"
								size="xs"
								name="icon-poke-marked-shiny"
							/>
							<q-icon
								v-if="pokemonInfo.catch.sixIvCaught"
								size="xs"
								name="icon-poke-six"
							/>
							<q-icon
								v-if="pokemonInfo.catch.shinySixIvCaught"
								size="xs"
								name="icon-poke-six-shiny"
							/>
							<q-icon
								v-if="pokemonInfo.catch.zeroIvCaught"
								size="xs"
								name="icon-poke-zero"
							/>
							<q-icon
								v-if="pokemonInfo.catch.shinyZeroIvCaught"
								size="xs"
								name="icon-poke-zero-shiny"
							/>
						</div>
					</div>
					<q-separator inset />
					<div class="q-ma-xs col column items-center justify-center q-pb-xs">
						<span class="card-back-subtitle text-subtitle2">Uncaught</span>
						<div class="icons flex justify-center q-gutter-xs">
							<q-icon
								v-if="!pokemonInfo.catch.normalCaught"
								size="xs"
								name="icon-poke-pokeball"
							/>
							<q-icon
								v-if="!pokemonInfo.catch.shinyCaught"
								size="xs"
								name="icon-poke-shiny"
							/>
							<q-icon
								v-if="!pokemonInfo.catch.alphaCaught"
								size="xs"
								name="icon-poke-alpha"
							/>
							<q-icon
								v-if="!pokemonInfo.catch.shinyAlphaCaught"
								size="xs"
								name="icon-poke-alpha-shiny"
							/>
							<q-icon
								v-if="!pokemonInfo.catch.pokerusCaught"
								size="xs"
								name="icon-poke-pokerus"
							/>
							<q-icon
								v-if="!pokemonInfo.catch.shinyPokerusCaught"
								size="xs"
								name="icon-poke-pokerus-shiny"
							/>
							<q-icon
								v-if="!pokemonInfo.catch.markedCaught"
								size="xs"
								name="icon-poke-marked"
							/>
							<q-icon
								v-if="!pokemonInfo.catch.shinyMarkedCaught"
								size="xs"
								name="icon-poke-marked-shiny"
							/>
							<q-icon
								v-if="!pokemonInfo.catch.sixIvCaught"
								size="xs"
								name="icon-poke-six"
							/>
							<q-icon
								v-if="!pokemonInfo.catch.shinySixIvCaught"
								size="xs"
								name="icon-poke-six-shiny"
							/>
							<q-icon
								v-if="!pokemonInfo.catch.zeroIvCaught"
								size="xs"
								name="icon-poke-zero"
							/>
							<q-icon
								v-if="!pokemonInfo.catch.shinyZeroIvCaught"
								size="xs"
								name="icon-poke-zero-shiny"
							/>
						</div>
					</div>
					<q-separator inset />
				</div>

				<div class="card-back-buttons column items-center justify-center col-2 full-width">
					<router-link
						:to="{
							name: 'tracking',
							params: { pkName: pokemonInfo.name.toLowerCase() },
						}"
						class="track-button-cont"
					>
						<q-btn round class="q-ma-xs" size="sm" color="primary" icon="fas fa-paw">
							<q-tooltip class="text-body1">Track</q-tooltip>
						</q-btn>
					</router-link>
					<q-btn
						round
						class="q-ma-xs"
						size="sm"
						color="primary"
						icon="fas fa-info"
						@click="details = true"
					>
						<q-tooltip class="text-body1">More Info</q-tooltip>
					</q-btn>
					<q-btn round class="q-ma-xs" size="sm" color="primary" icon="fas fa-pen">
						<q-tooltip class="text-body1">Quick Edit</q-tooltip>
					</q-btn>
				</div>
			</div>
		</q-card>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import FitText from '../../../components/ui/FitText/FitText.vue';
import FitTextAlt from '../../../components/ui/FitText/FitText-Alt.vue';
import MoreInfo from './CollectionMoreInfo.vue';

export default {
	components: { FitText, FitTextAlt, MoreInfo },
	props: {
		pokemon: { type: Object },
	},
	data() {
		return {
			flipped: false,
			details: false,
			edit: false,
		};
	},
	computed: {
		...mapGetters('tracker', ['pkType1']),
		pokemonInfo() {
			console.log(this.pokemon[1]);
			return this.pokemon[1];
		},
		pokemonId() {
			return this.pokemon[0];
		},
		selectedImage() {
			return `https://ik.imagekit.io/kw2qoeib2/Home-Normal/${this.pokemon[0]}.png`;
		},
		deactivated() {
			return (
				!this.pokemonInfo.normalCaught &&
				!this.pokemonInfo.alphaCaught &&
				!this.pokemonInfo.shinyCaught &&
				!this.pokemonInfo.favoriteCaught
			);
		},

		pkClasses() {
			return this.pokemonInfo.name
				.toLowerCase()
				.replaceAll(' ', '-')
				.replaceAll('.', '')
				.replaceAll("'", '')
				.replaceAll(':', '')
				.replaceAll('?', 'ques')
				.replaceAll('!', 'excl');
		},
	},
	methods: {
		flipToFront() {
			setTimeout(() => {
				this.flipped = false;
			}, 450);
		},
		flipToBack() {
			setTimeout(() => {
				this.flipped = true;
			}, 200);
		},
		close() {
			this.details = false;
		},
	},
};
</script>

<style scoped>
@import url(../../../css/card-styles.css);

.card-cont {
	position: relative;
}

.card {
	height: 20rem;
	width: 12rem;
	border-radius: 0.5rem;
	overflow: hidden;
	transition: all 400ms ease-in-out;
}

.card {
	backface-visibility: hidden;
}

.flipped {
	transform: rotatey(180deg);
}

.type-icon {
	opacity: 0.15;
}

.card-front-name {
	display: block;
	position: absolute;
	text-align: left;
	top: 3rem;
	left: -0.5rem;
	height: 8rem;
	width: 15rem;
	transform: rotate(-90deg) translate(-107%, 0);
	transform-origin: 0 0;
	opacity: 50%;
}
.card-back-name {
	text-align: center;
	height: 5rem;
	width: 10rem;
	opacity: 70%;
}

.card-back-info-cont {
	height: 19.5rem;
	width: 11.5rem;
}

/* .card-back-buttons {
	width: 11.5rem;
} */

.card-front-number {
	opacity: 50%;
}

.card-back-subtitle,
.icons {
	opacity: 70%;
}
</style>
