"use client";

import useSetDataNew, { ChampionJson } from "@/hooks/useSetDataNew";
import {
  useBuilderActions,
  useIndexedChampionList,
} from "@/store/BuilderStore";
import { useDragActions } from "@/store/dragStore";
import { cn, generateIndexedChampion, sortByKorean } from "@/utils";
import { useState } from "react";
import { OverlayProps } from "../overlay/Overlay";
import ChampionListHeader from "./ChampionListHeader";
import ChampionListItem from "./ChampionListItem";

interface ChampionListProps extends OverlayProps {}

export type SortType = "korean" | "tier";

function ChampionList(props: ChampionListProps) {
  const { hidden } = props;

  const { setDraggingTarget } = useDragActions();

  const [sort, setSort] = useState<SortType>("tier");
  const [keyword, setKeyword] = useState("");

  const { championDataList, traitDataList, currentChampionTier } =
    useSetDataNew();
  const indexedChampionList = useIndexedChampionList();
  const { setIndexedChampionList } = useBuilderActions();

  // const championList = filteringChampionList(championDataList, sort, keyword);
  const championList = filteringChampionList(
    championDataList,
    sort,
    keyword,
    currentChampionTier
  );
  console.log(traitDataList);
  function handleIconDragStart(e: any, champion: ChampionJson) {
    setDraggingTarget(champion);
  }

  function addPlacedChampionViaClick(champion: ChampionJson) {
    const cloneArray = [...indexedChampionList];
    const targetIndex = indexedChampionList.indexOf(null);
    cloneArray[targetIndex] = generateIndexedChampion(champion, targetIndex);
    setIndexedChampionList(cloneArray);
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
  list: ChampionJson[],
  sortType: SortType,
  keyword: string,
  currentChampionTierList: number[]
) {
  let result = list;

  // 먼저 인자로 받은 챔피언 리스트를 등급순, 가나다 순 정렬
  if (sortType === "korean") {
    result = sortByKorean(list, "name");
  } else {
    const sortByTier: ChampionJson[] = [];

    currentChampionTierList.forEach((tier) =>
      sortByKorean(
        list.filter((cham) => cham.cost === tier),
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
        item.traits.some((trait) => trait.includes(keyword))
    );

    result = filtered;
  }

  return result;
}
