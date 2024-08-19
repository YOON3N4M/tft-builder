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
  "아르카나 증표 아이템을 사용해 하이 아르카나 챔피언을 선택하세요. 각 아르카나는 서로 다른 조건에 따라 효과를 부여합니다.\n효과 획득 조건:\n아리: 3성 챔피언 배치\n헤카림: 아이템 장착\n탐 켄치: 특성 활성화\n제라스: 주술 구매\n상징: 뒤집개 아이템 장착",
  [
    "해당 유닛의 효과",
    "해당 유닛의 효과",
    "해당 유닛의 효과",
    "해당 유닛의 효과",
  ]
);
export const CHRONO = generateSynergy(
  "시공간",
  [2, 4, 6],
  ["bronze", "silver", "gold"],
  ["chrono"],
  "시공간이 주문력을 15 얻습니다.\n\n전투 시작: 16초의 초읽기가 시작되고, 시공간이 스킬을 사용할 때마다 1초씩 줄어듭니다. 초읽기가 끝나면 특별한 효과를 얻습니다.",
  [
    "아군이 체력 20% 회복, 시공간은 주문력 20 추가로 증가",
    "또한 2.5초 동안 시간을 멈춤. 시공간은 시간 정지의 영향을 받지 않으며 주문력 35 증가",
    "또한 시공간이 공격 속도를 60% 얻고 아군이 대신 체력을 100% 회복",
  ]
);
export const DRAGON = generateSynergy(
  "용",
  [2, 3],
  ["silver", "gold"],
  ["dragon"],
  "",
  [
    "용의 기본 공격과 스킬이 5초 동안 적에게 불태우기와 상처를 1% 적용",
    "우정의 힘으로 모든 용의 스킬 강화!",
  ]
);
export const DRUID = generateSynergy("드루이드", [1], ["gold"], ["druid"], "", [
  "오공은 특성 추가 효과가 없지만, 대신 스킬이 강력하고 능력치가 높습니다.",
]);
export const ELDRITCH = generateSynergy(
  "섬뜩한 힘",
  [3, 5, 7, 10],
  ["bronze", "silver", "gold", "prism"],
  ["eldritch"],
  "아군이 체력을 20% 잃으면 고대 신이 강림합니다. 고대 신은 섬뜩한 힘의 별 레벨당 체력을 25%, 주문력을 10% 얻습니다.",
  ["더럽혀진 골렘", "암흑 거석", "수많은 눈의 짐승", "폭풍을 부르는 자"]
);
export const FAERIE = generateSynergy(
  "요정",
  [2, 4, 6, 9],
  ["bronze", "silver", "gold", "gold"],
  ["faerie"],
  "요정이 체력을 얻고 특성 단계에 따라 더 강력해지는 특별한 아이템을 생성합니다.\n\n 요정만 요정 아이템을 장착할 수 있습니다.",
  [
    "체력 100, 피해 증폭을 25% 부여하는 요정 여왕의 왕관 획득",
    "체력 400, 왕관 피해 증폭 35%",
    "체력 600, 왕관 피해 증폭 40%, 여왕 근위대의 갑옷 획득",
    "체력 850, 왕관 피해 증폭 75%, 두 아이템이 모두 찬란한 아이템이 됨",
  ]
);
export const FROST = generateSynergy(
  "서리",
  [3, 5, 7, 9],
  ["bronze", "silver", "gold", "prism"],
  ["frost"],
  "서리 챔피언이 주문력과 공격력을 얻습니다. 먼저 처치된 적 몇 명이 아군 얼음 병사가 됩니다. 얼음 병사는 적이 범위 내에서 대상을 재지정할 때 자신에게 기본 공격을 하도록 유도합니다.",
  [
    "공격력/주문력의 16% 병사 1명",
    "공격력/주문력의 35%, 병사 2명",
    "공격력/주문력의 50%, 병사 3명, 병사가 처치되면 폭발함",
    "공격력/주문력의 80%, 병사 4명, 폭발 위력이 2배로 증가",
  ]
);
export const HONEYMANCY = generateSynergy(
  "벌꿀술사",
  [3, 5, 7],
  ["bronze", "gold", "gold"],
  ["honeymancy"],
  "벌꿀술사가 꿀벌을 얻습니다. 꿀벌은 3초마다 대상에게 마법 피해를 입힙니다. 각 꿀벌은 벌꿀술사가 입힌 피해의 7.5% 및 받은 피해의 2.5%만큼 피해를 입힙니다.\n\n벌꿀술사가 처치되면 전투가 끝날 때까지 근처 벌꿀술사를 따라다니는 꿀벌 1마리를 남깁니다.",
  ["꿀벌 3마리", "꿀벌 5마리", "꿀벌 8마리, 대신 꿀벌 3마리를 남김"]
);
export const PORTAL = generateSynergy(
  "차원문",
  [3, 6, 8, 10],
  ["bronze", "silver", "gold", "prism"],
  ["portal"],
  "전투 시작: 15초 동안 차원문 챔피언이 보호막을 얻습니다.\n\n몇 초마다 다른 차원의 물체가 차원문에서 날아와 아군을 돕고 적을 방해합니다. 차원문 효과는 차원문 챔피언의 별 레벨당 8%만큼 더 강력해집니다 ",
  [
    "200의 보호막, 소형 차원문",
    "450의 보호막, 중형 차원문",
    "700의 보호막, 대형 차원문",
    "1500의 보호막, 특대형 차원문",
  ]
);
export const PYRO = generateSynergy(
  "화염",
  [2, 3, 4, 5],
  ["bronze", "silver", "gold", "gold"],
  ["pyro"],
  "아군이 공격 속도를 3% 얻습니다. 화염 챔피언이 공격 속도를 얻고 체력이 12% 아래인 적을 처형합니다.\n\n적을 처치할 때마다 화염 챔피언이 다음 라운드에 수집할 수 있는 지옥 잉걸불을 생성합니다. 잉걸불을 4개 수집할 때마다 아군의 공격 속도가 1% 더 증가합니다.",
  [
    "공격 속도 12% 증가",
    "공격 속도 25% 증가",
    "공격 속도 45% 증가",
    "공격 속도 70% 증가 및 체력 18% 아래 적 처형",
  ]
);
export const RAVENOUS = generateSynergy(
  "허기",
  [1],
  ["gold"],
  ["ravenous"],
  "",
  [
    "잃은 플레이어 체력당 브라이어가 피해 증폭을 0.6% 얻습니다. 라운드마다 플레이어 체력을 3 소모해 브라이어에게 체력을 150 부여할 수 있는 간식 1개를 획득합니다.",
  ]
);
export const SUGARCRAFT = generateSynergy(
  "달콤술사",
  [2, 4, 6],
  ["bronze", "silver", "gold"],
  ["sugarcraft"],
  "달콤술사가 설탕으로 케이크를 겹겹히 쌓아 올립니다. 플레이어 대상 전투 만듭니다. 플레이어 대상 전투 후 아군 챔피언이 장착한 조합 아이템 1개당 설탕을 얻습니다.\n\n달콤술사가 공격력과 주문력을 얻으며, 케이크 한 층당 추가 능력치가 10% 증가합니다. 케이크가 7층까지 쌓이면, 대신 간식을 얻습니다!",
  [
    "설탕 2개, 공격력/주문력 12",
    "설탕 4개, 공격력/주문력 25",
    "설탕 6개, 공격력/주문력 35, 아군 체력 150 증가",
  ]
);
export const WITCHCRAFT = generateSynergy(
  "마녀",
  [2, 4, 6, 8],
  ["bronze", "silver", "gold", "gold"],
  ["witchcraft"],
  "마녀의 스킬이 4초 동안 적에게 저주를 겁니다. 저주에 걸린 적이 처치되면 저주가 가장 가까운 적에게 옮겨갑니다.",
  [
    "크기가 작아지고, 체력 150 감소",
    "또한 초록색이 되고, 받은 피해의 18%만큼 체력이 가장 낮은 마녀의 체력 회복",
    "또한 허약해져, 마녀로부터 25%의 추가 고정 피해를 입음",
    "또한 개구리가 되어, 8초마다 2초 동안 기절. 다른 모든 저주의 효과가 40% 증가",
  ]
);

