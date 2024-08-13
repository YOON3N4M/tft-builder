import Field, { IndexedChampion } from "@/components/field/Field";
import ChampionList from "@/components/overlay/ChampionList";
import ItemCombination from "@/components/overlay/ItemCombination";
import RerollPercentage from "@/components/overlay/RerollPercentage";
import { Question } from "@/components/svgs";
import { ToolTip, useToolTip } from "@/components/tooltip/ToolTip";
import { cn, copyClipboard } from "@/utils";
import { HTMLAttributes, ReactNode, useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import useHandleParams from "@/hooks/useHandleParams";

type OptionItem = "item" | "reroll" | "champion";

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

  const { addParams } = useHandleParams();
  const params = useSearchParams();

  function resetBuilder() {
    if (!confirm("배치된 챔피언을 모두 제거 합니다.")) return;
    setPlacedChampions([]);
    router.push("/");
  }

  function saveBuild() {
    if (placedChampions.length === 0) {
      alert("배치된 챔피언이 없습니다.");
      return;
    }

    const fieldToString = JSON.stringify(placedChampions);

    addParams("field", fieldToString);
    copyClipboard(`https://tft-helper-zeta.vercel.app/?${fieldToString}`);
  }

  useEffect(() => {
    const fieldParams = params.get("field") as string;
    console.log(fieldParams);
    const parsing = JSON.parse(fieldParams) as IndexedChampion[];

    if (!parsing) return;
    setPlacedChampions(parsing);
  }, []);

  return (
    <div>
      <div className="relative">
        {/* 상단영역 */}
        <div className="h-[100px] py-md flex bg-default-bg inner">
          <div className="semi-bold basis-[20%]">TFT HELPER</div>
          <div className="flex gap-sm items-center text-sm">
            <button
              onClick={saveBuild}
              className="bg-white py-xxs px-xs border rounded-md"
            >
              빌드 저장
            </button>
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
          {/* side menu */}
          {/* <div className="absolute z-[400]  h-[400px] w-[70px] py-md flex flex-col gap-xl">
            <ControllerButton
              isOn={option.item}
              fn={() => handleOption("item")}
            >
              <Sword />
            </ControllerButton>
            <ControllerButton
              isOn={option.reroll}
              fn={() => handleOption("reroll")}
            >
              <Reroll />
            </ControllerButton>
            <ControllerButton
              isOn={option.champion}
              fn={() => handleOption("champion")}
            >
              <Pawn />
            </ControllerButton>
          
          </div> */}
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

interface ControllerButtionProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  fn: (optionItem: OptionItem) => void;
  isOn: boolean;
}

function ControllerButton(props: ControllerButtionProps) {
  const { isOn, className, children, fn } = props;
  return (
    <button
      onClick={() => fn("item")}
      className={cn(
        "w-full mx-auto px-md py-xl rounded-tr-[4px] rounded-br-[4px] bg-white border flex justify-center !border-l-0",
        className,
        isOn ? "drop-shadow-2xl font-bold" : "bg-white shadow-sm"
      )}
    >
      {children && children}
    </button>
  );
}
