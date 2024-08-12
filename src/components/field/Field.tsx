import { Champion } from "@/constants/champions";
import { CoreItem } from "@/constants/item";
import { useDragActions } from "@/store/dragStore";
import { useState } from "react";
import SynergyContainer from "./SynergyContainer";
import Hexagon from "./hexagon";

interface FieldProps {}

export interface IndexedChampion {
  index: number;
  champion: Champion;
  itemList: CoreItem[];
}

const hexagonQty = 28;

const tempArray = [...Array(hexagonQty)].map((_, idx) => idx);

function Field(props: FieldProps) {
  const {} = props;

  const { setDraggingTarget, setDraggingIndexedChampion } = useDragActions();
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
