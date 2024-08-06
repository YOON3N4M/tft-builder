"use client";

import {
  PIECES_QTY,
  REROLL_PERCENTAGE,
  SHOP_PIECES_QTY,
  SHOP_PIECES_QTY_ARR,
} from "@/constants/reroll";
import { Overlay, OverlayProps, OverlayTab } from "./Overlay";
import { cn, sortByNumber } from "@/utils";
import { Token } from "../svgs";
import {
  Dispatch,
  DragEvent,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Champion } from "@/constants/champions";
import { useDraggingTarget } from "@/store/dragStore";
import { CHAMPION_ICON_URL } from "@/constants/url";
import Image from "next/image";

interface RerollPercentageProps extends OverlayProps {}

const colorStyles: { [key: string]: string } = {
  "1": "text-tier-1",
  "2": "text-tier-2",
  "3": "text-tier-3",
  "4": "text-tier-4",
  "5": "text-tier-5",
};

const shapeStyles: { [key: string]: string } = {
  "1": "bg-tier-1 rounded-full size-[8px]",
  "2": "bg-tier-2 rounded-full size-[8px]",
  "3": "border-b-tier-3 triangle ",
  "4": "bg-tier-4 pentagon size-[10px]",
  "5": "bg-tier-5 hexagon size-[10px]",
};

function RerollPercentage(props: RerollPercentageProps) {
  const { hidden } = props;

  const draggingTarget = useDraggingTarget();

  const [isDragEnter, setIsDragEnter] = useState(false);
  const [targetChampions, setTargetChampions] = useState<Champion[]>([]);
  const [currentLevel, setCurrentLevel] = useState(6);
  const [currentPercentage, setCurrentPercentage] = useState<number[]>(
    REROLL_PERCENTAGE.find((item) => item.level === currentLevel)?.percentage!
  );

  function increaseLevel() {
    if (currentLevel === 10) return;
    setCurrentLevel((prev) => {
      handleCurrentPercentage(prev + 1);
      return prev + 1;
    });
  }

  function decreaseLevel(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (currentLevel === 1) return;
    setCurrentLevel((prev) => {
      handleCurrentPercentage(prev - 1);
      return prev - 1;
    });
  }

  function handleCurrentPercentage(level: number) {
    setCurrentPercentage(
      REROLL_PERCENTAGE.find((item) => item.level === level)?.percentage!
    );
  }

  function onDragEnter() {
    setIsDragEnter(true);
  }

  function onDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function onDrageLeave() {
    setIsDragEnter(false);
  }

  function onDragDrop() {
    console.log("드랍함 ");
    const draggingChampion = draggingTarget as Champion;
    const isExist = targetChampions.find(
      (champion) => champion.name === draggingChampion.name
    );

    if (isExist) {
      alert("이미 등록된 챔피언 입니다.");
      return;
    } else {
      setTargetChampions((prev) =>
        sortByNumber([...prev, draggingChampion], "tier", true)
      );
    }
    setIsDragEnter(false);
  }

  return (
    <Overlay hidden={hidden} className="">
      <OverlayTab className="flex gap-sm text-sm">
        <button className="font-bold">기물 확률</button>
        {/* <button>확률표</button> */}
      </OverlayTab>
      <div className="pc:min-w-[500px] p-md text-sm">
        <div className="flex gap-xs items-center">
          <span>현재 내 레벨</span>
          <button
            className="p-xs hover:bg-default-bg border rounded-md"
            onClick={increaseLevel}
            onContextMenu={decreaseLevel}
          >
            {currentLevel}
          </button>
          <div className="flex gap-sm ml-md bg-default-bg p-sm rounded-md">
            {currentPercentage.map((per, idx) => (
              <div
                key={`${currentLevel}-${per}-${idx}`}
                className="flex items-center gap-xxs"
              >
                <span className={cn(shapeStyles[idx + 1])} />
                <span
                  className={cn("text-xs", colorStyles[(idx + 1).toString()])}
                >
                  {per}%
                </span>
              </div>
            ))}
          </div>
        </div>
        <div
          onDragEnter={onDragEnter}
          onDragLeave={onDrageLeave}
          onDrop={onDragDrop}
          onDragOver={onDragOver}
          className={cn(
            "w-full flex min-h-[100px] border bg-default-bg mt-md flex-col rounded-md",
            isDragEnter && "border-blue-300 border-2"
          )}
        >
          {targetChampions.length < 1 ? (
            <p className="m-auto pointer-events-none">
              상점 등장 확률을 알고 싶은 챔피언을 여기에 드래그 해보세요!
            </p>
          ) : (
            <>
              {targetChampions.map((champion, idx) => (
                // 이부분 컴포넌트 분리하고 리팩토링하는게 나을 듯
                <RerollTargetChampion
                  key={champion.name}
                  champion={champion}
                  currentLevel={currentLevel}
                  setTargetChampions={setTargetChampions}
                />
              ))}
            </>
          )}
        </div>
        {/* 여기서 탭 조건부 렌더링 <RerollTable /> */}
      </div>
    </Overlay>
  );
}

