<template>
	<div class="pokemon-card platinum gradient" @mouseenter="mouseOn" @mouseleave="mouseOff">
		<div class="pokemon-card__container">
			<!-- <div class="pokemon-card__badges">
				<div class="badge-normal base" v-if="normalCaught"></div>
				<div class="badge-shiny base" v-if="shinyCaught"></div>
				<div class="badge-alpha base" v-if="alphaCaught"></div>
				<div class="badge-shiny-alpha" base v-if="shinyAlphaCaught"></div>
				<div class="badge-marked base" v-if="markedCaught"></div>
				<div class="badge-shiny-marked base" v-if="shinyMarkedCaught"></div>
				<div class="badge-pokerus base" v-if="pokerusCaught"></div>
				<div class="badge-shiny-pokerus base" v-if="shinyPokerusCaught"></div>
				<div class="badge-zero-iv base" v-if="zeroIvCaught"></div>
				<div class="badge-shiny-zero-iv base" v-if="shinyZeroIvCaught"></div>
				<div class="badge-six-iv base" v-if="sixIvCaught"></div>
				<div class="badge-shiny-six-iv base" v-if="shinySixIvCaught"></div>
				<div class="badge-favorite base" v-if="favoriteCaught"></div>
			</div> -->

			<div class="pokemon-card__bg-name">
				<fit-text>{{ pkNameShort }}</fit-text>
			</div>
			<img
				class="pokemon-card__image"
				:src="monImage"
				:alt="pkNameFull + '-image'"
				:class="[{ disabled: deactivated }, pkClasses]"
			/>

			<transition mode="out-in">
				<!-- <div class="pokemon-card__info"> -->
				<div class="pokemon-card__info" v-if="this.active">
					<div class="pokemon-card__info-name">
						<fit-text-alt>{{ pkNameFull }}</fit-text-alt>
					</div>
					<div class="pokemon-card__info-badge-cont">
						<h2>Caught</h2>
						<div>
							<div class="badge-normal info-badge" v-if="normalCaught"></div>
							<div class="badge-shiny info-badge" v-if="shinyCaught"></div>
							<div class="badge-alpha info-badge" v-if="alphaCaught"></div>
							<div class="badge-shiny-alpha info-badge" v-if="shinyAlphaCaught"></div>
							<div class="badge-marked info-badge" v-if="markedCaught"></div>
							<div
								class="badge-shiny-marked info-badge"
								v-if="shinyMarkedCaught"
							></div>
							<div class="badge-pokerus info-badge" v-if="pokerusCaught"></div>
							<div
								class="badge-shiny-pokerus info-badge"
								v-if="shinyPokerusCaught"
							></div>
							<div class="badge-zero-iv info-badge" v-if="zeroIvCaught"></div>
							<div
								class="badge-shiny-zero-iv info-badge"
								v-if="shinyZeroIvCaught"
							></div>
							<div class="badge-six-iv info-badge" v-if="sixIvCaught"></div>
							<div
								class="badge-shiny-six-iv info-badge"
								v-if="shinySixIvCaught"
							></div>
							<div class="badge-favorite info-badge" v-if="favoriteCaught"></div>
						</div>
					</div>
					<div class="pokemon-card__info-badge-cont">
						<h2>Still Need</h2>
						<div>
							<div class="badge-normal info-badge" v-if="!normalCaught"></div>
							<div class="badge-shiny info-badge" v-if="!shinyCaught"></div>
							<div class="badge-alpha info-badge" v-if="!alphaCaught"></div>
							<div
								class="badge-shiny-alpha info-badge"
								v-if="!shinyAlphaCaught"
							></div>
							<div class="badge-marked info-badge" v-if="!markedCaught"></div>
							<div
								class="badge-shiny-marked info-badge"
								v-if="!shinyMarkedCaught"
							></div>
							<div class="badge-pokerus info-badge" v-if="!pokerusCaught"></div>
							<div
								class="badge-shiny-pokerus info-badge"
								v-if="!shinyPokerusCaught"
							></div>
							<div class="badge-zero-iv info-badge" v-if="!zeroIvCaught"></div>
							<div
								class="badge-shiny-zero-iv info-badge"
								v-if="!shinyZeroIvCaught"
							></div>
							<div class="badge-six-iv info-badge" v-if="!sixIvCaught"></div>
							<div
								class="badge-shiny-six-iv info-badge"
								v-if="!shinySixIvCaught"
							></div>
							<div class="badge-favorite info-badge" v-if="!favoriteCaught"></div>
						</div>
					</div>
					<router-link
						:to="{ name: 'tracking', params: { pkName: pkName.toLowerCase() } }"
						class="track-button-cont"
					>
						<button class="track-button">Track</button>
					</router-link>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import FitText from '../../../components/ui/FitText/FitText.vue';
