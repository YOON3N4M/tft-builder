import { Champion } from "@/constants/champions";
import { CHAMPION_ICON_URL } from "@/constants/url";
import { useDragActions, useDraggingTarget } from "@/store/dragStore";
import { cn, groupBy } from "@/utils";
import Image from "next/image";
import {
  Dispatch,
  DragEvent,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface FieldProps {}

interface IndexedChampion {
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
    <div className=" flex">
      <div className="text-black basis-[25%] flex justify-end">
        <SynergyContainer indexedChampionList={placedChampions} />
      </div>
      <div className="grid grid-cols-7 gap-xs w-[700px] gap-y-0 h-min">
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
  );
}

export default Field;

interface SynergyContainerProps {
  indexedChampionList: IndexedChampion[];
}

function SynergyContainer(props: SynergyContainerProps) {
  const { indexedChampionList } = props;

  const synergyList = indexedChampionList.flatMap(
    (indexedChampion) => indexedChampion.champion.synergy
  );

  const refinedSynergyList = groupBy(synergyList, "name");

  function checkGrade(synergyLength: number, grade: number[]) {}

  console.log(refinedSynergyList);

  useEffect(() => {
    console.log(indexedChampionList);
  }, [indexedChampionList]);

  return (
    <div className="pr-[40%]">
      {refinedSynergyList.map((synergy) => (
        <div key={synergy[0].name} className="flex items-center">
          <div className="p-xxs">
            <Image
              width={24}
              height={24}
              src={`/images/synergy/${synergy[0].src[0]}.png`}
              alt={synergy[0].name}
              className="filter brightness-0"
            />
          </div>
          {synergy[0].name} {synergy.length} / {synergy[0].requirQty[0]}
        </div>
      ))}
    </div>
  );
}

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
    setIsDragEnter(false);

    if (draggingChampion) {
      console.log("챔피언 배치");
      const indexed = {
        index,
        champion: draggingChampion as Champion,
      };
      setPlacedChampion(draggingChampion as Champion);
      setPlacedChampions((prev) => [...prev, indexed]);
    } else {
      console.log("챔피언 없음");
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
    <div
      className={cn(
        "hexagon w-[84px] cursor-pointer h-[96px] bg-[#d0d2d5] relative flex justify-center items-center ",
        isEvenRow && "translate-x-[55%]",
        isDragEnter && "bg-blue-300",
        placedChampion && backgroundColorStyles[placedChampion.tier.toString()]
      )}
    >
      <div
        onContextMenu={onChampionRightClick}
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
