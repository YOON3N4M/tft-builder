"use client";

import { SRC_AUGMENT } from "@/constants/src";
import augmentJson from "@/data/tft-augments.json";
import Image from "next/image";
import { ToolTip, useToolTip } from "../tooltips/ToolTip";

interface AugmentPortraitProps {
  name: string;
}

interface Augment {
  id: string;
  name: string;
  image: { full: string };
}

function AugmentPortrait(props: AugmentPortraitProps) {
  const { name } = props;

  const { pos, isTooltipOn, tooltipContainerRef, tooltipOff, tooltipOn } =
    useToolTip();

  const augmentData = augmentJson.data as any;
  const augment = augmentData[name] as Augment;

  return (
    <div
      onMouseOver={tooltipOn}
      onMouseLeave={tooltipOff}
      className="relative"
      ref={tooltipContainerRef}
    >
      <ToolTip
        className="text-main-text"
        x={pos.x}
        y={pos.y}
        isOn={isTooltipOn}
      >
        {augment.name}
      </ToolTip>
      <Image
        width={24}
        height={24}
        src={SRC_AUGMENT(augment.image.full)}
        alt={augment.name}
        className="rounded-full"
      />
    </div>
  );
}

export default AugmentPortrait;
