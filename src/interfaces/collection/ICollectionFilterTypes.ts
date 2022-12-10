import { ShinyFilterType } from "src/util/types/CollectionFilterTypes";

export default interface ICollectionFilters {
  sortFilter: { label: string, value: string }[],
  caughtFilter: { label: string, value: string }[],
  needFilter: { label: string, value: string }[],
  generationFilter: { label: string, value: string }[],
  typeFilter: { label: string, value: string }[],
  shinyViewOptions: ShinyFilterType[]
}

