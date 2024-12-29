import { SYNERGY_LIST, Synergy } from "@/data/set/12/synergy";
import { RiotId } from "@/types/riot";
import itemJson from "@/data/tft-item.json";
import { CORE_ITEM_LIST, CoreItem, EMBLEM_ITEM_LIST } from "@/data/item";
import { Champion } from "@/types/data";
import { SET_12_CHAMPION_LIST } from "@/dataNew/set/12/custom/champion";
import { ChampionJson, EffectJson, TraitJson } from "@/hooks/useSetDataNew";
import { IndexedChampion } from "@/store/BuilderStore";

export const cn = (...classNames: (string | false | undefined | null)[]) => {
  const styledClassNames = [...classNames]
    .map((className) => className && className.split(" "))
    .flat()
    .filter((className) => className);

  return styledClassNames.join(" ");
};
export function sortByKorean<T>(arr: T[], key: keyof T): T[] {
  const arrCopy = [...arr];

  arrCopy.sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue, "ko");
    }

    return 0;
  });

  return arrCopy;
}

export function sortByNumber<T>(
  arr: T[],
  key: keyof T,
  reverse: boolean = false
): T[] {
  const arrCopy = [...arr];

  arrCopy.sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return reverse ? bValue - aValue : aValue - bValue;
    }

    return 0;
  });

  return arrCopy;
}

export function groupBy<T>(array: T[], key: keyof T): T[][] {
  const grouped = array.reduce((acc, item) => {
    const keyValue = item[key];
    if (!acc[keyValue as keyof typeof acc]) {
      acc[keyValue as keyof typeof acc] = [];
    }
    acc[keyValue as keyof typeof acc].push(item);
    return acc;
  }, {} as Record<string | number | symbol, T[]>);

  // 그룹화된 객체를 배열로 변환
  return Object.values(grouped);
}

export function copyClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export function filterNull<T>(arr: (T | null)[]): T[] {
  const result = arr.filter((item) => item !== null) as T[];
  return result;
}

export function filterUndefined<T>(arr: T[]): T[] {
  const result = arr.filter((item) => item !== undefined);
  return result;
}

export function setItemToindex<T>(
  prevState: T[],
  targetIndex: number,
  newItem: T
): T[] {
  const clonedList = [...prevState];

  clonedList[targetIndex] = newItem;

  return clonedList;
}

export function replaceString(
  str: string,
  target: string = "#",
  replacement: string = "-"
) {
  const regex = new RegExp(target, "g");
  return str.replace(regex, replacement);
}

export function handleRiotId(riotId: string, sign: string): RiotId {
  const parts = riotId.split(sign);
  const gameName = parts[0];
  const tagLine = parts[1];

  if (tagLine === undefined) {
    return {
      gameName,
      tagLine: "KR1",
    };
  } else {
    return {
      gameName,
      tagLine,
    };
  }
}

// 티어 표기의 로마 숫자를 아랍 숫자로 변환
export function romeNumToArabNum(rome: string) {
  switch (rome) {
    case "I":
      return 1;
    case "II":
      return 2;
    case "III":
      return 3;
    case "IV":
      return 4;
  }
}

export function findLongestArray<T>(arr: T[][]): T[] {
  const result = arr.reduce((longest, current) => {
    return current.length > longest.length ? current : longest;
  }, []);
  return result;
}

export function generateIndexedChampion(
  champion: ChampionJson,
  index: number,
  itemList: CoreItem[] = []
): IndexedChampion {
  return { champion, index, itemList };
}

/**
 * matchinfoRes 에 포함된 Character_id를와 champion 데이터의 Src 값을 비교해서
 *
 * 특정 챔피언을 찾아오는 함수
 *
 * character_id : TFT12_Lillia
 *
 * champion data.src: TFT12_Lillia.TFT_Set12.png
 */
export function findChampion(character_id: string) {
  const champion = SET_12_CHAMPION_LIST.find(
    (champion) => champion.src.split(".")[0] === character_id
  );

  return champion;
}

/**
 * matchinfoRes 에 포함된 traits.name과 synergy 데이터의 name 값을 비교해서
 *
 * 특정 시너지(특성)을 찾아오는 함수
 *
 * traits.name : TFT12_Blaster
 *
 * synergy.name : blaster
 */
export function findSynergy(trait_name: string) {
  const name = trait_name.includes("TFT")
    ? trait_name.split("_")[1].toLowerCase()
    : trait_name;

  const synergy = SYNERGY_LIST.find((synergy) => synergy.src[0] === name);

  return synergy;
}

interface JsonItemDto {
  id: string;
  name: string;
  image: { full: string };
}

/**
 * api 반환 데이터중 units의 아이템.itemNames 의 문자열로 아이템 Json을거쳐 item.ts을 조회하는 함수
 *
 * 현재 아이템 데이터가 혼용되고 있기때문에 일련의 과정들이 필요하며 추후 리팩토링 된다면 과정을 줄어들 것
 */
export function findItem(itemNames: string) {
  const isEmblem = itemNames.includes("EmblemItem");

  //json
  const itemJsonData = itemJson.data as any;

  const itemObject = itemJsonData[itemNames] as JsonItemDto;

  if (!itemObject) return null;

  const itemSrc = itemObject.image.full;

  //itme.ts
  if (isEmblem) {
    const emblemItem = EMBLEM_ITEM_LIST.find(
      (emblem) => emblem.name === itemObject.name
    );
    return emblemItem ?? null;
  } else {
    const coreItem = CORE_ITEM_LIST.find((core) => core.src === itemSrc);
    return coreItem ?? null;
  }
}

/**
 * 타겟 챔피언이 리스트에 있는지 검사
 */
export function isChampionExist(
  setChampionDataList: ChampionJson[],
  tartgetChampion: ChampionJson
) {
  const exist = setChampionDataList.find(
    (championData) => championData.name === tartgetChampion.name
  );

  return exist ? true : false;
}

/**
 * "ASSETS/Characters/TFT13_Warwick/Skins/Base/Images/TFT13_Warwick.TFT_Set13_Evolved.tex"
 *
 * 와 같은 문자열에서 TFT13_Warwick.TFT_Set13_Evolved.tex 를 추출하고
 *
 * .tex 를 .png로 변환후
 *
 * TFT13_Warwick.TFT_Set13_Evolved.png 반환
 *
 */
export function extractIconSrc(iconSrc: string) {
  const lastSlashIndex = iconSrc.lastIndexOf("/");
  const extracted = iconSrc.substring(lastSlashIndex + 1);

  const result = extracted.replace(".tex", ".png");

  return result;
}
/**
 * 상징 아이템들의 실제 이미지 파일명이 다른 아이템 등과 형식이 달라
 *
 * 위 extractIconSrc로 정상적인 처리가 불가능하기에
 *
 * 해당 함수는 상징 이미지만을 별도로 처리하기 위한 유틸
 */
export function extractEmblemSrc(emblemSrc: string) {
  const lastSlashIndex = emblemSrc.lastIndexOf("_");
  const extracted = emblemSrc.substring(lastSlashIndex + 1);

  const result = extracted.replace("EmblemItem", "");
  return result;
}
/**
 * 해당 특성의 현재 유닛 수, effectList를 인자로 입력하면
 *
 * 해당하는 스타일의 number를 반환해줌
 */
export function checkTraitStyle(unitQty: number, effectList: EffectJson[]) {
  const condition = effectList.find(
    (cond) => unitQty <= cond.maxUnits && unitQty >= cond.minUnits
  );

  if (condition) {
    return condition.style;
  } else {
    return 0;
  }
}
