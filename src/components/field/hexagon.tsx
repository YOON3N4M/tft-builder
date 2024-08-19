import { Champion, TRAINING_BOT } from "@/constants/champions";
import {
  CHAMPION_ICON_URL,
  ITEM_ICON_URL,
  TRAINING_BOT_ICON_URL,
} from "@/constants/url";
import useDragEvent from "@/hooks/useDragEvent";
import {
  useDragActions,
  useDraggingCoreItem,
  useDraggingIndexedChampion,
  useDraggingTarget,
} from "@/store/dragStore";
import { cn } from "@/utils";
import Image from "next/image";
import {
  Dispatch,
  DragEvent,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useEffect,
} from "react";
import ChampionTooltip from "../tooltips/ChampionTooltip";
import { ToolTip, useToolTip } from "../tooltips/ToolTip";
import { IndexedChampion } from "./Field";
import { SYNERGY_LIST, Synergy } from "@/constants/synergy";
import ItemPortrait from "../ItemPortrait";

export type PlacedChampion = IndexedChampion | null;

interface HexagonProps {
  placedChampion: PlacedChampion;
  children?: ReactNode;
  isEvenRow: boolean;
  setPlacedChampions: Dispatch<SetStateAction<PlacedChampion[]>>;
  index: number;
}

const backgroundColorStyles: { [key: string]: string } = {
  "1": "bg-tier-1",
  "2": "bg-tier-2",
  "3": "bg-tier-3",
  "4": "bg-tier-4",
  "5": "bg-tier-5",
};

