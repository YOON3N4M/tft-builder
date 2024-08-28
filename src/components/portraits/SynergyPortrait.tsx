"use client";

import { SET_12_CHAMPIONS } from "@/data/champions";
import { cn, findSynergy, isChampionExist, sortByNumber } from "@/utils";
import Image from "next/image";
import { IndexedChampion } from "../field/Field";
import { ToolTip, useToolTip } from "../tooltips/ToolTip";
import ChampionPortrait from "./ChampionPortrait";

const synergyBgStyles: { [key: string]: string } = {
  "1": "bg-gray-900",
  "2": "bg-[#a0715e]",
  "3": "bg-[#7c8f92]",
  "4": "bg-[#bd9a38]",
  "5": "bg-[#ad1457]",
};

const sizeStyles = {
  sm: "w-[24px] h-[26px]",
  md: "w-[34px] h-[36px]",
};

interface SynergyPortraitProps {
  name: string;
  unitQty: number;
  style: number;
  tierCurrent: number;
  size?: "md" | "sm";
  noActiveHide?: boolean;
  indexedChampionList?: IndexedChampion[];
}

function SynergyPortrait(props: SynergyPortraitProps) {
  const {
    size = "md",
    name,
    tierCurrent,
    unitQty,
    style,
    indexedChampionList,
    noActiveHide = false,
  } = props;
  const { tooltipContainerRef, isTooltipOn, tooltipOff, tooltipOn, pos } =
    useToolTip();

  const synergy = findSynergy(name);
  if (!synergy) return;

  const synergyChampions = SET_12_CHAMPIONS.filter((champion) =>
    champion.synergy.some((synergyy) => synergyy.name === synergy.name)
  );
  const sortByTier = sortByNumber(synergyChampions, "tier");

  //활성화 되지 않았을 경우 숨기기 (ex. 전적 등에서)
  if (noActiveHide && style === 0) return;

  const caculatedStyle = synergy.requirQty.length === 1 ? 3 : style;

  return (
    <div
      className="relative"
      ref={tooltipContainerRef}
      onMouseEnter={tooltipOn}
      onMouseLeave={tooltipOff}
    >
      <ToolTip
        className="whitespace-pre-line max-w-[400px]"
        isOn={isTooltipOn}
        x={pos.x}
        y={pos.y}
        position="bottom"
      >
        <div>
          <p className="text-main-text font-semibold">{synergy.name}</p>
          <p className="text-sub-text mt-sm">{synergy.desc}</p>
          <ul className="mt-sm text-sub-text">
            {synergy.effect.map((ef, idx) => (
              <li
                key={`${synergy.name}-effect-${idx}`}
                className={cn(idx === tierCurrent - 1 && "text-tier-3")}
              >
                ({synergy.requirQty[idx]}) {ef}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-sm flex gap-xxs">
          {sortByTier.map((champion) => (
            <ChampionPortrait
              key={champion.name}
              champion={champion}
              className={cn(
                "size-[40px]",
                indexedChampionList &&
                  !isChampionExist(indexedChampionList, champion) &&
                  "!opacity-50"
              )}
              objectPosition="object-[-35px_0px]"
            />
          ))}
        </div>
      </ToolTip>
      <div
        className={cn(
          "p-xxs hexagon flex items-center justify-center",
          sizeStyles[size],
          synergyBgStyles[(caculatedStyle + 1).toString()]
        )}
      >
        <Image
          width={22}
          height={22}
          src={`/images/synergy/${synergy.src[0]}.png`}
          alt={synergy.name}
          className="filter"
        />
      </div>
    </div>
  );
}

export default SynergyPortrait;
