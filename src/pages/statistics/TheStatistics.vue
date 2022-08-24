<template>
	<div class="statistics-cont">
		<q-icon size="xl" :name="`icon-type-1-bug`"></q-icon>
		<q-icon size="xl" :name="`icon-type-1-dark`"></q-icon>
		<q-icon size="xl" :name="`icon-type-1-dragon`"></q-icon>
		<q-icon size="xl" :name="`icon-type-1-electric`"></q-icon>
		<q-icon size="xl" :name="`icon-type-1-fairy`"></q-icon>
		<q-icon size="xl" :name="`icon-type-1-fighting`"></q-icon>
		<q-icon size="xl" :name="`icon-type-1-fire`"></q-icon>
		<q-icon size="xl" :name="`icon-type-1-flying`"></q-icon>
		<q-icon size="xl" :name="`icon-type-1-ghost`"></q-icon>
		<q-icon size="xl" :name="`icon-type-1-grass`"></q-icon>
		<q-icon size="xl" :name="`icon-type-1-ground`"></q-icon>
		<q-icon size="xl" :name="`icon-type-1-ice`"></q-icon>
		<q-icon size="xl" :name="`icon-type-1-normal`"></q-icon>
		<q-icon size="xl" :name="`icon-type-1-poison`"></q-icon>
		<q-icon size="xl" :name="`icon-type-1-psychic`"></q-icon>
		<q-icon size="xl" :name="`icon-type-1-rock`"></q-icon>
		<q-icon size="xl" :name="`icon-type-1-steel`"></q-icon>
		<q-icon size="xl" :name="`icon-type-1-water`"></q-icon>
	</div>
	<div class="statistics-cont">
		<q-icon size="xl" :name="`icon-type-2-bug`"></q-icon>
		<q-icon size="xl" :name="`icon-type-2-dark`"></q-icon>
		<q-icon size="xl" :name="`icon-type-2-dragon`"></q-icon>
		<q-icon size="xl" :name="`icon-type-2-electric`"></q-icon>
		<q-icon size="xl" :name="`icon-type-2-fairy`"></q-icon>
		<q-icon size="xl" :name="`icon-type-2-fighting`"></q-icon>
		<q-icon size="xl" :name="`icon-type-2-fire`"></q-icon>
		<q-icon size="xl" :name="`icon-type-2-flying`"></q-icon>
		<q-icon size="xl" :name="`icon-type-2-ghost`"></q-icon>
		<q-icon size="xl" :name="`icon-type-2-grass`"></q-icon>
		<q-icon size="xl" :name="`icon-type-2-ground`"></q-icon>
		<q-icon size="xl" :name="`icon-type-2-ice`"></q-icon>
		<q-icon size="xl" :name="`icon-type-2-normal`"></q-icon>
		<q-icon size="xl" :name="`icon-type-2-poison`"></q-icon>
		<q-icon size="xl" :name="`icon-type-2-psychic`"></q-icon>
		<q-icon size="xl" :name="`icon-type-2-rock`"></q-icon>
		<q-icon size="xl" :name="`icon-type-2-steel`"></q-icon>
		<q-icon size="xl" :name="`icon-type-2-water`"></q-icon>
	</div>
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
