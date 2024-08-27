"use client";

import { copyBuild } from "@/utils/localstorage";
import { Clipboard } from "./svgs";
import { ToolTip, useToolTip } from "./tooltips/ToolTip";

interface BuildCopyButtonProps {
  url: string;
  isTooltip?: boolean;
}

function BuildCopyButton(props: BuildCopyButtonProps) {
  const { url, isTooltip = false } = props;

  const { isTooltipOn, tooltipOff, tooltipOn, tooltipContainerRef, pos } =
    useToolTip();

  return (
    <div className="relative" ref={tooltipContainerRef}>
      <button
        onMouseEnter={tooltipOn}
        onMouseLeave={tooltipOff}
        onClick={() => copyBuild(url)}
      >
        <Clipboard />
      </button>
      <ToolTip position="bottom" x={pos.x} y={pos.y} isOn={isTooltipOn}>
        <p>챔피언의 배치 위치는 복사되지 않으므로 재배치가 필요합니다.</p>
      </ToolTip>
    </div>
  );
}

export default BuildCopyButton;
