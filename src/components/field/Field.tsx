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
      <div className="text-black basis-[15%] flex tab:min-w-[165px] pc:min-w-[216px]">
        <SynergyContainer indexedChampionList={placedChampions} />
      </div>
      <div
        className={cn(
          "flex relative flex-grow  pc:justify-start",
          "mo:mt-md tab:mt-md mo:justify-center tab:justify-center tab:items-center"
        )}
      >
        <div
          className={cn(
            "relative grid grid-cols-7 gap-xs pc:w-[90%] pc:!pr-xl gap-y-0 h-min pc:translate-x-0",
            "tab:w-[60%] translate-x-[-27px]",
            "mo:max-w-[440px] mo:translate-x-[-18px]"
          )}
        >
          <span
            className={cn(
              "absolute pc:left-2 text-[#888] pc:top-[33%] text-3xl",
              "mo:top-[27%] mo:left-[-5px] mo:text-2xl",
              " tab:top-[30%]"
            )}
          >
            {
              filterNull(placedChampions).filter(
                (item) => item?.champion.name !== TRAINING_BOT.name
              ).length
            }
          </span>

          {placedChampions.map((item, idx) => (
            <Hexagon
              placedChampion={item}
              setPlacedChampions={setPlacedChampions}
              key={`${idx}-${item?.champion.name}`}
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
