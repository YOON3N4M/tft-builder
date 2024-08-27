"use client";

import { copyBuild } from "@/utils/localstorage";
import { Clipboard } from "./svgs";

interface BuildCopyButtonProps {
  url: string;
}

function BuildCopyButton(props: BuildCopyButtonProps) {
  const { url } = props;

  return (
    <button onClick={() => copyBuild(url)}>
      <Clipboard />
    </button>
  );
}

export default BuildCopyButton;
