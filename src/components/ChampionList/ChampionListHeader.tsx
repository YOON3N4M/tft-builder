import { cn } from "@/utils";
import { ChangeEvent, Dispatch, HTMLAttributes, SetStateAction } from "react";
import { SortType } from ".";
import { OverlayTab } from "../overlay/Overlay";

interface ChampionListHeaderProps {
  sort: SortType;
  keyword: string;
  setSort: Dispatch<SetStateAction<SortType>>;
  setKeyword: Dispatch<SetStateAction<string>>;
}

function ChampionListHeader(props: ChampionListHeaderProps) {
  const { sort, keyword, setSort, setKeyword } = props;

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  return (
    <OverlayTab className="flex !px-md gap-sm">
      <SortButton
        isActive={sort === "tier"}
        sortType="tier"
        handleOnClick={() => setSort("tier")}
      >
        등급순
      </SortButton>
      <SortButton
        isActive={sort === "korean"}
        sortType="korean"
        handleOnClick={() => setSort("korean")}
      >
        가나다순
      </SortButton>
      <input
        onChange={handleKeywordChange}
        placeholder="챔피언, 특성..."
        className="bg-default-bg text-sub-text bg-inherit text-sm ml-auto border border-[#888] rounded-md pt-xxxs px-xxs"
        value={keyword}
      ></input>
    </OverlayTab>
  );
}

export default ChampionListHeader;

interface SortButtonProps extends HTMLAttributes<HTMLButtonElement> {
  sortType: SortType;
  isActive: boolean;
  handleOnClick: (sortType: SortType) => void;
}

function SortButton(props: SortButtonProps) {
  const { sortType, handleOnClick, children, className, isActive } = props;

  return (
    <button
      className={cn(
        className,
        "text-sm button",
        isActive && "font-semibold button-active"
      )}
      onClick={() => handleOnClick(sortType)}
    >
      {children}
    </button>
  );
}
