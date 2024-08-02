import { cn } from "@/utils";
import { ReactNode } from "react";

interface FieldProps {}

function Field(props: FieldProps) {
  const {} = props;

  const hexagonQty = 28;

  const tempArray = [...Array(hexagonQty)].map((_, idx) => idx);

  function isEvenRow(idx: number): boolean {
    return (idx > 6 && idx < 14) || idx > 20;
  }

  return (
    <div className="grid grid-cols-7 gap-xs w-[700px] gap-y-0 h-min translate-x-[-10%]">
      {tempArray.map((item, idx) => (
        <Hexagon key={idx} isEvenRow={isEvenRow(idx)}></Hexagon>
      ))}
    </div>
  );
}

export default Field;

interface HexagonProps {
  children?: ReactNode;
  isEvenRow: boolean;
}

function Hexagon(props: HexagonProps) {
  const { children, isEvenRow } = props;
  return (
    <div
      className={cn(
        "hexagon w-[84px] h-[96px] bg-[#d0d2d5]",
        isEvenRow && "translate-x-[55%]"
      )}
    >
      {children}
    </div>
  );
}
