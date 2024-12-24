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
import { IndexedChampion } from "../field/Field";
import ChampionPortrait from "../portraits/ChampionPortrait";
import { Token } from "../svgs";
import ChampionTooltip from "../tooltips/ChampionTooltip";
import { PortalTooltip, usePortalTooltip } from "../tooltips/PortalTooltip";
import { OverlayProps, OverlayTab } from "../overlay/Overlay";
import ChampionListHeader from "./ChampionListHeader";
import ChampionListItem from "./ChampionListItem";

interface ChampionListProps extends OverlayProps {
  setPlacedChampions: Dispatch<SetStateAction<(IndexedChampion | null)[]>>;
}

export type SortType = "korean" | "tier";

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

  const [sort, setSort] = useState<SortType>("tier");
  const [keyword, setKeyword] = useState("");

  const championList = filteringChampionList(SET_12_CHAMPIONS, sort, keyword);

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

  function addPlacedChampionViaClick(champion: Champion) {
    setPlacedChampions((prev) =>
      setItemToindex(
        prev,
        prev.indexOf(null),
        generateIndexedChampion(champion, prev.indexOf(null))
      )
    );
  }

  return (
    <div className="bg-content-bg rounded-md border-[#222] border">
      <ChampionListHeader
        keyword={keyword}
        sort={sort}
        setKeyword={setKeyword}
        setSort={setSort}
      />
      <div className="p-md">
        <div className="min-h-[400px] relative">
          {/* 실제 리스트 */}
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

/**
 * 챔피언 리스트를 렌더링 하기 위해
 * 등급순, 가나다순, 키워드별의 정렬과 필터링을 거쳐
 * 반환해주는 함수
 */
function filteringChampionList(
  list: Champion[],
  sortType: SortType,
  keyword: string
) {
  let result = list;

  // 먼저 인자로 받은 챔피언 리스트를 등급순, 가나다 순 정렬
  if (sortType === "korean") {
    result = sortByKorean(list, "name");
  } else {
    const sortByTier: Champion[] = [];

    CHAMPION_TIER.forEach((tier) =>
      sortByKorean(
        SET_12_CHAMPIONS.filter((cham) => cham.tier === tier),
        "name"
      ).forEach((item) => sortByTier.push(item))
    );
    result = sortByTier;
  }

  // 그리고 키워트가 존재하면 정렬된 챔피언 리스트에서 필터링을 거침
  if (keyword !== "") {
    const filtered = result.filter(
      (item) =>
        item.name.includes(keyword) ||
        item.synergy.some((synergy) => synergy.name.includes(keyword))
    );

    result = filtered;
  }

  return result;
}
