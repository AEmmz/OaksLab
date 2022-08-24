<template>
	<base-card-inner class="toggle-cont">
		<h1 class="toggle-header">Shiny Toggle</h1>
		<form class="toggle-inputs" @change="setShinyToggle">
			<div class="toggle-input">
				<input type="radio" id="none" value="none" name="shiny-toggle" v-model="selected" />
				<label for="none">None</label>
			</div>
			<div class="toggle-input">
				<input
					type="radio"
					id="caught"
					value="caught"
					name="shiny-toggle"
					v-model="selected"
				/>
				<label for="caught">Caught</label>
			</div>
			<div class="toggle-input">
				<input type="radio" id="all" value="all" name="shiny-toggle" v-model="selected" />
				<label for="all">All</label>
			</div>
		</form>
	</base-card-inner>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	methods: {
		...mapActions('collection/cards', ['shinyToggle']),
		shinyToggle() {
			const option = this.selected;
			this.shinyToggle(option);
		},
	},
	data() {
		return {
			selected: 'none',
		};
	},
};
</script>

<style scoped>
.toggle-cont {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	height: 100%;
}
.toggle-header {
	color: var(--bg-offwhite2);
	font-size: 2rem;
}

.toggle-inputs {
	display: flex;
	flex-direction: column;
	align-items: left;
	text-align: left;
	gap: 0.5rem;
	color: var(--bg-offwhite2);
}

.toggle-input {
	display: flex;
	gap: 1rem;
}
</style>
