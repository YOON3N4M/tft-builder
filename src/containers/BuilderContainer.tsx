import ItemCombination from "@/components/ItemCombination";
import { Reroll, Sword } from "@/components/svgs";
import { cn } from "@/utils";
import { HTMLAttributes, ReactNode, useState } from "react";

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
    <div className="w-[100vw] h-[100dvh]">
      {/* absolute 요소 컨테이너? */}
      <div className="relative">
        {/* side menu */}
        <div className="absolute z-[400]  h-[400px] w-[70px] py-md flex flex-col gap-xl">
          <ControllerButton isOn={option.item} fn={() => handleOption("item")}>
            <Sword />
          </ControllerButton>
          <ControllerButton
            isOn={option.reroll}
            fn={() => handleOption("reroll")}
          >
            <Reroll />
          </ControllerButton>
          {/* 빌더 컨트롤러 */}
        </div>
        {/* 아이템 */}
        <div className="absolute right-0 flex justify-end px-xxl pt-xxl">
          {option.item && <ItemCombination />}
        </div>
      </div>
      {/* 영역 */}
      <div className="h-[100px] border"></div>
      {/* 배치툴 영역 */}
      <div className="relative h-[40%] border flex">
        <h1 className="absolute center">배치툴 영역</h1>
      </div>
      <div></div>
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
