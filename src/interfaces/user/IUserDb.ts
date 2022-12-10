import { ShinyFilterType } from "src/util/types/CollectionFilterTypes";
import { GameNameType } from "src/util/types/GameNameType";

export default interface IUserDb {
  username: string,
  collectionSettings?: {
    shinyView: ShinyFilterType
  },
  notifications?: {
    whatsNew: boolean
  },
  selectedGame?: GameNameType
}