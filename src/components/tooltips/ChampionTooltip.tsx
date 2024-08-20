import { Champion } from "@/constants/champions";
import { cn } from "@/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";
import MouseGuide, { MouseGuideProps } from "../MouseGuide";

interface ChampionTooltipProps
  extends HTMLAttributes<HTMLDivElement>,
    MouseGuideProps {
  champion: Champion;
}

const shapeStyles: { [key: string]: string } = {
  "0": "bg-tier-1 rounded-full size-[8px]",
  "1": "bg-tier-1 rounded-full size-[8px]",
  "2": "bg-tier-2 rounded-full size-[8px]",
  "3": "border-b-tier-3 triangle ",
  "4": "bg-tier-4 pentagon size-[10px]",
  "5": "bg-tier-5 hexagon size-[10px]",
};

function ChampionTooltip(props: ChampionTooltipProps) {
  const { champion, dragGuide, leftClickGuide, rightClickGuide } = props;
  return (
    <div className="">
      <div className="flex items-center gap-xs z-[2000]">
        <span className={cn(shapeStyles[champion.tier])} />
        <span className="text-sm">{champion.name}</span>
      </div>
      <div className="flex flex-col mt-xs gap-xxs">
        {champion.synergy.map((synergy) => (
          <div key={synergy.name} className="flex gap-xxs items-center">
            <Image
              width={18}
              height={12}
              src={`/images/synergy/${synergy.src[0]}.png`}
              alt={synergy.name}
              className="filter brightness-0"
            />
            <span className="text-xs">{synergy.name}</span>
          </div>
        ))}
      </div>
      <MouseGuide
        dragGuide={dragGuide}
        leftClickGuide={leftClickGuide}
        rightClickGuide={rightClickGuide}
      />
    </div>
  );
}

export default ChampionTooltip;
