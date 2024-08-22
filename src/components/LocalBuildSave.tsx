import useClickOutside from "@/hooks/useOutsideEvent";
import { ChangeEvent, FormEvent, useState } from "react";

interface BuildSaveProps {
  saveFn: (buildName: string) => void;
}

export default function LocalBuildSave(props: BuildSaveProps) {
  const { saveFn } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [buildName, setBuildName] = useState("");

  const ref = useClickOutside(() => {
    setIsOpen(false);
  });

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setBuildName(event.target.value);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (buildName === "") {
      alert("빌드 이름을 입력해주세요.");
      return;
    }
    saveFn(`${buildName}-tft-build`);
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
            <p className="text-[#888]">빌드 이름</p>
          </div>
          <div>
            <form onSubmit={onSubmit} className="flex items-center mt-xs">
              <input
                value={buildName}
                onChange={onChange}
                className="bg-[#19191b] text-[#888] p-xxs"
              ></input>
              <button className="p-xxs bg-default-bg rounded-md ml-xxs text-[#888] hover:text-gray-600">
                저장
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
