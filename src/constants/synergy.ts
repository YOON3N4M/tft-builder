export interface Synergy {
  name: string;
  grade: number[];
  src: number[];
  desc: string;
  // 단계별 효과?
  effect: string[];
}

// 직업과 계열을 구분 해야 하는지?
function generateSynergy(
  name: string,
  grade: number[],
  src: number[],
  desc: string,
  effect: string[]
): Synergy {
  return { name, grade, src, desc, effect };
}

// Origin
export const ARCANA = generateSynergy("아르카나", [2, 3, 4, 5], [], "", []);
export const CHRONO = generateSynergy("시공간", [2, 4, 6], [], "", []);
export const DRAGON = generateSynergy("용", [2, 3], [], "", []);
export const DRUID = generateSynergy("드루이드", [1], [], "", []);
export const ELDRITCH = generateSynergy("섬뜩한 힘", [3, 5, 7, 10], [], "", []);
export const FAERIE = generateSynergy("요정", [2, 4, 6, 9], [], "", []);
export const FROST = generateSynergy("서리", [3, 5, 7, 9], [], "", []);
export const HONEYMANCY = generateSynergy("벌꿀술사", [3, 5, 7], [], "", []);
export const PORTAL = generateSynergy("차원문", [3, 6, 8, 10], [], "", []);
export const PYRO = generateSynergy("화염", [2, 3, 4, 5], [], "", []);
export const RAVENOUS = generateSynergy("허기", [1], [], "", []);
export const SUGARCRAFT = generateSynergy("달콤술사", [2, 4, 6], [], "", []);
export const WITCHCRAFT = generateSynergy("마녀", [2, 4, 6, 8], [], "", []);

//Class
export const ASCENDANT = generateSynergy("초월체", [1], [], "", []);
export const BASTION = generateSynergy("요새", [2, 4, 6, 8], [], "", []);
export const BAT_QUEEN = generateSynergy("박쥐여왕", [1], [], "", []);
export const BEST_FRIEND = generateSynergy("단짝", [1], [], "", []);
export const BLASTER = generateSynergy("폭파단", [2, 4, 6], [], "", []);
export const HUNTER = generateSynergy("사냥꾼", [2, 4, 6], [], "", []);
export const INCANTOR = generateSynergy("마도사", [2, 4], [], "", []);
export const MAGE = generateSynergy("요술사", [3, 5, 7, 9], [], "", []);
export const MULTISTRIKER = generateSynergy("쇄도자", [3, 5, 7, 9], [], "", []);
export const PRESERVER = generateSynergy("보호술사", [2, 3, 4, 5], [], "", []);
export const SCHORLAR = generateSynergy("학자", [2, 4, 6], [], "", []);
export const SHAPESHIFTER = generateSynergy(
  "형상변환자",
  [2, 4, 6],
  [],
  "",
  []
);
export const VANGUARD = generateSynergy("선봉대", [2, 4, 6], [], "", []);
export const WARRIOR = generateSynergy("전사", [2, 4, 6], [], "", []);
