import { Champion, SET_12_CHAMPIONS } from "@/data/champions";
import { Synergy } from "@/data/synergy";
import { checkGrade, cn, filterNull, groupBy, sortByNumber } from "@/utils";
import Image from "next/image";
import ChampionPortrait from "../ChampionPortrait";
import { Arrow } from "../svgs";

import { ToolTip, useToolTip } from "../tooltips/ToolTip";
import { IndexedChampion } from "./Field";
import { PlacedChampion } from "./hexagon";

interface SynergyContainerProps {
  indexedChampionList: PlacedChampion[];
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

  const nullFiltered = filterNull(indexedChampionList) as IndexedChampion[];

  const duplicateRemoves = removeDuplicateSyenrgy(nullFiltered);

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

  const isSynergyOn = sortByLength.length > 0;

  return (
    <div
      className={cn(
        "pc:flex flex-col overflow-y-auto gap-sm pc:p-md tab:p-xs pc:max-h-[400px] tab:w-full pc:w-[90%] bg-[#ffffff05] border-[#222] border rounded-md",
        "pc:block mo:grid tab:grid mo:w-full mo:max-h-[200px] mo:overflow-auto mo:py-0",
        "tab:max-h-[200px]",
        !isSynergyOn ? "justify-center" : "tab:grid-cols-3 mo:grid-cols-2"
      )}
    >
      {!isSynergyOn && (
        <p className="text-[#888] text-xs place-self-center text-center">
          챔피언 배치시 특성이 활성화 됩니다.
        </p>
      )}
      {sortByLength.map((synergy) => (
        <SynergyListItem
          indexedChampionList={nullFiltered}
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
  const { tooltipContainerRef, isTooltipOn, tooltipOff, tooltipOn, pos } =
    useToolTip();

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
      ref={tooltipContainerRef}
      key={synergyItem.name}
      onMouseEnter={tooltipOn}
      onMouseLeave={tooltipOff}
      className={cn(
        "relative flex items-center p-xs text-xs text-main-text rounded-md"
      )}
    >
      <ToolTip
        className="whitespace-pre-line max-w-[400px]"
        isOn={isTooltipOn}
        x={pos.x}
        y={pos.y}
        position="right"
      >
        <div>
          <p className="text-main-text font-semibold">{synergyItem.name}</p>
          <p className="text-[#888] mt-sm">{synergyItem.desc}</p>
          <ul className="mt-sm text-[#888]">
            {synergyItem.effect.map((ef, idx) => (
              <li key={`${synergyItem.name}-effect-${idx}`}>
                ({synergyItem.requirQty[idx]}) {ef}
              </li>
            ))}
          </ul>
        </div>
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
          className="filter pc:w-[22px] pc:h-[22px]"
        />
      </div>
      <div
        className={cn(
          "px-xs py-xxxs ml-[-5px] text-main-text",
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
                  "text-[#888] text-xs",
                  checkGrade(synergy)?.gradeNumber === qty && "!text-main-text"
                )}
              >
                {qty}
              </span>
              {idx + 1 !== synergyItem.requirQty.length && (
                <Arrow size={10} className="inline fill-gray-600" />
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
