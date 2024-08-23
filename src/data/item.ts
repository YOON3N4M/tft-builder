//조합 아이템
export interface CombinationItem {
  id: number;
  name: string;
  effect: string[];
  src: string;
}

export interface CoreItem extends CombinationItem {
  desc: string;
  recipe: { requireItem: CombinationItem; qty: number }[];
}

function generateItem(
  id: number,
  name: string,
  effect: string[],
  src: string,
  desc: string
): CombinationItem;
function generateItem(
  id: number,
  name: string,
  effect: string[],
  src: string,
  desc: string,
  recipe: { requireItem: CombinationItem; qty: number }[]
): CoreItem;

function generateItem(
  id: number,
  name: string,
  effect: string[],
  src: string,
  desc: string,
  recipe?: any
): CombinationItem | CoreItem {
  if (recipe) {
    return {
      id,
      name,
      effect,
      src,
      desc,
      recipe,
    } as CoreItem;
  } else {
    return {
      id,
      name,
      effect,
      src,
    } as CombinationItem;
  }
}

export const BF_SWRORD = generateItem(
  1,
  "BF 대검",
  ["공격력 10%"],
  "TFT_Item_BFSword.png",
  ""
);
export const RECURVE_BOW = generateItem(
  2,
  "곡궁",
  ["공격속도 10%"],
  "TFT_Item_RecurveBow.png",
  ""
);
export const CHAIN_VEST = generateItem(
  3,
  "쇠사슬 갑옷",
  ["방어력 +20"],
  "TFT_Item_ChainVest.png",
  ""
);
export const NEGATRON_CLOAK = generateItem(
  4,
  "음전자 망토",
  ["마법저항력 +20"],
  "TFT_Item_NegatronCloak.png",
  ""
);
export const NEEDLESSLY_LARGE_ROD = generateItem(
  5,
  "쓸데없이 큰 지팡이",
  ["주문력 +10"],
  "TFT_Item_NeedlesslyLargeRod.png",
  ""
);
export const TEAR_OF_THE_GADDESS = generateItem(
  6,
  "여신의 눈물",
  ["마나 +15"],
  "TFT_Item_TearOfTheGoddess.png",
  ""
);
export const GIANTS_BELT = generateItem(
  7,
  "거인의 허리띠",
  ["체력 +150"],
  "TFT_Item_GiantsBelt.png",
  ""
);
export const SPARRINGS_GLOVES = generateItem(
  8,
  "싸움꾼의 장갑",
  ["치명타 확률 20%"],
  "TFT_Item_SparringGloves.png",
  ""
);
export const SPATULA = generateItem(
  100,
  "뒤집개",
  ["-"],
  "TFT_Item_Spatula.png",
  ""
);

export const COMBINATION_ITEM_LIST = [
  BF_SWRORD,
  NEEDLESSLY_LARGE_ROD,
  RECURVE_BOW,
  TEAR_OF_THE_GADDESS,
  SPARRINGS_GLOVES,
  CHAIN_VEST,
  NEGATRON_CLOAK,
  GIANTS_BELT,
  // SPATULA,
];

//완성 아이템
const DEATH_BLADE = generateItem(
  9,
  "죽음의 검",
  ["공격력 +55%", "피해량 증가 8%"],
  "TFT_Item_Deathblade.png",
  "",
  [{ requireItem: BF_SWRORD, qty: 2 }]
);

const GIANTS_SLAYER = generateItem(
  10,
  "거인 학살자",
  ["공격력 +30%", "주문력 +20", "공격속도 10%"],
  "TFT_Item_MadredsBloodrazor.png",
  "최대 체력이 1750 이상인 적을 상대로 피해 증폭을 25% 획득",
  [
    { requireItem: BF_SWRORD, qty: 1 },
    { requireItem: RECURVE_BOW, qty: 1 },
  ]
);

const HAND_OF_JUSTICE = generateItem(
  11,
  "정의의 손길",
  ["마나 +15", "치명타 확률 +20%"],
  "TFT_Item_UnstableConcoction.png",
  "2가지 효과를 획득:\n- 공격력 15%, 주문력 15\n- 모든 피해 흡혈 15%\n\n라운드마다 위 효과 중 1개 무작위로 2배 증가",
  [
    { requireItem: TEAR_OF_THE_GADDESS, qty: 1 },
    { requireItem: SPARRINGS_GLOVES, qty: 1 },
  ]
);

