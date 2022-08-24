<template>
	<v-card
		class="pokemon-card-container"
		width="12rem"
		height="20rem"
		:color="type1"
		elevation="4"
		@mouseover="expand = true"
		@mouseleave="expand = false"
		:class="{ disabled: deactivated }"
	>
		<div v-if="!type2">
			<v-icon class="background-icon-single" :icon="`$${type1}Icon`" x-large />
		</div>
		<div v-if="type2">
			<v-icon class="background-icon-double-1" :icon="`$${type1}Icon`" x-large />
			<v-icon class="background-icon-double-2" :icon="`$${type2}Icon`" x-large />
		</div>

		<div class="pokemon-card__bg-name">
			<fit-text>{{ pkName }}</fit-text>
		</div>
		<img
			class="pokemon-card__image"
			:src="selectedImage"
			:alt="pkName + '-image'"
			:class="[{ 'disabled-image': deactivated }, pkClasses]"
		/>

		<v-expand-x-transition>
			<div v-if="expand">
				<v-card
					class="card-back"
					width="12rem"
					height="20rem"
					:color="type2 || type1"
					elevation="1"
				>
					<div class="card-back-name">
						<p>{{ pkName }}</p>
					</div>
					<v-divider thickness="2px" width="70%" class="divider"></v-divider>
					<div class="card-back-badges">
						<div class="card-back-badges-cont">
							<h2>Caught</h2>
							<div class="badge-icons">
								<v-chip prepend-icon="$PokeballIcon" v-if="normalCaught"
									>Normal</v-chip
								>
								<v-chip prepend-icon="$ShinyIcon" v-if="shinyCaught">Shiny</v-chip>
								<v-chip prepend-icon="$AlphaIcon" v-if="alphaCaught">Alpha</v-chip>
								<v-chip prepend-icon="$ShinyAlphaIcon" v-if="shinyAlphaCaught"
									>Shiny Alpha</v-chip
								>
								<v-chip prepend-icon="$MarkedIcon" v-if="markedCaught"
									>Marked</v-chip
								>
								<v-chip prepend-icon="$ShinyMarkedIcon" v-if="shinyMarkedCaught"
									>Shiny Marked</v-chip
								>
								<v-chip prepend-icon="$PokerusIcon" v-if="pokerusCaught"
									>Pokerus</v-chip
								>
								<v-chip prepend-icon="$ShinyPokerusIcon" v-if="shinyPokerusCaught"
									>Shiny Pokerus</v-chip
								>
								<v-chip prepend-icon="$ZeroIcon" v-if="zeroIvCaught"
									>Zero IV</v-chip
								>
								<v-chip prepend-icon="$ShinyZeroIcon" v-if="shinyZeroIvCaught"
									>Shiny Zero IV</v-chip
								>
								<v-chip prepend-icon="$SixIcon" v-if="sixIvCaught">Six IV</v-chip>
								<v-chip prepend-icon="$ShinySixIcon" v-if="shinySixIvCaught"
									>Shiny Six IV</v-chip
								>
								<v-chip prepend-icon="$HeartIcon" v-if="favoriteCaught"
									>Favorite</v-chip
								>
							</div>
						</div>
					</div>
				</v-card>
			</div>
		</v-expand-x-transition>
	</v-card>
</template>

<script>
import FitText from '../../../components/ui/FitText/FitText.vue';

export default {
	components: { FitText },
	props: {
		pkName: { type: String },
		pkId: { type: Number },
		normalCaught: { type: Boolean, default: false },
		shinyCaught: { type: Boolean, default: false },
		alphaCaught: { type: Boolean, default: false },
		shinyAlphaCaught: { type: Boolean, default: false },
		markedCaught: { type: Boolean, default: false },
		shinyMarkedCaught: { type: Boolean, default: false },
		pokerusCaught: { type: Boolean, default: false },
		shinyPokerusCaught: { type: Boolean, default: false },
		zeroIvCaught: { type: Boolean, default: false },
		shinyZeroIvCaught: { type: Boolean, default: false },
		sixIvCaught: { type: Boolean, default: false },
		shinySixIvCaught: { type: Boolean, default: false },
		favoriteCaught: { type: Boolean, default: false },
		type1: { type: String },
		type2: { type: String },
	},
	data() {
		return {
			active: false,
			monImage: null,
			expand: false,
		};
	},
	computed: {
		selectedImage() {
			return `https://ik.imagekit.io/kw2qoeib2/Home-Normal/${this.pkId}.png`;
		},

		deactivated() {
			return (
				!this.normalCaught && !this.alphaCaught && !this.shinyCaught && !this.favoriteCaught
			);
		},

		pkClasses() {
			return this.pkName
				.toLowerCase()
				.replaceAll(' ', '-')
				.replaceAll('.', '')
				.replaceAll("'", '')
				.replaceAll(':', '')
				.replaceAll('?', 'ques')
				.replaceAll('!', 'excl');
		},
	},
};
</script>

<style scoped>
@import url(../../../css/card-styles-min.css);
@import url(../../../css/card-styles-min-mobile.css) (max-width: 48rem);

.disabled {
	filter: grayscale(1) brightness(0.7);
}

.disabled-image {
	filter: brightness(0.1);
}
.pokemon-card__bg-name {
	display: block;
	align-items: center;
	position: absolute;
	text-align: left;
	top: 0rem;
	left: -0.5rem;
	width: 18rem;
	transform: rotate(-90deg) translate(-107%, 0);
	transform-origin: 0 0;
	opacity: 50%;
}

.card-back-name {
	display: flex;
	align-items: center;
	margin: 1rem;
	text-align: center;
}
.card-back-name p {
	font-size: 1.2rem;
}

.pokemon-card__image {
	position: absolute;
	width: 250px;
	bottom: -1rem;
	left: 0;
}

.card-back {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: top;
	opacity: 100%;
	border-right: 0.2rem solid white;
	overflow: hidden;
}

.card-back-badges-cont {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding-top: 1rem;
}

.card-back-badges-cont h2 {
	padding-bottom: 0.2rem;
	font-size: 1.2rem;
}

.badge-icons {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

.badge-icons .v-chip {
	/* padding: 0.5rem; */
	margin: 0.2rem;
}

.divider {
	background-color: white;
}

.background-icon-single {
	position: absolute;
	width: 100%;
	height: 100%;
	opacity: 10%;
	z-index: -10;
}
.background-icon-single {
	position: absolute;
	width: 100%;
	height: 100%;
	opacity: 7.5%;
	z-index: -10;
}
.background-icon-double-1 {
	position: absolute;
	width: 100%;
	height: 100%;
	opacity: 7.5%;
	z-index: -10;
	top: -5rem;
	left: -2rem;
}
.background-icon-double-2 {
	position: absolute;
	width: 100%;
	height: 100%;
	opacity: 7.5%;
	z-index: -10;
	bottom: -5rem;
	right: -2rem;
}
</style>
