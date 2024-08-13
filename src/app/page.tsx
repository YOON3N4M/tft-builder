"use client";

import BuilderContainer from "@/containers/BuilderContainer";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense>
        <BuilderContainer />
      </Suspense>
    </div>
  );
}