const SPEAR_OF_SHOJIN = generateItem(
  12,
  "쇼진의 창",
  ["마나 +15", "공격력 +20%", "주문력 +20"],
  "TFT_Item_SpearOfShojin.png",
  "기본 공격시 추가 마나 5 획득",
  [
    { requireItem: TEAR_OF_THE_GADDESS, qty: 1 },
    { requireItem: BF_SWRORD, qty: 1 },
  ]
);

export const THIEFS_GLOVES = generateItem(
  13,
  "도적의 장갑",
  ["체력 +150", "치명타 확률 +20%"],
  "TFT_Item_ThiefsGloves.png",
  "매 라운드: 무작위 아이템 2개 장착\n[아이템 슬롯 3개 소모]",
  [{ requireItem: SPARRINGS_GLOVES, qty: 2 }]
);

const INFINIY_EDGE = generateItem(
  14,
  "무한의 대검",
  ["공격력 +35%", "치명타 확률 +35%"],
  "TFT_Item_InfinityEdge.png",
  "스킬에 치명타 적용 가능\n\n기본 스킬에 치명타 적용이 가능한 경우, 대신에 치명타 피해량이 10% 증가",
  [
    { requireItem: BF_SWRORD, qty: 1 },
    { requireItem: SPARRINGS_GLOVES, qty: 1 },
  ]
);

const EDGE_OF_NIGHT = generateItem(
  15,
  "밤의 끝자락",
  ["공격력 +10%", "방어력 +20"],
  "TFT_Item_GuardianAngel.png",
  "[고유] 전투당 1회: 체력이 60%일 때 잠시 대상으로 지정할 수 없게 되며 해로운 효과 제거. 이후 추가 공격속도 15% 획득",
  [
    { requireItem: BF_SWRORD, qty: 1 },
    { requireItem: CHAIN_VEST, qty: 1 },
  ]
);

const BLOODTHIRSTER = generateItem(
  16,
  "피바라기",
  ["공격력 +20%", "주문력 +15", "모든 피해 흡혈 +20%", "마법 저항력 +20"],
  "TFT_Item_Bloodthirster.png",
  "전투당 한 번, 체력이 40%일 때 최대 체력의 25%에 해당하는 보호막 획득 후 최대 5초까지 유지",
  [
    { requireItem: BF_SWRORD, qty: 1 },
    { requireItem: NEGATRON_CLOAK, qty: 1 },
  ]
);

const HEXTECH_GUNBLADE = generateItem(
  17,
  "마법공학 총검",
  ["공격력 +15%", "주문력 +15", "모든 피해 흡혈 +20%"],
  "TFT_Item_HextechGunblade.png",
  "입힌 피해량의 20%만큼 체력 비율이 가장 낮은 아군의 체력 회복",
  [
    { requireItem: BF_SWRORD, qty: 1 },
    { requireItem: NEEDLESSLY_LARGE_ROD, qty: 1 },
  ]
);

const STERAKS_GAGE = generateItem(
  18,
  "스테락의 도전",
  ["체력 +200", "공격력 +15%"],
  "TFT_Item_SteraksGage.png",
  "전투당 한 번, 체력이 60%일 때 최대체력 25% 및 공격력 35% 증가",
  [
    { requireItem: BF_SWRORD, qty: 1 },
    { requireItem: GIANTS_BELT, qty: 1 },
  ]
);

const RED_ELEMENTAL = generateItem(
  19,
  "붉은 덩굴정령",
  ["공격 속도 +40%", "피해량 증가 +6%"],
  "TFT_Item_RapidFireCannon.png",
  "기본 공격과 스킬이 5초 동안 적에게 불태우기를 1%, 상처를 33% 적용\n\n불태우기: 매초 대상 최대 체력의 일정 비율만큼 고정피해\n상처: 체력 회복량 감소",
  [{ requireItem: RECURVE_BOW, qty: 2 }]
);

const RUNAANS_HURRICANE = generateItem(
  20,
  "루난의 허리케인",
  ["공격력 +25%", "마법 저항력 +20", "공격 속도 +10%"],
  "TFT_Item_RunaansHurricane.png",
  "기본 공격 시 주변 적 하나에게 탄환을 발사하여 공격력의 55%만큼 물리 피해",
  [
    { requireItem: RECURVE_BOW, qty: 1 },
    { requireItem: NEGATRON_CLOAK, qty: 1 },
  ]
);

