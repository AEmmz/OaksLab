<template>
	<div class="flex justify-center items-center">
		<q-parallax :src="bgImage" :height="1200" :speed="1">
			<template v-slot:content>
				<q-card dark class="q-pa-xl title-card items-center column flex q-gutter-sm">
					<div class="text-h1">{{ header }}</div>
					<p>{{ body }}</p>
				</q-card>
			</template>
		</q-parallax>
	</div>

	<!-- 

	<div class="feature" :class="header.toLowerCase()">
		<div
			class="feature-cont"
			v-motion
			:delay="100"
			:initial="mainInitial"
			:visibleOnce="featureEnter"
		>
			<img :src="iconName" alt="decor-icon" />
			<h1 class="feature-head">{{ header }}</h1>
			<p class="feature-body">{{ body }}</p>
			<img :src="iconName" alt="decor-icon" />
		</div>
	</div> -->
</template>

<script>
export default {
	props: {
		header: { type: String, required: true },
		iconName: { type: String, required: true },
		body: { type: String, required: true },
		bgImage: { type: String, required: true },
	},

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
};
</script>

<style scoped>
.feature {
	display: flex;
	position: relative;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 90rem;
	overflow: hidden;
	background-attachment: fixed;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: 0 5rem;
	border-bottom: 0.5rem solid var(--bg-offwhite2);
}

.track {
	background-image: url('');
}

.collect {
	background-image: url('');
}

.research {
	background-image: url('');
}

.feature::before {
	display: flex;
	position: absolute;
	content: '';
	width: 100%;
	height: 100%;
	background: rgba(52, 52, 52, 0.8);
}

.feature-cont {
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	gap: 5rem;
	z-index: 2;
}

.feature-head {
	font-size: 8rem;
	color: var(--bg-offwhite2);
	border: 0.5rem solid var(--bg-offwhite2);
	padding: 3rem 7rem;
	border-radius: 5rem;
}

.feature-body {
	font-size: 3rem;
	text-align: center;
	color: var(--bg-offwhite2);
}

@media (max-width: 77rem) {
	.feature {
		background-size: 500%;
		background-position: -15rem 1rem;
	}

	.feature-head {
		font-size: 6rem;
	}

	.feature-body {
		font-size: 3.5rem;
		padding: 0 2rem;
	}
}

@media (max-width: 48rem) {
	.feature {
		background-size: 700%;
	}

	.track {
		background-position: -12.7rem 5rem;
	}

	.collect {
		background-position: -12.7rem 5rem;
	}

	.research {
		background-position: -12.7rem 5rem;
	}

	.feature-head {
		font-size: 4rem;
	}

	.feature-body {
		font-size: 2.5rem;
	}
}
</style>
