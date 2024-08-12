"use client";

import {
  BF_SWRORD,
  CHAIN_VEST,
  COMBINATION_ITEM_LIST,
  CombinationItem,
  CoreItem,
  GIANTS_BELT,
  NEEDLESSLY_LARGE_ROD,
  NEGATRON_CLOAK,
  RECURVE_BOW,
  SPARRINGS_GLOVES,
  SPATULA,
  TEAR_OF_THE_GADDESS,
} from "@/constants/item";
import { ITEM_ICON_URL } from "@/constants/url";
import { cn } from "@/utils";
import { calculateAllCombinationCase } from "@/utils/item";
import Image from "next/image";

import { MouseEvent, useEffect, useState } from "react";
import { Question, Reset, WindowMaxi, WindowMini } from "../svgs";
import { Overlay, OverlayProps, OverlayTab } from "./Overlay";
import { Tooltip, useTooltip } from "../tooltip/Tooltip";
import { useDragActions } from "@/store/dragStore";

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
  const { isTooltipOn, tooltipOff, tooltipOn } = useTooltip();
  const [coreInventory, setCoreInventory] = useState<CoreItem[]>([]);
  const [inventory, setInventory] = useState(initialInventory);

  const [combinationCase, setCombinationCase] = useState<CoreItem[][]>([]);
  const [foldCase, setFoldCase] = useState(false);

  const { setDraggingCoreItem } = useDragActions();

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
    //  console.log(result);
  }

  function handleCoreItemDrag(coreItem: CoreItem) {
    setDraggingCoreItem(coreItem);
  }

  function handleCoreItemDragEnd() {
    console.log("드래그 끝");
    setDraggingCoreItem(null);
  }

  useEffect(() => {
    const result = calculateAllCombinationCase(inventory);
    setCombinationCase(result);
    //console.log(result);

    //console.log("아이템 변동");
  }, [inventory]);

  return (
    <Overlay className="!z-[600]" hidden={hidden}>
      <OverlayTab className="flex justify-end gap-sm text-sm">
        <button onClick={resetInventory}>
          <Reset />
        </button>
        <div className="relative">
          <Question
            onMouseEnter={tooltipOn}
            onMouseLeave={tooltipOff}
            className="cursor-pointer"
          />
          <Tooltip isTooltipOn={isTooltipOn}>
            조합 이아템 개수를 입력하면 조합 가능한 완성 아이템 경우의 수를
            제공합니다.
          </Tooltip>
        </div>
        {/* 팁 호버 버튼 같은거 추가해서 도움말을 넣으면 좋을듯 */}
      </OverlayTab>

      <div className="px-md text-sm">
        <p>보유 완성 아이템</p>
        <ul className="mt-sm flex w-[210px] max-w-[210px] flex-wrap gap-[10px] bg-[#f0f2f5] p-xs rounded-[4px]">
          {coreInventory.map((i, idx) => (
            <li
              onDragStart={() => handleCoreItemDrag(i)}
              onDragEnd={handleCoreItemDragEnd}
              key={idx}
              className="flex items-center cursor-pointer"
            >
              <ItemIcon item={i} />
            </li>
          ))}
        </ul>
      </div>

      {/* inventory */}
      <div className="pt-[16px] px-[16px] text-sm">
        <div className="flex">
          <p>보유 조합 아이템</p>
          <button className="ml-auto" onClick={handleCaseFold}>
            {foldCase ? <WindowMaxi /> : <WindowMini />}
          </button>
        </div>
        <div className="grid w-[210px] max-w-[210px] grid-cols-3 mt-sm gap-[8px] flex-wrap">
          {COMBINATION_ITEM_LIST.map((item) => (
            <div key={item.name} className="flex flex-col items-center">
              <button
                className="p-xxs bg-default-bg rounded-md"
                onClick={() => increaseItem(item.name)}
                onContextMenu={(e) => onRightClickItemIcon(e, item.name)}
              >
                <div className="flex gap-xs p-xxxs">
                  <ItemIcon item={item} />
                  <div className="text-gray-500 mt-xxs text-sm">
                    {inventory[item.name]}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* case list */}
      <div
        className={cn(
          "flex flex-col gap-[10px] max-h-[50vh] overflow-y-auto px-[16px] pb-[16px] mt-lg ",
          foldCase && "h-0 !p-0"
        )}
      >
        {combinationCase[0] &&
          combinationCase[0].length > 0 &&
          combinationCase.map((c, idx) => (
            <div key={idx}>
              <span className="text-xs text-gray-500">{idx}.</span>
              <ul className="mt-xxxs flex flex-wrap w-[210px] max-w-[210px] gap-[10px] bg-[#f0f2f5] p-xs rounded-[4px]">
                {c.map((i, idx) => (
                  <li key={idx} className="flex items-center">
                    <button
                      onContextMenu={(event) =>
                        handleCoreItemRightClick(event, i)
                      }
                    >
                      <ItemIcon item={i} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </Overlay>
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
      src={ITEM_ICON_URL(src)}
      width={30}
      height={30}
      alt={name}
    />
  );
}
