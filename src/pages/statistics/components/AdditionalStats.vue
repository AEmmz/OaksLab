<template>
	<div class="additional-stats-cont">
		<p class="additional-stats-title">Longest Hunt</p>
		<div class="additional-stats-details">
			<p class="additional-stats-details__name">Pikachu</p>
			<p class="additional-stats-details__number">12345</p>
			<img src="../../../assets/icons/PokeballIcon.svg" class="additional-stats-bg" />
		</div>
	</div>
	<div class="additional-stats-cont">
		<p class="additional-stats-title">Shortest Hunt</p>
		<div class="additional-stats-details">
			<p class="additional-stats-details__name">Pikachu</p>
			<p class="additional-stats-details__number">12345</p>
			<img src="../../../assets/icons/PokeballIcon.svg" class="additional-stats-bg" />
		</div>
	</div>
</template>

<style scoped>
.additional-stats-cont {
	width: 100%;
	text-align: center;
}

.additional-stats-details {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	gap: 1rem;
	background: var(--main-red);
	padding: 2rem 1rem;
	border-radius: 1rem;
	box-shadow: 0.5rem 0.5rem 1rem 0rem rgba(0, 0, 0, 0.267);
	outline: 0.4rem solid var(--bg-grey);
	outline-offset: -0.9rem;
	overflow: hidden;
}

.additional-stats-title {
	font-size: 3.5rem;
	margin-bottom: 1.5rem;
	color: var(--bg-offwhite2);
}
.additional-stats-details__name,
.additional-stats-details__number {
	font-size: 2.5rem;
	color: var(--bg-offwhite2);
}
.additional-stats-bg {
	position: absolute;
	opacity: 0.08;
	width: 200px;
	transform: rotate(-25deg);
}

@media (max-width: 77rem) {
}

@media (max-width: 48rem) {
	.additional-stats-cont {
		width: 50%;
	}
	.additional-stats-title {
		font-size: 2rem;
	}
	.additional-stats-details__name,
	.additional-stats-details__number {
		font-size: 1.6rem;
	}
}
</style>
