import { cn } from "@/utils";
import { HTMLAttributes, ReactNode, useState } from "react";

export function useTooltip() {
  const [isTooltipOn, setIsToolTipOn] = useState(false);

  function tooltipOn() {
    setIsToolTipOn(true);
  }
  function tooltipOff() {
    setIsToolTipOn(false);
  }

  return { isTooltipOn, tooltipOn, tooltipOff };
}
interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  isTooltipOn: boolean;
}

export function Tooltip(props: TooltipProps) {
  const { children, isTooltipOn, className } = props;

  return (
    <div
      className={cn(
        "z-[1000] transition-opacity absolute min-w-[250px] text-sm left-[100%] top-[50%] bg-white p-md shadow-md",
        className,
        isTooltipOn ? "opacity-100" : "opacity-0 hidden"
      )}
    >
      {children}
    </div>
  );
}
