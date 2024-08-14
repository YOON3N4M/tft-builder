import Field, { IndexedChampion } from "@/components/field/Field";
import ChampionList from "@/components/overlay/ChampionList";
import ItemCombination from "@/components/overlay/ItemCombination";
import RerollPercentage from "@/components/overlay/RerollPercentage";
import { Clipboard, LoadIcon, Question, Trash } from "@/components/svgs";
import { ToolTip, useToolTip } from "@/components/tooltips/ToolTip";
import { cn, copyClipboard } from "@/utils";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import ChampionPortrait from "@/components/ChampionPortrait";
import useHandleParams from "@/hooks/useHandleParams";
import {
  getlocalAll,
  localStorageDelete,
  unOptimizedBuild,
  uploadToLocalstorage,
} from "@/utils/localstorage";
import { useRouter, useSearchParams } from "next/navigation";

type OptionItem = "item" | "reroll" | "champion";

export interface OptimizedIndexedChampion {
  name: string;
  itemList: string[];
  index: number;
}

interface LocalBuildType {
  buildName: string;
  build: string | null;
}
[];

interface Option {
  item: boolean;
  reroll: boolean;
  champion: boolean;
}

export default function BuilderContainer() {
  const [option, setOption] = useState<Option>({
    item: true,
    reroll: true,
    champion: true,
  });

  const router = useRouter();

  const { pos, isTooltipOn, tooltipOff, tooltipOn } = useToolTip();

  const [placedChampions, setPlacedChampions] = useState<IndexedChampion[]>([]);
  const [buildList, setBuildList] = useState(getlocalAll);
  const params = useSearchParams();

  function resetBuilder() {
    if (!confirm("배치된 챔피언을 모두 제거 합니다.")) return;
    setPlacedChampions([]);
    router.push("/");
  }

  // 저장
  function saveBuild(buildName: string) {
    if (placedChampions.length === 0) {
      alert("배치된 챔피언이 없습니다.");
      return;
    }

    const optimized = optimizeIndexedChampion(placedChampions);

    const fieldToString = JSON.stringify(optimized);

    const encoded = encodeURI(fieldToString);
    // addParams("field", fieldToString);
    //  const pureURL = `https://tft-helper-zeta.vercel.app/?field=${fieldToString}`;
    //  const encode = encodeURI(pureURL);

    uploadToLocalstorage(buildName, encoded);
    setBuildList(getlocalAll);
    alert("저장 되었습니다.");
    // copyClipboard(encode);
  }

  // 불러오기
  useEffect(() => {
    getBuildFromUrl();
  }, [params]);

  function optimizeIndexedChampion(arr: IndexedChampion[]) {
    const optimized = arr.map((item) => ({
      name: item.champion.name,
      index: item.index,
      itemList: item.itemList.map((tem) => tem.name),
    }));

    return optimized;
  }

  function getBuildFromUrl() {
    const fieldParams = params.get("field") as string;

    if (!fieldParams) return;

    const unOptimized: IndexedChampion[] = unOptimizedBuild(
      fieldParams
    ) as IndexedChampion[];

    setPlacedChampions(unOptimized);
  }

  return (
    <div>
      <div className="relative">
        {/* 상단영역 */}

        <div className="h-[100px] py-md flex bg-default-bg inner">
          <div className="semi-bold basis-[20%]">TFT HELPER</div>
          <div className="flex gap-sm items-center text-sm">
            <LocalBuild buildList={buildList} setBuildList={setBuildList} />
            <BuildSave saveFn={saveBuild} />
            <button
              onClick={resetBuilder}
              className="bg-white py-xxs px-xs border rounded-md"
            >
              배치 초기화
            </button>
          </div>
          <div className="ml-auto relative">
            <Question
              onMouseEnter={tooltipOn}
              onMouseLeave={tooltipOff}
              className="fill-gray-400 cursor-pointer"
              size={20}
            />

            <ToolTip isOn={isTooltipOn} x={pos.x} y={pos.y}>
              <span className="font-semibold">조작</span>
              <ul className="pl-sm mt-xxs bg-default-bg p-sm rounded-md">
                <li>
                  챔피언
                  <br />
                  <span className="text-gray-500">
                    드래그로 이동해서 추가가 가능하며 추가된 챔피언은 우클릭시
                    제거됩니다.
                  </span>
                </li>
                <li className="mt-xs">
                  아이템
                  <br />
                  <span className="text-gray-500">
                    완성 아이템을 우클릭하면 보유 조합 아이템을 소모하여 완성
                    아이템을 조합합니다.
                  </span>
                  <br /> <br />
                  <span className="text-gray-500">
                    조합된 완성 아이템은 드래그해서 배치된 챔피언에게 장착 할 수
                    있습니다.
                  </span>
                </li>
                <li className="mt-xs">
                  숫자 카운트
                  <br />
                  <span className="text-gray-500">
                    좌클릭 증가 / 우클릭 감소
                  </span>
                </li>
              </ul>
              <div className="mt-md ">
                <span className="font-semibold">확률</span>
                <ul className="pl-sm mt-xxs bg-default-bg p-sm rounded-md">
                  <li>
                    기물 확률
                    <br />
                    <span className="text-gray-500">
                      모든 기물은 코스트에 따라 최대 개수가 정해져 있기때문에
                      게임 내 존재하는 기물의 개수를 입력하면 보다 근접한 확률을
                      얻을 수 있습니다
                      <br />
                      <br />
                      기물 확률은 대략적인 확률 입니다. 실제 인게임 확률과는
                      오차가 있습니다.
                    </span>
                  </li>
                  <li className="mt-xs">
                    확률표
                    <br />
                    <span className="text-gray-500">
                      해당 확률표는 라이엇 공식 제공 확률입니다.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mt-md">
                <span className="font-semibold">미구현</span>
                <ul className="pl-sm mt-xxs bg-default-bg p-sm rounded-md">
                  <li>
                    뒤집개/상징
                    <br />
                    <span className="text-gray-500">
                      뒤집개를 이용한 상징 조합, 상징 추가에 따른 시너지 조정은
                      현재 미구현 상태입니다.
                    </span>
                  </li>
                </ul>
              </div>
            </ToolTip>
          </div>
        </div>
        {/* 중앙 영역 */}
        <div className="flex inner bg-default-bg py-md">
          <Field
            placedChampions={placedChampions}
            setPlacedChampions={setPlacedChampions}
          />
          <div className="basis-[10%]">
            <div className="absolute">
              <ItemCombination hidden={!option.item} />
            </div>
          </div>
        </div>
        {/* 하단 영역 */}
        <div className="flex inner bg-default-bg !pt-xxxl">
          <div className="basis-[20%]"></div>
          <div className="flex self-start basis-[40%]">
            <ChampionList hidden={!option.champion} />
          </div>
          <div className="flex self-start">
            <RerollPercentage hidden={!option.reroll} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface LocalBuildProps {
  buildList:
    | {
        buildName: string;
        build: string | null;
      }[]
    | undefined;
  setBuildList: any;
}

function LocalBuild(props: LocalBuildProps) {
  const { buildList, setBuildList } = props;

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const unOptimized = buildList?.map((build) => ({
    buildName: build.buildName,
    build: unOptimizedBuild(build.build!),
  }));

  function handleOpen() {
    setIsOpen((prev) => !prev);
  }

  function loadBuild(key: string) {
    const build = buildList?.find((item) => item.buildName === `${key}`);
    router.push(`?field=${build?.build}`);
  }

  function deleteBuild(key: string) {
    if (!confirm("빌드를 삭제합니다.")) return;
    localStorageDelete(key);
    setBuildList(getlocalAll);
  }

  function copyBuildUrl(key: string) {
    console.log("dho enqjs?");
    const build = buildList?.find((item) => item.buildName === `${key}`);
    const baseUrl = "https://tft-helper-zeta.vercel.app/";
    const resultUrl = `${baseUrl}?field=${build?.build}`;

    copyClipboard(resultUrl);
    alert("클립보드에 링크가 복사되었습니다.");
  }

  return (
    <div className="relative">
      <button
        onClick={handleOpen}
        className="bg-white py-xxs px-xs border rounded-md"
      >
        내 빌드
      </button>
      {isOpen && (
        <div className="absolute flex flex-col gap-sm p-md bg-white border shadow-md top-[40px] min-w-[200px] z-[2000]">
          {unOptimized?.map((build) => (
            <div key={build.buildName} className="p-xs border rounded-md">
              <div className="flex items-center">
                <span>{build.buildName.replace("-tft-build", "")}</span>
                <div className="flex ml-auto gap-xs">
                  <button onClick={() => loadBuild(build.buildName)}>
                    <LoadIcon className="fill-gray-500" />
                  </button>
                  <button
                    onClick={() => copyBuildUrl(build.buildName)}
                    className="cursor-pointer"
                  >
                    <Clipboard className="fill-gray-500" />
                  </button>
                  <button
                    onClick={() => deleteBuild(build.buildName)}
                    className="cursor-pointer"
                  >
                    <Trash className="fill-gray-500" />
                  </button>
                </div>
              </div>
              <div className="flex gap-xxs mt-xxs bg-default-bg p-xs rounded-md">
                {build.build?.map((indexed) => (
                  <ChampionPortrait
                    key={indexed.champion.name}
                    champion={indexed.champion}
                    className={cn("size-[40px]")}
                    objectPosition="object-[-35px_0px]"
                  />
                ))}
              </div>
            </div>
          ))}
          {buildList?.length === 0 && (
            <p className="text-sm bg-default-bg p-md rounded-md">
              저장된 빌드가 없습니다.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

interface BuildSaveProps {
  saveFn: (buildName: string) => void;
}

function BuildSave(props: BuildSaveProps) {
  const { saveFn } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [buildName, setBuildName] = useState("");

  function onChnage(event: ChangeEvent<HTMLInputElement>) {
    setBuildName(event.target.value);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveFn(`${buildName}-tft-build`);
    setIsOpen(false);
    setBuildName("");
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-white py-xxs px-xs border rounded-md"
      >
        빌드 저장
      </button>
      {isOpen && (
        <div className="absolute p-md bg-white border shadow-md z-[2000] min-w-[200px] top-[40px] rounded-md">
          <div className="flex items-center">
            <p>빌드 이름</p>
          </div>
          <div>
            <form onSubmit={onSubmit} className="flex items-center mt-xs">
              <input
                value={buildName}
                onChange={onChnage}
                className="bg-default-bg p-xxs"
              ></input>
              <button className="p-xxs bg-default-bg rounded-md ml-xxs text-gray-500 hover:text-gray-600">
                저장
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
