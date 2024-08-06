export const cn = (...classNames: (string | false | undefined | null)[]) => {
  const styledClassNames = [...classNames]
    .map((className) => className && className.split(" "))
    .flat()
    .filter((className) => className);

  return styledClassNames.join(" ");
};
export function sortByKorean<T>(arr: T[], key: keyof T): T[] {
  const arrCopy = [...arr];

  arrCopy.sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue, "ko");
    }

    return 0;
  });

  return arrCopy;
}

export function sortByNumber<T>(
  arr: T[],
  key: keyof T,
  reverse: boolean = false
): T[] {
  const arrCopy = [...arr];

  arrCopy.sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return reverse ? bValue - aValue : aValue - bValue;
    }

    return 0;
  });

  return arrCopy;
}

export function groupBy<T>(array: T[], key: keyof T): T[][] {
  const grouped = array.reduce((acc, item) => {
    const keyValue = item[key];
    if (!acc[keyValue as keyof typeof acc]) {
      acc[keyValue as keyof typeof acc] = [];
    }
    acc[keyValue as keyof typeof acc].push(item);
    return acc;
  }, {} as Record<string | number | symbol, T[]>);

  // 그룹화된 객체를 배열로 변환
  return Object.values(grouped);
}
