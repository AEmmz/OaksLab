<template>
	<div class="pagination">
		<v-pagination
			v-model="currentPage"
			:length="totalPages"
			color="secondary"
			rounded="circle"
			total-visible="7"
		></v-pagination>
		<v-select
			v-if="totalEntries > 25"
			:items="perPageOption"
			v-model="perPage"
			label="Per Page"
			:value="perPage"
		></v-select>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	props: { setPerPage: Function },
	mounted() {
		this.setPerPage(this.perPage);
	},
	data() {
		return {
			currentPage: 1,
			perPage: 25,
			selectedPageOption: null,
			perPageOption: [25, 50, 100, 200],
		};
	},
	computed: {
		...mapGetters('collection', ['filteredList']),
		totalEntries() {
			if (this.filteredList) {
				return this.filteredList.length;
			}
			return null;
		},
		totalPages() {
			return Math.ceil(this.totalEntries / this.perPage) || 1;
		},
	},
	watch: {
		...mapActions('collection', ['paginate']),
		currentPage(cur, prev) {
			if (cur !== prev) {
				this.paginate({
					current: this.currentPage,
					perPage: this.perPage,
				});
			}
		},
		perPage(cur, prev) {
			if (cur !== prev) {
				this.currentPage = 1;
				this.paginate({
					current: this.currentPage,
					perPage: this.perPage,
				});
				this.setPerPage(this.perPage);
			}
		},
	},
};
</script>

<style scoped>
.pagination {
	display: flex;
	gap: 4rem;
	justify-content: space-between;
}
.pagination >>> .v-btn--disabled.v-btn--disabled {
	color: rgba(255, 255, 255, 0.767);
}
</style>
