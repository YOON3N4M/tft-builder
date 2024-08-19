"use client";

import {
  Champion,
  SET_12_CHAMPIONS,
  TRAINING_BOT,
} from "@/constants/champions";
import { useDragActions } from "@/store/dragStore";
import { cn, sortByKorean, sortByNumber } from "@/utils";
import { ChangeEvent, HTMLAttributes, useEffect, useState } from "react";
import ChampionPortrait from "../ChampionPortrait";
import { Token } from "../svgs";
import ChampionTooltip from "../tooltips/ChampionTooltip";
import { ToolTip, useToolTip } from "../tooltips/ToolTip";
import { Overlay, OverlayProps, OverlayTab } from "./Overlay";
import { getChoseong } from "es-hangul";

interface ChampionListProps extends OverlayProps {}

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
  const { hidden } = props;

  const { setDraggingTarget } = useDragActions();

  const [currentSortType, setCurrentSortType] = useState<SortType>("korean");
  const [championList, setChampionList] = useState(
    sortByKorean(SET_12_CHAMPIONS, "name")
  );
  const [keyword, setKeyword] = useState("");

  function sortChampionList(sortType: SortType) {
    setCurrentSortType(sortType);
    switch (sortType) {
      case "korean":
        setChampionList(sortByKorean(SET_12_CHAMPIONS, "name"));

        break;
      case "tier":
        setChampionList(sortByNumber(SET_12_CHAMPIONS, "tier"));
    }
  }

  function handleIconDragStart(e: any, champion: Champion) {
    //console.log(e, "드래그 한다잉");
    setDraggingTarget(champion);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function filteringByKeyword() {
    console.log(keyword);
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

    console.log(filtered);
    return filtered;
  }

  useEffect(() => {
    if (keyword === "") {
      sortChampionList(currentSortType);
    } else {
      setChampionList(filteringByKeyword);
    }
  }, [keyword]);

  return (
    <Overlay className="mo:w-full " hidden={hidden}>
      <OverlayTab className="flex pc:min-w-[465px] !px-md gap-sm">
        <SortButton
          currentSortType={currentSortType}
          sortType="korean"
          onClickFn={() => sortChampionList("korean")}
        >
          가나다순
        </SortButton>

        <SortButton
          currentSortType={currentSortType}
          sortType="tier"
          onClickFn={() => sortChampionList("tier")}
        >
          등급순
        </SortButton>
        <input
          onChange={onChange}
          placeholder="챔피언, 시너지..."
          className="bg-default-bg text-sm ml-auto border rounded-md pt-xxxs px-xxs"
          value={keyword}
        ></input>
      </OverlayTab>
      <div className="p-md drag-unable">
        <div
          className={cn(
            "relative grid grid-cols-6 gap-xs p-md bg-default-bg max-h-[400px] rounded-[4px] overflow-auto",
            "mo:grid-cols-8 mo:max-h-[200px] "
          )}
        >
          {championList.map((champion, idx) => (
            <ChampionListItem
              key={champion.name}
              champion={champion}
              handleIconDragStart={handleIconDragStart}
            />
          ))}
          {keyword !== "" && championList.length === 0 && (
            <p className="absolute y-center x-center text-gray-500 text-sm">
              일치하는 챔피언이 없습니다.
            </p>
          )}
        </div>
      </div>
    </Overlay>
  );
}

export default ChampionList;

interface ChampionListItemProps {
  champion: Champion;
  handleIconDragStart: (e: any, champion: Champion) => void;
}

function ChampionListItem(props: ChampionListItemProps) {
  const { champion, handleIconDragStart } = props;

  const { tooltipContainerRef, pos, isTooltipOn, tooltipOn, tooltipOff } =
    useToolTip();

  function drageStart(e: any, champion: any) {
    handleIconDragStart(e, champion);
    tooltipOff();
  }
  return (
    <div
      onMouseEnter={tooltipOn}
      onMouseLeave={tooltipOff}
      onDragStart={(e) => drageStart(e, champion)}
      className="relative cursor-pointer"
      ref={tooltipContainerRef}
    >
      <ToolTip isOn={isTooltipOn} x={pos.x} y={pos.y}>
        <ChampionTooltip champion={champion} />
      </ToolTip>
      <ChampionPortrait
        key={champion.id}
        className="size-[64px] mo:size-[40px]"
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
            <span className="text-white text-[11px]">{champion.tier}</span>
          </div>
        </div>
        <p
          className={cn(
            "pointer-events-none absolute bottom-0 text-center w-full text-white font-semibold text-[11px] bg-[#00000099]",
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
        "text-sm py-xxs px-xs rounded-md",
        sortType === currentSortType && "font-semibold bg-gray-200"
      )}
      onClick={() => onClickFn(sortType)}
    >
      {children}
    </button>
  );
}
