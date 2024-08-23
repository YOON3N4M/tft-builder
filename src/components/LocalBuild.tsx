import useClickOutside from "@/hooks/useOutsideEvent";
import { cn, copyClipboard } from "@/utils";
import {
  getlocalBuildAll,
  localStorageDelete,
  unOptimizedBuild,
} from "@/utils/localstorage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Clipboard, LoadIcon, Trash } from "./svgs";
import ChampionPortrait from "./ChampionPortrait";
import { TRAINING_BOT } from "@/data/champions";

interface LocalBuildProps {
  buildList:
    | {
        buildName: string;
        build: string | null;
      }[]
    | undefined;
  setBuildList: any;
}

export default function LocalBuild(props: LocalBuildProps) {
  const { buildList, setBuildList } = props;

  const [isOpen, setIsOpen] = useState(false);

  const ref = useClickOutside(() => {
    setIsOpen(false);
  });

  const router = useRouter();

  const unOptimized = buildList?.map((build) => ({
    buildName: build.buildName,
    build: unOptimizedBuild(build.build!),
  }));

  function handleOpen() {
    setIsOpen((prev) => !prev);
  }

  function loadBuild(key: string) {
    const build = buildList?.find((item) => item.buildName === `${key}`);
    router.push(`?field=${build?.build}`);
  }

  function deleteBuild(key: string) {
    if (!confirm("빌드를 삭제합니다.")) return;
    localStorageDelete(key);
    setBuildList(getlocalBuildAll);
  }

  function copyBuildUrl(key: string) {
    const build = buildList?.find((item) => item.buildName === `${key}`);
    const baseUrl = "https://tft-build-simulator.vercel.app/builder/";
    const resultUrl = `${baseUrl}?field=${build?.build}`;

    copyClipboard(resultUrl);
    alert("클립보드에 링크가 복사되었습니다.");
  }

  return (
    <div className="relative">
      <button onClick={handleOpen} className="button">
        내 빌드
      </button>
      {isOpen && (
        <div
          ref={ref}
          className="absolute popover-box z-[2000] top-[40px] p-md"
        >
          <div className="max-h-[460px] overflow-auto flex flex-col gap-sm  min-w-[200px] ">
            {unOptimized?.map((build) => (
              <div
                key={build.buildName}
                className="p-xs text-sub-text rounded-md"
              >
                <div className="flex items-center">
                  <span>{build.buildName.replace("-tft-build", "")}</span>
                  <div className="flex ml-auto gap-xs">
                    <button onClick={() => loadBuild(build.buildName)}>
                      <LoadIcon className="fill-[#888]" />
                    </button>
                    <button
                      onClick={() => copyBuildUrl(build.buildName)}
                      className="cursor-pointer"
                    >
                      <Clipboard className="fill-[#888]" />
                    </button>
                    <button
                      onClick={() => deleteBuild(build.buildName)}
                      className="cursor-pointer"
                    >
                      <Trash className="fill-[#888]" />
                    </button>
                  </div>
                </div>
                <div className="flex gap-xxs mt-xxs bg-[#19191b] p-xs rounded-md">
                  {build.build?.map((indexed) => (
                    <ChampionPortrait
                      key={indexed.champion.name}
                      champion={indexed.champion}
                      className={cn("size-[40px]")}
                      objectPosition={
                        indexed.champion.name !== TRAINING_BOT.name
                          ? "object-[-35px_0px]"
                          : ""
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
            {buildList?.length === 0 && (
              <p className="text-sm bg-[#19191b] text-sub-text p-md rounded-md">
                저장된 빌드가 없습니다.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
