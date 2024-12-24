import { CURRENT_ACTIVE_SET, SetSeason } from "@/dataNew";
import { create } from "zustand";

interface SetStore {
  activeSet: SetSeason;
  actions: {
    setActiveSet: (setSeason: SetSeason) => void;
  };
}

const useSetStore = create<SetStore>((set) => ({
  activeSet: CURRENT_ACTIVE_SET,
  actions: {
    setActiveSet: (setSeason) => set({ activeSet: setSeason }),
  },
}));

export const useActiveSet = () => useSetStore((state) => state.activeSet);
export const useSetActions = () => useSetStore((state) => state.actions);
