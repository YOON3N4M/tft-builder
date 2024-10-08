import { Champion, TRAINING_BOT } from '@/data/set/12/champions'

import useDragEvent from '@/hooks/useDragEvent'
import {
	useDragActions,
	useDraggingCoreItem,
	useDraggingIndexedChampion,
	useDraggingTarget,
} from '@/store/dragStore'
import { cn, generateIndexedChampion } from '@/utils'
import Image from 'next/image'
import {
	Dispatch,
	DragEvent,
	MouseEvent,
	ReactNode,
	SetStateAction,
} from 'react'
import ChampionTooltip from '../tooltips/ChampionTooltip'

import { SRC_CHAMPION_PORTRAIT } from '@/constants/src'
import { SYNERGY_LIST, Synergy } from '@/data/set/12/synergy'
import ItemPortrait from '../portraits/ItemPortrait'
import { PortalTooltip, usePortalTooltip } from '../tooltips/PortalTooltip'
import { IndexedChampion } from './Field'

export type PlacedChampion = IndexedChampion | null

interface HexagonProps {
	placedChampion: PlacedChampion
	children?: ReactNode
	isEvenRow: boolean
	setPlacedChampions: Dispatch<SetStateAction<PlacedChampion[]>>
	index: number
}

const backgroundColorStyles: { [key: string]: string } = {
	'1': '!bg-tier-1',
	'2': '!bg-tier-2',
	'3': '!bg-tier-3',
	'4': '!bg-tier-4',
	'5': '!bg-tier-5',
}

