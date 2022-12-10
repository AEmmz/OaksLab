import { HuntType } from "src/util/types/HuntTypes";

export type GeneralFilterType = {
  searchQuery: string,
  sortQuery: { label: string, value: SortFilterType },
  caughtQuery: { label: string, value: string },
  needQuery: { label: string, value: string },
  typeQuery1: { label: string, value: string },
  typeQuery2: { label: string, value: string },
  generationQuery: { label: string, value: string }
}

export type PaginationType = {
  page: number,
  dataLength: number,
  rowsPerPage: number,
  perPageOptions: [number, number, number, number]
}

export type ShinyFilterType =
  "All Normal" | "All Shiny" | "Shiny Caught"

export type SortFilterType =
  "dexAsc" | "dexDesc" | "nameAz" | "nameZa"

export type CaughtFilterType =
  "showAll" | "myCaught" | "complete" | HuntType