export default RerollPercentage;

function RerollTable() {
  return (
    <table className="pc:min-w-[500px] [&_th]:p-xs [&_td]:p-xs rounded-md">
      <thead>
        <tr className="bg-default-bg">
          <th>레벨</th>
          {PIECES_QTY.map((_, idx) => (
            <th
              key={idx}
              className={cn("", idx !== 0 && colorStyles[(idx + 1).toString()])}
            >
              <span className="flex items-center gap-xxs text-center justify-center">
                <Token />
                {idx + 1}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {REROLL_PERCENTAGE.map((rollCase) => (
          <tr key={rollCase.level}>
            <th className="bg-default-bg">Lv.{rollCase.level}</th>
            {rollCase.percentage.map((percentage, idx) => (
              <td
                className={cn(
                  "text-center",
                  percentage > 0 &&
                    idx !== 0 &&
                    colorStyles[(idx + 1).toString()]
                )}
                key={percentage}
              >
                {percentage}%
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

interface RerollTargetChampionProps {
  champion: Champion;
  currentLevel: number;
  setTargetChampions: Dispatch<SetStateAction<Champion[]>>;
}
function RerollTargetChampion(props: RerollTargetChampionProps) {
  const { champion, currentLevel, setTargetChampions } = props;

  const [placedPiecesQty, setPlacesPieces] = useState(0);

  const pieceQty = PIECES_QTY[champion.tier - 1];

  const currentPercentage = REROLL_PERCENTAGE.find(
    (item) => item.level === currentLevel
  )?.percentage!;

  function increaseQty() {
    if (placedPiecesQty === pieceQty) return;
    setPlacesPieces((prev) => prev + 1);
  }

  function decreaseQty(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (placedPiecesQty === 0) return;
    setPlacesPieces((prev) => prev - 1);
  }

  function calculateRerollPer() {
    // ex. 8렙 4코 확률
    const basePer = currentPercentage[champion.tier - 1];

    // ex. 4코 총 기물 갯수
    const targetTierQty = SHOP_PIECES_QTY_ARR[champion.tier - 1];

    // ex. 상점에 남아있는 목표 기물 갯수
    const targetUnitQty = PIECES_QTY[champion.tier - 1] - placedPiecesQty;

    // ex. 목표 기물 갯수 / 전체 기물 갯수
    const per = targetUnitQty / targetTierQty;

    // ex. 5번 시행
    const shopPer = per * 5;

    // 레벨 별 확률 곱해줌
    const result = shopPer * basePer;

    return result;
  }

  function removeChampion(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    setTargetChampions((prev) =>
      prev.filter((prevChampion) => prevChampion.name !== champion.name)
    );
  }

  return (
    <div
      //onContextMenu={removeChampion}
      className={cn(`w-full h-[128px] relative  cursor-pointer`)}
    >
      <div className="absolute top-0 bg-gradient-to-l from-black from-[40%] to-[#fff0] size-full z-[10]">
        <div className="text-white flex size-full flex-row-reverse">
          <div className="basis-[50%] flex py-md">
            <div className="flex flex-col w-full">
              <div className="flex items-center">
                <span className={cn(shapeStyles[champion.tier])} />
                <span className="font-bold ml-xs text-xl">
                  {champion.name}{" "}
                  <span className="text-sm text-gray-500">({pieceQty})</span>
                </span>
              </div>
              <div className="flex gap-xxs text-gray-500 pl-lg">
                {champion.synergy.map((synergy) => (
                  <span
                    key={`${champion.name}-${synergy.name}`}
                    className="text-xs"
                  >
                    · {synergy.name}
                  </span>
                ))}
              </div>
              <div className="px-lg mt-lg flex items-center">
                <button
                  onClick={increaseQty}
                  onContextMenu={decreaseQty}
                  className="border-gray-400 border px-sm py-xxs rounded-md text-gray-400"
                >
                  {placedPiecesQty}
                </button>
                <div className="flex flex-col ml-auto text-2xl font-semibold">
                  {calculateRerollPer().toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image
        width={256}
        height={128}
        src={CHAMPION_ICON_URL(champion.src)}
        alt={champion.name}
        className="scale-x-[-1] absolute top-0 z-[0]"
      />
    </div>
  );
}
