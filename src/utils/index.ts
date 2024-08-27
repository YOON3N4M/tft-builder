import { IndexedChampion } from "@/components/field/Field";
import { Champion, SET_12_CHAMPIONS } from "@/data/champions";
import { SYNERGY_LIST, Synergy } from "@/data/synergy";
import { RiotId } from "@/types/riot";

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

export function checkGrade(synergy: Synergy[]): any {
  if (!synergy) return;

  const synergyCount = synergy.length;
  const requireQty = synergy[0].requirQty;
  const grade = synergy[0].tier;

  let index = 0;
  let gradeText = "unranked";
  let gradeNumber = 0;
  while (index < requireQty.length) {
    if (index === 0 && synergyCount < requireQty[index]) {
      break;
    } else if (synergyCount < requireQty[index]) {
      gradeText = grade[index - 1];
      gradeNumber = requireQty[index - 1];
      break;
    } else {
      if (index === requireQty.length - 1) {
        gradeText = grade[requireQty.length - 1];
        gradeNumber = requireQty[requireQty.length - 1];
        break;
      } else {
        index++;
      }
    }
  }

  return { gradeText, gradeNumber };
}

export function copyClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export function filterNull<T>(arr: T[]): T[] {
  const result = arr.filter((item) => item !== null);
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

export function generateIndexedChampion(
  champion: Champion,
  index: number,
  itemList = []
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
  const champion = SET_12_CHAMPIONS.find(
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
