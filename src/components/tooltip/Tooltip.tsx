import { cn } from "@/utils";
import { MouseEvent, ReactNode, useState } from "react";
import { createPortal } from "react-dom";

interface ToolTipProps {
  children: ReactNode;
  isOn: boolean;
  x: null | number;
  y: null | number;
}

export function ToolTip(props: ToolTipProps) {
  const { children, isOn, x, y } = props;

  if (!x && !y) return;

  return (
    <>
      {isOn &&
        createPortal(
          <div
            className="absolute z-[1500] p-md text-sm bg-white shadow-md rounded-md"
            style={{ top: y!, left: x! }}
          >
            {children}
          </div>,
          document.body
        )}
    </>
  );
}

interface Pos {
  x: number | null;
  y: number | null;
}

export function useToolTip() {
  const [isTooltipOn, setIsToolTipOn] = useState(false);
  const [pos, setPos] = useState<Pos>({ x: null, y: null });

  function tooltipOn(event: MouseEvent<any>) {
    const x = event.clientX + 10;
    const y = event.clientY + 10;

    setPos((prev) => ({ x, y }));
    setIsToolTipOn(true);
  }
  function tooltipOff() {
    setIsToolTipOn(false);
  }

  return { pos, isTooltipOn, tooltipOn, tooltipOff };
}
