//조합 아이템
export interface CombinationItem {
  id: number;
  name: string;
  effect: string;
}

export interface CoreItem extends CombinationItem {
  recipe: { requireItem: CombinationItem; qty: number }[];
}

function generateItem(
  id: number,
  name: string,
  effect: string
): CombinationItem;
function generateItem(
  id: number,
  name: string,
  effect: string,
  recipe: { requireItem: CombinationItem; qty: number }[]
): CoreItem;

function generateItem(
  id: number,
  name: string,
  effect: string,
  recipe?: any
): CombinationItem | CoreItem {
  if (recipe) {
    return {
      id,
      name,
      effect,
      recipe,
    } as CoreItem;
  } else {
    return {
      id,
      name,
      effect,
    } as CombinationItem;
  }
}

export const BF_SWRORD = generateItem(1, "BF 대검", "공격력 +15");
export const RECURVE_BOW = generateItem(2, "곡궁", "공격속도 +15");
export const CHAIN_VEST = generateItem(3, "쇠사슬 갑옷", "방어력 +15");
export const NEGATRON_CLOAK = generateItem(4, "음전자 망토", "마법저항력 +15");
export const NEEDLESSLY_LARGE_ROD = generateItem(
  5,
  "쓸데없이 큰 지팡이",
  "주문력 +15"
);
export const TEAR_OF_THE_GADDESS = generateItem(6, "여신의 눈물", "마나 +15");
export const GIANTS_BELT = generateItem(7, "거인의 허리띠", "체력 +15");
export const SPARRINGS_GLOVES = generateItem(
  8,
  "싸움꾼의 장갑",
  "치명타 확률 +15"
);
export const SPATULA = generateItem(100, "뒤집개", "-");

export const COMBINATION_ITEM_LIST = [
  BF_SWRORD,
  RECURVE_BOW,
  CHAIN_VEST,
  NEGATRON_CLOAK,
  NEEDLESSLY_LARGE_ROD,
  TEAR_OF_THE_GADDESS,
  GIANTS_BELT,
  SPARRINGS_GLOVES,
  SPATULA,
];

//완성 아이템
const DEATH_BLADE = generateItem(9, "죽음의 검", "공격력 +50", [
  { requireItem: BF_SWRORD, qty: 2 },
]);

const GIANTS_SLAYER = generateItem(10, "거인 학살자", "공격력 +50", [
  { requireItem: BF_SWRORD, qty: 1 },
  { requireItem: RECURVE_BOW, qty: 1 },
]);

const HAND_OF_JUSTICE = generateItem(11, "정의의 손길", "공격력 +50", [
  { requireItem: TEAR_OF_THE_GADDESS, qty: 1 },
  { requireItem: SPARRINGS_GLOVES, qty: 1 },
]);

const SPEAR_OF_SHOJIN = generateItem(12, "쇼진의 창", "공격력 +50", [
  { requireItem: TEAR_OF_THE_GADDESS, qty: 1 },
  { requireItem: BF_SWRORD, qty: 1 },
]);

const THIEFS_GLOVES = generateItem(13, "도적의 장갑", "공격력 +50", [
  { requireItem: SPARRINGS_GLOVES, qty: 2 },
]);

const INFINIY_EDGE = generateItem(14, "무한의 대검", "공격력 +50", [
  { requireItem: BF_SWRORD, qty: 1 },
  { requireItem: SPARRINGS_GLOVES, qty: 1 },
]);

const EDGE_OF_NIGHT = generateItem(15, "밤의 끝자락", "공격력 +50", [
  { requireItem: BF_SWRORD, qty: 1 },
  { requireItem: CHAIN_VEST, qty: 1 },
]);

const BLOODTHIRSTER = generateItem(16, "피바라기", "공격력 +50", [
  { requireItem: BF_SWRORD, qty: 1 },
  { requireItem: NEGATRON_CLOAK, qty: 1 },
]);

const HEXTECH_GUNBLADE = generateItem(17, "마법공학 총검", "공격력 +50", [
  { requireItem: BF_SWRORD, qty: 1 },
  { requireItem: NEEDLESSLY_LARGE_ROD, qty: 1 },
]);

const STERAKS_GAGE = generateItem(18, "스테락의 도전", "", [
  { requireItem: BF_SWRORD, qty: 1 },
  { requireItem: GIANTS_BELT, qty: 1 },
]);

const RED_ELEMENTAL = generateItem(19, "붉은 덩굴정령", "", [
  { requireItem: RECURVE_BOW, qty: 2 },
]);

const RUNAANS_HURRICANE = generateItem(20, "루난의 허리케인", "", [
  { requireItem: RECURVE_BOW, qty: 1 },
  { requireItem: NEGATRON_CLOAK, qty: 1 },
]);

const GUINSOOS_RAGEBLADE = generateItem(21, "구인수의 격노검", "", [
  { requireItem: RECURVE_BOW, qty: 1 },
  { requireItem: NEEDLESSLY_LARGE_ROD, qty: 1 },
]);

