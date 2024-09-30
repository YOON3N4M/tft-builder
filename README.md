# tft-builder


리그오브레전드의 전략적 팀전투(tft) 플레이에 도움을 주는 빌더 서비스입니다.

![image](https://github.com/user-attachments/assets/833e7007-b83e-4025-aad8-cfc302b6b52c)


<br/>

## Stacks
<strong>Front</strong> : next.js, typescript, tailwind, zustand <br/>

<br/>

## Features

* 빌더
> 실제 인게임에서 기물 배치를 통해 팀을 구성하는 것처럼 시뮬레이션 할 수 있습니다. 

* 빌드를 로컬에 세이브/로드, 링크를 통한 공유
> 구성한 빌드를 로컬에 세이브/로드 할 수 있으며, 링크를 통해 다른 유저들과 공유할 수 있습니다.

* 전적에서 빌드 복사해서 불러오기
> riot api로 제공받은 전적을 통해 해당 게임의 빌드를 빌더로 복사해올 수 있습니다. 이 경우 또한 로컬에 세이브/로드가 가능합니다.

* 아이템 경우의 수
> 보유한 조합 아이템을 입력하면, 완성아이템으로 조합이 가능한 경우의 수를 제공합니다.

* 현재 게임의 기물의 상점 등장 확률 (대략적인 확률)
> 특정 기물에 대해 현재 게임에서의 등장 확률을 대략적으로 제공합니다. (게임 내 기물 존재 개수 수동 입력 필요)

* 기물 등장 확률표 (오피셜 확률)
> 레벨별 리롤 확률을 제공합니다.

* 전적 검색 기능
> 최근 10게임의 전적과 평균 등수, 선호 챔피언과 특성 등 부가적인 정보를 제공합니다.

<br/>

## Notice
* 현재 빌더는 tft 12시즌을 기준으로 제작되었습니다.
> 2024.09 이후의 패치는 적용되어 있지 않습니다. (ex 요정 특성 유닛 카운트 등)
* 아이템 경우의 수 기능에 일부 확률이 누락되는 버그가 존재합니다.
* 전적 검색시 타 플레이어들의 닉네임이 누락되는 버그가 존재합니다.
