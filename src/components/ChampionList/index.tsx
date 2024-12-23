"use client";

import {
  CHAMPION_TIER,
  Champion,
  SET_12_CHAMPIONS,
} from "@/data/set/12/champions";
import { useDragActions } from "@/store/dragStore";
import {
  cn,
  generateIndexedChampion,
  setItemToindex,
  sortByKorean,
} from "@/utils";
import {
  ChangeEvent,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import ChampionListItem from "../ChampionList/ChampionListItem";
import { IndexedChampion } from "../field/Field";
import { OverlayProps, OverlayTab } from "../overlay/Overlay";

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
  const { setPlacedChampions } = props;

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
        generateIndexedChampion(champion, prev.indexOf(null))
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
    <div className="bg-content-bg rounded-md border-[#222] border">
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
          placeholder="챔피언, 특성..."
          className="bg-default-bg text-sub-text bg-inherit text-sm ml-auto border border-[#888] rounded-md pt-xxxs px-xxs"
          value={keyword}
        ></input>
      </OverlayTab>
      <div className="p-md">
        <div className="min-h-[400px] relative">
          <div
            className={cn(
              "grid gap-xxs p-md max-h-[400px] rounded-[4px] overflow-auto grid-cols-[repeat(auto-fill,minmax(64px,1fr))]",
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
              <p className="absolute y-center x-center text-sub-text text-sm">
                일치하는 챔피언이 없습니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
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
        "text-sm button",
        sortType === currentSortType && "font-semibold button-active"
      )}
      onClick={() => onClickFn(sortType)}
    >
      {children}
    </button>
  );
}
