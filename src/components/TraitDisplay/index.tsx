import { Synergy } from "@/data/set/12/synergy";
import {
  checkTraitGrade,
  cn,
  filterNull,
  groupBy,
  isChampionExist,
  sortByNumber,
} from "@/utils";
import Image from "next/image";
import ChampionPortrait from "../portraits/ChampionPortrait";
import { Arrow } from "../svgs";

import { PortalTooltip, usePortalTooltip } from "../tooltips/PortalTooltip";
import { IndexedChampion } from "../field/Field";
import { PlacedChampion } from "../field/hexagon";
import TraitItem from "./TraitItem";

interface TraitDisplayProps {
  indexedChampionList: PlacedChampion[];
}

export const synergyBgStyles: { [key: string]: string } = {
  unranked: "bg-gray-900",
  bronze: "bg-[#a0715e]",
  silver: "bg-[#7c8f92]",
  gold: "bg-[#bd9a38]",
  prism: "bg-[#ad1457]",
};

function TraitDisplay(props: TraitDisplayProps) {
  const { indexedChampionList } = props;

  const nullFiltered = filterNull(indexedChampionList) as IndexedChampion[];

  const duplicateRemoves = removeDuplicateSyenrgy(nullFiltered);

  const synergyList = duplicateRemoves.flatMap(
    (indexedChampion) => indexedChampion.champion.trait
  );

  const refinedSynergyList = groupBy(synergyList, "name");
  const sortByLength = refinedSynergyList.sort((a, b) => b.length - a.length);
  const soltByGrade = refinedSynergyList.sort((a, b) => {
    const grade: any = {
      unranked: 1,
      bronze: 2,
      silver: 3,
      gold: 4,
      prism: 5,
    };

    return (
      grade[checkTraitGrade(b).gradeText] - grade[checkTraitGrade(a).gradeText]
    );
  });

  const isSynergyOn = sortByLength.length > 0;

  return (
    <div
      className={cn(
        "pc:flex flex-col overflow-y-auto gap-sm pc:p-md tab:p-xs pc:max-h-[400px] tab:w-full pc:w-[90%] bg-content-bg border-[#222] border rounded-md",
        "pc:block mo:grid tab:grid mo:w-full mo:max-h-[200px] mo:overflow-auto mo:py-0",
        "tab:max-h-[200px]",
        !isSynergyOn ? "justify-center" : "tab:grid-cols-3 mo:grid-cols-2"
      )}
    >
      {!isSynergyOn && (
        <p className="text-sub-text text-xs place-self-center text-center">
          챔피언 배치시 특성이 활성화 됩니다.
        </p>
      )}
      {sortByLength.map((synergy) => (
        <TraitItem
          indexedChampionList={nullFiltered}
          key={synergy[0].name}
          synergy={synergy}
        />
      ))}
    </div>
  );
}

export default TraitDisplay;

// 동일한 챔피언이 배치되어 있을때
function removeDuplicateSyenrgy(indexedChampionList: IndexedChampion[]) {
  const seen = new Set(); // 중복을 추적할 Set 생성
  return indexedChampionList.filter((champion) => {
    const keyValue = champion.champion["name"]; // 현재 요소의 key 값
    if (seen.has(keyValue)) {
      return false; // 이미 본 key 값이면 false 반환
    }
    seen.add(keyValue); // 새로운 key 값이면 Set에 추가
    return true; // true 반환하여 결과 배열에 포함
  });
}
