import { SET_12_CHAMPIONS } from "@/constants/champions";
import { CORE_ITEM_LIST, EMBLEM_ITEM_LIST } from "@/constants/item";
import { OptimizedIndexedChampion } from "@/containers/BuilderContainer";
import { filterNull } from ".";
import { SYNERGY_LIST } from "@/constants/synergy";

export function uploadToLocalstorage(key: string, data: string) {
  localStorage.setItem(key, data);
}

export function getLocalStorageByKey(key: string) {
  const result = localStorage.getItem(key);

  return result;
}

export function getlocalAll() {
  if (typeof window === "undefined") return;

  const keyArr: string[] = [];

  const localStorageLength = localStorage.length;
  for (let i = 0; i < localStorageLength; i++) {
    const key = localStorage.key(i);
    if (key) {
      keyArr.push(key);
    }
  }

  const filteredKey = keyArr.filter((key) => key.includes("tft-build"));

  const result = filteredKey.map((key) => ({
    buildName: key,
    build: localStorage.getItem(key),
  }));

  return result;
}

export function unOptimizedBuild(optimizedString: string) {
  if (!optimizedString) return;

  const decoeded = decodeURI(optimizedString);

  const optimizedArr = JSON.parse(decoeded) as OptimizedIndexedChampion[];

  const filteredNull = filterNull(optimizedArr);

  const unOptimized = filteredNull.map((champion) => ({
    index: champion.index,
    champion: SET_12_CHAMPIONS.find((cham) => cham.name === champion.name)!,
    itemList: champion.itemList.map((item) => {
      if (item.includes("상징")) {
        return EMBLEM_ITEM_LIST.find((emblem) => item === emblem.name)!;
      } else {
        return CORE_ITEM_LIST.find((core) => item === core.name)!;
      }
    })!,
  }));

  const sortByTier = unOptimized.sort(
    (indexA, indexB) => indexA.champion.tier - indexB.champion.tier
  );

  return sortByTier;
}

export function localStorageDelete(key: string) {
  localStorage.removeItem(key);
}