const GUINSOOS_RAGEBLADE = generateItem(
  21,
  "구인수의 격노검",
  ["주문력 +10", "공격 속도 +15%"],
  "TFT_Item_GuinsoosRageblade.png",
  "공격시 공격 속도가 5% 증가 (중첩가능)",
  [
    { requireItem: RECURVE_BOW, qty: 1 },
    { requireItem: NEEDLESSLY_LARGE_ROD, qty: 1 },
  ]
);

const STATIKK_SHIV = generateItem(
  22,
  "스태틱의 단검",
  ["마나 +15", "주문력 +15", "공격 속도 +20%"],
  "TFT_Item_StatikkShiv.png",
  "3번째 기본 공격마다 적 4명에게 35의 마법 피해를 입히고 5초 동안 30% 파쇄\n\n파쇄: 마법 저항력 감소",
  [
    { requireItem: RECURVE_BOW, qty: 1 },
    { requireItem: TEAR_OF_THE_GADDESS, qty: 1 },
  ]
);

const NASHORS_TOOTH = generateItem(
  23,
  "내셔의 이빨",
  ["체력 +150", "주문력 +30", "공격 속도 +10%"],
  "TFT_Item_Leviathan.png",
  "스킬 사용 후 5초 동안 공격 속도 40% 증가",
  [
    { requireItem: RECURVE_BOW, qty: 1 },
    { requireItem: GIANTS_BELT, qty: 1 },
  ]
);

const LAST_WHISPER = generateItem(
  24,
  "최후의 속삭임",
  ["공격력 +15%", "공격 속도 +25%", "치명타 확률 +20%"],
  "TFT_Item_LastWhisper.png",
  "[고유] 물리 피해를 입힐 경우 3초 동안 30% 파열(중첩 불가)\n\n파열: 방어력 감소",
  [
    { requireItem: RECURVE_BOW, qty: 1 },
    { requireItem: SPARRINGS_GLOVES, qty: 1 },
  ]
);

const TITANS_RESOLVE = generateItem(
  25,
  "거인의 결의",
  ["방어력 +20", "공격 속도 +10%"],
  "TFT_Item_TitansResolve.png",
  "공격하거나 피해를 받으면 공격력 2%, 주문력 1 증가 (최대 25회 중첩)\n\n최대 중첩시 방어력 20 및 마법 저항력 20 획득",
  [
    { requireItem: RECURVE_BOW, qty: 1 },
    { requireItem: CHAIN_VEST, qty: 1 },
  ]
);

export const BRAMBLE_VEST = generateItem(
  26,
  "덤불 조끼",
  ["방어력 +55"],
  "TFT_Item_BrambleVest.png",
  "5%의 최대 체력 획득\n\n기본 공격으로 받는 피해 8% 감소, 기본 공격에 맞을 경우 인접한 모든 적에게 100의 마법 피해\n\n재사용 대기시간: 2초",
  [{ requireItem: CHAIN_VEST, qty: 2 }]
);

const GARGOYLE_STONEPLATE = generateItem(
  27,
  "가고일 돌갑옷",
  ["체력 +100", "방어력 +30", "마법 저항력 +30"],
  "TFT_Item_GargoyleStoneplate.png",
  "적의 공격 대상이 되면 방어력이 10, 마법 저항력이 10 증가. 공격하는 적이 늘어나면 중첩되어 적용.",
  [
    { requireItem: CHAIN_VEST, qty: 1 },
    { requireItem: NEGATRON_CLOAK, qty: 1 },
  ]
);

const CROWN_GUARD = generateItem(
  28,
  "크라운가드",
  ["체력 +100", "주문력 +20", "방어력 +20"],
  "TFT_Item_Crownguard.png",
  "전투 시작: 8초 동안 최대 체력의 30%에 해당하는 보호막 획득 보호막이 사라지면 주문력 35 증가",
  [
    { requireItem: CHAIN_VEST, qty: 1 },
    { requireItem: NEEDLESSLY_LARGE_ROD, qty: 1 },
  ]
);

const WINTERS_APPROACH = generateItem(
  29,
  "수호자의 맹세",
  ["시작 마나 +30", "방어력 +20"],
  "TFT_Item_FrozenHeart.png",
  "전투당 한 번, 체력이 40%일 때 최대 체력의 25%에 해당하는 보호막 획득 후 5초 동안 유지. 동시에 방어력 20, 마법 저항력 20 획득",
  [
    { requireItem: CHAIN_VEST, qty: 1 },
    { requireItem: TEAR_OF_THE_GADDESS, qty: 1 },
  ]
);

