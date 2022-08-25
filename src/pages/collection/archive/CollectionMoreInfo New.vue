<template>
	<div class="more-info-card-cont">
		<q-card
			class="more-info-card full-width full-height item-center"
			:style="{
				background: `linear-gradient(302deg, var(--${pokemonInfo.type1}Type) 38%, var(--light) 38%)`,
			}"
		>
			<div>
				<q-icon
					name="fas fa-xmark"
					size="md"
					class="absolute-top-left q-ma-sm"
					@click="close()"
				/>
			</div>
			<div class="row">
				<div class="col-10">
					<h3 class="name col q-ma-md q-pl-lg">
						{{ pokemonInfo.name }}
					</h3>
					<q-separator inset />
				</div>
				<div class="col">
					<h3 class="number col q-ma-md">
						{{ pokemonInfo.dexNo }}
					</h3>
				</div>
			</div>
			<div class="row">
				<div class="card-back-info col-8 column">
					<div class="q-ma-xs col column items-center justify-center">
						<h5 class="q-pb-xs">Caught</h5>
						<div class="icons flex justify-center q-gutter-xs">
							<q-chip
								v-if="pokemonInfo.catch.normalCaught"
								size="md"
								icon="icon-poke-pokeball"
								>Normal</q-chip
							>
							<q-chip
								v-if="pokemonInfo.catch.shinyCaught"
								size="md"
								icon="icon-poke-shiny"
								>Shiny</q-chip
							>
							<q-chip
								v-if="pokemonInfo.catch.alphaCaught"
								size="md"
								icon="icon-poke-alpha"
								>Alpha</q-chip
							>
							<q-chip
								v-if="pokemonInfo.catch.shinyAlphaCaught"
								size="md"
								icon="icon-poke-alpha-shiny"
								>Shiny Alpha</q-chip
							>
							<q-chip
								v-if="pokemonInfo.catch.pokerusCaught"
								size="md"
								icon="icon-poke-pokerus"
								>Pokerus</q-chip
							>
							<q-chip
								v-if="pokemonInfo.catch.shinyPokerusCaught"
								size="md"
								icon="icon-poke-pokerus-shiny"
								>Shiny Pokerus</q-chip
							>
							<q-chip
								v-if="pokemonInfo.catch.markedCaught"
								size="md"
								icon="icon-poke-marked"
								>Marked</q-chip
							>
							<q-chip
								v-if="pokemonInfo.catch.shinyMarkedCaught"
								size="md"
								icon="icon-poke-marked-shiny"
								>Shiny Marked</q-chip
							>
							<q-chip
								v-if="pokemonInfo.catch.sixIvCaught"
								size="md"
								icon="icon-poke-six"
								>Six IV</q-chip
							>
							<q-chip
								v-if="pokemonInfo.catch.shinySixIvCaught"
								size="md"
								icon="icon-poke-six-shiny"
								>Shiny Six IV</q-chip
							>
							<q-chip
								v-if="pokemonInfo.catch.zeroIvCaught"
								size="md"
								icon="icon-poke-zero"
								>Zero IV</q-chip
							>
							<q-chip
								v-if="pokemonInfo.catch.shinyZeroIvCaught"
								size="md"
								icon="icon-poke-zero-shiny"
								>Shiny Zero IV</q-chip
							>
						</div>
					</div>
					<q-separator inset />
					<div class="q-ma-xs col column items-center justify-center q-pb-xs">
						<h5 class="q-pb-xs">Uncaught</h5>
						<div class="icons flex justify-center q-gutter-xs">
							<q-chip
								v-if="!pokemonInfo.catch.normalCaught"
								size="md"
								icon="icon-poke-pokeball"
								>Normal</q-chip
							>
							<q-chip
								v-if="!pokemonInfo.catch.shinyCaught"
								size="md"
								icon="icon-poke-shiny"
								>Shiny</q-chip
							>
							<q-chip
								v-if="!pokemonInfo.catch.alphaCaught"
								size="md"
								icon="icon-poke-alpha"
								>Alpha</q-chip
							>
							<q-chip
								v-if="!pokemonInfo.catch.shinyAlphaCaught"
								size="md"
								icon="icon-poke-alpha-shiny"
								>Shiny Alpha</q-chip
							>
							<q-chip
								v-if="!pokemonInfo.catch.pokerusCaught"
								size="md"
								icon="icon-poke-pokerus"
								>Pokerus</q-chip
							>
							<q-chip
								v-if="!pokemonInfo.catch.shinyPokerusCaught"
								size="md"
								icon="icon-poke-pokerus-shiny"
								>Shiny Pokerus</q-chip
							>
							<q-chip
								v-if="!pokemonInfo.catch.markedCaught"
								size="md"
								icon="icon-poke-marked"
								>Marked</q-chip
							>
							<q-chip
								v-if="!pokemonInfo.catch.shinyMarkedCaught"
								size="md"
								icon="icon-poke-marked-shiny"
								>Shiny Marked</q-chip
							>
							<q-chip
								v-if="!pokemonInfo.catch.sixIvCaught"
								size="md"
								icon="icon-poke-six"
								>Six IV</q-chip
							>
							<q-chip
								v-if="!pokemonInfo.catch.shinySixIvCaught"
								size="md"
								icon="icon-poke-six-shiny"
								>Shiny Six IV</q-chip
							>
							<q-chip
								v-if="!pokemonInfo.catch.zeroIvCaught"
								size="md"
								icon="icon-poke-zero"
								>Zero IV</q-chip
							>
							<q-chip
								v-if="!pokemonInfo.catch.shinyZeroIvCaught"
								size="md"
								icon="icon-poke-zero-shiny"
								>Shiny Zero IV</q-chip
							>
						</div>
					</div>
					<q-separator inset />
				</div>
			</div>
		</q-card>
		<q-img
			class="card-image absolute-bottom-right"
			:src="selectedImage"
			:alt="`${pokemonInfo.name}-Image`"
			:class="pkClasses"
		></q-img>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	props: {
		pokemonInfo: { type: Object },
		pokemonId: { type: String },
		selectedImage: { type: String },
		pkClasses: { type: String },
		close: { type: Function },
	},
	data() {},
};
</script>

<style scoped>
@import url(../../../css/card-styles.css);

.more-info-card-cont {
	position: relative;
	height: 30rem;
	width: 50rem;
	max-width: 50rem;
	min-width: 50rem;
	overflow: visible;
	border-radius: 0.7rem;
}

.more-info-card {
	overflow: hidden;
	border-radius: 0.7rem;
}

.card-image {
	width: 350px;
	right: -7rem;
	bottom: -3rem;
}

.name {
	text-align: center;
}
.number {
	text-align: right;
	opacity: 0.7;
}
</style>
