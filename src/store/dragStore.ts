import { IndexedChampion } from '@/components/field/Field'
import { Champion } from '@/data/set/12/champions'
import { CoreItem } from '@/data/item'
import { create } from 'zustand'

type DraggingTaget = CoreItem | Champion | null

interface DragStore {
	draggingTarget: DraggingTaget
	draggingIndexedChampion: IndexedChampion | null
	draggingCoreItem: CoreItem | null
	actions: {
		setDraggingTarget: (target: DraggingTaget) => void
		setDraggingIndexedChampion: (target: IndexedChampion | null) => void
		setDraggingCoreItem: (target: CoreItem | null) => void
	}
}

const useDragStore = create<DragStore>((set) => ({
	draggingTarget: null,
	draggingIndexedChampion: null,
	draggingCoreItem: null,
	actions: {
		setDraggingTarget: (target) => set({ draggingTarget: target }),
		setDraggingIndexedChampion: (target) =>
			set({ draggingIndexedChampion: target }),
		setDraggingCoreItem: (target) => set({ draggingCoreItem: target }),
	},
}))

export const useDraggingTarget = () =>
	useDragStore((state) => state.draggingTarget)
export const useDraggingIndexedChampion = () =>
	useDragStore((state) => state.draggingIndexedChampion)
export const useDraggingCoreItem = () =>
	useDragStore((state) => state.draggingCoreItem)

export const useDragActions = () => useDragStore((state) => state.actions)
