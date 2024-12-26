import { CoreItem } from "@/data/item";
import { TRAINING_BOT } from "@/data/set/12/champions";
import { cn, filterNull } from "@/utils";
import { Dispatch, SetStateAction } from "react";

import { ChampionJson } from "@/hooks/useSetDataNew";
import Hexagon, { PlacedChampion } from "./Hexagon";
import { useIndexedChampionList } from "@/store/BuilderStore";

export interface IndexedChampion {
  index: number;
  champion: ChampionJson;
  itemList: CoreItem[];
}
interface BoardProps {}

function Board(props: BoardProps) {
  const indexedChampionList = useIndexedChampionList();

  function isEvenRow(idx: number): boolean {
    return (idx > 6 && idx < 14) || idx > 20;
  }

  return (
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
            "absolute pc:left-2 text-sub-text pc:top-[33%] text-3xl",
            "mo:top-[27%] mo:left-[-5px] mo:text-2xl",
            " tab:top-[30%]"
          )}
        >
          {
            filterNull(indexedChampionList).filter(
              (item) => item?.champion.name !== TRAINING_BOT.name
            ).length
          }
        </span>

        {indexedChampionList.map((item, idx) => (
          <Hexagon
            placedChampion={item}
            key={`${idx}-${item?.champion.name}`}
            index={idx}
            isEvenRow={isEvenRow(idx)}
          ></Hexagon>
        ))}
      </div>
    </div>
  );
}

export default Board;
