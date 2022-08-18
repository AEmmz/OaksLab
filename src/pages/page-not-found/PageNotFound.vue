<template>
	<base-card class="container">
		<base-card-inner class="inner-container">
			<h1>Seems You Might Be Lost</h1>
			<p>Sorry. This page does not exist.</p>
			<button @click="$router.push('home')">To Home</button>
		</base-card-inner>
	</base-card>
</template>

<style scoped>
.container {
	/* position: relative; */
	/* display: grid; */
	width: 30vw;
	margin: auto;
	text-align: center;
}
.inner-container {
	position: relative;
	display: grid;
	justify-content: center;
	align-items: center;
	height: 40vh;
	color: var(--bg-offwhite2);
	overflow: hidden;
	padding: 6rem 1.2rem;
}

h1,
p {
	margin-bottom: 2rem;
}

button {
	background-color: var(--login-color);
	padding: 2rem 5rem;
	font-size: 2rem;
	border-radius: 5rem;
	color: var(--bg-offwhite2);
	box-shadow: 0px 0px 20px -4px #000000;
	transition: 800ms all;
	border: none;
}

button:hover {
	filter: saturate(160%);
	transform: scale(1.1);
	cursor: pointer;
}

.inner-container::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	height: 100%;
	width: 2%;
	background-color: var(--main-red);
	box-shadow: 4px 0px 19px 3px #c33c5571;
}
.inner-container::after {
	content: '';
	position: absolute;
	top: 0;
	left: 98%;
	bottom: 0;
	height: 100%;
	width: 2%;
	background-color: var(--login-color);
	box-shadow: -4px 0px 19px 3px #17a39d8f;
}
</style>
