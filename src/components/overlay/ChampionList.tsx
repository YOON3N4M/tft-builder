import Overlay, { OverlayProps } from "./Overlay";

interface ChampionListProps extends OverlayProps {}

function ChampionList(props: ChampionListProps) {
  const { hidden } = props;

  const tempArray = [...Array(30)].map((_, idx) => idx);

  return (
    <Overlay className="w-[350px]" hidden={hidden}>
      <div className="grid grid-cols-5 gap-sm">
        {tempArray.map((champion, idx) => (
          <div key={idx} className="size-[50px] bg-black"></div>
        ))}
      </div>
    </Overlay>
  );
}

export default ChampionList;