export default function Hexagon(props: HexagonProps) {
	const { placedChampion, isEvenRow, setPlacedChampions, index } = props

	const isTrainingBot = placedChampion?.champion.name === TRAINING_BOT.name

	const { setDraggingCoreItem, setDraggingTarget, setDraggingIndexedChampion } =
		useDragActions()

	const { tooltipContainerRef, pos, isTooltipOn, tooltipOn, tooltipOff } =
		usePortalTooltip()
	const draggingChampion = useDraggingTarget()
	const draggingIndexedChampion = useDraggingIndexedChampion()
	const draggingCoreItem = useDraggingCoreItem()

	const { isDragEnter, onDragEnter, onDragLeave, onDragOver, onDragEnd } =
		useDragEvent()

	function handleIndexItem(idx: number, item: IndexedChampion | null) {
		setPlacedChampions((prev) => {
			const cloneArray = [...prev]

			cloneArray[idx] = item

			return cloneArray
		})
	}

	function handleDragStart() {
		tooltipOff()
		if (!placedChampion) return

		setDraggingIndexedChampion(placedChampion)
	}

	function handleDragEnter(event: DragEvent<HTMLDivElement>) {
		onDragEnter(event)
	}

	function handleDragLeave(event: DragEvent<HTMLDivElement>) {
		onDragLeave(event)
	}

	function handleDragDrop(event: DragEvent<HTMLDivElement>) {
		event.stopPropagation()
		event.preventDefault()
		onDragEnd(event)

		handleChampionDrop()
	}

	function handleDragEnd(event: MouseEvent<HTMLDivElement>) {
		setDraggingTarget(null)
		setDraggingIndexedChampion(null)
	}

	function handleItemDrop() {
		if (!draggingCoreItem) return
		if (!placedChampion) return
		if (placedChampion.itemList.length !== 0) {
			if (draggingCoreItem.name === '도적의 장갑') {
				alert('도적의 장갑은 단독으로만 장착 가능합니다.')
				return
			}
		}
		if (placedChampion.itemList.some((item) => item.name === '도적의 장갑')) {
			alert('도적의 장갑은 단독으로만 장착 가능합니다.')
			return
		}
		if (placedChampion?.itemList.length > 2) {
			alert('아이템은 최대 3개까지 장착 가능합니다.')
			return
		}

		const cloned = structuredClone(placedChampion)

		const championWithItem = {
			...cloned,
			itemList: [...cloned.itemList, draggingCoreItem],
		}

		//상징인 경우
		if (draggingCoreItem.name.includes('상징')) {
			const synergy = SYNERGY_LIST.find(
				(item) => item.src[0] === draggingCoreItem.src,
			) as Synergy

			// 시너지 중복체크
			const isExist = championWithItem.champion.synergy.some(
				(item) => item.name === synergy.name,
			)
			if (isExist) {
				alert('이미 해당 특성을 가진 챔피언 입니다.')
				return
			}

			championWithItem.champion.synergy.push(synergy)
		}

		handleIndexItem(index, championWithItem)
	}

	function handleChampionDrop() {
		if (draggingChampion) {
			// 챔피언 리스트에서 드래그 할 경우

			const clonedChampion = structuredClone(draggingChampion)

			const indexed = generateIndexedChampion(clonedChampion as Champion, index)

			setPlacedChampions((prev) => {
				const cloneArray = [...prev]

				cloneArray[index] = indexed

				return cloneArray
			})
			setDraggingTarget(null)
		}

		// 이미 배치된 챔피언을 이동 시킬때
		if (draggingIndexedChampion) {
			handleIndexItem(draggingIndexedChampion.index, null)
			const newIndex = { ...draggingIndexedChampion, index }

			handleIndexItem(index, newIndex)
			setDraggingIndexedChampion(null)
		}
	}

	function onChampionRightClick(event: MouseEvent<HTMLDivElement>) {
		event.preventDefault()
		removeChampion()
	}

	function removeChampion() {
		handleIndexItem(index, null)
	}

	function handleItemRightClick(
		event: MouseEvent<HTMLImageElement>,
		idx: number,
	) {
		event.stopPropagation()
		event.preventDefault()

		if (!placedChampion) return

		let ClonedPlacedChampion = structuredClone(placedChampion)

		const targetItem = placedChampion.itemList[idx]

		// 제거 아이템이 상징인 경우
		// 적용된 시너지도 함께 제거
		if (targetItem.name.includes('상징')) {
			const newSynergyList = placedChampion.champion.synergy.filter(
				(item) => item.src[0] !== targetItem.src,
			)
			ClonedPlacedChampion.champion.synergy = newSynergyList
		}

		const newIndexedChampion = {
			...ClonedPlacedChampion,
			itemList: [...ClonedPlacedChampion.itemList!].filter(
				(_, index) => index !== idx,
			),
		}

		handleIndexItem(index, newIndexedChampion)
	}

	return (
		<div
			className={cn(
				'relative pc:w-[84px] ',
				'mo:w-[40px]',
				'tab:w-[60px]',
				isEvenRow && 'translate-x-[55%]',
			)}
		>
			<div
				className={cn(
					'hexagon pc:w-[84px] cursor-pointer pc:h-[96px] bg-[#19191b] border-[##19191b] relative flex justify-center items-center',
					'tab:w-[60px] tab:h-[65px]',
					'mo:w-[40px] mo:h-[45px]',
					isDragEnter && 'bg-blue-300',
					placedChampion &&
						backgroundColorStyles[placedChampion.champion.tier.toString()],
				)}
			>
				<div
					onContextMenu={onChampionRightClick}
					onDragEnter={handleDragEnter}
					onDragOver={onDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDragDrop}
					className="hexagon size-[90%] relative"
					ref={tooltipContainerRef}
				>
					{placedChampion?.champion && placedChampion && (
						<div onMouseEnter={tooltipOn} onMouseLeave={tooltipOff}>
							<PortalTooltip
								className="!translate-x-0 !p-0 !border-none !bg-[#00000000] !translate-y-[100px]"
								isOn={isTooltipOn}
								x={pos.x}
								y={pos.y}
							>
								<ChampionTooltip
									rightClickGuide="제거"
									dragGuide="재배치"
									champion={placedChampion.champion}
								/>
							</PortalTooltip>
							<Image
								onDragOver={onDragOver}
								onDragStart={handleDragStart}
								onDragEnd={handleDragEnd}
								onDrop={handleItemDrop}
								width={256}
								height={128}
								src={SRC_CHAMPION_PORTRAIT(placedChampion.champion.src)}
								alt={placedChampion.champion.name}
								className={cn(
									'absolute center w-full h-full',
									!isTrainingBot && 'object-cover',
								)}
								quality={90}
							/>
							<div className="absolute pointer-events-none flex flex-col bottom-[15%] text-center w-full text-main-text font-semibold text-[11px] bg-[#00000099]">
								<p className="mo:text-[8px]">{placedChampion.champion.name}</p>
							</div>
						</div>
					)}
				</div>
			</div>
			<div className="absolute flex w-full gap-xxxs bottom-0 justify-center">
				{placedChampion &&
					placedChampion.itemList.map((item, idx) => (
						<ItemPortrait
							noTooltip
							item={item}
							key={`${placedChampion}-${index}-${item.id}`}
							onContextMenu={(event) => handleItemRightClick(event, idx)}
							className={cn('rounded-md cursor-pointer', 'mo:size-[13px]')}
							width={20}
							height={20}
							rightClickGuide="해제"
						/>
					))}
			</div>
		</div>
	)
}