const STATIKK_SHIV = generateItem(22, "스태틱의 단검", "", [
  { requireItem: RECURVE_BOW, qty: 1 },
  { requireItem: TEAR_OF_THE_GADDESS, qty: 1 },
]);

const NASHORS_TOOTH = generateItem(23, "내셔의 이빨", "", [
  { requireItem: RECURVE_BOW, qty: 1 },
  { requireItem: GIANTS_BELT, qty: 1 },
]);

const LAST_WHISPER = generateItem(24, "최후의 속삭임", "", [
  { requireItem: RECURVE_BOW, qty: 1 },
  { requireItem: SPARRINGS_GLOVES, qty: 1 },
]);

const TITANS_RESOLVE = generateItem(25, "거인의 결의", "", [
  { requireItem: RECURVE_BOW, qty: 1 },
  { requireItem: CHAIN_VEST, qty: 1 },
]);

const BRAMBLE_VEST = generateItem(26, "덤불 조끼", "", [
  { requireItem: CHAIN_VEST, qty: 2 },
]);

const GARGOYLE_STONEPLATE = generateItem(27, "가고일 돌갑옷", "", [
  { requireItem: CHAIN_VEST, qty: 1 },
  { requireItem: NEGATRON_CLOAK, qty: 1 },
]);

const CROWN_GUARD = generateItem(28, "크라운가드", "", [
  { requireItem: CHAIN_VEST, qty: 1 },
  { requireItem: TEAR_OF_THE_GADDESS, qty: 1 },
]);

const WINTERS_APPROACH = generateItem(29, "수호자의 맹세", "", [
  { requireItem: CHAIN_VEST, qty: 1 },
  { requireItem: TEAR_OF_THE_GADDESS, qty: 1 },
]);

const SUNFIRE_CAPE = generateItem(30, "태양불꽃 망토", "", [
  { requireItem: CHAIN_VEST, qty: 1 },
  { requireItem: GIANTS_BELT, qty: 1 },
]);

const HEARTSTEEL = generateItem(31, "굳건한 심장", "", [
  { requireItem: CHAIN_VEST, qty: 1 },
  { requireItem: SPARRINGS_GLOVES, qty: 1 },
]);

const DRAGONS_CLAW = generateItem(32, "용의 발톱", "", [
  { requireItem: NEGATRON_CLOAK, qty: 2 },
]);

const IONIC_SPARK = generateItem(33, "이온 충격기", "", [
  { requireItem: NEGATRON_CLOAK, qty: 1 },
  { requireItem: NEEDLESSLY_LARGE_ROD, qty: 1 },
]);

const ADAPTIVE_HELM = generateItem(34, "적응형 투구", "", [
  { requireItem: NEGATRON_CLOAK, qty: 1 },
  { requireItem: TEAR_OF_THE_GADDESS, qty: 1 },
]);

const EVENSHROUD = generateItem(35, "저녁갑주", "", [
  { requireItem: NEGATRON_CLOAK, qty: 1 },
  { requireItem: GIANTS_BELT, qty: 1 },
]);

const QUICKSILVER = generateItem(36, "수은", "", [
  { requireItem: NEGATRON_CLOAK, qty: 1 },
  { requireItem: SPARRINGS_GLOVES, qty: 1 },
]);

const RABADONS_DEATH_CAP = generateItem(37, "라바돈의 죽음모자", "", [
  { requireItem: NEEDLESSLY_LARGE_ROD, qty: 2 },
]);

const ARCHANGELS_STAFF = generateItem(38, "대천사의 지팡이", "", [
  { requireItem: NEEDLESSLY_LARGE_ROD, qty: 1 },
  { requireItem: TEAR_OF_THE_GADDESS, qty: 1 },
]);

const MORELLONOMICON = generateItem(39, "모렐로노미콘", "", [
  { requireItem: NEEDLESSLY_LARGE_ROD, qty: 1 },
  { requireItem: GIANTS_BELT, qty: 1 },
]);

const JEWELED_GAUNTLET = generateItem(40, "보석 건틀릿", "", [
  { requireItem: NEEDLESSLY_LARGE_ROD, qty: 1 },
  { requireItem: SPARRINGS_GLOVES, qty: 1 },
]);

const BLUE_ELEMENTAL = generateItem(41, "푸른 파수꾼", "", [
  { requireItem: TEAR_OF_THE_GADDESS, qty: 2 },
]);

const REDEMTION = generateItem(42, "구원", "", [
  { requireItem: TEAR_OF_THE_GADDESS, qty: 1 },
  { requireItem: GIANTS_BELT, qty: 1 },
]);

const WORMOGS_ARMOR = generateItem(43, "워모그의 갑옷", "", [
  { requireItem: GIANTS_BELT, qty: 2 },
]);

const STRIDE_BREAKER = generateItem(44, "방패파괴자", "", [
  { requireItem: GIANTS_BELT, qty: 1 },
  { requireItem: SPARRINGS_GLOVES, qty: 1 },
]);

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
  WORMOGS_ARMOR,
  STRIDE_BREAKER,
];
