<template>
	<div class="games">
		<div class="game gen1">
			<p>Red</p>
			<!-- <p>•</p> -->
			<p>Green</p>
			<!-- <p>•</p> -->
			<p>Blue</p>
			<!-- <p>•</p> -->
			<p>Yellow</p>
		</div>
		<div class="game gen2">
			<p>Gold</p>
			<!-- <p>•</p> -->
			<p>Silver</p>
			<!-- <p>•</p> -->
			<p>Crystal</p>
		</div>
		<div class="game gen3">
			<p>Ruby</p>
			<!-- <p>•</p> -->
			<p>Sapphire</p>
			<!-- <p>•</p> -->
			<p>Emerald</p>
			<!-- <p>•</p> -->
			<p>Fire Red</p>
			<!-- <p>•</p> -->
			<p>Leaf Green</p>
			<!-- <p>•</p> -->
			<p>Collosseum</p>
			<!-- <p>•</p> -->
			<p>XD</p>
		</div>
		<div class="game gen4">
			<p>Diamond</p>
			<!-- <p>•</p> -->
			<p>Pearl</p>
			<!-- <p>•</p> -->
			<p>Platinum</p>
			<!-- <p>•</p> -->
			<p>Heart Gold</p>
			<!-- <p>•</p> -->
			<p>Soul Silver</p>
			<!-- <p>•</p> -->
			<p>Brilliant Diamond</p>
			<!-- <p>•</p> -->
			<p>Shining Pearl</p>
		</div>
		<div class="game gen5">
			<p>Black</p>
			<!-- <p>•</p> -->
			<p>White</p>
			<!-- <p>•</p> -->
			<p>Black 2</p>
			<!-- <p>•</p> -->
			<p>White 2</p>
		</div>
		<div class="game gen6">
			<p>X</p>
			<!-- <p>•</p> -->
			<p>Y</p>
			<!-- <p>•</p> -->
			<p>Omega Red</p>
			<!-- <p>•</p> -->
			<p>Alpha Sapphire</p>
		</div>
		<div class="game gen7">
			<p>Sun</p>
			<!-- <p>•</p> -->
			<p>Moon</p>
			<!-- <p>•</p> -->
			<p>Ultra Sun</p>
			<!-- <p>•</p> -->
			<p>Ultra Moon</p>
		</div>
		<div class="game lets-go">
			<p>Let's Go Eevee</p>
			<!-- <p>•</p> -->
			<p>Let's Go Pikachu</p>
		</div>
		<div class="game gen8">
			<p>Sword</p>
			<!-- <p>•</p> -->
			<p>Shield</p>
		</div>
		<div class="game legends-arceus">
			<p>Legends: Arceus</p>
		</div>
		<div class="game gen9">
			<p>Scarlet</p>
			<!-- <p>•</p> -->
			<p>Violet</p>
		</div>
	</div>
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
