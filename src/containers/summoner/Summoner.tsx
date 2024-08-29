import { SummonerData } from "@/types/riot";
import { romeNumToArabNum } from "@/utils";
import Image from "next/image";
import TierEmblem from "./TierEmblem";
import { SRC_SUMMONER_ICON } from "@/constants/src";

interface SummonerProps {
  summonerData: SummonerData;
}

function Summoner(props: SummonerProps) {
  const { summonerData } = props;
  const { league, summoner, account } = summonerData;

  const tftRank = league?.find((type) => type.queueType === "RANKED_TFT");

  if (!summoner) return;

  return (
    <div className="py-lg h-full bg-content-bg border-[#222] border flex flex-col items-center rounded-md">
      <div className="rounded-full overflow-hidden border-tier-5 border-2">
        <Image
          width={64}
          height={64}
          src={SRC_SUMMONER_ICON(summoner.profileIconId)}
          alt="소환사 아이콘"
        />
      </div>
      <p className="text-xl mt-md">
        <span className="text-main-text font-semibold">
          {account?.gameName}
        </span>{" "}
        #{account?.tagLine}
      </p>
      {tftRank && (
        <div className="flex w-full items-center gap-sm justify-center px-md py-sm">
          <div>
            <TierEmblem tftRank={tftRank} />
          </div>
          <div>
            <div>
              <span className="text-main-text">
                {" "}
                {tftRank?.tier} {romeNumToArabNum(tftRank?.rank)}
              </span>
              <span> {tftRank.leaguePoints}LP</span>
            </div>
            <div className="text-center text-xs">
              <span>
                {tftRank.wins}승 {tftRank.losses}패
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Summoner;