const SUNFIRE_CAPE = generateItem(
  30,
  "태양불꽃 망토",
  ["체력 +250", "방어력 +20"],
  "TFT_Item_RedBuff.png",
  "[고유] 2초마다 2칸 내에 있는 적 하나에게 10초 동안 불태우기를 1%, 상처를 33% 적용\n\n불태우기: 매초 대상 최대 체력의 일정 비율만큼 고정 피해\n상처: 체력 회복량 감소",
  [
    { requireItem: CHAIN_VEST, qty: 1 },
    { requireItem: GIANTS_BELT, qty: 1 },
  ]
);

const HEARTSTEEL = generateItem(
  31,
  "굳건한 심장",
  ["체력 +250", "방어력 +20", "치명타 확률 +20%"],
  "TFT_Item_NightHarvester.png",
  "내구력 8% 획득. 체력이 50%를 넘으면 대신 내구력 15% 획득",
  [
    { requireItem: CHAIN_VEST, qty: 1 },
    { requireItem: SPARRINGS_GLOVES, qty: 1 },
  ]
);

const DRAGONS_CLAW = generateItem(
  32,
  "용의 발톱",
  ["마법 저항력 +65"],
  "TFT_Item_DragonsClaw.png",
  "9%의 최대 체력 획득\n\n2초마다 최대 체력의 2.5% 회복",
  [{ requireItem: NEGATRON_CLOAK, qty: 2 }]
);

const IONIC_SPARK = generateItem(
  33,
  "이온 충격기",
  ["체력 +150", "주문력 +15", "마법 저항력 +25"],
  "TFT_Item_IonicSpark.png",
  "2칸 내 모든 적에게 파쇄 30% 적용. 해당 적이 스킬 사용 시 사용한 마나의 160%에 해당하는 마법 피해를 입음",
  [
    { requireItem: NEGATRON_CLOAK, qty: 1 },
    { requireItem: NEEDLESSLY_LARGE_ROD, qty: 1 },
  ]
);

const ADAPTIVE_HELM = generateItem(
  34,
  "적응형 투구",
  ["마나 +15", "주문력 +15", "마법 저항력 +20"],
  "TFT_Item_AdaptiveHelm.png",
  "전투 시작: 시작 위치에 따라 추가 효과 획득\n\n전방 2열: 방어력과 마법 저항력 40. 기본 공격에 맞으면 마나 1 획득\n\n후방 2열: 주문력20. 3초마다 마나 10 획득",
  [
    { requireItem: NEGATRON_CLOAK, qty: 1 },
    { requireItem: TEAR_OF_THE_GADDESS, qty: 1 },
  ]
);

const EVENSHROUD = generateItem(
  35,
  "저녁갑주",
  ["체력 +150", "마법 저항력 +20"],
  "TFT_Item_SpectralGauntlet.png",
  "2칸 내에 있는 적 30% 파열 전투 시작후 10초 동안 방어력과 마법 저항력 25증가\n\n파열: 방어력 감소",
  [
    { requireItem: NEGATRON_CLOAK, qty: 1 },
    { requireItem: GIANTS_BELT, qty: 1 },
  ]
);

const QUICKSILVER = generateItem(
  36,
  "수은",
  ["마법 저항력 +20", "공격 속도 +30%", "치명타율 +20%"],
  "TFT_Item_Quicksilver.png",
  "[고유] 전투 시작: 14초 동안 군중 제어 효과에 면역, 이 동안 2초마다 4%의 공격 속도 획득",
  [
    { requireItem: NEGATRON_CLOAK, qty: 1 },
    { requireItem: SPARRINGS_GLOVES, qty: 1 },
  ]
);

const RABADONS_DEATH_CAP = generateItem(
  37,
  "라바돈의 죽음모자",
  ["주문력 +50", "피해량 증가 +20%"],
  "TFT_Item_RabadonsDeathcap.png",
  "",
  [{ requireItem: NEEDLESSLY_LARGE_ROD, qty: 2 }]
);

const ARCHANGELS_STAFF = generateItem(
  38,
  "대천사의 지팡이",
  ["마나 +15", "주문력 +20"],
  "TFT_Item_ArchangelsStaff.png",
  "전투 시작: 전투 중 5초마다 주문력 30 증가",
  [
    { requireItem: NEEDLESSLY_LARGE_ROD, qty: 1 },
    { requireItem: TEAR_OF_THE_GADDESS, qty: 1 },
  ]
);

