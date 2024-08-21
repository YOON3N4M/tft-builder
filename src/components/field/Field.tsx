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
      <div className="text-black basis-[20%] flex-shrink-0 flex tab:min-w-[165px] pc:min-w-[216px]">
        <SynergyContainer indexedChampionList={placedChampions} />
      </div>
      <div className={cn("flex relative flex-grow justify-start", "mo:mt-md")}>
        <div
          className={cn(
            "relative grid grid-cols-7 gap-xs pc:w-[650px] gap-y-0 h-min",
            "tab:w-[500px]",
            "mo:ml-[-20px] mo:max-w-[440px]"
          )}
        >
          <span
            className={cn(
              "absolute left-2 text-[#888] top-[33%] text-3xl",
              "mo:top-[27%] mo:left-0 mo:text-2xl "
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
