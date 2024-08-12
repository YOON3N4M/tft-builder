import { Champion } from "@/constants/champions";
import { CHAMPION_ICON_URL } from "@/constants/url";
import useDragEvent from "@/hooks/useDragEvent";
import {
  useDragActions,
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

  const { setDraggingTarget, setDraggingIndexedChampion } = useDragActions();

  const draggingChampion = useDraggingTarget();
  const draggingIndexedChampion = useDraggingIndexedChampion();

  const { isDragEnter, onDragEnter, onDragLeave, onDragOver, onDragEnd } =
    useDragEvent();

  const [placedChampion, setPlacedChampion] = useState<IndexedChampion | null>(
    null
  );

  function handleDragStart() {
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

  function handleDragEnd(event: MouseEvent<HTMLDivElement>) {
    setPlacedChampion(null);
    setDraggingTarget(null);
    setDraggingIndexedChampion(null);
  }

  function removeChampion() {
    setPlacedChampion(null);
    setPlacedChampions((prev) => prev.filter((item) => item.index !== index));
  }

  return (
    <div className={cn("relative", isEvenRow && "translate-x-[55%]")}>
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
          {placedChampion && (
            <div className="">
              <Image
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                width={256}
                height={128}
                src={CHAMPION_ICON_URL(placedChampion.champion.src)}
                alt={placedChampion.champion.name}
                className="object-cover absolute center w-full h-full object-[-87px_0px]"
              />
              <p className="absolute bottom-[15%] text-center w-full text-white font-semibold text-[11px] bg-[#00000099]">
                {placedChampion.champion.name}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
