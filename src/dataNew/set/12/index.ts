import { SetData } from "@/types/data";
import { SET_12_CHAMPION_LIST } from "./custom/champion";
import { SET_12_TRAIT_LIST } from "./custom/trait";
import {
  SET_12_COMBINATION_ITEM_LIST,
  SET_12_CORE_ITEM_LIST,
  SET_12_EMBLEM_ITEM_LIST,
} from "./custom/item";

export const SET_12_DATA: SetData = {
  custom: {
    champion: SET_12_CHAMPION_LIST,
    trait: SET_12_TRAIT_LIST,
    combinationItem: SET_12_COMBINATION_ITEM_LIST,
    coreItem: SET_12_CORE_ITEM_LIST,
    emblelemItem: SET_12_EMBLEM_ITEM_LIST,
  },
};
