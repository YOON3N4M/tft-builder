import { SetData } from "@/types/data";
import { SET_12_DATA } from "./set/12";

export type SetSeason = "12" | "13";

export const SET_SEASON_LIST: SetSeason[] = ["12", "13"];
export const CURRENT_ACTIVE_SET: SetSeason = "12";

export const SET_DATA_LIST: Record<SetSeason, SetData> = {
  "12": SET_12_DATA,
  "13": SET_12_DATA,
};
