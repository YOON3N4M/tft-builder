import Field from "@/components/field/Field";
import ChampionList from "@/components/overlay/ChampionList";
import ItemCombination from "@/components/overlay/ItemCombination";
import RerollPercentage from "@/components/overlay/RerollPercentage";
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
    item: true,
    reroll: true,
    champion: true,
  });

  function handleOption(optionItem: OptionItem) {
    console.log(option);
    setOption((prev) => ({ ...prev, [optionItem]: !prev[optionItem] }));
  }

  return (
    <div>
      <div className="relative">
        {/* 상단영역 */}
        <div className="border-y h-[100px]">
          <div className="absolute right-0 flex justify-end px-xxl pt-xxl"></div>
          {/* side menu */}
          {/* <div className="absolute z-[400]  h-[400px] w-[70px] py-md flex flex-col gap-xl">
            <ControllerButton
              isOn={option.item}
              fn={() => handleOption("item")}
            >
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
          
          </div> */}
        </div>
        {/* 중앙 영역 */}
        <div className="border-y flex inner">
          <Field />
          <div className="basis-[10%]">
            <div className="absolute">
              <ItemCombination hidden={!option.item} />
            </div>
          </div>
        </div>
        {/* 하단 영역 */}
        <div className="border flex inner">
          <div className="flex">
            <ChampionList hidden={!option.champion} />
          </div>
          <div className="flex self-start flex-grow">
            <RerollPercentage hidden={!option.reroll} />
          </div>
        </div>
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
        "w-full mx-auto px-md py-xl rounded-tr-[4px] rounded-br-[4px] bg-white border flex justify-center !border-l-0",
        className,
        isOn ? "drop-shadow-2xl font-bold" : "bg-white shadow-sm"
      )}
    >
      {children && children}
    </button>
  );
}
