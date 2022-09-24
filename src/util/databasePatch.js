// async quickPatch(context) {
//   const uid = context.rootGetters["authorization/uid"];
//   const dbRef = await ref(getDatabase(), `users/${uid}/pokedex/`);
//   const fetchPkDetails = await PokeList();
//   const pokelist = fetchPkDetails.default.pokemon;
//
//   pokelist.forEach(async (p) => {
//     const dexNo = p.dexNo;
//     const name = p.name;
//     const pkId = p.apiNo;
//     const type1 = p.types[0];
//     const type2 = p.types[1] || null;
//     const updateDb = await update(dbRef, {
//       [pkId]: {
//         name: name,
//         type1: type1,
//         type2: type2,
//         dexNo: dexNo,
//         catch: {
//           normalCaught: false,
//           shinyCaught: false,
//           alphaCaught: false,
//           shinyAlphaCaught: false,
//           megaCaught: false,
//           shinyMegaCaught: false,
//           gigantamaxCaught: false,
//           shinyGigantamaxCaught: false,
//           pokerusCaught: false,
//           shinyPokerusCaught: false,
//           favoriteCaught: false
//         },
//         count: {
//           normalCount: 0,
//           shinyCount: 0,
//           alphaCount: 0,
//           shinyAlphaCount: 0,
//           megaCount: 0,
//           shinyMegaCount: 0,
//           gigantamaxCount: 0,
//           shinyGigantamaxCount: 0,
//           pokerusCount: 0,
//           shinyPokerusCount: 0,
//           favoriteCount: 0
//         }
//       }
//     });
//   });
// },
