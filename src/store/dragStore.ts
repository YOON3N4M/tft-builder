import { Champion } from "@/constants/champions";
import { CoreItem } from "@/constants/item";
import { create } from "zustand";

type DraggingTaget = CoreItem | Champion | null;

interface DragStore {
  draggingTarget: DraggingTaget;
  actions: {
    setDraggingTarget: (target: DraggingTaget) => void;
  };
}

const useDragStore = create<DragStore>((set) => ({
  draggingTarget: null,
  actions: {
    setDraggingTarget: (target) => set({ draggingTarget: target }),
  },
}));

export const useDraggingTarget = () =>
  useDragStore((state) => state.draggingTarget);

export const useDragActions = () => useDragStore((state) => state.actions);
