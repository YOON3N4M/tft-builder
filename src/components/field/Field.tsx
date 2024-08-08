import { Champion, SET_12_CHAMPIONS } from "@/constants/champions";
import { Synergy } from "@/constants/synergy";
import { CHAMPION_ICON_URL } from "@/constants/url";
import { useDragActions, useDraggingTarget } from "@/store/dragStore";
import { checkGrade, cn, groupBy, sortByNumber } from "@/utils";
import Image from "next/image";
import {
  Dispatch,
  DragEvent,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Tooltip, useTooltip } from "../tooltip/Tooltip";
import { Arrow } from "../svgs";
import ChampionTooltip from "../tooltip/ChampionTooltip";

interface FieldProps {}

interface IndexedChampion {
  index: number;
  champion: Champion;
}

const hexagonQty = 28;

const tempArray = [...Array(hexagonQty)].map((_, idx) => idx);

function Field(props: FieldProps) {
  const {} = props;

  const [placedChampions, setPlacedChampions] = useState<IndexedChampion[]>([]);

  function isEvenRow(idx: number): boolean {
    return (idx > 6 && idx < 14) || idx > 20;
  }

  return (
    <>
      <div className="text-black basis-[20%] flex">
        <SynergyContainer indexedChampionList={placedChampions} />
      </div>
      <div className="flex flex-grow justify-center">
        <div className="relative grid grid-cols-7 gap-xs w-[700px] gap-y-0 h-min">
          {placedChampions.length === 0 && (
            <div className="absolute x-center y-center z-[500] p-sm bg-white border rounded-md opacity-70">
              드래그해서 챔피언 배치
            </div>
          )}
          {tempArray.map((item, idx) => (
            <Hexagon
              setPlacedChampions={setPlacedChampions}
              key={idx}
              index={idx}
              isEvenRow={isEvenRow(idx)}
            ></Hexagon>
          ))}
        </div>
      </div>
    </>
  );
}

export default Field;

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

interface HexagonProps {
  children?: ReactNode;
  isEvenRow: boolean;
  setPlacedChampions: Dispatch<SetStateAction<IndexedChampion[]>>;
  index: number;
}

const backgroundColorStyles: { [key: string]: string } = {
  "1": "bg-tier-1",
  "2": "bg-tier-2",
  "3": "bg-tier-3",
  "4": "bg-tier-4",
  "5": "bg-tier-5",
};

function Hexagon(props: HexagonProps) {
  const { children, isEvenRow, setPlacedChampions, index } = props;

  const { setDraggingTarget } = useDragActions();

  const draggingChampion = useDraggingTarget();

  const { isTooltipOn, tooltipOff, tooltipOn } = useTooltip();

  const [placedChampion, setPlacedChampion] = useState<Champion | null>(null);
  const [isDragEnter, setIsDragEnter] = useState(false);

  function onDragEnter(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    setIsDragEnter(true);
  }

  function onDrageLeave() {
    setIsDragEnter(false);
  }

  function onDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function onDragDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragEnter(false);

    if (draggingChampion) {
      //console.log("챔피언 배치");
      const indexed = {
        index,
        champion: draggingChampion as Champion,
      };
      setPlacedChampion(draggingChampion as Champion);
      setPlacedChampions((prev) => [...prev, indexed]);
    } else {
      //console.log("챔피언 없음");
    }
    setDraggingTarget(null);
  }

  function onChampionRightClick(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    removeChamion();
  }

  function removeChamion() {
    setPlacedChampion(null);
    setPlacedChampions((prev) => prev.filter((item) => item.index !== index));
  }

  return (
    <div className={cn("relative")}>
      <div className="relative">
        {placedChampion && (
          <ChampionTooltip
            isTooltipOn={isTooltipOn}
            champion={placedChampion}
            className={cn(isEvenRow && "translate-x-[30%]")}
          />
        )}
      </div>

      <div
        onMouseEnter={tooltipOn}
        onMouseLeave={tooltipOff}
        className={cn(
          "hexagon w-[84px] cursor-pointer h-[96px] bg-[#d0d2d5] relative flex justify-center items-center ",
          isEvenRow && "translate-x-[55%]",
          isDragEnter && "bg-blue-300",
          placedChampion &&
            backgroundColorStyles[placedChampion.tier.toString()]
        )}
      >
        <div
          onContextMenu={onChampionRightClick}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragLeave={onDrageLeave}
          onDrop={onDragDrop}
          className="hexagon size-[90%] relative"
        >
          {placedChampion && (
            <div className="">
              <Image
                width={256}
                height={128}
                src={CHAMPION_ICON_URL(placedChampion.src)}
                alt={placedChampion.name}
                className="object-cover absolute center w-full h-full object-[-87px_0px]"
              />
              <p className="absolute bottom-[15%] text-center w-full text-white font-semibold text-[11px] bg-[#00000099]">
                {placedChampion.name}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const borderColorStyles: { [key: string]: string } = {
  "1": "border-tier-1",
  "2": "border-tier-2",
  "3": "border-tier-3",
  "4": "border-tier-4",
  "5": "border-tier-5",
};

interface SyenrgyListItemProps {
  indexedChampionList: IndexedChampion[];
  synergy: Synergy[];
}

function SynergyListItem(props: SyenrgyListItemProps) {
  const { indexedChampionList, synergy } = props;
  const { isTooltipOn, tooltipOn, tooltipOff } = useTooltip();

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
      onMouseOver={tooltipOn}
      onMouseLeave={tooltipOff}
      className="relative flex items-center border p-xs text-sm w-[95%] bg-white rounded-md"
    >
      <Tooltip className="" isTooltipOn={isTooltipOn}>
        <div className="font-semibold">{synergyItem.name}</div>
        <div className="mt-sm flex gap-xxs">
          {sortByTier.map((champion) => (
            <div
              key={champion.name}
              className={cn(
                "size-[40px] overflow-hidden flex rounded-md border-2",
                borderColorStyles[champion.tier.toString()],
                !championExist(champion) && "!opacity-50"
              )}
            >
              <Image
                src={CHAMPION_ICON_URL(champion.src)}
                width={256}
                height={128}
                alt={champion.name}
                className="object-cover relative object-[-35px_0px] scale-125"
              />
            </div>
          ))}
        </div>
      </Tooltip>
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
