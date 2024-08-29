"use client";

import Image from "next/image";

import tacticianJson from "@/data/tft-tactician.json";
import { SRC_TACTICIAN } from "@/constants/src";
import { PortalTooltip, usePortalTooltip } from "../tooltips/PortalTooltip";

interface TacticianPortraitProps {
  id: number;
}

interface Tactician {
  id: string;
  image: { full: string };
  name: string;
}

function TacticianPortrait(props: TacticianPortraitProps) {
  const { id } = props;

  const { tooltipContainerRef, tooltipOff, tooltipOn, pos, isTooltipOn } =
    usePortalTooltip();

  const tacticianData = tacticianJson.data as any;

  const tactician: Tactician = tacticianData[id];

  return (
    <div
      onMouseEnter={tooltipOn}
      onMouseLeave={tooltipOff}
      ref={tooltipContainerRef}
      className="relative size-[64px] flex items-center justify-center rounded-full overflow-hidden border-2 border-tier-5"
    >
      <Image
        width={512}
        height={344}
        src={SRC_TACTICIAN(tactician.image.full)}
        alt={tactician.name}
        className="object-cover scale-150"
      />
      <PortalTooltip position="bottom" x={pos.x} y={pos.y} isOn={isTooltipOn}>
        {tactician.name}
      </PortalTooltip>
    </div>
  );
}

export default TacticianPortrait;
