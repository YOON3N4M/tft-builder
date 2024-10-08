import { SET_12_CHAMPIONS } from '@/data/set/12/champions'
import { CORE_ITEM_LIST, EMBLEM_ITEM_LIST } from '@/data/item'
import { OptimizedIndexedChampion } from '@/containers/BuilderContainer'
import { copyClipboard, filterNull } from '.'
import { IndexedChampion } from '@/components/field/Field'
import { PlacedChampion } from '@/components/field/hexagon'

export function uploadToLocalstorage(key: string, data: string) {
	localStorage.setItem(key, data)
}

export function getLocalStorageByKey(key: string) {
	const result = localStorage.getItem(key)

	return result
}

export function copyBuild(build: string) {
	const baseUrl = 'https://tft-build-simulator.vercel.app/builder/'
	const resultUrl = `${baseUrl}?field=${build}`

	copyClipboard(resultUrl)
	alert('클립보드에 링크가 복사되었습니다.')
}

export function saveBuildToLocalStorage(
	buildName: string,
	indexedChampionList: IndexedChampion[],
) {
	const url = generateSaveUrl(indexedChampionList)
	uploadToLocalstorage(buildName, url)
	alert('저장 되었습니다.')
}

export function generateSaveUrl(indexedChampionList: IndexedChampion[]) {
	const optimized = optimizeIndexedChampion(indexedChampionList)

	const fieldToString = JSON.stringify(optimized)

	const encoded = encodeURI(fieldToString)

	return encoded
}

export function getlocalBuildAll() {
	if (typeof window === 'undefined') return

	const keyArr: string[] = []

	const localStorageLength = localStorage.length
	for (let i = 0; i < localStorageLength; i++) {
		const key = localStorage.key(i)
		if (key) {
			keyArr.push(key)
		}
	}

	const filteredKey = keyArr.filter((key) => key.includes('tft-build'))

	const result = filteredKey.map((key) => ({
		buildName: key,
		build: getLocalStorageByKey(key),
	}))

	return result
}

// url 길이 단축을 위해 간소화 했던 urL을 다시 유효한 데이터로 변경하는 함수
export function unOptimizedBuild(optimizedString: string) {
	if (!optimizedString) return

	const decoeded = decodeURI(optimizedString)

	const optimizedArr = JSON.parse(decoeded) as OptimizedIndexedChampion[]

	const filteredNull = filterNull(optimizedArr)

	const unOptimized = filteredNull.map((champion) => ({
		index: champion.index,
		champion: SET_12_CHAMPIONS.find((cham) => cham.name === champion.name)!,
		itemList: champion.itemList.map((item) => {
			if (item.includes('상징')) {
				return EMBLEM_ITEM_LIST.find((emblem) => item === emblem.name)!
			} else {
				return CORE_ITEM_LIST.find((core) => item === core.name)!
			}
		})!,
	}))

	const sortByTier = unOptimized.sort(
		(indexA, indexB) => indexA.champion.tier - indexB.champion.tier,
	)

	return sortByTier
}

export function localStorageDelete(key: string) {
	localStorage.removeItem(key)
}

export function optimizeIndexedChampion(arr: IndexedChampion[]) {
	const optimized = arr.map((item) => {
		if (!item) return

		return {
			name: item.champion.name,
			index: item.index,
			itemList: item.itemList.map((tem) => tem.name),
		}
	})

	return optimized
}