//Class
export const ASCENDANT = generateSynergy(
  "초월체",
  [1],
  ["gold"],
  ["ascendant"],
  "",
  [
    "초월체 주술이 상점에 등장할 수 있습니다. 등장 확률은 플레이어 대상 전투가 끝나면 8% 증가하며, 최대 40% 증가합니다. 초월체 주술을 구매하면 이 확률은 초기화됩니다.",
  ]
);
export const BASTION = generateSynergy(
  "요새",
  [2, 4, 6, 8],
  ["bronze", "silver", "gold", "gold"],
  ["bastion"],
  "아군이 방어력과 마법 저항력을 10 얻습니다.\n\n요새는 능력치를 더 얻습니다. 전투 시작 후 10초 동안, 요새는 추가 수치를 2배로 얻습니다.",
  [
    "방어력 및 마법 저항력 15",
    "방어력 및 마법 저항력 40",
    "방어력 및 마법 저항력 70",
    "방어력 및 마법 저항력 120, 요새 유닛 4명이 처치될 때까지 후방 가로 2열에서 전투를 시작한 챔피언 2명이 무적이 됨",
  ]
);
export const BAT_QUEEN = generateSynergy(
  "박쥐여왕",
  [1],
  ["gold"],
  ["bat_queen"],
  "",
  [
    "모르가나의 박쥐가 적을 처치하면, 40% 확률로 해당 적의 1성 복사본을 납치합니다.",
  ]
);
export const BEST_FRIEND = generateSynergy(
  "단짝",
  [1],
  ["gold"],
  ["best_friend"],
  "",
  [
    "노라가 아군을 돕기 위해 유미를 소환합니다! 유미를 아군 유닛 위에 올려 아군에게 밀착시킬 수 있습니다. 유미는 노라와 주문력을 공유하고 노라가 처치되면 함께 처치됩니다.",
  ]
);
export const BLASTER = generateSynergy(
  "폭파단",
  [2, 4, 6],
  ["bronze", "silver", "gold"],
  ["blaster"],
  "폭파단이 피해 증폭을 얻으며, 스킬을 사용하면 3초 동안 피해 증폭이 더 증가합니다.",
  [
    "피해 증폭 12%, 스킬 사용 후 지속시간 동안 25%",
    "피해 증폭 25%, 스킬 사용 후 지속시간 동안 50%",
    "피해 증폭 45%, 스킬 사용 후 지속시간 동안 90%",
  ]
);
export const HUNTER = generateSynergy(
  "사냥꾼",
  [2, 4, 6],
  ["bronze", "silver", "gold"],
  ["hunter"],
  "사냥꾼이 공격력을 얻습니다. 각 전투에서 처음으로 처치에 관여할 때마다 공격력이 추가로 증가합니다.",
  [
    "공격력 15%, 처치 관여 후 30%",
    "공격력 40%, 처치 관여 후 65%",
    "공격력 70%, 처치 관여 후 110%",
  ]
);
export const INCANTOR = generateSynergy(
  "마도사",
  [2, 4],
  ["silver", "gold"],
  ["incantor"],
  "아군이 주문력을 10 얻습니다.\n\n마도사가 기본 공격을 하거나 스킬을 사용하면 모든 마도사가 주문력 중첩을 얻습니다. 최대 40회 중첩됩니다. 기본 공격 2회마다 중첩을 1회 얻고, 스킬을 사용할 때마다 중첩을 3회 얻습니다.",
  ["중첩당 주문력 1", "중첩당 주문력 2, 아군 주문력 20 획득"]
);
export const MAGE = generateSynergy(
  "요술사",
  [3, 5, 7, 9],
  ["bronze", "silver", "gold", "gold"],
  ["mage"],
  "요술사는 스킬을 2번 사용하고 총 주문력이 조정됩니다.",
  ["주문력의 75%", "주문력의 90%", "주문력의 105%", "주문력의 135%"]
);
export const MULTISTRIKER = generateSynergy(
  "쇄도자",
  [3, 5, 7, 9],
  ["bronze", "silver", "gold", "gold"],
  ["multistriker"],
  "쇄도자가 기본 공격 시 일정 확률로 2회 추가로 공격합니다.",
  [
    "30% 확률",
    "55% 확률",
    "70% 확률, 기본 공격할 때마다 최대 체력의 3% 회복",
    "100% 확률, 기본 공격할 때마다 최대 체력의 10% 회복",
  ]
);
export const PRESERVER = generateSynergy(
  "보호술사",
  [2, 3, 4, 5],
  ["bronze", "silver", "silver", "gold"],
  ["preserver"],
  "3초마다 아군이 최대 체력의 일정 비율만큼 체력을 회복합니다. 체력이 최대라면, 대신 마나를 회복합니다.\n\n보호술사는 2배로 회복합니다.",
  [
    "체력의 2% 또는 마나의 3%",
    "체력의 4% 또는 마나의 5%",
    "체력의 6% 또는 마나의 7%",
    "체력의 9% 또는 마나의 11%",
  ]
);
export const SCHOLAR = generateSynergy(
  "학자",
  [2, 4, 6],
  ["bronze", "silver", "gold"],
  ["scholar"],
  "학자들은 기본 공격 시 추가 마나를 얻습니다.",
  ["기본 공격당 마나 3", "기본 공격당 마나 6", "기본 공격당 마나 12"]
);
export const SHAPESHIFTER = generateSynergy(
  "형상변환자",
  [2, 4, 6, 8],
  ["bronze", "silver", "gold"],
  ["shapeshifter"],
  "형상변환자가 최대 체력을 얻습니다. 스킬을 처음으로 사용하면 이 효과가 3배가 됩니다.",
  ["체력 10%", "체력 15%", "체력 21%", "체력 30%"]
);
export const VANGUARD = generateSynergy(
  "선봉대",
  [2, 4, 6],
  ["bronze", "silver", "gold"],
  ["vanguard"],
  "선봉대가 보호막이 씌워졌을 때 내구력을 10% 얻습니다.\n\n전투 시작 시 및 체력 50% 도달 시: 10초 동안 최대 체력의 일부만큼 보호막을 얻습니다.",
  ["최대 체력의 18%", "최대 체력의 35%", "최대 체력의 50%"]
);
export const WARRIOR = generateSynergy(
  "전사",
  [2, 4, 6],
  ["bronze", "silver", "gold"],
  ["warrior"],
  "전사가 모든 피해 흡혈과 피해 증폭을 얻습니다. 전사의 체력이 60% 아래로 떨어지면, 피해 증폭을 2배로 얻습니다.",
  [
    "모든 피해 흡혈 10%, 피해 증폭 10%",
    "모든 피해 흡혈 20%, 피해 증폭 20%",
    "모든 피해 흡혈 30%, 피해 증폭 30%",
  ]
);

export const SYNERGY_LIST = [
  ARCANA,
  CHRONO,
  DRAGON,
  DRUID,
  ELDRITCH,
  FAERIE,
  FROST,
  HONEYMANCY,
  PORTAL,
  PYRO,
  RAVENOUS,
  SUGARCRAFT,
  WITCHCRAFT,
  ASCENDANT,
  BASTION,
  BAT_QUEEN,
  BEST_FRIEND,
  BLASTER,
  HUNTER,
  INCANTOR,
  MAGE,
  MULTISTRIKER,
  PRESERVER,
  SCHOLAR,
  SHAPESHIFTER,
  VANGUARD,
  WARRIOR,
];
