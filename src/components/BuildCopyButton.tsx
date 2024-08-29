"use client";

import { copyBuild } from "@/utils/localstorage";
import { Clipboard } from "./svgs";
import { PortalTooltip, usePortalTooltip } from "./tooltips/PortalTooltip";

interface BuildCopyButtonProps {
  url: string;
  isTooltip?: boolean;
}

function BuildCopyButton(props: BuildCopyButtonProps) {
  const { url, isTooltip = false } = props;

  const { isTooltipOn, tooltipOff, tooltipOn, tooltipContainerRef, pos } =
    usePortalTooltip();

  return (
    <div className="relative" ref={tooltipContainerRef}>
      <button
        onMouseEnter={tooltipOn}
        onMouseLeave={tooltipOff}
        onClick={() => copyBuild(url)}
      >
        <Clipboard />
      </button>
      <PortalTooltip position="bottom" x={pos.x} y={pos.y} isOn={isTooltipOn}>
        <p>챔피언의 배치 위치는 복사되지 않으므로 재배치가 필요합니다.</p>
      </PortalTooltip>
    </div>
  );
}

export default BuildCopyButton;
