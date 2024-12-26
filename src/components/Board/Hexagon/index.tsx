import { TRAINING_BOT } from "@/data/set/12/champions";

import useDragEvent from "@/hooks/useDragEvent";
import {
  useDragActions,
  useDraggingCoreItem,
  useDraggingIndexedChampion,
  useDraggingTarget,
} from "@/store/dragStore";
import { cn, extractIconSrc, generateIndexedChampion } from "@/utils";
import Image from "next/image";
import { DragEvent, MouseEvent, ReactNode } from "react";

import { SYNERGY_LIST, Synergy } from "@/data/set/12/synergy";

import ChampionTooltip from "@/components/tooltips/ChampionTooltip";
import {
  PortalTooltip,
  usePortalTooltip,
} from "@/components/tooltips/PortalTooltip";
import useSetDataNew, { ChampionJson } from "@/hooks/useSetDataNew";
import {
  useBuilderActions,
  useIndexedChampionList,
} from "@/store/BuilderStore";
import { IndexedChampion } from "..";
import BackgroundLayer from "./BackgroundLayer";
import ItemLayer from "./ItemLayer";

export type PlacedChampion = IndexedChampion | null;

interface HexagonProps {
  placedChampion: PlacedChampion;
  children?: ReactNode;
  isEvenRow: boolean;
  index: number;
}

export default function Hexagon(props: HexagonProps) {
  const { placedChampion, isEvenRow, index } = props;

  const isTrainingBot = placedChampion?.champion.name === TRAINING_BOT.name;

  const { setDraggingCoreItem, setDraggingTarget, setDraggingIndexedChampion } =
    useDragActions();

  const indexedChampionList = useIndexedChampionList();
  const { setIndexedChampionList } = useBuilderActions();

  const { SRC_CHAMPION } = useSetDataNew();

  const { tooltipContainerRef, pos, isTooltipOn, tooltipOn, tooltipOff } =
    usePortalTooltip();
  const draggingChampion = useDraggingTarget();
  const draggingIndexedChampion = useDraggingIndexedChampion();
  const draggingCoreItem = useDraggingCoreItem();

  const { isDragEnter, onDragEnter, onDragLeave, onDragOver, onDragEnd } =
    useDragEvent();

  function handleIndexItem(idx: number, item: IndexedChampion | null) {
    const cloneArray = [...indexedChampionList];
    cloneArray[idx] = item;
    setIndexedChampionList(cloneArray);
  }

  function handleDragStart() {
    tooltipOff();
    if (!placedChampion) return;

    setDraggingIndexedChampion(placedChampion);
  }

  function handleDragEnter(event: DragEvent<HTMLDivElement>) {
    onDragEnter(event);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    onDragLeave(event);
  }

  function handleDragDrop(event: DragEvent<HTMLDivElement>) {
    event.stopPropagation();
    event.preventDefault();
    onDragEnd(event);

    handleChampionDrop();
  }

  function handleDragEnd(event: MouseEvent<HTMLDivElement>) {
    setDraggingTarget(null);
    setDraggingIndexedChampion(null);
  }

  function handleItemDrop() {
    if (!draggingCoreItem) return;
    if (!placedChampion) return;
    if (placedChampion.itemList.length !== 0) {
      if (draggingCoreItem.name === "도적의 장갑") {
        alert("도적의 장갑은 단독으로만 장착 가능합니다.");
        return;
      }
    }
    if (placedChampion.itemList.some((item) => item.name === "도적의 장갑")) {
      alert("도적의 장갑은 단독으로만 장착 가능합니다.");
      return;
    }
    if (placedChampion?.itemList.length > 2) {
      alert("아이템은 최대 3개까지 장착 가능합니다.");
      return;
    }

    const cloned = structuredClone(placedChampion);

    const championWithItem = {
      ...cloned,
      itemList: [...cloned.itemList, draggingCoreItem],
    };

    //상징인 경우
    if (draggingCoreItem.name.includes("상징")) {
      const synergy = SYNERGY_LIST.find(
        (item) => item.src[0] === draggingCoreItem.src
      ) as Synergy;

      // 시너지 중복체크
      const isExist = championWithItem.champion.traits.some(
        (item) => item === synergy.name
      );
      if (isExist) {
        alert("이미 해당 특성을 가진 챔피언 입니다.");
        return;
      }

      championWithItem.champion.traits.push(synergy.name);
    }

    handleIndexItem(index, championWithItem);
  }

  function handleChampionDrop() {
    if (draggingChampion) {
      // 챔피언 리스트에서 드래그 할 경우

      const clonedChampion = structuredClone(draggingChampion);

      const indexed = generateIndexedChampion(
        clonedChampion as ChampionJson,
        index
      );

      const cloneArray = [...indexedChampionList];
      cloneArray[index] = indexed;
      setIndexedChampionList(cloneArray);
      setDraggingTarget(null);
    }

    // 이미 배치된 챔피언을 이동 시킬때
    if (draggingIndexedChampion) {
      handleIndexItem(draggingIndexedChampion.index, null);
      const newIndex = { ...draggingIndexedChampion, index };

      handleIndexItem(index, newIndex);
      setDraggingIndexedChampion(null);
    }
  }

  function onChampionRightClick(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    removeChampion();
  }

  function removeChampion() {
    handleIndexItem(index, null);
  }

  return (
    <div
      className={cn(
        "relative pc:w-[84px] ",
        "mo:w-[40px]",
        "tab:w-[60px]",
        isEvenRow && "translate-x-[55%]"
      )}
    >
      <BackgroundLayer
        isDragEnter={isDragEnter}
        placedChampion={placedChampion}
      >
        <div
          onContextMenu={onChampionRightClick}
          onDragEnter={handleDragEnter}
          onDragOver={onDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDragDrop}
          className="hexagon size-[90%] relative"
          ref={tooltipContainerRef}
        >
          {placedChampion?.champion && placedChampion && (
            <div onMouseEnter={tooltipOn} onMouseLeave={tooltipOff}>
              <PortalTooltip
                className="!translate-x-0 !p-0 !border-none !bg-[#00000000] !translate-y-[100px]"
                isOn={isTooltipOn}
                x={pos.x}
                y={pos.y}
              >
                <ChampionTooltip
                  rightClickGuide="제거"
                  dragGuide="재배치"
                  champion={placedChampion.champion}
                />
              </PortalTooltip>
              <Image
                onDragOver={onDragOver}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrop={handleItemDrop}
                width={256}
                height={128}
                src={SRC_CHAMPION(extractIconSrc(placedChampion.champion.icon))}
                alt={placedChampion.champion.name}
                className={cn(
                  "absolute center w-full h-full object-[-80px_0px]",
                  !isTrainingBot && "object-cover"
                )}
                quality={90}
              />
              <div className="absolute pointer-events-none flex flex-col bottom-[15%] text-center w-full text-main-text font-semibold text-[11px] bg-[#00000099]">
                <p className="mo:text-[8px]">{placedChampion.champion.name}</p>
              </div>
            </div>
          )}
        </div>
      </BackgroundLayer>
      <ItemLayer placedChampion={placedChampion} />
    </div>
  );
}
