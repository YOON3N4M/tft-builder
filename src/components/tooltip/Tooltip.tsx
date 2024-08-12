import { cn } from "@/utils";
import { HTMLAttributes, MouseEvent, ReactNode, useState } from "react";
import { createPortal } from "react-dom";

interface ToolTipProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isOn: boolean;
  x: null | number;
  y: null | number;
}

export function ToolTip(props: ToolTipProps) {
  const { children, isOn, x, y, className } = props;

  if (!x && !y) return;

  return (
    <>
      {isOn &&
        createPortal(
          <div
            className={cn(
              "absolute z-[1500] p-md text-sm bg-white shadow-md rounded-md",
              className
            )}
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
    const x = event.pageX + 50;
    const y = event.pageY - 100;

    setPos((prev) => ({ x, y }));
    setIsToolTipOn(true);
  }
  function tooltipOff() {
    setIsToolTipOn(false);
  }

  return { pos, isTooltipOn, tooltipOn, tooltipOff };
}
