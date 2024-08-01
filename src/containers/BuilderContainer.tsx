import ItemCombination from "@/components/ItemCombination";
import React, { HTMLAttributes, ReactNode, useState } from "react";

type OptionItem = "item" | "reroll";

interface Option {
  item: boolean;
  reroll: boolean;
}

export default function BuilderContainer() {
  const [option, setOption] = useState<Option>({ item: false, reroll: false });

  function handleOption(optionItem: OptionItem) {
    console.log(option);
    setOption((prev) => ({ ...prev, [optionItem]: !prev[optionItem] }));
  }

  return (
    <div>
      <div className="absolute h-[400px] w-[100px] py-md flex flex-col">
        <ControllerButton fn={() => handleOption("item")}>
          아이템
        </ControllerButton>
        {/* 빌더 컨트롤러 */}
      </div>
      <div className="flex">{option.item && <ItemCombination />}</div>
    </div>
  );
}

interface ControllerButtionProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  fn: (optionItem: OptionItem) => void;
}

function ControllerButton(props: ControllerButtionProps) {
  const { children, fn } = props;
  return (
    <button
      onClick={() => fn("item")}
      className="w-full mx-auto px-md bg-white"
    >
      {children && children}
    </button>
  );
}
