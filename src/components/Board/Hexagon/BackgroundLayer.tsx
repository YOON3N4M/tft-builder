import { ChampionJson } from "@/hooks/useSetDataNew";
import { cn } from "@/utils";
import { HTMLAttributes } from "react";
import { PlacedChampion } from ".";

interface BackgroundLayerProps extends HTMLAttributes<HTMLDivElement> {
  isDragEnter: boolean;
  placedChampion: PlacedChampion;
}

const backgroundColorStyles: { [key: string]: string } = {
  "1": "!bg-tier-1",
  "2": "!bg-tier-2",
  "3": "!bg-tier-3",
  "4": "!bg-tier-4",
  "5": "!bg-tier-5",
  "6": "!bg-tier-6",
};

function BackgroundLayer(props: BackgroundLayerProps) {
  const { isDragEnter, placedChampion, children } = props;

  const costStr = placedChampion ? placedChampion.champion.cost.toString() : "";

  return (
    <div
      className={cn(
        "hexagon pc:w-[84px] cursor-pointer pc:h-[96px] bg-[#19191b] border-[##19191b] relative flex justify-center items-center",
        "tab:w-[60px] tab:h-[65px]",
        "mo:w-[40px] mo:h-[45px]",
        isDragEnter && "bg-blue-300",
        placedChampion && backgroundColorStyles[costStr]
      )}
    >
      {children}
    </div>
  );
}

export default BackgroundLayer;
