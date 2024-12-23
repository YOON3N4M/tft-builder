export interface SetData {
  custom: {
    champion: Champion[];
    trait: Trait[];
  };
}

export interface Champion {
  id: number;
  name: string;
  tier: number;
  trait: Trait[];
  src: string;
}

export interface Trait {
  name: string;
  requirQty: number[];
  tier: TraitTier[];
  src: string[];
  desc: string;
  // 단계별 효과?
  effect: string[];
}
export type TraitTier = "unranked" | "bronze" | "silver" | "gold" | "prism";
