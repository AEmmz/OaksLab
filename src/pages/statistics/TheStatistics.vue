<template>
	<div class="statistics-cont"></div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	mounted() {
		this.fetchNormalStats();
	},

	computed: {
		...mapGetters('navigation', ['statisticsFilter']),
	},
	methods: {
		...mapActions('statistics', ['quickPatch', 'fetchStats']),
		async fetchNormalStats() {
			await this.fetchStats('normal');
		},
	},
};
</script>

<style scoped></style>
