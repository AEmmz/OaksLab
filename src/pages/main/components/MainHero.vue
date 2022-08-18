<template>
	<div class="flex justify-center items-center">
		<q-parallax
			src="https://ik.imagekit.io/kw2qoeib2/ImageAssets/Hero1.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1656878445069"
			:height="1000"
			:speed="1"
		>
			<template v-slot:content>
				<q-card dark class="q-pa-xl title-card">
					<div class="text-h1">Gotta Track 'Em All</div>
				</q-card>
				<div v-if="!isLoggedIn" class="q-ma-xs q-gutter-md flex justify-center btn-cont">
					<q-btn
						size="xl"
						rounded
						label="Login"
						color="primary"
						to="/login"
						class="q-pa-md auth-btn"
					></q-btn>
					<q-btn
						size="xl"
						rounded
						label="Register"
						color="secondary"
						to="/register"
						class="q-pa-md auth-btn"
					></q-btn>
				</div>
			</template>
		</q-parallax>
	</div>
	<!-- <div class="hero">
		<div class="hero-cont">
			<div class="hero-icons">
				<div class="iconic">
					<img
						id="iconic"
						src="../../../assets/icons/AlphaIcon.svg"
						alt="alpha-hero-icon"
						v-motion
						:delay="600"
						:initial="mainInitial"
						:enter="mainEnter"
					/>
				</div>
				<div class="iconic">
					<img
						src="../../../assets/icons/PokeballIcon.svg"
						alt="alpha-hero-icon"
						v-motion
						:delay="800"
						:initial="mainInitial"
						:enter="mainEnter"
					/>
				</div>
				<div class="iconic">
					<img
						src="../../../assets/icons/ShineIcon.svg"
						alt="alpha-hero-icon"
						v-motion
						:delay="1000"
						:initial="mainInitial"
						:enter="mainEnter"
					/>
				</div>
				<div class="iconic">
					<img
						src="../../../assets/icons/HeartIcon.svg"
						alt="alpha-hero-icon"
						v-motion
						:delay="1200"
						:initial="mainInitial"
						:enter="mainEnter"
					/>
				</div>
			</div>
			<h1 class="hero-text" v-motion :delay="400" :initial="mainInitial" :enter="mainEnter">Gotta Track Em All!</h1>
			<div class="hero-icons">
				<div class="iconic">
					<img
						src="../../../assets/icons/ShineIcon.svg"
						alt="alpha-hero-icon"
						v-motion
						:delay="1200"
						:initial="revInitial"
						:enter="mainEnter"
					/>
				</div>
				<div class="iconic">
					<img
						src="../../../assets/icons/HeartIcon.svg"
						alt="alpha-hero-icon"
						v-motion
						:delay="1000"
						:initial="revInitial"
						:enter="mainEnter"
					/>
				</div>
				<div class="iconic">
					<img
						src="../../../assets/icons/AlphaIcon.svg"
						alt="alpha-hero-icon"
						v-motion
						:delay="800"
						:initial="revInitial"
						:enter="mainEnter"
					/>
				</div>
				<div class="iconic">
					<img
						src="../../../assets/icons/PokeballIcon.svg"
						alt="alpha-hero-icon"
						v-motion
						:delay="600"
						:initial="revInitial"
						:enter="mainEnter"
					/>
				</div>
			</div>
		</div>
	</div> -->
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			mainInitial: { opacity: 0, y: -60 },
			revInitial: { opacity: 0, y: 60 },
			mainEnter: {
				opacity: 1,
				y: 0,
				transition: {
					duration: 800,
				},
			},
			featureEnter: {
				opacity: 1,
				y: 0,
				transition: { duration: 900 },
			},
		};
	},
	computed: {
		...mapGetters('authorization', ['isLoggedIn']),
	},
};
</script>

<style scoped>
.btn-cont {
	width: 50%;
}
.auth-btn {
	width: 20%;
}

.title-card {
	opacity: 0.8;
	border-radius: 5rem;
}

.hero {
	/* display: flex;
	position: relative;
	justify-content: center;
	align-items: center; */
	width: 100%;
	height: 90rem;
	overflow: hidden;
	/* background-image: url('https://ik.imagekit.io/kw2qoeib2/ImageAssets/Hero1.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1656878445069');
	background-attachment: fixed;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center 0;
	border-bottom: 0.5rem solid var(--bg-offwhite2); */
}
.hero::before {
	display: flex;
	position: absolute;
	content: '';
	width: 100%;
	height: 100%;
	background: rgba(52, 52, 52, 0.7);
}

.hero-cont {
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	gap: 5rem;
	z-index: 2;
}

.hero-text {
	font-size: 8rem;
	text-align: center;
	color: var(--bg-offwhite2);
	border: 0.5rem solid var(--bg-offwhite2);
	padding: 3rem;
	border-radius: 5rem;
	background-color: rgba(52, 52, 52, 0.2);
}

.hero-icons {
	display: flex;
	gap: 5rem;
	transform: scale(1.6);
}

.iconic {
	position: relative;
}

.iconic {
	transition: 0.5s all;
}

.iconic:hover {
	transform: translateY(-10px);
}

@media (max-width: 77rem) {
	.hero::before {
	}

	.hero-cont {
	}

	.hero-text {
		font-size: 6rem;
	}

	.hero-icons {
	}

	.iconic {
	}

	.iconic {
	}

	.iconic:hover {
	}
}

@media (max-width: 48rem) {
	.hero {
		height: 71rem;
	}
	.hero::before {
	}

	.hero-cont {
	}

	.hero-text {
		font-size: 6rem;
		padding: 3rem 1rem;
		margin: 0rem 3rem;
		border-radius: 3rem;
	}

	.hero-icons {
		gap: 4rem;
		transform: scale(1.2);
	}

	.iconic {
	}

	.iconic {
	}

	.iconic:hover {
	}
}
</style>
