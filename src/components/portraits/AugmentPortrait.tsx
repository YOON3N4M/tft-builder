"use client";

import { SRC_AUGMENT } from "@/constants/src";
import augmentJson from "@/data/tft-augments.json";
import Image from "next/image";
import { PortalTooltip, usePortalTooltip } from "../tooltips/PortalTooltip";
import SimpleTooltip from "../tooltips/SimpleTooltip";
import useDisClosure from "@/hooks/useDisClosure";

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

  const { isOpen, onClose, onOpen } = useDisClosure();

  const augmentData = augmentJson.data as any;
  const augment = augmentData[name] as Augment;

  if (!augment) return;

  return (
    <div onMouseOver={onOpen} onMouseLeave={onClose} className="relative">
      <SimpleTooltip isOpen={isOpen}>
        <span className="text-main-text text-nowrap"> {augment.name}</span>
      </SimpleTooltip>
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
