"use client";

import { replaceString } from "@/utils";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

interface SummonerSearchFormProps {}

function SummonerSearchForm(props: SummonerSearchFormProps) {
  const {} = props;

  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setKeyword(value);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const replacedRiotTag = replaceString(keyword);

    router.push(`/summoner/${replacedRiotTag}`);
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        value={keyword}
        onChange={onChange}
        placeholder="소환사 명..."
        className="bg-sub-bg rounded-md text-sub-text py-xxs px-xxxs text-sm"
      />
    </form>
  );
}

export default SummonerSearchForm;
