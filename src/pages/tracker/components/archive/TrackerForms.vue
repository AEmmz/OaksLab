<template>
	<div class="forms-cont">
		<base-card-inner class="forms-cont-inner">
			<h2>Form Options:</h2>

			<div class="forms" ref="formCont">
				<div v-for="form in forms" :key="form" class="form" @click="selectForm(form)">
					<img :src="form.image" :alt="form.name" class="form-image" />
					<p class="form-name">{{ form.name }}</p>
				</div>
			</div>
		</base-card-inner>
		<button class="form-scroll scroll-left" @click="scrollLeft">
			<div class="arrow-left"></div>
		</button>
		<button class="form-scroll scroll-right" @click="scrollRight">
			<div class="arrow-right"></div>
		</button>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	data() {
		return {
			scrollAmount: 0,
		};
	},
	computed: {
		...mapGetters('tracker/forms', ['forms']),
	},
	methods: {
		...mapActions('tracker/forms', ['fetchForms']),
		...mapActions('tracker', ['changeActivePokemon']),
		...mapActions('tracker/counter', ['changeCount']),

		async selectForm(form) {
			this.pkIsVisible = false;
			this.pkSelected = true;
			this.pkmnQuery = form.name;
			this.huntQuery = 'Normal';
			let redirect = '/tracker/' + form.name.toLowerCase().replaceAll(' ', '-');
			//Unown Safeguard
			if (redirect === '/tracker/unown-?') {
				redirect = '/tracker/unown-question';
			}
			this.$router.replace(redirect);
			const inputPokemon = {
				api: form.apiNo,
				dex: form.dexNo,
				name: form.name,
				types: form.types,
			};
			const changePkmn = await this.changeActivePokemon(inputPokemon);
			const data = this.huntQuery.toLowerCase();
			this.changeCount(data);
			this.fetchForms();
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		},
		scrollRight() {
			const container = this.$refs.formCont;
			const currentPosition = container.scrollLeft;
			const containerWidth = container.scrollWidth;
			const offset = container.clientWidth;
			if (currentPosition < containerWidth - offset) {
				this.$refs.formCont.scrollTo({
					left: currentPosition + 170,
					behavior: 'smooth',
				});
			} else {
				this.$refs.formCont.scrollTo({
					left: 0,
					behavior: 'smooth',
				});
			}
		},
		scrollLeft() {
			const container = this.$refs.formCont;
			const currentPosition = container.scrollLeft;
			const containerWidth = container.scrollWidth;
			const offset = container.clientWidth;
			if (currentPosition > 0) {
				this.$refs.formCont.scrollTo({
					left: currentPosition - 170,
					behavior: 'smooth',
				});
			} else {
				this.$refs.formCont.scrollTo({
					left: containerWidth - offset,
					behavior: 'smooth',
				});
			}
		},
	},
};
</script>

<style scoped>
.forms-cont {
	position: relative;
}

.forms-cont-inner {
	display: flex;
	flex-direction: column;
}

h2 {
	color: var(--bg-offwhite2);
	align-self: center;
}
.forms {
	display: flex;
	position: relative;
	align-items: flex-start;
	justify-content: left;
	gap: 3rem;
	overflow: hidden;
	scroll-behavior: smooth;
	padding: 1rem 0;
	border-left: 5rem solid var(--bg-grey);
	border-right: 5rem solid var(--bg-grey);
}
.form {
	position: relative;
	display: flex;
	gap: 1rem;
	flex-direction: column;
	color: var(--bg-offwhite2);
	align-items: center;
	text-align: center;
	cursor: pointer;
	transition: 0.2s all ease-in-out;
}

.form:hover {
	transform: scale(1.05);
}

.form-image {
	width: 100px;
}

.form-scroll {
	position: absolute;
	height: 30%;
	width: 50px;
	top: 50%;
	transform: translateY(-50%);
	z-index: 3;
	cursor: pointer;
	transition: 0.5s all ease-in-out;
}
.form-scroll:hover {
}

.scroll-right {
	right: 0rem;
	mask: url(../../../assets/icons/AngleRightLite.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/AngleRightLite.svg) no-repeat center / contain;
	color: rgb(255, 255, 255);
	background-color: var(--bg-offwhite);
}

.scroll-right:hover {
	transform: translateX(0.5rem) translateY(-3.25rem);
}

.scroll-left {
	left: 0rem;
	mask: url(../../../assets/icons/AngleLeftLite.svg) no-repeat center / contain;
	-webkit-mask: url(../../../assets/icons/AngleLeftLite.svg) no-repeat center / contain;
}
.scroll-left:hover {
	transform: translateX(-0.5rem) translateY(-3.25rem);
}
</style>