const MORELLONOMICON = generateItem(
  39,
  "모렐로노미콘",
  ["체력 +150", "주문력 +25", "공격 속도 +10%"],
  "TFT_Item_Morellonomicon.png",
  "기본 공격과 스킬이 10초 동안 적에게 불태우기를 1%, 상처를 33% 적용\n\n불태우기: 매초 대상 최대 체력의 일정 비율만큼 고정피해\n상처: 체력 회복량 감소",
  [
    { requireItem: NEEDLESSLY_LARGE_ROD, qty: 1 },
    { requireItem: GIANTS_BELT, qty: 1 },
  ]
);

const JEWELED_GAUNTLET = generateItem(
  40,
  "보석 건틀릿",
  ["주문력 +35", "치명타 확률 +35%"],
  "TFT_Item_JeweledGauntlet.png",
  "스킬에 치명타 적용 가\n\n기본 스킬에 치명타 적용이 가능한 경우, 대신에 치명타 피해량이 10% 증가",
  [
    { requireItem: NEEDLESSLY_LARGE_ROD, qty: 1 },
    { requireItem: SPARRINGS_GLOVES, qty: 1 },
  ]
);

const BLUE_ELEMENTAL = generateItem(
  41,
  "푸른 파수꾼",
  ["마나 +20", "주문력 +20", "공격력 +20%"],
  "TFT_Item_BlueBuff.png",
  "[고유] 최대 마나 10 감소. \n\n장착한 유닛이 처치 관여 시 8초 동안 8%의 추가 피해",
  [{ requireItem: TEAR_OF_THE_GADDESS, qty: 2 }]
);

const REDEMTION = generateItem(
  42,
  "구원",
  ["체력 +150", "마나 +15"],
  "TFT_Item_Redemption.png",
  "5초마다 1칸 내에 있는 아군의 체력을 대상이 잃은 체력의 15%만큼 회복. 또한 5초 동안 내구력을 10% 획득 (이 효과는 중첩되지 않음)",
  [
    { requireItem: TEAR_OF_THE_GADDESS, qty: 1 },
    { requireItem: GIANTS_BELT, qty: 1 },
  ]
);

const WARMOGS_ARMOR = generateItem(
  43,
  "워모그의 갑옷",
  ["체력 +600"],
  "TFT_Item_WarmogsArmor.png",
  "12%의 최대 체력 획득",
  [{ requireItem: GIANTS_BELT, qty: 2 }]
);

const STRIDE_BREAKER = generateItem(
  44,
  "방패파괴자",
  ["체력 +150", "공격 속도 +20%", "주문력 +10", "치명타 확률 +20%"],
  "TFT_Item_PowerGauntlet.png",
  "보호막 공격 후 3초 동안 피해 증폭 25% 획득",
  [
    { requireItem: GIANTS_BELT, qty: 1 },
    { requireItem: SPARRINGS_GLOVES, qty: 1 },
  ]
);

export const CORE_ITEM_LIST: CoreItem[] = [
  DEATH_BLADE,
  GIANTS_SLAYER,
  SPEAR_OF_SHOJIN,
  HAND_OF_JUSTICE,
  THIEFS_GLOVES,
  INFINIY_EDGE,
  EDGE_OF_NIGHT,
  BLOODTHIRSTER,
  HEXTECH_GUNBLADE,
  STERAKS_GAGE,
  RED_ELEMENTAL,
  RUNAANS_HURRICANE,
  GUINSOOS_RAGEBLADE,
  STATIKK_SHIV,
  NASHORS_TOOTH,
  LAST_WHISPER,
  TITANS_RESOLVE,
  BRAMBLE_VEST,
  GARGOYLE_STONEPLATE,
  CROWN_GUARD,
  WINTERS_APPROACH,
  SUNFIRE_CAPE,
  HEARTSTEEL,
  DRAGONS_CLAW,
  IONIC_SPARK,
  ADAPTIVE_HELM,
  EVENSHROUD,
  QUICKSILVER,
  RABADONS_DEATH_CAP,
  ARCHANGELS_STAFF,
  MORELLONOMICON,
  JEWELED_GAUNTLET,
  BLUE_ELEMENTAL,
  REDEMTION,
  WARMOGS_ARMOR,
  STRIDE_BREAKER,
];

