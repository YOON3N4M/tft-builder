"use client";

import BuilderContainer from "@/containers/BuilderContainer";
import { Suspense } from "react";

interface BuilderPageProps {}

function BuilderPage(props: BuilderPageProps) {
  const {} = props;

  return (
    <>
      <Suspense>
        <BuilderContainer />
      </Suspense>
    </>
  );
}

export default BuilderPage;
