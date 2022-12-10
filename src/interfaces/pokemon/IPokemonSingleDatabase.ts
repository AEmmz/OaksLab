import IPokemonSingleDatabaseCatchData
  from "src/interfaces/pokemon/IPokemonSingleDatabaseCatchData";
import { PokemonTypings } from "src/util/types/PokemonTypings";
import IPokemonSingleDatabaseCountData
  from "src/interfaces/pokemon/IPokemonSingleDatabaseCountData";

export default interface IPokemonSingleDatabase {
  catch: IPokemonSingleDatabaseCatchData;
  count: IPokemonSingleDatabaseCountData;
  dexNo: string;
  name: string;
  type1: PokemonTypings;
  type2: PokemonTypings | undefined;
}