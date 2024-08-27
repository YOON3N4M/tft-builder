import {
  RiotAccountRes,
  SummonerData,
  RiotId,
  RiotMatchInfoRes,
  RiotSummonerRes,
  RiotTftLeagueRes,
  RiotTftMatchListRes,
  TacticianRes,
  AccountDto,
} from "@/types/riot";
import { apiFetch } from ".";
import { TACTICIAN_JSON_URL } from "@/constants/url";

const TEMP_API_KEY = "RGAPI-50271633-fc0c-4d51-a40c-d571fc5b5bc5";

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
export async function getRiotAccountByPuuid(puuid: string) {
  const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}?api_key=${RIOT_API_KEY}`;

  const data = (await apiFetch(url)) as AccountDto;
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
  const url = `https://asia.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${RIOT_API_KEY}`;

  const data = (await apiFetch(url)) as RiotTftMatchListRes;
  return data;
}

export async function getTftMatchInfo(matchId: string) {
  const url = `https://asia.api.riotgames.com/tft/match/v1/matches/${matchId}?api_key=${RIOT_API_KEY}`;

  const data = (await apiFetch(url)) as RiotMatchInfoRes;
  return data;
}

export async function getTacticianList() {
  const data = await apiFetch(TACTICIAN_JSON_URL());
  return data;
}

export async function fetchTacticianData(idToFind: string) {
  try {
    const response = await fetch(TACTICIAN_JSON_URL());
    const jsonData = await response.json();

    // 데이터가 담긴 객체에서 특정 id 값을 가진 항목 찾기
    const tacticianData = jsonData.data[idToFind] as TacticianRes;

    if (tacticianData) {
      // console.log("Tactician Data:", tacticianData);
      return tacticianData;
    } else {
      //  console.log(`No tactician found with id: ${idToFind}`);
    }
  } catch (error) {
    //console.error("Error fetching data:", error);
  }
}
