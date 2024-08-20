import { HTMLAttributes } from "react";
import { LeftClick, RightClick } from "./svgs";
import { cn } from "@/utils";

export interface MouseGuideProps extends HTMLAttributes<HTMLDivElement> {
  leftClickGuide?: string;
  rightClickGuide?: string;
  dragGuide?: string;
}

function MouseGuide(props: MouseGuideProps) {
  const { leftClickGuide, rightClickGuide, dragGuide, className } = props;

  console.log(dragGuide);

  return (
    <>
      {(dragGuide || leftClickGuide || rightClickGuide) && (
        <div
          className={cn(
            "flex text-[12px] mt-sm gap-sm items-center text-gray-500",
            className
          )}
        >
          {leftClickGuide && (
            <div className="flex gap-xxxs items-center">
              <LeftClick className="fill-gray-500" />
              <span> : {leftClickGuide}</span>
            </div>
          )}
          {rightClickGuide && (
            <div className="flex gap-xxxs items-center">
              <RightClick className="fill-gray-500" />
              <span> : {rightClickGuide}</span>
            </div>
          )}
          {dragGuide && (
            <div className="flex gap-xxxs items-center">
              <span>드래그</span>
              <span> : {dragGuide}</span>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default MouseGuide;
