"use client";

import { CombinationItem, CoreItem } from "@/constants/item";
import { ITEM_ICON_URL } from "@/constants/url";
import { cn } from "@/utils";
import Image from "next/image";
import { HTMLAttributes, useState } from "react";
import { useToolTip } from "./tooltips/ToolTip";

interface ItemPortraitProps extends HTMLAttributes<HTMLImageElement> {
  item: CoreItem | CombinationItem;
  width?: number;
  height?: number;
  noTooltip?: boolean;
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
  } = props;
  const { name, src, desc, effect } = item as CoreItem;

  const isEmblem = name.includes("상징");

  const dragHandlers = {
    ...(onDragStart && { onDragStart: onDragStart }),
    ...(onDragEnd && { onDragEnd: onDragEnd }),
  };

  const { isTooltipOn, tooltipOn, tooltipOff } = useToolTip();

  return (
    <div
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
      {isTooltipOn && (
        <div
          className={cn(
            "text-sm block text-start absolute min-w-[180px] border bg-white rounded-md shadow-md z-[9500] px-sm py-sm",
            noTooltip && "hidden"
          )}
        >
          <p className="font-semibold">{name}</p>
          {desc && (
            <p className="mt-sm text-gray-500 whitespace-pre-line">{desc}</p>
          )}
          <div className="mt-sm text-gray-500">
            {effect.map((ef, idx) => (
              <p key={`${name}-effect-${idx}`} className="text-xs">
                {ef}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemPortrait;
