import IPokemonSingleDatabaseCatchData
  from "src/interfaces/pokemon/IPokemonSingleDatabaseCatchData";
import { PokemonTypings } from "src/util/types/PokemonTypings";

export type PokemonSingleDatabaseType =
  [
    string,
    {
      catch: IPokemonSingleDatabaseCatchData;
      count: object;
      dexNo: string;
      name: string;
      type1: PokemonTypings;
      type2: PokemonTypings | undefined;
    }
  ]