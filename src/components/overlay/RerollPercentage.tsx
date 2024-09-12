'use client'

import { Champion, TRAINING_BOT } from '@/data/set/12/champions'
import {
	PIECES_QTY,
	REROLL_PERCENTAGE,
	SHOP_PIECES_QTY_ARR,
} from '@/data/reroll'

import { useDraggingTarget } from '@/store/dragStore'
import { cn, sortByNumber } from '@/utils'
import Image from 'next/image'
import {
	Dispatch,
	DragEvent,
	MouseEvent,
	SetStateAction,
	useState,
} from 'react'
import { Question, Reset, Token } from '../svgs'
import { Overlay, OverlayProps, OverlayTab } from './Overlay'
import Tab from '../tab/Tab'
import { PortalTooltip, usePortalTooltip } from '../tooltips/PortalTooltip'
import MouseGuide from '../MouseGuide'
import { SRC_CHAMPION } from '@/constants/src'
import SimpleTooltip from '../tooltips/SimpleTooltip'
import useDisClosure from '@/hooks/useDisClosure'

interface RerollPercentageProps extends OverlayProps {}

const colorStyles: { [key: string]: string } = {
	'1': 'text-tier-1',
	'2': 'text-tier-2',
	'3': 'text-tier-3',
	'4': 'text-tier-4',
	'5': 'text-tier-5',
}

const shapeStyles: { [key: string]: string } = {
	'1': 'bg-tier-1 rounded-full size-[8px]',
	'2': 'bg-tier-2 rounded-full size-[8px]',
	'3': 'border-b-tier-3 triangle ',
	'4': 'bg-tier-4 pentagon size-[10px]',
	'5': 'bg-tier-5 hexagon size-[10px]',
}

