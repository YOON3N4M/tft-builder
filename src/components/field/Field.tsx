import { Champion } from "@/constants/champions";
import { CoreItem } from "@/constants/item";
import { Dispatch, SetStateAction } from "react";
import SynergyContainer from "./SynergyContainer";
import Hexagon from "./hexagon";
import { cn } from "@/utils";

export interface IndexedChampion {
  index: number;
  champion: Champion;
  itemList: CoreItem[];
}
interface FieldProps {
  placedChampions: IndexedChampion[];
  setPlacedChampions: Dispatch<SetStateAction<IndexedChampion[]>>;
}

const hexagonQty = 28;

const tempArray = [...Array(hexagonQty)].map((_, idx) => idx);

function Field(props: FieldProps) {
  const { placedChampions, setPlacedChampions } = props;

  function isEvenRow(idx: number): boolean {
    return (idx > 6 && idx < 14) || idx > 20;
  }

  return (
    <>
      <div className="text-black basis-[20%] flex pc:min-w-[216px]">
        <SynergyContainer indexedChampionList={placedChampions} />
      </div>
      <div className={cn("flex relative flex-grow justify-center", "mo:mt-md")}>
        <div
          className={cn(
            "relative grid grid-cols-7 gap-xs w-[700px] gap-y-0 h-min",
            "mo:ml-[-20px] mo:max-w-[440px]"
          )}
        >
          <span
            className={cn(
              "absolute left-2 text-gray-500 top-[33%] text-3xl",
              "mo:top-[27%] mo:left-0 mo:text-2xl "
            )}
          >
            {placedChampions.length}
          </span>
          {placedChampions.length === 0 && (
            <div className="absolute x-center y-center z-[500] p-sm bg-white border rounded-md opacity-70">
              드래그해서 챔피언 배치
            </div>
          )}
          {tempArray.map((item, idx) => (
            <Hexagon
              placedChampions={placedChampions}
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
