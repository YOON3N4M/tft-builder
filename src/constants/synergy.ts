export type SynergyTier = "unranked" | "bronze" | "silver" | "gold" | "prism";

export interface Synergy {
  name: string;
  requirQty: number[];
  tier: SynergyTier[];
  src: string[];
  desc: string;
  // 단계별 효과?
  effect: string[];
}

// 직업과 계열을 구분 해야 하는지?
function generateSynergy(
  name: string,
  requirQty: number[],
  tier: SynergyTier[],
  src: string[],
  desc: string,
  effect: string[]
): Synergy {
  return { name, requirQty, tier, src, desc, effect };
}

// Origin
export const ARCANA = generateSynergy(
  "아르카나",
  [2, 3, 4, 5],
  ["bronze", "silver", "gold", "gold"],
  ["arcana"],
  "",
  []
);
export const CHRONO = generateSynergy(
  "시공간",
  [2, 4, 6],
  ["bronze", "silver", "gold"],
  ["chrono"],
  "",
  []
);
export const DRAGON = generateSynergy(
  "용",
  [2, 3],
  ["silver", "gold"],
  ["dragon"],
  "",
  []
);
export const DRUID = generateSynergy(
  "드루이드",
  [1],
  ["gold"],
  ["druid"],
  "",
  []
);
export const ELDRITCH = generateSynergy(
  "섬뜩한 힘",
  [3, 5, 7, 10],
  ["bronze", "silver", "gold", "prism"],
  ["eldritch"],
  "",
  []
);
export const FAERIE = generateSynergy(
  "요정",
  [2, 4, 6, 9],
  ["bronze", "silver", "gold", "gold"],
  ["faerie"],
  "",
  []
);
export const FROST = generateSynergy(
  "서리",
  [3, 5, 7, 9],
  ["bronze", "silver", "gold", "prism"],
  ["frost"],
  "",
  []
);
export const HONEYMANCY = generateSynergy(
  "벌꿀술사",
  [3, 5, 7],
  ["bronze", "gold", "gold"],
  ["honeymancy"],
  "",
  []
);
export const PORTAL = generateSynergy(
  "차원문",
  [3, 6, 8, 10],
  ["bronze", "silver", "gold", "prism"],
  ["portal"],
  "",
  []
);
export const PYRO = generateSynergy(
  "화염",
  [2, 3, 4, 5],
  ["bronze", "silver", "gold", "gold"],
  ["pyro"],
  "",
  []
);
export const RAVENOUS = generateSynergy("허기", [1], ["gold"], [], "", []);
export const SUGARCRAFT = generateSynergy(
  "달콤술사",
  [2, 4, 6],
  ["bronze", "silver", "gold"],
  ["sugarcraft"],
  "",
  []
);
export const WITCHCRAFT = generateSynergy(
  "마녀",
  [2, 4, 6, 8],
  ["bronze", "silver", "gold", "gold"],
  ["witchcraft"],
  "",
  []
);

//Class
export const ASCENDANT = generateSynergy(
  "초월체",
  [1],
  ["gold"],
  ["ascendant"],
  "",
  []
);
export const BASTION = generateSynergy(
  "요새",
  [2, 4, 6, 8],
  ["bronze", "silver", "gold", "gold"],
  ["bastion"],
  "",
  []
);
export const BAT_QUEEN = generateSynergy(
  "박쥐여왕",
  [1],
  ["gold"],
  ["bat_queen"],
  "",
  []
);
export const BEST_FRIEND = generateSynergy(
  "단짝",
  [1],
  ["gold"],
  ["best_friend"],
  "",
  []
);
export const BLASTER = generateSynergy(
  "폭파단",
  [2, 4, 6],
  ["bronze", "silver", "gold"],
  ["blaster"],
  "",
  []
);
export const HUNTER = generateSynergy(
  "사냥꾼",
  [2, 4, 6],
  ["bronze", "silver", "gold"],
  ["blaster"],
  "",
  []
);
export const INCANTOR = generateSynergy(
  "마도사",
  [2, 4],
  ["silver", "gold"],
  ["incantor"],
  "",
  []
);
export const MAGE = generateSynergy(
  "요술사",
  [3, 5, 7, 9],
  ["bronze", "silver", "gold", "gold"],
  ["mage"],
  "",
  []
);
export const MULTISTRIKER = generateSynergy(
  "쇄도자",
  [3, 5, 7, 9],
  ["bronze", "silver", "gold", "gold"],
  ["multistriker"],
  "",
  []
);
export const PRESERVER = generateSynergy(
  "보호술사",
  [2, 3, 4, 5],
  ["bronze", "silver", "silver", "gold"],
  ["preserver"],
  "",
  []
);
export const SCHOLAR = generateSynergy(
  "학자",
  [2, 4, 6],
  ["bronze", "silver", "gold"],
  ["scholar"],
  "",
  []
);
export const SHAPESHIFTER = generateSynergy(
  "형상변환자",
  [2, 4, 6],
  ["bronze", "silver", "gold"],
  ["shapeshifter"],
  "",
  []
);
export const VANGUARD = generateSynergy(
  "선봉대",
  [2, 4, 6],
  ["bronze", "silver", "gold"],
  ["vanguard"],
  "",
  []
);
export const WARRIOR = generateSynergy(
  "전사",
  [2, 4, 6],
  ["bronze", "silver", "gold"],
  ["warrior"],
  "",
  []
);
