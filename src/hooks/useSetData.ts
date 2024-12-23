import { SET_DATA_LIST, SetSeason } from "@/dataNew";
import { useActiveSet, useSetActions } from "@/store/setStore";
import { useState } from "react";

export default function useSetData() {
  const activeSet = useActiveSet();
  const { setActiveSet } = useSetActions();

  const setData = SET_DATA_LIST[activeSet];
  const championDataList = setData.custom.champion;
  const traitDataList = setData.custom.trait;

  return { championDataList, traitDataList, activeSet, setActiveSet };
}
