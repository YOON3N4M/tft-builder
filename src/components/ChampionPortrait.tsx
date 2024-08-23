import { Champion, TRAINING_BOT } from "@/data/champions";
import { CHAMPION_ICON_URL, TRAINING_BOT_ICON_URL } from "@/constants/url";
import { cn } from "@/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";

interface ChampionPortraitProps extends HTMLAttributes<HTMLDivElement> {
  champion: Champion;
  objectPosition: "object-[-55px_0px]" | "object-[-35px_0px]" | string;
}

const borderColorStyles: { [key: string]: string } = {
  "0": "border-tier-1",
  "1": "border-tier-1",
  "2": "border-tier-2",
  "3": "border-tier-3",
  "4": "border-tier-4",
  "5": "border-tier-5",
};

function ChampionPortrait(props: ChampionPortraitProps) {
  const { champion, className, children, objectPosition } = props;
  const { src, name, tier } = champion;

  const isTrainingBot = name === TRAINING_BOT.name;

  // 훈련 봇 예외 처리
  const fixedTrainingBot = isTrainingBot
    ? TRAINING_BOT_ICON_URL()
    : CHAMPION_ICON_URL(src);

  return (
    <div
      className={cn(
        "relative overflow-hidden flex rounded-md border-2",
        className,
        borderColorStyles[tier.toString()]
      )}
    >
      <Image
        src={fixedTrainingBot}
        width={256}
        height={128}
        alt={name}
        className={cn(
          "object-cover relative",
          !isTrainingBot && "scale-125",
          objectPosition
        )}
      />
      {children}
    </div>
  );
}

export default ChampionPortrait;
