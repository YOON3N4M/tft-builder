import { PortalTooltip, usePortalTooltip } from "../tooltips/PortalTooltip";
import ChampionTooltip from "../tooltips/ChampionTooltip";
import ChampionPortrait from "../portraits/ChampionPortrait";
import { Token } from "../svgs";
import { cn } from "@/utils";
import { Champion } from "@/types/data";
import { ChampionJson } from "@/hooks/useSetDataNew";

interface ChampionListItemProps {
  champion: ChampionJson;
  handleIconDragStart: (e: any, champion: ChampionJson) => void;
  addPlacedChampionViaClick: (champion: ChampionJson) => void;
}

export default function ChampionListItem(props: ChampionListItemProps) {
  const { champion, handleIconDragStart, addPlacedChampionViaClick } = props;

  const { tooltipContainerRef, pos, isTooltipOn, tooltipOn, tooltipOff } =
    usePortalTooltip();

  function drageStart(e: any, champion: any) {
    handleIconDragStart(e, champion);
    tooltipOff();
  }
  return (
    <div
      onClick={() => addPlacedChampionViaClick(champion)}
      onMouseEnter={tooltipOn}
      onMouseLeave={tooltipOff}
      onDragStart={(e) => drageStart(e, champion)}
      className="relative cursor-pointer"
      ref={tooltipContainerRef}
    >
      <PortalTooltip
        className="!p-0 !border-none !bg-[#00000000]"
        isOn={isTooltipOn}
        x={pos.x}
        y={pos.y}
      >
        <ChampionTooltip
          leftClickGuide="배치"
          dragGuide="배치"
          champion={champion}
        />
      </PortalTooltip>
      <ChampionPortrait
        key={champion.apiName}
        className="pc:size-[64px] mo:size-[40px] tab:size-[56px]"
        champion={champion}
      >
        <div className="z-[100] pointer-events-none absolute w-full top-0 flex justify-end ">
          <div className="mo:hidden pointer-events-none flex items-center gap-xxxs bg-[#00000099] rounded-[4px] px-[2px]">
            <Token size={10} className="fill-white" />{" "}
            <span className="text-main-text text-[11px]">{champion.cost}</span>
          </div>
        </div>
        <p
          className={cn(
            "pointer-events-none absolute bottom-0 text-center w-full text-main-text font-semibold text-[11px] bg-[#00000099]",
            "mo:text-[8px]"
          )}
        >
          {champion.name}
        </p>
      </ChampionPortrait>
      {/* <Image
          width={256}
          height={128}
          alt={champion.name}
          src={CHAMPION_ICON_URL(champion.src)}
          className={cn("object-cover relative object-[-55px_0px] scale-125")}
        /> */}
    </div>
  );
}
