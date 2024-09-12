'use client'

import {
	ParticipanthDto,
	RiotMatchInfoRes,
	SummonerData,
	TraitDto,
	UnitDto,
} from '@/types/riot'

import { findChampion, findLogestArray, findSynergy, groupBy } from '@/utils'

import { ReactNode } from 'react'
import Image from 'next/image'
import ChampionPortrait from '@/components/portraits/ChampionPortrait'

interface PerformanceOverviewProps {
	summonerData: SummonerData
	searchedPayersInfoList: ParticipanthDto[]
}

function PerformanceOverview(props: PerformanceOverviewProps) {
	const { summonerData, searchedPayersInfoList } = props
	const { matchInfoList } = summonerData
	const { account } = summonerData

	const noExistOverview = !matchInfoList || matchInfoList.length < 1

	const puuid = account?.puuid

	let placementAvg
	let allChampionList
	let allSynergyList
	let filteredNoActive
	let mostChampion
	let mostSynergy

	if (!noExistOverview) {
		placementAvg =
			searchedPayersInfoList.reduce((sum, item) => sum + item?.placement, 0) /
			searchedPayersInfoList.length

		allChampionList = searchedPayersInfoList
			.map((info) => info.units)
			.flat(Infinity) as UnitDto[]

		allSynergyList = searchedPayersInfoList
			.map((info) => info.traits)
			.flat(Infinity) as TraitDto[]
		//시너지 중 활성화 되지 않은 시너지 필터링
		filteredNoActive = allSynergyList.filter(
			(synergy) => synergy.tier_current !== 0,
		)

		mostChampion = findChampion(
			findLogestArray(groupBy(allChampionList, 'character_id'))[0].character_id,
		)

		mostSynergy = findSynergy(
			findLogestArray(groupBy(filteredNoActive, 'name'))[0].name,
		)
	}

	return (
		<div className="bg-content-bg border-[#222] border flex-grow rounded-md">
			<div className="px-sm py-xs border-[#222] text-main-text border-b-[1px] text-xs font-semibold">
				10게임 종합
			</div>
			<div className="py-xs px-sm flex gap-xxs">
				<OverviewItem text="평균 등수">
					<span className="text-2xl text-main-text">
						{placementAvg ? `#${Math.round(placementAvg)}` : ''}
					</span>
				</OverviewItem>
				<OverviewItem text="최애 챔피언">
					{mostChampion && (
						<ChampionPortrait
							tooltip
							className="!rounded-full !size-[70px]"
							champion={mostChampion}
						/>
					)}
				</OverviewItem>

				<OverviewItem text="최애 특성">
					{mostSynergy && (
						<Image
							width={40}
							height={4}
							src={`/images/set/12/synergy/${mostSynergy.src[0]}.png`}
							alt={mostSynergy.name}
							className="filter"
						/>
					)}
				</OverviewItem>
				<OverviewItem text="최애 증강체">
					<></>
				</OverviewItem>
			</div>
		</div>
	)
}

export default PerformanceOverview

interface OverviewItemProps {
	text: string
	children: ReactNode
}

function OverviewItem(props: OverviewItemProps) {
	const { text, children } = props
	return (
		<div className="flex-1 bg-default-bg py-xxxl flex flex-col items-center justify-end gap-sm">
			{children}
			<span>{text}</span>
		</div>
	)
}
