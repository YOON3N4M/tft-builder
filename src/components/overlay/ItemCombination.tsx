"use client";

import {
  BF_SWRORD,
  CHAIN_VEST,
  COMBINATION_ITEM_LIST,
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
import { useDrag } from "react-use-gesture";
import { Reset, WindowMaxi, WindowMini } from "../svgs";

interface ItemCombinationProps {}

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
  const [inventory, setInventory] = useState(initialInventory);

  const [combinationCase, setCombinationCase] = useState<CoreItem[][]>([]);
  const [foldCase, setFoldCase] = useState(false);

  const {} = props;

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const bindPos = useDrag((params) => {
    setPos({
      x: params.offset[0],
      y: params.offset[1],
    });
  });

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
    setInventory(initialInventory);
  }

  function handleCaseFold() {
    setFoldCase((prev) => !prev);
  }

  useEffect(() => {
    const result = calculateAllCombinationCase(inventory);
    setCombinationCase(result);

    console.log("아이템 변동");
  }, [inventory]);

  return (
    <div
      {...bindPos()}
      style={{ top: pos.y, left: pos.x }}
      className="cursor-pointer z-overlay relative min-w-[200px] flex flex-col border bg-white shadow-sm rounded-[4px]"
    >
      <div className="pt-md px-md flex justify-end gap-sm text-sm">
        <button onClick={resetInventory}>
          <Reset />
        </button>
        <button onClick={handleCaseFold}>
          {foldCase ? <WindowMaxi /> : <WindowMini />}
        </button>
        {/* 팁 호버 버튼 같은거 추가해서 도움말을 넣으면 좋을듯 */}
      </div>
      {/* inventory */}
      <ul className="flex gap-[8px] pt-[16px] px-[16px] justify-center">
        {COMBINATION_ITEM_LIST.map((item) => (
          <li key={item.name} className="flex flex-col items-center">
            <button
              onClick={() => increaseItem(item.name)}
              onContextMenu={(e) => onRightClickItemIcon(e, item.name)}
            >
              <ItemIcon src={item.src} alt={item.name} />
            </button>
            <span className="text-gray-500 mt-xxs text-sm">
              {inventory[item.name]}
            </span>
          </li>
        ))}
      </ul>
      {/* <div className="my-[30px] w-full border-t border-t-gray-500" /> */}
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
              <li key={idx}>
                {" "}
                <ItemIcon src={i.src} alt={i.name} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default ItemCombination;

interface ItemIconProps {
  src: string;
  alt: string;
}

function ItemIcon(props: ItemIconProps) {
  const { src, alt } = props;

  return (
    <Image
      className="rounded-[4px]"
      src={ITEM_ICON_URL(src)}
      width={30}
      height={30}
      alt={alt}
    />
  );
}
