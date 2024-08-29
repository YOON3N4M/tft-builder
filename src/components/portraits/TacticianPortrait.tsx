"use client";

import Image from "next/image";

import tacticianJson from "@/data/tft-tactician.json";
import { SRC_TACTICIAN } from "@/constants/src";
import { PortalTooltip, usePortalTooltip } from "../tooltips/PortalTooltip";
import useDisClosure from "@/hooks/useDisClosure";
import SimpleTooltip from "../tooltips/SimpleTooltip";

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

  const { isOpen, onClose, onOpen } = useDisClosure();

  const tacticianData = tacticianJson.data as any;

  const tactician: Tactician = tacticianData[id];

  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <SimpleTooltip isOpen={isOpen}>
        <span className="text-main-text text-nowrap">{tactician.name}</span>
      </SimpleTooltip>
      <div className="size-[64px] flex items-center justify-center rounded-full overflow-hidden border-2 border-tier-5">
        <Image
          width={512}
          height={344}
          src={SRC_TACTICIAN(tactician.image.full)}
          alt={tactician.name}
          className="object-cover scale-150"
        />
      </div>
    </div>
  );
}

export default TacticianPortrait;
