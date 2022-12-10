import { ShinyFilterType } from "src/util/types/CollectionFilterTypes";

export default interface ICollectionFilters {
  shinyView: ShinyFilterType;
  searchQuery: string | null;
  // sortQuery: string | null;
  // caughtQuery: string | null;
  // needQuery: string | null;
  // generationQuery: string | null;
  // typeQuery1: string | null;
  // typeQuery2: string | null;
  sortQuery: { label: string, value: string },
  caughtQuery: { label: string, value: string },
  needQuery: { label: string, value: string },
  typeQuery1: { label: string, value: string },
  typeQuery2: { label: string, value: string },
  generationQuery: { label: string, value: string }
}

