<template>
	<q-card class="bg-dark flex justify-evenly items-center text-h6 q-pa-md">
		<div
			class="name-cont flex items-center justify-center full-width text-h5 text-light q-pb-sm"
		>
			Forms
		</div>
		<div class="form-tabs">
			<q-tabs
				class="bg-dark text-light"
				outside-arrows
				mobile-arrows
				:indicator-color="pkTypeColor()"
				dense
			>
				<div v-for="(form, index) in forms" :key="index">
					<q-route-tab
						:to="formRoute(form)"
						:label="form.name"
						no-caps
						exact
						replace
						@click="changePokemon(form)"
					>
						<q-img width="150px" :src="form.image" :alt="form.name"></q-img>
					</q-route-tab>
				</div>
			</q-tabs>
		</div>
	</q-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	data() {
		return {
			scrollAmount: 0,
		};
	},
	computed: {
		...mapGetters('tracker/forms', ['forms']),
		...mapGetters('tracker/counter', ['hunt']),
		...mapGetters('tracker', ['pkType1']),
	},
	methods: {
		...mapActions('tracker/forms', ['fetchForms']),
		...mapActions('tracker', ['changeActivePokemon']),
		...mapActions('tracker/counter', ['changeCount']),

		formRoute(form) {
			const route = '/tracker/' + form.name.toLowerCase().replaceAll(' ', '-');
			if (route === '/tracker/unown-?') route = '/tracker/unown-question';
			return route;
		},

		async changePokemon(form) {
			const inputPokemon = {
				api: form.apiNo,
				dex: form.dexNo,
				name: form.name,
				types: form.types,
			};
			const changePkmn = await this.changeActivePokemon(inputPokemon);
			const data = this.hunt.split('Count')[0];
			this.changeCount(data);
			this.fetchForms();
		},

		pkTypeColor() {
			return `${this.pkType1}Type`;
		},
	},
};
</script>

<style scoped>
.form-tabs {
	max-width: 100%;
}
</style>
