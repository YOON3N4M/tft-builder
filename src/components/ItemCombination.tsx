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
import { calculateAllCombinationCase } from "@/utils";
import Image from "next/image";

import { useEffect, useState } from "react";

interface ItemCombinationProps {}

function ItemCombination(props: ItemCombinationProps) {
  const [inventory, setInventory] = useState({
    [BF_SWRORD.name]: 0,
    [RECURVE_BOW.name]: 0,
    [CHAIN_VEST.name]: 0,
    [NEGATRON_CLOAK.name]: 0,
    [NEEDLESSLY_LARGE_ROD.name]: 0,
    [TEAR_OF_THE_GADDESS.name]: 0,
    [GIANTS_BELT.name]: 0,
    [SPARRINGS_GLOVES.name]: 0,
    [SPATULA.name]: 0,
  });

  const [combinationCase, setCombinationCase] = useState<CoreItem[][]>([]);

  const {} = props;

  function addItem(itemName: string) {
    setInventory((prev) => ({
      ...prev,
      [itemName]: prev[itemName] + 1,
    }));
  }

  useEffect(() => {
    const result = calculateAllCombinationCase(inventory);
    setCombinationCase(result);

    console.log("아이템 변동");
  }, [inventory]);

  return (
    <div className="min-w-[200px] flex flex-col border p-[16px]">
      {/* inventory */}
      <div className="flex flex-wrap gap-[8px] max-w-[200px] mx-auto">
        {COMBINATION_ITEM_LIST.map((item) => (
          <div key={item.name} className="flex flex-col items-center">
            <button onClick={() => addItem(item.name)}>
              <ItemIcon src={item.src} alt={item.name} />
            </button>
            <span>{inventory[item.name]}</span>
          </div>
        ))}
      </div>
      <div className="my-[30px] w-full border-t border-t-gray-500" />
      {/* case list */}
      <div className="flex flex-col gap-[10px]">
        {combinationCase.map((c, idx) => (
          <div key={idx} className="flex gap-[10px]">
            {c.map((i, idx) => (
              <span key={idx}>
                {" "}
                <ItemIcon src={i.src} alt={i.name} />
              </span>
            ))}
          </div>
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
