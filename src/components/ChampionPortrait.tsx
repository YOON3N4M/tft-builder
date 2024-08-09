import { Champion } from "@/constants/champions";
import { CHAMPION_ICON_URL } from "@/constants/url";
import { cn } from "@/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";

interface ChampionPortraitProps extends HTMLAttributes<HTMLDivElement> {
  champion: Champion;
  objectPosition: "object-[-55px_0px]" | "object-[-35px_0px]" | string;
}

const borderColorStyles: { [key: string]: string } = {
  "1": "border-tier-1",
  "2": "border-tier-2",
  "3": "border-tier-3",
  "4": "border-tier-4",
  "5": "border-tier-5",
};

function ChampionPortrait(props: ChampionPortraitProps) {
  const { champion, className, children, objectPosition } = props;
  const { src, name, tier } = champion;

  return (
    <div
      className={cn(
        "relative overflow-hidden flex rounded-md border-2",
        className,
        borderColorStyles[tier.toString()]
      )}
    >
      <Image
        src={CHAMPION_ICON_URL(src)}
        width={256}
        height={128}
        alt={name}
        className={cn("object-cover relative scale-125", objectPosition)}
      />
      {children}
    </div>
  );
}

export default ChampionPortrait;
