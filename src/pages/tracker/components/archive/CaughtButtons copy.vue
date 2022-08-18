<template>
	<base-card-inner-v2 class="checklist-cont">
		<!--Catch Button-->
		<div class="checklist__button-cont">
			<button
				class="checklist__button"
				:class="{ caught: normal, uncaught: !normal }"
				@click="setToggler('normal')"
			>
				<div class="checklist__check-icon"></div>
				<div class="checklist__button-icon normal"></div>
			</button>
			<label class="checklist__button-label">Regular</label>
		</div>

		<!--Shiny Button-->
		<div class="checklist__button-cont">
			<button
				class="checklist__button"
				:class="{ caught: shiny, uncaught: !shiny, disabled: !shinyAvailable }"
				@click="setToggler('shiny')"
			>
				<div class="checklist__check-icon"></div>
				<div class="checklist__button-icon shiny"></div>
			</button>
			<label class="checklist__button-label">Shiny</label>
		</div>

		<!--Alpha Button-->
		<div class="checklist__button-cont">
			<button
				class="checklist__button"
				:class="{ caught: alpha, uncaught: !alpha, disabled: !alphaAvailable }"
				@click="setToggler('alpha')"
			>
				<div class="checklist__check-icon"></div>
				<div class="checklist__button-icon alpha"></div>
			</button>
			<label class="checklist__button-label">Alpha</label>
		</div>

		<!--Shiny Alpha Button-->
		<div class="checklist__button-cont">
			<button
				class="checklist__button"
				:class="{
					caught: shinyAlpha,
					uncaught: !shinyAlpha,
					disabled: !shinyAlphaAvailable,
				}"
				@click="setToggler('shinyAlpha')"
			>
				<div class="checklist__check-icon"></div>
				<div class="checklist__button-icon shiny-alpha"></div>
			</button>
			<label class="checklist__button-label">Shiny Alpha</label>
		</div>

		<!--Marked Button-->
		<div class="checklist__button-cont">
			<button
				class="checklist__button"
				:class="{
					caught: marked,
					uncaught: !marked,
					disabled: !markedAvailable,
				}"
				@click="setToggler('marked')"
			>
				<div class="checklist__check-icon"></div>
				<div class="checklist__button-icon marked"></div>
			</button>
			<label class="checklist__button-label">Marked</label>
		</div>

		<!--Shiny Marked Button-->
		<div class="checklist__button-cont">
			<button
				class="checklist__button"
				:class="{
					caught: shinyMarked,
					uncaught: !shinyMarked,
					disabled: !shinyMarkedAvailable,
				}"
				@click="setToggler('shinyMarked')"
			>
				<div class="checklist__check-icon"></div>
				<div class="checklist__button-icon shiny-marked"></div>
			</button>
			<label class="checklist__button-label">Shiny Marked</label>
		</div>

		<!--Pokerus Button-->
		<div class="checklist__button-cont">
			<button
				class="checklist__button"
				:class="{ caught: pokerus, uncaught: !pokerus }"
				@click="setToggler('pokerus')"
			>
				<div class="checklist__check-icon"></div>
				<div class="checklist__button-icon pokerus"></div>
			</button>
			<label class="checklist__button-label">Pokerus</label>
		</div>

		<!--Shiny Pokerus Button-->
		<div class="checklist__button-cont">
			<button
				class="checklist__button"
				:class="{ caught: shinyPokerus, uncaught: !shinyPokerus }"
				@click="setToggler('shinyPokerus')"
			>
				<div class="checklist__check-icon"></div>
				<div class="checklist__button-icon shiny-pokerus"></div>
			</button>
			<label class="checklist__button-label">Shiny Pokerus</label>
		</div>

		<!--0IV Button-->
		<div class="checklist__button-cont">
			<button
				class="checklist__button"
				:class="{ caught: zeroIv, uncaught: !zeroIv }"
				@click="setToggler('zeroIv')"
			>
				<div class="checklist__check-icon"></div>
				<div class="checklist__button-icon zero-iv"></div>
			</button>
			<label class="checklist__button-label">0 IV</label>
		</div>

		<!--Shiny 0 IV Button-->
		<div class="checklist__button-cont">
			<button
				class="checklist__button"
				:class="{ caught: shinyZeroIv, uncaught: !shinyZeroIv }"
				@click="setToggler('shinyZeroIv')"
			>
				<div class="checklist__check-icon"></div>
				<div class="checklist__button-icon shiny-zero-iv"></div>
			</button>
			<label class="checklist__button-label">Shiny 0 IV</label>
		</div>

		<!--6 IV Button-->
		<div class="checklist__button-cont">
			<button
				class="checklist__button"
				:class="{ caught: sixIv, uncaught: !sixIv }"
				@click="setToggler('sixIv')"
			>
				<div class="checklist__check-icon"></div>
				<div class="checklist__button-icon six-iv"></div>
			</button>
			<label class="checklist__button-label">6 IV</label>
		</div>

		<!--Shiny 6 IV Button-->
		<div class="checklist__button-cont">
			<button
				class="checklist__button"
				:class="{ caught: shinySixIv, uncaught: !shinySixIv }"
				@click="setToggler('shinySixIv')"
			>
				<div class="checklist__check-icon"></div>
				<div class="checklist__button-icon shiny-six-iv"></div>
			</button>
			<label class="checklist__button-label">Shiny 6 IV</label>
		</div>

		<!--Favorite Button-->
		<div class="checklist__button-cont">
			<button
				class="checklist__button"
				:class="{ caught: favorite, uncaught: !favorite }"
				@click="setToggler('favorite')"
			>
				<div class="checklist__check-icon"></div>
				<img class="checklist__button-icon" src="../../../assets/icons/HeartIcon.svg" />
			</button>
			<label class="checklist__button-label">Favorite</label>
		</div>
	</base-card-inner-v2>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters('tracker/caught', [
			'normal',
			'shiny',
			'alpha',
			'shinyAlpha',
			'marked',
			'shinyMarked',
			'pokerus',
			'shinyPokerus',
			'zeroIv',
			'shinyZeroIv',
			'sixIv',
			'shinySixIv',
			'favorite',
			'shinyAvailable',
			'alphaAvailable',
			'shinyAlphaAvailable',
			'markedAvailable',
			'shinyMarkedAvailable',
		]),
		...mapGetters('tracker', ['pkId']),

		pkIsActive() {
			return this.pkId !== '';
		},
	},
	methods: {
		...mapActions('tracker/caught', ['toggler']),
		...mapActions('tracker/caught', ['toggler']),
		setToggler(type) {
			if (this.pkIsActive) {
				this.toggler(type);
			}
		},
	},
};
</script>

