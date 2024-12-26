import { SET_DATA_LIST, SetSeason } from "@/dataNew";
import { useActiveSet, useSetActions } from "@/store/setStore";

import { useState } from "react";
import datadragonJson from "@/dataNew/set/13/ko_kr.json";

interface DatadragonJson {
  items: ItemJson[];
  sets: {
    "12": SetJson;
    "13": SetJson;
  };
}

/**
 * 내 생각에 데이터를 여기서 뿌릴게 아니라
 *
 * 아니 근데 여기서 뿌려야할 거 같기도 하고
 *
 * 여기서는 데이터를 변경하는 동작만 하고 store에서
 *
 * 컴포넌트 레벨에 뿌려야하는건가 싶은데,,, 고민이 필요할듯
 */
interface SetJson {
  champions: ChampionJson[];
  name: string;
  traits: TraitJson[];
}

export interface ChampionJson {
  ability: { desc: string; icon: string; name: string; variables: any[] };
  apiName: string;
  characterName: string;
  cost: number;
  icon: string;
  name: string;
  role: string | null;
  squareIcon: string;
  stats: {
    armor: number;
    attackSpeed: number;
    critChance: number;
    critMultiplier: number;
    damage: number;
    hp: number;
    initialMana: number;
    magicResist: number;
    mana: number;
    range: number;
  };
  tileIcon: string;
  traits: string[];
}

export interface TraitJson {
  apiName: string;
  desc: string;
  effects: EffectJson[];
  icon: string;
  name: string;
}

export interface EffectJson {
  maxUnits: number;
  minUnits: number;
  style: number;
  variables: any;
}

interface ItemJson {
  apiName: string;
  associatedTraits: any[];
  composition: any[];
  desc: string;
  effects: any;
  from: any;
  icon: string;
  id: null;
  incompatibleTraits: any[];
  name: string;
  unique: boolean;
}

const CHAMPION_TIER_LIST = {
  "13": [0, 1, 2, 3, 4, 5, 6],
};

export default function useSetDataNew() {
  //   const activeSet = useActiveSet();
  const activeSet = "13"; //임시
  const { setActiveSet } = useSetActions();

  const data = datadragonJson as DatadragonJson;
  const set = data.sets["13"];

  const championDataList = set.champions.filter((item) => item.role);
  const traitDataList = set.traits;
  const itemDataList = data.items;

  const currentChampionTier = CHAMPION_TIER_LIST[activeSet];
  const SRC_CHAMPION = (srcName: string) =>
    `/images/set/${activeSet}/tft-champion/${srcName}`;

  const SRC_TRAIT = (srcName: string) =>
    `/images/set/${activeSet}/tft-trait/${srcName}`;
  // const combinationItemList = setData.custom.combinationItem;
  // const coreItemList = setData.custom.coreItem;
  // const emblelemItemList = setData.custom.emblelemItem;

  return {
    championDataList,
    traitDataList,
    itemDataList,
    SRC_CHAMPION,
    SRC_TRAIT,
    currentChampionTier,
    // championDataList,
    // traitDataList,
    // activeSet,
    // combinationItemList,
    // coreItemList,
    // emblelemItemList,
    // setActiveSet,
  };
}
