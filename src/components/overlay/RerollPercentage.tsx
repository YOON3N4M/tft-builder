"use client";

import { PIECES_QTY, REROLL_PERCENTAGE } from "@/constants/reroll";
import { Overlay, OverlayProps, OverlayTab } from "./Overlay";
import { cn } from "@/utils";
import { Token } from "../svgs";
import { MouseEvent, useEffect, useState } from "react";

interface RerollPercentageProps extends OverlayProps {}

const colorStyles: { [key: string]: string } = {
  "1": "text-tier-1",
  "2": "text-tier-2",
  "3": "text-tier-3",
  "4": "text-tier-4",
  "5": "text-tier-5",
};

function RerollPercentage(props: RerollPercentageProps) {
  const {} = props;

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

  useEffect(() => {
    console.log(currentPercentage);
  }, [currentPercentage]);

  return (
    <Overlay className="h-[260px]">
      <OverlayTab className="flex gap-sm text-sm">
        <button className="font-bold">기물 확률</button>
        <button>확률표</button>
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
              <span
                key={`${currentLevel}-${per}-${idx}`}
                className={cn(
                  "text-xs",
                  idx !== 0 && colorStyles[(idx + 1).toString()]
                )}
              >
                {per}%
              </span>
            ))}
          </div>
        </div>
        <div className="w-full flex h-[100px] border bg-default-bg mt-md">
          <p className="m-auto">
            상점 등장 확률을 알고 싶은 챔피언을 여기에 드래그 해보세요!
          </p>
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