const ARCANA_EMBLEM = generateItem(
  100,
  "아르카나 상징",
  ["체력 +150"],
  "arcana",
  "장착 시 아르카나 특성 획득",
  []
);
const HONEYMANCY_EMBLEM = generateItem(
  101,
  "벌꿀술사 상징",
  ["치명타 확률 +20%"],
  "honeymancy",
  "장착 시 벌꿀술사 특성 획득",
  []
);
const ELDRITCH_EMBLEM = generateItem(
  102,
  "섬뜩한 힘 상징",
  ["체력 +150"],
  "eldritch",
  "장착 시 섬뜩한 힘 특성 획득",
  []
);
const FAERIE_EMBLEM = generateItem(
  103,
  "요정 상징",
  ["마나 +15"],
  "faerie",
  "장착 시 요정 특성 획득",
  []
);
const SUGARCRAFT_EMBLEM = generateItem(
  104,
  "달콤술사 상징",
  ["공격력 +10%"],
  "sugarcraft",
  "장착 시 달콤술사 특성 획득",
  []
);
const PORTAL_EMBLEM = generateItem(
  105,
  "차원문 상징",
  ["주문력 +10%"],
  "portal",
  "장착 시 차원문 특성 획득",
  []
);
const PYRO_EMBLEM = generateItem(
  106,
  "화염 상징",
  ["공격 속도 +10%"],
  "pyro",
  "장착 시 화염 특성 획득",
  []
);
const CHRONO_EMBLEM = generateItem(
  107,
  "시공간 상징",
  ["체력 +150"],
  "chrono",
  "장착 시 시공간 특성 획득",
  []
);
const FROST_EMBLEM = generateItem(
  108,
  "서리 상징",
  ["방어력 +20"],
  "frost",
  "장착 시 서리 특성 획득",
  []
);
const WITCHCRAFT_EMBLEM = generateItem(
  109,
  "마녀 상징",
  ["마법 저항력 +20"],
  "witchcraft",
  "장착 시 마녀 특성 획득",
  []
);
const BASTION_EMBLEM = generateItem(
  110,
  "요새 상징",
  ["체력 +150"],
  "bastion",
  "장착 시 요새 특성 획득",
  []
);
const WARRIOR_EMBLEM = generateItem(
  111,
  "전사 상징",
  ["체력 +150"],
  "warrior",
  "장착 시 전사 특성 획득",
  []
);
const HUNTER_EMBLEM = generateItem(
  112,
  "사냥꾼 상징",
  ["체력 +150"],
  "hunter",
  "장착 시 사냥꾼 특성 획득",
  []
);
const INCANTOR_EMBLEM = generateItem(
  113,
  "마도사 상징",
  ["체력 +150"],
  "incantor",
  "장착 시 마도사 특성 획득",
  []
);
const MAGE_EMBLEM = generateItem(
  114,
  "요술사 상징",
  ["체력 +150"],
  "mage",
  "장착 시 요술사 특성 획득",
  []
);
const PRESERVER_EMBLEM = generateItem(
  115,
  "보호술사 상징",
  ["체력 +150"],
  "preserver",
  "장착 시 보호술사 특성 획득",
  []
);
const SCHOLAR_EMBLEM = generateItem(
  116,
  "학자 상징",
  ["체력 +150"],
  "scholar",
  "장착 시 학자 특성 획득",
  []
);
const SHAPESHIFTER_EMBLEM = generateItem(
  117,
  "형상변환자 상징",
  ["체력 +150"],
  "shapeshifter",
  "장착 시 형상변환자 특성 획득",
  []
);
const VANGUARD_EMBLEM = generateItem(
  118,
  "선봉대 상징",
  ["체력 +150"],
  "vanguard",
  "장착 시 선봉대 특성 획득",
  []
);
const MULTISTRIKER_EMBLEM = generateItem(
  119,
  "쇄도자 상징",
  ["체력 +150"],
  "multistriker",
  "장착 시 쇄도자 상징 획득",
  []
);

export const EMBLEM_ITEM_LIST: CoreItem[] = [
  FROST_EMBLEM,
  WITCHCRAFT_EMBLEM,
  HONEYMANCY_EMBLEM,
  ELDRITCH_EMBLEM,
  FAERIE_EMBLEM,
  SUGARCRAFT_EMBLEM,
  PORTAL_EMBLEM,
  PYRO_EMBLEM,
  ARCANA_EMBLEM,
  CHRONO_EMBLEM,
  BASTION_EMBLEM,
  WARRIOR_EMBLEM,
  HUNTER_EMBLEM,
  INCANTOR_EMBLEM,
  MAGE_EMBLEM,
  PRESERVER_EMBLEM,
  SCHOLAR_EMBLEM,
  SHAPESHIFTER_EMBLEM,
  VANGUARD_EMBLEM,
  MULTISTRIKER_EMBLEM,
];
