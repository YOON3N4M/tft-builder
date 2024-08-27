import { ParticipanthDto, RiotMatchInfoRes, SummonerData } from "@/types/riot";
import CompanionPortrait from "./CompanionPortrait";

interface PerformanceOverviewProps {
  summonerData: SummonerData;
  searchedPayersInfoList: ParticipanthDto[];
}

function PerformanceOverview(props: PerformanceOverviewProps) {
  const { summonerData, searchedPayersInfoList } = props;
  const { matchInfoList } = summonerData;
  const { account } = summonerData;

  const noExistOverview = !matchInfoList || matchInfoList.length < 1;

  const puuid = account?.puuid;

  const placementAvg =
    searchedPayersInfoList.reduce((sum, item) => sum + item?.placement, 0) /
    searchedPayersInfoList.length;

  // console.log(searchedPayersInfoList, "ddd");
  // console.log(placementAvg);

  return (
    <div className="bg-content-bg border-[#222] border flex-grow rounded-md">
      {noExistOverview ? (
        <p>조회된 전적이 없습니다.</p>
      ) : (
        <>
          {" "}
          <div className="px-sm py-xs border-[#222] text-main-text border-b-[1px] text-xs font-semibold">
            20게임 종합
          </div>
          <div className="py-xs px-sm flex gap-xxs">
            <div className="flex-1  bg-default-bg py-xxxl flex flex-col items-center justify-end">
              <span className="text-2xl text-main-text">{placementAvg}</span>
              <span>평균 등수</span>
            </div>
            <div className="flex-1  bg-default-bg py-xxxl flex flex-col items-center justify-end">
              <span>최애 아이템</span>
            </div>
            <div className="flex-1  bg-default-bg py-xxxl flex flex-col items-center justify-end">
              <span className="text-2xl text-main-text">4</span>
              <span>최애 챔피언</span>
            </div>
            <div className="flex-1  bg-default-bg py-xxxl flex flex-col items-center justify-end">
              <span className="text-2xl text-main-text">
                <CompanionPortrait id="1" />
              </span>
              <span>최애 전설이</span>
            </div>
            <div className="flex-1  bg-default-bg py-xxxl flex flex-col items-center justify-end">
              <span className="text-2xl text-main-text">4</span>
              <span>아아무거나</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PerformanceOverview;
