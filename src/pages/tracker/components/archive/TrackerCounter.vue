<template>
	<base-card-inner class="counter__container">
		<div class="counter__top-cont">
			<transition mode="out-in">
				<div v-if="pkName" class="counter__top-name-cont">
					<fit-text class="counter__top-name">{{ pkName }}</fit-text>
				</div>
				<div v-else class="placeholder-cont">
					<div class="double-up"></div>
					<h1 class="counter__top-name-ph">Choose A Pokemon</h1>
					<div class="double-up"></div>
				</div>
			</transition>

			<div class="counter__inc-container">
				<h2>Increment:</h2>
				<div class="counter__inc-counter">
					<button
						class="counter__inc-btn"
						@click="incrementUp"
						@mouseup="clearIncHold"
						@mousedown="holdIncrementUp"
					>
						<!-- <i class="fa-solid fa-angle-up fa-2xl"></i> -->
					</button>
					<div class="counter__inc-digit">
						<p>{{ incrementCount }}</p>
					</div>
					<button
						class="counter__inc-btn"
						@click="incrementDown"
						@mouseup="clearIncHold"
						@mousedown="holdIncrementDown"
					>
						<!-- <i class="fa-solid fa-angle-down fa-2xl"></i> -->
					</button>
				</div>
			</div>
		</div>
		<div class="counter__count-container" id="tracker">
			<button
				class="counter__main-button"
				:class="pkType1 + 'Type'"
				@click="countUp"
				@mouseup="clearCountHold"
				@mousedown="holdCountUp"
			>
				<p v-if="mainCount < 1000000">{{ mainCount }}</p>
				<p v-else>MAX</p>
			</button>
			<div class="counter__sub-buttons">
				<button
					class="counter__sub-minus"
					@click="countDown"
					@mouseup="clearCountHold"
					@mousedown="holdCountDown"
				>
					<i class="fa-solid fa-minus fa-2xl fa-icon"></i>
				</button>
				<button class="counter__sub-reset" @click="resetCounter">
					<i class="fa-solid fa-arrow-rotate-right fa-2xl fa-icon"></i>

					<h3>Reset</h3>
				</button>
				<button
					class="counter__sub-plus"
					@click="countUp"
					@mouseup="clearCountHold"
					@mousedown="holdCountUp"
				>
					<i class="fa-solid fa-plus fa-2xl fa-icon"></i>
				</button>
			</div>
		</div>
	</base-card-inner>
	<reset-modal></reset-modal>
</template>

<script>
import ResetModal from './ResetModal.vue';
import FitText from '../../../components/ui/FitText/FitText.vue';
import { mapActions, mapGetters } from 'vuex';
// import FitTextAlt from '../../../components/ui/FitText/FitText-Alt.vue';

export default {
	components: { ResetModal, FitText },
	computed: {
		...mapGetters('tracker/counter', ['mainCount', 'incrementCount']),
		...mapGetters('tracker', ['pkName', 'pkType1']),
	},
	methods: {
		...mapActions('tracker/counter', [
			'clearCountHold',
			'clearIncHold',
			'countUp',
			'countDown',
			'holdCountUp',
			'holdCountDown',
			'incrementUp',
			'incrementDown',
			'holdIncrementUp',
			'holdIncrementDown',
			'resetCounter',
		]),
	},
};
</script>

<style scoped>
* {
	font-family: Archivo, sans-serif;
}
/* TRACKER COUNTER */
.counter__container {
	display: flex;
	flex-direction: column;
	align-content: center;
	justify-content: center;
	color: var(--bg-offwhite);
}

.counter__top-cont {
	display: flex;
	flex-wrap: wrap;
	flex-flow: row;
	align-items: center;
	justify-content: space-between;
	align-content: space-between;
	text-align: left;
	gap: 1rem;
}
.counter__top-name-cont {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	width: 60%;
}

.counter__top-name {
	font-size: 6rem;
	padding-left: 1rem;
}

.placeholder-cont {
	display: flex;
	padding: 0 2rem;
	gap: 1rem;
	align-items: center;
}

.counter__top-name-ph {
	font-size: 3rem;
}
/* 
.double-up {
	mask: url(../../../assets/icons/DoubleUp.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/DoubleUp.svg) no-repeat center / contain;
	background: var(--bg-offwhite);
	height: 3rem;
	width: 3rem;
} */

.counter__inc-container {
	display: grid;
	font-size: 1.2rem;
	grid-template-rows: 1fr 1fr;
	align-items: center;
	justify-self: right;
	text-align: center;
}

.counter__inc-counter {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
}
.counter__inc-counter .fa-icon {
	color: var(--bg-offwhite);
}

.counter__inc-digit {
	font-size: 1.8rem;
	padding: 1rem;
}

.counter__inc-digit,
.counter__inc-btn {
	border: none;
	color: var(--bg-offwhite);
	cursor: pointer;
	background-color: transparent;
}

.counter__count-container {
	display: grid;
	grid-template-rows: 2fr 1fr;
	min-height: 300px;
	border-radius: 1.2rem;
	gap: 1.2rem;
	overflow: hidden;
}

.counter__main-button {
	font-size: 12rem;
	border: none;
	transition: 500ms all;
	color: var(--bg-offwhite2);
	text-shadow: 3px 3px 3px var(--bg-grey);
}

.counter__main-button:hover,
.counter__sub-minus:hover,
.counter__sub-reset:hover,
.counter__sub-plus:hover {
	filter: saturate(200%);
	transform: scale(1.05);
	cursor: pointer;
}
.counter__sub-buttons {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1.2rem;
}

.counter__sub-buttons .fa-icon {
	color: var(--bg-grey);
}

.fa-arrow-rotate-right {
	padding-bottom: 1.2rem;
}

.counter__sub-minus,
.counter__sub-reset,
.counter__sub-plus {
	border: none;
	cursor: pointer;
	transition: 500ms all;
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
	.counter__top-cont h1 {
		font-size: 3rem;
	}

	.counter__top-cont h2 {
		font-size: 1.3rem;
	}
	.counter__inc-digit {
		font-size: 1.5rem;
		padding: 1rem;
	}
	.counter__count-container {
		min-height: 200px;
	}
}

@media (max-width: 48rem) {
	.counter__top-cont h1 {
		font-size: 2rem;
	}
	.counter__inc-container h2 {
		font-size: 1.5rem;
	}
}
</style>
