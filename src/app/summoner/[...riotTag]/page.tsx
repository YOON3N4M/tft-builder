import { refreshRiotData } from "@/services/riot";
import SummonerContainer from "@/containers/summoner/SummonerContainer";

import { handleRiotId } from "@/utils";

interface SummonerPageProps {
  params: { riotTag: string[] };
}

// 1. 라이엇 account 정보 받기

async function SummonerPage(props: SummonerPageProps) {
  const { params } = props;
  const { riotTag } = params;

  // 한글의 경우 인코딩되기때문에 Decode
  const decodeRiotTag = decodeURIComponent(riotTag[0]);

  // 검색된 라이엇 태그를 닉네임과 태그로 분리
  const riotId = handleRiotId(decodeRiotTag, "-");

  //새로고침 동작과 같은 형태. 만약 Db가 생긴다면 우선적으로 Db조회 후 라이엇 api는 이후에 이루어 져야함
  const summonerData = await refreshRiotData(riotId);
  //시즌 12(TFTSet12)가 아닌 기록 필터링 (필요 Aaset이 달라서 버그가 발생하기때문에)
  if (summonerData.matchInfoList) {
    const set12MatchInfoList = summonerData.matchInfoList.filter(
      (match) => match.info.tft_set_number === 12
    );
    summonerData.matchInfoList =
      set12MatchInfoList.length > 0 ? set12MatchInfoList : null;
  }

  return <SummonerContainer summonerData={summonerData} />;
}

export default SummonerPage;
