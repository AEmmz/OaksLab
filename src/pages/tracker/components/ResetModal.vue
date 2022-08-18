<template>
	<Transition name="conf">
		<div class="reset-confirmation" v-if="reset === true">
			<h3 class="reset-header">Are You Sure?</h3>
			<p>This Will Permanently Reset Your Counter For This Pokemon</p>
			<div class="confirmation">
				<button class="reset-confirm" @click="resetConfirm">Confirm</button>
				<button class="reset-cancel" @click="resetCancel">Cancel</button>
			</div>
		</div>
	</Transition>
	<Transition name="overlay">
		<div class="overlay" @click="resetCancel" v-if="reset === true"></div>
	</Transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	methods: {
		...mapActions('tracker/counter', ['resetConfirm', 'resetCancel']),
	},
	computed: {
		...mapGetters('tracker/counter', ['reset']),
	},
};
</script>

<style scoped>
* {
	font-family: Archivo, sans-serif;
}
.reset-confirmation {
	display: grid;
	position: fixed;
	grid-template-rows: repeat(3 1fr);
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--bg-grey);
	padding: 20px;
	border-radius: 20px;
	justify-content: center;
	align-items: center;
	text-align: center;
	gap: 20px;
	box-shadow: 0px 0px 50px -15px var(--bg-offwhite);
	border: 4px solid var(--bg-offwhite);
	z-index: 100;
}

.reset-confirmation p {
	background-color: transparent;
	color: var(--bg-offwhite2);
	font-size: 18px;
}

.reset-header,
.reset-confirm,
.reset-cancel,
.confirmation {
	border: none;
	color: var(--bg-offwhite2);
	font-size: 25px;
}

.reset-header,
.confirmation {
	background-color: transparent;
}

.confirmation {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr;
}

.reset-confirm,
.reset-cancel {
	width: 80%;
	justify-self: center;
	padding: 20px;
	border-radius: 20px;
	transition: all 1s ease;
}
.reset-confirm:hover,
.reset-cancel:hover {
	filter: saturate(200%);
	transform: scale(1.05);
	cursor: pointer;
}

.reset-confirm {
	background-color: var(--success-color);
}

.reset-cancel {
	background-color: var(--main-red);
}

.overlay {
	display: block;
	background-color: #000000c6;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 99;
}

.conf-enter-active {
	animation: confirmation 0.8s ease;
}
.overlay-enter-active {
	animation: oL 0.8s ease;
}
.conf-leave-active {
	animation: confirmation 0.4s ease reverse;
}
.overlay-leave-active {
	animation: oL 0.4s ease reverse;
}

@keyframes oL {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes confirmation {
	0% {
		transform: translate(-50%, -70%);
		box-shadow: 0px 0px 0px -15px var(--bg-offwhite);
		opacity: 0;
	}
	50% {
		box-shadow: 0px 0px 100px -15px var(--bg-offwhite);
		transform: translate(-50%, -50%);
		opacity: 1;
	}
	100% {
		box-shadow: 0px 0px 50px -15px var(--bg-offwhite);
	}
}
</style>
