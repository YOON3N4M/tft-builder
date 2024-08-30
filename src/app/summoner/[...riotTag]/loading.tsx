function loading() {
  return (
    <div className="text-sub-text inner !mt-lg bg-sub-bg text-sm">
      <div className="flex w-full py-lg pc:gap-lg tab:flex-col mo:flex-col">
        {/* 소화 */}
        <div className="basis-1/5">
          {/* 컴포분리 소환사 정보? */}
          <div className="w-full h-[233px] bg-content-bg border-[#222] border flex flex-col !py-lg rounded-md items-center">
            <div className="rounded-full size-[64px] overflow-hidden border-tier-5 border-2"></div>
            <p className="text-xl mt-md">
              <span className="text-main-text font-semibold">-</span>
            </p>
          </div>
          {/* 소환사 정보 끗 */}
          {/* 퍼포먼스 요약 */}
        </div>
        {/* 종합 성적 */}
        <div className="bg-content-bg border-[#222] border flex-grow rounded-md">
          <div className="px-sm py-xs border-[#222] text-main-text border-b-[1px] text-xs font-semibold">
            10게임 종합
          </div>
          <div className="py-xs px-sm flex gap-xxs">
            <div className="flex-1 bg-default-bg py-xxxl flex flex-col items-center justify-end gap-sm"></div>
            <div className="flex-1 bg-default-bg py-xxxl flex flex-col items-center justify-end gap-sm"></div>
            <div className="flex-1 bg-default-bg py-xxxl flex flex-col items-center justify-end gap-sm"></div>
            <div className="flex-1 bg-default-bg py-xxxl flex flex-col items-center justify-end gap-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default loading;