function RerollPercentage(props: RerollPercentageProps) {
	const { hidden } = props

	const draggingTarget = useDraggingTarget()

	const [isDragEnter, setIsDragEnter] = useState(false)
	const [targetChampions, setTargetChampions] = useState<Champion[]>([])
	const [currentLevel, setCurrentLevel] = useState(6)
	const [currentPercentage, setCurrentPercentage] = useState<number[]>(
		REROLL_PERCENTAGE.find((item) => item.level === currentLevel)?.percentage!,
	)

	const { isOpen, onClose, onOpen } = useDisClosure()

	const { isTooltipOn, tooltipOn, tooltipOff, pos, tooltipContainerRef } =
		usePortalTooltip()

	function increaseLevel() {
		if (currentLevel === 10) return
		setCurrentLevel((prev) => {
			handleCurrentPercentage(prev + 1)
			return prev + 1
		})
	}

	function decreaseLevel(event: MouseEvent<HTMLButtonElement>) {
		event.preventDefault()
		if (currentLevel === 1) return
		setCurrentLevel((prev) => {
			handleCurrentPercentage(prev - 1)
			return prev - 1
		})
	}

	function handleCurrentPercentage(level: number) {
		setCurrentPercentage(
			REROLL_PERCENTAGE.find((item) => item.level === level)?.percentage!,
		)
	}

	function onDragEnter() {
		setIsDragEnter(true)
	}

	function onDragOver(event: DragEvent<HTMLDivElement>) {
		event.preventDefault()
	}

	function onDrageLeave() {
		setIsDragEnter(false)
	}

	function onDragDrop() {
		const draggingChampion = draggingTarget as Champion

		// 훈련 봇 예외 처리
		if (draggingChampion.name === TRAINING_BOT.name) {
			alert('상점에 등장할 수 없는 챔피언 입니다.')
			return
		}

		const isExist = targetChampions.find(
			(champion) => champion.name === draggingChampion.name,
		)

		if (isExist) {
			alert('이미 등록된 챔피언 입니다.')
			return
		} else {
			setTargetChampions((prev) =>
				sortByNumber([...prev, draggingChampion], 'tier', true),
			)
		}
		setIsDragEnter(false)
	}

	function reset() {
		setTargetChampions([])
		setCurrentLevel(6)
	}

	const isEmpty = targetChampions.length < 1

	return (
		<div className="bg-content-bg rounded-md border-[#222] border">
			<Tab
				className="pt-md"
				tabs={['상점 등장 확률', '확률표']}
				tabRightContents={
					<div
						className="relative gap-sm items-center flex "
						ref={tooltipContainerRef}
					>
						<button
							onClick={reset}
							className="ml-auto relative"
							onMouseEnter={onOpen}
							onMouseLeave={onClose}
						>
							<Reset className="stroke-[#888] hover:stroke-black" />
							<SimpleTooltip isOpen={isOpen}>
								<span className="text-main-text">초기화</span>
							</SimpleTooltip>
						</button>
						<Question
							onMouseEnter={tooltipOn}
							onMouseLeave={tooltipOff}
							className="fill-[#888] hover:fill-black"
						/>
						<PortalTooltip
							position="bottom"
							isOn={isTooltipOn}
							x={pos.x}
							y={pos.y}
						>
							<p className="text-sub-text">
								<span className="font-semibold text-main-text">
									상점 등장 확률
								</span>
								<br />
								레벨에 따른 특정 기물의 상점 등장 확률을 제공합니다. <br />
								<br />
								추적 기물의 현재 게임 내 존재 개수를 입력하면 보다 근접한 확률을
								추적 할 수 있습니다.
								<br />
								<br /> 제공되는 확률은 실제 인게임 확률과 오차가 있습니다.
								<br />
							</p>
							<br />
							<p className="text-sub-text">
								<span className="font-semibold text-main-text">확률표</span>
								<br />
								정확한 수치의 확률표 입니다.
							</p>
						</PortalTooltip>
					</div>
				}
			>
				<div className="pc:min-w-[500px] p-md text-sm">
					<div className="flex gap-xs items-center mo:flex-col">
						<div className="flex gap-xs items-center mo:w-full">
							<span className="text-sub-text">현재 내 레벨</span>
							<button
								className="px-xs py-xxxs hover:bg-default-bg border border-[#888] text-sub-text rounded-md"
								onClick={increaseLevel}
								onContextMenu={decreaseLevel}
							>
								{currentLevel}
							</button>
						</div>
						<div className="flex mo:self-start gap-sm pc:ml-md bg-default-bg p-sm rounded-m mo:justify-start">
							{currentPercentage.map((per, idx) => (
								<div
									key={`${currentLevel}-${per}-${idx}`}
									className="flex items-center gap-xxs"
								>
									<span className={cn(shapeStyles[idx + 1])} />
									<span
										className={cn('text-xs', colorStyles[(idx + 1).toString()])}
									>
										{per}%
									</span>
								</div>
							))}
						</div>
					</div>
					<div
						onDragEnter={onDragEnter}
						onDragLeave={onDrageLeave}
						onDrop={onDragDrop}
						onDragOver={onDragOver}
						className={cn(
							'pc:w-full max-w-[466px] flex min-h-[100px] overflow-hidden border border-[#888] bg-default-bg mt-md flex-col rounded-md',
							'',
							!isEmpty && 'bg-black',
							isDragEnter && 'border-blue-300 border-2',
						)}
					>
						{isEmpty ? (
							<p className="m-auto pointer-events-none text-sub-text">
								상점 등장 확률을 알고 싶은 챔피언을 여기에 드래그 해보세요!
							</p>
						) : (
							<>
								{targetChampions.map((champion, idx) => (
									// 이부분 컴포넌트 분리하고 리팩토링하는게 나을 듯
									<RerollTargetChampion
										key={champion.name}
										champion={champion}
										currentLevel={currentLevel}
										setTargetChampions={setTargetChampions}
									/>
								))}
							</>
						)}
					</div>
				</div>
				<div className="pc:max-w-[500px] p-md text-sm">
					<RerollTable />
				</div>
			</Tab>
		</div>
	)
}

export default RerollPercentage

