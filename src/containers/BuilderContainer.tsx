import ItemCombination from "@/components/ItemCombination";
import { cn } from "@/utils";
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
        <ControllerButton isOn={option.item} fn={() => handleOption("item")}>
          아이템
        </ControllerButton>
        {/* 빌더 컨트롤러 */}
      </div>
      <div className="flex justify-end px-xxl">
        {option.item && <ItemCombination />}
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
        "w-full mx-auto px-md py-xl rounded-tr-[4px] rounded-br-[4px] bg-white border !border-l-0",
        className,
        isOn ? "drop-shadow-2xl font-bold" : "bg-white shadow-sm"
      )}
    >
      {children && children}
    </button>
  );
}
