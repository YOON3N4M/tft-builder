import { CoreItem } from "@/data/item";
import { ChampionJson } from "@/hooks/useSetDataNew";
import { create } from "zustand";

export interface IndexedChampion {
  index: number;
  champion: ChampionJson;
  itemList: CoreItem[];
}

export type IndexedChampionList = (IndexedChampion | null)[];

const HEXAGON_QTY = 28;
export const INITIAL_INDEXED_NULL_LIST = [...Array(HEXAGON_QTY)].map(
  (_) => null
);

interface BuilderStore {
  indexedChampionList: IndexedChampionList;
  actions: {
    setIndexedChampionList: (list: IndexedChampionList) => void;
  };
}

const useBuilderStore = create<BuilderStore>((set) => ({
  indexedChampionList: INITIAL_INDEXED_NULL_LIST,
  actions: {
    setIndexedChampionList: (indexedChampionList) =>
      set({ indexedChampionList }),
  },
}));

export const useIndexedChampionList = () =>
  useBuilderStore((state) => state.indexedChampionList);

export const useBuilderActions = () =>
  useBuilderStore((state) => state.actions);
