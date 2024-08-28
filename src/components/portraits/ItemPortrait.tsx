"use client";

import { CombinationItem, CoreItem } from "@/data/item";
import { ITEM_ICON_URL } from "@/constants/url";
import { cn } from "@/utils";
import Image from "next/image";
import { HTMLAttributes, useState } from "react";
import { ToolTip, useToolTip } from "../tooltips/ToolTip";
import { LeftClick, RightClick } from "../svgs";
import MouseGuide from "../MouseGuide";

interface ItemPortraitProps extends HTMLAttributes<HTMLImageElement> {
  item: CoreItem | CombinationItem;
  width?: number;
  height?: number;
  noTooltip?: boolean;
  rightClickGuide?: string;
  leftClickGuide?: string;
  dragGuide?: string;
}

function ItemPortrait(props: ItemPortraitProps) {
  const {
    item,
    className,
    onDragStart,
    onDragEnd,
    width = 30,
    height = 30,
    noTooltip = false,
    onContextMenu,
    rightClickGuide,
    leftClickGuide,
    dragGuide,
  } = props;

  const { name, src, desc, effect } = item as CoreItem;

  const isEmblem = name.includes("상징");

  const dragHandlers = {
    ...(onDragStart && { onDragStart: onDragStart }),
    ...(onDragEnd && { onDragEnd: onDragEnd }),
  };

  const { isTooltipOn, tooltipOn, tooltipOff, tooltipContainerRef, pos } =
    useToolTip();

  return (
    <div
      ref={tooltipContainerRef}
      onContextMenu={onContextMenu}
      onMouseEnter={tooltipOn}
      onMouseLeave={tooltipOff}
      {...dragHandlers}
    >
      <Image
        className={cn("rounded-md cursor-pointer", className)}
        src={isEmblem ? `/images/emblem/${src}.png` : ITEM_ICON_URL(src)}
        width={width}
        height={height}
        alt={name}
      />

      <ToolTip
        position="bottom"
        className="!bg-none"
        x={pos.x}
        y={pos.y}
        isOn={isTooltipOn}
      >
        <p className="font-semibold text-main-text">{name}</p>
        {desc && (
          <p className="mt-sm text-sub-text whitespace-pre-line">{desc}</p>
        )}
        <div className="mt-sm text-sub-text">
          {effect.map((ef, idx) => (
            <p key={`${name}-effect-${idx}`} className="text-xs">
              {ef}
            </p>
          ))}
        </div>
        {/* click guide */}
        <div>
          <MouseGuide
            leftClickGuide={leftClickGuide}
            rightClickGuide={rightClickGuide}
            dragGuide={dragGuide}
          />
        </div>
      </ToolTip>
    </div>
  );
}

export default ItemPortrait;
