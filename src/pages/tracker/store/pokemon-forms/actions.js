const PokeList = () => import('../../../../assets/json/pokemonList.json');

export default {
	async fetchForms(context, payload) {
		const fetchAllPokemon = await PokeList();
		const allPokemon = fetchAllPokemon.default.pokemon;
		const pkId = context.rootGetters['tracker/pkIdVar'];
		const filteredPokemon = allPokemon.filter((p) => {
			return +p.dexNo === +pkId;
		});
		context.dispatch('fetchFormPhotos', { forms: filteredPokemon, id: pkId });
	},
	fetchFormPhotos(context, payload) {
		const formArray = [...payload.forms];
		const pkId = payload.id;
		const forms = [];
		formArray.forEach((p) => {
			const imageId = p.apiNo;
			const image = `https://ik.imagekit.io/kw2qoeib2/Home-Normal/${imageId}.png`;
			forms.push({ ...p, image: image });
		});
		context.commit('fetchForms', forms);
	},
};
