<script setup>
import MainHero from './components/MainHero.vue';
import MainFeatures from './components/MainFeatures.vue';
// import ShineIcon from '../../assets/icons/ShineIcon.svg';
// import AlphaIcon from '../../assets/icons/AlphaIcon.svg';
// import PokeballIcon from '../../assets/icons/PokeballIcon.svg';
</script>

<template>
	<div class="homepage">
		<main-hero></main-hero>
		<main-features
			header="Track"
			:iconName="PokeballIcon"
			body="Keep track of your hunts and captures. Shinies, Alphas and more!"
			bgImage="https://ik.imagekit.io/kw2qoeib2/ImageAssets/Feature1.PNG?ik-sdk-version=javascript-1.4.3&updatedAt=1656878959182"
		></main-features>
		<main-features
			header="Collect"
			:iconName="AlphaIcon"
			body="View your past and current hunts in style!"
			bgImage="https://ik.imagekit.io/kw2qoeib2/ImageAssets/_Feature2-3.PNG?ik-sdk-version=javascript-1.4.3&updatedAt=1659969514318"
		></main-features>
		<main-features
			header="Research"
			:iconName="ShineIcon"
			body="Analyze statistics and charts showing your hunt progression."
			bgImage="https://ik.imagekit.io/kw2qoeib2/ImageAssets/Feature1.PNG?ik-sdk-version=javascript-1.4.3&updatedAt=1656878959182"
		></main-features>
	</div>
</template>

<script>
export default {
	components: {
		MainHero,
		MainFeatures,
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

<style></style>

<style scoped>
.homepage {
	display: flex;
	position: relative;
	flex-direction: column;
	top: -32px;
	overflow: hidden;
}
</style>
