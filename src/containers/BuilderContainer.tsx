import Field, { IndexedChampion } from "@/components/field/Field";
import ChampionList from "@/components/overlay/ChampionList";
import ItemCombination from "@/components/overlay/ItemCombination";
import RerollPercentage from "@/components/overlay/RerollPercentage";
import {
  Clipboard,
  LeftClick,
  LoadIcon,
  Question,
  RightClick,
  Trash,
} from "@/components/svgs";
import { useToolTip } from "@/components/tooltips/ToolTip";
import { cn, copyClipboard, filterNull } from "@/utils";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import ChampionPortrait from "@/components/ChampionPortrait";
import { PlacedChampion } from "@/components/field/hexagon";
import {
  getlocalAll,
  localStorageDelete,
  unOptimizedBuild,
  uploadToLocalstorage,
} from "@/utils/localstorage";
import { useRouter, useSearchParams } from "next/navigation";
import { SYNERGY_LIST, Synergy } from "@/constants/synergy";
import { TRAINING_BOT } from "@/constants/champions";
import useOutsideClickEvent from "@/hooks/useOutsideEvent";
import Link from "next/link";

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

const HEXAGON_QTY = 28;
const INITIAL_FIELD_ARRAY = [...Array(HEXAGON_QTY)].map((_) => null);

