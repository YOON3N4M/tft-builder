import { RiotTftLeagueRes } from "@/types/riot";
import Image from "next/image";

interface TierEmblemProps {
  tftRank: RiotTftLeagueRes;
}

function TierEmblem(props: TierEmblemProps) {
  const { tftRank } = props;
  const { tier } = tftRank;

  const lowerCaseTier = tier.toLowerCase();

  return (
    <Image
      width={50}
      height={50}
      src={`/images/tier/${lowerCaseTier}.png`}
      alt={lowerCaseTier}
    />
  );
}

export default TierEmblem;
