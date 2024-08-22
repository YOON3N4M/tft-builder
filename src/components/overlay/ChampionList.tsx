"use client";

import {
  CHAMPION_TIER,
  Champion,
  SET_12_CHAMPIONS,
  TRAINING_BOT,
} from "@/constants/champions";
import { useDragActions } from "@/store/dragStore";
import {
  cn,
  generateIndexdChampion,
  setItemToindex,
  sortByKorean,
  sortByNumber,
} from "@/utils";
import {
  ChangeEvent,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ChampionPortrait from "../ChampionPortrait";
import { Token } from "../svgs";
import ChampionTooltip from "../tooltips/ChampionTooltip";
import { ToolTip, useToolTip } from "../tooltips/ToolTip";
import { Overlay, OverlayProps, OverlayTab } from "./Overlay";
import { getChoseong } from "es-hangul";
import { IndexedChampion } from "../field/Field";

interface ChampionListProps extends OverlayProps {
  setPlacedChampions: Dispatch<SetStateAction<(IndexedChampion | null)[]>>;
}

type SortType = "korean" | "tier";

export const borderColorStyles: { [key: string]: string } = {
  "0": "border-tier-1",
  "1": "border-tier-1",
  "2": "border-tier-2",
  "3": "border-tier-3",
  "4": "border-tier-4",
  "5": "border-tier-5",
};

function ChampionList(props: ChampionListProps) {
  const { hidden, setPlacedChampions } = props;

  const { setDraggingTarget } = useDragActions();

  const [currentSortType, setCurrentSortType] = useState<SortType>("tier");
  const [championList, setChampionList] = useState(sortbyTierAndKorean);
  const [keyword, setKeyword] = useState("");

  function sortChampionList(sortType: SortType) {
    setCurrentSortType(sortType);
    switch (sortType) {
      case "korean":
        setChampionList(sortByKorean(SET_12_CHAMPIONS, "name"));

        break;
      case "tier":
        setChampionList(sortbyTierAndKorean());
    }
  }

  function sortbyTierAndKorean() {
    const result: Champion[] = [];
    CHAMPION_TIER.forEach((tier) =>
      sortByKorean(
        SET_12_CHAMPIONS.filter((cham) => cham.tier === tier),
        "name"
      ).forEach((item) => result.push(item))
    );

    return result;
  }

  function handleIconDragStart(e: any, champion: Champion) {
    //console.log(e, "드래그 한다잉");
    setDraggingTarget(champion);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function filteringByKeyword() {
    const filtered = SET_12_CHAMPIONS.filter(
      (item) =>
        item.name.includes(keyword) ||
        item.synergy.some((synergy) => synergy.name.includes(keyword))
      // 시너지까지 필터링이 되게 하려면 아래에 더해 similarity를 검사할 수 있어야 하는데
      //  추후로 미뤄둠
      // getChoseong(item.name).includes(getChoseong(keyword)) ||
      // item.synergy.some((synergy) =>
      //   getChoseong(synergy.name).includes(getChoseong(keyword))
      // )
    );

    return filtered;
  }

  function addPlacedChampionViaClick(champion: Champion) {
    setPlacedChampions((prev) =>
      setItemToindex(
        prev,
        prev.indexOf(null),
        generateIndexdChampion(champion, prev.indexOf(null))
      )
    );
  }

  useEffect(() => {
    if (keyword === "") {
      sortChampionList(currentSortType);
    } else {
      setChampionList(filteringByKeyword);
    }
  }, [keyword]);

  return (
    <div className="bg-[#ffffff05] rounded-md border-[#222] border">
      <OverlayTab className="flex !px-md gap-sm">
        <SortButton
          currentSortType={currentSortType}
          sortType="tier"
          onClickFn={() => sortChampionList("tier")}
        >
          등급순
        </SortButton>
        <SortButton
          currentSortType={currentSortType}
          sortType="korean"
          onClickFn={() => sortChampionList("korean")}
        >
          가나다순
        </SortButton>
        <input
          onChange={onChange}
          placeholder="챔피언, 시너지..."
          className="bg-default-bg text-[#888] bg-inherit text-sm ml-auto border border-[#888] rounded-md pt-xxxs px-xxs"
          value={keyword}
        ></input>
      </OverlayTab>
      <div className="p-md">
        <div
          className={cn(
            "relative grid gap-xxs p-md max-h-[400px] rounded-[4px] overflow-auto grid-cols-[repeat(auto-fill,minmax(64px,1fr))]",
            "mo:max-h-[200px] mo:gap-xxs mo:grid-cols-[repeat(auto-fill,minmax(45px,1fr))]",
            ""
          )}
        >
          {championList.map((champion, idx) => (
            <ChampionListItem
              key={`championList-${champion.name}`}
              champion={champion}
              handleIconDragStart={handleIconDragStart}
              addPlacedChampionViaClick={addPlacedChampionViaClick}
            />
          ))}
          {keyword !== "" && championList.length === 0 && (
            <p className="absolute y-center x-center text-[#888] text-sm">
              일치하는 챔피언이 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChampionList;

interface ChampionListItemProps {
  champion: Champion;
  handleIconDragStart: (e: any, champion: Champion) => void;
  addPlacedChampionViaClick: (champion: Champion) => void;
}

function ChampionListItem(props: ChampionListItemProps) {
  const { champion, handleIconDragStart, addPlacedChampionViaClick } = props;

  const { tooltipContainerRef, pos, isTooltipOn, tooltipOn, tooltipOff } =
    useToolTip();

  function drageStart(e: any, champion: any) {
    handleIconDragStart(e, champion);
    tooltipOff();
  }
  return (
    <div
      onClick={() => addPlacedChampionViaClick(champion)}
      onMouseEnter={tooltipOn}
      onMouseLeave={tooltipOff}
      onDragStart={(e) => drageStart(e, champion)}
      className="relative cursor-pointer"
      ref={tooltipContainerRef}
    >
      <ToolTip
        className="!p-0 !border-none !bg-[#00000000]"
        isOn={isTooltipOn}
        x={pos.x}
        y={pos.y}
      >
        <ChampionTooltip
          leftClickGuide="배치"
          dragGuide="배치"
          champion={champion}
        />
      </ToolTip>
      <ChampionPortrait
        key={champion.id}
        className="pc:size-[64px] mo:size-[40px] tab:size-[56px]"
        champion={champion}
        objectPosition={
          champion.name === TRAINING_BOT.name
            ? ""
            : "object-[-55px_0px] mo:object-[-32px_0px]"
        }
      >
        <div className="z-[100] pointer-events-none absolute w-full top-0 flex justify-end ">
          <div className="mo:hidden pointer-events-none flex items-center gap-xxxs bg-[#00000099] rounded-[4px] px-[2px]">
            <Token size={10} className="fill-white" />{" "}
            <span className="text-main-text text-[11px]">{champion.tier}</span>
          </div>
        </div>
        <p
          className={cn(
            "pointer-events-none absolute bottom-0 text-center w-full text-main-text font-semibold text-[11px] bg-[#00000099]",
            "mo:text-[8px]"
          )}
        >
          {champion.name}
        </p>
      </ChampionPortrait>
      {/* <Image
          width={256}
          height={128}
          alt={champion.name}
          src={CHAMPION_ICON_URL(champion.src)}
          className={cn("object-cover relative object-[-55px_0px] scale-125")}
        /> */}
    </div>
  );
}

interface SortButtonProps extends HTMLAttributes<HTMLButtonElement> {
  sortType: SortType;
  currentSortType: SortType;
  onClickFn: (sortType: SortType) => void;
}

function SortButton(props: SortButtonProps) {
  const { sortType, onClickFn, children, className, currentSortType } = props;

  return (
    <button
      className={cn(
        className,
        "text-sm button",
        sortType === currentSortType && "font-semibold button-active"
      )}
      onClick={() => onClickFn(sortType)}
    >
      {children}
    </button>
  );
}
