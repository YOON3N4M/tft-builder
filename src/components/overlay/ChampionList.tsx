"use client";

import { Champion, SET_12_CHAMPIONS } from "@/constants/champions";
import { CHAMPION_ICON_URL } from "@/constants/url";
import { useDragActions } from "@/store/dragStore";
import { cn, sortByKorean, sortByNumber } from "@/utils";
import Image from "next/image";
import { HTMLAttributes, useState } from "react";
import { Token } from "../svgs";
import { Overlay, OverlayProps, OverlayTab } from "./Overlay";

interface ChampionListProps extends OverlayProps {}

type SortType = "korean" | "tier";

const borderColorStyles: { [key: string]: string } = {
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
    console.log(e, "드래그 한다잉");

    setDraggingTarget(champion);
  }

  return (
    <Overlay hidden={hidden}>
      <OverlayTab className="flex !px-xxl gap-sm">
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
      <div className="p-md">
        <div className="flex flex-wrap max-w-[600px] gap-xs p-md bg-default-bg rounded-[4px]">
          {championList.map((champion, idx) => (
            <div
              onDragStart={(e) => handleIconDragStart(e, champion)}
              key={champion.id}
              className={cn(
                "cursor-pointer size-[64px] flex border-2 rounded-[4px] relative overflow-hidden",
                borderColorStyles[champion.tier.toString()]
              )}
            >
              <div className="z-[100] absolute w-full top-0 flex justify-end ">
                <div className="flex items-center gap-xxxs bg-[#00000099] rounded-[4px] px-[2px]">
                  <Token size={10} className="fill-white" />{" "}
                  <span className="text-white text-[11px]">
                    {champion.tier}
                  </span>
                </div>
              </div>
              <Image
                width={256}
                height={128}
                alt={champion.name}
                src={CHAMPION_ICON_URL(champion.src)}
                className={cn(
                  "object-cover relative object-[-55px_0px] scale-125"
                )}
              />
              <p className="absolute bottom-0 text-center w-full text-white font-semibold text-[11px] bg-[#00000099]">
                {champion.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Overlay>
  );
}

export default ChampionList;

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
