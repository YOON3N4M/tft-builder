import { Synergy } from "@/data/set/12/synergy";
import { IndexedChampion } from "../field/Field";
import { PortalTooltip, usePortalTooltip } from "../tooltips/PortalTooltip";

import { checkTraitGrade, cn, isChampionExist, sortByNumber } from "@/utils";
import ChampionPortrait from "../portraits/ChampionPortrait";
import Image from "next/image";
import { synergyBgStyles } from ".";
import { Arrow } from "../svgs";
import useSetData from "@/hooks/useSetData";

interface TraitItemProps {
  indexedChampionList: IndexedChampion[];
  synergy: Synergy[];
}

export default function TraitItem(props: TraitItemProps) {
  const { indexedChampionList, synergy } = props;
  const { tooltipContainerRef, isTooltipOn, tooltipOff, tooltipOn, pos } =
    usePortalTooltip();

  const { championDataList } = useSetData();

  const traitItem = synergy[0];
  const traitChampionList = championDataList.filter((champion) =>
    champion.trait.some((trait) => trait.name === traitItem.name)
  );

  const sortedTraitChampionList = sortByNumber(traitChampionList, "tier");
  const traitGrade = checkTraitGrade(synergy).gradeNumber;
  const traitGradeIndex = traitItem.requirQty.findIndex(
    (num) => num === traitGrade
  );
  console.log(traitGradeIndex);

  return (
    <div
      ref={tooltipContainerRef}
      key={traitItem.name}
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
          <p className="text-main-text font-semibold">{traitItem.name}</p>
          <p className="text-sub-text mt-sm">{traitItem.desc}</p>
          <ul className="mt-sm text-sub-text">
            {traitItem.effect.map((ef, idx) => (
              <li
                key={`${traitItem.name}-effect-${idx}`}
                className={cn(traitGradeIndex === idx && "text-main-text")}
              >
                ({traitItem.requirQty[idx]}) {ef}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-sm flex gap-xxs">
          {sortedTraitChampionList.map((champion) => (
            <ChampionPortrait
              key={champion.name}
              champion={champion}
              className={cn(
                "size-[40px]",
                !isChampionExist(indexedChampionList, champion) && "!opacity-50"
              )}
            />
          ))}
        </div>
      </PortalTooltip>
      <div
        className={cn(
          "p-xxs hexagon w-[34px] h-[36px] flex items-center justify-center",
          synergyBgStyles[checkTraitGrade(synergy)?.gradeText]
        )}
      >
        <Image
          width={22}
          height={22}
          src={`/images/set/12/synergy/${traitItem.src[0]}.png`}
          alt={traitItem.name}
          className="filter pc:w-[22px] pc:h-[22px]"
        />
      </div>
      <div
        className={cn(
          "px-xs py-xxxs ml-[-5px] text-main-text",
          synergyBgStyles[checkTraitGrade(synergy)?.gradeText]
        )}
      >
        {synergy.length}
      </div>
      <div className="ml-xs flex flex-col">
        <div className="flex">
          <span>{traitItem.name}</span>
        </div>
        <div className="flex items-center gap-xxxs">
          {traitItem.requirQty.map((qty, idx) => (
            <>
              <span
                className={cn(
                  "text-sub-text text-xs",
                  checkTraitGrade(synergy)?.gradeNumber === qty &&
                    "!text-main-text"
                )}
              >
                {qty}
              </span>
              {idx + 1 !== traitItem.requirQty.length && (
                <Arrow size={10} className="inline fill-gray-600" />
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
