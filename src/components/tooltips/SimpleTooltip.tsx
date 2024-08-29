import { cn } from "@/utils";
import { HTMLAttributes, ReactNode } from "react";

interface SimpleTooltipProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  children: ReactNode;
  position?: "top" | "bottom";
  align?: "left" | "center" | "right";
}

const positionStyles = {
  top: "",
  bottom: "top-full translate-y-[10px]",
};

const alignStyles = {
  left: "left-0",
  center: "x-center",
  right: "right-0",
};

function SimpleTooltip(props: SimpleTooltipProps) {
  const {
    isOpen,
    children,
    position = "bottom",
    align = "center",
    className,
  } = props;

  return (
    <div
      className={cn(
        "absolute p-sm bg-black rounded-md text-sm z-[2500]",
        className,
        positionStyles[position],
        alignStyles[align],
        !isOpen && "hidden"
      )}
    >
      {children}
    </div>
  );
}

export default SimpleTooltip;
