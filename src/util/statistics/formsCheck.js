const PokeList = () => import("../../assets/json/pokemonList.json");

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



