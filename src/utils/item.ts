import {
  BF_SWRORD,
  CHAIN_VEST,
  CORE_ITEM_LIST,
  CombinationItem,
  CoreItem,
  GIANTS_BELT,
  NEEDLESSLY_LARGE_ROD,
  NEGATRON_CLOAK,
  RECURVE_BOW,
  SPARRINGS_GLOVES,
  SPATULA,
  TEAR_OF_THE_GADDESS,
} from "@/constants/item";

interface Inventory {
  [x: string]: number;
}

export function calculateAllCombinationCase(inventory: Inventory) {
  const caseList: CoreItem[][] = [];

  //CORE_ITEM_LIST의 순서를 순회하며 모든 경우의 수를 구하는 함수
  const resultAllCase = applyFunctionToRotations(
    CORE_ITEM_LIST,
    inventory,
    calculateOneCombinationCase
  );

  // 모든 경우의 수 중 중복되는 경우의 수가 있다면 제거한 뒤 반환
  const unquie = setUnique(resultAllCase);
  // 시각적으로 안정적이기 위한 첫번째요소를 기준으로 정렬
  const sortByFirstItem = sortArraysByFirstElementId(unquie);

  return sortByFirstItem;
}

// 한 CORE_ITEM_LIST에 대해 조합 가능한 경우의 수 (case)를 하나 구하는 함수
export function calculateOneCombinationCase(
  inventory: Inventory,
  coreItemList: CoreItem[]
) {
  let inventoryClone = { ...inventory };
  const result: CoreItem[] = [];

  coreItemList.forEach((coreItem) => {
    while (true) {
      const canCombinate = isExistCombine(coreItem, inventoryClone);

      if (!canCombinate) {
        break; // 조합이 불가능하면 루프를 빠져나감
      }

      const combineResult = combineItem(coreItem, inventoryClone);
      inventoryClone = combineResult.remainItemList;
      result.push(combineResult.coreItem);
    }
  });

  // 순서대로 정렬 한 뒤 반환
  const sortById = sortObjectsById(result);

  return sortById;
}

// 아이템을 조합해 결과물, 남은 아이템 (inventory)를 반환하는 함수
export function combineItem(coreItem: CoreItem, inventory: Inventory) {
  const inventoryTemp = { ...inventory };
  //console.log(coreItem.name, "조합");
  coreItem.recipe.forEach(
    (rec) =>
      (inventoryTemp[rec.requireItem.name] =
        inventoryTemp[rec.requireItem.name] - rec.qty)
  );

  return { coreItem: coreItem, remainItemList: inventoryTemp };
}

// tagetCore 아이템에 필요한 조합 아이템 수 확인 함수
export function isExistCombine(targetCore: CoreItem, inventory: Inventory) {
  const result = targetCore.recipe.map((rec) => {
    // console.log(
    //   "",
    //   targetCore.name,
    //   "조합에 필요한",
    //   rec.requireItem.name,
    //   "이",
    //   inventory[rec.requireItem.name],
    //   "개 있습니다."
    // );

    return inventory[rec.requireItem.name] >= rec.qty;
  });

  return canCombine(result);
}

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
export function checkInventoryItemQty(itemList: CombinationItem[]) {
  let inventory = {
    [BF_SWRORD.name]: 0,
    [RECURVE_BOW.name]: 0,
    [CHAIN_VEST.name]: 0,
    [NEGATRON_CLOAK.name]: 0,
    [NEEDLESSLY_LARGE_ROD.name]: 0,
    [TEAR_OF_THE_GADDESS.name]: 0,
    [GIANTS_BELT.name]: 0,
    [SPARRINGS_GLOVES.name]: 0,
    [SPATULA.name]: 0,
  };

  itemList.forEach((item) => (inventory[item.name] = inventory[item.name] + 1));

  //console.log("남은 아이템", inventory);

  return inventory;
}

// 소모될 아이템이 충분하게 있는지 검사
function canCombine(boolArr: boolean[]) {
  return !boolArr.includes(false);
}

// 배열 순서 순회 함수
function rotateArray(arr: any[]) {
  return arr.slice(1).concat(arr[0]);
}

// 배열을 순회시키며 함수를 적용하는 함수
function applyFunctionToRotations(arr: any[], inventory: any, fn: any) {
  let result = [];
  let currentArray = arr.slice(); // 원본 배열 복사

  for (let i = 0; i < arr.length; i++) {
    result.push(fn(inventory, currentArray));
    currentArray = rotateArray(currentArray); // 배열을 한 칸씩 회전
  }

  //console.log(result);

  return result;
}

// id 기준 정렬
function sortObjectsById(array: CoreItem[]) {
  return array.sort((a, b) => a.id - b.id);
}

// 중복제거 함수
function setUnique(array: any[]) {
  const unique = Array.from(new Set(array.map((arr) => JSON.stringify(arr))));
  const resultArray = unique.map((str) => JSON.parse(str));

  return resultArray;
}

function sortArraysByFirstElementId(arr: CoreItem[][]) {
  return arr.sort((a, b) => a[0].id - b[0].id);
}
