import IPokemonSingleDatabaseCatchData
  from "src/interfaces/pokemon/IPokemonSingleDatabaseCatchData";
import IPokemonSingleDatabase from "src/interfaces/pokemon/IPokemonSingleDatabase";
import { PokemonTypings } from "src/util/types/PokemonTypings";
import IPokemonSingleDatabaseCountData
  from "src/interfaces/pokemon/IPokemonSingleDatabaseCountData";

export default class PokemonDbModel {
  apiNo: string;
  catch: IPokemonSingleDatabaseCatchData;
  count: IPokemonSingleDatabaseCountData;
  dexNo: string;
  name: string;
  type1: PokemonTypings;
  type2: PokemonTypings | undefined;

  constructor(apiNo: string, dexNo: string, name: string, type1: PokemonTypings, type2: PokemonTypings | undefined) {
    this.apiNo = apiNo;
    this.dexNo = dexNo;
    this.name = name;
    this.type1 = type1;
    this.type2 = type2;
    this.catch = {
      normalCaught: false
    };
    this.count = {
      normalCount: 0
    };
  }

  getDbObject(): [string, IPokemonSingleDatabase] {
    return [
      this.apiNo,
      {
        catch: this.catch,
        count: this.count,
        dexNo: this.dexNo,
        name: this.name,
        type1: this.type1,
        type2: this.type2
      }
    ];
  }
}