import FitTextAlt from '../../../components/ui/FitText/FitText-Alt.vue';
import { mapActions } from 'vuex';

export default {
	mounted() {
		this.pokemonImage(this.pkId);
	},
	components: { FitText, FitTextAlt },
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
	},
	data() {
		return {
			active: false,
			monImage: null,
		};
	},
	computed: {
		deactivated() {
			return (
				!this.normalCaught && !this.alphaCaught && !this.shinyCaught && !this.favoriteCaught
			);
		},

		pkNameFull() {
			const name = this.pkName;
			return name[0].toUpperCase() + name.substring(1);
		},
		pkNameShort() {
			let newName;
			let name = this.pkNameFull;
			return name;
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
	methods: {
		...mapActions('collection/cards', ['pokemonImage']),
		mouseOn() {
			this.active = true;
		},
		mouseOff() {
			this.active = false;
		},
		async pokemonImage(identifier) {
			const res = await this.pokemonImage(identifier);
			this.monImage = res;
		},
	},
};
</script>

<style scoped>
@import url(../../../assets/styles/card-styles-min.css);
@import url(../../../assets/styles/card-styles-min-mobile.css) (max-width: 48rem);
.pokemon-card {
	position: relative;
	/* width: 20rem;
	height: 30rem; */
	/* width: 25rem;
	height: 40rem; */
	width: 20rem;
	height: 35rem;
	background: var(--bg-offwhite2);
	border-radius: 2.4rem;
	overflow: hidden;
	border: 0.5rem solid silver;
	outline: 0.2rem solid var(--bg-grey);
	outline-offset: -0.5rem;
	transition: 500ms all;
}

.pokemon-card:hover,
.pokemon-card:active {
	box-shadow: 0px 0px 25px -3px rgb(0, 102, 255);
}

.pokemon-card__container {
	display: flex;
	justify-content: center;
	height: 100%;
}

.pokemon-card__badges {
	display: flex;
	flex-wrap: wrap;
	row-gap: 1rem;
	position: absolute;
	right: 0;
	top: 0;
	width: 70%;
	justify-content: right;
	padding: 1rem;
}

.pokemon-card__badges * {
	background-color: var(--bg-grey);
	width: 2rem;
	height: 2rem;
}

.pokemon-card__bg-name {
	display: block;
	align-items: center;
	position: absolute;
	text-align: right;
	top: 13rem;
	left: -12.9rem;
	width: 33rem;
	height: 8rem;
	transform: rotate(-90deg);
	opacity: 50%;
}

.pokemon-card__image {
	position: absolute;
	width: 250px;
	bottom: -1rem;
	left: 0;
	/* mix-blend-mode: multiply; */
}

.pokemon-card__info {
	position: relative;
	display: flex;
	width: 20rem;
	height: 35rem;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	padding: 1.5rem 1rem;
	color: white;
	z-index: 5;
	background: var(--bg-grey);
	opacity: 0.96;
}

.pokemon-card__info-name {
	display: flex;
	justify-content: center;
	text-align: center;
	width: 90%;
	font-size: 3rem;
}

.pokemon-card__info-badge-cont {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	/* margin-top: 2rem; */
	padding-top: 2rem;
}

.pokemon-card__info-badge-cont h2 {
	padding-bottom: 1rem;
	font-size: 1.6rem;
}

.info-badge {
	display: inline-block;
	margin: 0 0.2rem;
	background-color: var(--bg-offwhite);
	width: 2.1rem;
	height: 2.1rem;
}

/* .base {
	background: white;
	mix-blend-mode: exclusion;
	z-index: 3;
} */
/* .over {
	display: none;
	background: white;
	opacity: 50%;
	mix-blend-mode: overlay;
	z-index: 3;
} */
.badge-normal {
	mask: url(../../../assets/icons/PokeballIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/PokeballIcon.svg) no-repeat center / contain;
}
.badge-shiny {
	mask: url(../../../assets/icons/ShineIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/ShineIcon.svg) no-repeat center / contain;
}
.badge-alpha {
	mask: url(../../../assets/icons/AlphaIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/AlphaIcon.svg) no-repeat center / contain;
}
.badge-shiny-alpha {
	mask: url(../../../assets/icons/ShinyAlphaIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/ShinyAlphaIcon.svg) no-repeat center / contain;
}

.badge-marked {
	mask: url(../../../assets/icons/MarkedIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/MarkedIcon.svg) no-repeat center / contain;
}
.badge-shiny-marked {
	mask: url(../../../assets/icons/ShinyMarkedIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/ShinyMarkedIcon.svg) no-repeat center / contain;
}
.badge-pokerus {
	mask: url(../../../assets/icons/PokerusIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/PokerusIcon.svg) no-repeat center / contain;
}
.badge-shiny-pokerus {
	mask: url(../../../assets/icons/ShinyPokerusIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/ShinyPokerusIcon.svg) no-repeat center / contain;
}

.badge-zero-iv {
	mask: url(../../../assets/icons/ZeroIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/ZeroIcon.svg) no-repeat center / contain;
}
.badge-shiny-zero-iv {
	mask: url(../../../assets/icons/ShinyZeroIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/ShinyZeroIcon.svg) no-repeat center / contain;
}
.badge-six-iv {
	mask: url(../../../assets/icons/SixIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/SixIcon.svg) no-repeat center / contain;
}
.badge-shiny-six-iv {
	mask: url(../../../assets/icons/ShinySixIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/ShinySixIcon.svg) no-repeat center / contain;
}
.badge-favorite {
	mask: url(../../../assets/icons/HeartIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/HeartIcon.svg) no-repeat center / contain;
}

.track-button-cont {
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 2rem;
	text-decoration: none;
}

.track-button {
	position: relative;
	text-align: center;
	height: 4.5rem;
	width: 13rem;
	border: none;
	border-radius: 2.5rem;
	transition: 800ms all;
	cursor: pointer;
	color: var(--bg-offwhite2);
	background: var(--main-red);
	font-size: 2rem;
}

.track-button:hover {
	filter: saturate(130%);
	transform: scale(1.1);
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
	transform: translateY(350px);
}

.v-enter-active {
	transition: all 0.4s ease-in-out;
}
.v-leave-active {
	transition: all 0.4s ease-in-out;
}

.v-enter-to,
.v-leave-from {
	opacity: 0.98;
	transform: translateY(0);
}

.gradient::after {
	content: '';
	top: 0;
	transform: translateX(100%) rotate(30deg);
	width: 300%;
	height: 300%;
	position: absolute;
	z-index: 1;
	animation: shine 10s infinite ease-in;
	background: linear-gradient(
		to right,
		rgba(255, 255, 255, 0) 0%,
		rgba(255, 255, 255, 0.3) 50%,
		rgba(128, 186, 232, 0) 99%,
		rgba(128, 186, 232, 0) 100%
	);
	animation-delay: 1s;
}

@keyframes shine {
	0% {
		transform: translateX(-100%) translateY(-100%) rotate(30deg);
	}
	10% {
		transform: translateX(-100%) translateY(-100%) rotate(30deg);
	}
	20% {
		transform: translateX(100%) translateY(100%) rotate(30deg);
	}
	100% {
		transform: translateX(100%) translateY(100%) rotate(30deg);
	}
}

@media (max-width: 77rem) {
}

@media (max-width: 48rem) {
	.pokemon-card {
		width: 95%;
		height: 20rem;
		border-radius: 1.5rem;
	}

	.pokemon-card__badges {
		position: absolute;
		flex-wrap: wrap-reverse;
		left: 0;
		bottom: 0;
		width: 40%;
		justify-content: left;
		align-content: flex-start;
	}
	.pokemon-card__info {
		width: 100%;
		height: 20rem;
	}
	.pokemon-card__info-name {
		width: 80%;
	}
	.pokemon-card__image {
		left: 12rem;
	}
	.pokemon-card__bg-name {
		display: block;
		align-items: center;
		position: absolute;
		text-align: left;
		top: 1rem;
		left: 0.5rem;
		width: 60%;
		height: 8rem;
		transform: rotate(0);
		opacity: 50%;
	}
}
</style>