export default function BuilderContainer() {
  const [option, setOption] = useState<Option>({
    item: true,
    reroll: true,
    champion: true,
  });

  const router = useRouter();

  const { tooltipContainerRef, pos, isTooltipOn, tooltipOff, tooltipOn } =
    useToolTip();

  const [placedChampions, setPlacedChampions] =
    useState<(IndexedChampion | null)[]>(INITIAL_FIELD_ARRAY);
  const [buildList, setBuildList] = useState(getlocalAll);
  const params = useSearchParams();

  function resetBuilder() {
    if (!confirm("배치된 챔피언을 모두 제거 합니다.")) return;
    setPlacedChampions(INITIAL_FIELD_ARRAY);
    router.push("/");
  }

  // 저장
  function saveBuild(buildName: string) {
    if (placedChampions.length === 0) {
      alert("배치된 챔피언이 없습니다.");
      return;
    }
    const filteredNull = filterNull(placedChampions);

    const optimized = optimizeIndexedChampion(filteredNull);

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
    if (!params) return;
    getBuildFromUrl();
  }, [params]);

  function optimizeIndexedChampion(arr: PlacedChampion[]) {
    const optimized = arr.map((item) => {
      if (!item) return;

      return {
        name: item.champion.name,
        index: item.index,
        itemList: item.itemList.map((tem) => tem.name),
      };
    });

    return optimized;
  }

  function getBuildFromUrl() {
    const fieldParams = params.get("field") as string;

    if (!fieldParams) return;

    const unOptimized: IndexedChampion[] = unOptimizedBuild(
      fieldParams
    ) as IndexedChampion[];

    const clonedIndexed = unOptimized.map((indexed) =>
      structuredClone(indexed)
    );

    //console.log(unOptimized);

    // 초기 로딩 상징 처리
    const processingEmblem = clonedIndexed.forEach((indexed) =>
      indexed.itemList.forEach((item) => {
        if (!item.name.includes("상징")) return;
        const synergy = SYNERGY_LIST.find(
          (synergyItem) => synergyItem.src[0] === item.src
        ) as Synergy;
        if (indexed.champion.synergy.some((sy) => sy.name === synergy.name))
          return;
        indexed.champion.synergy.push(synergy);
      })
    );

    const clonedInitial: PlacedChampion[] = [...INITIAL_FIELD_ARRAY];

    clonedIndexed.forEach((item) => (clonedInitial[item.index] = item));

    setPlacedChampions(clonedInitial);
  }

  return (
    <>
      <header>
        <div
          className={cn(
            "pc:h-[100px] pc:flex-row py-md flex pc:gap-0 pc:items-start bg-default-bg inner",
            "mo:flex-col mo:gap-md",
            "tab:flex-col tab:gap-sm"
          )}
        >
          <div className="semi-bold text-main-text text-nowrap basis-[15%]">
            <Link className="" href={"/"}>
              <h1>TFT BUILDER</h1>
            </Link>
          </div>
          <div className="flex gap-sm items-center text-sm basis-[80%]">
            <LocalBuild buildList={buildList} setBuildList={setBuildList} />
            <BuildSave saveFn={saveBuild} />
            <button onClick={resetBuilder} className="button">
              배치 초기화
            </button>
          </div>
          <div className="flex pc:hidden">
            <p className="text-sm text-[#888]">
              현재 모바일 환경에서 조작이 원활하지 않으므로, 뷰어로써의 이용을
              권장합니다.
            </p>
          </div>
        </div>
      </header>
      <div className="relative pb-xxxl">
        {/* 상단영역 */}

        {/* 중앙 영역 */}
        <div className="flex pc:min-h-[450px] inner py-md tab:flex-col pc:flex-row  mo:flex-col bg-[#27282b] rounded-md">
          <h2 className="blind">배치 영역</h2>
          <Field
            placedChampions={placedChampions}
            setPlacedChampions={setPlacedChampions}
          />
          <div className="bg-[#ffffff05] tab:mt-md pc:mt-0 mo:mt-md rounded-md basis-[20%] border-[#222] border">
            <ItemCombination hidden={!option.item} />
          </div>
        </div>
        {/* 하단 영역 */}
        <div
          className={cn(
            "flex inner tab:flex-col pc:flex-row bg-[#27282b] pc:!pt-xxxl pb-md rounded-b-md",
            "mo:flex-col"
          )}
        >
          <div className="basis-[60%]">
            <ChampionList
              setPlacedChampions={setPlacedChampions}
              hidden={!option.champion}
            />
          </div>
          <div className="basis-[40%] mo:w-full">
            <RerollPercentage hidden={!option.reroll} />
          </div>
        </div>

        <div className="inner !mt-md text-[#888] text-sm bg-black !py-sm rounded-md">
          <div>
            <h2 className="font-semibold text-main-text">빌더 사용법</h2>
            <p className="mt-sm">
              상호작용이 가능한 요소들은 툴팁 하단에 조작법이 안내되어 있습니다.
              <br />
              일반적인 조작법은 다음과 같습니다.
            </p>
            <ul className="list-disc pl-xl mt-xs">
              <li className="">
                <LeftClick className="inline" /> : 챔피언 배치 / 카운트 증가
              </li>
              <li className="">
                <RightClick className="inline" /> : 챔피언 제거 / 아이템 장착
                해제 / 카운트 감소
              </li>
              <li className="">드래그&드롭 : 챔피언 배치, 아이템 장착</li>
            </ul>
          </div>
        </div>
      </div>
    </>
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

  const ref = useOutsideClickEvent(() => {
    setIsOpen(false);
  });

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
    const build = buildList?.find((item) => item.buildName === `${key}`);
    const baseUrl = "https://tft-build-simulator.vercel.app/";
    const resultUrl = `${baseUrl}?field=${build?.build}`;

    copyClipboard(resultUrl);
    alert("클립보드에 링크가 복사되었습니다.");
  }

  return (
    <div className="relative">
      <button onClick={handleOpen} className="button">
        내 빌드
      </button>
      {isOpen && (
        <div
          ref={ref}
          className="absolute popover-box z-[2000] top-[40px] p-md"
        >
          <div className="max-h-[460px] overflow-auto flex flex-col gap-sm  min-w-[200px] ">
            {unOptimized?.map((build) => (
              <div
                key={build.buildName}
                className="p-xs text-[#888] rounded-md"
              >
                <div className="flex items-center">
                  <span>{build.buildName.replace("-tft-build", "")}</span>
                  <div className="flex ml-auto gap-xs">
                    <button onClick={() => loadBuild(build.buildName)}>
                      <LoadIcon className="fill-[#888]" />
                    </button>
                    <button
                      onClick={() => copyBuildUrl(build.buildName)}
                      className="cursor-pointer"
                    >
                      <Clipboard className="fill-[#888]" />
                    </button>
                    <button
                      onClick={() => deleteBuild(build.buildName)}
                      className="cursor-pointer"
                    >
                      <Trash className="fill-[#888]" />
                    </button>
                  </div>
                </div>
                <div className="flex gap-xxs mt-xxs bg-[#19191b] p-xs rounded-md">
                  {build.build?.map((indexed) => (
                    <ChampionPortrait
                      key={indexed.champion.name}
                      champion={indexed.champion}
                      className={cn("size-[40px]")}
                      objectPosition={
                        indexed.champion.name !== TRAINING_BOT.name
                          ? "object-[-35px_0px]"
                          : ""
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
            {buildList?.length === 0 && (
              <p className="text-sm bg-[#19191b] text-[#888] p-md rounded-md">
                저장된 빌드가 없습니다.
              </p>
            )}
          </div>
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

  const ref = useOutsideClickEvent(() => {
    setIsOpen(false);
  });

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setBuildName(event.target.value);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (buildName === "") {
      alert("빌드 이름을 입력해주세요.");
      return;
    }
    saveFn(`${buildName}-tft-build`);
    setIsOpen(false);
    setBuildName("");
  }

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setIsOpen((prev) => !prev)} className="button">
        빌드 저장
      </button>
      {isOpen && (
        <div className="absolute p-md popover-box z-[2000] min-w-[200px] top-[40px]">
          <div className="flex items-center">
            <p className="text-[#888]">빌드 이름</p>
          </div>
          <div>
            <form onSubmit={onSubmit} className="flex items-center mt-xs">
              <input
                value={buildName}
                onChange={onChange}
                className="bg-[#19191b] text-[#888] p-xxs"
              ></input>
              <button className="p-xxs bg-default-bg rounded-md ml-xxs text-[#888] hover:text-gray-600">
                저장
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
