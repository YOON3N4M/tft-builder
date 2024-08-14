"use client";

import { Champion, SET_12_CHAMPIONS } from "@/constants/champions";
import { useDragActions } from "@/store/dragStore";
import { cn, sortByKorean, sortByNumber } from "@/utils";
import { HTMLAttributes, useState } from "react";
import ChampionPortrait from "../ChampionPortrait";
import { Token } from "../svgs";
import ChampionTooltip from "../tooltips/ChampionTooltip";
import { ToolTip, useToolTip } from "../tooltips/ToolTip";
import { Overlay, OverlayProps, OverlayTab } from "./Overlay";

interface ChampionListProps extends OverlayProps {}

type SortType = "korean" | "tier";

export const borderColorStyles: { [key: string]: string } = {
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

  return (
    <Overlay className="mo:w-full " hidden={hidden}>
      <OverlayTab className="flex pc:min-w-[465px] !px-xxl gap-sm">
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
      </OverlayTab>
      <div className="p-md drag-unable">
        <div
          className={cn(
            "grid grid-cols-6 gap-xs p-md bg-default-bg rounded-[4px]",
            "mo:grid-cols-10 mo:max-h-[200px] mo:overflow-auto"
          )}
        >
          {championList.map((champion, idx) => (
            <ChampionListItem
              key={champion.name}
              champion={champion}
              handleIconDragStart={handleIconDragStart}
            />
          ))}
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

  const { pos, isTooltipOn, tooltipOn, tooltipOff } = useToolTip();

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
    >
      <ToolTip isOn={isTooltipOn} x={pos.x} y={pos.y}>
        <ChampionTooltip champion={champion} />
      </ToolTip>
      <ChampionPortrait
        key={champion.id}
        className="size-[64px] mo:size-[40px]"
        champion={champion}
        objectPosition="object-[-55px_0px] mo:object-[-32px_0px]"
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
        "text-sm",
        sortType === currentSortType && "font-bold"
      )}
      onClick={() => onClickFn(sortType)}
    >
      {children}
    </button>
  );
}
