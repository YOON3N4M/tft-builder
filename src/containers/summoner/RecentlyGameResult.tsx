import { ParticipanthDto } from "@/types/riot";
import { cn } from "@/utils";

interface RecentlyGameResultProps {
  searchedPayersInfoList: ParticipanthDto[] | null;
}

const colorStyles: { [key: string]: string } = {
  "1": "bg-tier-5",
  "2": "bg-tier-3",
  "3": "bg-tier-3",
  "4": "bg-tier-3",
  "5": "bg-tier-1",
  "6": "bg-tier-1",
  "7": "bg-tier-1",
  "8": "bg-tier-1",
};

function RecentlyGameResult(props: RecentlyGameResultProps) {
  const { searchedPayersInfoList } = props;

  if (!searchedPayersInfoList) return;

  return (
    <div className="border border-[#222] bg-content-bg rounded-md">
      <div className="px-sm py-xs">
        <span className="text-main-text">순위 요약</span>
      </div>
      <div className="px-sm pb-xs flex flex-wrap gap-xxs pt-xs border-t border-[#222]">
        {searchedPayersInfoList.map((match, idx) => (
          <div
            key={`${match.placement}-{idx}`}
            className={cn(
              "size-[30px] text-white rounded-md flex items-center justify-center",
              colorStyles[match.placement.toString()]
            )}
          >
            {match.placement}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentlyGameResult;
