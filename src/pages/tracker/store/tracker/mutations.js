export default {
	resetTracker(state) {
		state.pkId = '';
		state.pkName = '';
		state.pkType1 = '';
		state.pkType2 = '';
		state.pkImageNormal = '';
		state.pkImageShiny = '';
		state.pkSprite = '';
	},

	async changeActivePokemon(state, payload) {
		const pokemonData = payload;
		const pkId = pokemonData.id;
		//Detail Pulls
		state.pkId = pkId;
		state.pkIdVar = pokemonData.dexNo;
		state.pkName = pokemonData.setName;
		state.pkType1 = pokemonData.setType[0];
		state.pkType2 = pokemonData.setType[1];

		const getPkImage = (id) => {
			const images = `https://ik.imagekit.io/kw2qoeib2/Home-Normal/${id}.png`;
			return images;
		};
		const getPkImageShiny = (id) => {
			const images = `https://ik.imagekit.io/kw2qoeib2/Home-Shiny/${id}.png`;
			return images;
		};

		state.pkImageNormal = getPkImage(pkId);
		state.pkImageShiny = getPkImageShiny(pkId);
		// }
	},
};
