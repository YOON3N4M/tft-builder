import { cn } from "@/utils";
import { HTMLAttributes, MouseEvent, ReactNode, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ToolTipProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isOn: boolean;
  x: null | number;
  y: null | number;
  position?: "top" | "right" | "bottom";
}

const toolTipPositionStyles = {
  top: "translate-y-[-120%]",
  right: "translate-x-[50%] translate-y-[15%]",
  bottom: "translate-y-[40px] translate-x-[-50%]",
};

/**
 * 일반적인 absolute 툴팁으로 표현에 장애가 있는 상황에
 *
 * 쓰이는 Portal 형식의 툴팁
 */

export function PortalTooltip(props: ToolTipProps) {
  const { children, isOn, x, y, className, position = "top" } = props;

  if (!x && !y) return;

  return (
    <>
      {isOn &&
        createPortal(
          <div
            className={cn(
              "absolute z-[1500] p-md text-sm popover-box",
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

export function usePortalTooltip() {
  const [isTooltipOn, setIsToolTipOn] = useState(false);
  const [pos, setPos] = useState<Pos>({ x: null, y: null });

  //relative가 적용될 컨테이너에 ref 할당
  const tooltipContainerRef = useRef<HTMLDivElement>(null);

  function tooltipOn(event: MouseEvent<any>) {
    if (!tooltipContainerRef.current) return;

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
