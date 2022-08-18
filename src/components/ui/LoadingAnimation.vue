<template>
	<div class="loading-cont">
		<div class="loading-icons">
			<div class="loading-icon load1"></div>
			<div class="loading-icon load2"></div>
			<div class="loading-icon load3"></div>
			<div class="loading-icon load4"></div>
		</div>
		<h2>Loading...</h2>
	</div>
</template>

<style scoped>
.loading-cont {
	display: flex;
	position: relative;
	flex-direction: column;
	align-items: center;
	top: 15rem;
	font-size: 3rem;
	gap: 2rem;
	width: 100%;
	height: 100%;
}

.loading-icons {
	display: flex;
	gap: 3rem;
}
.loading-icon {
	background-color: var(--bg-grey);
	width: 4rem;
	height: 4rem;
}

.load1 {
	mask: url(../../assets/icons/PokeballIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../assets/icons/PokeballIcon.svg) no-repeat center / contain;
	animation: 0.5s bounce infinite alternate;
}
.load2 {
	mask: url(../../assets/icons/AlphaIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../assets/icons/AlphaIcon.svg) no-repeat center / contain;
	animation: 0.5s bounce 0.1s infinite alternate;
}
.load3 {
	mask: url(../../assets/icons/ShineIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../assets/icons/ShineIcon.svg) no-repeat center / contain;
	animation: 0.5s bounce 0.2s infinite alternate;
}
.load4 {
	mask: url(../../assets/icons/HeartIcon.svg) no-repeat center / contain;
	-webkit-mask: url(../../assets/icons/HeartIcon.svg) no-repeat center / contain;
	animation: 0.5s bounce 0.3s infinite alternate;
}

@keyframes bounce {
	0% {
		transform: translateY(0);
	}

	100% {
		transform: translateY(-3rem);
	}
}
</style>
