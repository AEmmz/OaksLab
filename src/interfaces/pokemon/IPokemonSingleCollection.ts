import { PokemonTypings } from "src/util/types/PokemonTypings";
import IPokemonSingleDatabaseCatchData
  from "src/interfaces/pokemon/IPokemonSingleDatabaseCatchData";
import IPokemonCatchLock from "src/interfaces/pokemon/IPokemonCatchLock";

export default interface IPokemonSingleCollection {
  name: string,
  apiNo: string,
  dexNo: string,
  type: [PokemonTypings, PokemonTypings | undefined];
  caught?: IPokemonSingleDatabaseCatchData,
  locked?: IPokemonCatchLock
}