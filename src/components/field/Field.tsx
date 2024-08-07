import { Champion } from "@/constants/champions";
import { CHAMPION_ICON_URL } from "@/constants/url";
import { useDragActions, useDraggingTarget } from "@/store/dragStore";
import { cn, groupBy, sortByNumber } from "@/utils";
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
import { Arrow } from "../svgs";
import { Synergy } from "@/constants/synergy";

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
    <>
      <div className="text-black basis-[20%] flex">
        <SynergyContainer indexedChampionList={placedChampions} />
      </div>
      <div className="flex flex-grow">
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
    </>
  );
}

export default Field;

interface SynergyContainerProps {
  indexedChampionList: IndexedChampion[];
}

const synergyBgStyles: { [key: string]: string } = {
  unranked: "bg-gray-900",
  bronze: "bg-[#a0715e]",
  silver: "bg-[#7c8f92]",
  gold: "bg-[#bd9a38]",
  prism: "bg-[#ad1457]",
};

function SynergyContainer(props: SynergyContainerProps) {
  const { indexedChampionList } = props;

  const synergyList = indexedChampionList.flatMap(
    (indexedChampion) => indexedChampion.champion.synergy
  );

  const refinedSynergyList = groupBy(synergyList, "name");
  const sortByLength = refinedSynergyList.sort((a, b) => b.length - a.length);
  const soltByGrade = refinedSynergyList.sort((a, b) => {
    const grade: any = {
      unranked: 1,
      bronze: 2,
      silver: 3,
      gold: 4,
      prism: 5,
    };

    return grade[checkGrade(b).gradeText] - grade[checkGrade(a).gradeText];
  });

  function checkGrade(synergy: Synergy[]): any {
    if (!synergy) return;
    console.log("grade chekc");
    const synergyCount = synergy.length;
    const requireQty = synergy[0].requirQty;
    const grade = synergy[0].tier;

    let index = 0;
    let gradeText = "unranked";
    let gradeNumber = 0;
    while (index < requireQty.length) {
      if (index === 0 && synergyCount < requireQty[index]) {
        break;
      } else if (synergyCount < requireQty[index]) {
        gradeText = grade[index - 1];
        gradeNumber = requireQty[index - 1];
        break;
      } else {
        if (index === requireQty.length - 1) {
          gradeText = grade[requireQty.length - 1];
          gradeNumber = requireQty[requireQty.length - 1];
          break;
        } else {
          index++;
        }
      }
    }

    return { gradeText, gradeNumber };
  }

  useEffect(() => {
    //console.log(indexedChampionList);
    checkGrade(sortByLength[0]);
  }, [indexedChampionList]);

  return (
    <div className="flex flex-col gap-sm py-md max-h-[400px] overflow-auto w-[90%]">
      {sortByLength.map((synergy) => (
        <div
          key={synergy[0].name}
          className="flex items-center border p-xs text-sm w-[95%] bg-white rounded-md"
        >
          <div
            className={cn(
              "p-xxs hexagon w-[34px] h-[36px] flex items-center justify-center",
              synergyBgStyles[checkGrade(synergy)?.gradeText]
            )}
          >
            <Image
              width={22}
              height={22}
              src={`/images/synergy/${synergy[0].src[0]}.png`}
              alt={synergy[0].name}
              className="filter"
            />
          </div>
          <div
            className={cn(
              "px-xs ml-[-5px] text-white",
              synergyBgStyles[checkGrade(synergy)?.gradeText]
            )}
          >
            {synergy.length}
          </div>
          <div className="ml-xs flex flex-col">
            <div className="flex">
              <span>{synergy[0].name}</span>
            </div>
            <div className="flex items-center gap-xxxs">
              {synergy[0].requirQty.map((qty, idx) => (
                <>
                  <span
                    className={cn(
                      "text-gray-500 text-xs",
                      checkGrade(synergy)?.gradeNumber === qty && "!text-black"
                    )}
                  >
                    {qty}
                  </span>
                  {idx + 1 !== synergy[0].requirQty.length && (
                    <Arrow size={10} className="inline fill-gray-300" />
                  )}
                </>
              ))}
            </div>
          </div>
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
