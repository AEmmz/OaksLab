<template>
	<div class="games"></div>
</template>

<script></script>

<style scoped>
.games {
	display: flex;
	flex-direction: column;
	color: var(--bg-offwhite2);
	gap: 3rem;
	align-items: center;
}

.game {
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	position: relative;
	gap: 2rem;
	background: var(--main-red);
	padding: 3rem 2rem;
	border-radius: 1rem;
	box-shadow: 0.5rem 0.5rem 1rem 0rem rgba(0, 0, 0, 0.267);
	outline: 0.4rem solid var(--bg-grey);
	outline-offset: -0.9rem;
	overflow: hidden;
	font-size: 1.6rem;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
}

.game:hover {
	transform: scale(1.05);
	filter: saturate(1.3);
}
</style>
