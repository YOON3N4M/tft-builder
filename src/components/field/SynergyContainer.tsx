import { Champion, SET_12_CHAMPIONS } from "@/constants/champions";
import { Synergy } from "@/constants/synergy";
import { checkGrade, cn, groupBy, sortByNumber } from "@/utils";
import Image from "next/image";
import ChampionPortrait from "../ChampionPortrait";
import { Arrow } from "../svgs";

import { IndexedChampion } from "./Field";
import { ToolTip, useToolTip } from "../tooltips/ToolTip";

interface SynergyContainerProps {
  indexedChampionList: IndexedChampion[];
}

const synergyBgStyles: { [key: string]: string } = {
  unranked: "bg-gray-900",
  bronze: "bg-[#a0715e]",
  silver: "bg-[#7c8f92]",
  gold: "bg-[#bd9a38]",
  prism: "bg-[#ad1457]",
};

function SynergyContainer(props: SynergyContainerProps) {
  const { indexedChampionList } = props;

  //console.log(indexedChampionList);

  const duplicateRemoves = removeDuplicateSyenrgy(indexedChampionList);

  const synergyList = duplicateRemoves.flatMap(
    (indexedChampion) => indexedChampion.champion.synergy
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

    return grade[checkGrade(b).gradeText] - grade[checkGrade(a).gradeText];
  });

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

  return (
    <div className="flex flex-col gap-sm py-md max-h-[400px] w-[90%]">
      {sortByLength.length === 0 && (
        <div className="w-[95%] p-sm bg-white border rounded-md opacity-70">
          챔피언 배치시 시너지가 활성화 됩니다{" "}
        </div>
      )}
      {sortByLength.map((synergy) => (
        <SynergyListItem
          indexedChampionList={indexedChampionList}
          key={synergy[0].name}
          synergy={synergy}
        />
      ))}
    </div>
  );
}

export default SynergyContainer;

interface SyenrgyListItemProps {
  indexedChampionList: IndexedChampion[];
  synergy: Synergy[];
}

function SynergyListItem(props: SyenrgyListItemProps) {
  const { indexedChampionList, synergy } = props;
  const { isTooltipOn, tooltipOff, tooltipOn, pos } = useToolTip();

  const synergyItem = synergy[0];
  const synergyChampions = SET_12_CHAMPIONS.filter((champion) =>
    champion.synergy.some((synergy) => synergy.name === synergyItem.name)
  );

  const sortByTier = sortByNumber(synergyChampions, "tier");

  function championExist(champion: Champion) {
    const exist = indexedChampionList.find(
      (cham) => cham.champion.name === champion.name
    );

    return exist ? true : false;
  }

  return (
    <div
      key={synergyItem.name}
      onMouseEnter={tooltipOn}
      onMouseLeave={tooltipOff}
      className="relative flex items-center border p-xs text-sm min-w-[205px] bg-white rounded-md"
    >
      <ToolTip isOn={isTooltipOn} x={pos.x} y={pos.y}>
        <div className="font-semibold">{synergyItem.name}</div>
        <div className="mt-sm flex gap-xxs">
          {sortByTier.map((champion) => (
            <ChampionPortrait
              key={champion.name}
              champion={champion}
              className={cn(
                "size-[40px]",
                !championExist(champion) && "!opacity-50"
              )}
              objectPosition="object-[-35px_0px]"
            />
          ))}
        </div>
      </ToolTip>
      <div
        className={cn(
          "p-xxs hexagon w-[34px] h-[36px] flex items-center justify-center",
          synergyBgStyles[checkGrade(synergy)?.gradeText]
        )}
      >
        <Image
          width={22}
          height={22}
          src={`/images/synergy/${synergyItem.src[0]}.png`}
          alt={synergyItem.name}
          className="filter"
        />
      </div>
      <div
        className={cn(
          "px-xs ml-[-5px] text-white",
          synergyBgStyles[checkGrade(synergy)?.gradeText]
        )}
      >
        {synergy.length}
      </div>
      <div className="ml-xs flex flex-col">
        <div className="flex">
          <span>{synergyItem.name}</span>
        </div>
        <div className="flex items-center gap-xxxs">
          {synergyItem.requirQty.map((qty, idx) => (
            <>
              <span
                className={cn(
                  "text-gray-500 text-xs",
                  checkGrade(synergy)?.gradeNumber === qty && "!text-black"
                )}
              >
                {qty}
              </span>
              {idx + 1 !== synergyItem.requirQty.length && (
                <Arrow size={10} className="inline fill-gray-300" />
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
