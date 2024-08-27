import { getRiotAccountByPuuid } from "@/app/services/riot";
import ChampionPortrait from "@/components/ChampionPortrait";
import SynergyPortrait from "@/components/SynergyPortrait";
import { Champion } from "@/data/champions";
import { RiotMatchInfoRes } from "@/types/riot";
import {
  cn,
  filterUndefined,
  findChampion,
  generateIndexedChampion,
  sortByNumber,
} from "@/utils";
import CompanionPortrait from "./CompanionPortrait";

interface MatchProps {
  puuid: string;
  match: RiotMatchInfoRes;
}

const bgColorStyles: { [key: string]: string } = {
  "1": "bg-tier-5",
  "2": "bg-tier-3",
  "3": "bg-tier-3",
  "4": "bg-tier-3",
  "5": "bg-tier-1",
  "6": "bg-tier-1",
  "7": "bg-tier-1",
  "8": "bg-tier-1",
};

const textColorStyles: { [key: string]: string } = {
  "1": "text-tier-5",
  "2": "text-tier-3",
  "3": "text-tier-3",
  "4": "text-tier-3",
  "5": "text-tier-1",
  "6": "text-tier-1",
  "7": "text-tier-1",
  "8": "text-tier-1",
};

const synergyBgStyles: { [key: string]: string } = {
  "1": "bg-gray-900",
  "2": "bg-[#a0715e]",
  "3": "bg-[#7c8f92]",
  "4": "bg-[#bd9a38]",
  "5": "bg-[#ad1457]",
};

async function Match(props: MatchProps) {
  const { match, puuid } = props;

  const matchId = match.metadata.match_id;
  console.log(match.info.participants);

  const searchedPlayerInfo = match.info.participants.find(
    (parti) => parti.puuid === puuid
  );

  if (!searchedPlayerInfo) return;

  const traits = sortByNumber(searchedPlayerInfo.traits, "style", true);

  const unitList = searchedPlayerInfo?.units.map((unit) =>
    findChampion(unit.character_id)
  );

  const filteredUndefinedUnitList = filterUndefined(unitList!) as Champion[];

  const indexedChampionList = filteredUndefinedUnitList.map((champion, idx) =>
    generateIndexedChampion(champion, idx)
  );

  const playerNameList = await Promise.all(
    match.metadata.participants.map(
      async (puuid) => await getRiotAccountByPuuid(puuid)
    )
  );

  if (!searchedPlayerInfo) return;
  console.log(traits);

  return (
    <div className="flex rounded-md overflow-hidden">
      {/* 좌측 외곽선 */}
      <div
        className={cn(
          "h-full w-[8px]",
          bgColorStyles[searchedPlayerInfo.placement.toString()]
        )}
      ></div>
      <div className="bg-content-bg flex-1 border-[#222]">
        <div className="px-sm py-xxs">
          <span
            className={cn(
              "font-semibold !bg-none",
              textColorStyles[searchedPlayerInfo.placement.toString()]
            )}
          >
            #{searchedPlayerInfo.placement}
          </span>
        </div>
        <div className="border-t flex items-center border-[#222] px-sm py-xs">
          <div className="py-sm">
            <CompanionPortrait
              id={searchedPlayerInfo.companion.item_ID.toString()}
            />
          </div>
          {/* 시너지 */}
          <div className="flex ml-lg basis-[15%] flex-wrap gap-xxs h-min">
            {traits.map((trait) => (
              <SynergyPortrait
                size="sm"
                key={`${matchId}-${trait.name}`}
                name={trait.name}
                unitQty={trait.num_units}
                tierCurrent={trait.tier_current}
                style={trait.style}
                noActiveHide={true}
                indexedChampionList={indexedChampionList}
              />
            ))}
          </div>
          {/* 증강 */}
          <div></div>
          {/* 챔피언 */}
          <div className="flex items-center ml-lg gap-xs baisis-[50%] flex-wrap">
            {filteredUndefinedUnitList?.map((unit) => (
              <ChampionPortrait
                tooltip
                className="size-[40px]"
                objectPosition="object-[-35px_0px]"
                key={`${matchId}-${unit?.id}`}
                champion={unit}
              />
            ))}
          </div>
          {/* 닉네임 */}
          <div className="ml-auto grid grid-cols-2 basis-[20%] text-xs">
            {playerNameList.map((account) => (
              <div
                className="text-ellipsis overflow-hidden whitespace-nowrap"
                key={`${matchId}-${account.gameName}`}
              >
                <span>{account.gameName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Match;
