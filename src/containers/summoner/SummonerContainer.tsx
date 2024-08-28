import { ParticipanthDto, SummonerData } from "@/types/riot";
import Match from "./Match";
import PerformanceOverview from "./PerformanceOverview";
import Summoner from "./Summoner";
import RecentlyGameResult from "./RecentlyGameResult";
import { Warning } from "@/components/svgs";

interface SummonerContainerProps {
  summonerData: SummonerData;
}

function SummonerContainer(props: SummonerContainerProps) {
  const { summonerData } = props;
  const { account, summoner, matchInfoList, league } = summonerData;

  const puuid = account?.puuid;

  const searchedPayersInfoList = matchInfoList?.map((matchInfo) =>
    matchInfo.info.participants.find((parti) => parti.puuid === puuid)
  ) as ParticipanthDto[];

  return (
    <div className="text-sub-text inner !mt-lg bg-sub-bg text-sm">
      {account && summoner ? (
        <>
          {" "}
          {/* 아마 상단 영역 */}
          <div className="flex py-lg pc:gap-lg tab:flex-col mo:flex-col">
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
          <div className="flex py-lg pc:gap-lg mo:flex-col tab:flex-col">
            <div className="basis-1/5">
              <RecentlyGameResult
                searchedPayersInfoList={searchedPayersInfoList}
              />
            </div>
            {/* 전적리스트 */}
            <div className="basis-4/5 max-w-[940px] flex flex-col p-[1px] gap-sm mo:max-w-full tab:max-w-full mo:mt-lg tab:mt-lg">
              {matchInfoList && puuid && (
                <>
                  {matchInfoList.map((match, idx) => {
                    //if (idx !== 1) return;
                    return (
                      <Match key={`match-${idx}`} puuid={puuid} match={match} />
                    );
                  })}
                </>
              )}
            </div>
          </div>{" "}
        </>
      ) : (
        <div className="min-h-[80dvh] flex items-center  pt-[10%] flex-col">
          <Warning size={"40px"} />

          <p className="mt-md text-xl">존재 하지 않는 소환사입니다</p>
          <p className="mt-sm">
            닉네임, 태그를 정확히 입력했는지 확인해주세요.
          </p>
        </div>
      )}
    </div>
  );
}

export default SummonerContainer;
