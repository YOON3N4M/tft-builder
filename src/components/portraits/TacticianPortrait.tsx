"use client";

import Image from "next/image";
import { ToolTip, useToolTip } from "../tooltips/ToolTip";
import tacticianJson from "@/data/tft-tactician.json";

interface TacticianPortraitProps {
  id: number;
}

interface Tactician {
  id: string;
  image: { full: string };
  name: string;
}
const tacticianSrc = (srcName: string) => `/images/tft-tactician/${srcName}`;

function TacticianPortrait(props: TacticianPortraitProps) {
  const { id } = props;

  const { tooltipContainerRef, tooltipOff, tooltipOn, pos, isTooltipOn } =
    useToolTip();

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
        src={tacticianSrc(tactician.image.full)}
        alt={tactician.name}
        className="object-cover scale-150"
      />
      <ToolTip position="bottom" x={pos.x} y={pos.y} isOn={isTooltipOn}>
        {tactician.name}
      </ToolTip>
    </div>
  );
}

export default TacticianPortrait;
