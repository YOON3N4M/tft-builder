import { Champion } from "@/constants/champions";
import { CHAMPION_ICON_URL } from "@/constants/url";
import useDragEvent from "@/hooks/useDragEvent";
import { useDragActions, useDraggingTarget } from "@/store/dragStore";
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
import { useTooltip } from "../tooltip/Tooltip";
import SynergyContainer from "./SynergyContainer";

interface FieldProps {}

export interface IndexedChampion {
  index: number;
  champion: Champion;
}

const hexagonQty = 28;

const tempArray = [...Array(hexagonQty)].map((_, idx) => idx);

function Field(props: FieldProps) {
  const {} = props;

  const [placedChampions, setPlacedChampions] = useState<IndexedChampion[]>([]);

  function isEvenRow(idx: number): boolean {
    return (idx > 6 && idx < 14) || idx > 20;
  }

  return (
    <>
      <div className="text-black basis-[20%] flex">
        <SynergyContainer indexedChampionList={placedChampions} />
      </div>
      <div className="flex flex-grow justify-center">
        <div className="relative grid grid-cols-7 gap-xs w-[700px] gap-y-0 h-min">
          {placedChampions.length === 0 && (
            <div className="absolute x-center y-center z-[500] p-sm bg-white border rounded-md opacity-70">
              드래그해서 챔피언 배치
            </div>
          )}
          {tempArray.map((item, idx) => (
            <Hexagon
              setPlacedChampions={setPlacedChampions}
              key={idx}
              index={idx}
              isEvenRow={isEvenRow(idx)}
            ></Hexagon>
          ))}
        </div>
      </div>
    </>
  );
}

export default Field;

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

function Hexagon(props: HexagonProps) {
  const { children, isEvenRow, setPlacedChampions, index } = props;

  const { setDraggingTarget } = useDragActions();

  const draggingChampion = useDraggingTarget();

  const { isTooltipOn, tooltipOff, tooltipOn } = useTooltip();

  const { isDragEnter, onDragEnter, onDragLeave, onDragOver, onDragEnd } =
    useDragEvent();

  const [placedChampion, setPlacedChampion] = useState<Champion | null>(null);

  function handleDragDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    onDragEnd(event);

    if (draggingChampion) {
      //console.log("챔피언 배치");
      const indexed = {
        index,
        champion: draggingChampion as Champion,
      };
      setPlacedChampion(draggingChampion as Champion);
      setPlacedChampions((prev) => [...prev, indexed]);
    } else {
      //console.log("챔피언 없음");
    }
    setDraggingTarget(null);
  }

  function onChampionRightClick(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    removeChamion();
  }

  function removeChamion() {
    setPlacedChampion(null);
    setPlacedChampions((prev) => prev.filter((item) => item.index !== index));
  }

  return (
    <div className={cn("relative")}>
      <div className="relative">
        {placedChampion && (
          <ChampionTooltip
            isTooltipOn={isTooltipOn}
            champion={placedChampion}
            className={cn(isEvenRow && "translate-x-[30%]")}
          />
        )}
      </div>

      <div
        onMouseEnter={tooltipOn}
        onMouseLeave={tooltipOff}
        className={cn(
          "hexagon w-[84px] cursor-pointer h-[96px] bg-[#d0d2d5] relative flex justify-center items-center ",
          isEvenRow && "translate-x-[55%]",
          isDragEnter && "bg-blue-300",
          placedChampion &&
            backgroundColorStyles[placedChampion.tier.toString()]
        )}
      >
        <div
          onContextMenu={onChampionRightClick}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={handleDragDrop}
          className="hexagon size-[90%] relative"
        >
          {placedChampion && (
            <div className="">
              <Image
                width={256}
                height={128}
                src={CHAMPION_ICON_URL(placedChampion.src)}
                alt={placedChampion.name}
                className="object-cover absolute center w-full h-full object-[-87px_0px]"
              />
              <p className="absolute bottom-[15%] text-center w-full text-white font-semibold text-[11px] bg-[#00000099]">
                {placedChampion.name}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
