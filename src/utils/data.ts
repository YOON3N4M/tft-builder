import {
  Champion,
  Trait,
  TraitTier,
  CombinationItem,
  CoreItem,
} from "@/types/data";
export function generateTrait(
  name: string,
  requirQty: number[],
  tier: TraitTier[],
  src: string[],
  desc: string,
  effect: string[]
): Trait {
  return { name, requirQty, tier, src, desc, effect };
}

export function generateChampion(
  id: number,
  name: string,
  tier: number,
  trait: Trait[],
  src: string
): Champion {
  return { id, name, tier, trait, src };
}

export function generateItem(
  id: number,
  name: string,
  effect: string[],
  src: string,
  desc: string
): CombinationItem;
export function generateItem(
  id: number,
  name: string,
  effect: string[],
  src: string,
  desc: string,
  recipe: { requireItem: CombinationItem; qty: number }[]
): CoreItem;

export function generateItem(
  id: number,
  name: string,
  effect: string[],
  src: string,
  desc: string,
  recipe?: any
): CombinationItem | CoreItem {
  if (recipe) {
    return {
      id,
      name,
      effect,
      src,
      desc,
      recipe,
    } as CoreItem;
  } else {
    return {
      id,
      name,
      effect,
      src,
    } as CombinationItem;
  }
}
