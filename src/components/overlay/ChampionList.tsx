"use client";

import { SET_12_CHAMPIONS } from "@/constants/champions";
import Overlay, { OverlayProps } from "./Overlay";
import Image from "next/image";
import { CHAMPION_ICON_URL } from "@/constants/url";
import { cn } from "@/utils";
import { Token } from "../svgs";

interface ChampionListProps extends OverlayProps {}

const borderColorStyles: { [key: string]: string } = {
  "1": "border-[#848999]",
  "2": "border-[#11b288]",
  "3": "border-[#207ac7]",
  "4": "border-[#c440da]",
  "5": "border-[#ffb93b]",
};

function ChampionList(props: ChampionListProps) {
  const { hidden } = props;

  console.log(SET_12_CHAMPIONS.length);

  return (
    <Overlay className="" hidden={hidden}>
      <div className="flex pt-md p-md"></div>
      <div className="grid grid-cols-10 gap-xxs p-md">
        {SET_12_CHAMPIONS.map((champion, idx) => (
          <div
            key={idx}
            className={cn(
              "size-[64px] flex border-2 rounded-[4px] relative overflow-hidden",
              borderColorStyles[champion.tier.toString()]
            )}
          >
            <div className="z-[100] absolute w-full top-0 flex justify-end ">
              <div className="flex items-center gap-xxxs bg-[#00000099] rounded-[4px] px-[2px]">
                <Token size={10} className="fill-white" />{" "}
                <span className="text-white text-[11px]">{champion.tier}</span>
              </div>
            </div>
            <Image
              width={256}
              height={128}
              alt={champion.name}
              src={CHAMPION_ICON_URL(champion.src)}
              className={cn("object-cover relative object-right scale-125")}
            />
            <p className="absolute bottom-0 text-center w-full text-white font-semibold text-[11px] bg-[#00000099]">
              {champion.name}
            </p>
          </div>
        ))}
      </div>
    </Overlay>
  );
}

export default ChampionList;
