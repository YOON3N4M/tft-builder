"use client";

import ItemCombination from "@/components/ItemCombination";
import { CORE_ITEM_LIST } from "@/constants/item";
import { ITEM_ICON_URL } from "@/constants/url";
import BuilderContainer from "@/containers/BuilderContainer";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  return (
    <div>
      <BuilderContainer />
    </div>
  );
}
