import { Champion, TRAINING_BOT } from "@/constants/champions";
import { CoreItem } from "@/constants/item";
import { cn, filterNull } from "@/utils";
import { Dispatch, SetStateAction } from "react";
import SynergyContainer from "./SynergyContainer";
import Hexagon, { PlacedChampion } from "./hexagon";

export interface IndexedChampion {
  index: number;
  champion: Champion;
  itemList: CoreItem[];
}
interface FieldProps {
  placedChampions: (IndexedChampion | null)[];
  setPlacedChampions: Dispatch<SetStateAction<PlacedChampion[]>>;
}

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
            {
              filterNull(placedChampions).filter(
                (item) => item?.champion.name !== TRAINING_BOT.name
              ).length
            }
          </span>
          {placedChampions.length === 0 && (
            <div className="absolute x-center y-center z-[500] p-sm bg-white border rounded-md opacity-70">
              드래그해서 챔피언 배치
            </div>
          )}
          {placedChampions.map((item, idx) => (
            <Hexagon
              placedChampion={item}
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
