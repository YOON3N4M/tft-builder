import { Champion } from "@/constants/champions";
import { cn } from "@/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";
import MouseGuide, { MouseGuideProps } from "../MouseGuide";
import { CHAMPION_ICON_URL } from "@/constants/url";

interface ChampionTooltipProps
  extends HTMLAttributes<HTMLDivElement>,
    MouseGuideProps {
  champion: Champion;
}

const shapeStyles: { [key: string]: string } = {
  "0": "border-tier-1 bg-tier-1 rounded-full size-[8px]",
  "1": "border-tier-1 bg-tier-1 rounded-full size-[8px]",
  "2": "border-tier-2 bg-tier-2 rounded-full size-[8px]",
  "3": "border-tier-3 border-b-tier-3 triangle ",
  "4": "border-tier-4 bg-tier-4 pentagon size-[10px]",
  "5": "border-tier-5 bg-tier-5 hexagon size-[10px]",
};

const borderStyles: { [key: string]: string } = {
  "0": "border-tier-1",
  "1": "border-tier-1",
  "2": "border-tier-2",
  "3": "border-tier-3",
  "4": "border-tier-4",
  "5": "border-tier-5",
};

function ChampionTooltip(props: ChampionTooltipProps) {
  const { champion, dragGuide, leftClickGuide, rightClickGuide } = props;
  return (
    <div>
      <div
        className={cn(
          "relative border rounded-md overflow-hidden",
          borderStyles[champion.tier.toString()]
        )}
      >
        <div className="absolute top-0 bg-gradient-to-r from-[#00000080] from-[5%] to-[#fff0] size-full z-[10]">
          <div className="p-sm h-full flex flex-col">
            <span className="text-main-text font-semibold text-lg">
              {champion.name}
            </span>
            <div className="flex flex-col  mt-auto gap-xxs">
              {champion.synergy.map((synergy) => (
                <div key={synergy.name} className="flex gap-xxs items-center">
                  <Image
                    width={18}
                    height={12}
                    src={`/images/synergy/${synergy.src[0]}.png`}
                    alt={synergy.name}
                    className=""
                  />
                  <span className="text-xs">{synergy.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Image
          width={256}
          height={128}
          alt={champion.name}
          src={CHAMPION_ICON_URL(champion.src)}
          className="object-cover"
        ></Image>

        {/* <div className="flex items-center gap-xs z-[2000]">
        <span className={cn(shapeStyles[champion.tier])} />
        <span className="text-sm text-main-text">{champion.name}</span>
      </div> */}
        {/* <div className="flex flex-col mt-xs gap-xxs">
        {champion.synergy.map((synergy) => (
          <div key={synergy.name} className="flex gap-xxs items-center">
            <Image
              width={18}
              height={12}
              src={`/images/synergy/${synergy.src[0]}.png`}
              alt={synergy.name}
              className=""
            />
            <span className="text-xs">{synergy.name}</span>
          </div>
        ))}
      </div>
      <MouseGuide
        dragGuide={dragGuide}
        leftClickGuide={leftClickGuide}
        rightClickGuide={rightClickGuide}
      /> */}
      </div>
      <div>
        <MouseGuide
          // className="bg-default-bg rounded-md px-xxs py-xxxs"
          dragGuide={dragGuide}
          leftClickGuide={leftClickGuide}
          rightClickGuide={rightClickGuide}
        />
      </div>
    </div>
  );
}

export default ChampionTooltip;
