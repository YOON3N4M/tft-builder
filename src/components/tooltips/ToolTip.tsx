import { cn } from "@/utils";
import {
  HTMLAttributes,
  LegacyRef,
  MouseEvent,
  ReactNode,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

interface ToolTipProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isOn: boolean;
  x: null | number;
  y: null | number;
  position?: "top" | "right";
}

const toolTipPositionStyles = {
  top: "translate-y-[-120%]",
  right: "translate-x-[50%] translate-y-[15%]",
};

export function ToolTip(props: ToolTipProps) {
  const { children, isOn, x, y, className, position = "top" } = props;

  if (!x && !y) return;

  return (
    <>
      {isOn &&
        createPortal(
          <div
            className={cn(
              "absolute z-[1500] p-md text-sm bg-white shadow-md rounded-md",
              className,
              toolTipPositionStyles[position]
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

  //relative가 적용될 컨테이너에 ref 할당
  const tooltipContainerRef = useRef<HTMLDivElement>(null);

  function tooltipOn(event: MouseEvent<any>) {
    if (!tooltipContainerRef.current) return;
    console.log("hover");
    setIsToolTipOn(true);

    const rect = tooltipContainerRef.current.getBoundingClientRect();

    const absoluteTop = rect.top + window.scrollY;
    const absoluteLeft = rect.left + window.scrollX;

    setPos((prev) => ({ x: absoluteLeft, y: absoluteTop }));
  }
  function tooltipOff() {
    setIsToolTipOn(false);
  }

  return {
    pos,

    isTooltipOn,
    tooltipOn,
    tooltipOff,
    tooltipContainerRef,
  };
}
