import useClickOutside from "@/hooks/useOutsideEvent";
import { filterNull } from "@/utils";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";

import {
  getlocalBuildAll,
  saveBuildToLocalStorage,
} from "@/utils/localstorage";
import { IndexedChampion } from "@/store/BuilderStore";

interface BuildSaveProps {
  placedChampionList: (IndexedChampion | null)[];
  setBuildList: Dispatch<
    SetStateAction<
      | {
          buildName: string;
          build: string | null;
        }[]
      | undefined
    >
  >;
}

export default function LocalBuildSave(props: BuildSaveProps) {
  const { setBuildList, placedChampionList } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [buildName, setBuildName] = useState("");

  const ref = useClickOutside(() => {
    setIsOpen(false);
  });

  function handleChangeBuildName(event: ChangeEvent<HTMLInputElement>) {
    setBuildName(event.target.value);
  }

  function handleSaveSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (buildName === "") {
      alert("빌드 이름을 입력해주세요.");
      return;
    }

    saveBuild(`${buildName}-tft-build`, placedChampionList);
    setBuildList(getlocalBuildAll);
    setIsOpen(false);
    setBuildName("");
  }

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setIsOpen((prev) => !prev)} className="button">
        빌드 저장
      </button>
      {isOpen && (
        <div className="absolute p-md popover-box z-[2000] min-w-[200px] top-[40px]">
          <div className="flex items-center">
            <p className="text-sub-text">빌드 이름</p>
          </div>
          <div>
            <form
              onSubmit={handleSaveSubmit}
              className="flex items-center mt-xs"
            >
              <input
                value={buildName}
                onChange={handleChangeBuildName}
                className="bg-[#19191b] text-sub-text p-xxs"
              ></input>
              <button className="p-xxs bg-default-bg rounded-md ml-xxs text-sub-text hover:text-gray-600">
                저장
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function saveBuild(
  buildName: string,
  placedChampionList: (IndexedChampion | null)[]
) {
  if (placedChampionList.length === 0) {
    alert("배치된 챔피언이 없습니다.");
    return;
  }
  const filteredNull = filterNull(placedChampionList) as IndexedChampion[];

  saveBuildToLocalStorage(buildName, filteredNull);
}
