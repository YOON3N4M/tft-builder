import {
  RiotAccountRes,
  SummonerData,
  RiotId,
  RiotMatchInfoRes,
  RiotSummonerRes,
  RiotTftLeagueRes,
  RiotTftMatchListRes,
} from "@/types/riot";
import { apiFetch } from ".";

const TEMP_API_KEY = "RGAPI-1e10c90a-f737-4018-bbaa-50e2c4748a98";

const RIOT_API_KEY = TEMP_API_KEY;

export async function refreshRiotData(riotId: RiotId) {
  const riotData: SummonerData = {
    account: null,
    summoner: null,
    league: null,
    matchInfoList: null,
  };

  const accountRes = await getRiotAccount(riotId);

  if (accountRes.puuid) {
    riotData.account = accountRes;
  }
  const summonerRes = await getTftSummoner(accountRes.puuid);

  if (summonerRes.id) {
    riotData.summoner = summonerRes;
  }

  const leagueRes = await getTftLeague(summonerRes.id);

  if (leagueRes) {
    riotData.league = leagueRes;
  }

  const matchIdListRes = await getTftMatchList(accountRes.puuid);

  if (matchIdListRes) {
    const matchInfoList = await Promise.all(
      matchIdListRes.map(async (id) => await getTftMatchInfo(id))
    );

    riotData.matchInfoList = matchInfoList;
  }

  return riotData;
}

export async function getRiotAccount(riotId: RiotId) {
  const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${riotId.gameName}/${riotId.tagLine}?api_key=${RIOT_API_KEY}`;

  const data = (await apiFetch(url)) as RiotAccountRes;
  return data;
}

export async function getTftSummoner(puuid: string) {
  const url = `https://kr.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${puuid}?api_key=${RIOT_API_KEY}`;

  const data = (await apiFetch(url)) as RiotSummonerRes;
  return data;
}

export async function getTftLeague(summonerId: string) {
  const url = `https://kr.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerId}?api_key=${RIOT_API_KEY}`;

  const data = (await apiFetch(url)) as RiotTftLeagueRes[];
  return data;
}

export async function getTftMatchList(puuid: string) {
  const url = `https://asia.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${RIOT_API_KEY}`;

  const data = (await apiFetch(url)) as RiotTftMatchListRes;
  return data;
}

export async function getTftMatchInfo(matchId: string) {
  const url = `https://asia.api.riotgames.com/tft/match/v1/matches/${matchId}?api_key=${RIOT_API_KEY}`;

  const data = (await apiFetch(url)) as RiotMatchInfoRes;
  return data;
}
