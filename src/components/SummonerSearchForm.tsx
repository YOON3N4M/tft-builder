"use client";

import { replaceString } from "@/utils";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import SimpleTooltip from "./tooltips/SimpleTooltip";
import useDisClosure from "@/hooks/useDisClosure";

interface SummonerSearchFormProps {}

function SummonerSearchForm(props: SummonerSearchFormProps) {
  const {} = props;

  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const { isOpen, onClose, onOpen } = useDisClosure();

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setKeyword(value);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let replacedRiotTag = replaceString(keyword);

    //태그가 포함되지 않은 검색어의 경우
    const isTag = replacedRiotTag.includes("-");
    if (!isTag) {
      replacedRiotTag = `${replacedRiotTag}-kr1`;
    }

    router.push(`/summoner/${replacedRiotTag}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative"
      onFocus={onOpen}
      onBlur={onClose}
    >
      <input
        value={keyword}
        onChange={onChange}
        placeholder="소환사 명#태그"
        className="bg-sub-bg rounded-md text-sub-text py-xxs px-sm text-sm"
      />
      <SimpleTooltip isOpen={isOpen} align="left">
        <p className="text-sub-text">
          닉네임과 태그를 정확히 입력해주세요
          <br />
          검색어에 태그(#)가 포함되지 않았을 경우
          <br /> 태그는 기본값인 #kr1으로 검색됩니다.
          <br />
          <br />
          예시
          <br />
          {`hideonbush => hideonbush#kr1`}
          <br />
          {`opp#0pp => opp#0pp`}
        </p>
      </SimpleTooltip>
    </form>
  );
}

export default SummonerSearchForm;
