import { ParticipanthDto, SummonerData } from "@/types/riot";
import PerformanceOverview from "./PerformanceOverview";
import Summoner from "./Summoner";
import { getTacticianList } from "@/app/services/riot";
import { cn } from "@/utils";
import Match from "./Match";

interface SummonerContainerProps {
  summonerData: SummonerData;
}

function SummonerContainer(props: SummonerContainerProps) {
  const { summonerData } = props;
  const { account, summoner, matchInfoList, league } = summonerData;

  const puuid = account?.puuid;

  console.log(matchInfoList);

  const searchedPayersInfoList = matchInfoList?.map((matchInfo) =>
    matchInfo.info.participants.find((parti) => parti.puuid === puuid)
  ) as ParticipanthDto[];

  return (
    <div className="text-sub-text inner !mt-lg bg-sub-bg text-sm">
      {account && summoner ? (
        <>
          {" "}
          {/* 아마 상단 영역 */}
          <div className="flex py-lg pc:gap-lg">
            {/* 소화 */}
            <div className="basis-1/5">
              {/* 컴포분리 소환사 정보? */}
              <Summoner summonerData={summonerData} />
              {/* 소환사 정보 끗 */}
              {/* 퍼포먼스 요약 */}
            </div>
            {/* 종합 성적 */}
            <PerformanceOverview
              summonerData={summonerData}
              searchedPayersInfoList={searchedPayersInfoList}
            />
          </div>
          {/* 전적 리스트 부분 */}
          <div className="flex py-lg pc:gap-lg">
            <div className="basis-1/5">d</div>
            {/* 전적리스트 */}
            {matchInfoList && puuid && (
              <div className="basis-4/5 max-w-[940px] flex flex-col p-[1px] gap-sm">
                {matchInfoList.map((match, idx) => {
                  return (
                    <Match key={`match-${idx}`} puuid={puuid} match={match} />
                  );
                })}
              </div>
            )}
          </div>{" "}
        </>
      ) : (
        <div>
          <p>존재 하지 않는 소환사입</p>
        </div>
      )}
    </div>
  );
}

export default SummonerContainer;
