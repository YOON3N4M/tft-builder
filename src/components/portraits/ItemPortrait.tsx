"use client";

import { CombinationItem, CoreItem } from "@/data/item";

import { cn, extractEmblemSrc, extractIconSrc } from "@/utils";
import Image from "next/image";
import { HTMLAttributes, useState } from "react";

import { LeftClick, RightClick } from "../svgs";
import MouseGuide from "../MouseGuide";
import { SRC_ITEM } from "@/constants/src";
import { PortalTooltip, usePortalTooltip } from "../tooltips/PortalTooltip";
import useSetDataNew, { ItemJson } from "@/hooks/useSetDataNew";

interface ItemPortraitProps extends HTMLAttributes<HTMLImageElement> {
  item: ItemJson;
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

  const { name, icon, desc, effects, apiName } = item;
  const { isTooltipOn, tooltipOn, tooltipOff, tooltipContainerRef, pos } =
    usePortalTooltip();

  const { SRC_ITEM, SRC_EMBLEM } = useSetDataNew();

  const isEmblem = name.includes("상징");
  const src = isEmblem
    ? SRC_EMBLEM(extractEmblemSrc(apiName))
    : SRC_ITEM(extractIconSrc(icon));

  const dragHandlers = {
    ...(onDragStart && { onDragStart: onDragStart }),
    ...(onDragEnd && { onDragEnd: onDragEnd }),
  };

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
        src={src}
        width={width}
        height={height}
        alt={name}
      />

      <PortalTooltip
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
          {/* {effect.map((ef, idx) => (
            <p key={`${name}-effect-${idx}`} className="text-xs">
              {ef}
            </p>
          ))} */}
        </div>
        {/* click guide */}
        <div>
          <MouseGuide
            leftClickGuide={leftClickGuide}
            rightClickGuide={rightClickGuide}
            dragGuide={dragGuide}
          />
        </div>
      </PortalTooltip>
    </div>
  );
}

export default ItemPortrait;
