import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useTabs() {
  const [activeIndex, setActiveIndex] = useState(0);

  function handleTabsClick(idx: number) {
    setActiveIndex(idx);
  }

  function isActiveIndex(index: number) {
    return activeIndex === index ? true : false;
  }

  return { activeIndex, handleTabsClick, isActiveIndex };
}
