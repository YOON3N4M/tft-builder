import Field from "@/components/Field";
import ChampionList from "@/components/overlay/ChampionList";
import ItemCombination from "@/components/overlay/ItemCombination";
import { Pawn, Reroll, Sword } from "@/components/svgs";
import { cn } from "@/utils";
import { HTMLAttributes, ReactNode, useState } from "react";

type OptionItem = "item" | "reroll" | "champion";

interface Option {
  item: boolean;
  reroll: boolean;
  champion: boolean;
}

export default function BuilderContainer() {
  const [option, setOption] = useState<Option>({
    item: false,
    reroll: false,
    champion: false,
  });

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
          <ControllerButton
            isOn={option.champion}
            fn={() => handleOption("champion")}
          >
            <Pawn />
          </ControllerButton>
          {/* 빌더 컨트롤러 */}
        </div>
        {/* 아이템 */}
        <div className="absolute right-0 flex justify-end px-xxl pt-xxl">
          <ItemCombination hidden={!option.item} />
        </div>
        <div className="absolute right-0 flex justify-end px-xxl pt-xxl">
          <ChampionList hidden={!option.champion} />
        </div>
      </div>
      {/* 영역 */}
      <div className="h-[100px] border"></div>
      {/* 배치툴 영역 */}
      <div className="relative min-h-[40%] border flex justify-center py-lg">
        <Field />
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
