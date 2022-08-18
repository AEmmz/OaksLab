<template>
	<div class="nav-bar__user-info">Welcome {{ username }}!</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('authorization', ['username']),
	},
};
</script>

<style scoped>
.nav-bar__user-info {
	padding: 0 2rem;
	text-align: center;
	color: var(--bg-offwhite2);
}

@media (max-width: 48rem) {
	.nav-bar__user-info {
		line-height: 6.5rem;
	}
}
</style>
