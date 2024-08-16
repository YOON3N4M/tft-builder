//조합 아이템
export interface CombinationItem {
  id: number;
  name: string;
  effect: string;
  src: string;
}

export interface CoreItem extends CombinationItem {
  recipe: { requireItem: CombinationItem; qty: number }[];
}

function generateItem(
  id: number,
  name: string,
  effect: string,
  src: string
): CombinationItem;
function generateItem(
  id: number,
  name: string,
  effect: string,
  src: string,
  recipe: { requireItem: CombinationItem; qty: number }[]
): CoreItem;

function generateItem(
  id: number,
  name: string,
  effect: string,
  src: string,
  recipe?: any
): CombinationItem | CoreItem {
  if (recipe) {
    return {
      id,
      name,
      effect,
      src,
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
  "공격력 +15",
  "TFT_Item_BFSword.png"
);
export const RECURVE_BOW = generateItem(
  2,
  "곡궁",
  "공격속도 +15",
  "TFT_Item_RecurveBow.png"
);
export const CHAIN_VEST = generateItem(
  3,
  "쇠사슬 갑옷",
  "방어력 +15",
  "TFT_Item_ChainVest.png"
);
export const NEGATRON_CLOAK = generateItem(
  4,
  "음전자 망토",
  "마법저항력 +15",
  "TFT_Item_NegatronCloak.png"
);
export const NEEDLESSLY_LARGE_ROD = generateItem(
  5,
  "쓸데없이 큰 지팡이",
  "주문력 +15",
  "TFT_Item_NeedlesslyLargeRod.png"
);
export const TEAR_OF_THE_GADDESS = generateItem(
  6,
  "여신의 눈물",
  "마나 +15",
  "TFT_Item_TearOfTheGoddess.png"
);
export const GIANTS_BELT = generateItem(
  7,
  "거인의 허리띠",
  "체력 +15",
  "TFT_Item_GiantsBelt.png"
);
export const SPARRINGS_GLOVES = generateItem(
  8,
  "싸움꾼의 장갑",
  "치명타 확률 +15",
  "TFT_Item_SparringGloves.png"
);
export const SPATULA = generateItem(100, "뒤집개", "-", "TFT_Item_Spatula.png");

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
  "공격력 +50",
  "TFT_Item_Deathblade.png",
  [{ requireItem: BF_SWRORD, qty: 2 }]
);

const GIANTS_SLAYER = generateItem(
  10,
  "거인 학살자",
  "공격력 +50",
  "TFT_Item_MadredsBloodrazor.png",
  [
    { requireItem: BF_SWRORD, qty: 1 },
    { requireItem: RECURVE_BOW, qty: 1 },
  ]
);

const HAND_OF_JUSTICE = generateItem(
  11,
  "정의의 손길",
  "공격력 +50",
  "TFT_Item_UnstableConcoction.png",
  [
    { requireItem: TEAR_OF_THE_GADDESS, qty: 1 },
    { requireItem: SPARRINGS_GLOVES, qty: 1 },
  ]
);

const SPEAR_OF_SHOJIN = generateItem(
  12,
  "쇼진의 창",
  "공격력 +50",
  "TFT_Item_SpearOfShojin.png",
  [
    { requireItem: TEAR_OF_THE_GADDESS, qty: 1 },
    { requireItem: BF_SWRORD, qty: 1 },
  ]
);

export const THIEFS_GLOVES = generateItem(
  13,
  "도적의 장갑",
  "공격력 +50",
  "TFT_Item_ThiefsGloves.png",
  [{ requireItem: SPARRINGS_GLOVES, qty: 2 }]
);

const INFINIY_EDGE = generateItem(
  14,
  "무한의 대검",
  "공격력 +50",
  "TFT_Item_InfinityEdge.png",
  [
    { requireItem: BF_SWRORD, qty: 1 },
    { requireItem: SPARRINGS_GLOVES, qty: 1 },
  ]
);

const EDGE_OF_NIGHT = generateItem(
  15,
  "밤의 끝자락",
  "공격력 +50",
  "TFT_Item_GuardianAngel.png",
  [
    { requireItem: BF_SWRORD, qty: 1 },
    { requireItem: CHAIN_VEST, qty: 1 },
  ]
);

const BLOODTHIRSTER = generateItem(
  16,
  "피바라기",
  "공격력 +50",
  "TFT_Item_Bloodthirster.png",
  [
    { requireItem: BF_SWRORD, qty: 1 },
    { requireItem: NEGATRON_CLOAK, qty: 1 },
  ]
);

const HEXTECH_GUNBLADE = generateItem(
  17,
  "마법공학 총검",
  "공격력 +50",
  "TFT_Item_HextechGunblade.png",
  [
    { requireItem: BF_SWRORD, qty: 1 },
    { requireItem: NEEDLESSLY_LARGE_ROD, qty: 1 },
  ]
);

const STERAKS_GAGE = generateItem(
  18,
  "스테락의 도전",
  "",
  "TFT_Item_SteraksGage.png",
  [
    { requireItem: BF_SWRORD, qty: 1 },
    { requireItem: GIANTS_BELT, qty: 1 },
  ]
);

const RED_ELEMENTAL = generateItem(
  19,
  "붉은 덩굴정령",
  "",
  "TFT_Item_RapidFireCannon.png",
  [{ requireItem: RECURVE_BOW, qty: 2 }]
);

const RUNAANS_HURRICANE = generateItem(
  20,
  "루난의 허리케인",
  "",
  "TFT_Item_RunaansHurricane.png",
  [
    { requireItem: RECURVE_BOW, qty: 1 },
    { requireItem: NEGATRON_CLOAK, qty: 1 },
  ]
);

const GUINSOOS_RAGEBLADE = generateItem(
  21,
  "구인수의 격노검",
  "",
  "TFT_Item_GuinsoosRageblade.png",
  [
    { requireItem: RECURVE_BOW, qty: 1 },
    { requireItem: NEEDLESSLY_LARGE_ROD, qty: 1 },
  ]
);

const STATIKK_SHIV = generateItem(
  22,
  "스태틱의 단검",
  "",
  "TFT_Item_StatikkShiv.png",
  [
    { requireItem: RECURVE_BOW, qty: 1 },
    { requireItem: TEAR_OF_THE_GADDESS, qty: 1 },
  ]
);

const NASHORS_TOOTH = generateItem(
  23,
  "내셔의 이빨",
  "",
  "TFT_Item_Leviathan.png",
  [
    { requireItem: RECURVE_BOW, qty: 1 },
    { requireItem: GIANTS_BELT, qty: 1 },
  ]
);

const LAST_WHISPER = generateItem(
  24,
  "최후의 속삭임",
  "",
  "TFT_Item_LastWhisper.png",
  [
    { requireItem: RECURVE_BOW, qty: 1 },
    { requireItem: SPARRINGS_GLOVES, qty: 1 },
  ]
);

const TITANS_RESOLVE = generateItem(
  25,
  "거인의 결의",
  "",
  "TFT_Item_TitansResolve.png",
  [
    { requireItem: RECURVE_BOW, qty: 1 },
    { requireItem: CHAIN_VEST, qty: 1 },
  ]
);

export const BRAMBLE_VEST = generateItem(
  26,
  "덤불 조끼",
  "",
  "TFT_Item_BrambleVest.png",
  [{ requireItem: CHAIN_VEST, qty: 2 }]
);

const GARGOYLE_STONEPLATE = generateItem(
  27,
  "가고일 돌갑옷",
  "",
  "TFT_Item_GargoyleStoneplate.png",
  [
    { requireItem: CHAIN_VEST, qty: 1 },
    { requireItem: NEGATRON_CLOAK, qty: 1 },
  ]
);

const CROWN_GUARD = generateItem(
  28,
  "크라운가드",
  "",
  "TFT_Item_Crownguard.png",
  [
    { requireItem: CHAIN_VEST, qty: 1 },
    { requireItem: NEEDLESSLY_LARGE_ROD, qty: 1 },
  ]
);

const WINTERS_APPROACH = generateItem(
  29,
  "수호자의 맹세",
  "",
  "TFT_Item_FrozenHeart.png",
  [
    { requireItem: CHAIN_VEST, qty: 1 },
    { requireItem: TEAR_OF_THE_GADDESS, qty: 1 },
  ]
);

const SUNFIRE_CAPE = generateItem(
  30,
  "태양불꽃 망토",
  "",
  "TFT_Item_RedBuff.png",
  [
    { requireItem: CHAIN_VEST, qty: 1 },
    { requireItem: GIANTS_BELT, qty: 1 },
  ]
);

const HEARTSTEEL = generateItem(
  31,
  "굳건한 심장",
  "",
  "TFT_Item_NightHarvester.png",
  [
    { requireItem: CHAIN_VEST, qty: 1 },
    { requireItem: SPARRINGS_GLOVES, qty: 1 },
  ]
);

const DRAGONS_CLAW = generateItem(
  32,
  "용의 발톱",
  "",
  "TFT_Item_DragonsClaw.png",
  [{ requireItem: NEGATRON_CLOAK, qty: 2 }]
);

const IONIC_SPARK = generateItem(
  33,
  "이온 충격기",
  "",
  "TFT_Item_IonicSpark.png",
  [
    { requireItem: NEGATRON_CLOAK, qty: 1 },
    { requireItem: NEEDLESSLY_LARGE_ROD, qty: 1 },
  ]
);

const ADAPTIVE_HELM = generateItem(
  34,
  "적응형 투구",
  "",
  "TFT_Item_AdaptiveHelm.png",
  [
    { requireItem: NEGATRON_CLOAK, qty: 1 },
    { requireItem: TEAR_OF_THE_GADDESS, qty: 1 },
  ]
);

const EVENSHROUD = generateItem(
  35,
  "저녁갑주",
  "",
  "TFT_Item_SpectralGauntlet.png",
  [
    { requireItem: NEGATRON_CLOAK, qty: 1 },
    { requireItem: GIANTS_BELT, qty: 1 },
  ]
);

const QUICKSILVER = generateItem(36, "수은", "", "TFT_Item_Quicksilver.png", [
  { requireItem: NEGATRON_CLOAK, qty: 1 },
  { requireItem: SPARRINGS_GLOVES, qty: 1 },
]);

const RABADONS_DEATH_CAP = generateItem(
  37,
  "라바돈의 죽음모자",
  "",
  "TFT_Item_RabadonsDeathcap.png",
  [{ requireItem: NEEDLESSLY_LARGE_ROD, qty: 2 }]
);

const ARCHANGELS_STAFF = generateItem(
  38,
  "대천사의 지팡이",
  "",
  "TFT_Item_ArchangelsStaff.png",
  [
    { requireItem: NEEDLESSLY_LARGE_ROD, qty: 1 },
    { requireItem: TEAR_OF_THE_GADDESS, qty: 1 },
  ]
);

const MORELLONOMICON = generateItem(
  39,
  "모렐로노미콘",
  "",
  "TFT_Item_Morellonomicon.png",
  [
    { requireItem: NEEDLESSLY_LARGE_ROD, qty: 1 },
    { requireItem: GIANTS_BELT, qty: 1 },
  ]
);

const JEWELED_GAUNTLET = generateItem(
  40,
  "보석 건틀릿",
  "",
  "TFT_Item_JeweledGauntlet.png",
  [
    { requireItem: NEEDLESSLY_LARGE_ROD, qty: 1 },
    { requireItem: SPARRINGS_GLOVES, qty: 1 },
  ]
);

const BLUE_ELEMENTAL = generateItem(
  41,
  "푸른 파수꾼",
  "",
  "TFT_Item_BlueBuff.png",
  [{ requireItem: TEAR_OF_THE_GADDESS, qty: 2 }]
);

const REDEMTION = generateItem(42, "구원", "", "TFT_Item_Redemption.png", [
  { requireItem: TEAR_OF_THE_GADDESS, qty: 1 },
  { requireItem: GIANTS_BELT, qty: 1 },
]);

const WARMOGS_ARMOR = generateItem(
  43,
  "워모그의 갑옷",
  "",
  "TFT_Item_WarmogsArmor.png",
  [{ requireItem: GIANTS_BELT, qty: 2 }]
);

const STRIDE_BREAKER = generateItem(
  44,
  "방패파괴자",
  "",
  "TFT_Item_PowerGauntlet.png",
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

const ARCANA_EMBLEM = generateItem(100, "아르카나 상징", "", "arcana");
const HONEYMANCY_EMBLEM = generateItem(101, "벌꿀술사 상징", "", "honeymancy");
const ELDRITCH_EMBLEM = generateItem(102, "섬뜩한 힘 상징", "", "eldritch");
const FAERIE_EMBLEM = generateItem(103, "요정 상징", "", "faerie");
const SUGARCRAFT_EMBLEM = generateItem(104, "달콤술사 상징", "", "sugarcraft");
const PORTAL_EMBLEM = generateItem(105, "차원문 상징", "", "portal");
const PYRO_EMBLEM = generateItem(106, "화염 상징", "", "pyro");
const CHRONO_EMBLEM = generateItem(107, "시공간 상징", "", "chrono");
const FROST_EMBLEM = generateItem(108, "서리 상징", "", "frost");
const WITCHCRAFT_EMBLEM = generateItem(109, "마녀 상징", "", "witchraft");
const BASTION_EMBLEM = generateItem(110, "요새 상징", "", "bastion");
const WARRIOR_EMBLEM = generateItem(111, "전사 상징", "", "warrior");
const HUNTER_EMBLEM = generateItem(112, "사냥꾼 상징", "", "hunter");
const INCANTOR_EMBLEM = generateItem(113, "마도사 상징", "", "incantor");
const MAGE_EMBLEM = generateItem(114, "마도사 상징", "", "mage");
const PRESERVER_EMBLEM = generateItem(115, "보호술사 상징", "", "preserver");
const SCHOLAR_EMBLEM = generateItem(116, "학자 상징", "", "scholar");
const SHAPESHIFTER_EMBLEM = generateItem(
  117,
  "형상변환자 상징",
  "",
  "shapeshifter"
);
const VANGUARD_EMBLEM = generateItem(118, "선봉대 상징", "", "vanguard");
const MULTISTRIKER_EMBLEM = generateItem(
  119,
  "쇄도자 상징",
  "",
  "multistriker"
);

export const EMBLEM_ITEM_LIST = [
  ARCANA_EMBLEM,
  HONEYMANCY_EMBLEM,
  ELDRITCH_EMBLEM,
  FAERIE_EMBLEM,
  SUGARCRAFT_EMBLEM,
  PORTAL_EMBLEM,
  PYRO_EMBLEM,
  CHRONO_EMBLEM,
  FROST_EMBLEM,
  WITCHCRAFT_EMBLEM,
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
