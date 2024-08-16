import useTabs from "@/hooks/useTabs";
import { cn } from "@/utils";
import React, { HTMLAttributes, ReactNode } from "react";

interface TabProps extends HTMLAttributes<HTMLDivElement> {
  tabs: string[];
  tabRightContents?: ReactNode;
  children: ReactNode;
}

function Tab(props: TabProps) {
  const { tabs, children, className, tabRightContents } = props;

  const { activeIndex, isActiveIndex, handleTabsClick } = useTabs();

  return (
    <>
      <div className={cn("flex px-md", className)}>
        <div className="flex gap-sm text-sm">
          {tabs.map((tab, idx) => (
            <button key={idx} onClick={() => handleTabsClick(idx)}>
              {tab}
            </button>
          ))}
        </div>
        <div className="ml-auto">{tabRightContents}</div>
      </div>
      <div className="mt-sm">
        {React.Children.toArray(children)[activeIndex]}
      </div>
    </>
  );
}

export default Tab;
