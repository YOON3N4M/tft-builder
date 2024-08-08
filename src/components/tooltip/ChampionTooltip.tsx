import { Champion } from "@/constants/champions";
import { Tooltip } from "./Tooltip";
import { cn } from "@/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";

interface ChampionTooltipProps extends HTMLAttributes<HTMLDivElement> {
  champion: Champion;
  isTooltipOn: boolean;
}

const shapeStyles: { [key: string]: string } = {
  "1": "bg-tier-1 rounded-full size-[8px]",
  "2": "bg-tier-2 rounded-full size-[8px]",
  "3": "border-b-tier-3 triangle ",
  "4": "bg-tier-4 pentagon size-[10px]",
  "5": "bg-tier-5 hexagon size-[10px]",
};

function ChampionTooltip(props: ChampionTooltipProps) {
  const { champion, isTooltipOn, className } = props;

  return (
    <Tooltip
      className={cn("z-[2000] !min-w-[150px]", className)}
      isTooltipOn={isTooltipOn}
    >
      <div className="flex items-center gap-xs z-[2000]">
        <span className={cn(shapeStyles[champion.tier])} />
        <span className="text-base">{champion.name}</span>
      </div>
      <div className="flex flex-col mt-xs gap-xxs">
        {champion.synergy.map((synergy) => (
          <div key={synergy.name} className="flex gap-xs">
            <Image
              width={22}
              height={22}
              src={`/images/synergy/${synergy.src[0]}.png`}
              alt={synergy.name}
              className="filter brightness-0"
            />
            <span>{synergy.name}</span>
          </div>
        ))}
      </div>
    </Tooltip>
  );
}

export default ChampionTooltip;
