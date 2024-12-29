import useSetDataNew, { ItemJson } from "@/hooks/useSetDataNew";
import ItemPortrait from "../portraits/ItemPortrait";
import { useDragActions } from "@/store/dragStore";

interface EmblemListProps {}

function EmblemList(props: EmblemListProps) {
  const { emblemItemDataList } = useSetDataNew();

  const { setDraggingTarget } = useDragActions();

  function handleCoreItemDrag(item: ItemJson) {
    setDraggingTarget(item);
  }

  function handleCoreItemDragEnd() {
    setDraggingTarget(null);
  }

  return (
    <div className="mt-sm grid grid-cols-5 bg-default-bg tab:grid-cols-4 gap-[10px] p-xs max-w-[205px] rounded-[4px]">
      {emblemItemDataList.map((i, idx) => (
        <ItemPortrait
          key={i.name}
          onDragStart={() => handleCoreItemDrag(i)}
          onDragEnd={handleCoreItemDragEnd}
          item={i}
          dragGuide="장착"
        />
        // <div
        //   onDragStart={() => handleCoreItemDrag(i)}
        //   onDragEnd={handleCoreItemDragEnd}
        //   key={idx}
        //   className="flex items-center cursor-pointer"
        // >
        //   <Image
        //     className="rounded-[4px]"
        //     src={`/images/emblem/${i.src}.png`}
        //     width={30}
        //     height={30}
        //     alt={i.name}
        //   />
        // </div>
      ))}
    </div>
  );
}

export default EmblemList;
