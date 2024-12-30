import { checkTraitStyle, cn, filterNull, sortByNumber } from "@/utils";

import {
  IndexedChampion,
  IndexedChampionList,
  useIndexedChampionList,
} from "@/store/BuilderStore";

import TraitItem from "./TraitItem";
import useSetDataNew from "@/hooks/useSetDataNew";

interface TraitDisplayProps {}

function TraitDisplay(props: TraitDisplayProps) {
  const indexedChampionList = useIndexedChampionList();

  const { traitDataList } = useSetDataNew();

  const groupedTraitList = grouping(indexedChampionList);
  const isEmpty = groupedTraitList.length < 1;

  // 밸류가 높은 특성순으로 정렬
  const sortedByTraitStyle = groupedTraitList.sort((a, b) => {
    const aTrait = traitDataList.find((item) => item.name === a.traitName);
    const bTrait = traitDataList.find((item) => item.name === b.traitName);

    if (!aTrait || !bTrait) return -1;
    const aStyle = checkTraitStyle(a.championList.length, aTrait.effects);
    const bStyle = checkTraitStyle(b.championList.length, bTrait.effects);

    // 아마 5, 6코스트 챔피언들의 고유 특성의 스타일을 4(단계)라고 정의한듯
    // 때문에 예외적으로 4는 가장 앞으로 정렬
    if (aStyle === 4 && bStyle !== 4) return -1;
    if (bStyle === 4 && aStyle !== 4) return 1;

    return bStyle - aStyle;
  });
  return (
    <div
      className={cn(
        "pc:flex flex-col overflow-y-auto gap-sm pc:p-md tab:p-xs pc:max-h-[400px] tab:w-full pc:w-[90%] bg-content-bg border-[#222] border rounded-md",
        "pc:block mo:grid tab:grid mo:w-full mo:max-h-[200px] mo:overflow-auto mo:py-0",
        "tab:max-h-[200px]",
        isEmpty ? "justify-center" : "tab:grid-cols-3 mo:grid-cols-2"
      )}
    >
      {isEmpty && (
        <p className="text-sub-text text-xs place-self-center text-center">
          챔피언 배치시 특성이 활성화 됩니다.
        </p>
      )}
      {sortedByTraitStyle.map((trait, idx) => (
        <TraitItem groupedTrait={trait} key={`traitItem-${idx}`} />
      ))}
    </div>
  );
}

export default TraitDisplay;

/**
 * indexedChampionList를 인자로 받아
 *
 * 특성명과 해당하는 챔피언의 배열을 반환
 *
 * Ex. [{traitName: 반군, championList: [{아칼리},{징크스}]}]
 */
function grouping(indexedChampionList: IndexedChampionList) {
  const nullFiltered = filterNull(indexedChampionList) as IndexedChampion[];
  const dupleFiltered = removeDuplicateTrait(nullFiltered);
  const championList = dupleFiltered.map((indexed) => indexed.champion);

  const traitList = dupleFiltered.flatMap(
    (indexedChampion) => indexedChampion.champion.traits
  );
  const dupleFilteredTraitList = [...new Set(traitList)];

  const grouped = dupleFilteredTraitList.map((traitName) => {
    const res = {
      traitName: traitName,
      championList: championList.filter((champion) =>
        champion.traits.some((trait) => trait === traitName)
      ),
    };

    return res;
  });

  // const refinedSynergyList = groupBy(traitList, );
  //여기서 아이템 리스트 상징 처리를 한번 거쳐서 반환하면 될듯한데
  return grouped;
}

// 동일한 챔피언이 배치되어 있을때 중복제거
function removeDuplicateTrait(indexedChampionList: IndexedChampion[]) {
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
