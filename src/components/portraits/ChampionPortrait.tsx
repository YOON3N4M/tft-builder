'use client'

import { Champion, TRAINING_BOT } from '@/data/set/12/champions'
import { cn } from '@/utils'
import Image from 'next/image'
import { HTMLAttributes } from 'react'
import ChampionTooltip from '../tooltips/ChampionTooltip'

import { SRC_CHAMPION, SRC_CHAMPION_PORTRAIT } from '@/constants/src'
import { PortalTooltip, usePortalTooltip } from '../tooltips/PortalTooltip'

interface ChampionPortraitProps extends HTMLAttributes<HTMLDivElement> {
	champion: Champion
	tooltip?: boolean
}

const borderColorStyles: { [key: string]: string } = {
	'0': 'border-tier-1',
	'1': 'border-tier-1',
	'2': 'border-tier-2',
	'3': 'border-tier-3',
	'4': 'border-tier-4',
	'5': 'border-tier-5',
}

function ChampionPortrait(props: ChampionPortraitProps) {
	const {
		champion,
		className,
		children,

		tooltip = false,
	} = props
	const { src, name, tier } = champion

	const { tooltipContainerRef, pos, isTooltipOn, tooltipOn, tooltipOff } =
		usePortalTooltip()

	const isTrainingBot = name === TRAINING_BOT.name

	// 훈련 봇 예외 처리
	const fixedTrainingBot = SRC_CHAMPION(src).includes('.png')
		? SRC_CHAMPION_PORTRAIT(src)
		: `${SRC_CHAMPION(src)}.png`

	return (
		<div
			ref={tooltipContainerRef}
			className={cn(
				'relative overflow-hidden flex rounded-md border-2',
				className,
				borderColorStyles[tier.toString()],
			)}
			onMouseEnter={tooltipOn}
			onMouseLeave={tooltipOff}
		>
			{tooltip && (
				<PortalTooltip
					className="!p-0 !border-none !bg-[#00000000]"
					isOn={isTooltipOn}
					x={pos.x}
					y={pos.y}
				>
					<ChampionTooltip champion={champion} />
				</PortalTooltip>
			)}

			<Image
				src={fixedTrainingBot}
				width={256}
				height={128}
				alt={name}
				className={cn('object-cover relative', !isTrainingBot && 'scale-125')}
			/>
			{children}
		</div>
	)
}

export default ChampionPortrait
