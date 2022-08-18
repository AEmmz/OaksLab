<template>
	<div class="search-element__cont" key="pkmn">
		<h1 class="search-element__label">{{ filterName }}</h1>
		<section class="search-element__form">
			<select class="search-element__input" @change="filterSelect" v-model="selected">
				<option class="search-element__drowpdown-option" :value="filterDefault">
					{{ filterDefault }}
				</option>
				<option
					class="search-element__drowpdown-option"
					v-for="filterItem in filterOption"
					:key="filterItem"
					:value="filterItem"
				>
					{{ filterItem }}
				</option>
			</select>
		</section>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	props: { filter: Array, filterName: String },
	data() {
		return {
			selected: '',
		};
	},
	computed: {
		filterDefault() {
			if (this.filterName === 'Caught:') {
				this.selected = this.filter[1];
				return this.filter[0];
			}
			this.selected = this.filter[0];
			return this.filter[0];
		},
		filterOption() {
			return this.filter.slice(1);
		},
	},
	methods: {
		...mapActions('collection', ['collectionFilters']),
		filterSelect() {
			this.collectionFilters({
				option: this.filterName,
				filter: this.selected,
			});
		},
	},
};
</script>

<style scoped>
.search-element__cont {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
	width: 15%;
}

.search-element__cont :focus {
	outline: none;
}

.search-element__label {
	color: var(--bg-offwhite);
	font-size: 2rem;
}

.search-element__form {
	width: 100%;
	position: relative;
	margin: 0 auto;
	/* color: var(--bg-grey); */
	border: 2px solid var(--bg-offwhite2);
	border-radius: 0.6rem;
	padding: 5px 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 1.8rem;
	font-weight: 400;
}

.search-element__input {
	width: 85%;
	height: 33px;
	border: none;
	font-size: 2rem;
	/* padding: 0 20px; */
	color: var(--bg-offwhite2);
	background: transparent;
	width: 100%;
}
.search-element__input::selection {
	font-size: 2rem;
	color: var(--bg-offwhite2);
}

.search-element__drowpdown-option {
	color: var(--bg-grey);
	background-color: var(--bg-offwhite);
}

@media (max-width: 77rem) {
}

@media (max-width: 48rem) {
	.search-element__label {
		align-self: flex-start;
	}
	.search-element__cont {
		width: 90%;
	}
	.search-element__input {
		height: 2.5rem;
	}
}
</style>
