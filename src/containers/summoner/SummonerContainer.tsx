"use client";

import { SUMMONER_PROFILE_ICON_URL } from "@/constants/url";
import { SummonerData } from "@/types/riot";
import { romeNumToArabNum } from "@/utils";
import Image from "next/image";
import Summoner from "./Summoner";

interface SummonerContainerProps {
  summonerData: SummonerData;
}

function SummonerContainer(props: SummonerContainerProps) {
  const { summonerData } = props;
  const { account, summoner, matchInfoList, league } = summonerData;

  console.log(summonerData);

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
            <div className="bg-content-bg border-[#222] border flex-grow rounded-md">
              <div className="px-sm py-xs border-[#222] text-main-text border-b-[1px] text-xs font-semibold">
                20게임 종합
              </div>
              <div className="py-xs px-sm flex gap-xxs">
                <div className="flex-1 bg-default-bg py-xxxl flex flex-col items-center justify-center">
                  <span className="text-2xl text-main-text">4</span>
                  <span>평균 등수</span>
                </div>
                <div className="flex-1 bg-default-bg py-xxxl flex flex-col items-center justify-center">
                  <span>최애 아이템</span>
                </div>
                <div className="flex-1 bg-default-bg py-xxxl flex flex-col items-center justify-center">
                  <span className="text-2xl text-main-text">4</span>
                  <span>최애 챔피언</span>
                </div>
                <div className="flex-1 bg-default-bg py-xxxl flex flex-col items-center justify-center">
                  <span className="text-2xl text-main-text">4</span>
                  <span>아무거나</span>
                </div>
                <div className="flex-1 bg-default-bg py-xxxl flex flex-col items-center justify-center">
                  <span className="text-2xl text-main-text">4</span>
                  <span>아아무거나</span>
                </div>
              </div>
            </div>
          </div>
          {/* 전적 리스트 부분 */}
          <div></div>{" "}
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