export default function Hexagon(props: HexagonProps) {
  const { placedChampion, isEvenRow, setPlacedChampions, index } = props;

  const isTrainingBot = placedChampion?.champion.name === TRAINING_BOT.name;

  const { setDraggingCoreItem, setDraggingTarget, setDraggingIndexedChampion } =
    useDragActions();

  const { pos, isTooltipOn, tooltipOn, tooltipOff } = useToolTip();
  const draggingChampion = useDraggingTarget();
  const draggingIndexedChampion = useDraggingIndexedChampion();
  const draggingCoreItem = useDraggingCoreItem();

  const { isDragEnter, onDragEnter, onDragLeave, onDragOver, onDragEnd } =
    useDragEvent();

  function handleIndexItem(idx: number, item: IndexedChampion | null) {
    setPlacedChampions((prev) => {
      const cloneArray = [...prev];

      cloneArray[idx] = item;

      return cloneArray;
    });
  }

  function handleDragStart() {
    tooltipOff();
    if (!placedChampion) return;

    setDraggingIndexedChampion(placedChampion);
  }

  function handleDragEnter(event: DragEvent<HTMLDivElement>) {
    onDragEnter(event);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    onDragLeave(event);
  }

  function handleDragDrop(event: DragEvent<HTMLDivElement>) {
    event.stopPropagation();
    event.preventDefault();
    onDragEnd(event);

    handleChampionDrop();
  }

  function handleDragEnd(event: MouseEvent<HTMLDivElement>) {
    handleIndexItem(index, null);
    setDraggingTarget(null);
    setDraggingIndexedChampion(null);
  }

  function handleItemDrop() {
    if (!draggingCoreItem) return;
    if (!placedChampion) return;
    if (placedChampion.itemList.length !== 0) {
      if (draggingCoreItem.name === "도적의 장갑") {
        alert("도적의 장갑은 단독으로만 장착 가능합니다.");
        return;
      }
    }
    if (placedChampion.itemList.some((item) => item.name === "도적의 장갑")) {
      alert("도적의 장갑은 단독으로만 장착 가능합니다.");
      return;
    }
    if (placedChampion?.itemList.length > 2) {
      alert("아이템은 최대 3개까지 장착 가능합니다.");
      return;
    }

    const championWithItem = {
      ...placedChampion,
      itemList: [...placedChampion.itemList, draggingCoreItem],
    };

    //상징인 경우
    if (draggingCoreItem.name.includes("상징")) {
      const synergy = SYNERGY_LIST.find(
        (item) => item.src[0] === draggingCoreItem.src
      ) as Synergy;

      // 시너지 중복체크
      const isExist = championWithItem.champion.synergy.some(
        (item) => item.name === synergy.name
      );
      if (isExist) {
        alert("이미 해당 시너지를 가진 챔피언 입니다.");
        return;
      }

      championWithItem.champion.synergy.push(synergy);
    }

    handleIndexItem(index, championWithItem);
  }

  function handleChampionDrop() {
    if (draggingChampion) {
      // 챔피언 리스트에서 드래그 할 경우

      const clonedChampion = structuredClone(draggingChampion);

      const indexed = {
        index,
        champion: clonedChampion as Champion,
        itemList: [],
      };

      setPlacedChampions((prev) => {
        const cloneArray = [...prev];

        cloneArray[index] = indexed;

        return cloneArray;
      });
      setDraggingTarget(null);
    }

    // 이미 배치된 챔피언을 이동 시킬때
    if (draggingIndexedChampion) {
      const newIndex = { ...draggingIndexedChampion, index };

      handleIndexItem(index, newIndex);
      setDraggingIndexedChampion(null);
    }
  }

  function onChampionRightClick(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    removeChampion();
  }

  function removeChampion() {
    handleIndexItem(index, null);
  }

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
      const newSynergyList = placedChampion.champion.synergy.filter(
        (item) => item.src[0] !== targetItem.src
      );
      ClonedPlacedChampion.champion.synergy = newSynergyList;
    }

    const newIndexedChampion = {
      ...ClonedPlacedChampion,
      itemList: [...ClonedPlacedChampion.itemList!].filter(
        (_, index) => index !== idx
      ),
    };

    handleIndexItem(index, newIndexedChampion);
  }

  return (
    <div
      className={cn(
        "relative pc:w-[84px]",
        "mo:w-[40px]",
        isEvenRow && "translate-x-[55%]"
      )}
    >
      <div
        className={cn(
          "hexagon w-[84px] cursor-pointer h-[96px] bg-[#d0d2d5] relative flex justify-center items-center",
          "mo:w-[40px] mo:h-[45px] ",
          isDragEnter && "bg-blue-300",
          placedChampion &&
            backgroundColorStyles[placedChampion.champion.tier.toString()]
        )}
      >
        <div
          onContextMenu={onChampionRightClick}
          onDragEnter={handleDragEnter}
          onDragOver={onDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDragDrop}
          className="hexagon size-[90%] relative"
        >
          {placedChampion?.champion && placedChampion && (
            <div onMouseEnter={tooltipOn} onMouseLeave={tooltipOff}>
              <ToolTip isOn={isTooltipOn} x={pos.x} y={pos.y}>
                <ChampionTooltip champion={placedChampion.champion} />
              </ToolTip>
              <Image
                onDragOver={onDragOver}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrop={handleItemDrop}
                width={256}
                height={128}
                src={
                  isTrainingBot
                    ? TRAINING_BOT_ICON_URL()
                    : CHAMPION_ICON_URL(placedChampion.champion.src)
                }
                alt={placedChampion.champion.name}
                className={cn(
                  "absolute center w-full h-full",
                  !isTrainingBot &&
                    "object-cover object-[-86px_0px] mo:object-[-37px_0px]"
                )}
                quality={90}
              />
              <div className="absolute pointer-events-none flex flex-col bottom-[15%] text-center w-full text-white font-semibold text-[11px] bg-[#00000099]">
                <p className="mo:text-[8px]">{placedChampion.champion.name}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="absolute flex w-full gap-xxxs bottom-0 justify-center">
        {placedChampion &&
          placedChampion.itemList.map((item, idx) => (
            <ItemPortrait
              noTooltip
              item={item}
              key={`${placedChampion}-${index}-${item.id}`}
              onContextMenu={(event) => handleItemRightClick(event, idx)}
              className={cn("rounded-md cursor-pointer", "mo:size-[13px]")}
              width={20}
              height={20}
            />
          ))}
      </div>
    </div>
  );
}
