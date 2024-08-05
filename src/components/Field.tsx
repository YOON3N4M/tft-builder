import { Champion } from "@/constants/champions";
import { CHAMPION_ICON_URL } from "@/constants/url";
import { useDragActions, useDraggingTarget } from "@/store/dragStore";
import { cn } from "@/utils";
import Image from "next/image";
import { DragEvent, ReactNode, useRef, useState } from "react";

interface FieldProps {}

function Field(props: FieldProps) {
  const {} = props;

  const hexagonQty = 28;

  const tempArray = [...Array(hexagonQty)].map((_, idx) => idx);

  function isEvenRow(idx: number): boolean {
    return (idx > 6 && idx < 14) || idx > 20;
  }

  return (
    <div className="grid grid-cols-7 gap-xs w-[700px] gap-y-0 h-min translate-x-[-10%]">
      {tempArray.map((item, idx) => (
        <Hexagon key={idx} isEvenRow={isEvenRow(idx)}></Hexagon>
      ))}
    </div>
  );
}

export default Field;

interface HexagonProps {
  children?: ReactNode;
  isEvenRow: boolean;
}

const backgroundColorStyles: { [key: string]: string } = {
  "1": "bg-tier-1",
  "2": "bg-tier-2",
  "3": "bg-tier-3",
  "4": "bg-tier-4",
  "5": "bg-tier-5",
};

function Hexagon(props: HexagonProps) {
  const { children, isEvenRow } = props;

  const { setDraggingTarget } = useDragActions();

  const draggingChampion = useDraggingTarget();

  const [placedChampion, setPlacedChampion] = useState<Champion | null>(null);
  const [isDragEnter, setIsDragEnter] = useState(false);

  function onDragEnter(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    setIsDragEnter(true);
  }

  function onDrageLeave() {
    setIsDragEnter(false);
  }

  function onDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function onDragDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    // setIsDragEnter(false);

    if (draggingChampion) {
      console.log("챔피언 배치");
      setPlacedChampion(draggingChampion as Champion);
    } else {
      console.log("챔피언 없음");
    }
    setDraggingTarget(null);
  }

  return (
    <div
      className={cn(
        "hexagon w-[84px] h-[96px] bg-[#d0d2d5] relative flex justify-center items-center ",
        isEvenRow && "translate-x-[55%]",
        isDragEnter && "bg-black",
        placedChampion && backgroundColorStyles[placedChampion.tier.toString()]
      )}
    >
      <div
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDrageLeave}
        onDrop={onDragDrop}
        className="hexagon size-[90%] relative"
      >
        {placedChampion && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
