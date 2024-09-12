import { getRiotAccountByPuuid } from "@/services/riot";

import BuildCopyButton from "@/components/BuildCopyButton";
import AugmentPortrait from "@/components/portraits/AugmentPortrait";

import ChampionPortrait from "@/components/portraits/ChampionPortrait";
import SynergyPortrait from "@/components/portraits/SynergyPortrait";

import TacticianPortrait from "@/components/portraits/TacticianPortrait";

import { Champion } from "@/data/set/12/champions";
import { RiotMatchInfoRes } from "@/types/riot";
import {
  cn,
  filterNull,
  filterUndefined,
  findChampion,
  findItem,
  generateIndexedChampion,
  sortByNumber,
} from "@/utils";
import { generateSaveUrl } from "@/utils/localstorage";
import ItemPortrait from "@/components/portraits/ItemPortrait";
import { THIEFS_GLOVES } from "@/data/item";
import { Star } from "@/components/svgs";
import { IndexedChampion } from "@/components/field/Field";
import Link from "next/link";

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

interface MatchIndexedChampion extends IndexedChampion {
  tier: number;
}

async function Match(props: MatchProps) {
  const { match, puuid } = props;

  const matchId = match.metadata.match_id;

  const searchedPlayerInfo = match.info.participants.find(
    (parti) => parti.puuid === puuid
  );

  if (!searchedPlayerInfo) return;

  const traits = sortByNumber(searchedPlayerInfo.traits, "style", true);

  const augments = searchedPlayerInfo.augments;

  const indexedChampionList = filterNull(
    searchedPlayerInfo.units.map((unit, idx) => {
      const champion = findChampion(unit.character_id) as Champion;

      if (!champion) return null;
      let itemList = filterNull(
        unit.itemNames.map((item) => {
          const isEmblem = item.includes("EmblemItem");
          const emblemQuery = `TFT12_EmblemItems/${item}`;
          return findItem(isEmblem ? emblemQuery : item);
        })
      );

      if (itemList.some((item) => item.name === "도적의 장갑")) {
        itemList = [THIEFS_GLOVES];
      }

      const matchIndexedChampuion = {
        ...generateIndexedChampion(champion, idx, itemList),
        tier: unit.tier,
      };

      return matchIndexedChampuion;
    })
  );

  const url = generateSaveUrl(indexedChampionList);

  const playerNameList = filterNull(
    await Promise.all(
      match.metadata.participants.map(
        async (puuid) => await getRiotAccountByPuuid(puuid)
      )
    )
  );

  if (!searchedPlayerInfo) return;

  return (
    <div className="flex rounded-md items-stretch h-auto">
      {/* 좌측 외곽선 */}
      <div
        className={cn(
          "h-auto w-[8px] self-stretch rounded-l-md",
          bgColorStyles[searchedPlayerInfo.placement.toString()]
        )}
      ></div>
      <div className="bg-content-bg flex-1 border-[#222]">
        <div className="flex px-sm py-xxs w-full">
          <span
            className={cn(
              "font-semibold !bg-none",
              textColorStyles[searchedPlayerInfo.placement.toString()]
            )}
          >
            #{searchedPlayerInfo.placement}
          </span>
          <div className="ml-auto">
            <BuildCopyButton url={url} />
          </div>
        </div>

        <div className="border-t flex items-center border-[#222] px-sm py-xs">
          <div className="py-sm">
            <TacticianPortrait id={searchedPlayerInfo.companion.item_ID} />
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
          <div className="flex flex-col gap-xxs">
            {augments.map((augment, idx) => (
              <AugmentPortrait name={augment} key={`${match}-augment-${idx}`} />
            ))}
          </div>
          {/* 챔피언 */}
          <div className="flex items-start ml-lg gap-xs basis-[50%] flex-wrap mo:flex-1">
            {indexedChampionList.map((unit, idx) => (
              <div
                className="flex flex-col items-center"
                key={`${matchId}-${unit?.champion.id}-${idx}`}
              >
                <div className="flex">
                  {Array(unit.tier)
                    .fill(0)
                    .map((_, idx) => (
                      <Star key={idx} size={"11px"} />
                    ))}
                </div>
                <ChampionPortrait
                  tooltip
                  className="size-[40px] mt-xxxs"
                  champion={unit.champion}
                />
                <div className="flex justify-center mt-xxxs">
                  {unit.itemList.map((item, idx) => (
                    <ItemPortrait
                      className="size-[15px] !rounded-none !cursor-default"
                      key={`${matchId}-item-${unit.champion.name}-${idx}`}
                      item={item}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* 닉네임 */}
          <div className="ml-auto grid grid-cols-2 basis-[20%] text-xs mo:hidden tab:hidden">
            {playerNameList.map((account) => (
              <div
                className="text-ellipsis overflow-hidden whitespace-nowrap"
                key={`${matchId}-${account.gameName}`}
              >
                <Link href={`/summoner/${account.gameName}-${account.tagLine}`}>
                  {account.gameName}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Match;
