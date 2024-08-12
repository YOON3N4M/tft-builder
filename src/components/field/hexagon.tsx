import { Champion } from "@/constants/champions";
import { CHAMPION_ICON_URL, ITEM_ICON_URL } from "@/constants/url";
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
  useState,
} from "react";
import ChampionTooltip from "../tooltip/ChampionTooltip";
import { ToolTip, useToolTip } from "../tooltip/ToolTip";
import { IndexedChampion } from "./Field";

interface HexagonProps {
  children?: ReactNode;
  isEvenRow: boolean;
  setPlacedChampions: Dispatch<SetStateAction<IndexedChampion[]>>;
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
  const { isEvenRow, setPlacedChampions, index } = props;

  const { setDraggingCoreItem, setDraggingTarget, setDraggingIndexedChampion } =
    useDragActions();

  const { pos, isTooltipOn, tooltipOn, tooltipOff } = useToolTip();
  const draggingChampion = useDraggingTarget();
  const draggingIndexedChampion = useDraggingIndexedChampion();
  const draggingCoreItem = useDraggingCoreItem();

  const { isDragEnter, onDragEnter, onDragLeave, onDragOver, onDragEnd } =
    useDragEvent();

  const [placedChampion, setPlacedChampion] = useState<IndexedChampion | null>(
    null
  );

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
    setPlacedChampion(null);
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
    setPlacedChampion(
      (prev) =>
        ({
          ...prev,
          itemList: [...prev?.itemList!, draggingCoreItem],
        } as IndexedChampion)
    );
  }

  function handleChampionDrop() {
    if (draggingChampion) {
      // 챔피언 리스트에서 드래그 할 경우

      const indexed = {
        index,
        champion: draggingChampion as Champion,
        itemList: [],
      };
      setPlacedChampion(indexed);
      setPlacedChampions((prev) => [...prev, indexed]);
      setDraggingTarget(null);
    }

    // 이미 배치된 챔피언을 이동 시킬때
    if (draggingIndexedChampion) {
      const newIndex = { ...draggingIndexedChampion, index };
      console.log(newIndex);
      setPlacedChampion(newIndex);
      setPlacedChampions((prev) =>
        [...prev, newIndex].filter(
          (prevSecond) => prevSecond.index !== draggingIndexedChampion.index
        )
      );
      setDraggingIndexedChampion(null);
    }
  }

  function onChampionRightClick(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    removeChampion();
  }

  function removeChampion() {
    setPlacedChampion(null);
    setPlacedChampions((prev) => prev.filter((item) => item.index !== index));
  }

  function handleItemRightClick(
    event: MouseEvent<HTMLImageElement>,
    idx: number
  ) {
    event.stopPropagation();
    event.preventDefault();

    setPlacedChampion(
      (prev) =>
        ({
          ...prev,
          itemList: [...prev?.itemList!].filter((_, index) => index !== idx),
        } as IndexedChampion)
    );
  }

  return (
    <div className={cn("relative w-[84px]", isEvenRow && "translate-x-[55%]")}>
      <div
        className={cn(
          "hexagon w-[84px] cursor-pointer h-[96px] bg-[#d0d2d5] relative flex justify-center items-center",
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
                src={CHAMPION_ICON_URL(placedChampion.champion.src)}
                alt={placedChampion.champion.name}
                className="object-cover absolute center w-full h-full object-[-87px_0px]"
              />
              <div className="absolute pointer-events-none flex flex-col bottom-[15%] text-center w-full text-white font-semibold text-[11px] bg-[#00000099]">
                <p>{placedChampion.champion.name}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="absolute flex w-full gap-xxxs bottom-0 justify-center">
        {placedChampion &&
          placedChampion.itemList.map((item, idx) => (
            <Image
              onContextMenu={(event) => handleItemRightClick(event, idx)}
              key={`${placedChampion}-${index}-${item.id}`}
              src={ITEM_ICON_URL(item.src)}
              width={20}
              height={20}
              alt={item.name}
              className="rounded-md cursor-pointer"
            ></Image>
          ))}
      </div>
    </div>
  );
}
