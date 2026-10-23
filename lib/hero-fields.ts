/* 관리자에서 고칠 수 있는 히어로 글자 목록.
   key = 데이터베이스(site_texts 표)에 저장되는 이름, label = 관리자 화면에 보이는 이름.
   기본값은 site.config.ts 의 hero 에 있는 글자입니다. */

export const HERO_FIELDS = [
  { key: "hero.eyebrow", label: "작은 윗글씨", multiline: false },
  { key: "hero.title", label: "큰 제목 (줄바꿈 가능)", multiline: true },
  { key: "hero.description", label: "설명 문장", multiline: true },
  { key: "hero.primaryCta", label: "첫 번째 버튼 글자", multiline: false },
  { key: "hero.secondaryCta", label: "두 번째 버튼 글자", multiline: false },
] as const;

export type HeroFieldKey = (typeof HERO_FIELDS)[number]["key"];
export type HeroTexts = Record<HeroFieldKey, string>;
