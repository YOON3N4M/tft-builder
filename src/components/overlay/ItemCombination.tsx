"use client";

import {
  BF_SWRORD,
  CHAIN_VEST,
  COMBINATION_ITEM_LIST,
  CombinationItem,
  CoreItem,
  EMBLEM_ITEM_LIST,
  GIANTS_BELT,
  NEEDLESSLY_LARGE_ROD,
  NEGATRON_CLOAK,
  RECURVE_BOW,
  SPARRINGS_GLOVES,
  SPATULA,
  TEAR_OF_THE_GADDESS,
} from "@/data/item";

import { cn } from "@/utils";
import { calculateAllCombinationCase } from "@/utils/item";
import Image from "next/image";

import { useDragActions } from "@/store/dragStore";
import { MouseEvent, useEffect, useState } from "react";
import { Question, Reset, WindowMaxi, WindowMini } from "../svgs";

import ItemPortrait from "../portraits/ItemPortrait";
import Tab from "../tab/Tab";
import { ToolTip, useToolTip } from "../tooltips/ToolTip";
import { OverlayProps } from "./Overlay";
import { SRC_ITEM } from "@/constants/src";

interface ItemCombinationProps extends OverlayProps {}

const initialInventory = {
  [BF_SWRORD.name]: 0,
  [RECURVE_BOW.name]: 0,
  [CHAIN_VEST.name]: 0,
  [NEGATRON_CLOAK.name]: 0,
  [NEEDLESSLY_LARGE_ROD.name]: 0,
  [TEAR_OF_THE_GADDESS.name]: 0,
  [GIANTS_BELT.name]: 0,
  [SPARRINGS_GLOVES.name]: 0,
  [SPATULA.name]: 0,
};

