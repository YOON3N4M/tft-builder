import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// URL로 관리할 데이터들을 아래에 등록
type ParamsKey = "field" | "inventory";

interface Params {
  key: ParamsKey;
  data: string;
}

export default function useHandleParams() {
  const router = useRouter();

  const [params, setParams] = useState<Params[]>([]);

  function pushParams(pramsArr: Params[]) {
    const paramsString = pramsArr
      .map((param) => `${param.key}=${param.data}`)
      .join("");

    const url = `/?${paramsString}`;
    router.push(url);
  }

  function addParams(key: ParamsKey, data: string) {
    const filtered = params.filter((item) => item.key !== key);
    setParams((prev) => {
      pushParams([...filtered, { key, data }]);

      return [...filtered, { key, data }];
    });
    //console.log(params);
  }

  return { addParams };
}