function RerollTable() {
	return (
		<table className="w-full text-sub-text [&_th]:text-[12px] [&_th]:p-xxs [&_td]:p-xxs [&_td]:text-[12px] rounded-md">
			<thead>
				<tr className="bg-default-bg">
					<th>레벨</th>
					{PIECES_QTY.map((_, idx) => (
						<th
							key={idx}
							className={cn('', idx !== 0 && colorStyles[(idx + 1).toString()])}
						>
							<span className="flex items-center gap-xxs text-center justify-center">
								{idx + 1}
							</span>
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{REROLL_PERCENTAGE.map((rollCase) => (
					<tr key={rollCase.level}>
						<th className="bg-default-bg">Lv.{rollCase.level}</th>
						{rollCase.percentage.map((percentage, idx) => (
							<td
								className={cn(
									'text-center',
									percentage > 0 &&
										idx !== 0 &&
										colorStyles[(idx + 1).toString()],
								)}
								key={percentage}
							>
								{percentage}%
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}

interface RerollTargetChampionProps {
	champion: Champion
	currentLevel: number
	setTargetChampions: Dispatch<SetStateAction<Champion[]>>
}
function RerollTargetChampion(props: RerollTargetChampionProps) {
	const { champion, currentLevel, setTargetChampions } = props

	const [placedPiecesQty, setPlacesPieces] = useState(0)
	const { isTooltipOn, tooltipOn, tooltipOff, pos, tooltipContainerRef } =
		usePortalTooltip()

	const pieceQty = PIECES_QTY[champion.tier - 1]

	const currentPercentage = REROLL_PERCENTAGE.find(
		(item) => item.level === currentLevel,
	)?.percentage!

	function increaseQty() {
		if (placedPiecesQty === pieceQty) return
		setPlacesPieces((prev) => prev + 1)
	}

	function decreaseQty(event: MouseEvent<HTMLButtonElement>) {
		event.stopPropagation()
		event.preventDefault()
		if (placedPiecesQty === 0) return
		setPlacesPieces((prev) => prev - 1)
	}

	function calculateRerollPer() {
		// ex. 8렙 4코 확률
		const basePer = currentPercentage[champion.tier - 1]

		// ex. 4코 총 기물 갯수
		const targetTierQty = SHOP_PIECES_QTY_ARR[champion.tier - 1]

		// ex. 상점에 남아있는 목표 기물 갯수
		const targetUnitQty = PIECES_QTY[champion.tier - 1] - placedPiecesQty

		// ex. 목표 기물 갯수 / 전체 기물 갯수
		const per = targetUnitQty / targetTierQty

		// ex. 5번 시행
		const shopPer = per * 5

		// 레벨 별 확률 곱해줌
		const result = shopPer * basePer

		return result
	}

	function removeChampion(event: MouseEvent<HTMLDivElement>) {
		event.preventDefault()
		setTargetChampions((prev) =>
			prev.filter((prevChampion) => prevChampion.name !== champion.name),
		)
	}

	return (
		<div
			className={cn(`w-full h-[128px] max-w-[466px] relative cursor-pointer`)}
		>
			<div
				onContextMenu={removeChampion}
				className="absolute top-0 bg-gradient-to-l from-black from-[50%] to-[#fff0] size-full z-[10]"
			>
				<div className="text-main-text flex size-full flex-row-reverse">
					<div className="basis-[50%] flex py-md">
						<div className="flex flex-col w-full">
							<div className="flex items-center">
								<span className={cn(shapeStyles[champion.tier])} />
								<span className="font-bold ml-xs text-xl">
									{champion.name}{' '}
									<span className="text-sm text-sub-text">({pieceQty})</span>
								</span>
							</div>
							<div className="flex gap-xxs text-sub-text pl-lg">
								{champion.synergy.map((synergy) => (
									<span
										key={`${champion.name}-${synergy.name}`}
										className="text-xs"
									>
										· {synergy.name}
									</span>
								))}
							</div>
							<div
								onMouseEnter={tooltipOn}
								onMouseLeave={tooltipOff}
								ref={tooltipContainerRef}
								className="px-lg mt-lg relative flex items-center"
							>
								<PortalTooltip
									className="translate-x-[50%]"
									isOn={isTooltipOn}
									x={pos.x}
									y={pos.y}
								>
									<p className="text-sub-text">
										현재 게임 내 존재하는
										<br /> 해당 기물의 개수
									</p>
									<MouseGuide
										className=""
										leftClickGuide="+"
										rightClickGuide="-"
									/>
								</PortalTooltip>
								<button
									onClick={increaseQty}
									onContextMenu={decreaseQty}
									className={cn(
										'border-gray-400 border px-sm py-xxs rounded-md text-gray-400',
										'hover:text-main-text hover:border-white',
									)}
								>
									{placedPiecesQty}
								</button>
								<div className="flex flex-col ml-auto text-2xl font-semibold">
									{calculateRerollPer().toFixed(1)}%
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Image
				width={256}
				height={128}
				src={SRC_CHAMPION(champion.src)}
				alt={champion.name}
				className="scale-x-[-1] absolute top-0 z-[0]"
			/>
		</div>
	)
}