function ItemCombination(props: ItemCombinationProps) {
  const { hidden } = props;

  const [coreInventory, setCoreInventory] = useState<CoreItem[]>([]);
  const [inventory, setInventory] = useState(initialInventory);

  const [combinationCase, setCombinationCase] = useState<CoreItem[][]>([]);
  const [foldCase, setFoldCase] = useState(true);

  const { setDraggingCoreItem } = useDragActions();

  const { isTooltipOn, tooltipOn, tooltipOff, tooltipContainerRef, pos } =
    useToolTip();

  function increaseItem(itemName: string) {
    setInventory((prev) => ({
      ...prev,
      [itemName]: prev[itemName] + 1,
    }));
  }

  function onRightClickItemIcon(
    e: MouseEvent<HTMLButtonElement>,
    itmeName: string
  ) {
    e.preventDefault();
    if (inventory[itmeName] < 1) return;
    decreaseItem(itmeName);
  }

  function decreaseItem(itemName: string) {
    setInventory((prev) => ({
      ...prev,
      [itemName]: prev[itemName] - 1,
    }));
  }

  function resetInventory() {
    setCoreInventory([]);
    setInventory(initialInventory);
  }

  function handleCaseFold() {
    setFoldCase((prev) => !prev);
  }

  function handleCoreItemRightClick(
    event: MouseEvent<HTMLButtonElement>,
    targetCoreItem: CoreItem
  ) {
    event.preventDefault();

    const cloneInventory = { ...inventory };

    targetCoreItem.recipe.forEach(
      (rec) =>
        (cloneInventory[rec.requireItem.name] =
          cloneInventory[rec.requireItem.name] - rec.qty)
    );

    setInventory(cloneInventory);
    setCoreInventory((prev) => [...prev, targetCoreItem]);
    //const result = combineItem(targetCoreItem, inventory);
  }

  function handleCoreItemDrag(coreItem: CoreItem) {
    setDraggingCoreItem(coreItem);
  }

  function handleCoreItemDragEnd() {
    setDraggingCoreItem(null);
  }

  useEffect(() => {
    const result = calculateAllCombinationCase(inventory);
    setCombinationCase(result);
  }, [inventory]);

  return (
    <Tab
      className="text-sm pt-sm w-full items-center"
      tabs={["아이템", "상징"]}
      tabRightContents={
        <div
          ref={tooltipContainerRef}
          className="relative text-wihte flex gap-sm"
        >
          <button onClick={resetInventory}>
            <Reset className="stroke-[#888] hover:stroke-black" />
          </button>
          <Question
            className="fill-[#888] hover:fill-black"
            onMouseEnter={tooltipOn}
            onMouseLeave={tooltipOff}
          />
          <ToolTip
            className="min-w-[200px] text-sub-text"
            position="bottom"
            isOn={isTooltipOn}
            x={pos.x}
            y={pos.y}
          >
            <p className="!text-wrap">
              현재 보유 조합 아이템을 6개 이상 입력하면 경우의 수가 일부
              누락되는 버그가 있습니다.
              <br />
              <br /> 6개 이상이 된다면 우선도가 높은 아이템을 미리 조합하며 6개
              미만을 유지하는 것을 권장합니다.
            </p>
          </ToolTip>
        </div>
      }
    >
      {/* 아이템  */}
      <div className="text-main-text">
        <div className="px-md text-sm">
          <p className="text-[#7a7b7d]">보유 완성 아이템</p>
          <ul className="mt-sm flex bg-[#19191b] flex-wrap gap-[10px] p-xs rounded-[4px]">
            {coreInventory.map((i, idx) => (
              <li
                onDragStart={() => handleCoreItemDrag(i)}
                onDragEnd={handleCoreItemDragEnd}
                key={idx}
                className="flex items-center cursor-pointer"
              >
                <ItemPortrait dragGuide="장착" item={i} />
              </li>
            ))}
          </ul>
        </div>

        {/* inventory */}
        <div className="w-full pt-[16px] px-[16px] text-sm">
          <div className="flex">
            <p className="text-[#7a7b7d]">보유 조합 아이템</p>
          </div>
          <div className="grid grid-cols-3 w-full mt-sm gap-[8px]">
            {COMBINATION_ITEM_LIST.map((item) => (
              <div
                key={item.name}
                className="flex w-full flex-col items-center"
              >
                <button
                  className="p-xxs bg-[#19191b] rounded-md w-full justify-center flex"
                  onClick={() => increaseItem(item.name)}
                  onContextMenu={(e) => onRightClickItemIcon(e, item.name)}
                >
                  <div className="flex gap-xs p-xxxs items-center">
                    <ItemPortrait
                      width={20}
                      height={20}
                      leftClickGuide="+"
                      rightClickGuide="-"
                      item={item}
                    />
                    <div className="text-sub-text text-sm">
                      {inventory[item.name]}
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* case list */}
        <div className="mt-sm">
          <div className="flex px-md">
            <p className="text-sm text-sub-text">경우의 수</p>

            {combinationCase.length > 1 && (
              <button
                onClick={handleCaseFold}
                className="ml-auto text-sm text-sub-text"
              >
                {foldCase ? "펼치기" : "접기"}
              </button>
            )}
          </div>
          <div className="relative mt-xs">
            <div
              className={cn(
                "flex flex-col gap-[10px]  px-[16px] pb-[16px] overflow-x-hidden overflow-y-auto",
                foldCase
                  ? "max-h-[100px]"
                  : "absolute max-h-[500px] bg-[#2B2C2F] rounded-b-md z-[1000] border-[#222] border !border-t-0 w-full"
              )}
            >
              {combinationCase[0] &&
                combinationCase[0].length > 0 &&
                combinationCase.map((c, idx) => (
                  <div key={idx}>
                    {/* <span className="text-xs text-sub-text">{idx}.</span> */}
                    <ul className="mt-xxxs flex flex-wrap w-full gap-[10px] bg-[#19191b] p-xs rounded-[4px]">
                      {c.map((i, idx) => (
                        <li key={idx} className="flex items-center">
                          <button
                            onContextMenu={(event) =>
                              handleCoreItemRightClick(event, i)
                            }
                          >
                            <ItemPortrait rightClickGuide="조합" item={i} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {/* 상징 */}
      <div>
        <div className="!pt-0 p-md ">
          <div className="mt-sm grid grid-cols-5 bg-default-bg tab:grid-cols-4 gap-[10px] p-xs max-w-[205px] rounded-[4px]">
            {EMBLEM_ITEM_LIST.map((i, idx) => (
              <ItemPortrait
                key={i.name}
                onDragStart={() => handleCoreItemDrag(i)}
                onDragEnd={handleCoreItemDragEnd}
                item={i}
                dragGuide="장착"
              />
              // <div
              //   onDragStart={() => handleCoreItemDrag(i)}
              //   onDragEnd={handleCoreItemDragEnd}
              //   key={idx}
              //   className="flex items-center cursor-pointer"
              // >
              //   <Image
              //     className="rounded-[4px]"
              //     src={`/images/emblem/${i.src}.png`}
              //     width={30}
              //     height={30}
              //     alt={i.name}
              //   />
              // </div>
            ))}
          </div>
        </div>
      </div>
    </Tab>
  );
}

export default ItemCombination;

interface ItemIconProps {
  item: CoreItem | CombinationItem;
}

function ItemIcon(props: ItemIconProps) {
  const { item } = props;
  const { src, name } = item;

  return (
    <Image
      className="rounded-[4px]"
      src={SRC_ITEM(src)}
      width={30}
      height={30}
      alt={name}
    />
  );
}
