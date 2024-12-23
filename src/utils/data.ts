import { Champion, Trait, TraitTier } from "@/types/data";

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
