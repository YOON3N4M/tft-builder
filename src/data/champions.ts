import {
  ARCANA,
  ASCENDANT,
  BASTION,
  BAT_QUEEN,
  BEST_FRIEND,
  BLASTER,
  CHRONO,
  DRAGON,
  DRUID,
  ELDRITCH,
  FAERIE,
  FROST,
  HONEYMANCY,
  HUNTER,
  INCANTOR,
  MAGE,
  MULTISTRIKER,
  PORTAL,
  PRESERVER,
  PYRO,
  RAVENOUS,
  SCHOLAR,
  SHAPESHIFTER,
  SUGARCRAFT,
  Synergy,
  VANGUARD,
  WARRIOR,
  WITCHCRAFT,
} from "../data/synergy";

export interface Champion {
  id: number;
  name: string;
  tier: number;
  synergy: Synergy[];
  src: string;
}

export const CHAMPION_TIER = [0, 1, 2, 3, 4, 5];

function generateChampion(
  id: number,
  name: string,
  tier: number,
  synergy: Synergy[],
  src: string
): Champion {
  return { id, name, tier, synergy, src };
}

export const TRAINING_BOT = generateChampion(
  0,
  "훈련 봇",
  0,
  [],
  "TFT_Consumable_TrainingDummy"
);
const AHRI = generateChampion(
  1,
  "아리",
  2,
  [ARCANA, SCHOLAR],
  "TFT12_Ahri.TFT_Set12.png"
);
const AKALI = generateChampion(
  2,
  "아칼리",
  2,
  [PYRO, MULTISTRIKER, WARRIOR],
  "TFT12_Akali.TFT_Set12.png"
);
const ASHE = generateChampion(
  3,
  "애쉬",
  1,
  [MULTISTRIKER, ELDRITCH],
  "TFT12_Ashe.TFT_Set12.png"
);
const BARD = generateChampion(
  4,
  "바드",
  3,
  [SUGARCRAFT, PRESERVER, SCHOLAR],
  "TFT12_Bard.TFT_Set12.png"
);
const BLITZCRANK = generateChampion(
  5,
  "블리츠크랭크",
  1,
  [HONEYMANCY, VANGUARD],
  "TFT12_Blitzcrank.TFT_Set12.png"
);
const BRIAR = generateChampion(
  6,
  "브라이어",
  5,
  [ELDRITCH, RAVENOUS, SHAPESHIFTER],
  "TFT12_Briar.TFT_Set12.png"
);
const CAMILLE = generateChampion(
  7,
  "카밀",
  5,
  [CHRONO, MULTISTRIKER],
  "TFT12_Camille.TFT_Set12.png"
);
const CASSIOPEIA = generateChampion(
  8,
  "카시오페아",
  2,
  [WITCHCRAFT, INCANTOR],
  "TFT12_Cassiopeia.TFT_Set12.png"
);
const DIANA = generateChampion(
  9,
  "다이애나",
  5,
  [FROST, BASTION],
  "TFT12_Diana.TFT_Set12.png"
);
const ELISE = generateChampion(
  10,
  "엘리스",
  1,
  [ELDRITCH, SHAPESHIFTER],
  "TFT12_Elise.TFT_Set12.png"
);
const EZREAL = generateChampion(
  11,
  "이즈리얼",
  3,
  [PORTAL, BLASTER],
  "TFT12_Ezreal.TFT_Set12.png"
);
const FIORA = generateChampion(
  12,
  "피오라",
  4,
  [WITCHCRAFT, WARRIOR],
  "TFT12_Fiora.TFT_Set12.png"
);
const GALIO = generateChampion(
  13,
  "갈리오",
  2,
  [PORTAL, VANGUARD, MAGE],
  "TFT12_Galio.TFT_Set12.png"
);
const GWEN = generateChampion(
  14,
  "그웬",
  4,
  [SUGARCRAFT, WARRIOR],
  "TFT12_Gwen.TFT_Set12.png"
);
const HECARIM = generateChampion(
  15,
  "헤카림",
  3,
  [MULTISTRIKER, BASTION, ARCANA],
  "TFT12_Hecarim.TFT_Set12.png"
);
const HWEI = generateChampion(
  16,
  "흐웨이",
  3,
  [FROST, BLASTER],
  "TFT12_Hwei.TFT_Set12.png"
);
const JAX = generateChampion(
  17,
  "잭스",
  1,
  [CHRONO, MULTISTRIKER],
  "TFT12_Jax.TFT_Set12.png"
);
const JAYCE = generateChampion(
  18,
  "제이스",
  1,
  [SHAPESHIFTER, PORTAL],
  "TFT12_Jayce.TFT_Set12.png"
);
const JINX = generateChampion(
  19,
  "징크스",
  3,
  [SUGARCRAFT, HUNTER],
  "TFT12_Jinx.TFT_Set12.png"
);
const KALISTAR = generateChampion(
  20,
  "칼리스타",
  4,
  [FAERIE, MULTISTRIKER],
  "TFT12_Kalista.TFT_Set12.png"
);
const KARMA = generateChampion(
  21,
  "카르마",
  4,
  [CHRONO, INCANTOR],
  "TFT12_Karma.TFT_Set12.png"
);
const KASSADIN = generateChampion(
  22,
  "카사딘",
  2,
  [PORTAL, MULTISTRIKER],
  "TFT12_Kassadin.TFT_Set12.png"
);
const KATARINA = generateChampion(
  23,
  "카타리나",
  3,
  [FAERIE, WARRIOR],
  "TFT12_Katarina.TFT_Set12.png"
);
const KOG_MAW = generateChampion(
  24,
  "코그모",
  2,
  [HONEYMANCY, HUNTER],
  "TFT12_KogMaw.TFT_Set12.png"
);
const LILLIA = generateChampion(
  25,
  "릴리아",
  1,
  [FAERIE, BASTION],
  "TFT12_Lillia.TFT_Set12.png"
);
const MILIO = generateChampion(
  26,
  "밀리오",
  5,
  [FAERIE, SCHOLAR],
  "TFT12_Milio.TFT_Set12.png"
);
const MORDEKAISER = generateChampion(
  27,
  "모데카이저",
  3,
  [ELDRITCH, VANGUARD],
  "TFT12_Mordekaiser.TFT_Set12.png"
);
const MORGANA = generateChampion(
  28,
  "모르가나",
  5,
  [BAT_QUEEN, WITCHCRAFT, PRESERVER],
  "TFT12_Morgana.TFT_Set12.png"
);
const NAMI = generateChampion(
  29,
  "나미",
  4,
  [ELDRITCH, MAGE],
  "TFT12_Nami.TFT_Set12.png"
);
const NASUS = generateChampion(
  30,
  "나서스",
  4,
  [PYRO, SHAPESHIFTER],
  "TFT12_Nasus.TFT_Set12.png"
);
const NEEKO = generateChampion(
  31,
  "니코",
  3,
  [WITCHCRAFT, SHAPESHIFTER],
  "TFT12_Neeko.TFT_Set12.png"
);
const NILAH = generateChampion(
  32,
  "닐라",
  2,
  [ELDRITCH, WARRIOR],
  "TFT12_Nilah.TFT_Set12.png"
);
const NOMSY = generateChampion(
  33,
  "뇸뇸이",
  1,
  [HUNTER, DRAGON],
  "TFT12_Nomsy.TFT_Set12.png"
);
const NORRA = generateChampion(
  34,
  "노라",
  5,
  [BEST_FRIEND, PORTAL, MAGE],
  "TFT12_Norra.TFT_Set12.png"
);
const NUNU_WILLUMP = generateChampion(
  35,
  "누누",
  2,
  [HONEYMANCY, BASTION],
  "TFT12_Nunu.TFT_Set12.png"
);
const OLAF = generateChampion(
  36,
  "올라프",
  4,
  [FROST, HUNTER],
  "TFT12_Olaf.TFT_Set12.png"
);
const POPPY = generateChampion(
  37,
  "뽀삐",
  1,
  [BASTION, WITCHCRAFT],
  "TFT12_Poppy.TFT_Set12.png"
);
const RAKAN = generateChampion(
  38,
  "라칸",
  4,
  [FAERIE, PRESERVER],
  "TFT12_Rakan.TFT_Set12.png"
);
const RUMBLE = generateChampion(
  39,
  "럼블",
  2,
  [BLASTER, VANGUARD, SUGARCRAFT],
  "TFT12_Rumble.TFT_Set12.png"
);
const RYZE = generateChampion(
  40,
  "라이즈",
  4,
  [SCHOLAR, PORTAL],
  "TFT12_Ryze.TFT_Set12.png"
);
const SERAPHINE = generateChampion(
  41,
  "세라핀",
  1,
  [FAERIE, MAGE],
  "TFT12_Seraphine.TFT_Set12.png"
);
const SHEN = generateChampion(
  42,
  "쉔",
  3,
  [PYRO, BASTION],
  "TFT12_Shen.TFT_Set12.png"
);
const SHYVANA = generateChampion(
  43,
  "쉬바나",
  2,
  [DRAGON, SHAPESHIFTER],
  "TFT12_Shyvana.TFT_Set12.png"
);
const SMOLDER = generateChampion(
  44,
  "스몰더",
  5,
  [DRAGON, BLASTER],
  "TFT12_Smolder.TFT_Set12.png"
);
const SORAKA = generateChampion(
  45,
  "소라카",
  1,
  [SUGARCRAFT, MAGE],
  "TFT12_Soraka.TFT_Set12.png"
);
const SWAIN = generateChampion(
  46,
  "스웨인",
  3,
  [FROST, SHAPESHIFTER],
  "TFT12_Swain.TFT_Set12.png"
);
const SYNDRA = generateChampion(
  47,
  "신드라",
  2,
  [INCANTOR, ELDRITCH],
  "TFT12_Syndra.TFT_Set12.png"
);
const TAHM_KENCH = generateChampion(
  48,
  "탐켄치",
  4,
  [ARCANA, VANGUARD],
  "TFT12_TahmKench.TFT_Set12.png"
);
const TARIC = generateChampion(
  49,
  "타릭",
  4,
  [PORTAL, BASTION],
  "TFT12_Taric.TFT_Set12.png"
);
const TRISTANA = generateChampion(
  50,
  "트리스타나",
  2,
  [FAERIE, BLASTER],
  "TFT12_Tristana.TFT_Set12.png"
);
const TWITCH = generateChampion(
  51,
  "트위치",
  1,
  [HUNTER, FROST],
  "TFT12_Twitch.TFT_Set12.png"
);
const VARUS = generateChampion(
  52,
  "바루스",
  4,
  [BLASTER, PYRO],
  "TFT12_Varus.TFT_Set12.png"
);
const VEIGAR = generateChampion(
  53,
  "베이가",
  3,
  [HONEYMANCY, MAGE],
  "TFT12_Veigar.TFT_Set12.png"
);
const VEX = generateChampion(
  54,
  "벡스",
  3,
  [CHRONO, MAGE],
  "TFT12_Vex.TFT_Set12.png"
);
const WARWICK = generateChampion(
  55,
  "워윅",
  1,
  [FROST, VANGUARD],
  "TFT12_Warwick.TFT_Set12.png"
);
const WUKONG = generateChampion(
  56,
  "오공",
  3,
  [DRUID],
  "TFT12_Wukong.TFT_Set12.png"
);
const XERATH = generateChampion(
  57,
  "제라스",
  5,
  [ARCANA, ASCENDANT],
  "TFT12_Xerath.TFT_Set12.png"
);
const ZIGGS = generateChampion(
  58,
  "직스",
  1,
  [HONEYMANCY, INCANTOR],
  "TFT12_Ziggs.TFT_Set12.png"
);
const ZILEAN = generateChampion(
  59,
  "질리언",
  2,
  [CHRONO, FROST, PRESERVER],
  "TFT12_Zilean.TFT_Set12.png"
);
const ZOE = generateChampion(
  60,
  "조이",
  1,
  [PORTAL, WITCHCRAFT, SCHOLAR],
  "TFT12_Zoe.TFT_Set12.png"
);

export const SET_12_CHAMPIONS = [
  TRAINING_BOT,
  AHRI,
  AKALI,
  ASHE,
  BARD,
  BLITZCRANK,
  BRIAR,
  CAMILLE,
  CASSIOPEIA,
  DIANA,
  ELISE,
  FIORA,
  GALIO,
  GWEN,
  HECARIM,
  HWEI,
  JAX,
  JAYCE,
  JINX,
  KALISTAR,
  KARMA,
  KASSADIN,
  KATARINA,
  KOG_MAW,
  LILLIA,
  MILIO,
  MORDEKAISER,
  MORGANA,
  NAMI,
  NASUS,
  NEEKO,
  NILAH,
  NOMSY,
  NORRA,
  NUNU_WILLUMP,
  OLAF,
  POPPY,
  RAKAN,
  RUMBLE,
  RYZE,
  SERAPHINE,
  SHEN,
  SHYVANA,
  SMOLDER,
  SORAKA,
  SWAIN,
  SYNDRA,
  TAHM_KENCH,
  TARIC,
  TRISTANA,
  TWITCH,
  VARUS,
  VEIGAR,
  VEX,
  WARWICK,
  WUKONG,
  XERATH,
  ZIGGS,
  ZILEAN,
  ZOE,
];
