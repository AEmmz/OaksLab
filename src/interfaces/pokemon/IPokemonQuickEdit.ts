import { ToggleTabs } from "src/util/types/ToggleTabs";
import { HuntType } from "src/util/types/HuntTypes";
import IPokemonSingleCollection from "src/interfaces/pokemon/IPokemonSingleCollection";

export default interface IPokemonQuickEdit {
  pokemon: IPokemonSingleCollection,
  tab: ToggleTabs,
  huntType: HuntType
}