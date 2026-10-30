import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { AnalogClock } from "@/components/ui/analog-clock";
import { getHeroTexts } from "@/lib/data";

/* 첫 화면(히어로) — 패션 잡지 표지 느낌.
   - 큰 제목·윗글씨·설명·버튼 글자는 관리자 페이지(또는 site.config.ts 의 hero)에서 바꿉니다.
   - 잡지 장식 글자(맨 위 메뉴, 호수, 서명, 옆 문구)는 site.config.ts 의 hero.magazine 에서 바꿉니다.
   - 배경 그림은 public/hero-bg.webp 파일을 교체하세요. */

/** 짧은 포인트 선 (잡지 표지의 빨간 밑줄 느낌) */
function AccentLine({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`block h-0.5 w-10 bg-brand ${className}`} />;
}

/** 큰 제목. 첫 번째 target 글자(예: "가")에 마우스를 올리면 작은 글자로 바뀝니다.
    글자 칸의 크기는 그대로라서, 마우스가 칸을 벗어나는 즉시 원래 글자로 돌아옵니다. */
function HoverSwapTitle({
  title,
  target,
  replacement,
}: {
  title: string;
  target: string;
  replacement: string[];
}) {
  const index = title.indexOf(target);
  if (!target || index === -1) return <>{title}</>;

  return (
    <>
      {title.slice(0, index)}
      <span className="group relative inline-block cursor-default">
        <span className="group-hover:opacity-0">{target}</span>
        <span
          aria-hidden
          className="absolute inset-0 flex flex-col items-center justify-center text-center text-[0.2em] font-bold leading-tight text-brand opacity-0 group-hover:opacity-100"
        >
          {replacement.map((line) => (
            <span key={line} className="whitespace-nowrap">
              {line}
            </span>
          ))}
        </span>
      </span>
      {title.slice(index + target.length)}
    </>
  );
}

export async function Hero() {
  const { hero } = siteConfig;
  const { magazine } = hero;
  const texts = await getHeroTexts(); // 관리자에서 저장한 글자 (없으면 site.config.ts 글자)

  return (
    <section id="top" className="relative overflow-hidden">
      {/* 배경 그림: 화면을 가득 채우되(cover), 인물 얼굴이 있는 위쪽(15% 지점)에 초점을 맞춤 */}
      <Image
        src="/hero-bg.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_15%]"
      />
      {/* 글자가 잘 읽히도록 배경색을 덮는 막 (왼쪽·위쪽이 더 어두움) */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/55 to-background/15" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/70" />

      {/* 오른쪽 위에 띄운 아날로그 시계 (넓은 화면에서만 보임) */}

      <AnalogClock className="absolute left-[81.5%] top-[33%] z-10 hidden size-56 -translate-x-1/2 -translate-y-1/2 lg:block" />

      <Container className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-between gap-10 py-8 sm:py-10">
        {/* ① 맨 위 줄: 왼쪽 메뉴 글자 / 오른쪽 호수 */}
        <div className="flex items-start justify-between gap-6 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-foreground/80 sm:text-xs">
          <p>{magazine.topMenu.join("  /  ")}</p>
          <p className="text-right leading-relaxed">
            {magazine.issue.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        {/* ② 가운데: 아주 큰 제목 */}
        <h1 className="font-magazine whitespace-pre-line text-6xl font-black leading-[0.95] tracking-tight text-foreground drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] sm:text-8xl xl:text-[9.5rem]">
          <HoverSwapTitle
            title={texts["hero.title"]}
            target={magazine.hoverSwap.target}
            replacement={magazine.hoverSwap.replacement}
          />
        </h1>

        {/* ③ 아래: 왼쪽(윗글씨·설명·버튼) / 오른쪽(서명·옆 문구) */}
        <div className="grid items-end gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div>
            <AccentLine />
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.3em] text-brand sm:text-sm">
              {texts["hero.eyebrow"]}
            </p>
            <p className="font-magazine mt-5 max-w-md text-2xl font-medium italic leading-snug text-foreground sm:text-3xl">
              {texts["hero.description"]}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <a href={hero.primaryCta.href}>
                  {texts["hero.primaryCta"]}
                  <ArrowRight />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={hero.secondaryCta.href}>{texts["hero.secondaryCta"]}</a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href={hero.thirdCta.href} target="_blank" rel="noopener noreferrer">
                  {hero.thirdCta.label}
                </a>
              </Button>
              {/* 유튜브 버튼 오른쪽: 도시별 시계 */}
              <div className="flex items-center gap-3 sm:ml-3">
                {magazine.worldClocks.map((c) => (
                  <div key={c.timeZone} className="flex flex-col items-center gap-1.5">
                    <AnalogClock timeZone={c.timeZone} className="size-14 p-1" />
                    <span className="text-[0.65rem] font-medium tracking-[0.2em] text-foreground/80">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:text-right">
            <p className="font-script -rotate-6 text-6xl leading-none text-brand sm:text-7xl">
              {magazine.signature}
            </p>
            <p className="mt-6 text-xs font-medium uppercase leading-loose tracking-[0.35em] text-foreground/90 sm:text-sm">
              {magazine.sideWords.map((word) => (
                <span key={word} className="block">
                  {word}
                </span>
              ))}
            </p>
            <AccentLine className="mt-3 md:ml-auto" />
          </div>
        </div>

        {/* ④ 맨 아래 줄 */}
        <div className="flex items-end justify-between gap-6 border-t border-foreground/20 pt-5 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-foreground/70 sm:text-xs">
          <p className="leading-loose">
            {magazine.footerWords.map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
          </p>
          <p className="text-right">{magazine.footerNote}</p>
        </div>
      </Container>
    </section>
  );
}
