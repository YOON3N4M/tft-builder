export interface AccountDto {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export interface SummonerData {
  account: RiotAccountRes | null;
  summoner: RiotSummonerRes | null;
  league: RiotTftLeagueRes[] | null;
  matchInfoList: RiotMatchInfoRes[] | null;
}

export interface RiotId {
  gameName: string;
  tagLine: string;
}

export interface RiotFailedRes {
  status_code: number;
  message: string;
}

export interface RiotAccountRes {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export interface RiotSummonerRes {
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

export interface RiotTftLeagueRes {
  puuid: string;
  leagueId: string;
  queueType: "RANKED_TFT" | string;
  tier: string;
  rank: string;
  summonerId: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}

export type RiotTftMatchListRes = string[];

export interface RiotMatchInfoRes {
  metadata: MetadataDto;
  info: InfoDto;
}

//
export interface MetadataDto {
  data_version: string;
  match_id: string;
  participants: string[];
}
export interface InfoDto {
  game_datetime: number;
  game_length: number;
  game_variation: string;
  game_version: string;
  participants: ParticipanthDto[];
  queue_id: number;
  tft_set_number: number;
}
export interface ParticipanthDto {
  // 증강체
  aguments: string[];
  companion: CompanionRes;
  gold_left: number;
  last_round: number;
  level: number;
  placement: number;
  players_eliminated: number;
  puuid: string;
  //뭔 데이터인지 모르겠음
  time_eliminated: any;
  total_damage_to_players: number;
  traits: TraitDto[];
  units: UnitDto[];
}
export interface TraitDto {
  name: string;
  num_units: number;
  style: number;
  tier_current: number;
  tier_total: number;
}
export interface UnitDto {
  itemNames: number[];
  character_id: string;
  chosen: string;
  name: string;
  rarity: number;
  tier: number;
}

export interface CompanionRes {
  content_ID: string;
  item_ID: number;
  skin_ID: number;
  species: string;
}

export interface TacticianRes {
  id: string;
  tier: string;
  name: string;
  image: {
    full: string;
  };
}
