import {
  AccountDto,
  RiotAccountRes,
  RiotId,
  RiotMatchInfoRes,
  RiotSummonerRes,
  RiotTftLeagueRes,
  RiotTftMatchListRes,
  SummonerData,
} from "@/types/riot";

import { filterNull } from "@/utils";

const TEMP_API_KEY = "RGAPI-1d453e58-2717-4e5c-9965-6bc2c72a42fc";

const RIOT_API_KEY = TEMP_API_KEY;

export async function refreshRiotData(riotId: RiotId) {
  const riotData: SummonerData = {
    account: null,
    summoner: null,
    league: null,
    matchInfoList: null,
  };

  const accountRes = await getRiotAccount(riotId);

  if (!accountRes) return riotData;

  riotData.account = accountRes;

  const summonerRes = await getTftSummoner(accountRes.puuid);
  if (!summonerRes) return riotData;

  riotData.summoner = summonerRes;

  const leagueRes = await getTftLeague(summonerRes.id);
  if (!leagueRes) return riotData;

  riotData.league = leagueRes;

  const matchIdListRes = await getTftMatchList(accountRes.puuid);

  if (!matchIdListRes) return riotData;

  const matchInfoList = await Promise.all(
    matchIdListRes.map(async (id) => await getTftMatchInfo(id))
  );

  const filtered = filterNull(matchInfoList) as RiotMatchInfoRes[];

  riotData.matchInfoList = filtered;

  return riotData;
}

export async function getRiotAccount(
  riotId: RiotId
): Promise<RiotAccountRes | null> {
  const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${riotId.gameName}/${riotId.tagLine}?api_key=${RIOT_API_KEY}`;

  const data = await riotApiFetch(url);

  return data;
}
export async function getRiotAccountByPuuid(
  puuid: string
): Promise<AccountDto | null> {
  const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}?api_key=${RIOT_API_KEY}`;

  const data = await riotApiFetch(url);
  return data;
}
export async function getTftSummoner(
  puuid: string
): Promise<RiotSummonerRes | null> {
  const url = `https://kr.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${puuid}?api_key=${RIOT_API_KEY}`;

  const data = await riotApiFetch(url);
  return data;
}

export async function getTftLeague(
  summonerId: string
): Promise<RiotTftLeagueRes[] | null> {
  const url = `https://kr.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerId}?api_key=${RIOT_API_KEY}`;

  const data = await riotApiFetch(url);
  return data;
}

export async function getTftMatchList(
  puuid: string
): Promise<RiotTftMatchListRes | null> {
  const url = `https://asia.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${RIOT_API_KEY}`;

  const data = await riotApiFetch(url);

  return data;
}

export async function getTftMatchInfo(
  matchId: string
): Promise<RiotMatchInfoRes | null> {
  const url = `https://asia.api.riotgames.com/tft/match/v1/matches/${matchId}?api_key=${RIOT_API_KEY}`;

  const data = await riotApiFetch(url);
  return data;
}

export async function riotApiFetch(url: string, option?: RequestInit) {
  try {
    const res = await fetch(url, option);
    const result = await res.json();

    if (result.status && result.status.status_code !== 200) {
      return null;
    }

    return result;
  } catch (error) {
    return null;
  }
}
