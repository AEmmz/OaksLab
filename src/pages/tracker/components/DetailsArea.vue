<template>
	<base-card-inner class="details-container">
		<h2 class="details-title">Route Options (current game):</h2>
		<div class="details-info">
			<p class="route-location-1">Route 001</p>
			<p class="route-location-2">Route 002</p>
			<p class="route-location-3">Route 003</p>
			<p class="route-location-4">Route 004</p>
		</div>
	</base-card-inner>
	<base-card-inner class="details-container">
		<h2 class="details-title">Game Options:</h2>
		<div class="details-info">
			<p class="game-location-1">Red / Blue</p>
			<p class="game-location-2">Gold / Silver</p>
			<p class="game-location-3">Diamond / Pearl</p>
			<p class="game-location-4">Legends / Arceus</p>
		</div>
	</base-card-inner>
	<base-card-inner class="details-container">
		<h2 class="details-title">Details:</h2>
		<div class="details-info">
			<p class="route-location-1">Route 001</p>
			<p class="route-location-2">Route 002</p>
			<p class="route-location-3">Route 003</p>
			<p class="route-location-4">Route 004</p>
		</div>
	</base-card-inner>
</template>

<style scoped>
.details-container {
	display: flex;
	flex-direction: column;
	color: var(--bg-offwhite2);
	align-items: center;
	justify-content: center;
	overflow: hidden;
}

.details-container::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	height: 100%;
	width: 2%;
	background-color: var(--main-red);
}

.details-title {
	text-decoration: underline;
}

.details-info {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 80%;
	gap: 2rem;
	padding: 0.3rem 0;
	justify-content: space-between;
	min-width: 130px;
}

@media (max-width: 77rem) {
	.details-title {
		font-size: 1.8rem;
	}
	.details-info {
		font-size: 1.3rem;
	}
}

@media (max-width: 48rem) {
	.details-title {
		font-size: 1.7rem;
	}
	.details-info {
		font-size: 1.2rem;
	}
}
</style>
