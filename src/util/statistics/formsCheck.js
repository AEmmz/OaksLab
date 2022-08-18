const PokeList = () => import('../../assets/json/pokemonList.json');

const fetchForms = async (pokemon, dex) => {
	//Retrieve Pokemon's Dex Number
	const dexFormNumbers = [];
	const dexForms = [];
	dex.forEach((p) => {
		if (+pokemon[1].dexNo === +p.dexNo) {
			dexFormNumbers.push(+p.apiNo);
			dexForms.push(p);
		}
	});
	return [dexFormNumbers, dexForms];
};

export const inArray = (arr1, arr2) => {
	return arr1.some((n) => {
		return arr2.includes(+n[0]);
	});
};

export const standardDexCount = async (assignArray, pokemon, dex) => {
	const forms = await fetchForms(pokemon, dex);
	//Pushing to hunt array if family not present
	const check = inArray(assignArray, forms[0]);
	if (!check) {
		assignArray.push(pokemon);
	}
};

export const standardTypeDexCount = async (assignArray, pokemon, dex) => {
	const forms = await fetchForms(pokemon, dex);
	const check = inArray(assignArray, forms[0]);
	if (!check) {
		const typesArray = [];
		forms[1].forEach((t) => {
			typesArray.push(t.types);
		});
		let typesArrayFlat = typesArray.flat();
		typesArrayFlat = [...new Set(typesArrayFlat)];
		return [typesArrayFlat, forms[0]];
	}
};
