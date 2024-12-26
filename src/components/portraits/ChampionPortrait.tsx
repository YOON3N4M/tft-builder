"use client";

import { cn, extractIconSrc } from "@/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";
import ChampionTooltip from "../tooltips/ChampionTooltip";

import { SRC_CHAMPION, SRC_CHAMPION_PORTRAIT } from "@/constants/src";
import { PortalTooltip, usePortalTooltip } from "../tooltips/PortalTooltip";
import { Champion } from "@/types/data";
import { TRAINING_BOT } from "@/dataNew/set/12/custom/champion";
import useSetDataNew, { ChampionJson } from "@/hooks/useSetDataNew";

interface ChampionPortraitProps extends HTMLAttributes<HTMLDivElement> {
  champion: ChampionJson;
  tooltip?: boolean;
}

const borderColorStyles: { [key: string]: string } = {
  "0": "border-tier-1",
  "1": "border-tier-1",
  "2": "border-tier-2",
  "3": "border-tier-3",
  "4": "border-tier-4",
  "5": "border-tier-5",
};

function ChampionPortrait(props: ChampionPortraitProps) {
  const {
    champion,
    className,
    children,

    tooltip = false,
  } = props;
  const { icon, name, cost, apiName } = champion;

  const { SRC_CHAMPION } = useSetDataNew();

  const { tooltipContainerRef, pos, isTooltipOn, tooltipOn, tooltipOff } =
    usePortalTooltip();

  const isTrainingBot = name === TRAINING_BOT.name;

  return (
    <div
      ref={tooltipContainerRef}
      className={cn(
        "relative overflow-hidden flex rounded-md border-2",
        className
        // borderColorStyles[cost.toString()]
      )}
      onMouseEnter={tooltipOn}
      onMouseLeave={tooltipOff}
    >
      {tooltip && (
        <PortalTooltip
          className="!p-0 !border-none !bg-[#00000000]"
          isOn={isTooltipOn}
          x={pos.x}
          y={pos.y}
        >
          <ChampionTooltip champion={champion} />
        </PortalTooltip>
      )}

      <Image
        src={SRC_CHAMPION(extractIconSrc(icon))}
        width={256}
        height={128}
        alt={name}
        className={cn("object-cover relative", !isTrainingBot && "scale-125")}
      />
      {children}
    </div>
  );
}

export default ChampionPortrait;
