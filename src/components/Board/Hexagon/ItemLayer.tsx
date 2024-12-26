import ItemPortrait from "@/components/portraits/ItemPortrait";
import { PlacedChampion } from ".";
import { MouseEvent } from "react";
import { cn } from "@/utils";

interface ItemLayerProps {
  placedChampion: PlacedChampion;
}

function ItemLayer(props: ItemLayerProps) {
  const { placedChampion } = props;

  function handleItemRightClick(
    event: MouseEvent<HTMLImageElement>,
    idx: number
  ) {
    event.stopPropagation();
    event.preventDefault();

    if (!placedChampion) return;

    let ClonedPlacedChampion = structuredClone(placedChampion);

    const targetItem = placedChampion.itemList[idx];

    // 제거 아이템이 상징인 경우
    // 적용된 시너지도 함께 제거
    if (targetItem.name.includes("상징")) {
      const newSynergyList = placedChampion.champion.traits.filter(
        (item) => item !== targetItem.src
      );
      ClonedPlacedChampion.champion.traits = newSynergyList;
    }

    const newIndexedChampion = {
      ...ClonedPlacedChampion,
      itemList: [...ClonedPlacedChampion.itemList!].filter(
        (_, index) => index !== idx
      ),
    };

    //   handleIndexItem(index, newIndexedChampion);
  }

  return (
    <div className="absolute flex w-full gap-xxxs bottom-0 justify-center">
      {placedChampion &&
        placedChampion.itemList.map((item, idx) => (
          <ItemPortrait
            noTooltip
            item={item}
            key={`${placedChampion}-${placedChampion.index}-${idx}-${item.id}`}
            onContextMenu={(event) => handleItemRightClick(event, idx)}
            className={cn("rounded-md cursor-pointer", "mo:size-[13px]")}
            width={20}
            height={20}
            rightClickGuide="해제"
          />
        ))}
    </div>
  );
}

export default ItemLayer;
