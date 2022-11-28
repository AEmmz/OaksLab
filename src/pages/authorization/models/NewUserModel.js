const PokeList = () => import("../../../assets/json/pokemonList.json");

export default class User {

  constructor(username) {
    this.userInfo = {
      notifications: {
        whatsNew: true,
      },
      username: username
    };
    this.pokedex = this.setPokedex();
  }

  async setPokedex() {
    const fetchPkDetails = await PokeList();
    const pokelist = fetchPkDetails.default.pokemon;
    const userPokedex = [];
    pokelist.forEach((p) => {
      userPokedex.push({
        [p.apiNo]: {
          name: p.name,
          type1: p.types[0],
          type2: p.types[1] || null,
          dexNo: p.dexNo,
          catch: {
            normalCaught: false
          }
        }
      });
    });
    return userPokedex
  }
}

