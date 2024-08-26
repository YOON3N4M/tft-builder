const DATA_DRAGON_VERSION = "14.16.1";

export const ITEM_ICON_URL = (srcParams: string) =>
  `https://ddragon.leagueoflegends.com/cdn/${DATA_DRAGON_VERSION}/img/tft-item/${srcParams}`;

export const TRAINING_BOT_ICON_URL = () =>
  `https://ddragon.leagueoflegends.com/cdn/${DATA_DRAGON_VERSION}/img/tft-item/TFT_Consumable_TrainingDummy.png`;

export const CHAMPION_ICON_URL = (srcParams: string) =>
  `https://ddragon.leagueoflegends.com/cdn/${DATA_DRAGON_VERSION}/img/tft-champion/${srcParams}`;

export const SUMMONER_PROFILE_ICON_URL = (id: number) =>
  `https://ddragon.leagueoflegends.com/cdn/${DATA_DRAGON_VERSION}/img/profileicon/${id}.png`;
