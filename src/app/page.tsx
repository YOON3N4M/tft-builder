"use client";

import ItemCombination from "@/components/ItemCombination";
import { CORE_ITEM_LIST } from "@/constants/item";
import { ITEM_ICON_URL } from "@/constants/url";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ItemCombination />
    </main>
  );
}