<style scoped>
.checklist-cont {
	width: 70rem;
	display: flex;
	flex-wrap: wrap;
	gap: 2rem 4rem;
	justify-content: space-around;
	align-items: center;
}

.checklist__button-cont {
	width: 13.5rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.8rem;
}

.checklist__button {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50px;
	width: 120px;
	border: none;
	border-radius: 2.5rem;
	transition: 800ms all;
	cursor: pointer;
	color: var(--bg-offwhite2);
}

.checklist__button:hover {
	filter: saturate(130%);
	transform: scale(1.1);
}

.checklist__button-icon,
.checklist__check-icon {
	height: 32px;
	width: 32px;
	transition: 800ms all;
	position: absolute;
}

.checklist__check-icon {
	mask: url(../../../assets/icons/CircleCheck.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/CircleCheck.svg) no-repeat center / contain;
	background: var(--bg-offwhite2);
}

.checklist__button-label {
	color: var(--bg-offwhite2);
}

.uncaught {
	background-color: var(--main-red);
}

.uncaught .checklist__button-icon {
	transform: '';
}
.uncaught .checklist__check-icon {
	opacity: 0;
}

.caught {
	background-color: var(--success-color);
}
.caught .checklist__button-icon {
	transform: translateX(70%);
}
.caught .checklist__check-icon {
	opacity: 100;
	transform: translateX(-70%);
}

.checklist__button.disabled {
	pointer-events: none;
	filter: grayscale(100%);
}

.normal {
	mask: url(../../../assets/icons/PokeballIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/PokeballIcon.svg) no-repeat center / contain;
	background: var(--bg-offwhite2);
}
.shiny {
	mask: url(../../../assets/icons/ShineIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/ShineIcon.svg) no-repeat center / contain;
	background: var(--bg-offwhite2);
}
.alpha {
	mask: url(../../../assets/icons/AlphaIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/AlphaIcon.svg) no-repeat center / contain;
	background: var(--bg-offwhite2);
}
.shiny-alpha {
	mask: url(../../../assets/icons/ShinyAlphaIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/ShinyAlphaIcon.svg) no-repeat center / contain;
	background: var(--bg-offwhite2);
}
.marked {
	mask: url(../../../assets/icons/MarkedIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/MarkedIcon.svg) no-repeat center / contain;
	background: var(--bg-offwhite2);
}
.shiny-marked {
	mask: url(../../../assets/icons/ShinyMarkedIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/ShinyMarkedIcon.svg) no-repeat center / contain;
	background: var(--bg-offwhite2);
}
.pokerus {
	mask: url(../../../assets/icons/PokerusIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/PokerusIcon.svg) no-repeat center / contain;
	background: var(--bg-offwhite2);
}
.shiny-pokerus {
	mask: url(../../../assets/icons/ShinyPokerusIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/ShinyPokerusIcon.svg) no-repeat center / contain;
	background: var(--bg-offwhite2);
}

.zero-iv {
	mask: url(../../../assets/icons/ZeroIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/ZeroIcon.svg) no-repeat center / contain;
	background: var(--bg-offwhite2);
}
.shiny-zero-iv {
	mask: url(../../../assets/icons/ShinyZeroIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/ShinyZeroIcon.svg) no-repeat center / contain;
	background: var(--bg-offwhite2);
}
.six-iv {
	mask: url(../../../assets/icons/SixIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/SixIcon.svg) no-repeat center / contain;
	background: var(--bg-offwhite2);
}
.shiny-six-iv {
	mask: url(../../../assets/icons/ShinySixIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/ShinySixIcon.svg) no-repeat center / contain;
	background: var(--bg-offwhite2);
}

@media (max-width: 77rem) {
}

@media (max-width: 48rem) {
	.checklist-cont {
		display: none;
	}
}
</style>
