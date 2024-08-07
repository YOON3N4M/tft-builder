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
import { Reset, WindowMaxi, WindowMini } from "../svgs";
import { Overlay, OverlayProps, OverlayTab } from "./Overlay";

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
  const [foldCase, setFoldCase] = useState(false);

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

  useEffect(() => {
    const result = calculateAllCombinationCase(inventory);
    setCombinationCase(result);

    console.log("아이템 변동");
  }, [inventory]);

  return (
    <Overlay className="!z-[600]" hidden={hidden}>
      <OverlayTab className="flex justify-end gap-sm text-sm">
        <button onClick={resetInventory}>
          <Reset />
        </button>

        {/* 팁 호버 버튼 같은거 추가해서 도움말을 넣으면 좋을듯 */}
      </OverlayTab>

      <div className="px-md text-sm">
        <p>보유 완성 아이템</p>
        <ul className="mt-sm flex flex-wrap gap-[10px] bg-[#f0f2f5] p-xs rounded-[4px]">
          {coreInventory.map((i, idx) => (
            <li key={idx} className="flex items-center">
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
        <ul className="flex mt-sm gap-[8px]">
          {COMBINATION_ITEM_LIST.map((item) => (
            <li key={item.name} className="flex flex-col items-center">
              <button
                onClick={() => increaseItem(item.name)}
                onContextMenu={(e) => onRightClickItemIcon(e, item.name)}
              >
                <ItemIcon item={item} />
              </button>
              <span className="text-gray-500 mt-xxs text-sm">
                {inventory[item.name]}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* case list */}
      <div
        className={cn(
          "flex flex-col gap-[10px] max-h-[50vh] overflow-y-auto px-[16px] pb-[16px] mt-lg ",
          foldCase && "h-0 !p-0"
        )}
      >
        {combinationCase.map((c, idx) => (
          <ul
            key={idx}
            className="flex gap-[10px] bg-[#f0f2f5] p-xs rounded-[4px]"
          >
            {c.map((i, idx) => (
              <li key={idx} className="flex items-center">
                <button
                  onContextMenu={(event) => handleCoreItemRightClick(event, i)}
                >
                  <ItemIcon item={i} />
                </button>
              </li>
            ))}
          </ul>
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
