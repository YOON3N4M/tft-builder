export interface Champion {
  id: number;
  name: string;
  tier: number;
  synergy: Synergy[];
  src: string;
}

export interface Synergy {
  name: string;
  requirQty: number[];
  tier: SynergyTier[];
  src: string[];
  desc: string;
  // 단계별 효과?
  effect: string[];
}
export type SynergyTier = "unranked" | "bronze" | "silver" | "gold" | "prism";
