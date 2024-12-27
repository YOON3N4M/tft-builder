import { PortalTooltip, usePortalTooltip } from "../tooltips/PortalTooltip";

import {
  checkTraitStyle,
  cn,
  extractIconSrc,
  isChampionExist,
  sortByNumber,
} from "@/utils";
import Image from "next/image";
import ChampionPortrait from "../portraits/ChampionPortrait";

import useSetDataNew, { ChampionJson } from "@/hooks/useSetDataNew";
import { Arrow } from "../svgs";

interface TraitItemProps {
  groupedTrait: {
    traitName: string;
    championList: ChampionJson[];
  };
}

export const traitBgStyles: { [key: string]: string } = {
  "0": "bg-gray-900",
  "1": "bg-[#a0715e]",
  "3": "bg-[#7c8f92]",
  "5": "bg-[#bd9a38]",
  "6": "bg-[#ad1457]",
  // 워윅, 빅토르 등 6코스트 챔피언의 고유 특성이 '4'로 처리가 되어 있음
  "4": "bg-[#ad1457]",
};

export default function TraitItem(props: TraitItemProps) {
  const { groupedTrait } = props;
  const { traitName, championList } = groupedTrait;

  const { tooltipContainerRef, isTooltipOn, tooltipOff, tooltipOn, pos } =
    usePortalTooltip();

  const { traitDataList, SRC_TRAIT, championDataList } = useSetDataNew();

  const currentTrait = traitDataList.find((item) => item.name === traitName);
  if (!currentTrait) return;

  const { name, desc, icon, effects } = currentTrait;
  const championListOfTrait = sortByNumber(
    championDataList.filter((champion) =>
      champion.traits.some((_trait) => _trait === name)
    ),
    "cost"
  );

  const unitQty = championList.length;
  const styleNumber = checkTraitStyle(unitQty, effects);
  const iconSrc = SRC_TRAIT(extractIconSrc(icon));
  const activeEffectIndex = effects
    .reverse()
    .findIndex((effect) => effect.style === styleNumber);
  const traitBgStyle = traitBgStyles[styleNumber];

  return (
    <div
      ref={tooltipContainerRef}
      key={name}
      onMouseEnter={tooltipOn}
      onMouseLeave={tooltipOff}
      className={cn(
        "relative flex items-center p-xs text-xs text-main-text rounded-md"
      )}
    >
      <PortalTooltip
        className="whitespace-pre-line max-w-[400px]"
        isOn={isTooltipOn}
        x={pos.x}
        y={pos.y}
        position="right"
      >
        <div>
          <p className="text-main-text font-semibold">{name}</p>
          <div
            className="text-sub-text mt-sm"
            // dangerouslySetInnerHTML={{ __html: desc }}
          >
            {desc}
          </div>
          <ul className="mt-sm text-sub-text">
            {effects.map((effect, idx) => (
              <li
                key={`${name}-effect-${idx}`}
                // className={cn(traitGradeIndex === idx && "text-main-text")}
              >
                {/* ({effect.minUnits}) {desc} */}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-md flex gap-xxs">
          {championListOfTrait.map((champion) => (
            <ChampionPortrait
              key={champion.name}
              champion={champion}
              className={cn(
                "size-[40px]",
                !isChampionExist(championList, champion) && "!opacity-50"
              )}
            />
          ))}
        </div>
      </PortalTooltip>
      <div
        className={cn(
          "p-xxs hexagon w-[34px] h-[36px] flex items-center shrink-0 justify-center",
          traitBgStyle
        )}
      >
        <Image
          width={22}
          height={22}
          src={iconSrc}
          alt={name}
          className="filter pc:w-[22px] pc:h-[22px] "
        />
      </div>
      <div
        className={cn("px-xs py-xxxs ml-[-5px] text-main-text", traitBgStyle)}
      >
        {unitQty}
      </div>
      <div className="ml-xs flex flex-col">
        <div className="flex">
          <span>{name}</span>
        </div>
        <div className="flex items-center gap-xxxs">
          {effects.map((effect, idx) => (
            <>
              <span
                className={cn(
                  "text-sub-text text-xs",
                  idx === activeEffectIndex && "!text-main-text"
                )}
              >
                {effect.minUnits}
              </span>
              {idx + 1 !== effects.length && (
                <Arrow size={10} className="inline fill-gray-600" />
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
