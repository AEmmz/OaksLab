export default {
  pokemonData(state) {
    return state.pokemonData;
  },
  apiNo(state) {
    return state.apiNo;
  },
  dexNo(state) {
    return state.dexNo;
  },
  pkName(state) {
    return state.pkName;
  },
  pkType1(state) {
    return state.pkType1;
  },
  pkType2(state) {
    return state.pkType2;
  },
  pkImageNormal(state) {
    return state.pkImageNormal;
  },
  pkImageShiny(state) {
    return state.pkImageShiny;
  },
  pkSprite(state) {
    return state.pkSprite;
  },
  isLoggedIn(state) {
    return state.isLoggedIn;
  },
  isForms(state) {
    return state.isForms;
  },
  hunt(state) {
    return state.selectors.hunt;
  },
  huntList(state) {
    const list = state.selectors.huntList;
    const capitalizedList = [];
    list.forEach(i => {
      const words = i.split(" ");
      let capital = [];
      words.forEach(w => {
        capital.push(w.charAt(0).toUpperCase() + w.slice(1));
      });
      capitalizedList.push(capital.join(" "));
    });
    return capitalizedList;
  },

  huntListVariables(state, getters) {
    const huntArray = getters.huntList;
    const huntVariable = [];
    huntArray.forEach(hunt => {
      let stringAdjustment = hunt[0].toLowerCase() + hunt.substring(1);
      stringAdjustment = stringAdjustment.replaceAll(" ", "");
      huntVariable.push(stringAdjustment);
    });
    return huntVariable;
  }
};
